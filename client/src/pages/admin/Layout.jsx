import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { assets } from '../../assets/assets';
import { HiMenu, HiX } from 'react-icons/hi';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* ======= Fixed Top Navbar ======= */}
      <header className="fixed top-0 left-0 right-0 h-[70px] bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 sm:px-12 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          <img
            onClick={() => navigate('/')}
            className="w-32 sm:w-40 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
        </div>
        <button
          onClick={logout}
          className="text-sm px-6 sm:px-8 py-2 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition"
        >
          Logout
        </button>
      </header>

      {/* ======= Sidebar + Main Content ======= */}
      <div className="flex flex-1 pt-[70px] bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] w-64 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out z-40
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:h-auto`}
        >
          <Sidebar />
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto h-[calc(100vh-70px)] bg-gray-50 sm:pl-64">
  <div className="max-w-7xl mx-auto">
    <Outlet />
  </div>
</main>

      </div>
    </div>
  );
};

export default Layout;
