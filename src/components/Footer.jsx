import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const PrivacyChoicesIcon = () => (
  <svg className="w-6 h-3.5 inline-block shrink-0" viewBox="0 0 30 14" fill="none">
    <path
      d="M7 1H23C26.3137 1 29 3.68629 29 7C29 10.3137 26.3137 13 23 13H7C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1Z"
      fill="#005ea2"
      stroke="#005ea2"
    />
    <path
      d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
      fill="white"
    />
    <path
      d="M5.5 7L6.7 8.2L8.5 5.5"
      stroke="#005ea2"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 5L23.5 9M23.5 5L19.5 9"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const languages = [
  'English (United States)',
  'Español (Latinoamérica)',
  'Français (France)',
  'Deutsch (Deutschland)',
  'Português (Brasil)',
  '日本語 (日本)',
  '한국어 (대한민국)',
  '中文 (简体)',
  'Italiano (Italia)',
];

export default function Footer({ onOpenLegalModal }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English (United States)');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const links = [
    { name: 'About Us', href: 'https://corp.roblox.com' },
    { name: 'Jobs', href: 'https://careers.roblox.com' },
    { name: 'Newsroom', href: 'https://corp.roblox.com/newsroom' },
    { name: 'Parents', href: 'https://corp.roblox.com/parents' },
    { name: 'Buy Gift Cards', href: 'https://www.roblox.com/giftcards' },
    { name: 'Help', href: 'https://en.help.roblox.com' },
    { name: 'Terms', action: () => onOpenLegalModal('Terms of Use') },
    { name: 'Accessibility', href: 'https://corp.roblox.com/accessibility' },
    { name: 'Privacy', action: () => onOpenLegalModal('Privacy Policy') },
    {
      name: 'Your Privacy Choices',
      icon: true,
      action: () => onOpenLegalModal('Your Privacy Choices'),
    },
    { name: 'Sitemap', href: 'https://www.roblox.com/sitemap' },
  ];

  return (
    <footer className="w-full bg-[#0d0e11] border-t border-zinc-900/60 pt-9 pb-12 px-4 sm:px-8 select-none text-zinc-400">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Navigation links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 text-xs sm:text-[13px] font-medium text-zinc-300">
          {links.map((link) => {
            if (link.action) {
              return (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                >
                  <span>{link.name}</span>
                  {link.icon && <PrivacyChoicesIcon />}
                </button>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Thin separator line */}
        <div className="w-full border-t border-zinc-800/80 my-7" />

        {/* Bottom bar: Language picker + Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-zinc-500">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="bg-[#181a1e] hover:bg-[#202227] border border-[#3b3e44] text-white text-xs rounded-md px-3.5 py-2 flex items-center justify-between gap-6 min-w-[210px] transition-colors shadow-sm"
            >
              <span>{selectedLanguage}</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  isLangOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Language Dropdown Menu */}
            {isLangOpen && (
              <div className="absolute bottom-full mb-1.5 left-0 w-full bg-[#181a1e] border border-zinc-700/80 rounded-md shadow-xl py-1 z-50 max-h-60 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>{lang}</span>
                    {selectedLanguage === lang && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trademark & Copyright Legal Note */}
          <p className="text-[11px] leading-tight text-zinc-400 text-center md:text-right max-w-xl">
            ©2026 Roblox Corporation. Roblox, the Roblox logo and Powering Imagination are among our registered and unregistered trademarks in the U.S. and other countries.
          </p>
        </div>
      </div>
    </footer>
  );
}
