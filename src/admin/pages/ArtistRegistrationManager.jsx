import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Check, 
  X, 
  Trash2, 
  MapPin, 
  Globe, 
  FileText, 
  Video, 
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Drawer from '../components/Drawer';
import VideoPreview from '../components/VideoPreview';
import DeleteConfirmation from '../components/DeleteConfirmation';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const ArtistRegistrationManager = () => {
  const { addToast } = useToast();
  const { artistRegistrations: registrations, setArtistRegistrations: setRegistrations } = useData();
  const [loading, setLoading] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Selected row ids for bulk operations
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals / Drawer visibility
  const [activeProfile, setActiveProfile] = useState(null); // Selected artist for detail Drawer
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  // Filter listings
  const filteredRegs = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? reg.applicationStatus === statusFilter : true;
    const matchesCategory = categoryFilter ? reg.category === categoryFilter : true;
    const matchesGender = genderFilter ? reg.gender === genderFilter : true;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesGender;
  });

  // Action Handlers
  const handleStatusChange = (id, newStatus) => {
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, applicationStatus: newStatus } : reg));
    
    // Update the currently viewed drawer details if open
    setActiveProfile(prev => prev && prev.id === id ? { ...prev, applicationStatus: newStatus } : prev);
    
    if (newStatus === 'Approved') {
      addToast("Artist application approved successfully", "success");
    } else {
      addToast("Artist application rejected", "warning");
    }
  };

  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    setRegistrations(prev => prev.filter(reg => reg.id !== deleteTargetId));
    setSelectedIds(prev => prev.filter(id => id !== deleteTargetId));
    if (activeProfile && activeProfile.id === deleteTargetId) {
      setActiveProfile(null);
    }
    addToast("Application profile deleted", "success");
  };

  const handleConfirmBulkDelete = () => {
    setRegistrations(prev => prev.filter(reg => !selectedIds.includes(reg.id)));
    setSelectedIds([]);
    addToast("Selected applications deleted", "success");
  };

  // Row selection hooks
  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredRegs.map(reg => reg.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredRegs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegs.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      key: 'profilePhoto',
      label: 'Photo',
      render: (item) => (
        <img 
          src={item.profilePhoto} 
          alt={item.fullName} 
          className="w-10 h-10 rounded-xl object-cover cursor-pointer hover:scale-102 border"
          onClick={() => setActiveProfile(item)}
        />
      )
    },
    {
      key: 'fullName',
      label: 'Applicant Name',
      sortable: true,
      render: (item) => (
        <div className="flex flex-col text-left">
          <span className="font-bold text-zinc-900 dark:text-zinc-250">{item.fullName}</span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Gender: {item.gender} • Age: {item.age}</span>
        </div>
      )
    },
    { key: 'category', label: 'Category' },
    {
      key: 'city',
      label: 'Location',
      render: (item) => (
        <span className="flex items-center gap-1 text-zinc-550 dark:text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-zinc-450" />
          <span>{item.city}, {item.state}</span>
        </span>
      )
    },
    {
      key: 'applicationStatus',
      label: 'Status',
      render: (item) => (
        <StatusBadge status={item.applicationStatus} />
      )
    },
    {
      key: 'submittedDate',
      label: 'Submitted On',
      sortable: true,
      render: (item) => (
        <span className="text-zinc-500 text-xs">
          {new Date(item.submittedDate).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveProfile(item)}
            className="p-2 rounded-xl text-zinc-500 hover:text-indigo-650 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
            title="Inspect Application Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {item.applicationStatus === 'Pending' && (
            <>
              <button
                onClick={() => handleStatusChange(item.id, 'Approved')}
                className="p-2 rounded-xl text-zinc-500 hover:text-emerald-650 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                title="Approve Application"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStatusChange(item.id, 'Rejected')}
                className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                title="Reject Application"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={() => triggerDelete(item.id)}
            className="p-2 rounded-xl text-zinc-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            title="Delete Application"
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
            Artist Applications
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Review casting profiles, body measurements, languages, and video resumes submitted by talents.
          </p>
        </div>
      </div>

      {/* Toolbar filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/10 border border-zinc-150/80 dark:border-zinc-805/40 p-4 rounded-3xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-4">
          <SearchBar 
            value={searchTerm} 
            onChange={(val) => { setSearchTerm(val); setCurrentPage(1); }} 
            placeholder="Search by name, city, skill..." 
          />
          <Filters 
            filters={[
              { 
                name: 'applicationStatus', 
                label: 'Status', 
                choices: [
                  { value: 'Pending', label: 'Pending' }, 
                  { value: 'Approved', label: 'Approved' },
                  { value: 'Rejected', label: 'Rejected' }
                ] 
              },
              { 
                name: 'category', 
                label: 'Category', 
                choices: [{ value: 'Actor', label: 'Actor' }, { value: 'Model', label: 'Model' }] 
              },
              {
                name: 'gender',
                label: 'Gender',
                choices: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]
              }
            ]} 
            values={{ applicationStatus: statusFilter, category: categoryFilter, gender: genderFilter }} 
            onChange={(name, val) => { 
              if (name === 'applicationStatus') setStatusFilter(val);
              if (name === 'category') setCategoryFilter(val);
              if (name === 'gender') setGenderFilter(val);
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
        allIds={filteredRegs.map(reg => reg.id)}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage
        }}
        emptyStateReset={() => {
          setSearchTerm('');
          setStatusFilter('');
          setCategoryFilter('');
          setGenderFilter('');
          setCurrentPage(1);
        }}
      />

      {/* DETAIL DRAWERS PROFILE VIEW */}
      <Drawer
        isOpen={!!activeProfile}
        onClose={() => setActiveProfile(null)}
        title="Artist Casting Profile"
        size="lg"
      >
        {activeProfile && (
          <div className="flex flex-col gap-6 text-left pb-10">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-zinc-100 dark:border-zinc-800 pb-6 select-none">
              <img 
                src={activeProfile.profilePhoto} 
                alt={activeProfile.fullName} 
                className="w-24 h-24 rounded-2xl object-cover border shadow-sm flex-shrink-0"
              />
              <div className="flex flex-col text-center sm:text-left gap-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{activeProfile.fullName}</h2>
                  <StatusBadge status={activeProfile.applicationStatus} />
                </div>
                
                <p className="text-xs font-bold text-zinc-450 dark:text-zinc-400 uppercase tracking-widest leading-none mt-1">
                  {activeProfile.category} • {activeProfile.age} Years Old
                </p>
                
                <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-zinc-500 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeProfile.city}, {activeProfile.state}</span>
                </span>
              </div>
            </div>

            {/* Quick approval action row */}
            {activeProfile.applicationStatus === 'Pending' && (
              <div className="flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 rounded-2xl border border-zinc-150/80 dark:border-zinc-800">
                <p className="text-xs font-semibold text-zinc-500 flex-1">Approve or reject this profile submission:</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(activeProfile.id, 'Approved')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/10 active:scale-95 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleStatusChange(activeProfile.id, 'Rejected')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/10 active:scale-95 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            )}

            {/* Physical Measurements Grid */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 select-none">
                <Layers className="w-4 h-4" />
                <span>Physical Measurements</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Height", val: activeProfile.height },
                  { label: "Weight", val: activeProfile.weight },
                  { label: "Gender", val: activeProfile.gender },
                  { label: "Age", val: `${activeProfile.age} yrs` }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50/40 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-zinc-700 dark:text-zinc-250">{item.val || '-'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 select-none">
                <Calendar className="w-4 h-4" />
                <span>Contact Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 border rounded-2xl">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Email ID</p>
                  <p className="text-sm font-semibold text-zinc-750 dark:text-zinc-200 select-all">{activeProfile.email}</p>
                </div>
                <div className="p-3.5 border rounded-2xl">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-sm font-semibold text-zinc-750 dark:text-zinc-200 select-all">{activeProfile.phone}</p>
                </div>
              </div>

              {activeProfile.instagram && (
                <a 
                  href={activeProfile.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 p-3 border rounded-2xl bg-zinc-50/40 dark:bg-zinc-900/20 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-rose-450 hover:bg-zinc-50 transition-colors w-fit select-none"
                >
                  <Globe className="w-4 h-4" />
                  <span>Instagram Profile</span>
                </a>
              )}
            </div>

            {/* Professional Background */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 select-none">
                <Sparkles className="w-4 h-4" />
                <span>Skills & Experience</span>
              </h3>

              {/* Skills badges */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeProfile.skills.split(',').map((s, idx) => (
                    <span key={idx} className="bg-primary/5 text-primary dark:bg-rose-500/5 dark:text-rose-400 border border-primary/10 dark:border-rose-500/10 text-xs px-2.5 py-1 rounded-xl font-medium">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="flex flex-col gap-1.5 mt-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Languages Spoken</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeProfile.languagesKnown.split(',').map((l, idx) => (
                    <span key={idx} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-xl font-medium">
                      {l.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="p-4 border rounded-2xl bg-zinc-50/20 mt-1 text-xs text-zinc-750 dark:text-zinc-300">
                <p className="text-[10px] text-zinc-400 font-bold uppercase mb-1">Previous Auditions / Projects</p>
                <p className="leading-relaxed whitespace-pre-wrap">{activeProfile.experience || 'No previous experience declared.'}</p>
              </div>
            </div>

            {/* Resumes & Video Resumes */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 border-b pb-2 select-none">
                <FileText className="w-4 h-4" />
                <span>Media Attachments</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Resume Link */}
                {activeProfile.resume && (
                  <a 
                    href={activeProfile.resume} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 border rounded-2xl hover:border-zinc-350 dark:hover:border-zinc-700 bg-white/70 dark:bg-zinc-900/40 select-none group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-450 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250">Download Resume</span>
                      <span className="text-[10px] text-zinc-400 group-hover:underline">View PDF file</span>
                    </div>
                  </a>
                )}

                {/* Portfolio Link */}
                {activeProfile.portfolio && (
                  <a 
                    href={activeProfile.portfolio} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 border rounded-2xl hover:border-zinc-350 dark:hover:border-zinc-700 bg-white/70 dark:bg-zinc-900/40 select-none group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-250">View Portfolio</span>
                      <span className="text-[10px] text-zinc-400 group-hover:underline">Visit external link</span>
                    </div>
                  </a>
                )}
              </div>

              {/* Intro Video Embed */}
              {activeProfile.introductionVideo && (
                <div className="flex flex-col gap-1.5 mt-2">
                  <p className="text-[10px] text-zinc-450 font-bold uppercase select-none">Introduction Video Resume</p>
                  <VideoPreview 
                    url={activeProfile.introductionVideo} 
                    title={`${activeProfile.fullName} - Introduction`} 
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* SINGLE DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this applicant profile? This action will permanently remove their measurements and media links."
      />

      {/* BULK DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Applications"
        message={`Are you sure you want to bulk delete the ${selectedIds.length} selected artist registration submissions?`}
      />
    </div>
  );
};

export default ArtistRegistrationManager;
