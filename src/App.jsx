import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisionMissionSection from './components/VisionMissionSection';
import CategoriesWheel from './components/CategoriesWheel';
import MunicipalSection from './components/MunicipalSection';
import TradeLicenseSection from './components/TradeLicenseSection';
import OfficeMapSection from './components/OfficeMapSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ProjectsSection from './components/ProjectsSection';
import AdminProjectModal from './components/AdminProjectModal';
import { subscribeCloudProjects, syncLocalProjectsToCloud, syncLocalInquiriesToCloud } from './services/firebaseSync';
import { saveLocalProjects } from './services/projectService';
import { Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from './data/mockData';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Secret Link Listener: Trigger admin portal via URL link (#admin, #owner, #portal, or ?admin)
  useEffect(() => {
    const checkAdminTrigger = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();
      if (
        hash === '#admin' || 
        hash === '#owner' || 
        hash === '#portal' || 
        search.includes('admin') || 
        search.includes('portal')
      ) {
        setAdminModalOpen(true);
      }
    };

    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);
    window.addEventListener('popstate', checkAdminTrigger);

    // Optional owner secret keyboard shortcut (Ctrl + Shift + A)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('popstate', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Real-Time Cloud Synchronization Listener (Firebase Cloud Firestore)
  useEffect(() => {
    // 1. Auto-sync any previously added local projects & inquiries on this device to Cloud Firestore
    syncLocalProjectsToCloud().catch(console.warn);
    syncLocalInquiriesToCloud().catch(console.warn);

    // 2. Attach live real-time listener for global updates
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
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Hero Section with 2006-2026 Milestone & Vector Elevation */}
        <Hero 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
        />

        {/* Corporate Philosophy: Vision & Mission */}
        <VisionMissionSection />

        {/* 4 Core Contracting Categories */}
        <CategoriesWheel 
          onSelectServiceForQuote={handleSelectServiceForQuote} 
        />

        {/* Track Record & Live Project Pipeline (Upcoming & Completed) */}
        <ProjectsSection 
          onOpenQuoteModal={handleOpenQuoteModal} 
        />

        {/* Dubai Municipality Civic Contracts Showcase */}
        <MunicipalSection />

        {/* Official Commercial Trade License & Dubai Municipality G+1 Verification */}
        <TradeLicenseSection />

        {/* Warehouse B-25 Al Qusais Office & Access Map */}
        <OfficeMapSection />

        {/* Direct RFP / Tender Transmittal Form */}
        <ContactSection />
      </main>

      {/* Imperial Mahogany & Bronze Footer */}
      <Footer 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Interactive RFP / Proposal Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={quoteInitialData}
      />

      {/* Owner Portal / Admin Project Management Modal (Hidden, accessible only via link #admin or ?admin) */}
      <AdminProjectModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdminModal}
      />

      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 sm:hidden pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)]">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl active:scale-95 transition"
          title="WhatsApp Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="w-12 h-12 rounded-full bg-[#7A2E16] text-white flex items-center justify-center shadow-2xl font-black text-xs active:scale-95 transition"
          title="Call Kachoras"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
