import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  // Using default values so it never renders as empty
  const role = localStorage.getItem('role') || 'athlete'; 

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-md">
      {/* Left side: Logo & Navigation */}
      <div className="flex items-center gap-8">
        <Link to="/athlete/dashboard" className="text-lg font-extrabold text-white flex items-center gap-2">
          <span className="text-blue-500">⚡</span> TalentAI
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/athlete/dashboard" className="text-slate-300 hover:text-white">Dashboard</Link>
          <Link to="/sports" className="text-slate-300 hover:text-white">Fitness Tests</Link>
          <Link to="/leaderboard" className="text-amber-400 hover:text-amber-300 font-bold">🏆 Leaderboard</Link>
          <Link to="/profile" className="text-slate-300 hover:text-white">Profile</Link>
        </div>
      </div>

      {/* Right side: Logout */}
      <div className="flex items-center gap-4">
        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
          {role}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}