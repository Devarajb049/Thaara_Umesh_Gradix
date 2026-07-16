import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import DeleteConfirmation from '../components/DeleteConfirmation';
import EmailPreviewDrawer from '../components/EmailPreviewDrawer';
import { 
  Eye, Check, X, Trash2, ArrowUp, ArrowDown, ExternalLink, Mail 
} from 'lucide-react';

const ArtistListManager = () => {
  const { addToast } = useToast();
  const { artists, updateArtistStatus, deleteArtist, loading } = useData();
  const location = useLocation();

  // Determine page type based on URL path
  const [statusFilter, setStatusFilter] = useState('pending');
  useEffect(() => {
    if (location.pathname.includes('approved')) {
      setStatusFilter('approved');
    } else if (location.pathname.includes('rejected')) {
      setStatusFilter('rejected');
    } else {
      setStatusFilter('pending');
    }
    // reset selection
    setSelectedIds([]);
  }, [location.pathname]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals & Drawers
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [simulatedEmailData, setSimulatedEmailData] = useState(null);

  // Filter and Search logic
  const filteredArtists = artists.filter(art => {
    // 1. Status Match
    if (art.status !== statusFilter) return false;
    
    // 2. Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatch = art.fullName?.toLowerCase().includes(q);
      const emailMatch = art.email?.toLowerCase().includes(q);
      const phoneMatch = art.phone?.toLowerCase().includes(q);
      const cityMatch = art.city?.toLowerCase().includes(q);
      if (!nameMatch && !emailMatch && !phoneMatch && !cityMatch) return false;
    }

    // 3. Category match
    if (categoryFilter !== '') {
      if (!art.categories?.toLowerCase().includes(categoryFilter.toLowerCase())) return false;
    }

    // 4. Gender match
    if (genderFilter !== '') {
      if (art.gender !== genderFilter) return false;
    }

    return true;
  });

  // Reorder display order if needed (sorted by created_at DESC by default)
  
  // Approve handler
  const handleApprove = async (id) => {
    const res = await updateArtistStatus(id, 'approved');
    if (res && res.success) {
      addToast("Artist application approved successfully", "success");
      if (res.simulatedEmail) {
        setSimulatedEmailData(res.simulatedEmail);
        setIsEmailOpen(true);
      }
    } else {
      addToast("Failed to approve application", "error");
    }
  };

  // Reject handler
  const handleReject = async (id) => {
    const res = await updateArtistStatus(id, 'rejected');
    if (res && res.success) {
      addToast("Artist application rejected", "warning");
      if (res.simulatedEmail) {
        setSimulatedEmailData(res.simulatedEmail);
        setIsEmailOpen(true);
      }
    } else {
      addToast("Failed to reject application", "error");
    }
  };

  // Delete handler
  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    const success = await deleteArtist(deleteTargetId);
    if (success) {
      setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
      addToast("Artist profile deleted successfully", "success");
    } else {
      addToast("Failed to delete artist profile", "error");
    }
    setIsDeleteOpen(false);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArtists.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'photo',
      label: 'Photo',
      render: (item) => (
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-150">
          <img src={item.profilePhoto} alt={item.fullName} className="w-full h-full object-cover" />
        </div>
      )
    },
    { key: 'fullName', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    {
      key: 'created_at',
      label: 'Submission Date',
      render: (item) => new Date(item.created_at).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          <Link
            to={`/admin/artists/${item.id}`}
            className="p-2 rounded-xl text-zinc-450 hover:text-indigo-650 hover:bg-indigo-50 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          
          {item.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-green-700 hover:bg-green-50 transition-colors"
                title="Approve Artist"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleReject(item.id)}
                className="p-2 rounded-xl text-zinc-450 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                title="Reject Artist"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          {item.status === 'rejected' && (
            <button
              onClick={() => handleApprove(item.id)}
              className="p-2 rounded-xl text-zinc-450 hover:text-green-700 hover:bg-green-50 transition-colors"
              title="Re-Approve Artist"
            >
              <Check className="w-4 h-4" />
            </button>
          )}

          {item.status === 'approved' && (
            <button
              onClick={() => handleReject(item.id)}
              className="p-2 rounded-xl text-zinc-450 hover:text-amber-700 hover:bg-amber-50 transition-colors"
              title="Revoke Approval"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-450 hover:text-rose-650 hover:bg-rose-50 transition-colors"
            title="Delete Artist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filterConfigs = [
    {
      name: 'category',
      label: 'Category',
      choices: [
        { value: 'Model', label: 'Model' },
        { value: 'Actor', label: 'Actor' },
        { value: 'Child Artist', label: 'Child Artist' },
        { value: 'Voice Artist', label: 'Voice Artist' },
        { value: 'Stunts', label: 'Stunts' }
      ]
    },
    {
      name: 'gender',
      label: 'Gender',
      choices: [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' },
        { value: 'Other', label: 'Other' }
      ]
    }
  ];

  const handleFilterChange = (filterName, val) => {
    if (filterName === 'category') setCategoryFilter(val);
    if (filterName === 'gender') setGenderFilter(val);
    setCurrentPage(1);
  };

  const getPageTitle = () => {
    switch (statusFilter) {
      case 'approved': return 'Approved Artists Roster';
      case 'rejected': return 'Rejected Applications';
      default: return 'Pending Artist Approvals';
    }
  };

  const getPageDesc = () => {
    switch (statusFilter) {
      case 'approved': return 'Manage all verified and live casting models visible on the public page.';
      case 'rejected': return 'Review archive list of applications that did not meet immediate requirements.';
      default: return 'Review submitted details, portfolios, videos, and approve/reject profiles.';
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
            {getPageTitle()}
          </h1>
          <p className="text-xs md:text-sm text-zinc-500">
            {getPageDesc()}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 border border-zinc-150 p-4 rounded-3xl backdrop-blur-md shadow-sm">
        <SearchBar 
          value={searchQuery}
          onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
          placeholder="Search by Name, email, phone, city..."
        />
        
        <Filters 
          filters={filterConfigs}
          values={{ category: categoryFilter, gender: genderFilter }}
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
          if (checked) setSelectedIds(filteredArtists.map(a => a.id));
          else setSelectedIds([]);
        }}
        onBulkDelete={async () => {
          if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected artist profiles?`)) {
            for (const id of selectedIds) {
              await deleteArtist(id);
            }
            setSelectedIds([]);
            addToast("Selected artist profiles deleted successfully", "success");
          }
        }}
        allIds={filteredArtists.map(a => a.id)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage
        }}
        emptyStateReset={() => {
          setSearchQuery('');
          setCategoryFilter('');
          setGenderFilter('');
          setCurrentPage(1);
        }}
      />

      {/* Delete Modal */}
      <DeleteConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to permanently delete this artist profile? This action will erase all portfolio files, contact logs, and details."
      />

      {/* Email Drawer Preview */}
      <EmailPreviewDrawer 
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        emailData={simulatedEmailData}
      />

    </div>
  );
};

export default ArtistListManager;
