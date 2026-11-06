import React from 'react';
import Hero from '../components/Hero';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Hammer, 
  ArrowRight, 
  CheckCircle2, 
  MapPin,
  Sparkles,
  Phone,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function HomePage({ onNavigate, onOpenQuoteModal }) {
  const coreDivisions = [
    {
      number: '01',
      title: 'G+1 Licensed Construction',
      subtitle: 'Complete Turnkey Construction Services',
      desc: 'Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality regulations and engineering standards.',
      image: './assets/real-projects/completed-construction-albannay-424-7036.jpg'
    },
    {
      number: '02',
      title: 'MEP Works & Engineering',
      subtitle: 'HVAC, Electrical & Plumbing Engineering',
      desc: 'Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning. Approved subcontractor for leading AC brands including Carrier, O General, Trane, Daikin, and Super General.',
      image: './assets/mep.jpg'
    },
    {
      number: '03',
      title: 'Aluminium & Glass Works',
      subtitle: 'Manufacturing & Installation',
      desc: 'Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass and mirrors fabricated at our dedicated Al Qusais facility.',
      image: './assets/real-projects/completed-aluminum-flag-villa.jpg'
    },
    {
      number: '04',
      title: 'Civil Maintenance & Fit-out Works',
      subtitle: 'Approved Municipality, MBRHE & EIB Contractor',
      desc: 'Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB, providing building maintenance, renovation, and interior finishing services including decorative gypsum ceilings, custom kitchen cabinets, wardrobes, and general building maintenance.',
      image: './assets/real-projects/completed-maintenance-basaeed-422-1513.jpg'
    }
  ];

  // 3 Curated Landmark Projects (ECC Group & Syed Contracting Style)
  const landmarkProjects = [
    {
      id: 'LM-1',
      title: 'Classical Luxury G+1 Villa & Outbuilding',
      discipline: 'Luxury G+1 Villa',
      location: 'Al Warqaa Fourth, Dubai',
      plotNo: '424-7036',
      consultant: 'Al Manhal Engineering Consultants',
      image: './assets/real-projects/completed-construction-albannay-424-7036.jpg',
      scope: 'Turnkey private residence featuring fluted classical columns, perimeter compound wall, and integrated MEP infrastructure.'
    },
    {
      id: 'LM-2',
      title: 'Architectural Curtain Wall & Glass Facade',
      discipline: 'Aluminium & Glazing',
      location: 'Dubai Residential Sector',
      plotNo: 'In-House Fabrication',
      consultant: '',
      image: './assets/real-projects/completed-aluminum-flag-villa.jpg',
      scope: 'Thermal-break structural aluminium curtain walling with double-glazed insulated units and entrance canopy.'
    },
    {
      id: 'LM-3',
      title: 'Royal Arabian Majlis Hall & Compound Wall',
      discipline: 'Majlis & Traditional',
      location: 'Al Barsha Second, Dubai',
      plotNo: '376-1176',
      consultant: 'Dubai Municipality Approved',
      image: './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg',
      scope: 'Traditional Arabian majlis hall, decorative gypsum cornices, boundary wall plaster restoration, and climate control.'
    }
  ];

  const consultantPartners = [
    { name: "Al Manhal Engineering Consultants", role: "Villa Architecture & Civil Supervision", discipline: "Residential G+1" },
    { name: "Al Majal Engineering Consultants", role: "Structural & MEP Review", discipline: "Turnkey Contracting" },
    { name: "Croquis Engineering Consultants", role: "Residential G+1 Civil Design", discipline: "Civil Engineering" },
    { name: "Arkiplan Consulting Architects", role: "Architectural Planning & Authority Submissions", discipline: "Statutory Permitting" },
    { name: "Teamwork Engineering Consultants", role: "Authority Permitting & Structural Engineering", discipline: "Majlis & Structural Works" },
    { name: "Gulf Engineering Consultants", role: "MEP Infrastructure & DEWA Substation", discipline: "MEP Infrastructure" }
  ];

  return (
    <div className="space-y-0 text-slate-800">
      
      {/* 1. Full-Bleed Architectural Hero Section (ECC Group & Syed Contracting Style) */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} onNavigate={onNavigate} />

      {/* 2. Core Contracting Disciplines with Authentic Photography (Like ECC Group's "Our Businesses") */}
      <section id="disciplines" className="py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DED3] pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
                In-House Engineering Disciplines
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111622] font-display">
                Single-Contractor Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Turnkey civil construction, certified MEP engineering, and architectural fabrication under one licensed Dubai contractor.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A2E16] hover:text-[#63220E] transition py-3 px-6 rounded-xl border border-[#7A2E16]/30 hover:border-[#7A2E16] bg-white shadow-xs cursor-pointer shrink-0 min-h-[44px]"
            >
              <span>View Full Technical Specifications</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>

          {/* 4 Division Visual Cards (With Authentic Construction Photography) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreDivisions.map((div, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E5DED3] rounded-2xl overflow-hidden shadow-xs hover:border-[#7A2E16] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Image Header */}
                <div className="h-48 sm:h-56 relative overflow-hidden bg-slate-900">
                  <img 
                    src={div.image} 
                    alt={div.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                  
                  {/* Discipline Number & Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {div.number} / DISCIPLINE
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-[#E0A96D] uppercase tracking-wider block">
                      {div.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
                      {div.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {div.desc}
                  </p>

                  <div className="pt-3 border-t border-[#F0EBE1] space-y-3">
                    <div className="text-[11px] font-mono text-slate-500 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5DED3] break-words">
                      {div.specs || null}
                    </div>
                    <button
                      onClick={() => onNavigate('services')}
                      className="text-xs font-bold text-[#7A2E16] hover:underline flex items-center gap-1.5 cursor-pointer py-1"
                    >
                      <span>Inspect Scope of Work</span>
                      <ArrowRight className="w-3 h-3 text-[#7A2E16]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Landmark Delivered Works Showcase (ECC Group & Syed Contracting Style) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DED3] pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
                Delivered Engineering Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111622] font-display">
                Featured Landmark Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Representative works executed under direct Dubai Municipality supervision and handover certification.
              </p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A2E16] hover:text-[#63220E] transition py-3 px-6 rounded-xl border border-[#7A2E16]/30 hover:border-[#7A2E16] bg-[#FAF8F5] shadow-xs cursor-pointer shrink-0 min-h-[44px]"
            >
              <span>Explore All 20 Verified Works</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>

          {/* 3 Photographic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {landmarkProjects.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('projects')}
                className="bg-[#FAF9F6] border border-[#E5DED3] rounded-2xl overflow-hidden shadow-xs hover:border-[#7A2E16] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Visual Image */}
                <div className="h-56 sm:h-64 relative overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Discipline Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold text-white bg-[#111622]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {item.discipline}
                    </span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold font-display text-[#111622] leading-snug group-hover:text-[#7A2E16] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                      {item.scope}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-bold text-[#7A2E16]">
                    <span>View Handover Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Approved Consultant Engineering Partners */}
      <section className="py-14 sm:py-20 bg-[#FAF9F6] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
              Consultant Engineering Network
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#111622] font-display">
              Approved Engineering Collaborations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We collaborate with premier Dubai consulting firms for statutory authority submissions, structural calculations, and building completion certificates (BCC).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {consultantPartners.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DED3] space-y-1.5 hover:border-[#7A2E16] transition shadow-xs"
              >
                <div className="text-[10px] font-mono text-amber-700 uppercase font-semibold">
                  {item.discipline}
                </div>
                <h3 className="text-sm font-bold text-[#14171F] font-display">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Portfolio Directory Gateway */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#FAF9F6] rounded-3xl border border-[#E5DED3] p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B] block">
                Track Record & Executed Portfolio
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#111622] font-display leading-tight">
                Explore Our Complete Projects Directory & Handover Sheets
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                Comprehensive project specifications, statutory Dubai Municipality records, structural scopes, and photographic handover documentation have been organized on our dedicated portfolio page.
              </p>
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E5DED3] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  20 Handed Over Projects
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E5DED3] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6D1B] shrink-0" />
                  4 Core Disciplines
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E5DED3] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7A2E16] shrink-0" />
                  Dedicated Handover Sheets
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#7A2E16] hover:bg-[#63220E] transition py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xs hover:shadow-md cursor-pointer shrink-0 min-h-[44px]"
            >
              <span>View Projects Directory</span>
              <ArrowRight className="w-4 h-4 text-[#C59B27]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
