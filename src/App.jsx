import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LicensePage from './pages/LicensePage';
import ContactPage from './pages/ContactPage';
import QuoteModal from './components/QuoteModal';
import AdminProjectModal from './components/AdminProjectModal';
import CoreLayoutProvider from './components/CoreLayoutProvider';
import { subscribeCloudProjects, syncLocalProjectsToCloud, syncLocalInquiriesToCloud } from './services/firebaseSync';
import { saveLocalProjects } from './services/projectService';
import { useScrollReveal } from './hooks/useScrollReveal';

const PAGE_TITLES = {
  home: 'Kachoras Electromechanical Contracting LLC | Dubai Municipality G+1 Contractor',
  about: 'About Us | Kachoras Electromechanical Contracting LLC (Dubai)',
  services: 'Contracting Disciplines & Capabilities | Kachoras Contracting LLC',
  projects: 'Live Engineering Projects & Pipeline | Kachoras Contracting LLC',
  'project-detail': 'Project Details & Specifications | Kachoras Electromechanical Contracting LLC',
  license: 'Trade License #578964 & Municipal Approvals | Kachoras Contracting',
  contact: 'Contact Estimating Desk & Headquarters | Kachoras Contracting'
};

const resolvePageFromLocation = () => {
  const path = (window.location.pathname || '').toLowerCase().replace(/^\/+|\/+$/g, '');
  const hash = (window.location.hash || '').toLowerCase().replace(/^#+/, '');
  const searchParams = new URLSearchParams(window.location.search || '');

  // 1. Check query parameter: ?project=...
  const queryProject = searchParams.get('project');
  if (queryProject) {
    return { page: 'project-detail', projectId: queryProject };
  }

  // 2. Check path: /project/:id or /projects/:id
  const projectPathMatch = path.match(/^projects?\/([a-z0-9_-]+)/i);
  if (projectPathMatch) {
    return { page: 'project-detail', projectId: projectPathMatch[1] };
  }

  // 3. Check hash: #project/:id or #project-...
  const projectHashMatch = hash.match(/^projects?[-/]([a-z0-9_-]+)/i);
  if (projectHashMatch) {
    return { page: 'project-detail', projectId: projectHashMatch[1] };
  }

  const target = path || hash;
  if (target === 'about' || target === 'vision' || target === 'leadership') return { page: 'about', projectId: null };
  if (target === 'services' || target === 'disciplines' || target === 'categories') return { page: 'services', projectId: null };
  if (target === 'projects' || target === 'portfolio' || target === 'works') return { page: 'projects', projectId: null };
  if (target === 'license' || target === 'municipal' || target === 'compliance') return { page: 'license', projectId: null };
  if (target === 'contact' || target === 'location' || target === 'tender' || target === 'map') return { page: 'contact', projectId: null };
  return { page: 'home', projectId: null };
};

export default function App() {
  useScrollReveal();

  const [route, setRoute] = useState(() => resolvePageFromLocation());
  const currentPage = route.page;
  const currentProjectId = route.projectId;
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Synchronize document title with active page
  useEffect(() => {
    if (currentPage === 'project-detail' && currentProjectId) {
      document.title = `Project Details | Kachoras Electromechanical Contracting LLC`;
    } else {
      document.title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
    }
  }, [currentPage, currentProjectId]);

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolvePageFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        hash === '#dashboard' ||
        search.includes('admin') || 
        search.includes('owner') ||
        pathname.endsWith('/admin') ||
        pathname.endsWith('/owner')
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

  // Firebase Real-time Synchronization
  useEffect(() => {
    let unsubscribeProjects = null;
    let unsubscribeInquiries = null;

    try {
      unsubscribeProjects = subscribeCloudProjects((cloudProjects) => {
        if (Array.isArray(cloudProjects) && cloudProjects.length > 0) {
          saveLocalProjects(cloudProjects);
        }
      });

      unsubscribeInquiries = subscribeCloudInquiries(() => {});

      syncLocalProjectsToCloud().catch(() => {});
      syncLocalInquiriesToCloud().catch(() => {});
    } catch (e) {
      console.warn('Firebase background sync skipped:', e);
    }

    return () => {
      if (typeof unsubscribeProjects === 'function') unsubscribeProjects();
      if (typeof unsubscribeInquiries === 'function') unsubscribeInquiries();
    };
  }, []);

  const navigateTo = (pageId, projectId = null) => {
    if (pageId === 'admin') {
      setAdminModalOpen(true);
      return;
    }

    if (pageId === 'project-detail' || pageId === 'project') {
      const pid = projectId || 'REAL-CP-ALBANNAY';
      setRoute({ page: 'project-detail', projectId: pid });
      window.history.pushState({ page: 'project-detail', projectId: pid }, '', `?project=${pid}`);
      return;
    }

    if (PAGE_TITLES[pageId]) {
      setRoute({ page: pageId, projectId: null });
      const url = pageId === 'home' ? '/' : `/${pageId}`;
      window.history.pushState({ page: pageId, projectId: null }, '', url);
    }
  };

  const handleOpenQuoteModal = (initialData = null) => {
    setQuoteInitialData(initialData);
    setQuoteModalOpen(true);
  };

  const handleCloseAdminModal = () => {
    setAdminModalOpen(false);
    const hash = window.location.hash.toLowerCase();
    if (hash === '#admin' || hash === '#owner' || hash === '#portal') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleSelectServiceForQuote = (serviceTitle) => {
    handleOpenQuoteModal({
      category: serviceTitle,
      notes: `Inquiring specifically for: ${serviceTitle}`
    });
  };

  return (
    <CoreLayoutProvider>
      <div className="min-h-screen bg-[#FBF9F5] text-[#1E293B] flex flex-col selection:bg-[#B3261E] selection:text-white font-sans antialiased overflow-x-hidden">
        
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

          {currentPage === 'project-detail' && (
            <ProjectDetailPage 
              projectId={currentProjectId}
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
    </CoreLayoutProvider>
  );
}
