import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  MessageSquare,
  Award
} from 'lucide-react';
import { COMPANY_INFO, CORE_CATEGORIES } from '../data/mockData';
import KachorasLogo from './KachorasLogo';

export default function Footer({ onOpenQuoteModal }) {
  return (
    <footer className="bg-[#12161F] text-white border-t border-[#232938]">
      
      {/* Pre-Footer Action Banner */}
      <div className="border-b border-[#232938] py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-[#C59B27] font-semibold">
              Tenders & Technical Inquiries
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Planning a Project in Dubai?
            </h3>
            <p className="text-sm text-white/60">
              Submit your architectural drawings or schedule a consultation with our engineering managers in Al Qusais.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/971555585079?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Desk</span>
            </a>
            
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-6 py-3 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
            >
              Submit Tender / RFP
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <KachorasLogo variant="light" />

            <div className="text-[#C59B27] font-medium tracking-wide">
              كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
            </div>

            <p className="text-white/60 leading-relaxed text-xs max-w-sm">
              Established in 2006, Kachoras Electromechanical Contracting LLC is a Dubai Municipality G+1 licensed contractor specializing in luxury residences, royal majlis pavilions, civic infrastructure, and MEP engineering.
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
                  <a href="#services" className="hover:text-white transition">
                    {s.title}
                  </a>
                </li>
              ))}
              <li><a href="#services" className="hover:text-white transition">Thermal-Break Curtain Walls</a></li>
              <li><a href="#services" className="hover:text-white transition">DEWA Substation Fit-Outs</a></li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Navigation</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#vision" className="hover:text-white transition">Corporate Vision & Values</a></li>
              <li><a href="#services" className="hover:text-white transition">Contracting Disciplines</a></li>
              <li><a href="#municipal" className="hover:text-white transition">Dubai Municipality Contracts</a></li>
              <li><a href="#license" className="hover:text-white transition">Trade License Verification</a></li>
              <li><a href="#location" className="hover:text-white transition">Al Qusais Facility Map</a></li>
            </ul>
          </div>

          {/* Headquarters Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Coordinates</h4>
            <div className="space-y-2 text-white/60 leading-relaxed">
              <p className="text-white/80">{COMPANY_INFO.address}</p>
              <p>P.O. Box: <strong className="text-white font-mono">{COMPANY_INFO.poBox}</strong></p>
              <p>Tel: <strong className="text-white font-mono">{COMPANY_INFO.phone}</strong></p>
              <p>Mobile: <strong className="text-white font-mono">{COMPANY_INFO.mobile}</strong></p>
              <p>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#C59B27] hover:underline">{COMPANY_INFO.email}</a></p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-[#232938] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 text-[11px] text-white/40">
          <div>
            © 2006–2026 Kachoras Electromechanical Contracting LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1">
            <span>Dubai, United Arab Emirates</span>
            <span>•</span>
            <span>Government of Dubai DET License #578964</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
