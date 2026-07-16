import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import DeleteConfirmation from '../components/DeleteConfirmation';
import EmailPreviewDrawer from '../components/EmailPreviewDrawer';
import { 
  Check, X, Trash2, Key, Calendar, Mail, 
  Briefcase, MessageSquare, ClipboardList, ShieldAlert, ShieldCheck 
} from 'lucide-react';

const ProfileRequestsManager = () => {
  const { addToast } = useToast();
  const { profileRequests, updateRequestStatus, deleteProfileRequest, loading } = useData();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals & Drawers State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [simulatedEmailData, setSimulatedEmailData] = useState(null);

  // Filter logic
  const filteredRequests = profileRequests.filter(req => {
    // 1. Status Filter
    if (statusFilter !== '' && req.status !== statusFilter) return false;

    // 2. Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatch = req.requesterName?.toLowerCase().includes(q);
      const emailMatch = req.requesterEmail?.toLowerCase().includes(q);
      const companyMatch = req.companyName?.toLowerCase().includes(q);
      const artistMatch = req.artistName?.toLowerCase().includes(q);
      const reasonMatch = req.reason?.toLowerCase().includes(q);
      if (!nameMatch && !emailMatch && !companyMatch && !artistMatch && !reasonMatch) return false;
    }

    return true;
  });

  // Approve Request
  const handleApproveRequest = async (id) => {
    const res = await updateRequestStatus(id, 'approved');
    if (res && res.success) {
      addToast("Profile access request approved. Secure token sent.", "success");
      if (res.simulatedEmail) {
        setSimulatedEmailData(res.simulatedEmail);
        setIsEmailOpen(true);
      }
    } else {
      addToast("Failed to approve access request", "error");
    }
  };

  // Reject Request
  const handleRejectRequest = async (id) => {
    const res = await updateRequestStatus(id, 'rejected');
    if (res && res.success) {
      addToast("Profile access request rejected.", "warning");
      if (res.simulatedEmail) {
        setSimulatedEmailData(res.simulatedEmail);
        setIsEmailOpen(true);
      }
    } else {
      addToast("Failed to reject access request", "error");
    }
  };

  // Delete Request
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    const success = await deleteProfileRequest(deleteTargetId);
    if (success) {
      setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
      addToast("Access request deleted successfully", "success");
    } else {
      addToast("Failed to delete access request", "error");
    }
    setIsDeleteOpen(false);
  };

  // Pagination Calculations
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'requesterName',
      label: 'Requester',
      render: (item) => (
        <div className="flex flex-col text-left">
          <span className="font-bold text-zinc-900 leading-tight">{item.requesterName}</span>
          <span className="text-[10px] text-zinc-400 mt-0.5">{item.requesterEmail}</span>
        </div>
      )
    },
    {
      key: 'companyName',
      label: 'Company',
      render: (item) => (
        <div className="flex items-center gap-1.5 text-xs text-zinc-700 font-semibold">
          <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
          <span>{item.companyName || 'Individual / Independent'}</span>
        </div>
      )
    },
    {
      key: 'artistName',
      label: 'Requested Artist',
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.artistPhoto && (
            <div className="w-6 h-6 rounded-md overflow-hidden bg-zinc-50 border border-zinc-200">
              <img src={item.artistPhoto} alt={item.artistName} className="w-full h-full object-cover" />
            </div>
          )}
          <span className="font-semibold text-zinc-800 text-xs">{item.artistName}</span>
        </div>
      )
    },
    {
      key: 'reason',
      label: 'Reason for Request',
      render: (item) => (
        <div 
          className="text-xs text-zinc-500 max-w-xs truncate font-medium cursor-help"
          title={item.reason}
        >
          {item.reason}
        </div>
      )
    },
    {
      key: 'created_at',
      label: 'Request Date',
      render: (item) => (
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(item.created_at).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => {
        switch (item.status) {
          case 'approved':
            return (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-50 text-green-700 border border-green-150">
                <ShieldCheck className="w-3 h-3" />
                <span>Approved</span>
              </span>
            );
          case 'rejected':
            return (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-150">
                <ShieldAlert className="w-3 h-3" />
                <span>Rejected</span>
              </span>
            );
          default:
            return (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                <span>Pending</span>
              </span>
            );
        }
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          {item.status === 'pending' && (
            <>
              <button
                onClick={() => handleApproveRequest(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-green-700 hover:bg-green-50 transition-colors"
                title="Approve Request"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleRejectRequest(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 transition-colors"
                title="Reject Request"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          {/* If approved, show access link icon */}
          {item.status === 'approved' && item.accessToken && (
            <button
              onClick={() => {
                const link = `${window.location.protocol}//${window.location.host}/artist-access/${item.accessToken}`;
                navigator.clipboard.writeText(link);
                addToast("Access link copied to clipboard", "success");
              }}
              className="p-2 rounded-xl text-zinc-450 hover:text-primary hover:bg-[#FCF8F8] transition-colors"
              title="Copy Secure Link"
            >
              <Key className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 transition-colors"
            title="Delete Request"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filterConfigs = [
    {
      name: 'status',
      label: 'Status',
      choices: [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' }
      ]
    }
  ];

  const handleFilterChange = (filterName, val) => {
    if (filterName === 'status') setStatusFilter(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-primary" /> Profile Access Requests
          </h1>
          <p className="text-xs md:text-sm text-zinc-500">
            Verify client agency credentials, review viewing reasons, and issue secure one-time token profile access URLs.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 border border-zinc-150 p-4 rounded-3xl backdrop-blur-md shadow-sm">
        <SearchBar 
          value={searchQuery}
          onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
          placeholder="Search by Requester, company, reason, artist..."
        />
        
        <Filters 
          filters={filterConfigs}
          values={{ status: statusFilter }}
          onChange={handleFilterChange}
        />
      </div>

      {/* DataTable List */}
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
          if (checked) setSelectedIds(filteredRequests.map(r => r.id));
          else setSelectedIds([]);
        }}
        onBulkDelete={async () => {
          if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected requests?`)) {
            for (const id of selectedIds) {
              await deleteProfileRequest(id);
            }
            setSelectedIds([]);
            addToast("Selected access requests deleted", "success");
          }
        }}
        allIds={filteredRequests.map(r => r.id)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage
        }}
        emptyStateReset={() => {
          setSearchQuery('');
          setStatusFilter('');
          setCurrentPage(1);
        }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this access request log? It will permanently erase the client query."
      />

      {/* Email Preview Drawer */}
      <EmailPreviewDrawer 
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        emailData={simulatedEmailData}
      />

    </div>
  );
};

export default ProfileRequestsManager;
