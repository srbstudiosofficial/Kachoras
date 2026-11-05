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
  Wrench,
  Factory
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
    <section className="relative bg-[#FAF9F6] border-b border-[#E5DED3] pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
      
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
        
        {/* Full-Width Balanced Corporate Grid - Zero Empty Spaces across all devices */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Authority Header, Corporate Title, Credentials & Actions (7 Cols on desktop, 100% on mobile) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3.5 sm:space-y-4">
              
              {/* Verified License Badge - Fluid wrap on small screens */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-semibold tracking-wide shadow-2xs max-w-full">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate sm:whitespace-normal">
                  Dubai Municipality Approved Contractor • License #{COMPANY_INFO.licenseNumber}
                </span>
              </div>

              {/* Exact Legal Registered Arabic Name */}
              <div className="font-arabic text-base sm:text-lg lg:text-xl font-bold text-[#7A2E16] tracking-normal" dir="rtl">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
              </div>

              {/* Primary Corporate Title - Fluid responsive scaling */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#111622] font-display tracking-tight leading-[1.12]">
                Kachoras Electro-Mechanical <span className="text-[#7A2E16]">Contracting LLC</span>
              </h1>

              {/* Sub-headline / Corporate Positioning */}
              <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans max-w-2xl">
                20 years of structural and electromechanical precision across Dubai. Accredited for turnkey <strong>luxury G+1 residential villas</strong>, <strong>traditional majlis halls</strong>, <strong>high-capacity MEP engineering</strong>, and <strong>in-house architectural aluminium & glass fabrication</strong>.
              </p>
            </div>

            {/* Official Registration Data Strip - Responsive Stack on Mobile, 3-Col on Tablet/Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start p-2.5 sm:p-3 bg-white border border-[#E5DED3] rounded-xl shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">DM Registration</div>
                <div className="text-xs font-bold text-[#111622] font-mono">G+1 Approved</div>
              </div>

              <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start p-2.5 sm:p-3 bg-white border border-[#E5DED3] rounded-xl shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Established</div>
                <div className="text-xs font-bold text-[#7A2E16] font-mono">Dubai 2006 (20 Yrs)</div>
              </div>

              <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start p-2.5 sm:p-3 bg-white border border-[#E5DED3] rounded-xl shadow-2xs">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fabrication Facility</div>
                <div className="text-xs font-bold text-[#111622] font-mono">Al Qusais B-25</div>
              </div>
            </div>

            {/* Primary Calls to Action - Full width on small phones, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#7A2E16] hover:bg-[#63220E] transition shadow-md hover:shadow-lg cursor-pointer min-h-[44px] active:scale-98"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>

              <button
                onClick={handleExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-[#111622] bg-white border border-[#E5DED3] hover:border-[#7A2E16] hover:bg-[#FAF8F5] transition shadow-xs cursor-pointer min-h-[44px]"
              >
                <span>Our Disciplines</span>
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase text-[#7A2E16] bg-transparent hover:underline transition cursor-pointer min-h-[44px]"
              >
                <span>View Projects Directory</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </button>
            </div>

            {/* Credibility Counter Strip - Clean 3-Col Layout on all screens */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-[#E5DED3] text-left">
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#7A2E16] font-display">
                  <AnimatedCounter target={20} suffix="+" duration={1500} />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">Years in Dubai</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111622] font-display">
                  <AnimatedCounter target={450} suffix="+" duration={1800} />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">Completed Works</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-700 font-display">
                  <AnimatedCounter target={100} suffix="%" duration={1600} />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">DM & DEWA Compliance</div>
              </div>
            </div>

          </div>

          {/* Right Column: Fills the Space on Desktop, Acts as Executive Profile on Mobile (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="h-full bg-white border border-[#E5DED3] rounded-2xl p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-5 sm:space-y-6 relative overflow-hidden">
              
              {/* Subtle accent border at top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7A2E16] via-[#C59B27] to-[#7A2E16]" />

              <div className="space-y-3.5 sm:space-y-4">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B6D1B]">
                    Corporate Capabilities
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#E5DED3]">
                    Dubai • 2006–2026
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-bold text-[#111622] font-display">
                  Single-Contractor Turnkey Execution
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kachoras eliminates subcontracting friction by integrating civil construction, certified MEP engineering, and in-house architectural metal fabrication under one roof.
                </p>

                {/* 4 Core Pillars Checkmarks */}
                <div className="space-y-2 sm:space-y-2.5 pt-1">
                  <div className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#111622]">Turnkey G+1 Luxury Villas</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">Structural framing, foundation, AAC masonry & DM approvals</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#111622]">Certified MEP & DEWA Substation</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">Central ducted HVAC, MDB switchboards & statutory sign-offs</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#111622]">In-House Aluminium & Glass Workshop</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">Al Qusais B-25 facility for thermal-break curtain walls & doors</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DED3]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#111622]">Dubai Municipality Maintenance Contractor</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">Civic infrastructure, boundary walls & public health facilities</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Contact & Office Strip */}
              <div className="pt-3 sm:pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2 text-xs">
                <a 
                  href="tel:042390946"
                  className="inline-flex items-center gap-1.5 font-bold text-[#7A2E16] hover:text-[#63220E] transition py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Tel: 04-2390946</span>
                </a>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  Bin Sougat Bldg, Al Qusais
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
