import React from 'react';

export const AppleBadge = () => (
  <a
    href="https://apps.apple.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* Apple Icon */}
    <svg className="w-5 h-5 text-white fill-current shrink-0" viewBox="0 0 170 170">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.96-14.42-5.55-8.59-10-18.72-13.37-30.38-3.37-11.66-5.06-22.9-5.06-33.72 0-14.15 3.38-26.06 10.15-35.73 6.77-9.67 15.43-14.6 25.98-14.79 4.36 0 9.28 1.14 14.77 3.42 5.48 2.28 9.38 3.48 11.71 3.59 1.74 0 5.86-1.32 12.35-3.96 6.5-2.64 12.06-3.8 16.69-3.48 12.52 1.09 22.41 5.87 29.68 14.35-10.89 6.64-16.23 15.77-16.01 27.42.22 9.03 3.69 16.8 10.43 23.33 6.74 6.53 14.74 10.33 24 11.42-2.17 6.42-4.78 12.94-7.82 19.57zM119.22 33.56c0-7.39 2.61-14.13 7.82-20.22 5.22-6.09 11.52-9.78 18.91-11.08.33 1.3.49 2.5.49 3.59 0 7.39-2.61 14.35-7.82 20.87-5.22 6.52-11.63 10.32-19.23 11.41-.11-1.3-.17-2.82-.17-4.57z" />
    </svg>
    <div className="flex flex-col text-left leading-none">
      <span className="text-[9px] text-zinc-400 font-medium tracking-tight">Download on the</span>
      <span className="text-[14px] text-white font-semibold tracking-tight -mt-0.5">App Store</span>
    </div>
  </a>
);

export const GooglePlayBadge = () => (
  <a
    href="https://play.google.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* Google Play Triangles */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512">
      <path fill="#4285F4" d="M47.7 28.5L271.6 256 47.7 483.5c-4.3-4.8-6.9-11.2-6.9-18.4V46.9c0-7.2 2.6-13.6 6.9-18.4z" />
      <path fill="#FBBC04" d="M346.2 330.6L271.6 256l74.6-74.6 84.4 48.7c15.8 9.1 15.8 24 0 33.1l-84.4 67.4z" />
      <path fill="#EA4335" d="M271.6 256L47.7 28.5C52.4 23.3 60 20 68.6 25l277.6 160.3L271.6 256z" />
      <path fill="#34A853" d="M271.6 256l74.6 74.6L68.6 491c-8.6 5-16.2 1.7-20.9-3.5L271.6 256z" />
    </svg>
    <div className="flex flex-col text-left leading-none">
      <span className="text-[8px] text-zinc-400 font-medium uppercase tracking-wider">GET IT ON</span>
      <span className="text-[13px] text-white font-semibold tracking-tight mt-0.5">Google Play</span>
    </div>
  </a>
);

export const PlayStationBadge = () => (
  <a
    href="https://www.playstation.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3.5 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* PlayStation Logo */}
    <svg className="w-6 h-5 text-white fill-current shrink-0" viewBox="0 0 50 39">
      <path d="M14.6 30.6c0 3.3 2 5.2 5.9 5.2 3.9 0 5.8-1.9 5.8-5.2V2.8L14.6 0v30.6zm11.7-8.1v6.7c1.3.8 2.8 1.3 4.4 1.3 2.8 0 4.1-.9 4.1-2.2 0-2.8-8.5-2.2-8.5-5.8zm-14.7 6.7c1.6 0 3.1-.5 4.4-1.3v-6.7c0 3.6-8.5 3-8.5 5.8 0 1.3 1.3 2.2 4.1 2.2zm14.7-14.5v5.8c3.8 0 7.8-.5 11.6-1.5 3.9-1 7.2-2.5 9.8-4.4-2.6-1.9-5.9-3.4-9.8-4.4-3.8-1-7.8-1.5-11.6-1.5v6zm-17.7 5.8v-5.8c-3.8 0-7.8.5-11.6 1.5-3.9 1-7.2 2.5-9.8 4.4 2.6 1.9 5.9 3.4 9.8 4.4 3.8 1 7.8 1.5 11.6 1.5z" />
    </svg>
    <span className="text-[14px] text-white font-semibold tracking-tight">PlayStation.</span>
  </a>
);

export const XboxBadge = () => (
  <a
    href="https://www.xbox.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3.5 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* Xbox Sphere */}
    <svg className="w-5 h-5 text-white fill-current shrink-0" viewBox="0 0 512 512">
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-87.9 375.4c-35.3-26.6-58.4-68.8-58.4-116.4 0-14.2 2-28 5.8-40.9 25.1 40.5 67.9 105.7 101.4 153.2-18.4 2.9-34.9 3.9-48.8 4.1zm175.8 0c-13.9-.2-30.4-1.2-48.8-4.1 33.5-47.5 76.3-112.7 101.4-153.2 3.8 12.9 5.8 26.7 5.8 40.9 0 47.6-23.1 89.8-58.4 116.4zM256 312.3c-23.5-35.3-51.4-78.6-73.4-114.6 21-12.7 47.2-20.3 73.4-20.3s52.4 7.6 73.4 20.3c-22 36-49.9 79.3-73.4 114.6z" />
    </svg>
    <span className="text-[14px] text-white font-bold tracking-wider">XBOX</span>
  </a>
);

export const MetaQuestBadge = () => (
  <a
    href="https://www.meta.com/quest"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3.5 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* Meta Logo */}
    <svg className="w-5 h-4 shrink-0 text-[#0668E1] fill-current" viewBox="0 0 24 16">
      <path d="M16.5 0C13.8 0 12.4 1.8 12 2.5 11.6 1.8 10.2 0 7.5 0 3.3 0 0 3.6 0 8s3.3 8 7.5 8c2.8 0 4.2-1.8 4.5-2.5.3.7 1.7 2.5 4.5 2.5 4.2 0 7.5-3.6 7.5-8s-3.3-8-7.5-8zm-9 13.5C4.7 13.5 2.5 11 2.5 8s2.2-5.5 5-5.5c2.3 0 3.6 1.8 4.2 3.2-.8 2-2.3 7.8-4.2 7.8zm9 0c-1.9 0-3.4-5.8-4.2-7.8.6-1.4 1.9-3.2 4.2-3.2 2.8 0 5 2.5 5 5.5s-2.2 5.5-5 5.5z" />
    </svg>
    <span className="text-[13px] text-white font-medium tracking-tight">Meta Quest</span>
  </a>
);

export const MicrosoftBadge = () => (
  <a
    href="https://apps.microsoft.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* Microsoft 4 Squares */}
    <div className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0">
      <div className="bg-[#f25022] w-1.5 h-1.5"></div>
      <div className="bg-[#7fba00] w-1.5 h-1.5"></div>
      <div className="bg-[#00a4ef] w-1.5 h-1.5"></div>
      <div className="bg-[#ffb900] w-1.5 h-1.5"></div>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="text-[8px] text-zinc-400 font-medium tracking-tight">Get it from</span>
      <span className="text-[13px] text-white font-semibold tracking-tight mt-0.5">Microsoft</span>
    </div>
  </a>
);

export const AmazonBadge = () => (
  <a
    href="https://www.amazon.com/appstore"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2 transition-all duration-200 select-none group shadow-md"
  >
    <div className="flex flex-col text-left leading-none">
      <span className="text-[8px] text-zinc-400 font-medium tracking-tight">available at</span>
      <span className="text-[13px] text-white font-bold tracking-tight lowercase">amazon <span className="font-normal text-zinc-200">appstore</span></span>
    </div>
  </a>
);

export const GalaxyStoreBadge = () => (
  <a
    href="https://galaxystore.samsung.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 px-3.5 bg-black/90 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-500 rounded-md flex items-center gap-2.5 transition-all duration-200 select-none group shadow-md"
  >
    {/* Samsung Galaxy Bag */}
    <div className="w-5 h-5 bg-gradient-to-tr from-[#e91e63] to-[#ff4081] rounded flex items-center justify-center shrink-0 shadow-sm">
      <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
        <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-9c1.66 0 3-1.34 3-3h-2c0 .55-.45 1-1 1s-1-.45-1-1H9c0 1.66 1.34 3 3 3z" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="text-[8px] text-zinc-400 font-medium tracking-tight">Available on</span>
      <span className="text-[13px] text-white font-semibold tracking-tight mt-0.5">Galaxy Store</span>
    </div>
  </a>
);

export default function DeviceBadges() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 mt-8 mb-12 flex flex-col items-center select-none text-center">
      <h2 className="text-white font-black text-sm md:text-[15px] tracking-wider uppercase mb-5 drop-shadow-sm">
        ROBLOX ON YOUR DEVICE
      </h2>

      {/* Row 1 */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 max-w-4xl">
        <AppleBadge />
        <GooglePlayBadge />
        <PlayStationBadge />
        <XboxBadge />
        <MetaQuestBadge />
        <MicrosoftBadge />
        <AmazonBadge />
      </div>

      {/* Row 2 (Centered Galaxy Store) */}
      <div className="mt-3 flex justify-center">
        <GalaxyStoreBadge />
      </div>
    </section>
  );
}
