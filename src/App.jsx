import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisionMissionSection from './components/VisionMissionSection';
import CategoriesWheel from './components/CategoriesWheel';
import MunicipalSection from './components/MunicipalSection';
import CostEstimator from './components/CostEstimator';
import Portfolio from './components/Portfolio';
import TradeLicenseSection from './components/TradeLicenseSection';
import OfficeMapSection from './components/OfficeMapSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import { Calculator, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from './data/mockData';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);

  const handleOpenQuoteModal = (initialData = null) => {
    setQuoteInitialData(initialData);
    setQuoteModalOpen(true);
  };

  const handleApplyEstimateToQuote = (estimateData) => {
    handleOpenQuoteModal(estimateData);
  };

  const handleSelectServiceForQuote = (serviceName) => {
    handleOpenQuoteModal({
      category: serviceName,
      budget: 'AED 1.5M - AED 5M',
      notes: `Proposal request initiated for: ${serviceName}`
    });
  };

  const handleInquireSimilarProject = (projectName) => {
    handleOpenQuoteModal({
      category: 'Building Contracting (G+1 Villa / Majlis)',
      notes: `Inquiry inspired by completed project: ${projectName}`
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E293B] flex flex-col selection:bg-[#7A2E16] selection:text-white font-sans antialiased">
      
      {/* Fixed Luxury Navigation */}
      <Navbar 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
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

        {/* Dubai Municipality Civic Contracts Showcase */}
        <MunicipalSection />

        {/* Interactive Dubai Villa & MEP Cost Estimator (AED 2024-2025 Rates) */}
        <CostEstimator 
          onApplyEstimateToQuote={handleApplyEstimateToQuote} 
        />

        {/* 2024-2025 Projects Portfolio (Completed Villas, Municipal, Active Sites) */}
        <Portfolio 
          onInquireSimilar={handleInquireSimilarProject} 
        />

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
      />

      {/* Interactive RFP / Proposal Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={quoteInitialData}
      />

      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 sm:hidden">
        <button
          onClick={() => {
            const el = document.getElementById('estimator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-white border border-[#E5DED3] text-[#7A2E16] flex items-center justify-center shadow-2xl active:scale-95 transition"
          title="AED Calculator"
        >
          <Calculator className="w-5 h-5" />
        </button>

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
          className="w-13 h-13 rounded-full bg-[#7A2E16] text-white flex items-center justify-center shadow-2xl font-black text-xs active:scale-95 transition"
          title="Call Kachoras"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
