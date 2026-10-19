import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Phone,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import ArchitecturalVisual from './ArchitecturalVisual';
import AnimatedCounter from './AnimatedCounter';

const FEATURED_PROJECTS = [
  {
    id: 'villa',
    title: 'Contemporary Luxury G+1 Villa',
    location: 'Wadi Al Shabak, Dubai',
    plotNo: '4317233',
    bua: '8,400 sq.ft',
    consultant: 'Croquis Engineering',
    discipline: 'Turnkey Civil & MEP'
  },
  {
    id: 'majlis',
    title: 'Royal Arabian Majlis Pavilion',
    location: 'Umm Al Sheif, Dubai',
    plotNo: '3670958',
    bua: '4,200 sq.ft',
    consultant: 'Approved Field Execution',
    discipline: 'Bespoke Traditional Works'
  },
  {
    id: 'civic',
    title: 'Dubai Municipality Civic Facility',
    location: 'Hatta / Dubai Municipality',
    plotNo: '8912682',
    bua: '12,500 sq.ft',
    consultant: 'Dubai Municipality General Maintenance',
    discipline: 'Government Civic Infrastructure'
  }
];

export default function Hero({ onOpenQuoteModal }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const activeProj = FEATURED_PROJECTS[activeProjectIdx];

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#FAF9F6]">
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-architect-grid opacity-50 pointer-events-none" />
      
      {/* Ambient Warm Tonal Accents with Pulse Glow Animations */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#C59B27]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#7A2E16]/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full z-10">
        
        {/* Corporate Accreditation Marker with Radar Pulse */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DED3] text-xs text-slate-700 shadow-sm max-w-full animate-fade-in-down hover:border-[#7A2E16] transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-[#7A2E16] font-bold text-[10px] sm:text-[11px] tracking-wide">
            Dubai Municipality Approved G+1 Contractor
          </span>
          <span className="text-slate-300 hidden xs:inline-block">|</span>
          <span className="text-slate-600 text-[10px] sm:text-[11px] font-medium">Commercial License No. 578964</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 animate-fade-in-up">
            
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold text-[#8B6D1B] block animate-fade-in-up delay-100">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م • Est. 2006
              </span>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#14171F] font-display leading-[1.14] animate-fade-in-up delay-200">
                Precision Building & Electromechanical Contracting in Dubai
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed pt-1 animate-fade-in-up delay-300">
                For over two decades, <strong>Kachoras Electromechanical Contracting LLC</strong> has delivered bespoke luxury G+1 villas, traditional Arabian majlis pavilions, municipal civic landmarks, and MEP infrastructure built to the highest statutory standards.
              </p>
            </div>

            {/* CTAs with Shimmer Animation */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 animate-fade-in-up delay-400">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 sm:px-7 py-3.5 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-xl transition flex items-center justify-center gap-2.5 group cursor-pointer w-full sm:w-auto min-h-[46px] active:scale-95 shimmer-trigger hover:-translate-y-0.5"
              >
                <span>Submit Tender / RFP</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27] group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 bg-white hover:bg-[#F4EFE6] text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-[#E5DED3] hover:border-[#7A2E16] transition flex items-center justify-center gap-2 w-full sm:w-auto min-h-[46px] text-center active:scale-95 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Explore Disciplines</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#7A2E16] px-3 py-2 transition min-h-[40px] hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B27] animate-bounce" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Distinguished Institutional Metrics with Dynamic Roll-Up Counters */}
            <div className="pt-4 border-t border-[#E5DED3] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left animate-fade-in-up delay-500">
              <div className="p-2.5 rounded-xl hover:bg-white/60 transition">
                <div className="text-2xl sm:text-3xl font-bold text-[#14171F] font-display">
                  <AnimatedCounter target={20} suffix="+" duration={1800} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years in Dubai</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/60 transition">
                <div className="text-2xl sm:text-3xl font-bold text-[#7A2E16] font-display">G+1</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">DM License Grade</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/60 transition">
                <div className="text-2xl sm:text-3xl font-bold text-[#14171F] font-display">
                  <AnimatedCounter target={380} suffix="+" duration={2000} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Completed Works</div>
              </div>
              <div className="p-2.5 rounded-xl hover:bg-white/60 transition">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-display">
                  <AnimatedCounter target={100} suffix="%" duration={1600} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">DEWA Compliance</div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Architectural Project Showcase with Floating Motion */}
          <div className="lg:col-span-5 animate-fade-in-right delay-200">
            <div className="bg-white rounded-2xl border border-[#E5DED3] p-3 shadow-luxury space-y-3 animate-float-smooth hover:shadow-2xl transition-all relative group">
              
              {/* Floating Architectural 2006-2026 Stamp Badge */}
              <div className="absolute -top-3 -right-3 z-30 bg-[#14171F] text-amber-300 border-2 border-[#C59B27] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest shadow-xl flex items-center gap-1.5 animate-pulse-glow">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>2006 – 2026</span>
              </div>
              
              {/* Media Visual Container */}
              <div className="h-72 sm:h-80 rounded-xl overflow-hidden relative">
                <ArchitecturalVisual 
                  type={activeProj.id}
                  plotNo={activeProj.plotNo}
                  location={activeProj.location}
                  className="w-full h-full"
                />
              </div>

              {/* Specification Card */}
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#14171F] font-display">
                      {activeProj.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C59B27]" />
                      <span>{activeProj.location}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2E16] bg-[#7A2E16]/10 px-2 py-0.5 rounded">
                    {activeProj.discipline}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EAE3D6] grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">BUA Area</span>
                    <strong className="text-slate-800 font-semibold">{activeProj.bua}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">Plot Number</span>
                    <strong className="text-slate-800 font-mono font-semibold">{activeProj.plotNo}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium">Consultant</span>
                    <strong className="text-slate-800 font-semibold truncate block">{activeProj.consultant}</strong>
                  </div>
                </div>
              </div>

              {/* Clean Selector Pills */}
              <div className="flex items-center gap-1.5 pt-1 px-1">
                {FEATURED_PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition text-center truncate ${
                      idx === activeProjectIdx
                        ? 'bg-[#7A2E16] text-white font-semibold'
                        : 'bg-[#F2ECE1] text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p.id === 'villa' ? 'Private Villa' : p.id === 'majlis' ? 'Royal Majlis' : 'Civic Facility'}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
