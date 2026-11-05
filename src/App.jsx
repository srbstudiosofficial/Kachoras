import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import LicensePage from './pages/LicensePage';
import ContactPage from './pages/ContactPage';
import QuoteModal from './components/QuoteModal';
import AdminProjectModal from './components/AdminProjectModal';
import { subscribeCloudProjects, syncLocalProjectsToCloud, syncLocalInquiriesToCloud } from './services/firebaseSync';
import { saveLocalProjects } from './services/projectService';
import { useScrollReveal } from './hooks/useScrollReveal';

const PAGE_TITLES = {
  home: 'Kachoras Electromechanical Contracting LLC | Dubai Municipality G+1 Contractor',
  about: 'About Us | Kachoras Electromechanical Contracting LLC (Dubai)',
  services: 'Contracting Disciplines & Capabilities | Kachoras Contracting LLC',
  projects: 'Live Engineering Projects & Pipeline | Kachoras Contracting LLC',
  license: 'Trade License #578964 & Municipal Approvals | Kachoras Contracting',
  contact: 'Contact Estimating Desk & Headquarters | Kachoras Contracting'
};

const resolvePageFromLocation = () => {
  const path = (window.location.pathname || '').toLowerCase().replace(/^\/+|\/+$/g, '');
  const hash = (window.location.hash || '').toLowerCase().replace(/^#+/, '');

  const target = path || hash;
  if (target === 'about' || target === 'vision' || target === 'leadership') return 'about';
  if (target === 'services' || target === 'disciplines' || target === 'categories') return 'services';
  if (target === 'projects' || target === 'portfolio' || target === 'works') return 'projects';
  if (target === 'license' || target === 'municipal' || target === 'compliance') return 'license';
  if (target === 'contact' || target === 'location' || target === 'tender' || target === 'map') return 'contact';
  return 'home';
};

export default function App() {
  useScrollReveal();

  const [currentPage, setCurrentPage] = useState(() => resolvePageFromLocation());
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Synchronize document title with active page
  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
  }, [currentPage]);

  // Handle Browser Back / Forward & Hash Navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const p = resolvePageFromLocation();
      if (p && p !== currentPage) {
        setCurrentPage(p);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentPage]);

  // Link-Only Trigger: Opens owner portal via /admin, #admin, #portal, ?admin
  useEffect(() => {
    const checkAdminTrigger = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      if (
        hash === '#admin' || 
        hash === '#owner' || 
        hash === '#portal' || 
        hash === '#control' ||
        search.includes('admin') || 
        search.includes('portal') ||
        search.includes('control') ||
        pathname.endsWith('/admin') ||
        pathname.endsWith('/portal') ||
        pathname.endsWith('/control')
      ) {
        setAdminModalOpen(true);
      }
    };

    checkAdminTrigger();
    const t = setTimeout(checkAdminTrigger, 300);
    window.addEventListener('hashchange', checkAdminTrigger);
    window.addEventListener('popstate', checkAdminTrigger);
    window.addEventListener('focus', checkAdminTrigger);

    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('popstate', checkAdminTrigger);
      window.removeEventListener('focus', checkAdminTrigger);
    };
  }, []);

  // Real-Time Cloud Synchronization Listener (Firebase Cloud Firestore)
  useEffect(() => {
    syncLocalProjectsToCloud().catch(console.warn);
    syncLocalInquiriesToCloud().catch(console.warn);

    const unsubscribe = subscribeCloudProjects((liveCloudProjects) => {
      if (liveCloudProjects && Array.isArray(liveCloudProjects)) {
        saveLocalProjects(liveCloudProjects);
        window.dispatchEvent(new CustomEvent('kachoras_projects_updated'));
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const navigateTo = (pageId) => {
    if (pageId === 'admin') {
      setAdminModalOpen(true);
      return;
    }

    const validPage = PAGE_TITLES[pageId] ? pageId : 'home';
    setCurrentPage(validPage);

    // Update browser URL without page reload
    const targetPath = validPage === 'home' ? '/' : `/${validPage}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: validPage }, '', targetPath);
    }

    document.title = PAGE_TITLES[validPage] || PAGE_TITLES.home;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCloseAdminModal = () => {
    setAdminModalOpen(false);
    const hash = (window.location.hash || '').toLowerCase();
    if (hash === '#admin' || hash === '#owner' || hash === '#portal') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  };

  const handleOpenQuoteModal = (initialData = null) => {
    setQuoteInitialData(initialData);
    setQuoteModalOpen(true);
  };

  const handleSelectServiceForQuote = (serviceName) => {
    handleOpenQuoteModal({
      category: serviceName,
      budget: '',
      notes: `Proposal request initiated for: ${serviceName}`
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E293B] flex flex-col selection:bg-[#7A2E16] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Fixed Luxury Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
      />

      {/* Main Multi-Page Experience */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage 
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'license' && (
          <LicensePage 
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigateTo}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}
      </main>

      {/* Imperial Mahogany & Bronze Footer */}
      <Footer 
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
      />

      {/* Interactive RFQ / Proposal Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={quoteInitialData}
      />

      {/* Owner Portal / Admin Project Management Modal (Hidden, accessible only via link /admin or #admin) */}
      <AdminProjectModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdminModal}
      />

    </div>
  );
}
