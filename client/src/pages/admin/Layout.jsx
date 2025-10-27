import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { assets } from '../../assets/assets';

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ======= Fixed Top Navbar ======= */}
      <header className="fixed top-0 left-0 right-0 h-[70px] bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 sm:px-12 shadow-sm">
        <img
          onClick={() => navigate('/')}
          className="w-32 sm:w-40 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition"
        >
          Logout
        </button>
      </header>

      {/* ======= Sidebar + Main Content ======= */}
      <div className="flex flex-1 pt-[70px]">
        {/* Fixed Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-70px)] fixed left-0 top-[70px] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64 bg-blue-50/50 text-gray-700 p-4 md:p-8 overflow-y-auto h-[calc(100vh-70px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
