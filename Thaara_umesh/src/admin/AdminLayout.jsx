import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';
import { ToastProvider } from './context/ToastContext';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Authenticated state check
  const isAuthenticated = localStorage.getItem('admin-logged-in') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <ToastProvider>
      <div className="admin-panel min-h-screen text-zinc-800 bg-[#FCF8F8]">
        <div className="flex min-h-screen transition-colors duration-300">
          
          {/* Collapsible Sidebar */}
          <AdminSidebar 
            collapsed={sidebarCollapsed} 
            setCollapsed={setSidebarCollapsed} 
            mobileOpen={mobileSidebarOpen} 
            setMobileOpen={setMobileSidebarOpen} 
          />

          {/* Main Dashboard Space */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            
            {/* Top Navbar */}
            <AdminNavbar 
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
              setMobileOpen={setMobileSidebarOpen} 
            />

            {/* Scrollable View Content */}
            <main className="flex-grow p-4 md:p-8 overflow-y-auto custom-scrollbar">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;
