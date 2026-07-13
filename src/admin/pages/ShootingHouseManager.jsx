import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon,
  Tv
} from 'lucide-react';
import { mockShootingHouseImages, mockShootingHouseVideos } from '../dummyData';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import VideoPreview from '../components/VideoPreview';
import DeleteConfirmation from '../components/DeleteConfirmation';
import SearchBar from '../components/SearchBar';

const ShootingHouseManager = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('images'); // 'images' | 'videos'

  // Datasets state
  const { 
    shootingHouseImages: images, 
    setShootingHouseImages: setImages, 
    shootingHouseVideos: videos, 
    setShootingHouseVideos: setVideos 
  } = useData();
  const [loading, setLoading] = useState(false);

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Target items
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type, id }
  const [currentItem, setCurrentItem] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});



  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
  };

  // Reorder
  const handleMoveOrder = (listType, index, direction) => {
    const list = listType === 'images' ? images : videos;
    const setList = listType === 'images' ? setImages : setVideos;

    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const updated = [...list];
    const tempOrder = updated[index].displayOrder;
    updated[index].displayOrder = updated[targetIndex].displayOrder;
    updated[targetIndex].displayOrder = tempOrder;

    updated.sort((a, b) => a.displayOrder - b.displayOrder);
    setList(updated);
    addToast("Order modified successfully", "success");
  };

  // Delete handlers
  const triggerDelete = (type, id) => {
    setDeleteTarget({ type, id });
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    if (type === 'image') {
      setImages(prev => prev.filter(img => img.id !== id));
    } else {
      setVideos(prev => prev.filter(vid => vid.id !== id));
    }
    addToast("Record deleted successfully", "success");
  };

  // Open Form modal
  const openCreateModal = () => {
    setFormErrors({});
    setCurrentItem(null);

    if (activeTab === 'images') {
      setFormData({
        title: '',
        category: '',
        imagePath: '',
        displayOrder: images.length > 0 ? Math.max(...images.map(i => i.displayOrder)) + 1 : 1,
        status: 'active'
      });
    } else {
      setFormData({
        title: '',
        thumbnail: '',
        youtubeUrl: '',
        description: '',
        category: '',
        displayOrder: videos.length > 0 ? Math.max(...videos.map(v => v.displayOrder)) + 1 : 1,
        status: 'active'
      });
    }
    setIsFormOpen(true);
  };

  const openEditModal = (item) => {
    setFormErrors({});
    setCurrentItem(item);

    if (activeTab === 'images') {
      setFormData({
        title: item.title,
        category: item.category || '',
        imagePath: item.imagePath || '',
        displayOrder: item.displayOrder,
        status: item.status
      });
    } else {
      setFormData({
        title: item.title,
        thumbnail: item.thumbnail || '',
        youtubeUrl: item.youtubeUrl || '',
        description: item.description || '',
        category: item.category || '',
        displayOrder: item.displayOrder,
        status: item.status
      });
    }
    setIsFormOpen(true);
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.title?.trim()) errors.title = "Title is required";
    
    if (activeTab === 'images') {
      if (!formData.imagePath) errors.imagePath = "Image upload is required";
    } else {
      if (!formData.youtubeUrl?.trim()) {
        errors.youtubeUrl = "YouTube URL is required";
      } else if (!formData.youtubeUrl.includes('youtube.com') && !formData.youtubeUrl.includes('youtu.be')) {
        errors.youtubeUrl = "Invalid YouTube format";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (activeTab === 'images') {
      if (currentItem) {
        setImages(prev => prev.map(img => img.id === currentItem.id ? { ...img, ...formData } : img));
        addToast("Studio photo updated", "success");
      } else {
        const item = { id: `shi_${Math.random().toString(36).substring(2, 9)}`, ...formData };
        setImages(prev => [...prev, item].sort((a, b) => a.displayOrder - b.displayOrder));
        addToast("Studio photo added", "success");
      }
    } else {
      if (currentItem) {
        setVideos(prev => prev.map(vid => vid.id === currentItem.id ? { ...vid, ...formData } : vid));
        addToast("Studio walkthrough video updated", "success");
      } else {
        const item = { id: `shv_${Math.random().toString(36).substring(2, 9)}`, ...formData };
        setVideos(prev => [...prev, item].sort((a, b) => a.displayOrder - b.displayOrder));
        addToast("Studio walkthrough video added", "success");
      }
    }
    setIsFormOpen(false);
  };

  // Image columns list
  const imageColumns = [
    {
      key: 'imagePath',
      label: 'Photo',
      render: (item) => (
        <div 
          onClick={() => setZoomImage(item.imagePath)}
          className="w-14 aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in border border-zinc-100 hover:opacity-85"
        >
          <img src={item.imagePath} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )
    },
    { key: 'title', label: 'Studio Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'displayOrder',
      label: 'Order',
      render: (item, idx) => (
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={images.findIndex(img => img.id === item.id) === 0}
              onClick={() => handleMoveOrder('images', images.findIndex(img => img.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={images.findIndex(img => img.id === item.id) === images.length - 1}
              onClick={() => handleMoveOrder('images', images.findIndex(img => img.id === item.id), 1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <button
          onClick={() => {
            const next = item.status === 'active' ? 'inactive' : 'active';
            setImages(prev => prev.map(img => img.id === item.id ? { ...img, status: next } : img));
            addToast(`Photo status updated`, "info");
          }}
        >
          <StatusBadge status={item.status} />
        </button>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => openEditModal(item)} className="p-2 rounded-xl text-zinc-500 hover:text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => triggerDelete('image', item.id)} className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Video Columns list
  const videoColumns = [
    {
      key: 'thumbnail',
      label: 'Thumbnail',
      render: (item) => (
        <div className="w-20 aspect-video rounded-lg overflow-hidden border relative group bg-black">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          <button 
            onClick={() => setActiveVideo({ url: item.youtubeUrl, title: item.title })}
            className="absolute inset-0 flex items-center justify-center text-white bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="w-4.5 h-4.5 animate-pulse" />
          </button>
        </div>
      )
    },
    { key: 'title', label: 'Video Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'displayOrder',
      label: 'Order',
      render: (item, idx) => (
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={videos.findIndex(v => v.id === item.id) === 0}
              onClick={() => handleMoveOrder('videos', videos.findIndex(v => v.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={videos.findIndex(v => v.id === item.id) === videos.length - 1}
              onClick={() => handleMoveOrder('videos', videos.findIndex(v => v.id === item.id), 1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <button
          onClick={() => {
            const next = item.status === 'active' ? 'inactive' : 'active';
            setVideos(prev => prev.map(vid => vid.id === item.id ? { ...vid, status: next } : vid));
            addToast(`Video status updated`, "info");
          }}
        >
          <StatusBadge status={item.status} />
        </button>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => openEditModal(item)} className="p-2 rounded-xl text-zinc-500 hover:text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => triggerDelete('video', item.id)} className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const getListData = () => {
    const list = activeTab === 'images' ? images : videos;
    if (!searchTerm) return list;
    return list.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const activeItems = getListData();

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Shooting House Management
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Showcase sound design suites, camera setups, dubbing and editing rooms.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all self-start sm:self-center active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Shooting House {activeTab === 'images' ? 'Image' : 'Video'}</span>
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-250/80 dark:border-zinc-900 select-none pb-0.5">
        {[
          { id: 'images', label: 'Images Gallery', icon: <ImageIcon className="w-4.5 h-4.5" /> },
          { id: 'videos', label: 'Walkthrough Videos', icon: <Tv className="w-4.5 h-4.5" /> }
        ].map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs md:text-sm tracking-wide transition-all ${
                isActive 
                  ? 'border-primary text-primary dark:border-rose-500 dark:text-rose-500' 
                  : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Toolbar */}
      <div className="flex items-center bg-white/40 dark:bg-zinc-900/10 border border-zinc-150/80 dark:border-zinc-805/40 p-4 rounded-3xl backdrop-blur-md">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder={`Search shooting house ${activeTab}...`} 
        />
      </div>

      {/* Listing */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'images' ? (
            <DataTable
              columns={imageColumns}
              data={activeItems}
              loading={loading}
              pagination={{ currentPage: 1, totalPages: 1 }}
              emptyStateReset={() => setSearchTerm('')}
            />
          ) : (
            <DataTable
              columns={videoColumns}
              data={activeItems}
              loading={loading}
              pagination={{ currentPage: 1, totalPages: 1 }}
              emptyStateReset={() => setSearchTerm('')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* CRUD MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentItem ? "Edit Shooting House Resource" : "Add Shooting House Resource"}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dubbing Theatre Alpha"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {formErrors.title && <span className="text-xs text-rose-500 font-semibold">{formErrors.title}</span>}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Category</label>
            <input
              type="text"
              placeholder="e.g. Dubbing Studio, Audio Bay, VFX Lab"
              value={formData.category || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* IMAGE UPLOAD SPECIFIC */}
          {activeTab === 'images' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Space Photo *</label>
              <ImageUpload
                images={formData.imagePath ? [formData.imagePath] : []}
                onChange={(urls) => setFormData(prev => ({ ...prev, imagePath: urls[0] || '' }))}
              />
              {formErrors.imagePath && <span className="text-xs text-rose-500 font-semibold">{formErrors.imagePath}</span>}
            </div>
          )}

          {/* VIDEO SPECIFIC */}
          {activeTab === 'videos' && (
            <>
              {/* YouTube URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">YouTube URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtubeUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {formErrors.youtubeUrl && <span className="text-xs text-rose-500 font-semibold">{formErrors.youtubeUrl}</span>}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Short Description</label>
                <textarea
                  rows="3"
                  placeholder="Insert equipment details or camera parameters..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm"
                />
              </div>

              {/* Thumbnail Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Video Thumbnail Cover</label>
                <ImageUpload
                  images={formData.thumbnail ? [formData.thumbnail] : []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, thumbnail: urls[0] || '' }))}
                />
              </div>
            </>
          )}

          {/* Unified Fields: Order & Status */}
          <div className="flex items-center gap-6 border-t border-zinc-100 dark:border-zinc-850 pt-4 select-none">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase">Display Order Position</label>
              <input
                type="number"
                min="1"
                required
                value={formData.displayOrder || 1}
                onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none"
              />
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-zinc-700 dark:text-zinc-350 self-end mb-2.5">
              <input
                type="checkbox"
                checked={formData.status === 'active'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'active' : 'inactive' }))}
                className="w-4 h-4 rounded text-primary"
              />
              <span>Mark Active Status</span>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center gap-3 border-t border-zinc-105 dark:border-zinc-850 pt-4">
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
              Save Details
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this studio resource? It will be removed from the public website shooting house pages."
      />

      {/* ZOOM IMAGE MODAL */}
      <Modal
        isOpen={!!zoomImage}
        onClose={() => setZoomImage(null)}
        title="Studio Photo Preview"
        size="lg"
      >
        <div className="w-full flex items-center justify-center p-2 bg-white dark:bg-zinc-950 rounded-2xl">
          <img src={zoomImage} alt="Studio Zoom" className="max-w-full max-h-[70vh] object-contain rounded-xl" />
        </div>
      </Modal>

      {/* VIDEO PREVIEW MODAL */}
      {activeVideo && (
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
          size="lg"
        >
          <VideoPreview url={activeVideo.url} title={activeVideo.title} />
        </Modal>
      )}
    </div>
  );
};

export default ShootingHouseManager;
