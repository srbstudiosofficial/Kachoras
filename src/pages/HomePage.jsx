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
import { useLanguage } from '../core/LanguageContext';

export default function HomePage({ onNavigate, onOpenQuoteModal }) {
  const { language, t, isRTL } = useLanguage();
  const coreDivisions = language === 'ar' ? [
    {
      number: '01',
      title: 'بناء فلل معتمد فئة G+1',
      subtitle: 'مقاولات بناء متكاملة وتسليم على المفتاح',
      desc: 'خدمات بناء متكاملة من وضع الأساسات وتجهيز الموقع وحتى تسليم المفاتيح النهائية وفقاً لاشتراطات بلدية دبي وأعلى المعايير الهندسية المعتمدة.',
      image: './assets/villa.jpg'
    },
    {
      number: '02',
      title: 'الأعمال الكهروميكانيكية (MEP)',
      subtitle: 'هندسة التكييف والكهرباء والسباكة',
      desc: 'خدمات ميكانيكية وكهربائية وصحية شاملة، من التمديدات وحتى الاختبار والتشغيل والاعتماد. مقاول باطن معتمد لكبرى شركات التكييف (Carrier, O General, Trane, Daikin, Super General).',
      image: './assets/mep.jpg'
    },
    {
      number: '03',
      title: 'أعمال الألمنيوم والزجاج المعماري',
      subtitle: 'تصنيع وتركيب في مصنعنا بالقصيص',
      desc: 'تصنيع وتركيب أبواب ونوافذ الألمنيوم، الواجهات الزجاجية (Curtain Walls)، والسكاي لايت، والمظلات، والمرايا المعمارية عبر ورشتنا الخاصة في القصيص الصناعية الأولى.',
      image: './assets/aluminium.jpg'
    },
    {
      number: '04',
      title: 'الصيانة المدنية وأعمال التشطيبات',
      subtitle: 'مقاول معتمد لدى بلدية دبي ومؤسسة محمد بن راشد للإسكان وبنك الإمارات الإسلامي',
      desc: 'مقاول صيانة عامة معتمد لبلدية دبي، MBRHE، و EIB، لتقديم خدمات ترميم وتجديد المباني، الديكورات الجبسية، وتصنيع المطابخ وخزائن الملابس.',
      image: './assets/civic.jpg'
    }
  ] : [
    {
      number: '01',
      title: 'Building Construction',
      subtitle: 'Complete Turnkey Construction Services',
      desc: 'Complete construction services from foundations to final handover of keys in compliance with Dubai Municipality regulations and engineering standards.',
      image: './assets/villa.jpg'
    },
    {
      number: '02',
      title: 'MEP',
      subtitle: 'HVAC, Electrical & Plumbing Engineering',
      desc: 'Complete mechanical, electrical, and plumbing (MEP) services, covering all stages from installation to testing and commissioning. Approved subcontractor for leading AC brands including Carrier, O General, Trane, Daikin, and Super General.',
      image: './assets/mep.jpg'
    },
    {
      number: '03',
      title: 'Aluminum and Glass',
      subtitle: 'Manufacturing & Installation',
      desc: 'Manufacturing and installation of aluminium doors, windows, skylights, pergolas, glass and mirrors fabricated at our dedicated Al Qusais facility.',
      image: './assets/aluminium.jpg'
    },
    {
      number: '04',
      title: 'General Maintenance & Fit-out',
      subtitle: 'Approved Municipality, MBRHE & EIB Contractor',
      desc: 'Approved contractor for Dubai Municipality General Maintenance Department, MBRHE, and EIB, providing building maintenance, renovation, and interior finishing services including decorative gypsum ceilings, custom kitchen cabinets, wardrobes, and general building maintenance.',
      image: './assets/civic.jpg'
    }
  ];

  // 3 Curated Landmark Projects (ECC Group & Syed Contracting Style)
  const landmarkProjects = [
    {
      id: 'REAL-CP-ALBANNAY',
      title: 'Classical Luxury G+1 Villa & Outbuilding',
      discipline: 'Luxury G+1 Villa',
      location: 'Al Warqaa Fourth, Dubai',
      plotNo: '424-7036',
      consultant: 'Al Manhal Engineering Consultants',
      image: './assets/villa.jpg',
      scope: 'Turnkey private residence featuring fluted classical columns, perimeter compound wall, and integrated MEP infrastructure.'
    },
    {
      id: 'REAL-CP-ALUM-FLAG',
      title: 'Architectural Curtain Wall & Glass Facade',
      discipline: 'Aluminium & Glazing',
      location: 'Dubai Residential Sector',
      plotNo: 'In-House Fabrication',
      consultant: '',
      image: './assets/aluminium.jpg',
      scope: 'Thermal-break structural aluminium curtain walling with double-glazed insulated units and entrance canopy.'
    },
    {
      id: 'REAL-CP-ALABDULLA',
      title: 'Royal Arabian Majlis Hall & Compound Wall',
      discipline: 'Majlis & Traditional',
      location: 'Al Barsha Second, Dubai',
      plotNo: '376-1176',
      consultant: 'Dubai Municipality Approved',
      image: './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg',
      scope: 'Traditional Arabian majlis hall, decorative gypsum cornices, boundary wall plaster restoration, and climate control.'
    }
  ];

  return (
    <div className="space-y-0 text-slate-800">
      
      {/* 1. Full-Bleed Architectural Hero Section (ECC Group & Syed Contracting Style) */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} onNavigate={onNavigate} />

      {/* 2. Core Contracting Disciplines with Authentic Photography (Like ECC Group's "Our Businesses") */}
      <section id="disciplines" className="py-10 sm:py-14 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-6 sm:space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
                {language === 'ar' ? 'التخصصات الهندسية المعتمدة' : 'In-House Engineering Disciplines'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111622] font-display">
                {language === 'ar' ? 'خدمات المقاولات المتكاملة والتسليم على المفتاح' : 'Complete Turnkey Construction Services'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {language === 'ar' ? 'مقاولات إنشائية متكاملة، هندسة كهروميكانيكية معتمدة، وتصنيع معماري تحت مظلة مقاول مرخص ومعتمد في دبي.' : 'Turnkey civil construction, certified MEP engineering, and architectural fabrication under one licensed Dubai contractor.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B3261E] hover:text-[#961F18] transition py-3 px-6 rounded-xl border border-[#B3261E]/30 hover:border-[#B3261E] bg-white shadow-xs cursor-pointer shrink-0 min-h-[44px]"
            >
              <span>{language === 'ar' ? 'عرض المواصفات الفنية الكاملة' : 'View Full Technical Specifications'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>

          {/* 4 Division Visual Cards (With Authentic Construction Photography) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreDivisions.map((div, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs hover:border-[#B3261E] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer active:scale-[0.99] touch-manipulation"
                onClick={() => onNavigate('services')}
              >
                {/* Visual Image Header */}
                <div 
                  className="h-48 sm:h-56 relative overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onNavigate('services')}
                >
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

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate('services'); }}
                      className="text-xs font-bold text-[#B3261E] hover:underline flex items-center gap-1.5 cursor-pointer py-1"
                    >
                      <span>{language === 'ar' ? 'استعراض نطاق الأعمال' : 'Inspect Scope of Work'}</span>
                      <ArrowRight className="w-3 h-3 text-[#B3261E]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Comprehensive Portfolio Directory Gateway */}
      <section className="py-10 sm:py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B] block">
                {language === 'ar' ? 'سجل الإنجاز والمشاريع المنفذة' : 'Track Record & Executed Portfolio'}
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#111622] font-display leading-tight">
                {language === 'ar' ? 'استعرض دليل المشاريع الشامل وسجلات التسليم المعتمدة' : 'Explore Our Complete Projects Directory & Handover Sheets'}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
                {language === 'ar' ? 'توثيق هندسي متكامل للمشاريع، وسجلات بلدية دبي، ونطاق الأعمال الإنشائية مع توثيق فوتوغرافي كامل لكل مشروع على صفحة المحفظة الخاصة بنا.' : 'Comprehensive project specifications, statutory Dubai Municipality records, structural scopes, and photographic handover documentation have been organized on our dedicated portfolio page.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {language === 'ar' ? '20 مشروعاً تم تسليمه' : '20 Handed Over Projects'}
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6D1B] shrink-0" />
                  {language === 'ar' ? '4 تخصصات رئيسية' : '4 Core Disciplines'}
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[11px] sm:text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B3261E] shrink-0" />
                  {language === 'ar' ? 'سجلات تسليم موثقة' : 'Dedicated Handover Sheets'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#961F18] transition py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xs hover:shadow-md cursor-pointer shrink-0 min-h-[44px]"
            >
              <span>{language === 'ar' ? 'عرض دليل المشاريع' : 'View Projects Directory'}</span>
              <ArrowRight className="w-4 h-4 text-[#C59B27]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
