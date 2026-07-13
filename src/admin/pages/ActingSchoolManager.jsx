import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Calendar,
  Image as ImageIcon,
  Tv,
  MessageSquare
} from 'lucide-react';
import { mockTestimonials, mockWorkshops, mockEvents } from '../dummyData';
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

const ActingSchoolManager = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials' | 'workshops' | 'ignite'

  // Datasets state
  const { 
    testimonials, setTestimonials, 
    workshops, setWorkshops, 
    events, setEvents 
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
  const [activeGallery, setActiveGallery] = useState(null); // Array of image URLs for preview

  // Form Fields - Unified state, mapped depending on tab
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});



  // Reset search when switching tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
  };

  // Reordering display lists
  const handleMoveOrder = (listType, index, direction) => {
    let list, setList;
    if (listType === 'testimonials') { list = testimonials; setList = setTestimonials; }
    else if (listType === 'workshops') { list = workshops; setList = setWorkshops; }
    else { list = events; setList = setEvents; }

    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const updated = [...list];
    const tempOrder = updated[index].displayOrder;
    updated[index].displayOrder = updated[targetIndex].displayOrder;
    updated[targetIndex].displayOrder = tempOrder;

    updated.sort((a, b) => a.displayOrder - b.displayOrder);
    setList(updated);
    addToast("Order rearranged successfully", "success");
  };

  // Delete Triggers
  const triggerDelete = (type, id) => {
    setDeleteTarget({ type, id });
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    if (type === 'testimonial') {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } else if (type === 'workshop') {
      setWorkshops(prev => prev.filter(w => w.id !== id));
    } else if (type === 'event') {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
    addToast("Item removed successfully", "success");
  };

  // Modal Openers
  const openCreateModal = () => {
    setFormErrors({});
    setCurrentItem(null);

    if (activeTab === 'testimonials') {
      setFormData({
        personName: '',
        designation: '',
        photo: '',
        review: '',
        displayOrder: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.displayOrder)) + 1 : 1,
        status: 'active'
      });
    } else if (activeTab === 'workshops') {
      setFormData({
        title: '',
        description: '',
        thumbnail: '',
        youtubeUrl: '',
        duration: '',
        category: 'Workshop',
        displayOrder: workshops.length > 0 ? Math.max(...workshops.map(w => w.displayOrder)) + 1 : 1,
        status: 'active'
      });
    } else {
      setFormData({
        eventTitle: '',
        description: '',
        eventDate: '',
        eventCoverImage: '',
        galleryImages: [],
        displayOrder: events.length > 0 ? Math.max(...events.map(e => e.displayOrder)) + 1 : 1,
        status: 'active'
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
        displayOrder: item.displayOrder,
        status: item.status
      });
    } else if (activeTab === 'workshops') {
      setFormData({
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail || '',
        youtubeUrl: item.youtubeUrl || '',
        duration: item.duration || '',
        category: item.category || 'Workshop',
        displayOrder: item.displayOrder,
        status: item.status
      });
    } else {
      setFormData({
        eventTitle: item.eventTitle,
        description: item.description,
        eventDate: item.eventDate || '',
        eventCoverImage: item.eventCoverImage || '',
        galleryImages: item.galleryImages ? [...item.galleryImages] : [],
        displayOrder: item.displayOrder,
        status: item.status
      });
    }

    setIsFormOpen(true);
  };

  // Validations
  const validateForm = () => {
    const errors = {};
    if (activeTab === 'testimonials') {
      if (!formData.personName?.trim()) errors.personName = "Name is required";
      if (!formData.review?.trim()) errors.review = "Review is required";
      if (!formData.photo) errors.photo = "Photo is required";
    } else if (activeTab === 'workshops') {
      if (!formData.title?.trim()) errors.title = "Title is required";
      if (!formData.youtubeUrl?.trim()) {
        errors.youtubeUrl = "YouTube URL is required";
      } else if (!formData.youtubeUrl.includes('youtube.com') && !formData.youtubeUrl.includes('youtu.be')) {
        errors.youtubeUrl = "Invalid YouTube format";
      }
    } else {
      if (!formData.eventTitle?.trim()) errors.eventTitle = "Event Title is required";
      if (!formData.eventDate) errors.eventDate = "Event Date is required";
      if (!formData.eventCoverImage) errors.eventCoverImage = "Cover Image is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (activeTab === 'testimonials') {
      if (currentItem) {
        setTestimonials(prev => prev.map(t => t.id === currentItem.id ? { ...t, ...formData } : t));
        addToast("Testimonial updated", "success");
      } else {
        const item = { id: `t_${Math.random().toString(36).substring(2, 9)}`, ...formData };
        setTestimonials(prev => [...prev, item].sort((a, b) => a.displayOrder - b.displayOrder));
        addToast("Testimonial created", "success");
      }
    } else if (activeTab === 'workshops') {
      if (currentItem) {
        setWorkshops(prev => prev.map(w => w.id === currentItem.id ? { ...w, ...formData } : w));
        addToast("Workshop video updated", "success");
      } else {
        const item = { id: `w_${Math.random().toString(36).substring(2, 9)}`, ...formData };
        setWorkshops(prev => [...prev, item].sort((a, b) => a.displayOrder - b.displayOrder));
        addToast("Workshop video created", "success");
      }
    } else {
      if (currentItem) {
        setEvents(prev => prev.map(ev => ev.id === currentItem.id ? { ...ev, ...formData } : ev));
        addToast("Ignite Event updated", "success");
      } else {
        const item = { id: `e_${Math.random().toString(36).substring(2, 9)}`, ...formData };
        setEvents(prev => [...prev, item].sort((a, b) => a.displayOrder - b.displayOrder));
        addToast("Ignite Event created", "success");
      }
    }
    setIsFormOpen(false);
  };

  // Testimonials Tab list columns
  const testimonialColumns = [
    {
      key: 'photo',
      label: 'Photo',
      render: (item) => (
        <img src={item.photo} alt={item.personName} className="w-10 h-10 rounded-full object-cover border" />
      )
    },
    { key: 'personName', label: 'Name' },
    { key: 'designation', label: 'Designation' },
    {
      key: 'review',
      label: 'Review text',
      render: (item) => <p className="line-clamp-2 max-w-xs text-xs text-zinc-550">{item.review}</p>
    },
    {
      key: 'displayOrder',
      label: 'Display Order',
      render: (item, idx) => (
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={testimonials.findIndex(t => t.id === item.id) === 0}
              onClick={() => handleMoveOrder('testimonials', testimonials.findIndex(t => t.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={testimonials.findIndex(t => t.id === item.id) === testimonials.length - 1}
              onClick={() => handleMoveOrder('testimonials', testimonials.findIndex(t => t.id === item.id), 1)}
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
            setTestimonials(prev => prev.map(t => t.id === item.id ? { ...t, status: next } : t));
            addToast(`Testimonial status updated`, "info");
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
          <button onClick={() => triggerDelete('testimonial', item.id)} className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Workshops Columns
  const workshopColumns = [
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
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'duration', label: 'Duration' },
    {
      key: 'displayOrder',
      label: 'Order',
      render: (item, idx) => (
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={workshops.findIndex(w => w.id === item.id) === 0}
              onClick={() => handleMoveOrder('workshops', workshops.findIndex(w => w.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={workshops.findIndex(w => w.id === item.id) === workshops.length - 1}
              onClick={() => handleMoveOrder('workshops', workshops.findIndex(w => w.id === item.id), 1)}
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
            setWorkshops(prev => prev.map(w => w.id === item.id ? { ...w, status: next } : w));
            addToast(`Workshop status updated`, "info");
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
          <button onClick={() => triggerDelete('workshop', item.id)} className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Events Columns
  const eventColumns = [
    {
      key: 'eventCoverImage',
      label: 'Cover',
      render: (item) => (
        <img src={item.eventCoverImage} alt={item.eventTitle} className="w-16 aspect-[4/3] rounded-lg object-cover border bg-zinc-50" />
      )
    },
    { key: 'eventTitle', label: 'Event Title' },
    {
      key: 'eventDate',
      label: 'Event Date',
      render: (item) => (
        <span className="flex items-center gap-1.5 text-zinc-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(item.eventDate).toLocaleDateString()}</span>
        </span>
      )
    },
    {
      key: 'galleryImages',
      label: 'Gallery Preview',
      render: (item) => (
        <button
          onClick={() => setActiveGallery(item.galleryImages)}
          className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-rose-450 hover:underline font-semibold"
        >
          <ImageIcon className="w-4 h-4" />
          <span>{item.galleryImages?.length || 0} Images</span>
        </button>
      )
    },
    {
      key: 'displayOrder',
      label: 'Order',
      render: (item, idx) => (
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={events.findIndex(e => e.id === item.id) === 0}
              onClick={() => handleMoveOrder('events', events.findIndex(e => e.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={events.findIndex(e => e.id === item.id) === events.length - 1}
              onClick={() => handleMoveOrder('events', events.findIndex(e => e.id === item.id), 1)}
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
            setEvents(prev => prev.map(ev => ev.id === item.id ? { ...ev, status: next } : ev));
            addToast(`Event status updated`, "info");
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
          <button onClick={() => triggerDelete('event', item.id)} className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Helper lists depending on current active tab
  const getTabLabel = () => {
    if (activeTab === 'testimonials') return 'Testimonial';
    if (activeTab === 'workshops') return 'Workshop Video';
    return 'Ignite Event';
  };

  const getListData = () => {
    let currentList = [];
    if (activeTab === 'testimonials') currentList = testimonials;
    else if (activeTab === 'workshops') currentList = workshops;
    else currentList = events;

    if (!searchTerm) return currentList;
    
    return currentList.filter(item => {
      const name = item.personName || item.title || item.eventTitle || '';
      const desc = item.review || item.description || '';
      return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             desc.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const activeItems = getListData();

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Acting School Management
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Dynamically adjust course testimonials, student portfolio highlights, and graduation day memories.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all self-start sm:self-center active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add {getTabLabel()}</span>
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-250/80 dark:border-zinc-900 select-none pb-0.5">
        {[
          { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-4.5 h-4.5" /> },
          { id: 'workshops', label: 'Workshops & Student Reels', icon: <Tv className="w-4.5 h-4.5" /> },
          { id: 'ignite', label: 'Ignite Graduation Events', icon: <Calendar className="w-4.5 h-4.5" /> }
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
          placeholder={`Search ${activeTab}...`} 
        />
      </div>

      {/* Dynamic Data Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'testimonials' && (
            <DataTable
              columns={testimonialColumns}
              data={activeItems}
              loading={loading}
              pagination={{ currentPage: 1, totalPages: 1 }}
              emptyStateReset={() => setSearchTerm('')}
            />
          )}

          {activeTab === 'workshops' && (
            <DataTable
              columns={workshopColumns}
              data={activeItems}
              loading={loading}
              pagination={{ currentPage: 1, totalPages: 1 }}
              emptyStateReset={() => setSearchTerm('')}
            />
          )}

          {activeTab === 'ignite' && (
            <DataTable
              columns={eventColumns}
              data={activeItems}
              loading={loading}
              pagination={{ currentPage: 1, totalPages: 1 }}
              emptyStateReset={() => setSearchTerm('')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* FORM DIALOG */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentItem ? `Edit ${getTabLabel()}` : `Add New ${getTabLabel()}`}
        size="lg"
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
          
          {/* TAB 1: TESTIMONIAL FORM FIELDS */}
          {activeTab === 'testimonials' && (
            <>
              {/* Person Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Madhavan K."
                  value={formData.personName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, personName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1"
                />
              </div>

              {/* Designation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Designation / Batch</label>
                <input
                  type="text"
                  placeholder="e.g. Alumni / Actor"
                  value={formData.designation || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1"
                />
              </div>

              {/* Photo */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Profile Photo *</label>
                <ImageUpload
                  images={formData.photo ? [formData.photo] : []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, photo: urls[0] || '' }))}
                />
                {formErrors.photo && <span className="text-xs text-rose-500 font-semibold">{formErrors.photo}</span>}
              </div>

              {/* Review Text */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Review / Feedback Description *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Insert acting school feedback or course review notes..."
                  value={formData.review || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1"
                />
              </div>
            </>
          )}

          {/* TAB 2: WORKSHOP / REEL FORM FIELDS */}
          {activeTab === 'workshops' && (
            <>
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dialogue Delivery Masterclass"
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none"
                />
              </div>

              {/* YouTube Video URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">YouTube URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtubeUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none"
                />
                {formErrors.youtubeUrl && <span className="text-xs text-rose-500 font-semibold">{formErrors.youtubeUrl}</span>}
              </div>

              {/* Workshop Duration */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Duration / Length</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Weeks, 45 mins"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Reel Category</label>
                <select
                  value={formData.category || 'Workshop'}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Student Testimonial">Student Testimonial</option>
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Short Description</label>
                <textarea
                  rows="3"
                  placeholder="Summarize course takeaways or video context details..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none"
                />
              </div>

              {/* Thumbnail Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Custom Thumbnail Image</label>
                <ImageUpload
                  images={formData.thumbnail ? [formData.thumbnail] : []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, thumbnail: urls[0] || '' }))}
                />
              </div>
            </>
          )}

          {/* TAB 3: IGNITE EVENT FORM FIELDS */}
          {activeTab === 'ignite' && (
            <>
              {/* Event Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ignite Graduation Day 2026"
                  value={formData.eventTitle || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventTitle: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm"
                />
              </div>

              {/* Event Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Event Date *</label>
                <input
                  type="date"
                  required
                  value={formData.eventDate || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Event Summary Description</label>
                <textarea
                  rows="3"
                  placeholder="Detail the event activities, student milestones, or chief guest lists..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm"
                />
              </div>

              {/* Cover Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Cover Image *</label>
                <ImageUpload
                  images={formData.eventCoverImage ? [formData.eventCoverImage] : []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, eventCoverImage: urls[0] || '' }))}
                />
                {formErrors.eventCoverImage && <span className="text-xs text-rose-500 font-semibold">{formErrors.eventCoverImage}</span>}
              </div>

              {/* Gallery Images (MULTIPLE UPLOAD & REORDERING) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Event Gallery Images (Upload Multiple, click arrows to adjust layout order)
                </label>
                <ImageUpload
                  multiple={true}
                  images={formData.galleryImages || []}
                  onChange={(urls) => setFormData(prev => ({ ...prev, galleryImages: urls }))}
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

      {/* DELETE DIALOG */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this acting school record? It will be removed immediately from the page layouts."
      />

      {/* VIDEO MODAL PLAYER */}
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

      {/* MULTIPLE IMAGE GALLERY PREVIEW */}
      <Modal
        isOpen={!!activeGallery}
        onClose={() => setActiveGallery(null)}
        title="Event Gallery Images"
        size="lg"
      >
        <div className="flex flex-col gap-4">
          {activeGallery && activeGallery.length === 0 ? (
            <p className="text-zinc-400 text-sm py-8">No images in this gallery yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
              {activeGallery?.map((url, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-850 bg-white">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-103 transition-transform cursor-zoom-in" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ActingSchoolManager;
