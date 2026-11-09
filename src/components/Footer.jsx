import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Building2,
  Clock,
  BadgeCheck
} from 'lucide-react';
import { COMPANY_INFO, CORE_CATEGORIES } from '../data/mockData';
import KachorasLogo from './KachorasLogo';
import { useLanguage } from '../core/LanguageContext';

export default function Footer({ currentPage = 'home', onNavigate, onOpenQuoteModal, onOpenAdmin }) {
  const { language, isRTL } = useLanguage();

  const navItems = [
    { id: 'home', label: language === 'ar' ? 'الرئيسية' : 'Home' },
    { id: 'about', label: language === 'ar' ? 'من نحن' : 'About Us' },
    { id: 'services', label: language === 'ar' ? 'الأقسام والتخصصات' : 'Disciplines & Capabilities' },
    { id: 'projects', label: language === 'ar' ? 'سجل المشاريع' : 'Projects Portfolio' },
    { id: 'license', label: language === 'ar' ? 'الرخصة والامتثال' : 'Trade License & Compliance' },
    { id: 'contact', label: language === 'ar' ? 'اتصل بنا والورشة' : 'Contact & Estimating Desk' }
  ];

  const handleLinkClick = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <footer className="bg-[#0E131F] text-white border-t border-[#1E2638]">
      
      {/* 1. Pre-Footer Call-to-Action Banner (Hidden on /contact) */}
      {currentPage !== 'contact' && (
        <div className="border-b border-[#1E2638] py-8 sm:py-10 px-4 sm:px-8 bg-gradient-to-r from-[#121826] via-[#0E131F] to-[#121826]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest text-[#C59B27] font-bold">
                {language === 'ar' ? 'المناقصات والاستفسارات الفنية' : 'Tenders & Technical Inquiries'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {language === 'ar' ? 'هل تخطط لمشروع جديد في دبي؟' : 'Planning a Project in Dubai?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'ar' 
                  ? 'أرسل المخططات المعمارية أو جدول الكميات (BOQ)، أو حدد موعداً للاستشارة الهندسية في مقرنا بالقصيص.' 
                  : 'Submit your architectural drawings or schedule a direct technical consultation with our engineering team in Al Qusais.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/15 transition flex items-center gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="font-mono">{COMPANY_INFO.phone}</span>
              </a>

              <a
                href="https://wa.me/971555585079?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Balanced 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-xs">
          
          {/* Column 1: Company Identity & Statutory Credentials */}
          <div className="space-y-4">
            <button 
              onClick={(e) => handleLinkClick(e, 'home')} 
              className="cursor-pointer text-left focus:outline-none block"
            >
              <KachorasLogo variant="light" />
            </button>

            <div className="text-[#C59B27] font-semibold text-xs tracking-wide">
              {COMPANY_INFO.nameAr}
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              {language === 'ar' ? (
                <>تأسست شركة <strong>كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.മ</strong> في دبي عام 2006، وهي مقاول مرخص فئة أرضي + أول (G+1) من بلدية دبي.</>
              ) : (
                <>Established in Dubai in 2006, <strong>Kachoras Electromechanical Contracting LLC</strong> is a Dubai Municipality G+1 licensed building contractor.</>
              )}
            </p>

            {/* Official DET & DM Verified Badge Box */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <BadgeCheck className="w-4 h-4 shrink-0" />
                <span>Dubai Municipality G+1 Licensed</span>
              </div>
              <div className="text-slate-300">
                Commercial License: <strong className="text-white font-mono font-bold">#{COMPANY_INFO.licenseNumber}</strong>
              </div>
              <div className="text-slate-400 flex items-center justify-between text-[10px]">
                <span>Register: <strong className="text-slate-200 font-mono">#{COMPANY_INFO.registerNo}</strong></span>
                <span>DCCI: <strong className="text-slate-200 font-mono">#{COMPANY_INFO.dcciNo}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Contracting Disciplines */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-white/10 pb-2">
              {language === 'ar' ? 'التخصصات الهندسية' : 'Core Disciplines'}
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              {CORE_CATEGORIES.map((s) => (
                <li key={s.id}>
                  <button 
                    onClick={(e) => handleLinkClick(e, 'services')} 
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B3261E] group-hover:bg-[#C59B27] transition" />
                    <span className="font-medium">{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-white/10 pb-2">
              {language === 'ar' ? 'الصفحات الرئيسية' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={(e) => handleLinkClick(e, item.id)} 
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer text-left flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#C59B27] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Headquarters Coordinates */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] border-b border-white/10 pb-2">
              {language === 'ar' ? 'المقر الرئيسي والورش' : 'Headquarters & Facility'}
            </h4>
            <div className="space-y-2 text-slate-300 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span>Tel: <strong className="text-white font-mono">{COMPANY_INFO.phone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mob: <strong className="text-white font-mono">{COMPANY_INFO.mobile}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5 text-xs">
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-200 hover:text-white hover:underline font-mono">
                    {COMPANY_INFO.email}
                  </a>
                  <a href="mailto:info@kachoras.com" className="text-slate-200 hover:text-white hover:underline font-mono">
                    info@kachoras.com
                  </a>
                </div>
              </div>
              
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Clock className="w-3 h-3 text-[#C59B27]" />
                  <span>{language === 'ar' ? 'أوقات العمل الرسمية:' : 'Working Hours:'}</span>
                </div>
                <div>{language === 'ar' ? 'من الاثنين إلى السبت: 7:00 ص – 4:00 م' : 'Monday – Saturday: 7:00 AM – 4:00 PM'}</div>
                <div className="text-slate-500 text-[10px]">{language === 'ar' ? 'الأحد: عطلة أسبوعية' : 'Sunday: Closed • Site emergencies on call'}</div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Legal Copyright Bar */}
        <div className="border-t border-[#1E2638] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3 text-center sm:text-left">
          <p>
            {language === 'ar' 
              ? '© 2006–2026 شركة كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م. جميع الحقوق محفوظة.' 
              : '© 2006–2026 Kachoras Electromechanical Contracting LLC. All rights reserved.'}
          </p>
          <p className="text-slate-500 font-mono text-[10px]">
            Dubai DED License #578964 • Register #2148781 • DCCI #169651
          </p>
        </div>
      </div>

    </footer>
  );
}
