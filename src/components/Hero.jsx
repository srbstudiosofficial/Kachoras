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

const FEATURED_PROJECTS = [
  {
    id: 'albannay',
    label: 'G+1 Luxury Villa',
    title: 'G+1 Classical Villa & Service Block',
    location: 'Al Warqaa Fourth, Dubai',
    plotNo: '424-7036',
    bua: '9,200 sq.ft',
    consultant: 'Al Manhal Engineering Consultants',
    discipline: 'G+1 CIVIL & MEP',
    image: './assets/real-projects/completed-construction-albannay-424-7036.jpg'
  },
  {
    id: 'alabdulla',
    label: 'Luxury Majlis',
    title: 'Traditional Majlis & Architectural Glazing',
    location: 'Al Barsha Second, Dubai',
    plotNo: '376-1176',
    bua: '3,800 sq.ft',
    consultant: 'Teamwork Engineering Consultants',
    discipline: 'CIVIL & TRADITIONAL WORKS',
    image: './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg'
  },
  {
    id: 'facade',
    label: 'Curtain Wall Facade',
    title: 'Architectural Glazing & Structural Facade',
    location: 'Dubai Residential Sector',
    plotNo: 'DM Registered Plot',
    bua: 'Thermal-Break',
    consultant: 'In-House Al Qusais Fabrication',
    discipline: 'ALUMINIUM & GLASS',
    image: './assets/real-projects/completed-aluminum-flag-villa.jpg'
  }
];

export default function Hero({ onOpenQuoteModal, onNavigate }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const activeProj = FEATURED_PROJECTS[activeProjectIdx];

  const handleExploreClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('services');
    } else {
      const el = document.getElementById('disciplines') || document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[82vh] lg:min-h-[86vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#FAF9F6] border-b border-[#E5DED3]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full z-10">
        
        {/* Accreditation Marker */}
        <div className="mb-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DED3] text-xs text-slate-700 shadow-xs max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
          <span className="text-[#7A2E16] font-bold text-[11px] sm:text-xs tracking-wide">
            Dubai Municipality Approved G+1 Contractor
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 text-[11px] sm:text-xs font-mono font-medium">Commercial License No. 578964</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Official Identity & Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3.5">
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#8B6D1B] block font-mono">
                كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م • EST. 2006
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-bold tracking-tight text-[#111622] font-display leading-[1.12]">
                Kachoras Electro-Mechanical Contracting LLC
              </h1>

              <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-sans pt-1">
                <p>
                  With over two decades of industry experience, We have built a strong reputation for delivering high-quality luxury G+1 villas, electromechanical (MEP) services, DM-approved general maintenance and construction works in accordance with applicable industry standards and project specifications.
                </p>
                <p>
                  We are committed to excellence in every project, combining technical expertise, skilled workmanship, rigorous safety practices, and professional project management to deliver reliable, efficient, and lasting solutions that exceed client expectations.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
                className="px-6 py-3.5 bg-[#7A2E16] hover:bg-[#63220E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>ENQUIRY / RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleExploreClick}
                className="px-6 py-3.5 bg-white hover:bg-[#F2ECE1] text-[#14171F] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#D9D0C3] transition cursor-pointer"
              >
                <span>EXPLORE DISCIPLINES</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-4 py-3.5 text-xs text-slate-700 hover:text-[#7A2E16] font-semibold flex items-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-[#C59B27]" />
                <span className="font-mono">{COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#111622] font-display">
                  <AnimatedCounter target={20} suffix="+" duration={1800} />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years in Dubai</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#7A2E16] font-display">G+1</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">DM License Grade</div>
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

          {/* Right Column: Real Client Project Showcase (Real photo of Albannay Classical Villa) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#E5DED3] p-3 shadow-md space-y-3 relative">
              
              {/* Year Stamp Badge */}
              <div className="absolute -top-3 right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E5DED3] text-slate-600 px-3 py-0.5 rounded-full text-[10px] font-mono font-medium shadow-xs flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-700" />
                <span>2006 – 2026</span>
              </div>

              {/* Media Visual Container */}
              <div className="h-64 sm:h-72 lg:h-76 xl:h-80 rounded-xl overflow-hidden relative bg-[#14171F]">
                <ArchitecturalVisual 
                  type={activeProj.id}
                  plotNo={activeProj.plotNo}
                  location={activeProj.location}
                  image={activeProj.image}
                  className="w-full h-full"
                />
              </div>

              {/* Technical Specification Card */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#14171F] font-display">
                      {activeProj.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>{activeProj.location}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E3E20] bg-[#F7EBE8] border border-[#F0D5CE] px-2.5 py-0.5 rounded-full shrink-0">
                    {activeProj.discipline}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#EAE3D6] grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium uppercase">BUA Area</span>
                    <strong className="text-slate-800 font-semibold">{activeProj.bua}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium uppercase">Plot Number</span>
                    <strong className="text-slate-800 font-mono font-semibold">{activeProj.plotNo}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-medium uppercase">Consultant</span>
                    <strong className="text-slate-800 font-semibold truncate block" title={activeProj.consultant}>
                      {activeProj.consultant}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Project Selector Tabs */}
              <div className="flex items-center gap-1.5 pt-1">
                {FEATURED_PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`flex-1 py-2 px-2 rounded-lg text-[11px] transition text-center truncate cursor-pointer ${
                      idx === activeProjectIdx
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
