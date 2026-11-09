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
import { useLanguage } from '../core/LanguageContext';

export default function ServicesPage({ onNavigate, onOpenQuoteModal, onSelectServiceForQuote }) {
  const { language, isRTL } = useLanguage();
  const [selectedDiscipline, setSelectedDiscipline] = useState(0);

  const detailedDisciplines = [
    {
      id: 'building',
      title: 'Building Construction',
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
      title: 'MEP',
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
      image: './assets/mep.jpg',
      imageCaption: 'DEWA Integrated Electromechanical Substation & Infrastructure'
    },
    {
      id: 'aluminium',
      title: 'Aluminum and Glass',
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
      image: './assets/aluminium.jpg',
      imageCaption: 'Manufacturing & Installation of Aluminium Doors, Windows, Glass & Pergolas'
    },
    {
      id: 'maintenance',
      title: 'General Maintenance & Fit-out',
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
      image: './assets/civic.jpg',
      imageCaption: 'Approved General Maintenance, Renovation & Interior Finishing'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. Page Header */}
      <PageHeader 
        title="Our Contracting Disciplines"
        subtitle="Complete Turnkey Construction Services: Civil, MEP, Aluminium & Fitout Engineered Under Dubai Trade License #578964"
        breadcrumb="Disciplines & Services"
        onNavigate={onNavigate}
      />

      {/* 2. The Turnkey Advantage Banner */}
      <section className="py-8 sm:py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">
                  {language === 'ar' ? 'ميزة كاشوراس • لماذا تختار خدماتنا المتكاملة على المفتاح؟' : 'The Kachoras Advantage • Why Choose Our Turnkey Services?'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] font-display">
                  {language === 'ar' ? 'شركة واحدة، حلول هندسية متكاملة' : 'One Company, Complete Project Solutions'}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ar' ? 'تنفيذ داخلي متكامل 100%' : 'Integrated In-House Execution'}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              {language === 'ar' ? (
                <>إدارة مقاولين متعددين للأعمال الإنشائية والكهرباء والسباكة والألمنيوم تؤدي غالباً إلى تأخيرات وتكاليف إضافية ومشاكل في التنسيق. في <strong>كاشوراس</strong>، تعمل فرقنا المتخصصة معاً لإدارة المشاريع من البداية وحتى التسليم النهائي، مما يضمن أعلى درجات التنسيق والجودة وضبط الميزانية والالتزام بالمواعيد المحددة.</>
              ) : (
                <>Managing different contractors for construction, electrical, plumbing, and aluminium works can lead to delays, extra costs, and coordination problems. At <strong>Kachoras</strong>, our different teams work together to manage projects from start to finish. This helps improve coordination, maintain quality, control costs, and complete projects on time.</>
              )}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">01. One Point of Contact</strong>
                <p className="text-xs text-slate-600 leading-relaxed">A dedicated project manager and management team coordinate all project activities, making communication easier for our clients.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">02. Better Project Coordination</strong>
                <p className="text-xs text-slate-600 leading-relaxed">Our civil and MEP teams work together from the beginning to coordinate electrical, plumbing, and other service requirements during construction.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">03. Aluminum and Glass</strong>
                <p className="text-xs text-slate-600 leading-relaxed">Our aluminium and glass workshop in Al Qusais handles fabrication according to project requirements and site measurements.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wider">04. Cost & Time Management</strong>
                <p className="text-xs text-slate-600 leading-relaxed">Direct coordination between our teams helps reduce unnecessary costs, avoid delays, and ensure smooth project completion and timely handover.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Section for Each Discipline */}
      <section className="py-10 sm:py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E] bg-[#B3261E]/10 px-3 py-1 rounded-full border border-[#B3261E]/20">
              {language === 'ar' ? 'ملفات الأقسام الفنية' : 'Technical Division Profiles'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-display">
              {language === 'ar' ? 'نطاق عمل متكامل عبر 4 قطاعات مقاولات رئيسية' : 'Comprehensive Scope Across 4 Contracting Divisions'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'ar' ? 'اختر أي قطاع أدناه للاطلاع على القدرات الهندسية، معايير الامتثال، وطلب المواصفات الفنية.' : 'Select any division below to inspect engineering capabilities, compliance standards, and request technical specifications.'}
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
                      : 'bg-[#F8FAFC] text-slate-700 border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]'
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
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-md animate-in fade-in duration-300">
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
                        <span>Send Drawings and Specifications to Estimating Desk</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Details Box */}
                  <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                    {activeItem.image && (
                      <div className="h-48 sm:h-52 relative bg-slate-900 overflow-hidden">
                        <img 
                          src={activeItem.image}
                          alt={activeItem.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
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
                    <div className="border-b border-[#E2E8F0] pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">Technical Compliance</span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">Statutory & Regulatory Matrix</h4>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-slate-500 font-medium">Standards & Approvals:</span>
                        <strong className="block text-slate-900 font-bold">{activeItem.compliance}</strong>
                      </div>

                      <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-slate-500 font-medium">Typical Project Timeline:</span>
                        <strong className="block text-slate-900 font-bold">{activeItem.typicalTimeline}</strong>
                      </div>

                      <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
                        <span className="text-slate-500 font-medium">Commercial License Activity:</span>
                        <strong className="block text-slate-900 font-bold">Authorized under DED License #578964</strong>
                      </div>
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
      <section className="py-10 sm:py-14 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
              From Start to Final Handover
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111622] font-display">
              Our Construction Process
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every project is managed through four main stages to ensure proper coordination, quality workmanship, and compliance with applicable Dubai regulations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 01</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Foundation & Substructure</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Soil testing and site preparation</li>
                <li>Excavation and dewatering where required</li>
                <li>Foundation reinforcement and steel fixing</li>
                <li>Waterproofing and moisture protection</li>
                <li>Concrete raft foundation and related works</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 02</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Structure & Blockwork</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Reinforced concrete columns and beams</li>
                <li>Concrete slabs and roof construction</li>
                <li>Post-tensioned slabs where required</li>
                <li>AAC blockwork and thermal insulation</li>
                <li>Plastering and structural inspections</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 03</span>
              <h3 className="text-base font-bold text-[#111622] font-display">MEP, Aluminium, Glass & Fit-Out</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Electrical conduits and cable installations</li>
                <li>Plumbing and drainage installations</li>
                <li>Air-conditioning ductwork and equipment</li>
                <li>Aluminium doors, windows, and curtain walls</li>
                <li>Glass, kitchen cabinets, wardrobes & interior finishing</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
              <span className="text-xs font-mono font-bold text-[#8B6D1B]">PHASE 04</span>
              <h3 className="text-base font-bold text-[#111622] font-display">Testing & Final Handover</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Testing & commissioning of electrical & plumbing</li>
                <li>Air-conditioning testing and balancing</li>
                <li>DEWA meter coordination and installation</li>
                <li>Required Civil Defence inspections & approvals</li>
                <li>Dubai Municipality BCC inspection & final handover</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Footer Action */}
      

    </div>
  );
}
