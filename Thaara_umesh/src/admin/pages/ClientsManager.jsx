import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Loader2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import DeleteConfirmation from '../components/DeleteConfirmation';

const ClientsManager = () => {
  const { addToast } = useToast();
  const { clients, addClientLogo, updateClientLogo, deleteClientLogo, loading } = useData();
  
  // Selection States
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Item active states for edit/delete
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  
  // Form Fields State
  const [formData, setFormData] = useState({
    logo: '',
    displayOrder: 1
  });
  const [formErrors, setFormErrors] = useState({});

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reorder logic (Shift display positions)
  const handleMoveOrder = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= clients.length) return;

    const currentClient = clients[index];
    const targetClient = clients[targetIndex];

    // Swap displayOrder values
    const tempOrder = currentClient.display_order;
    
    const success1 = await updateClientLogo(currentClient.id, currentClient.logo, targetClient.display_order);
    const success2 = await updateClientLogo(targetClient.id, targetClient.logo, tempOrder);

    if (success1 && success2) {
      addToast("Display order rearranged successfully", "success");
    } else {
      addToast("Failed to rearrange order", "error");
    }
  };

  // Open Form for Create
  const openCreateModal = () => {
    setFormData({
      logo: '',
      displayOrder: clients.length > 0 ? Math.max(...clients.map(c => c.display_order || 0)) + 1 : 1
    });
    setFormErrors({});
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const openEditModal = (client) => {
    setFormData({
      logo: client.logo || '',
      displayOrder: client.display_order
    });
    setFormErrors({});
    setCurrentItem(client);
    setIsFormOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.logo) {
      errors.logo = "Client Logo image is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Record
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (currentItem) {
      // Edit mode
      const success = await updateClientLogo(currentItem.id, formData.logo, formData.displayOrder);
      if (success) {
        addToast("Client updated successfully", "success");
      } else {
        addToast("Failed to update client", "error");
      }
    } else {
      // Create mode
      const success = await addClientLogo(formData.logo, formData.displayOrder);
      if (success) {
        addToast("Client logo added successfully", "success");
      } else {
        addToast("Failed to add client logo", "error");
      }
    }
    setIsFormOpen(false);
  };

  // Delete Action triggers
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    const success = await deleteClientLogo(deleteTargetId);
    if (success) {
      setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
      addToast("Client logo deleted successfully", "success");
    } else {
      addToast("Failed to delete client", "error");
    }
    setIsDeleteOpen(false);
  };

  // Pagination calculation
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'logo',
      label: 'Logo',
      render: (item) => (
        <div 
          onClick={() => setPreviewImage(item.logo)}
          className="w-12 h-12 rounded-xl overflow-hidden cursor-zoom-in border border-zinc-100 dark:border-zinc-800 bg-white flex items-center justify-center p-1.5"
        >
          <img src={item.logo} alt="Client Logo" className="max-w-full max-h-full object-contain" />
        </div>
      )
    },
    {
      key: 'display_order',
      label: 'Display Order',
      sortable: true,
      render: (item, idx) => {
        const actualIdx = clients.findIndex(c => c.id === item.id);
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
                disabled={actualIdx === clients.length - 1}
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
            title="Edit Client"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
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
            Display and manage brand logos featured on the public website homepage client reel.
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

      {/* Main Listing View */}
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
          if (checked) setSelectedIds(clients.map(c => c.id));
          else setSelectedIds([]);
        }}
        onBulkDelete={async () => {
          if (confirm(`Are you sure you want to delete ${selectedIds.length} selected logos?`)) {
            let successCount = 0;
            for (const id of selectedIds) {
              const success = await deleteClientLogo(id);
              if (success) successCount++;
            }
            setSelectedIds([]);
            addToast(`Successfully deleted ${successCount} logos`, "success");
          }
        }}
        allIds={clients.map(c => c.id)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage
        }}
        emptyStateReset={() => {
          setCurrentPage(1);
        }}
      />

      {/* CREATE & EDIT FORM MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentItem ? "Edit Client logo" : "Add New Client"}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
          {/* Logo Upload Component */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Client Logo Image *
            </label>
            <input
              type="text"
              placeholder="Paste direct logo image URL (e.g. https://...)"
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:text-zinc-200 mb-1"
            />
            <span className="text-[10px] text-zinc-400 font-semibold mb-1">OR UPLOAD LOCAL FILE:</span>
            <ImageUpload
              folder="clients"
              images={formData.logo && !formData.logo.startsWith('http') ? [formData.logo] : []}
              onChange={(urls) => setFormData(prev => ({ ...prev, logo: urls[0] || '' }))}
            />
            {formErrors.logo && (
              <span className="text-xs text-rose-500 font-medium">{formErrors.logo}</span>
            )}
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
