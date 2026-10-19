import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp, 
  Award,
  FileText,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO, CORE_CATEGORIES } from '../data/mockData';
import KachorasLogo from './KachorasLogo';

export default function Footer({ onOpenQuoteModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120A07] border-t border-[#7A2E16]/30 text-white/70 text-xs">
      
      {/* Top Luxury Banner */}
      <div className="bg-gradient-to-r from-[#5C200E] via-[#7A2E16] to-[#451608] text-white py-10 px-4 sm:px-8 border-b border-[#C59B27]/30 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C59B27]/40 text-[#C59B27] text-xs font-bold uppercase tracking-wider">
              <span>Dubai Municipality G+1 Building Contractor</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-display tracking-tight text-white">
              Planning a Villa, Majlis or MEP Project in Dubai?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              Consult directly with General Manager Jose K. George and our resident engineers.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-5 py-3.5 bg-black/40 hover:bg-black/60 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 border border-white/20 shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#C59B27]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-3.5 bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#C59B27] text-[#2E0E05] font-black rounded-xl text-xs hover:brightness-110 transition shadow-lg uppercase tracking-wider"
            >
              Request RFP / Proposal
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <KachorasLogo variant="light" />

            <div className="text-[#C59B27] font-semibold text-xs tracking-wide">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <p className="text-white/60 leading-relaxed text-xs max-w-sm">
              Established in 2006, Kachoras Electromechanical Contracting LLC is a premier Dubai Municipality G+1 licensed general and electromechanical contractor delivering private luxury villas, majlis halls, and government contracts across Dubai.
            </p>

            <div className="space-y-2 pt-2 text-[11px]">
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Commercial License No: <strong className="text-white">{COMPANY_INFO.licenseNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dubai Municipality: <strong className="text-white">G+1 Building License Holder</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <FileText className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>D&B D-U-N-S: <strong className="text-white">{COMPANY_INFO.dunsNumber}</strong> • DCCI: <strong className="text-white">{COMPANY_INFO.dcciNo}</strong></span>
              </div>
            </div>
          </div>

          {/* Core Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Contracting Sectors</h4>
            <ul className="space-y-2 text-white/60">
              {CORE_CATEGORIES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white transition">
                    {s.title}
                  </a>
                </li>
              ))}
              <li><a href="#services" className="hover:text-white transition">Gypsum & GRC Decor</a></li>
              <li><a href="#services" className="hover:text-white transition">Kitchens & Wardrobes</a></li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Company Records</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#vision" className="hover:text-white transition">Vision & Mission 2026</a></li>
              <li><a href="#portfolio" className="hover:text-white transition">Completed Villas (2024-2025)</a></li>
              <li><a href="#municipal" className="hover:text-white transition">Dubai Municipality Projects</a></li>
              <li><a href="#portfolio" className="hover:text-white transition">Active Projects In Hand</a></li>
              <li><a href="#license" className="hover:text-white transition">Official Trade License</a></li>
              <li><a href="#estimator" className="hover:text-white transition">Dubai Villa Cost Estimator</a></li>
              <li><a href="#location" className="hover:text-white transition">Al Qusais Warehouse Map</a></li>
            </ul>
          </div>

          {/* Headquarters Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Office Coordinates</h4>
            <div className="space-y-2 text-white/60">
              <p className="text-white/80">{COMPANY_INFO.address}</p>
              <p>Post Box: <strong className="text-white">{COMPANY_INFO.poBox}</strong></p>
              <p>Tel: <strong className="text-white">{COMPANY_INFO.phone}</strong></p>
              <p>Fax: <strong className="text-white/80">{COMPANY_INFO.fax}</strong></p>
              <p>Mobile: <strong className="text-[#C59B27]">{COMPANY_INFO.mobile}</strong></p>
              <p>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#C59B27] hover:underline">{COMPANY_INFO.email}</a></p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/40">
            © 2006–{new Date().getFullYear()} Kachoras Electromechanical Contracting LLC. All Rights Reserved. Dubai, U.A.E.
          </p>

          <div className="flex items-center gap-6 text-[11px] text-white/60">
            <span>Dubai Municipality Approved G+1 Contractor</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#C59B27] hover:text-white font-bold transition ml-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
