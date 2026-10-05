import React from 'react';
import { CheckCircle2, Database, Sparkles, X } from 'lucide-react';

export default function SuccessModal({ data, onClose, onOpenSupabaseModal }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#181a1e] border border-zinc-700/80 rounded-2xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto mb-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h2 className="text-white font-black text-xl mb-1 flex items-center justify-center gap-2">
          <span>Account Created!</span>
          <Sparkles className="w-5 h-5 text-amber-400" />
        </h2>

        <p className="text-zinc-300 text-sm mb-4">
          Welcome to Roblox, <strong className="text-white font-bold">{data.username}</strong>!
        </p>

        {/* Database status banner */}
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-left mb-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Database Status:
            </span>
            <span
              className={`px-2 py-0.5 rounded font-mono font-semibold text-[11px] ${
                data.supabaseSynced
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              {data.supabaseSynced ? 'Saved to Supabase' : 'Saved to Local DB'}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-normal">
            {data.supabaseSynced
              ? 'Your account was recorded into the Supabase roblox_users table.'
              : 'Your signup is saved in local database storage. Connect Supabase credentials to sync directly into the cloud!'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-bold text-sm rounded-lg transition-colors cursor-pointer"
          >
            Continue to Experience
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenSupabaseModal();
            }}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            View in Database Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
