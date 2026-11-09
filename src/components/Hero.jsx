import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  PhoneCall,
  Sparkles,
  MapPin,
  FileCheck2,
  HardHat,
  Cpu,
  Hammer
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { useLanguage } from '../core/LanguageContext';

export default function Hero({ onNavigate, onOpenQuoteModal }) {
  const { language, t, isRTL } = useLanguage();

  const handleProposalClick = () => {
    if (onOpenQuoteModal) onOpenQuoteModal();
  };

  const handleExploreClick = () => {
    if (onNavigate) onNavigate('disciplines');
  };

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 bg-white border-b border-slate-200">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Main Hero Split Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column (6 Cols): Official Corporate Presentation */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#B3261E]" />
              <span>Location: Al Qusais Ind 1, Dubai</span>
            </div>

            {/* Arabic Legal Headline */}
            <div className="space-y-1">
              <span className="text-sm sm:text-base md:text-lg font-bold text-[#8F351A] font-arabic block dir-rtl leading-relaxed">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15]">
                Kachoras Electromechanical Contracting LLC
              </h1>
            </div>

            {/* Turnkey Tagline */}
            <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-900">
                COMPLETE TURNKEY CONSTRUCTION SERVICES
              </span>
            </div>

            {/* Corporate Summary Paragraph (Client Approved Text) */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans max-w-xl">
              {language === 'ar' ? (
                'مع 20 عاماً من الخبرة في دبي، نحن متخصصون في أعمال البناء والأعمال الكهروميكانيكية. نحن معتمدون لتقديم حلول متكاملة على المفتاح للفلل والمباني السكنية والتجارية (أرضي + أول G+1)، وأعمال الكهروميكانيك (MEP)، والألمنيوم والزجاج، وخزائن المطابخ وغرف الملابس.'
              ) : (
                'With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. We are accredited to deliver complete turnkey solutions for G+1 residential and commercial Villas/Building, MEP, Aluminium and Glass, Kitchen cabinets, and Wardrobes.'
              )}
            </p>

            {/* 4 Discipline Pills (Standardized per Client PDF) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B3261E] shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Building Construction</span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">MEP</span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Aluminum and Glass</span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">General Maintenance</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={handleProposalClick}
                className="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>REQUEST PROJECT PROPOSAL</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>

              <button
                type="button"
                onClick={handleExploreClick}
                className="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OUR DISCIPLINES</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

          </div>

          {/* Right Column (6 Cols): 2x2 Photo Grid (Selected by Client) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-slate-100 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl">
              
              {/* Quadrant 1: Building Construction */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/villa.jpg" 
                  alt="Building Construction" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Civil & RCC</span>
                    <span className="text-xs font-bold">Building Construction</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 2: MEP */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/mep.jpg" 
                  alt="MEP" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">HVAC, Electrical & Plumbing</span>
                    <span className="text-xs font-bold">MEP</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 3: Aluminum & Glass (Client Uploaded Modern Gate Photo) */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/aluminium.jpg" 
                  alt="Aluminum & Glass" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 block">Al Qusais Facility</span>
                    <span className="text-xs font-bold">Aluminum & Glass</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 4: General Maintenance (Client Uploaded Beige Villa Entrance Photo) */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/civic.jpg" 
                  alt="General Maintenance" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Fit-out & Renovation</span>
                    <span className="text-xs font-bold">General Maintenance</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Corporate Metrics Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#B3261E] font-display block">20+</span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider block mt-1">
              Years in Dubai (Since 2006)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#B3261E] font-display block">500+</span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider block mt-1">
              Completed Works Across Dubai
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-display block">100%</span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider block mt-1">
              Statutory Compliance (DM & DEWA)
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#B3261E] font-display block">G+1</span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider block mt-1">
              Building Contracting License (#578964)
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
