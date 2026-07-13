import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  X, 
  Star,
  Loader2
} from 'lucide-react';
import { mockClients } from '../dummyData';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import DeleteConfirmation from '../components/DeleteConfirmation';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const ClientsManager = () => {
  const { addToast } = useToast();
  const { clients, setClients } = useData();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Selection States
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Item active states for edit/delete
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  
  // Form Fields State
  const [formData, setFormData] = useState({
    clientName: '',
    category: '',
    logo: '',
    status: 'active',
    featured: false,
    displayOrder: 1
  });
  const [formErrors, setFormErrors] = useState({});

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter & Search logic
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? client.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Reorder logic (Shift display positions)
  const handleMoveOrder = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= filteredClients.length) return;

    const updated = [...clients];
    // Find index of matching items in the main list
    const actualIndex = clients.findIndex(c => c.id === filteredClients[index].id);
    const actualTargetIndex = clients.findIndex(c => c.id === filteredClients[targetIndex].id);

    if (actualIndex !== -1 && actualTargetIndex !== -1) {
      // Swap displayOrder values
      const tempOrder = updated[actualIndex].displayOrder;
      updated[actualIndex].displayOrder = updated[actualTargetIndex].displayOrder;
      updated[actualTargetIndex].displayOrder = tempOrder;

      // Sort and update
      updated.sort((a, b) => a.displayOrder - b.displayOrder);
      setClients(updated);
      addToast("Display order rearranged successfully", "success");
    }
  };

  // Open Form for Create
  const openCreateModal = () => {
    setFormData({
      clientName: '',
      category: '',
      logo: '',
      status: 'active',
      featured: false,
      displayOrder: clients.length > 0 ? Math.max(...clients.map(c => c.displayOrder)) + 1 : 1
    });
    setFormErrors({});
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const openEditModal = (client) => {
    setFormData({
      clientName: client.clientName,
      category: client.category || '',
      logo: client.logo || '',
      status: client.status,
      featured: client.featured || false,
      displayOrder: client.displayOrder
    });
    setFormErrors({});
    setCurrentItem(client);
    setIsFormOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.clientName.trim()) {
      errors.clientName = "Client Name is required";
    }
    if (!formData.logo) {
      errors.logo = "Client Logo image is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Record
  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (currentItem) {
      // Edit mode
      setClients(prev => prev.map(c => c.id === currentItem.id ? {
        ...c,
        ...formData,
        updatedAt: new Date().toISOString()
      } : c));
      addToast(`Client "${formData.clientName}" updated successfully`, "success");
    } else {
      // Create mode
      const newClient = {
        id: `c_${Math.random().toString(36).substring(2, 9)}`,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setClients(prev => [...prev, newClient].sort((a, b) => a.displayOrder - b.displayOrder));
      addToast(`Client "${formData.clientName}" added successfully`, "success");
    }
    setIsFormOpen(false);
  };

  // Delete Action triggers
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    setClients(prev => prev.filter(c => c.id !== deleteTargetId));
    setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
    addToast("Client profile deleted successfully", "success");
  };

  // Bulk Delete actions
  const handleConfirmBulkDelete = () => {
    setClients(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setSelectedIds([]);
    addToast("Selected clients deleted successfully", "success");
  };

  // Selection callbacks
  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredClients.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'logo',
      label: 'Logo',
      render: (item) => (
        <div 
          onClick={() => setPreviewImage(item.logo)}
          className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer hover:opacity-85 border border-zinc-100 dark:border-zinc-800 bg-white"
        >
          <img src={item.logo} alt={item.clientName} className="w-full h-full object-contain" />
        </div>
      )
    },
    { key: 'clientName', label: 'Client Name', sortable: true },
    { key: 'category', label: 'Category' },
    {
      key: 'displayOrder',
      label: 'Display Order',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1">
          <span className="font-semibold w-6">{item.displayOrder}</span>
          <div className="flex flex-col">
            <button 
              disabled={clients.findIndex(c => c.id === item.id) === 0}
              onClick={() => handleMoveOrder(filteredClients.findIndex(c => c.id === item.id), -1)}
              className="p-0.5 hover:text-primary disabled:opacity-30 disabled:hover:text-inherit"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={clients.findIndex(c => c.id === item.id) === clients.length - 1}
              onClick={() => handleMoveOrder(filteredClients.findIndex(c => c.id === item.id), 1)}
              className="p-0.5 hover:text-primary disabled:opacity-30 disabled:hover:text-inherit"
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
            setClients(prev => prev.map(c => c.id === item.id ? { ...c, featured: !c.featured } : c));
            addToast(`Featured status toggled for ${item.clientName}`, "info");
          }}
          className={`p-1 rounded-lg transition-colors ${
            item.featured 
              ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10' 
              : 'text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
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
            const nextStatus = item.status === 'active' ? 'inactive' : 'active';
            setClients(prev => prev.map(c => c.id === item.id ? { ...c, status: nextStatus } : c));
            addToast(`Client ${item.clientName} is now ${nextStatus}`, "info");
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
            className="p-2 rounded-xl text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
            title="Edit Client"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            title="Delete Client"
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
            Clients Management
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Display and manage brand logs featured on the public website homepage.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark shadow-lg shadow-primary/15 transition-all self-start sm:self-center active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/10 border border-zinc-150/80 dark:border-zinc-805/40 p-4 rounded-3xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-4">
          <SearchBar 
            value={searchTerm} 
            onChange={(val) => { setSearchTerm(val); setCurrentPage(1); }} 
            placeholder="Search by client name..." 
          />
          <Filters 
            filters={[{ 
              name: 'status', 
              label: 'Status', 
              choices: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] 
            }]} 
            values={{ status: statusFilter }} 
            onChange={(name, val) => { setStatusFilter(val); setCurrentPage(1); }} 
          />
        </div>

        {/* View Mode & Selection count */}
        <div className="flex items-center gap-3 self-end md:self-center select-none">
          <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 p-1 bg-white/70 dark:bg-zinc-900/40">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'table' 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-xs' 
                  : 'text-zinc-400 hover:text-zinc-650'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'grid' 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-xs' 
                  : 'text-zinc-400 hover:text-zinc-650'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Listing View */}
      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={currentItems}
          loading={loading}
          selectedIds={selectedIds}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          onBulkDelete={() => setIsBulkDeleteOpen(true)}
          allIds={filteredClients.map(c => c.id)}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage
          }}
          emptyStateReset={() => {
            setSearchTerm('');
            setStatusFilter('');
            setCurrentPage(1);
          }}
        />
      ) : (
        /* GRID VIEW */
        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="aspect-square rounded-3xl bg-zinc-100 dark:bg-zinc-850 animate-pulse border border-zinc-100/60 dark:border-zinc-900" />
              ))}
            </div>
          ) : filteredClients.length === 0 ? (
            <DataTable 
              columns={[]} 
              data={[]} 
              emptyStateReset={() => { setSearchTerm(''); setStatusFilter(''); }} 
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredClients.map((client, idx) => (
                <div
                  key={client.id}
                  className={`group relative flex flex-col items-center justify-center p-6 bg-white/70 dark:bg-zinc-900/40 border rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                    client.status === 'inactive' ? 'opacity-60 border-zinc-100 dark:border-zinc-900' : 'border-zinc-150/80 dark:border-zinc-800'
                  }`}
                >
                  {/* Featured tag */}
                  {client.featured && (
                    <div className="absolute top-3.5 right-3.5 text-amber-500" title="Featured Client">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  )}

                  {/* Logo click triggers Zoom */}
                  <div 
                    onClick={() => setPreviewImage(client.logo)}
                    className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-zoom-in mb-4"
                  >
                    <img src={client.logo} alt={client.clientName} className="w-[80%] h-[80%] object-contain" />
                  </div>

                  <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200 text-center truncate w-full mb-1">
                    {client.clientName}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-4">
                    {client.category || 'No Category'}
                  </p>

                  <div className="flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-3.5 w-full justify-center">
                    <button
                      onClick={() => openEditModal(client)}
                      className="p-2 rounded-xl text-zinc-450 hover:text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => triggerDelete(client.id)}
                      className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE & EDIT FORM MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentItem ? "Edit Client Profile" : "Add New Client"}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
          {/* Client Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Client Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramraj Cotton"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
            />
            {formErrors.clientName && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.clientName}</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Retail, Brands, Corporate"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200"
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

          {/* Logo Upload Component */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Client Logo Image *
            </label>
            <ImageUpload
              images={formData.logo ? [formData.logo] : []}
              onChange={(urls) => setFormData(prev => ({ ...prev, logo: urls[0] || '' }))}
            />
            {formErrors.logo && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.logo}</span>
            )}
          </div>

          {/* Status & Featured Toggle */}
          <div className="flex items-center gap-8 border-t border-zinc-100 dark:border-zinc-850 pt-4 mt-2 select-none">
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
              <span>Featured Client</span>
            </label>
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
              Save Client
            </button>
          </div>
        </form>
      </Modal>

      {/* SINGLE DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this client logo? This will remove it from the public homepage client reel."
      />

      {/* BULK DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Clients"
        message={`Are you sure you want to bulk delete the ${selectedIds.length} selected client profiles?`}
      />

      {/* IMAGE PREVIEW ZOOM MODAL */}
      <Modal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        title="Client Logo Preview"
        size="sm"
      >
        <div className="w-full flex items-center justify-center p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-900/60">
          <img src={previewImage} alt="Client Logo Zoom" className="max-w-full max-h-[50vh] object-contain" />
        </div>
      </Modal>
    </div>
  );
};

export default ClientsManager;
