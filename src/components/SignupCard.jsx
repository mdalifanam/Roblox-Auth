import React, { useState } from 'react';
import { ChevronDown, Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import { registerUser } from '../lib/supabase';

// Female & Male silhouette icons matching Roblox design
const FemaleIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-5 h-5 transition-colors ${active ? 'text-white' : 'text-zinc-400'}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2.2" />
    <path d="M9 10.5h6l1.8 7.5h-2.3v3h-5v-3H7.2L9 10.5z" />
  </svg>
);

const MaleIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-5 h-5 transition-colors ${active ? 'text-white' : 'text-zinc-400'}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="2.2" />
    <path d="M9 10.5h6v7h-1.5v3.5h-3v-3.5H9v-7z" />
  </svg>
);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function SignupCard({ onSignupSuccess, onOpenTerms, onOpenPrivacy }) {
  const [formData, setFormData] = useState({
    month: '',
    day: '',
    year: '',
    username: '',
    password: '',
    gender: '', // 'female', 'male', or ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState({});

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = 2026;
  const years = Array.from({ length: 105 }, (_, i) => currentYear - i);

  const isFormValid =
    formData.month &&
    formData.day &&
    formData.year &&
    formData.username.trim().length >= 3 &&
    formData.password.length >= 8;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.month || !formData.day || !formData.year) {
      setErrorMsg('Please select your complete birthday.');
      return;
    }
    if (formData.username.trim().length < 3) {
      setErrorMsg('Username must be at least 3 characters.');
      return;
    }
    if (formData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const monthIndex = months.indexOf(formData.month) + 1;
      const result = await registerUser({
        username: formData.username.trim(),
        month: monthIndex || 1,
        day: formData.day,
        year: formData.year,
        password: formData.password,
        gender: formData.gender,
      });

      if (result.success) {
        onSignupSuccess({
          username: formData.username.trim(),
          supabaseSynced: result.supabaseSynced,
          supabaseError: result.supabaseError,
        });
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[430px] mx-auto bg-[#181a1d]/95 sm:bg-[#191b1d]/95 backdrop-blur-md rounded-xl p-6 sm:p-7 shadow-2xl border border-zinc-800/80 text-left transition-all">
      {/* Title */}
      <h1 className="text-white text-center font-extrabold text-[15px] sm:text-base tracking-wide uppercase mb-4 drop-shadow-sm select-none">
        SIGN UP AND START HAVING FUN!
      </h1>

      {errorMsg && (
        <div className="mb-3.5 p-2.5 bg-red-950/60 border border-red-700/60 rounded text-red-200 text-xs text-center font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Birthday Field */}
        <div>
          <label className="block text-zinc-300 text-xs font-semibold mb-1 select-none">
            Birthday
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Month Select */}
            <div className="relative">
              <select
                value={formData.month}
                onChange={(e) => handleChange('month', e.target.value)}
                onBlur={() => handleBlur('month')}
                className="w-full bg-[#232527] hover:bg-[#282a2d] focus:bg-[#232527] border border-[#393b3d] focus:border-zinc-400 text-white text-xs sm:text-[13px] rounded-md px-3 py-2.5 pr-7 outline-none cursor-pointer transition-colors"
              >
                <option value="" disabled className="text-zinc-500">
                  Month
                </option>
                {months.map((m) => (
                  <option key={m} value={m} className="bg-[#1e2023] text-white">
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>

            {/* Day Select */}
            <div className="relative">
              <select
                value={formData.day}
                onChange={(e) => handleChange('day', e.target.value)}
                onBlur={() => handleBlur('day')}
                className="w-full bg-[#232527] hover:bg-[#282a2d] focus:bg-[#232527] border border-[#393b3d] focus:border-zinc-400 text-white text-xs sm:text-[13px] rounded-md px-3 py-2.5 pr-7 outline-none cursor-pointer transition-colors"
              >
                <option value="" disabled className="text-zinc-500">
                  Day
                </option>
                {days.map((d) => (
                  <option key={d} value={d} className="bg-[#1e2023] text-white">
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>

            {/* Year Select */}
            <div className="relative">
              <select
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                onBlur={() => handleBlur('year')}
                className="w-full bg-[#232527] hover:bg-[#282a2d] focus:bg-[#232527] border border-[#393b3d] focus:border-zinc-400 text-white text-xs sm:text-[13px] rounded-md px-3 py-2.5 pr-7 outline-none cursor-pointer transition-colors"
              >
                <option value="" disabled className="text-zinc-500">
                  Year
                </option>
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#1e2023] text-white">
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Username Field */}
        <div>
          <label className="block text-zinc-300 text-xs font-semibold mb-1 select-none">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              placeholder="Don't use your real name"
              autoComplete="username"
              className="w-full bg-[#232527] hover:bg-[#282a2d] focus:bg-[#232527] border border-[#393b3d] focus:border-zinc-300 text-white placeholder-[#75777a] text-xs sm:text-[13px] rounded-md px-3 py-2.5 outline-none transition-colors"
            />
            {formData.username.trim().length >= 3 && (
              <Check className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-zinc-300 text-xs font-semibold mb-1 select-none">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              className="w-full bg-[#232527] hover:bg-[#282a2d] focus:bg-[#232527] border border-[#393b3d] focus:border-zinc-300 text-white placeholder-[#75777a] text-xs sm:text-[13px] rounded-md px-3 py-2.5 pr-9 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Gender (optional) */}
        <div>
          <label className="block text-zinc-300 text-xs font-semibold mb-1 select-none">
            Gender (optional)
          </label>
          <div className="grid grid-cols-2 rounded-md border border-[#393b3d] overflow-hidden bg-[#232527]">
            {/* Female Button */}
            <button
              type="button"
              onClick={() =>
                handleChange('gender', formData.gender === 'female' ? '' : 'female')
              }
              className={`py-2 flex items-center justify-center transition-all ${
                formData.gender === 'female'
                  ? 'bg-zinc-700/80 text-white'
                  : 'hover:bg-[#2c2f33] text-zinc-400'
              }`}
            >
              <FemaleIcon active={formData.gender === 'female'} />
            </button>

            {/* Male Button */}
            <button
              type="button"
              onClick={() =>
                handleChange('gender', formData.gender === 'male' ? '' : 'male')
              }
              className={`py-2 flex items-center justify-center border-l border-[#393b3d] transition-all ${
                formData.gender === 'male'
                  ? 'bg-zinc-700/80 text-white'
                  : 'hover:bg-[#2c2f33] text-zinc-400'
              }`}
            >
              <MaleIcon active={formData.gender === 'male'} />
            </button>
          </div>
        </div>

        {/* Disclaimer Text */}
        <p className="text-[11px] leading-[1.38] text-[#a0a3a6] font-normal pt-1 select-none">
          By clicking Sign Up, you are agreeing to our{' '}
          <button
            type="button"
            onClick={onOpenTerms}
            className="text-zinc-300 underline hover:text-white cursor-pointer"
          >
            Terms of Use
          </button>{' '}
          (including arbitration) and acknowledge our{' '}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-zinc-300 underline hover:text-white cursor-pointer"
          >
            Privacy Policy
          </button>
          . If you are under 18, you agree that your parent/guardian permits you to create this account and agrees to our Terms of Use.
        </p>

        {/* Sign Up Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2 select-none ${
              isFormValid
                ? 'bg-white hover:bg-zinc-200 text-black shadow-lg cursor-pointer active:scale-[0.99]'
                : 'bg-[#5f6368] hover:bg-[#6b7076] text-[#1c1d1f] cursor-pointer'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Signing Up...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
