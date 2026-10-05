import React, { useState } from 'react';
import { X, Mail, QrCode, KeyRound, Check, RefreshCw, Smartphone } from 'lucide-react';

export function EmailCodeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!email) return;
    setCodeSent(true);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length >= 6) {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setCodeSent(false);
        setEmail('');
        setOtp('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#22242a] border border-zinc-700 rounded-xl w-full max-w-sm p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 mx-auto">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="text-white font-bold text-base text-center mb-1">
          Email Me a One-Time Code
        </h2>
        <p className="text-zinc-400 text-xs text-center mb-5">
          {!codeSent
            ? 'Enter your account email to receive a 6-digit login code.'
            : `A 6-digit code has been sent to ${email}`}
        </p>

        {isSuccess ? (
          <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded text-emerald-200 text-xs text-center font-medium">
            Code verified! Logging you in...
          </div>
        ) : !codeSent ? (
          <form onSubmit={handleSend} className="space-y-3.5">
            <div>
              <label className="block text-zinc-300 text-xs font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#353740] border border-[#484b57] focus:border-zinc-300 text-white text-xs rounded-md px-3 py-2.5 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-md transition-colors cursor-pointer"
            >
              Send Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-3.5">
            <div>
              <label className="block text-zinc-300 text-xs font-semibold mb-1">6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                required
                className="w-full bg-[#353740] border border-[#484b57] focus:border-zinc-300 text-white text-center font-mono text-base tracking-widest rounded-md px-3 py-2.5 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-md transition-colors cursor-pointer"
            >
              Verify & Log In
            </button>
            <button
              type="button"
              onClick={() => setCodeSent(false)}
              className="w-full text-center text-xs text-zinc-400 hover:text-white"
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function QuickSignInModal({ isOpen, onClose }) {
  const [code, setCode] = useState('7DF 9KP');

  if (!isOpen) return null;

  const generateNewCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const c1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const c2 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setCode(`${c1} ${c2}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#22242a] border border-zinc-700 rounded-xl w-full max-w-sm p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 mx-auto">
          <Smartphone className="w-5 h-5" />
        </div>

        <h2 className="text-white font-bold text-base mb-1">Quick Sign-in</h2>
        <p className="text-zinc-400 text-xs mb-5">
          Enter this code on your other logged-in device or scan with your Roblox app.
        </p>

        {/* Code Box */}
        <div className="bg-[#181a1e] border border-zinc-700 rounded-lg p-4 mb-4">
          <span className="text-2xl font-black font-mono tracking-widest text-white">{code}</span>
        </div>

        <div className="text-[11px] text-zinc-400 mb-5 leading-normal">
          Go to <strong className="text-white">Settings &gt; Quick Sign-in</strong> on your logged-in device.
        </div>

        <button
          onClick={generateNewCode}
          className="flex items-center justify-center gap-1.5 mx-auto text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Generate New Code
        </button>
      </div>
    </div>
  );
}

export function ForgotPasswordModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('password'); // 'password' | 'username'
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#22242a] border border-zinc-700 rounded-xl w-full max-w-sm p-6 shadow-2xl relative text-left">
        <button
          onClick={() => {
            onClose();
            setSubmitted(false);
          }}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-white font-bold text-base text-center mb-4">
          Forgot Password or Username?
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-zinc-700 mb-4 text-xs font-semibold">
          <button
            onClick={() => {
              setTab('password');
              setSubmitted(false);
            }}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'password'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => {
              setTab('username');
              setSubmitted(false);
            }}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'username'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Username
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-4 space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-white font-semibold text-xs">Instructions Sent!</p>
            <p className="text-zinc-400 text-xs">
              Check your inbox for a message from Roblox with further instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-zinc-300 text-xs font-semibold mb-1">
                {tab === 'password' ? 'Enter Email or Phone' : 'Enter Email'}
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email or phone number"
                required
                className="w-full bg-[#353740] border border-[#484b57] focus:border-zinc-300 text-white text-xs rounded-md px-3 py-2.5 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-md transition-colors cursor-pointer"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
