import React, { useState } from 'react';
import { X, RefreshCw, Copy, Check } from 'lucide-react';

export default function QuickSignInModal({ isOpen, onClose }) {
  const [code, setCode] = useState('3JR2PR');
  const [copied, setCopied] = useState(false);
  const [showTrouble, setShowTrouble] = useState(false);

  if (!isOpen) return null;

  const generateNewCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const c = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setCode(c);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#22242a] border border-zinc-700/80 rounded-xl w-full max-w-[390px] shadow-2xl relative text-left overflow-hidden">
        {/* Top Header Bar with X on left and Centered Title (Matches Screenshot 3) */}
        <div className="relative px-5 py-3.5 border-b border-zinc-700/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-white font-bold text-base select-none">
            Quick Sign In Code
          </h2>
          <div className="w-5" /> {/* Optical centering spacer */}
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center select-none">
          {/* OPTION 1 */}
          <h3 className="text-white font-bold text-sm mb-3">Option 1</h3>

          {/* QR Code Container */}
          <div className="w-48 h-48 mx-auto bg-white rounded-lg p-2.5 shadow-lg flex items-center justify-center">
            {/* High-res SVG QR Code */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=roblox://quick-sign-in?code=${code}&bgcolor=ffffff&color=000000&margin=0`}
              alt="Quick Sign In QR Code"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Inline SVG fallback if network unavailable
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback QR representation */}
            <div className="hidden w-full h-full bg-white text-black text-[10px] font-mono p-1">
              [QR: {code}]
            </div>
          </div>

          <p className="text-zinc-300 text-xs sm:text-[13px] mt-3.5 leading-snug">
            Scan this QR code from your logged in device's camera.
          </p>
          <div>
            <button
              onClick={() => setShowTrouble(!showTrouble)}
              className="text-zinc-300 hover:text-white underline text-xs font-semibold cursor-pointer transition-colors"
            >
              Having trouble?
            </button>
          </div>

          {showTrouble && (
            <div className="mt-2 p-2.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-300 text-left">
              Make sure both devices have camera permissions enabled, or use <strong>Option 2</strong> below with your alphanumeric code.
            </div>
          )}

          {/* OPTION 2 */}
          <h3 className="text-white font-bold text-sm mt-6 mb-1">Option 2</h3>

          {/* Alphanumeric Code Display */}
          <div className="flex items-center justify-center gap-2 my-1">
            <span
              onClick={handleCopy}
              title="Click to copy code"
              className="text-3xl sm:text-4xl font-black font-sans tracking-wider text-white select-all hover:text-zinc-200 cursor-pointer transition-colors"
            >
              {code}
            </span>
            <button
              onClick={handleCopy}
              className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-zinc-300 text-xs sm:text-[13px] leading-snug mt-1">
            Open your Roblox app and go to:
          </p>
          <p className="text-white font-bold text-xs sm:text-[13px] leading-snug">
            More Page &gt; Quick Sign In to enter your code.
          </p>

          <div className="mt-5 flex justify-center">
            <button
              onClick={generateNewCode}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate New Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
