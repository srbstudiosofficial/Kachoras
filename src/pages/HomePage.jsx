import React from 'react';
import Hero from '../components/Hero';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Hammer, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  MapPin, 
  Phone,
  Award,
  Layers
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import SafeImage from '../components/SafeImage';

export default function HomePage({ onNavigate, onOpenQuoteModal }) {
  // Handpicked premier landmark highlights from client records
  const featuredHighlights = [
    {
      id: 'ALBANNAY',
      title: 'Construction of G+1 Villa + Service Block + Compound Wall',
      location: 'Al Warqaa Fourth, Dubai',
      plotNo: '424-7036',
      client: 'Mariam Hussain Redha Hassan Albannay',
      consultant: 'Al Manhal Engineering Consultants',
      type: 'G+1 Classical Villa',
      status: 'Completed & Handed Over',
      image: './assets/real-projects/completed-construction-albannay-424-7036.jpg'
    },
    {
      id: 'SHEHAB',
      title: 'Construction of G+1 Villa + Service Block & Compound Wall',
      location: 'Al Warqaa Third, Dubai',
      plotNo: '423-1407',
      client: 'Abdul Raouf Siraj Shehab Ahmad Mohammad',
      consultant: 'Al Majal Engineering Consultants',
      type: 'G+1 Luxury Villa',
      status: 'Completed & Handed Over',
      image: './assets/real-projects/completed-construction-shehab-423-1407.jpg'
    },
    {
      id: 'ALUM-FLAG',
      title: 'Architectural Curtain Wall & Structural Glass Facade',
      location: 'Dubai Residential Sector',
      plotNo: 'DM Registered Plot',
      client: 'Private Luxury Residence',
      consultant: 'Architectural Glazing Consultants',
      type: 'Aluminium & Curtain Wall',
      status: 'Completed & Handed Over',
      image: './assets/real-projects/completed-aluminum-flag-villa.jpg'
    }
  ];

  const coreDivisions = [
    {
      number: '01',
      title: 'Building Contracting (G+1)',
      subtitle: 'Civil Structure, Villas & Majlis',
      desc: 'Full structural authority for ground plus one private villas, royal majlis halls, service quarters, and heavy raft foundation substructures under direct Dubai Municipality engineering supervision.',
      specs: 'Raft Foundations • Post-Tensioned Slabs • Thermal AAC Blockwork • Boundary Walls'
    },
    {
      number: '02',
      title: 'MEP Works & Engineering',
      subtitle: 'HVAC, Electrical & Specialized Utilities',
      desc: 'Complete in-house mechanical, electrical, and plumbing engineering. Authorized for DEWA substation coordination, high-capacity MDB switchgear, central ducted split & VRF air-conditioning networks.',
      specs: 'DEWA Substation Approvals • Central Ducted Split & VRF • Single Line Diagrams • DCD Fire Code'
    },
    {
      number: '03',
      title: 'Aluminium & Glass Fabrication',
      subtitle: 'Dedicated Al Qusais In-House Workshop',
      desc: 'Direct fabrication at our Bin Sougat B-25 facility. Engineering high-specification thermal-break aluminium profiles, double-glazed curtain walls, panoramic sliding doors, and structural glass balustrades.',
      specs: 'Thermal-Break Facades • Double-Glazed IGU • Frameless Balustrades • In-House Powder Coating'
    },
    {
      number: '04',
      title: 'Civil Maintenance & Fitout',
      subtitle: 'Dubai Municipality Approved Contractor',
      desc: 'Approved contractor for Dubai Municipality General Maintenance Department. Specialized in decorative false gypsum ceilings, classical Arabian majlis cornices, custom luxury cabinetry, and preventative facility care.',
      specs: 'Dubai Municipality Civic Contracts • Bespoke Plaster Cornices • Luxury Cabinetry • 24/7 Facility Care'
    }
  ];

  const consultantPartners = [
    { name: "Al Manhal Engineering Consultants", role: "Villa Architecture & Civil Supervision", plot: "Plot 424-7036" },
    { name: "Al Majal Engineering Consultants", role: "Structural & MEP Review", plot: "Plot 423-1407" },
    { name: "Croquis Engineering Consultants", role: "Residential G+1 Civil Design", plot: "Plot 431-7233" },
    { name: "Arkiplan Consulting Architects", role: "Architectural Planning & Authority Submissions", plot: "Plot 423-19966" },
    { name: "Teamwork Engineering Consultants", role: "Authority Permitting & Structural Engineering", plot: "Plot 376-1176" },
    { name: "Gulf Engineering Consultants", role: "MEP Infrastructure & DEWA Substation", plot: "Commercial Sectors" }
  ];

  return (
    <div className="space-y-0 text-slate-800">
      
      {/* 1. Hero Section (Matching Image 1: High-res villa showcase, exact client text, no AI grid) */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} onNavigate={onNavigate} />

      {/* 2. Core Contracting Disciplines (Architectural Directory) */}
      <section id="disciplines" className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DED3] pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
                In-House Engineering Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111622] font-display">
                Single-Contractor Capabilities
              </h2>
              <p className="text-sm text-slate-600">
                Turnkey civil construction, certified MEP engineering, and architectural fabrication under one licensed Dubai contractor.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A2E16] hover:text-[#63220E] transition py-3 px-6 rounded-xl border border-[#7A2E16]/30 hover:border-[#7A2E16] bg-white shadow-xs cursor-pointer shrink-0"
            >
              <span>View Full Technical Specifications</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {coreDivisions.map((div, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E5DED3] rounded-2xl p-7 sm:p-8 space-y-5 shadow-xs hover:border-[#7A2E16] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                    <span className="text-xs font-mono font-bold text-[#8B6D1B]">
                      {div.number} / DISCIPLINE
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {div.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#111622] font-display">
                    {div.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {div.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] space-y-3">
                  <div className="text-[11px] font-mono text-slate-500 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5DED3]">
                    {div.specs}
                  </div>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-xs font-bold text-[#7A2E16] hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect Scope of Work</span>
                    <ArrowRight className="w-3 h-3 text-[#7A2E16]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Approved Consultant Engineering Partners */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
              Consultant Engineering Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111622] font-display">
              Approved Engineering Collaborations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We collaborate with premier Dubai consulting firms for statutory authority submissions, structural calculations, and building completion certificates (BCC).
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultantPartners.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-2 hover:border-[#7A2E16] transition"
              >
                <div className="text-[10px] font-mono text-amber-700 uppercase font-semibold">
                  {item.plot}
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

      {/* 5. Featured Landmark Handover Projects */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
                Track Record & Executed Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111622] font-display">
                Featured Executed Works
              </h2>
              <p className="text-sm text-slate-600">
                Verified luxury G+1 villas and architectural envelopes across Dubai's premier residential sectors.
              </p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#7A2E16] hover:bg-[#63220E] transition py-3 px-6 rounded-xl shadow-xs cursor-pointer shrink-0"
            >
              <span>Explore All Verified Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredHighlights.map((proj) => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl border border-[#E5DED3] overflow-hidden shadow-xs hover:border-[#7A2E16] hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 bg-slate-100 overflow-hidden relative">
                    <SafeImage 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#111622]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white">
                      Plot #{proj.plotNo}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2E16] block">
                      {proj.type}
                    </span>
                    <h3 className="text-base font-bold text-[#111622] font-display line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                      <span>{proj.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#F0EBE1] mt-2">
                  <div className="pt-3 text-[11px] text-slate-500 space-y-1">
                    <div>Client: <strong className="text-slate-700">{proj.client}</strong></div>
                    <div>Consultant: <strong className="text-slate-700">{proj.consultant}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
