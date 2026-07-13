import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  User, 
  Phone, 
  Clock, 
  Inbox as InboxIcon,
  Search,
  CheckCircle,
  Menu
} from 'lucide-react';
import { mockContacts } from '../dummyData';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from '../components/StatusBadge';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DeleteConfirmation from '../components/DeleteConfirmation';

const ContactManager = () => {
  const { addToast } = useToast();
  const { contacts: messages, setContacts: setMessages } = useData();
  const [loading, setLoading] = useState(false);
  
  // Selected Message in Inbox split pane
  const [activeMessage, setActiveMessage] = useState(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Delete Modals
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);



  // Filter messages
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.phone.includes(searchTerm);
    const matchesStatus = statusFilter ? msg.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Automatically select the first message in the filtered list
  useEffect(() => {
    if (!loading && filteredMessages.length > 0 && !activeMessage) {
      setActiveMessage(filteredMessages[0]);
    } else if (filteredMessages.length === 0) {
      setActiveMessage(null);
    }
  }, [filteredMessages, loading, activeMessage]);

  // Actions
  const handleSelectMessage = (msg) => {
    setActiveMessage(msg);
    // Mark as read automatically when opened
    if (msg.status === 'unread') {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m));
      setActiveMessage(prev => prev ? { ...prev, status: 'read' } : null);
      addToast("Message marked as read", "info");
    }
  };

  const toggleReadStatus = (id) => {
    const msg = messages.find(m => m.id === id);
    if (!msg) return;
    const nextStatus = msg.status === 'unread' ? 'read' : 'unread';
    
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: nextStatus } : m));
    setActiveMessage(prev => prev && prev.id === id ? { ...prev, status: nextStatus } : prev);
    addToast(`Message marked as ${nextStatus}`, "success");
  };

  const triggerDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    setMessages(prev => prev.filter(m => m.id !== deleteTargetId));
    if (activeMessage && activeMessage.id === deleteTargetId) {
      setActiveMessage(null);
    }
    addToast("Message deleted from inbox", "success");
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-130px)]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none flex-shrink-0">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Inbox Messages
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Manage inquiries, feedback, and booking requests received from the public Contact Us page.
          </p>
        </div>
      </div>

      {/* Toolbar filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/10 border border-zinc-150/80 dark:border-zinc-805/40 p-4 rounded-3xl backdrop-blur-md flex-shrink-0">
        <SearchBar 
          value={searchTerm} 
          onChange={(val) => { setSearchTerm(val); setActiveMessage(null); }} 
          placeholder="Search inbox..." 
        />
        <Filters 
          filters={[{ 
            name: 'status', 
            label: 'Status', 
            choices: [{ value: 'unread', label: 'Unread' }, { value: 'read', label: 'Read' }] 
          }]} 
          values={{ status: statusFilter }} 
          onChange={(name, val) => { setStatusFilter(val); setActiveMessage(null); }} 
        />
      </div>

      {/* Inbox Split Layout */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* Left Pane: Message List */}
        <div className="w-full lg:w-2/5 flex flex-col border border-zinc-150/80 dark:border-zinc-800 rounded-3xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20 select-none flex-shrink-0">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Messages ({filteredMessages.length})
            </span>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
            {loading ? (
              // Skeletons
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 animate-pulse flex flex-col gap-2">
                  <div className="w-1/3 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-2/3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              ))
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                <InboxIcon className="w-8 h-8 mb-2" />
                <span className="text-xs">No messages match search</span>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isActive = activeMessage && activeMessage.id === msg.id;
                const isUnread = msg.status === 'unread';
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col gap-1.5 relative ${
                      isActive 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 dark:bg-rose-600 dark:border-rose-600/40 dark:shadow-rose-600/5' 
                        : isUnread
                        ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm font-semibold'
                        : 'bg-white/40 dark:bg-zinc-900/20 border-zinc-100 dark:border-zinc-900 hover:bg-white/60 dark:hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>
                        {msg.name}
                      </span>
                      <span className={`text-[10px] whitespace-nowrap ${isActive ? 'text-white/80' : 'text-zinc-400'}`}>
                        {new Date(msg.createdDate).toLocaleDateString()}
                      </span>
                    </div>

                    <p className={`text-xs truncate ${isActive ? 'text-white/90' : 'text-zinc-650 dark:text-zinc-350'}`}>
                      {msg.subject}
                    </p>

                    <p className={`text-[11px] truncate leading-relaxed ${isActive ? 'text-white/70' : 'text-zinc-400'}`}>
                      {msg.message}
                    </p>

                    {/* Unread dot */}
                    {isUnread && !isActive && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Reading Pane */}
        <div className="hidden lg:flex lg:w-3/5 border border-zinc-150/80 dark:border-zinc-800 rounded-3xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activeMessage ? (
              <motion.div
                key={activeMessage.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="flex-grow flex flex-col h-full text-left"
              >
                {/* Header Action bar */}
                <div className="px-6 py-3.5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReadStatus(activeMessage.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:scale-95 transition-all select-none"
                    >
                      {activeMessage.status === 'unread' ? (
                        <>
                          <MailOpen className="w-3.5 h-3.5" />
                          <span>Mark Read</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Mark Unread</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => triggerDelete(activeMessage.id)}
                    className="p-2 border border-rose-200 dark:border-rose-900/20 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl active:scale-95 transition-all"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Message Body */}
                <div className="flex-grow p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 select-text">
                  <div className="flex flex-col gap-2 border-b border-zinc-100 dark:border-zinc-800/60 pb-5">
                    <h2 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-100 leading-snug">
                      {activeMessage.subject}
                    </h2>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                      Received: {new Date(activeMessage.createdDate).toLocaleString()}
                    </span>
                  </div>

                  {/* Sender Details card */}
                  <div className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/20 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{activeMessage.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-450">{activeMessage.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-550 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{activeMessage.phone}</span>
                      </span>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="p-5 border border-zinc-150/80 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/10 shadow-inner flex-grow">
                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-350 whitespace-pre-wrap">
                      {activeMessage.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-zinc-400 gap-2.5 py-24 select-none">
                <InboxIcon className="w-10 h-10" />
                <p className="text-sm">Select a message in the left panel to read its content</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE FULL SCREEN PREVIEW DRAWERS */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col lg:hidden animate-fade-in text-left">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <span className="font-bold text-sm text-zinc-850 dark:text-zinc-200">Message Detail</span>
              <button 
                onClick={() => setActiveMessage(null)}
                className="text-xs font-bold text-primary dark:text-rose-450 hover:underline"
              >
                Close
              </button>
            </div>
            <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-serif font-black text-zinc-950 dark:text-zinc-100">{activeMessage.subject}</h2>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Received: {new Date(activeMessage.createdDate).toLocaleString()}</p>
              </div>

              <div className="p-4 border rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col gap-2">
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{activeMessage.name}</p>
                <p className="text-xs text-zinc-500">{activeMessage.email}</p>
                <p className="text-xs text-zinc-500">{activeMessage.phone}</p>
              </div>

              <div className="p-4 border rounded-2xl bg-zinc-50/20 flex-grow">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">{activeMessage.message}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { toggleReadStatus(activeMessage.id); setActiveMessage(null); }}
                  className="flex-1 py-3 rounded-2xl border text-center font-bold text-xs"
                >
                  Mark Unread
                </button>
                <button
                  onClick={() => { triggerDelete(activeMessage.id); setActiveMessage(null); }}
                  className="flex-1 py-3 bg-rose-600 text-white rounded-2xl text-center font-bold text-xs"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* SINGLE DELETE CONFIRMATION */}
      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this message? This action is permanent and cannot be undone."
      />
    </div>
  );
};

export default ContactManager;
