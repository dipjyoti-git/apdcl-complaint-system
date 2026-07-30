import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PortalLayout({ user, logout, children }) {
  const location = useLocation();

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
];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] font-sans">
      {/* Top Header */}
      <header className="bg-[#3F51B5] text-white px-6 py-2.5 flex justify-between items-center shadow-md border-b-2 border-[#F36F21] z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#F36F21] font-bold text-xs px-2.5 py-1 rounded-sm tracking-wider uppercase">
            CMS Portal
          </div>
          <h1 className="font-bold text-sm tracking-wide hidden sm:block">
            ASSAM POWER DISTRIBUTION COMPANY LIMITED
          </h1>
        </div>

        {/* Editable Division Dropdown */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center bg-[#2E7D32] px-2 py-0.5 rounded text-white font-medium">
            <span className="mr-1.5 opacity-80">DIVISION:</span>
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
            >
              <option value="Chariali ESD" className="bg-gray-800 text-white">Chariali ESD</option>
              <option value="Tezpur Circle" className="bg-gray-800 text-white">Tezpur Circle</option>
              <option value="Biswanath ESD" className="bg-gray-800 text-white">Biswanath ESD</option>
              <option value="Guwahati Circle" className="bg-gray-800 text-white">Guwahati Circle</option>
              <option value="Dibrugarh Circle" className="bg-gray-800 text-white">Dibrugarh Circle</option>
            </select>
          </div>

          <div className="w-7 h-7 rounded-full bg-[#F36F21] flex items-center justify-center font-bold text-white uppercase text-xs shadow">
            {user?.name?.[0] || 'U'}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1">
        <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">
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
                  className={`flex items-center gap-2 px-3 py-2.5 rounded font-medium transition ${
                    location.pathname === item.path
                      ? 'bg-[#F36F21] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-3 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded transition"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}