import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Services from '../components/Services';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Hammer, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Wrench,
  Zap,
  FileCheck2
} from 'lucide-react';
import { CORE_CATEGORIES, COMPANY_INFO } from '../data/mockData';

export default function ServicesPage({ onNavigate, onOpenQuoteModal, onSelectServiceForQuote }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState(0);

  const detailedDisciplines = [
    {
      id: 'building',
      title: 'G+1 Licensed Construction',
      badge: 'Dubai Municipality G+1 Approved',
      icon: Building2,
      tagline: 'Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality standards.',
      scope: [
        'Soil excavation, site preparation, and foundation substructure works',
        'Reinforced concrete structure and superstructure works',
        'AAC blockwork and thermal insulation as per applicable Dubai requirements',
        'Residential villas, Majlis extensions, service blocks, and boundary walls',
        'Dubai Municipality inspections, statutory permits, and Building Completion Certificates (BCC)'
      ],
      compliance: 'Dubai Building Code & Dubai Municipality Structural Safety Regulations',
      typicalTimeline: '8 – 14 Months (Turnkey Structure to Handover)',
      image: './assets/real-projects/completed-construction-albannay-424-7036.jpg',
      imageCaption: 'G+1 Classical Villa Execution (Al Warqaa Fourth, Plot 424-7036)'
    },
    {
      id: 'mep',
      title: 'MEP & HVAC Engineering Works',
      badge: 'DEWA & Dubai Civil Defence Compliant',
      icon: Cpu,
      tagline: 'Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning.',
      scope: [
        'Electrical wiring, MDB and SMDB panels, copper cable connections and power distribution',
        'Split, ducted split, VRF/VRV, and chilled water air-conditioning systems',
        'Approved subcontractor for leading brands such as Carrier, O General, Trane, Daikin, and Super General',
        'Water supply, drainage, sanitary installations, water pumps, grease traps, and solar water heaters',
        'Fire alarm, smoke detection, fire sprinkler systems, and Dubai Civil Defence compliance',
        'Energy-efficient LED lighting, automation, and low-voltage (ELV) data cabling'
      ],
      compliance: 'DEWA Electrical Standards & Dubai Civil Defence Fire Safety Regulations',
      typicalTimeline: 'Integrated concurrently with civil construction',
      image: './assets/real-projects/completed-aluminum-flag-villa.jpg',
      imageCaption: 'DEWA Integrated Electromechanical Substation & Infrastructure'
    },
    {
      id: 'aluminium',
      title: 'Architectural Aluminium & Glass Works',
      badge: 'Custom Workshop Fabrication in Al Qusais',
      icon: ShieldCheck,
      tagline: 'Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass, and mirrors.',
      scope: [
        'Aluminium curtain walls and double-glazed windows',
        'Thermal-break aluminium doors, panoramic windows, and heavy-duty sliding doors',
        'Frameless glass railings, balustrades, and structural mirrors',
        'Aluminium louvers, composite cladding, pergolas, and entrance canopies',
        'Glass skylights and insulated glass units (IGU) compliant with Dubai Green Building Regulations'
      ],
      compliance: 'Dubai Green Building Standards & Estidama Glazing Safety Codes',
      typicalTimeline: 'Fabricated in-house to synchronize with site finishes',
      image: './assets/real-projects/completed-aluminum-travertine-glazing.jpg',
      imageCaption: 'Al Qusais Workshop Double-Glazed Curtain Wall & Entryway'
    },
    {
      id: 'maintenance',
      title: 'Civil Maintenance & Fit-out Works',
      badge: 'Approved Dubai Municipality, MBRHE & EIB Contractor',
      icon: Hammer,
      tagline: 'Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB for renovation and finishing.',
      scope: [
        'Decorative gypsum ceilings, false ceilings, cove indirect lighting, and wall cornices',
        'Custom-made luxury kitchen cabinets, wardrobes, and architectural joinery',
        'Tile, marble, and porcelain floor laying with precision waterproofing membranes',
        'Civil refurbishment, crack repairs, structural retrofitting, and epoxy floor coatings',
        'Annual Maintenance Contracts (AMC) for residential, commercial, and government properties',
        '24/7 emergency electrical, plumbing, and facility repair services'
      ],
      compliance: 'Dubai Municipality Health & Safety Standards',
      typicalTimeline: 'Scheduled maintenance programs & emergency support',
      image: './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg',
      imageCaption: 'Royal Majlis & Decorative Gypsum Maintenance (Al Barsha, Plot 376-1176)'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. Page Header */}
      <PageHeader 
        title="Our Contracting Disciplines"
        subtitle="Single-Contractor Accountability: Civil, MEP, Aluminium & Fitout Engineered Under Dubai Trade License #578964"
        breadcrumb="Disciplines & Services"
        onNavigate={onNavigate}
      />

      {/* 2. The Turnkey Advantage Banner */}
      <section className="py-16 bg-[#FBF9F5] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white border border-[#E5DED3] rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E5DED3] pb-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">The Kachoras Advantage</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] font-display">
                  Why Turnkey In-House Execution Matters in Dubai
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Subcontractor Finger-Pointing</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              In conventional construction, clients hire separate contractors for civil structure, MEP ducting, and aluminium glazing. When delays or permit disputes occur, parties blame each other. At <strong>Kachoras</strong>, our in-house engineering divisions coordinate directly from day one, ensuring seamless DEWA approvals, synchronized concrete casting, and fixed-price completion.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">01. Single Point of Contact</strong>
                <p className="text-xs text-slate-600">One dedicated project manager and General Manager Jose K. George oversee your build.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">02. Synchronized DEWA / DM</strong>
                <p className="text-xs text-slate-600">Electrical and plumbing sleeves are cast directly into RCC slabs without structural coring.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">03. In-House Glass & Steel</strong>
                <p className="text-xs text-slate-600">Aluminium profiles and glass units fabricated in our Al Qusais workshop to exact site dimensions.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">04. Cost & Schedule Predictability</strong>
                <p className="text-xs text-slate-600">Eliminating third-party markups ensures competitive pricing and strict milestone handovers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Section for Each Discipline */}
      <section className="py-20 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E] bg-[#B3261E]/10 px-3 py-1 rounded-full border border-[#B3261E]/20">
              Technical Division Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-display">
              Comprehensive Scope Across 4 Contracting Divisions
            </h2>
            <p className="text-sm text-slate-600">
              Select any division below to inspect engineering capabilities, compliance standards, and request technical specifications.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {detailedDisciplines.map((d, index) => {
              const IconComp = d.icon;
              const isActive = selectedDiscipline === index;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiscipline(index)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px] ${
                    isActive 
                      ? 'bg-[#B3261E] text-white border-[#B3261E] shadow-lg shadow-[#B3261E]/20 -translate-y-1' 
                      : 'bg-[#FAF8F5] text-slate-700 border-[#E5DED3] hover:bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <IconComp className={`w-5 h-5 ${isActive ? 'text-[#C59B27]' : 'text-[#B3261E]'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      0{index + 1}
                    </span>
                  </div>
                  <strong className="block text-xs sm:text-sm font-bold font-display leading-tight mt-2">
                    {d.title.split('(')[0]}
                  </strong>
                </button>
              );
            })}
          </div>

          {/* Active Discipline Card Showcase */}
          {(() => {
            const activeItem = detailedDisciplines[selectedDiscipline];
            const ActiveIcon = activeItem.icon;
            return (
              <div className="bg-[#FAF8F5] border border-[#E5DED3] rounded-3xl p-6 sm:p-10 shadow-md animate-in fade-in duration-300">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B3261E]/10 text-[#B3261E] text-xs font-bold rounded-full border border-[#B3261E]/20">
                        <ActiveIcon className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>{activeItem.badge}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#1E293B] font-display">
                        {activeItem.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {activeItem.tagline}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <strong className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                        Core Scope of Execution:
                      </strong>
                      <div className="space-y-2">
                        {activeItem.scope.map((s, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => onSelectServiceForQuote && onSelectServiceForQuote(activeItem.title)}
                        className="px-6 py-3 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <span>Request Scope Quote / RFQ</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
                      </button>

                      <button
                        onClick={() => onNavigate('contact')}
                        className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl border border-[#CBD5E1] transition cursor-pointer"
                      >
                        <span>Send Blueprints to Estimating Desk</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Details Box */}
                  <div className="lg:col-span-5 bg-white border border-[#E5DED3] rounded-2xl overflow-hidden shadow-sm">
                    {activeItem.image && (
                      <div className="h-48 sm:h-52 relative bg-slate-900 overflow-hidden">
                        <img 
                          src={activeItem.image}
                          alt={activeItem.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B27] block">
                            Verified Project Execution
                          </span>
                          <p className="text-xs font-semibold text-white/95">
                            {activeItem.imageCaption}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="p-6 space-y-5">
                    <div className="border-b border-[#E5DED3] pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">Technical Compliance</span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">Statutory & Regulatory Matrix</h4>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] space-y-1">
                        <span className="text-slate-500 font-medium">Standards & Approvals:</span>
                        <strong className="block text-slate-900 font-bold">{activeItem.compliance}</strong>
                      </div>

                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] space-y-1">
                        <span className="text-slate-500 font-medium">Typical Project Timeline:</span>
                        <strong className="block text-slate-900 font-bold">{activeItem.typicalTimeline}</strong>
                      </div>

                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] space-y-1">
                        <span className="text-slate-500 font-medium">Commercial License Activity:</span>
                        <strong className="block text-slate-900 font-bold">Authorized under DED License #578964</strong>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onOpenQuoteModal && onOpenQuoteModal({ category: activeItem.title })}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Calculate Cost for this Division</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
                      </button>
                    </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 4. Turnkey Construction Methodology & Quality Assurance Matrix */}
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
              Standard Operating Procedure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111622] font-display">
              Turnkey Construction & Handover Methodology
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every project follows an institutional engineering roadmap synchronized with Dubai Municipality staged inspections, DEWA approvals, and Civil Defence certifications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E5DED3] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 01</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Substructure & Raft Foundations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Geotechnical soil testing, site dewatering, mass excavation, heavy rebar cage layout, moisture membrane application, and high-strength concrete raft casting under certified third-party testing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DED3] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 02</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Superstructure & Thermal Masonry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reinforced concrete columns, post-tensioned floor and roof slabs, thermal AAC masonry blockwork, and structural alignment verification under direct Dubai Municipality site inspection protocols.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DED3] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 03</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Concurrent MEP & Glazing Fitout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sleeved slab conduits, DEWA main panel coordination, central ducted AC ductwork, fire suppression networks, and in-house fabricated thermal-break aluminium window and curtain wall installation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DED3] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 04</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Testing, DEWA Meter & BCC Handover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full Testing & Balancing (TAB) of HVAC, DEWA final meter installation, Civil Defence life-safety clearance, and issuance of the official Dubai Municipality Building Completion Certificate (BCC).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Footer Action */}
      

    </div>
  );
}
