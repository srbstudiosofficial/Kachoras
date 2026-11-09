import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  en: {
    // Top Strip
    dmApproved: 'Dubai Municipality Approved G+1 Contractor • License #578964',
    headquarters: 'Al Qusais Industrial 1, Warehouse B-25, Dubai',
    whatsappDesk: 'WhatsApp Inquiries',
    callUs: 'Tel:',

    // Navigation
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_services: 'Disciplines',
    nav_projects: 'Projects',
    nav_license: 'License & Compliance',
    nav_contact: 'Contact & Tender',
    nav_rfq: 'ENQUIRY / RFQ',
    submit_tender: 'Submit Tender / RFQ',

    // Page Headers
    header_about_title: 'About Kachoras Contracting',
    header_about_sub: '20+ Years of Structural & Electromechanical Excellence Across Dubai (2006–2026)',
    header_services_title: 'Contracting Disciplines & Capabilities',
    header_services_sub: 'In-House Turnkey Construction, Electromechanical Engineering & Architectural Aluminium',
    header_projects_title: 'Engineering Projects Portfolio',
    header_projects_sub: '20+ Years of Structural & Electromechanical Excellence Across Dubai • Verified Handover Portfolio',
    header_license_title: 'Trade License & Municipal Compliance',
    header_license_sub: 'Dubai Municipality Approved G+1 Building Contractor • License #578964 • DEWA & DCD Accredited',
    header_contact_title: 'Contact Estimating Desk & Headquarters',
    header_contact_sub: 'Submit Villa Blueprints, Request Tender Proposals & Schedule In-Person Consultations in Al Qusais',

    // Hero Section
    hero_badge: 'Dubai Municipality Approved G+1 Contractor • License #578964',
    hero_title: '20+ Years of Master Structural & MEP Engineering in Dubai',
    hero_subtitle: 'Full turnkey execution for luxury G+1 villas, Arabian majlis, in-house architectural aluminium fabrication, and Dubai civic infrastructure under Jose K. George.',
    hero_cta_projects: 'Explore Verified Projects',
    hero_cta_quote: 'Request Tender Quotation',

    // Portfolio
    portfolio_tag: 'Executed Works • Handover Portfolio',
    portfolio_title: 'Completed Contracting Works',
    portfolio_subtitle: 'Explore our verified portfolio of Dubai Municipality-approved luxury G+1 villas, Arabian majlis halls, in-house architectural aluminium fabrication, and civic infrastructure works.',
    cat_all: 'All Projects',
    cat_villas: 'Luxury G+1 Villas',
    cat_majlis: 'Majlis & Traditional',
    cat_aluminium: 'Aluminium & Glazing',
    cat_civic_mep: 'Civic & MEP Works',
    search_placeholder: 'Search villa, location, plot #...',
    search_no_results: 'No matching projects found',
    reset_search: 'Reset Search & Filters',
    view_project_sheet: 'View Full Project Sheet',

    // Footer
    footer_pre_tag: 'Tenders & Technical Inquiries',
    footer_pre_title: 'Planning a Project in Dubai?',
    footer_pre_desc: 'Submit your architectural drawings or schedule a consultation with our engineering managers in Al Qusais.',
    footer_brand_desc: 'Established in 2006, Kachoras Electromechanical Contracting LLC is a Dubai Municipality G+1 licensed contractor specializing in luxury residences, royal majlis pavilions, civic infrastructure, and MEP engineering.',
    footer_col_disciplines: 'Disciplines',
    footer_col_pages: 'Pages',
    footer_col_hq: 'Headquarters',
    footer_working_hours: 'Working Hours:',
    footer_hours_val: 'Monday – Saturday: 7:00 AM – 4:00 PM',
    footer_sunday_closed: 'Sunday Closed • Emergency site teams on call',
    footer_copyright: '© 2006–2026 Kachoras Electromechanical Contracting LLC. All rights reserved.',
    footer_dubai_gov: 'Dubai, United Arab Emirates • Government of Dubai Commercial License #578964'
  },
  ar: {
    // Top Strip
    dmApproved: 'مقاول معتمد فئة أرضي + أول من بلدية دبي • رخصة رقم 578964',
    headquarters: 'القصيص الصناعية 1، مجمع بن سوقات، مستودع B-25، دبي',
    whatsappDesk: 'استفسارات واتساب',
    callUs: 'هاتف:',

    // Navigation
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_services: 'التخصصات الهندسية',
    nav_projects: 'المشاريع',
    nav_license: 'الرخصة والاعتمادات',
    nav_contact: 'تواصل ومناقصات',
    nav_rfq: 'طلب تسعير / RFQ',
    submit_tender: 'تقديم مناقصة / استفسار',

    // Page Headers
    header_about_title: 'عن كاشوراس للمقاولات',
    header_about_sub: 'أكثر من 20 عاماً من التميز الإنشائي والكهروميكانيكي في إمارة دبي (2006–2026)',
    header_services_title: 'التخصصات والقدرات الهندسية',
    header_services_sub: 'بناء متكامل على المفتاح، هندسة كهروميكانيكية، وتصنيع معماري للألمنيوم والزجاج',
    header_projects_title: 'سجل المشاريع الهندسية والمنجزات',
    header_projects_sub: 'أكثر من 20 عاماً من المشاريع المعتمدة في دبي • سجل التسليمات الموثقة لبلدية دبي',
    header_license_title: 'الرخصة التجارية والاعتمادات البلدية',
    header_license_sub: 'مقاول بناء معتمد G+1 من بلدية دبي • رخصة تجارية #578964 • معتمد لدى هيئة كهرباء ومياه دبي والدفاع المدني',
    header_contact_title: 'تواصل مع المقر الرئيسي ومكتب التقديرات',
    header_contact_sub: 'أرسل مخططات الفلل، واطلب عروض الأسعار، وحدد موعداً للاستشارة الفنية في مقرنا بالقصيص',

    // Hero Section
    hero_badge: 'مقاول معتمد G+1 من بلدية دبي • رخصة تجارية #578964',
    hero_title: 'أكثر من 20 عاماً من التميز الهندسي في المقاولات والأعمال الكهروميكانيكية بدبي',
    hero_subtitle: 'تنفيذ شامل ومتكامل للفلل السكنية الفاخرة G+1 والمجالس العربية وتصنيع الألمنيوم المعماري ومشاريع البنية التحتية بإشراف هندسي معتمد.',
    hero_cta_projects: 'استكشف المشاريع المنجزة',
    hero_cta_quote: 'طلب تسعير مناقصة',

    // Portfolio
    portfolio_tag: 'الأعمال المنفذة • سجل التسليمات الرسمية',
    portfolio_title: 'سجل مشاريع المقاولات المنجزة',
    portfolio_subtitle: 'استعرض محفظة مشاريعنا المعتمدة من بلدية دبي للفلل الفاخرة G+1 وقاعات المجالس وتصنيع الألمنيوم وأعمال الكهروميكانيك والبنية التحتية.',
    cat_all: 'جميع المشاريع',
    cat_villas: 'فلل سكنية فاخرة G+1',
    cat_majlis: 'مجالس وتراثيات',
    cat_aluminium: 'ألمنيوم وواجهات زجاجية',
    cat_civic_mep: 'أعمال كهروميكانيكية ومدنية',
    search_placeholder: 'ابحث عن فيلا، موقع، رقم الأرض...',
    search_no_results: 'لم يتم العثور على مشاريع مطابقة',
    reset_search: 'إعادة ضبط البحث والتصفيات',
    view_project_sheet: 'عرض بطاقة المشروع الكاملة',

    // Footer
    footer_pre_tag: 'المناقصات والاستفسارات الفنية',
    footer_pre_title: 'هل تخطط لمشروع جديد في دبي؟',
    footer_pre_desc: 'أرسل مخططاتك المعمارية أو جدول الكميات (BOQ)، أو حدد موعداً للاستشارة الهندسية المباشرة في مقرنا بالقصيص.',
    footer_brand_desc: 'تأسست شركة كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م في عام 2006، وهي مقاول معتمد فئة أرضي + أول (G+1) من بلدية دبي، متخصصة في الفلل السكنية الفاخرة، المجالس العربية، مشاريع البنية التحتية، والهندسة الكهروميكانيكية.',
    footer_col_disciplines: 'التخصصات الهندسية',
    footer_col_pages: 'الصفحات الرئيسية',
    footer_col_hq: 'المقر الرئيسي',
    footer_working_hours: 'ساعات العمل:',
    footer_hours_val: 'من الاثنين إلى السبت: 7:00 صباحاً – 4:00 مساءً',
    footer_sunday_closed: 'الأحد عطلة • فرق الطوارئ الهندسية على أهبة الاستعداد',
    footer_copyright: '© 2006–2026 كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م. جميع الحقوق محفوظة.',
    footer_dubai_gov: 'دبي، الإمارات العربية المتحدة • رخصة تجارية صادرة عن حكومة دبي رقم 578964'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kachoras_language');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kachoras_language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const t = (key, fallback = '') => {
    return TRANSLATIONS[language]?.[key] || fallback || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      isRTL: false,
      t: (key, fallback = '') => fallback || key
    };
  }
  return context;
}
