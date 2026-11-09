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
  MapPin,
  Wrench,
  Maximize2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../core/LanguageContext';

export default function Hero({ onOpenQuoteModal, onNavigate }) {
  const { language, t, isRTL } = useLanguage();
  const handleExploreClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('services');
    } else {
      const el = document.getElementById('disciplines') || document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProposalClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white text-slate-900 pt-32 sm:pt-36 lg:pt-40 pb-8 sm:pb-10 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            
            {/* Arabic Legal Name */}
            <div className="font-arabic text-lg sm:text-2xl font-black text-[#B3261E]" dir="rtl">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            {/* Corporate Name */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              {language === 'ar' ? (
                <>كاشوراس للمقاولات <span className="text-[#B3261E]">الكهروميكانيكية ش.ذ.م.م</span></>
              ) : (
                <>Kachoras Electromechanical <span className="text-[#B3261E]">Contracting LLC</span></>
              )}
            </h1>

            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B3261E]">
              {language === 'ar' ? 'حلول المقاولات والبناء المتكاملة والتسليم على المفتاح' : 'Complete Turnkey Construction Services'}
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-medium">
              {language === 'ar' ? (
                'بخبرة تمتد لأكثر من 20 عاماً في إمارة دبي، نتخصص في أعمال المقاولات الإنشائية والكهروميكانيكية. معتمدون لتسليم مشاريع متكاملة على المفتاح للفلل السكنية والتجارية G+1، أنظمة التكييف والكهرباء والسباكة، الألمنيوم والواجهات الزجاجية، والمطابخ وخزائن الملابس.'
              ) : (
                'With 20 years of experience in Dubai, we specialize in Construction and electromechanical works. We are accredited to deliver complete turnkey solutions for G+1 residential and commercial Villas/Building, MEP, Aluminium and Glass, Kitchen cabinets, and Wardrobes.'
              )}
            </p>

            {/* 4 Discipline Pills */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B3261E] shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">G+1 Construction</span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">MEP Works (HVAC)</span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Aluminium & Glass</span>
              </div>
              <div className="p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">Civil Maintenance</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={handleProposalClick}
                className="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#8F351A] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{language === 'ar' ? 'طلب تسعير ومناقصة' : 'Request Project Proposal'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                type="button"
                onClick={handleExploreClick}
                className="w-full sm:w-auto text-center px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm cursor-pointer"
              >
                {language === 'ar' ? 'التخصصات الهندسية' : 'Our Disciplines'}
              </button>
            </div>
          </div>

          {/* Right Column (6 Cols): 2x2 Photo Grid (Selected by Client) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 bg-slate-100 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl">
              
              {/* Quadrant 1: Villa Construction */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/villa.jpg" 
                  alt="G+1 Villa Construction" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Civil & RCC</span>
                    <span className="text-xs font-bold">G+1 Villa Construction</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 2: MEP Works (Authentic AC / Chiller Photo from Client) */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/mep.jpg" 
                  alt="MEP" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">HVAC, Electrical & Plumbing</span>
                    <span className="text-xs font-bold">In-House MEP Works</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 3: Aluminium & Glass */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/aluminium.jpg" 
                  alt="Aluminium & Glass" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 block">Al Qusais Facility</span>
                    <span className="text-xs font-bold">Aluminium & Glass</span>
                  </div>
                </div>
              </div>

              {/* Quadrant 4: Civil Maintenance */}
              <div onClick={handleExploreClick} className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 shadow-sm group cursor-pointer">
                <img 
                  src="./assets/civic.jpg" 
                  alt="Civil Maintenance" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">Fit-out & Renovation</span>
                    <span className="text-xs font-bold">Civil Maintenance</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Credibility Counters Strip from Client Correction Sheet */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">20+</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Years in Dubai (Since 2006)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#B3261E]">500+</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Completed Works Across Dubai</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Statutory Compliance (DM & DEWA)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">G+1</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">Building Contracting License (#578964)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
