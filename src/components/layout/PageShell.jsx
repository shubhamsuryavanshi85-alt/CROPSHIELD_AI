import React, { useState } from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import ToastContainer from '../ui/ToastContainer';
import SettingsModal from './SettingsModal';

export default function PageShell({ activePage, onNavigate, children }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-soil-dark selection:bg-growth selection:text-white">
      {/* Toast Alert Stack */}
      <ToastContainer />

      {/* Main Top Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Bottom Navigation for Mobile */}
      <BottomNav activePage={activePage} onNavigate={onNavigate} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
