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
  Phone,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function HomePage({ onNavigate, onOpenQuoteModal }) {
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
    { name: "Al Manhal Engineering Consultants", role: "Villa Architecture & Civil Supervision", discipline: "Residential G+1" },
    { name: "Al Majal Engineering Consultants", role: "Structural & MEP Review", discipline: "Turnkey Contracting" },
    { name: "Croquis Engineering Consultants", role: "Residential G+1 Civil Design", discipline: "Civil Engineering" },
    { name: "Arkiplan Consulting Architects", role: "Architectural Planning & Authority Submissions", discipline: "Statutory Permitting" },
    { name: "Teamwork Engineering Consultants", role: "Authority Permitting & Structural Engineering", discipline: "Majlis & Structural Works" },
    { name: "Gulf Engineering Consultants", role: "MEP Infrastructure & DEWA Substation", discipline: "MEP Infrastructure" }
  ];

  return (
    <div className="space-y-0 text-slate-800">
      
      {/* 1. Hero Section */}
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

      {/* 3. Approved Consultant Engineering Partners */}
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

      {/* 4. Comprehensive Portfolio Directory Gateway */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-[#E5DED3] p-8 sm:p-12 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B] block">
                Track Record & Executed Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111622] font-display leading-tight">
                Explore Our Complete Projects Directory & Handover Sheets
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Comprehensive project specifications, statutory Dubai Municipality records, structural scopes, and photographic handover documentation have been organized on our dedicated portfolio page.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DED3]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  17 Completed Handovers
                </span>
                <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DED3]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B6D1B]" />
                  6 Active Construction Sites
                </span>
                <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DED3]">
                  <CheckCircle2 className="w-4 h-4 text-[#7A2E16]" />
                  Dedicated Project Detail Sheets
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#7A2E16] hover:bg-[#63220E] transition py-4 px-8 rounded-xl shadow-xs hover:shadow-md cursor-pointer shrink-0"
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
