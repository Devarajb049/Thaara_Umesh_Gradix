import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  MessageSquare,
  Tv,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import DeleteConfirmation from '../components/DeleteConfirmation';

const ActingSchoolManager = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials' | 'workshops' | 'ignite'

  // Context APIs
  const { 
    testimonials, addTestimonialRecord, updateTestimonialRecord, deleteTestimonialRecord,
    workshops, addWorkshopRecord, updateWorkshopRecord, deleteWorkshopRecord,
    igniteImages, addIgniteImageRecord, deleteIgniteImageRecord,
    loading 
  } = useData();

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals & Target items
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Form Fields - Unified state, fields change depending on tab
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedIds([]);
    setCurrentPage(1);
  };

  // Reorder display list (testimonials / workshops)
  const handleMoveOrder = async (index, direction) => {
    if (activeTab === 'testimonials') {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= testimonials.length) return;

      const currentT = testimonials[index];
      const targetT = testimonials[targetIndex];

      const tempOrder = currentT.displayOrder;
      
      const success1 = await updateTestimonialRecord(currentT.id, { ...currentT, displayOrder: targetT.displayOrder });
      const success2 = await updateTestimonialRecord(targetT.id, { ...targetT, displayOrder: tempOrder });

      if (success1 && success2) {
        addToast("Testimonial order changed", "success");
      } else {
        addToast("Failed to rearrange order", "error");
      }
    } else if (activeTab === 'workshops') {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= workshops.length) return;

      const currentW = workshops[index];
      const targetW = workshops[targetIndex];

      const tempOrder = currentW.displayOrder;
      
      const success1 = await updateWorkshopRecord(currentW.id, { ...currentW, displayOrder: targetW.displayOrder });
      const success2 = await updateWorkshopRecord(targetW.id, { ...targetW, displayOrder: tempOrder });

      if (success1 && success2) {
        addToast("Workshop video order changed", "success");
      } else {
        addToast("Failed to rearrange order", "error");
      }
    }
  };

  // Open Form modal
  const openCreateModal = () => {
    setFormErrors({});
    setCurrentItem(null);

    if (activeTab === 'testimonials') {
      setFormData({
        personName: '',
        designation: '',
        photo: '',
        review: '',
        displayOrder: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.displayOrder || 0)) + 1 : 1
      });
    } else if (activeTab === 'workshops') {
      setFormData({
        thumbnail: '',
        videoUrl: '',
        displayOrder: workshops.length > 0 ? Math.max(...workshops.map(w => w.displayOrder || 0)) + 1 : 1
      });
    } else {
      // Ignite Graduation Day Tab just uploads images immediately
      setFormData({
        images: []
      });
    }

    setIsFormOpen(true);
  };

  const openEditModal = (item) => {
    setFormErrors({});
    setCurrentItem(item);

    if (activeTab === 'testimonials') {
      setFormData({
        personName: item.personName,
        designation: item.designation,
        photo: item.photo || '',
        review: item.review,
        displayOrder: item.displayOrder
      });
    } else if (activeTab === 'workshops') {
      setFormData({
        thumbnail: item.thumbnail || '',
        videoUrl: item.videoUrl,
        displayOrder: item.displayOrder
      });
    }

    setIsFormOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (activeTab === 'testimonials') {
      if (!formData.personName.trim()) errors.personName = "Person Name is required";
      if (!formData.review.trim()) errors.review = "Review is required";
      if (!formData.photo) errors.photo = "Profile image is required";
    } else if (activeTab === 'workshops') {
      if (!formData.videoUrl.trim()) errors.videoUrl = "YouTube URL is required";
    } else {
      if (formData.images.length === 0) errors.images = "At least one image is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Record
  const handleSave = async (e) => {
    e.preventDefault();
    if (activeTab !== 'ignite' && !validateForm()) return;

    if (activeTab === 'testimonials') {
      if (currentItem) {
        const success = await updateTestimonialRecord(currentItem.id, formData);
        if (success) addToast("Testimonial updated successfully", "success");
        else addToast("Failed to update testimonial", "error");
      } else {
        const success = await addTestimonialRecord(formData);
        if (success) addToast("Testimonial added successfully", "success");
        else addToast("Failed to add testimonial", "error");
      }
    } else if (activeTab === 'workshops') {
      if (currentItem) {
        const success = await updateWorkshopRecord(currentItem.id, formData);
        if (success) addToast("Workshop video updated successfully", "success");
        else addToast("Failed to update workshop video", "error");
      } else {
        const success = await addWorkshopRecord(formData);
        if (success) addToast("Workshop video added successfully", "success");
        else addToast("Failed to add workshop video", "error");
      }
    } else {
      // Ignite: Save multiple uploaded images
      let successCount = 0;
      let startOrder = igniteImages.length > 0 ? Math.max(...igniteImages.map(img => img.display_order || 0)) + 1 : 1;
      for (const url of formData.images) {
        const success = await addIgniteImageRecord(url, startOrder++);
        if (success) successCount++;
      }
      addToast(`Added ${successCount} graduation image(s)`, "success");
    }

    setIsFormOpen(false);
  };

  // Delete Actions
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    if (activeTab === 'testimonials') {
      const success = await deleteTestimonialRecord(deleteTargetId);
      if (success) addToast("Testimonial deleted", "success");
      else addToast("Failed to delete testimonial", "error");
    } else if (activeTab === 'workshops') {
      const success = await deleteWorkshopRecord(deleteTargetId);
      if (success) addToast("Workshop video deleted", "success");
      else addToast("Failed to delete workshop video", "error");
    } else {
      const success = await deleteIgniteImageRecord(deleteTargetId);
      if (success) addToast("Graduation photo deleted", "success");
      else addToast("Failed to delete graduation photo", "error");
    }

    setIsDeleteOpen(false);
  };

  // Pagination calculation
  const getActiveList = () => {
    if (activeTab === 'testimonials') return testimonials;
    if (activeTab === 'workshops') return workshops;
    return igniteImages;
  };

  const activeList = getActiveList();
  const totalPages = Math.ceil(activeList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeList.slice(indexOfFirstItem, indexOfLastItem);

  // Columns definition dynamically by tab
  const getColumns = () => {
    if (activeTab === 'testimonials') {
      return [
        {
          key: 'photo',
          label: 'Photo',
          render: (item) => (
            <div 
              onClick={() => setPreviewImage(item.photo)}
              className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 cursor-zoom-in flex-shrink-0"
            >
              <img src={item.photo} alt={item.personName} className="w-full h-full object-cover" />
            </div>
          )
        },
        { key: 'personName', label: 'Person Name', sortable: true },
        { key: 'designation', label: 'Designation' },
        { 
          key: 'review', 
          label: 'Review text', 
          render: (item) => (
            <p className="max-w-xs truncate text-xs text-zinc-500 italic">
              "{item.review}"
            </p>
          )
        },
        {
          key: 'displayOrder',
          label: 'Display Order',
          sortable: true,
          render: (item) => {
            const actualIdx = testimonials.findIndex(t => t.id === item.id);
            return (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold w-6">{item.displayOrder}</span>
                <div className="flex flex-col">
                  <button 
                    disabled={actualIdx === 0}
                    onClick={() => handleMoveOrder(actualIdx, -1)}
                    className="p-0.5 hover:text-primary disabled:opacity-30 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    disabled={actualIdx === testimonials.length - 1}
                    onClick={() => handleMoveOrder(actualIdx, 1)}
                    className="p-0.5 hover:text-primary disabled:opacity-30 transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          }
        },
        {
          key: 'actions',
          label: 'Actions',
          render: (item) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-xl text-zinc-450 hover:text-indigo-650 hover:bg-indigo-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerDelete(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )
        }
      ];
    } else if (activeTab === 'workshops') {
      return [
        {
          key: 'thumbnail',
          label: 'Thumbnail',
          render: (item) => (
            <div 
              onClick={() => setActiveVideoUrl(item.videoUrl)}
              className="w-16 aspect-video rounded-lg overflow-hidden border border-zinc-150 bg-black cursor-pointer hover:opacity-85 flex items-center justify-center"
            >
              {item.thumbnail ? (
                <img src={item.thumbnail} alt="Workshop" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-white">Play</span>
              )}
            </div>
          )
        },
        {
          key: 'videoUrl',
          label: 'Video Link',
          render: (item) => (
            <a href={item.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline font-semibold truncate max-w-xs block">
              {item.videoUrl}
            </a>
          )
        },
        {
          key: 'displayOrder',
          label: 'Display Order',
          sortable: true,
          render: (item) => {
            const actualIdx = workshops.findIndex(w => w.id === item.id);
            return (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold w-6">{item.displayOrder}</span>
                <div className="flex flex-col">
                  <button 
                    disabled={actualIdx === 0}
                    onClick={() => handleMoveOrder(actualIdx, -1)}
                    className="p-0.5 hover:text-primary disabled:opacity-30 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    disabled={actualIdx === workshops.length - 1}
                    onClick={() => handleMoveOrder(actualIdx, 1)}
                    className="p-0.5 hover:text-primary disabled:opacity-30 transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          }
        },
        {
          key: 'actions',
          label: 'Actions',
          render: (item) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-xl text-zinc-450 hover:text-indigo-650 hover:bg-indigo-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerDelete(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )
        }
      ];
    } else {
      // Ignite graduation images
      return [
        {
          key: 'image_url',
          label: 'Photo',
          render: (item) => (
            <div 
              onClick={() => setPreviewImage(item.image_url)}
              className="w-16 aspect-[4/3] rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 cursor-zoom-in flex items-center justify-center p-0.5"
            >
              <img src={item.image_url} alt="Graduation" className="w-full h-full object-cover" />
            </div>
          )
        },
        {
          key: 'image_url_text',
          label: 'File Path',
          render: (item) => (
            <span className="text-xs text-zinc-500 font-mono select-all truncate max-w-sm block">
              {item.image_url}
            </span>
          )
        },
        {
          key: 'actions',
          label: 'Actions',
          render: (item) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerDelete(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )
        }
      ];
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Acting School Manager
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Manage course reviews, student workshop videos, and Ignite Graduation day photos.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all self-start sm:self-center active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>{activeTab === 'testimonials' ? 'Add Review' : activeTab === 'workshops' ? 'Add Video' : 'Add Image(s)'}</span>
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-150 dark:border-zinc-800 select-none bg-white/40 dark:bg-zinc-900/10 p-1.5 rounded-3xl w-max">
        <button
          onClick={() => handleTabChange('testimonials')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'testimonials' 
              ? 'bg-white dark:bg-zinc-800 text-primary shadow-xs border border-zinc-100 dark:border-zinc-750' 
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Testimonials</span>
        </button>
        <button
          onClick={() => handleTabChange('workshops')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'workshops' 
              ? 'bg-white dark:bg-zinc-800 text-primary shadow-xs border border-zinc-100 dark:border-zinc-750' 
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Workshops</span>
        </button>
        <button
          onClick={() => handleTabChange('ignite')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'ignite' 
              ? 'bg-white dark:bg-zinc-800 text-primary shadow-xs border border-zinc-100 dark:border-zinc-750' 
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Ignite Graduation</span>
        </button>
      </div>

      {/* Main List Grid */}
      <DataTable
        columns={getColumns()}
        data={currentItems}
        loading={loading}
        selectedIds={selectedIds}
        onSelectRow={(id, checked) => {
          if (checked) setSelectedIds(prev => [...prev, id]);
          else setSelectedIds(prev => prev.filter(item => item !== id));
        }}
        onSelectAll={(checked) => {
          if (checked) setSelectedIds(activeList.map(item => item.id));
          else setSelectedIds([]);
        }}
        onBulkDelete={async () => {
          if (confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`)) {
            let successCount = 0;
            for (const id of selectedIds) {
              let success = false;
              if (activeTab === 'testimonials') success = await deleteTestimonialRecord(id);
              else if (activeTab === 'workshops') success = await deleteWorkshopRecord(id);
              else success = await deleteIgniteImageRecord(id);
              if (success) successCount++;
            }
            setSelectedIds([]);
            addToast(`Successfully deleted ${successCount} item(s)`, "success");
          }
        }}
        allIds={activeList.map(item => item.id)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage
        }}
        emptyStateReset={() => {
          setCurrentPage(1);
        }}
      />

      {/* FORM MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={
          activeTab === 'testimonials' 
            ? (currentItem ? "Edit Testimonial" : "Add Testimonial")
            : activeTab === 'workshops'
            ? (currentItem ? "Edit Workshop Video" : "Add Workshop Video")
            : "Upload Graduation Images"
        }
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
          
          {/* Testimonial Form Fields */}
          {activeTab === 'testimonials' && (
            <>
              {/* Person Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Person Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Ganesh"
                  value={formData.personName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, personName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
                />
              </div>

              {/* Designation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Designation / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Actor, Alumni, Model"
                  value={formData.designation || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
                />
              </div>

              {/* Profile Image upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Profile Photo *
                </label>
                <input
                  type="text"
                  placeholder="Paste direct profile photo URL (e.g. https://...)"
                  value={formData.photo || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200 mb-1"
                />
                <span className="text-[10px] text-zinc-400 font-semibold mb-1">OR UPLOAD LOCAL FILE:</span>
                <ImageUpload
                  folder="testimonials"
                  images={formData.photo && !formData.photo.startsWith('http') ? [formData.photo] : []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, photo: urls[0] || '' }))}
                />
              </div>

              {/* Review Text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Review Text *
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Paste the student's review here..."
                  value={formData.review || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200 resize-y"
                />
              </div>
            </>
          )}

          {/* Workshop Form Fields */}
          {activeTab === 'workshops' && (
            <>
              {/* YouTube Link */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  YouTube Video URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
                />
              </div>

              {/* Thumbnail Image upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Video Thumbnail Image (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Paste direct thumbnail image URL (e.g. https://...)"
                  value={formData.thumbnail || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200 mb-1"
                />
                <span className="text-[10px] text-zinc-400 font-semibold mb-1">OR UPLOAD LOCAL FILE:</span>
                <ImageUpload
                  folder="workshops"
                  images={formData.thumbnail && !formData.thumbnail.startsWith('http') ? [formData.thumbnail] : []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, thumbnail: urls[0] || '' }))}
                />
              </div>
            </>
          )}

          {/* Ignite Images Tab upload */}
          {activeTab === 'ignite' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Select Graduation Event Photos *
              </label>
              <ImageUpload
                folder="ignite"
                multiple={true}
                images={formData.images || []}
                onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
              />
            </div>
          )}

          {/* Display Order for Testimonials & Workshops */}
          {activeTab !== 'ignite' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Display Order Position
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.displayOrder || 1}
                onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
              />
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3 border-t border-zinc-100 dark:border-zinc-850 pt-4 mt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 font-semibold text-sm active:scale-98 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-md shadow-primary/10 active:scale-98 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this record? This action will immediately remove the content from the public acting school section."
      />

      {/* IMAGE PREVIEW ZOOM MODAL */}
      <Modal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        title="Image Preview"
        size="sm"
      >
        <div className="w-full flex items-center justify-center p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100">
          <img src={previewImage} alt="Zoom Preview" className="max-w-full max-h-[50vh] object-contain" />
        </div>
      </Modal>

      {/* VIDEO PREVIEW MODAL */}
      {activeVideoUrl && (
        <Modal
          isOpen={!!activeVideoUrl}
          onClose={() => setActiveVideoUrl(null)}
          title="Video Playback Preview"
          size="lg"
        >
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            {activeVideoUrl.includes('youtube.com') || activeVideoUrl.includes('youtu.be') ? (
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoUrl.split('v=')[1] || activeVideoUrl.split('/').pop()}?autoplay=1`}
                title="Preview"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={activeVideoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
              ></video>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ActingSchoolManager;
