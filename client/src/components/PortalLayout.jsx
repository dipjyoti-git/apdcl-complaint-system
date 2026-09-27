import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PortalLayout({ user, logout, children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // State to hold the active Division/ESD selection
  const [selectedDivision, setSelectedDivision] = useState(
    localStorage.getItem('apdcl_division') || 'Chariali ESD'
  );

  const handleDivisionChange = (e) => {
    const value = e.target.value;
    setSelectedDivision(value);
    localStorage.setItem('apdcl_division', value);
  };

  const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  // 🔒 Only show Activity Logs to Admins and Agents
  ...(user?.role === 'admin' || user?.role === 'agent' 
    ? [{ label: 'Activity Logs', path: '/activity-log', icon: '📋' }] 
    : []
  ),
  ...(user?.role === 'user' ? [{ label: 'Register Complaint', path: '/create', icon: '⚡' }] : []),
  { label: 'FAQ & Helpline', path: '/faq', icon: '❓' },
];

  // Shared sidebar content used by both the desktop sidebar and the mobile drawer
  const SidebarBody = ({ onNavigate }) => (
    <>
      <div>
        <div className="p-4 bg-[#2C387E] text-white">
          <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Logged In As</p>
          <p className="font-bold text-sm truncate">{user?.name}</p>
          <span className="inline-block mt-1 bg-[#F36F21] text-[10px] uppercase font-bold px-2 py-0.5 rounded">
            Role: {user?.role}
          </span>
        </div>

        <nav className="p-3 space-y-1 text-xs">
          <p className="text-[10px] font-bold text-gray-400 uppercase px-3 py-1">Main Menu</p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-2 px-3 py-2.5 min-h-[44px] rounded font-medium transition ${
                location.pathname === item.path
                  ? 'bg-[#F36F21] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 min-h-[44px] rounded transition"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] font-sans">
      {/* Top Header */}
      <header className="bg-[#3F51B5] text-white px-3 sm:px-6 py-2.5 flex justify-between items-center gap-2 shadow-md border-b-2 border-[#F36F21] z-10">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden shrink-0 w-11 h-11 flex items-center justify-center rounded hover:bg-white/10 transition text-xl leading-none"
          >
            ☰
          </button>
          <div className="bg-[#F36F21] font-bold text-xs px-2.5 py-1 rounded-sm tracking-wider uppercase shrink-0">
            CMS Portal
          </div>
          <h1 className="font-bold text-sm tracking-wide hidden sm:block truncate">
            ASSAM POWER DISTRIBUTION COMPANY LIMITED
          </h1>
        </div>

        {/* Editable Division Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
          <div className="flex items-center bg-[#2E7D32] px-2 py-0.5 rounded text-white font-medium">
            <span className="mr-1.5 opacity-80 hidden min-[420px]:inline">DIVISION:</span>
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="bg-transparent text-white font-bold cursor-pointer focus:outline-none max-w-[28vw] sm:max-w-none truncate"
              aria-label="Select division"
            >
              <option value="Chariali ESD" className="bg-gray-800 text-white">Chariali ESD</option>
              <option value="Tezpur Circle" className="bg-gray-800 text-white">Tezpur Circle</option>
              <option value="Biswanath ESD" className="bg-gray-800 text-white">Biswanath ESD</option>
              <option value="Guwahati Circle" className="bg-gray-800 text-white">Guwahati Circle</option>
              <option value="Dibrugarh Circle" className="bg-gray-800 text-white">Dibrugarh Circle</option>
            </select>
          </div>

          <div className="w-7 h-7 rounded-full bg-[#F36F21] flex items-center justify-center font-bold text-white uppercase text-xs shadow shrink-0">
            {user?.name?.[0] || 'U'}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 min-w-0">
        {/* Desktop sidebar — hidden on mobile */}
        <aside className="hidden md:flex w-60 shrink-0 bg-white border-r border-gray-200 flex-col justify-between shadow-sm">
          <SidebarBody onNavigate={undefined} />
        </aside>

        <main className="flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile slide-over menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-xl flex flex-col justify-between overflow-y-auto">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between -mt-2">
              <SidebarBody onNavigate={() => setMenuOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
