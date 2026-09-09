import React, { useState, useEffect } from 'react';
import PageShell from './components/layout/PageShell';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Home from './pages/Home';
import Diagnose from './pages/Diagnose';
import Forecast from './pages/Forecast';
import MapPage from './pages/Map';
import Advisory from './pages/Advisory';
import FarmerSupport from './pages/FarmerSupport';
import Dashboard from './pages/Dashboard';

export default function App() {
  // Sync state with URL hash for navigation & bookmarking
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages = ['home', 'diagnose', 'forecast', 'map', 'advisory', 'support', 'dashboard'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.location.hash = `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'diagnose', 'forecast', 'map', 'advisory', 'support', 'dashboard'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <PageShell activePage={activePage} onNavigate={handleNavigate}>
      <ErrorBoundary key={activePage}>
        {activePage === 'home' && <Home onNavigate={handleNavigate} />}
        {activePage === 'diagnose' && <Diagnose />}
        {activePage === 'forecast' && <Forecast onNavigate={handleNavigate} />}
        {activePage === 'map' && <MapPage />}
        {activePage === 'advisory' && <Advisory />}
        {activePage === 'support' && <FarmerSupport onNavigate={handleNavigate} />}
        {activePage === 'dashboard' && <Dashboard />}
      </ErrorBoundary>
    </PageShell>
  );
}
