import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Phone,
  Clock,
  Sparkles,
  Award,
  Layers
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

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Centered Authority Header & Verified License Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide shadow-2xs mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Dubai Municipality Approved Contractor • Commercial License #{COMPANY_INFO.licenseNumber}</span>
        </div>

        {/* Exact Legal Registered Arabic Name */}
        <div className="font-arabic text-xl sm:text-2xl font-bold text-[#7A2E16] tracking-normal mb-3" dir="rtl">
          كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
        </div>

        {/* Primary English Corporate Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111622] font-display tracking-tight leading-[1.1] mb-6">
          Kachoras Electro-Mechanical <span className="text-[#7A2E16]">Contracting LLC</span>
        </h1>

        {/* Sub-headline / Corporate Positioning */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-3xl mx-auto mb-8">
          20 years of structural and electromechanical precision across the Emirate of Dubai. Accredited for turnkey <strong>luxury G+1 residential villas</strong>, <strong>traditional majlis halls</strong>, <strong>high-capacity MEP engineering</strong>, and <strong>in-house architectural aluminium and glass fabrication</strong>.
        </p>

        {/* Official Registration Data Strip (Centered) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
          <div className="p-3.5 bg-white border border-[#E5DED3] rounded-xl shadow-2xs space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">DM Registration</div>
            <div className="text-xs font-bold text-[#111622] font-mono">G+1 Approved</div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5DED3] rounded-xl shadow-2xs space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Established</div>
            <div className="text-xs font-bold text-[#7A2E16] font-mono">Dubai 2006 (20 Yrs)</div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5DED3] rounded-xl shadow-2xs space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fabrication Facility</div>
            <div className="text-xs font-bold text-[#111622] font-mono">Al Qusais B-25</div>
          </div>
        </div>

        {/* Primary Calls to Action (Centered) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-white bg-[#7A2E16] hover:bg-[#63220E] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Request Project Proposal</span>
            <ArrowRight className="w-4 h-4 text-[#C59B27]" />
          </button>

          <button
            onClick={handleExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-[#111622] bg-white border border-[#E5DED3] hover:border-[#7A2E16] hover:bg-[#FAF8F5] transition shadow-xs cursor-pointer"
          >
            <span>Our Disciplines</span>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wider uppercase text-[#7A2E16] bg-transparent hover:underline transition cursor-pointer"
          >
            <span>View Projects Directory</span>
            <ArrowRight className="w-4 h-4 text-[#C59B27]" />
          </button>
        </div>

        {/* Credibility Counter Strip (Centered 3 columns) */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5DED3] max-w-2xl mx-auto">
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#7A2E16] font-display">
              <AnimatedCounter target={20} suffix="+" duration={1500} />
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Years in Dubai</div>
          </div>

          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#111622] font-display">
              <AnimatedCounter target={450} suffix="+" duration={1800} />
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Completed Works</div>
          </div>

          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700 font-display">
              <AnimatedCounter target={100} suffix="%" duration={1600} />
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">DM & DEWA Compliance</div>
          </div>
        </div>

      </div>
    </section>
  );
}
