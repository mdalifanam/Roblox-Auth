import React from 'react';
import { UserCheck, Sparkles, X, LogOut, Gamepad2 } from 'lucide-react';

export default function LoginSuccessModal({ user, onClose, onSignOut }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#1e2026] border border-zinc-700/80 rounded-2xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400">
          <UserCheck className="w-8 h-8" />
        </div>

        <h2 className="text-white font-black text-xl mb-1 flex items-center justify-center gap-1.5">
          <span>Welcome Back!</span>
          <Sparkles className="w-5 h-5 text-amber-400" />
        </h2>

        <p className="text-zinc-300 text-sm mb-4">
          Logged in as <strong className="text-white font-bold">{user.username}</strong>
        </p>

        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-left mb-5 space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-zinc-400 font-sans">
            <span>Authentication Source:</span>
            <span className="text-emerald-400 font-bold uppercase">{user.source || 'Verified'}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-500">
            <span>Status:</span>
            <span className="text-zinc-300 font-sans">Active Session</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Gamepad2 className="w-4 h-4" />
            Start Playing
          </button>
          <button
            onClick={onSignOut}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-red-300 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
