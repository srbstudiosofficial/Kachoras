import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { COMPANY_INFO, CORE_CATEGORIES } from '../data/mockData';
import KachorasLogo from './KachorasLogo';

export default function Footer({ currentPage = 'home', onNavigate, onOpenQuoteModal, onOpenAdmin }) {
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'services', label: 'Disciplines & Capabilities', href: '/services' },
    { id: 'projects', label: 'Projects & Live Pipeline', href: '/projects' },
    { id: 'license', label: 'Trade License & Municipal Compliance', href: '/license' },
    { id: 'contact', label: 'Contact & Al Qusais Facility', href: '/contact' }
  ];

  const handleLinkClick = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <footer className="bg-[#12161F] text-white border-t border-[#232938]">
      
      {/* Single Unified Pre-Footer Action Banner (Hidden on /contact to avoid repetition) */}
      {currentPage !== 'contact' && (
        <div className="border-b border-[#232938] py-12 sm:py-14 px-4 sm:px-8 bg-gradient-to-r from-[#141824] via-[#121620] to-[#141824]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest text-[#C59B27] font-semibold">
                Tenders & Technical Inquiries
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Planning a Project in Dubai?
              </h3>
              <p className="text-sm text-white/70">
                Submit your architectural drawings or schedule a consultation with our engineering managers in Al Qusais.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
                className="px-6 py-3.5 bg-[#B3261E] hover:bg-[#961F18] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 shadow-sm active:scale-98"
              >
                <span>ENQUIRY / RFQ</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C59B27]" />
                <span className="font-mono">{COMPANY_INFO.phone}</span>
              </a>

              <a
                href="https://wa.me/971565066904?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={(e) => handleLinkClick(e, 'home')} 
              className="cursor-pointer text-left focus:outline-none"
            >
              <KachorasLogo variant="light" />
            </button>

            <div className="text-[#C59B27] font-medium tracking-wide">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <p className="text-white/60 leading-relaxed text-xs max-w-sm">
              Established in 2006, <strong>Kachoras Electromechanical Contracting LLC</strong> is a Dubai Municipality G+1 licensed contractor specializing in luxury residences, royal majlis pavilions, civic infrastructure, and MEP engineering.
            </p>

            <div className="space-y-1.5 pt-2 text-[11px] text-white/70">
              <div>Commercial License No: <strong className="text-white font-mono">{COMPANY_INFO.licenseNumber}</strong></div>
              <div>Dubai Municipality: <strong className="text-emerald-400">G+1 Approved Contractor</strong></div>
              <div>D&B D-U-N-S: <strong className="text-white font-mono">{COMPANY_INFO.dunsNumber}</strong> • DCCI: <strong className="text-white font-mono">{COMPANY_INFO.dcciNo}</strong></div>
            </div>
          </div>

          {/* Contracting Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Disciplines</h4>
            <ul className="space-y-2 text-white/60">
              {CORE_CATEGORIES.map((s) => (
                <li key={s.id}>
                  <button 
                    onClick={(e) => handleLinkClick(e, 'services')} 
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Multi-Page Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Pages</h4>
            <ul className="space-y-2 text-white/60">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={(e) => handleLinkClick(e, item.id)} 
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Headquarters</h4>
            <div className="space-y-2 text-white/60 leading-relaxed">
              <p className="text-white/80">{COMPANY_INFO.address}</p>
              <p>P.O. Box: <strong className="text-white font-mono">{COMPANY_INFO.poBox}</strong></p>
              <p>Tel: <strong className="text-white font-mono">{COMPANY_INFO.phone}</strong></p>
              <p>Mobile: <strong className="text-white font-mono">{COMPANY_INFO.mobile}</strong></p>
              <p>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#C59B27] hover:underline">{COMPANY_INFO.email}</a> • <a href="mailto:info@kachoras.com" className="text-[#C59B27] hover:underline">info@kachoras.com</a></p>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="border-t border-[#232938] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <p>© 2006–2026 Kachoras Electromechanical Contracting LLC. All rights reserved.</p>
          <p>Dubai, United Arab Emirates • Government of Dubai Commercial License #578964</p>
        </div>
      </div>

    </footer>
  );
}
