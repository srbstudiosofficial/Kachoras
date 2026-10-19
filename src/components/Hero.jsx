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
      
      {/* Ambient Warm Tonal Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#7A2E16]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full z-10">
        
        {/* Subtle Corporate Accreditation Marker */}
        <div className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DED3] text-xs text-slate-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="text-[#7A2E16] font-bold text-[11px] tracking-wide">
            Dubai Municipality Approved G+1 Contractor
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 text-[11px] font-medium">Commercial License No. 578964</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8B6D1B] block">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م • Est. 2006
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#14171F] font-display leading-[1.12]">
                Precision Building & Electromechanical Contracting in Dubai
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed pt-1">
                For over two decades, <strong>Kachoras Electromechanical Contracting LLC</strong> has delivered bespoke luxury G+1 villas, traditional Arabian majlis pavilions, municipal civic landmarks, and MEP infrastructure built to the highest statutory standards.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-7 py-3.5 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Submit Tender / RFP</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#portfolio"
                className="px-6 py-3.5 bg-white hover:bg-[#F4EFE6] text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-[#E5DED3] transition flex items-center gap-2"
              >
                <span>View Portfolio</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#7A2E16] px-3 py-2 transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Distinguished Institutional Metrics */}
            <div className="pt-4 border-t border-[#E5DED3] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold text-[#14171F] font-display">20+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years in Dubai</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#7A2E16] font-display">G+1</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">DM License Grade</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#14171F] font-display">380+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Completed Works</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-700 font-display">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">DEWA Compliance</div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Architectural Project Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#E5DED3] p-3 shadow-luxury space-y-3">
              
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
