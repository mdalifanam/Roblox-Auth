import React from 'react';
import { Database } from 'lucide-react';
import { getSupabaseConfig } from '../lib/supabase';

export default function Header({
  currentPage = 'signup',
  onNavigate,
  onOpenSupabaseModal,
  currentUser,
  onSignOut,
}) {
  const { isConfigured } = getSupabaseConfig();

  return (
    <header className="w-full relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4">
      {/* Left side: Supabase database connection badge */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSupabaseModal}
          title="Supabase Database Settings & Viewer"
          className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#18191c]/80 hover:bg-[#25272c] border border-zinc-700/60 hover:border-emerald-500/60 text-xs font-medium text-zinc-300 transition-all backdrop-blur-sm shadow-sm group"
        >
          <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Supabase DB</span>
          <span className="text-[10px] text-zinc-400 border border-zinc-700 rounded px-1 group-hover:text-emerald-300">
            {isConfigured ? 'Connected' : 'Setup'}
          </span>
        </button>
      </div>

      {/* Right side: Navigation or User Badge */}
      <div className="flex items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-300 font-semibold bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700">
              {currentUser.username}
            </span>
            <button
              onClick={onSignOut}
              className="text-xs text-zinc-400 hover:text-white transition-colors underline"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => onNavigate && onNavigate(currentPage === 'signup' ? 'login' : 'signup')}
            type="button"
            className="bg-white hover:bg-zinc-200 text-[#191b1d] font-bold text-xs sm:text-[13px] px-4 py-1.5 rounded transition-all duration-150 active:scale-95 shadow-sm cursor-pointer select-none"
          >
            {currentPage === 'signup' ? 'Log In' : 'Sign Up'}
          </button>
        )}
      </div>
    </header>
  );
}

