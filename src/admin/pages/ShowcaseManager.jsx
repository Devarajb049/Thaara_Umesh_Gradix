import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Star,
  Tv,
  ExternalLink
} from 'lucide-react';
import { mockShowcases } from '../dummyData';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import VideoPreview from '../components/VideoPreview';
import DeleteConfirmation from '../components/DeleteConfirmation';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const ShowcaseManager = () => {
  const { addToast } = useToast();
  const { showcases, setShowcases } = useData();
  const [loading, setLoading] = useState(false);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  // Form Fields
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    thumbnail: '',
    youtubeUrl: '',
    category: 'Commercials',
    tags: '',
    duration: '',
    displayOrder: 1,
    featured: false,
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  // Filter lists
  const filteredShowcases = showcases.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Automatically generate slug from title
  const handleTitleChange = (val) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData(prev => ({ 
      ...prev, 
      title: val,
      slug: generatedSlug
    }));
  };

  // Reordering logic
  const handleMoveOrder = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= filteredShowcases.length) return;

    const updated = [...showcases];
    const actualIndex = showcases.findIndex(s => s.id === filteredShowcases[index].id);
    const actualTargetIndex = showcases.findIndex(s => s.id === filteredShowcases[targetIndex].id);

    if (actualIndex !== -1 && actualTargetIndex !== -1) {
      const tempOrder = updated[actualIndex].displayOrder;
      updated[actualIndex].displayOrder = updated[actualTargetIndex].displayOrder;
      updated[actualTargetIndex].displayOrder = tempOrder;

      updated.sort((a, b) => a.displayOrder - b.displayOrder);
      setShowcases(updated);
      addToast("Showcase sorting updated", "success");
    }
  };

  // Create Modal Open
  const openCreateModal = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      thumbnail: '',
      youtubeUrl: '',
      category: 'Commercials',
      tags: '',
      duration: '',
      displayOrder: showcases.length > 0 ? Math.max(...showcases.map(s => s.displayOrder)) + 1 : 1,
      featured: false,
      status: 'active'
    });
    setFormErrors({});
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  // Edit Modal Open
  const openEditModal = (item) => {
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      thumbnail: item.thumbnail || '',
      youtubeUrl: item.youtubeUrl || '',
      category: item.category || 'Commercials',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      duration: item.duration || '',
      displayOrder: item.displayOrder,
      featured: item.featured || false,
      status: item.status
    });
    setFormErrors({});
    setCurrentItem(item);
    setIsFormOpen(true);
  };

  // Validations
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.slug.trim()) errors.slug = "Slug is required";
    if (!formData.youtubeUrl.trim()) {
      errors.youtubeUrl = "YouTube URL is required";
    } else if (!formData.youtubeUrl.includes('youtube.com') && !formData.youtubeUrl.includes('youtu.be')) {
      errors.youtubeUrl = "Must enter a valid YouTube video address";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Record
  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Convert tags string to array
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    if (currentItem) {
      // Edit
      setShowcases(prev => prev.map(s => s.id === currentItem.id ? {
        ...s,
        ...formData,
        tags: tagsArray,
        updatedAt: new Date().toISOString()
      } : s));
      addToast(`Showcase "${formData.title}" updated successfully`, "success");
    } else {
      // Create
      const newShow = {
        id: `show_${Math.random().toString(36).substring(2, 9)}`,
        ...formData,
        tags: tagsArray,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setShowcases(prev => [...prev, newShow].sort((a, b) => a.displayOrder - b.displayOrder));
      addToast(`Showcase "${formData.title}" created successfully`, "success");
    }
    setIsFormOpen(false);
  };

  // Single Delete
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    setShowcases(prev => prev.filter(s => s.id !== deleteTargetId));
    setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
    addToast("Showcase record deleted successfully", "success");
  };

  // Bulk Delete
  const handleConfirmBulkDelete = () => {
    setShowcases(prev => prev.filter(s => !selectedIds.includes(s.id)));
    setSelectedIds([]);
    addToast("Selected showcases deleted successfully", "success");
  };

  // Select callbacks
  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredShowcases.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredShowcases.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShowcases.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'thumbnail',
      label: 'Video',
      render: (item) => (
        <div className="w-24 aspect-video rounded-xl overflow-hidden relative group shadow-sm border border-zinc-100 bg-black">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-all" />
          <button 
            onClick={() => setActiveVideo({ url: item.youtubeUrl, title: item.title })}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <Eye className="w-4 h-4 bg-zinc-900/60 p-1 rounded-full hover:scale-110 transition-transform" />
          </button>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title & Info',
      sortable: true,
      render: (item) => (
        <div className="flex flex-col text-left gap-1 max-w-xs">
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-200 line-clamp-1">{item.title}</span>
          <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-550 uppercase tracking-widest">{item.category} • {item.duration || '00:00'}</span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {item.tags?.map((t, idx) => (
              <span key={idx} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                #{t}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'displayOrder',
      label: 'Display Order',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1">
          <span className="font-semibold w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={showcases.findIndex(s => s.id === item.id) === 0}
              onClick={() => handleMoveOrder(filteredShowcases.findIndex(s => s.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={showcases.findIndex(s => s.id === item.id) === showcases.length - 1}
              onClick={() => handleMoveOrder(filteredShowcases.findIndex(s => s.id === item.id), 1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (item) => (
        <button
          onClick={() => {
            setShowcases(prev => prev.map(s => s.id === item.id ? { ...s, featured: !s.featured } : s));
            addToast(`Showcase featured state toggled`, "info");
          }}
          className={`p-1 rounded-lg transition-colors ${
            item.featured ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10' : 'text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          }`}
        >
          <Star className={`w-5.5 h-5.5 ${item.featured ? 'fill-current' : ''}`} />
        </button>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <button
          onClick={() => {
            const next = item.status === 'active' ? 'inactive' : 'active';
            setShowcases(prev => prev.map(s => s.id === item.id ? { ...s, status: next } : s));
            addToast(`Showcase state toggled to ${next}`, "info");
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
          <button
            onClick={() => openEditModal(item)}
            className="p-2 rounded-xl text-zinc-500 hover:text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
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
            Manage commercial ad films and short film reels that showcase client acting assignments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all self-start sm:self-center active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Showcase</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/10 border border-zinc-150/80 dark:border-zinc-805/40 p-4 rounded-3xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-4">
          <SearchBar 
            value={searchTerm} 
            onChange={(val) => { setSearchTerm(val); setCurrentPage(1); }} 
            placeholder="Search by title or description..." 
          />
          
          <Filters 
            filters={[
              { 
                name: 'category', 
                label: 'Category', 
                choices: [
                  { value: 'Commercials', label: 'Commercials' }, 
                  { value: 'Short Films', label: 'Short Films' },
                  { value: 'Feature Films', label: 'Feature Films' }
                ] 
              },
              { 
                name: 'status', 
                label: 'Status', 
                choices: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] 
              }
            ]} 
            values={{ category: categoryFilter, status: statusFilter }} 
            onChange={(name, val) => { 
              if (name === 'category') setCategoryFilter(val);
              if (name === 'status') setStatusFilter(val);
              setCurrentPage(1); 
            }} 
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={currentItems}
        loading={loading}
        selectedIds={selectedIds}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onBulkDelete={() => setIsBulkDeleteOpen(true)}
        allIds={filteredShowcases.map(s => s.id)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage
        }}
        emptyStateReset={() => {
          setSearchTerm('');
          setCategoryFilter('');
          setStatusFilter('');
          setCurrentPage(1);
        }}
      />

      {/* VIDEO PREVIEW OVERLAY */}
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

      {/* FORM MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentItem ? "Edit Showcase Video" : "Add New Showcase Video"}
        size="lg"
      >
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          
          {/* Title */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Showcase Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Asian Paints TV Commercial"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
            {formErrors.title && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.title}</span>
            )}
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. asian-paints-tv-commercial"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
            {formErrors.slug && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.slug}</span>
            )}
          </div>

          {/* YouTube Video URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              YouTube Video URL *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              value={formData.youtubeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
            {formErrors.youtubeUrl && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.youtubeUrl}</span>
            )}
          </div>

          {/* Category selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Showcase Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200 text-zinc-700 dark:bg-zinc-900"
            >
              <option value="Commercials">Commercials</option>
              <option value="Short Films">Short Films</option>
              <option value="Feature Films">Feature Films</option>
            </select>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Duration (e.g. 00:30, 45 mins)
            </label>
            <input
              type="text"
              placeholder="e.g. 00:45"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Paints, Fashion, Glamour"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Description
            </label>
            <textarea
              placeholder="Detailed description of the showcase project details, shoot configurations, or placement remarks..."
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
          </div>

          {/* Display Order Position */}
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

          {/* Thumbnail Upload component */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Custom Thumbnail Image (leave blank for automatic YouTube extraction)
            </label>
            <ImageUpload
              images={formData.thumbnail ? [formData.thumbnail] : []}
              onChange={(urls) => setFormData(prev => ({ ...prev, thumbnail: urls[0] || '' }))}
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-8 md:col-span-2 border-t border-zinc-100 dark:border-zinc-850 pt-4 mt-2 select-none">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={formData.status === 'active'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'active' : 'inactive' }))}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span>Mark Active</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span>Featured Showcase</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:col-span-2 border-t border-zinc-100 dark:border-zinc-850 pt-4 mt-2">
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
              Save Showcase
            </button>
          </div>
        </form>
      </Modal>

      {/* SINGLE DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this showcase item? It will be removed from the public website showcase catalog."
      />

      {/* BULK DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Showcases"
        message={`Are you sure you want to bulk delete the ${selectedIds.length} selected showcases?`}
      />
    </div>
  );
};

export default ShowcaseManager;
