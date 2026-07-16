import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users2, 
  Tv, 
  GraduationCap, 
  Home as HomeIcon, 
  Inbox, 
  Camera, 
  UserPlus, 
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

const AdminSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5 flex-shrink-0" />, end: true },
    { name: 'Clients', path: '/admin/clients', icon: <Users2 className="w-5 h-5 flex-shrink-0" /> },
    { name: 'Showcase', path: '/admin/showcase', icon: <Tv className="w-5 h-5 flex-shrink-0" /> },
    { name: 'Acting School', path: '/admin/acting-school', icon: <GraduationCap className="w-5 h-5 flex-shrink-0" /> },
    { name: 'Shooting House', path: '/admin/shooting-house', icon: <Camera className="w-5 h-5 flex-shrink-0" /> },
    { name: 'Contact Messages', path: '/admin/contact', icon: <Inbox className="w-5 h-5 flex-shrink-0" /> }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-zinc-150 transition-colors duration-300">
      {/* Brand Header */}
      <div className={`flex items-center justify-between px-6 py-5 border-b border-zinc-100 flex-shrink-0`}>
        <Link to="/admin" className="flex items-center gap-3 overflow-hidden select-none">
          <img 
            src="/images/Thaara_Umesh_Logo.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain hover:scale-105 transition-transform" 
          />
          {!collapsed && (
            <div className="flex flex-col text-left">
              <span className="font-serif font-black text-sm text-zinc-900 tracking-wider">
                THAARA UMESH
              </span>
              <span className="text-[10px] text-zinc-450 font-bold uppercase tracking-widest leading-none">
                Admin Panel
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow py-6 px-4 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold select-none transition-all duration-200 group relative
              ${isActive 
                ? 'bg-primary text-white shadow-md shadow-primary/15 active' 
                : 'text-zinc-550 hover:text-primary hover:bg-[#FCF8F8]'
              }
            `}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.name}</span>}
            
            {/* Tooltip on collapse */}
            {collapsed && (
              <span className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 z-50 shadow-xl shadow-black/10">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Back to Website Footer */}
      <div className="p-4 border-t border-zinc-100 flex-shrink-0">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold text-zinc-500 hover:text-primary hover:bg-[#FCF8F8] transition-all select-none`}
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Main Website</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:block flex-shrink-0 h-screen transition-all duration-300 sticky top-0 ${collapsed ? 'w-[88px]' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 dark:bg-black/65 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 h-full w-64 z-50 md:hidden shadow-2xl transition-transform duration-300 ease-out transform
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
