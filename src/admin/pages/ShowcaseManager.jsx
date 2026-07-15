import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import DeleteConfirmation from '../components/DeleteConfirmation';

const ShowcaseManager = () => {
  const { addToast } = useToast();
  const { showcases, addShowcaseVideo, updateShowcaseVideo, deleteShowcaseVideo, loading } = useData();
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  // Form Fields
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    youtubeUrl: '',
    displayOrder: 1
  });
  const [formErrors, setFormErrors] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reordering display lists
  const handleMoveOrder = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= showcases.length) return;

    const currentItem = showcases[index];
    const targetItem = showcases[targetIndex];

    const tempOrder = currentItem.display_order;

    const success1 = await updateShowcaseVideo(currentItem.id, {
      title: currentItem.title,
      thumbnail: currentItem.thumbnail,
      youtubeUrl: currentItem.youtube_url,
      displayOrder: targetItem.display_order
    });
    
    const success2 = await updateShowcaseVideo(targetItem.id, {
      title: targetItem.title,
      thumbnail: targetItem.thumbnail,
      youtubeUrl: targetItem.youtube_url,
      displayOrder: tempOrder
    });

    if (success1 && success2) {
      addToast("Order rearranged successfully", "success");
    } else {
      addToast("Failed to rearrange order", "error");
    }
  };

  // Open Form modal
  const openCreateModal = () => {
    setFormData({
      title: '',
      thumbnail: '',
      youtubeUrl: '',
      displayOrder: showcases.length > 0 ? Math.max(...showcases.map(s => s.display_order || 0)) + 1 : 1
    });
    setFormErrors({});
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  const openEditModal = (item) => {
    setFormData({
      title: item.title,
      thumbnail: item.thumbnail || '',
      youtubeUrl: item.youtube_url,
      displayOrder: item.display_order
    });
    setFormErrors({});
    setCurrentItem(item);
    setIsFormOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.youtubeUrl.trim()) errors.youtubeUrl = "YouTube URL is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Record
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (currentItem) {
      // Edit mode
      const success = await updateShowcaseVideo(currentItem.id, formData);
      if (success) {
        addToast("Showcase video updated successfully", "success");
      } else {
        addToast("Failed to update showcase video", "error");
      }
    } else {
      // Create mode
      const success = await addShowcaseVideo(formData);
      if (success) {
        addToast("Showcase video added successfully", "success");
      } else {
        addToast("Failed to add showcase video", "error");
      }
    }
    setIsFormOpen(false);
  };

  // Delete handlers
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    const success = await deleteShowcaseVideo(deleteTargetId);
    if (success) {
      setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
      addToast("Showcase video deleted successfully", "success");
    } else {
      addToast("Failed to delete showcase video", "error");
    }
    setIsDeleteOpen(false);
  };

  // Pagination calculation
  const totalPages = Math.ceil(showcases.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = showcases.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'thumbnail',
      label: 'Thumbnail',
      render: (item) => (
        <div 
          onClick={() => {
            setActiveVideoUrl(item.youtube_url);
          }}
          className="w-16 aspect-video rounded-lg overflow-hidden border border-zinc-150 bg-black cursor-pointer hover:opacity-85 flex items-center justify-center"
        >
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-white">Play</span>
          )}
        </div>
      )
    },
    { key: 'title', label: 'Video Title', sortable: true },
    {
      key: 'youtube_url',
      label: 'YouTube Link',
      render: (item) => (
        <a 
          href={item.youtube_url} 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
        >
          <span>Open link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )
    },
    {
      key: 'display_order',
      label: 'Display Order',
      sortable: true,
      render: (item) => {
        const actualIdx = showcases.findIndex(s => s.id === item.id);
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-semibold w-6">{item.display_order}</span>
            <div className="flex flex-col">
              <button 
                disabled={actualIdx === 0}
                onClick={() => handleMoveOrder(actualIdx, -1)}
                className="p-0.5 hover:text-primary disabled:opacity-30 disabled:hover:text-inherit transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button 
                disabled={actualIdx === showcases.length - 1}
                onClick={() => handleMoveOrder(actualIdx, 1)}
                className="p-0.5 hover:text-primary disabled:opacity-30 disabled:hover:text-inherit transition-colors"
                title="Move Down"
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
            className="p-2 rounded-xl text-zinc-450 hover:text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
            title="Edit Video"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            title="Delete Video"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Showcase Management
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Manage showcase ad films and corporate portfolio videos that appear on the website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all self-start sm:self-center active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Video</span>
        </button>
      </div>

      {/* List */}
      <DataTable
        columns={columns}
        data={currentItems}
        loading={loading}
        selectedIds={selectedIds}
        onSelectRow={(id, checked) => {
          if (checked) setSelectedIds(prev => [...prev, id]);
          else setSelectedIds(prev => prev.filter(item => item !== id));
        }}
        onSelectAll={(checked) => {
          if (checked) setSelectedIds(showcases.map(s => s.id));
          else setSelectedIds([]);
        }}
        onBulkDelete={async () => {
          if (confirm(`Are you sure you want to delete ${selectedIds.length} selected videos?`)) {
            let successCount = 0;
            for (const id of selectedIds) {
              const success = await deleteShowcaseVideo(id);
              if (success) successCount++;
            }
            setSelectedIds([]);
            addToast(`Successfully deleted ${successCount} videos`, "success");
          }
        }}
        allIds={showcases.map(s => s.id)}
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
        title={currentItem ? "Edit Showcase Video" : "Add Showcase Video"}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
          {/* Video Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Video Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sudarshan Brand Ad"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
            {formErrors.title && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.title}</span>
            )}
          </div>

          {/* YouTube URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              YouTube Video URL *
            </label>
            <input
              type="text"
              required
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.youtubeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
            {formErrors.youtubeUrl && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.youtubeUrl}</span>
            )}
          </div>

          {/* Image Thumbnail Upload (Optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Video Thumbnail Image (Optional)
            </label>
            <input
              type="text"
              placeholder="Paste direct thumbnail image URL (e.g. https://...)"
              value={formData.thumbnail}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200 mb-1"
            />
            <span className="text-[10px] text-zinc-400 font-semibold mb-1">OR UPLOAD LOCAL FILE:</span>
            <ImageUpload
              folder="showcases"
              images={formData.thumbnail && !formData.thumbnail.startsWith('http') ? [formData.thumbnail] : []}
              onChange={(urls) => setFormData(prev => ({ ...prev, thumbnail: urls[0] || '' }))}
            />
          </div>

          {/* Display Order */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Display Order Position
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.displayOrder}
              onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
          </div>

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
              Save Video
            </button>
          </div>
        </form>
      </Modal>

      {/* SINGLE DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this showcase video? It will be removed from the public showcase catalog."
      />

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

export default ShowcaseManager;
