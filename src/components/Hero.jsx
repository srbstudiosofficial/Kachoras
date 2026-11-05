import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Phone,
  Clock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import ArchitecturalVisual from './ArchitecturalVisual';
import AnimatedCounter from './AnimatedCounter';

const FEATURED_DISCIPLINES = [
  {
    id: 'albannay',
    label: 'Luxury G+1 Villas',
    image: './assets/real-projects/completed-construction-albannay-424-7036.jpg'
  },
  {
    id: 'alabdulla',
    label: 'Majlis Pavilions',
    image: './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg'
  },
  {
    id: 'facade',
    label: 'Aluminium & Glazing',
    image: './assets/real-projects/completed-aluminum-flag-villa.jpg'
  }
];

export default function Hero({ onOpenQuoteModal, onNavigate }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDiscipline = FEATURED_DISCIPLINES[activeIdx];

  const handleExploreClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('services');
    } else {
      const el = document.getElementById('disciplines') || document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#FAF9F6] border-b border-[#E5DED3] pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      
      {/* Subtle Classical Geometric Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1E293B 1px, transparent 1px), radial-gradient(#7A2E16 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Firm Title, Regulatory License & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Top Authority Header & Verified License Badge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dubai Municipality Approved Contractor • Commercial License #{COMPANY_INFO.licenseNumber}</span>
              </div>

              {/* Exact Legal Registered Arabic Name */}
              <div className="font-arabic text-lg sm:text-xl font-bold text-[#7A2E16] tracking-normal pt-1" dir="rtl">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
              </div>

              {/* Primary English Corporate Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111622] font-display tracking-tight leading-[1.08]">
                Kachoras Electro-Mechanical <span className="text-[#7A2E16]">Contracting LLC</span>
              </h1>
            </div>

            {/* Sub-headline / Corporate Positioning */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-2xl">
              20 years of structural and electromechanical precision across the Emirate of Dubai. Accredited for turnkey <strong>luxury G+1 residential villas</strong>, <strong>traditional majlis halls</strong>, <strong>high-capacity MEP engineering</strong>, and <strong>in-house architectural aluminium and glass fabrication</strong>.
            </p>

            {/* Official Registration Data Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white border border-[#E5DED3] rounded-xl shadow-2xs space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">DM Registration</div>
                <div className="text-xs font-bold text-[#111622] font-mono">G+1 Approved</div>
              </div>

              <div className="p-3 bg-white border border-[#E5DED3] rounded-xl shadow-2xs space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Established</div>
                <div className="text-xs font-bold text-[#7A2E16] font-mono">Dubai 2006 (20 Yrs)</div>
              </div>

              <div className="p-3 bg-white border border-[#E5DED3] rounded-xl shadow-2xs space-y-0.5 col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Fabrication Facility</div>
                <div className="text-xs font-bold text-[#111622] font-mono">Al Qusais B-25</div>
              </div>
            </div>

            {/* Primary Calls to Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-white bg-[#7A2E16] hover:bg-[#63220E] transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>

              <button
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-[#111622] bg-white border border-[#E5DED3] hover:border-[#7A2E16] hover:bg-[#FAF8F5] transition shadow-xs cursor-pointer"
              >
                <span>Explore Capabilities</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-[#7A2E16] bg-transparent hover:underline transition cursor-pointer"
              >
                <span>View Projects Directory</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>
            </div>

            {/* Credibility Counter Strip */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E5DED3]">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#7A2E16] font-display">
                  <AnimatedCounter target={20} suffix="+" duration={1500} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years in Dubai</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111622] font-display">
                  <AnimatedCounter target={450} suffix="+" duration={1800} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Completed Works</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display">
                  <AnimatedCounter target={100} suffix="%" duration={1600} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">DM and DEWA Compliance</div>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Visual Showcase (Clean, No Project Details) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#E5DED3] p-3 shadow-md space-y-3 relative">
              
              {/* Year Stamp Badge */}
              <div className="absolute -top-3 right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E5DED3] text-slate-600 px-3 py-0.5 rounded-full text-[10px] font-mono font-medium shadow-xs flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-700" />
                <span>2006 – 2026</span>
              </div>

              {/* Media Visual Container */}
              <div className="h-72 sm:h-80 lg:h-96 xl:h-[420px] rounded-xl overflow-hidden relative bg-[#14171F]">
                <ArchitecturalVisual 
                  type={activeDiscipline.id}
                  plotNo=""
                  location="Dubai, UAE"
                  image={activeDiscipline.image}
                  className="w-full h-full"
                />
              </div>

              {/* Discipline Switcher Tabs */}
              <div className="flex items-center gap-2 pt-1">
                {FEATURED_DISCIPLINES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-xs transition text-center truncate cursor-pointer ${
                      idx === activeIdx
                        ? 'bg-[#7A2E16] text-white font-bold shadow-xs'
                        : 'bg-[#F2ECE1] text-[#475569] hover:bg-[#EAE2D3] font-medium'
                    }`}
                  >
                    {p.label}
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
