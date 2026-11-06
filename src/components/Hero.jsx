import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Phone,
  Clock,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import AnimatedCounter from './AnimatedCounter';

export default function Hero({ onOpenQuoteModal, onNavigate }) {
  const handleExploreClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('services');
    } else {
      const el = document.getElementById('disciplines') || document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative text-white pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden min-h-[620px] flex flex-col justify-between">
      
      {/* 1. Full-Bleed High-Resolution Architectural Background Image (ECC Group & Syed Contracting Style) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('./assets/real-projects/completed-construction-shehab-423-1407-wide.jpg')`
        }}
      />

      {/* 2. Deep Cinematic Dark Luxury Gradient Overlay for Maximum Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/95 via-[#0B0F17]/88 to-[#0B0F17]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/40" />

      {/* 3. Subtle Classical Geometric Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#C59B27 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Corporate Authority, Title & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Authority Header & Verified License Badge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">Dubai Municipality Approved G+1 Contractor • License #{COMPANY_INFO.licenseNumber}</span>
              </div>

              {/* Exact Legal Registered Arabic Name */}
              <div className="font-arabic text-lg sm:text-xl font-bold text-[#E0A96D] tracking-normal" dir="rtl">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
              </div>

              {/* Primary English Corporate Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-[1.12]">
                Kachoras Electromechanical <span className="text-[#E0A96D]">Contracting LLC</span>
              </h1>

              {/* Sub-headline / Corporate Positioning */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. We are accredited to deliver complete turnkey solutions for <strong>G+1 residential and commercial Villas/Building</strong>, <strong>MEP</strong>, <strong>Aluminium and Glass</strong>, <strong>Kitchen cabinets</strong>, and <strong>Wardrobes</strong>.</p>
            </div>

            {/* Official Registration Data Strip (Glassmorphism) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">DM Registration</div>
                <div className="text-xs font-bold text-white font-mono">G+1 Approved</div>
              </div>

              <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Established</div>
                <div className="text-xs font-bold text-[#E0A96D] font-mono">Dubai 2006 (20 Yrs)</div>
              </div>

              <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start p-2.5 sm:p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</div>
                <div className="text-[11px] font-bold text-white font-mono truncate" title="B25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai">B25, Al Qusais Ind 1</div>
              </div>
            </div>

            {/* Primary Calls to Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg hover:shadow-xl cursor-pointer min-h-[44px] active:scale-98"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>

              <button
                onClick={handleExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition shadow-xs cursor-pointer min-h-[44px]"
              >
                <span>Our Disciplines</span>
              </button>
            </div>

          </div>

          {/* Right Column: Executive Capabilities Card (ECC Group Style, 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#121620]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#E0A96D]">
                  Capabilities Showcase
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  Dubai • 2006–2026
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-white font-display">
                Complete Turnkey Construction Services
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kachoras integrates civil construction, statutory Dubai Municipality permitting, certified MEP engineering, and in-house architectural glass fabrication under a single licensed organization.
              </p>

              {/* 4 Core Pillars */}
              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">G+1 Licensed Construction</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Complete construction services, from foundations to final handover of keys</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">MEP Works</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Electrical, plumbing, and air-conditioning (HVAC) works</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Aluminium & Glass Works</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass, and mirrors</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Dubai Municipality Works</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400">Civil maintenance, building renovation, and repair works</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <a 
                  href="tel:042390946"
                  className="inline-flex items-center gap-1.5 font-bold text-[#E0A96D] hover:text-white transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Tel: 04-2390946</span>
                </a>
                <span className="text-[10px] sm:text-[11px] text-slate-400">
                  Al Qusais Industrial 1
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Full-Width Credibility Metrics Bar (ECC Group Style) */}
      <div className="w-full bg-[#080C14]/85 backdrop-blur-md border-t border-white/10 py-5 px-4 sm:px-8 relative z-10 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
          
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#E0A96D] font-display">
              <AnimatedCounter target={20} suffix="+" duration={1500} />
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-medium leading-tight">
              Years in Dubai<br /><span className="text-slate-300 font-semibold">Since 2006</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              <AnimatedCounter target={500} suffix="+" duration={1800} />
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-medium leading-tight">
              Completed Works<br /><span className="text-slate-300 font-semibold">Across Dubai</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-display">
              <AnimatedCounter target={100} suffix="%" duration={1600} />
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-medium leading-tight">
              Statutory Compliance<br /><span className="text-slate-300 font-semibold">DM & DEWA</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="text-2xl sm:text-4xl font-extrabold text-[#C59B27] font-display">
              G+1
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-medium leading-tight">
              Building Contracting<br /><span className="text-slate-300 font-semibold">License #578964</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
