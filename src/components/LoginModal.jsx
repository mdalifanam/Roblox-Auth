import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`Welcome back, ${username}! (Demo login verified)`);
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#191b1d] border border-zinc-800 rounded-xl w-full max-w-[400px] p-6 sm:p-7 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-white font-extrabold text-base tracking-wide uppercase text-center mb-6">
          LOGIN TO ROBLOX
        </h2>

        {message && (
          <div className="mb-4 p-2.5 rounded bg-zinc-800 text-emerald-400 text-xs text-center border border-zinc-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-300 text-xs font-semibold mb-1">
              Username/Email/Phone
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username/Email/Phone"
              className="w-full bg-[#232527] border border-[#393b3d] focus:border-zinc-300 text-white placeholder-[#75777a] text-xs sm:text-sm rounded-md px-3 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 text-xs font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#232527] border border-[#393b3d] focus:border-zinc-300 text-white placeholder-[#75777a] text-xs sm:text-sm rounded-md px-3 py-2.5 pr-9 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In'}
            </button>
          </div>

          <div className="text-center pt-2">
            <a
              href="https://www.roblox.com/login/forgot-password-or-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-white underline transition-colors"
            >
              Forgot Password or Username?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
