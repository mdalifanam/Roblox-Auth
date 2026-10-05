import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ title, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#181a1e] border border-zinc-800 rounded-xl w-full max-w-lg p-6 shadow-2xl relative text-left max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white font-bold text-base">{title || 'Legal Information'}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 text-xs text-zinc-300 space-y-3 leading-relaxed">
          {title === 'Privacy Policy' && (
            <>
              <p className="font-semibold text-white">Roblox Privacy Policy Overview</p>
              <p>
                Roblox respects the privacy of its users. This policy describes how Roblox Corporation collects, uses, and shares information when you use our website, mobile application, and related services.
              </p>
              <p>
                We do not sell personal information. We use technical safeguards to protect children's data and comply with global privacy standards, including COPPA and GDPR.
              </p>
            </>
          )}

          {title === 'Terms of Use' && (
            <>
              <p className="font-semibold text-white">Roblox Terms of Use</p>
              <p>
                Welcome to Roblox! These Terms of Use describe the rules and conditions that apply to your use of Roblox services. By registering an account, you agree to comply with our community guidelines, intellectual property policies, and dispute arbitration agreement.
              </p>
              <p>
                If you are under 18 years old, you confirm that your parent or guardian has reviewed and accepted these terms on your behalf.
              </p>
            </>
          )}

          {title === 'Your Privacy Choices' && (
            <>
              <p className="font-semibold text-white">California Consumer Privacy Act (CCPA) Choices</p>
              <p>
                Under the California Consumer Privacy Act and other privacy laws, you have the right to opt out of the sale or sharing of your personal information, and to limit the use of sensitive personal information.
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-between">
                <span>Personalized Advertising & Data Sharing</span>
                <span className="text-emerald-400 font-semibold font-mono">OPTED-OUT</span>
              </div>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
