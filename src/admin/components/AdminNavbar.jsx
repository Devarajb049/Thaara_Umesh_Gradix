import React, { useState } from 'react';
import { Menu, Sun, Moon, Bell, ChevronDown, User, LogOut, Settings, Sidebar } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import { useLocation } from 'react-router-dom';

const AdminNavbar = ({ collapsed, setCollapsed, setMobileOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  // Generate breadcrumb items from route paths
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    // Remove the first 'admin' item
    const adminPathIdx = paths.indexOf('admin');
    const relevantPaths = paths.slice(adminPathIdx + 1);

    const formatLabel = (str) => {
      return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    return relevantPaths.map((segment, idx) => {
      const path = '/admin/' + relevantPaths.slice(0, idx + 1).join('/');
      return {
        label: formatLabel(segment),
        path: idx === relevantPaths.length - 1 ? null : path
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  const mockNotifs = [
    { id: 1, text: "New application submitted by Aryan Dixit", time: "10 mins ago", unread: true },
    { id: 2, text: "Contact message from Rohan Mehra", time: "1 hour ago", unread: true },
    { id: 3, text: "Workshop booking inquiries updated", time: "Yesterday", unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 w-full px-6 py-4 flex items-center justify-between border-b border-zinc-150 bg-white transition-colors duration-300">
      <div className="flex items-center gap-3.5">
        {/* Toggle Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Toggle Desktop Sidebar Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-2.5 rounded-xl border border-zinc-250/70 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm active:scale-95 bg-white cursor-pointer"
          title="Toggle Sidebar"
        >
          <Sidebar className="w-4 h-4 text-zinc-650" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="hidden sm:block">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Header Utilities */}
      <div className="flex items-center gap-4">


        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all select-none active:scale-95"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-150/80 bg-white p-4 shadow-xl backdrop-blur-xl z-50 animate-fade-in flex flex-col gap-2.5 text-left">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <h4 className="text-sm font-bold text-zinc-800 font-serif">Notifications</h4>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">2 New</span>
                </div>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                  {mockNotifs.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-2.5 rounded-xl text-xs hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent ${
                        n.unread ? 'bg-primary/5' : ''
                      }`}
                    >
                      <p className="font-semibold text-zinc-800 leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-zinc-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 pr-3.5 rounded-full border border-zinc-250/80 hover:bg-zinc-50 transition-all select-none active:scale-95"
          >
            <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <span className="hidden sm:inline text-xs font-bold text-zinc-700">Admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-150/80 bg-white p-2 shadow-xl backdrop-blur-xl z-50 animate-fade-in flex flex-col gap-1 text-left">
                <div className="px-3.5 py-2.5 border-b border-zinc-100 mb-1 select-none">
                  <p className="text-sm font-bold text-zinc-800">Agency Director</p>
                  <p className="text-[10px] text-zinc-450">admin@thaaraumesh.com</p>
                </div>
                <button 
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 rounded-xl transition-all"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User className="w-4 h-4 text-zinc-400" />
                  <span>My Profile</span>
                </button>
                <button 
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 rounded-xl transition-all"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings className="w-4 h-4 text-zinc-400" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('admin-logged-in');
                    setShowProfileMenu(false);
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
