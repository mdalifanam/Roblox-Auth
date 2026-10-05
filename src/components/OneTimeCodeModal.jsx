import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function OneTimeCodeModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      // Generate a realistic 6-digit one-time code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setCodeSent(true);
      setIsLoading(false);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp.trim() !== generatedCode) {
      setErrorMsg('Invalid one-time code. Please check and try again.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setCodeSent(false);
        setEmail('');
        setEnteredOtp('');
        // Trigger login with email username
        onLoginSuccess({
          username: email.split('@')[0],
          source: 'One-Time Email Code',
        });
      }, 1200);
    }, 600);
  };

  const handleClose = () => {
    onClose();
    setErrorMsg('');
    setCodeSent(false);
    setEmail('');
    setEnteredOtp('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#22242a] border border-zinc-700/80 rounded-xl w-full max-w-[430px] shadow-2xl relative text-left overflow-hidden">
        {/* Top Header Bar with X on the left and Centered Title (Matches Screenshot 2) */}
        <div className="relative px-5 py-3.5 border-b border-zinc-700/60 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-white font-bold text-base select-none">
            Get One-Time Code
          </h2>
          <div className="w-5" /> {/* Spacer for optical centering */}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-950/70 border border-red-600/70 rounded text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="text-white font-bold text-base">Code Verified!</p>
              <p className="text-zinc-400 text-xs">Logging into your account...</p>
            </div>
          ) : !codeSent ? (
            /* STEP 1: Enter Email (Exact Screenshot 2 Design) */
            <form onSubmit={handleSendCode} className="space-y-4">
              <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed select-none">
                Enter the email verified on your account to receive a one-time code.
              </p>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Email"
                  autoFocus
                  required
                  className="w-full bg-[#353740] hover:bg-[#3b3d47] focus:bg-[#353740] border border-zinc-500 focus:border-white text-white placeholder-zinc-400 text-sm rounded-md px-3.5 py-2.5 outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 font-bold text-sm rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    email.trim()
                      ? 'bg-white hover:bg-zinc-200 text-black shadow-md'
                      : 'bg-[#2a2d36] hover:bg-[#323640] text-zinc-400 border border-zinc-700/80'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Code'
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: Enter One-Time Code */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Simulated Email Popover Banner */}
              <div className="p-3 bg-blue-950/70 border border-blue-600/70 rounded-lg text-xs text-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">📬 One-Time Code Sent!</span>
                  <span className="font-mono bg-blue-900/80 px-2 py-0.5 rounded text-white font-bold tracking-wider">
                    {generatedCode}
                  </span>
                </div>
                <p className="text-[11px] text-blue-300">
                  (Simulated delivery to {email})
                </p>
              </div>

              <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed">
                Enter the 6-digit code sent to <strong className="text-white">{email}</strong>.
              </p>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => {
                    setEnteredOtp(e.target.value.replace(/\D/g, ''));
                    setErrorMsg('');
                  }}
                  placeholder="Enter 6-digit code"
                  autoFocus
                  required
                  className="w-full bg-[#353740] border border-zinc-500 focus:border-white text-white text-center font-mono text-xl tracking-widest rounded-md px-3.5 py-3 outline-none"
                />
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isLoading || enteredOtp.length !== 6}
                  className={`w-full py-2.5 font-bold text-sm rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    enteredOtp.length === 6
                      ? 'bg-white hover:bg-zinc-200 text-black shadow-md'
                      : 'bg-[#2a2d36] text-zinc-500 cursor-not-allowed border border-zinc-800'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'Verify & Sign In'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCodeSent(false)}
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white pt-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Use different email</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
