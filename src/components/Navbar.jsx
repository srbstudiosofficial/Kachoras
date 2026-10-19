import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import KachorasLogo from './KachorasLogo';

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#vision" },
    { label: "Disciplines", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Municipal", href: "#municipal" },
    { label: "License", href: "#license" },
    { label: "Location", href: "#location" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Corporate Strip */}
      <div className="bg-[#14171F] border-b border-[#242A38] text-white/80 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 text-[11px]">
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="flex items-center text-white/90 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
              Dubai Municipality Approved G+1 Contractor • License #{COMPANY_INFO.licenseNumber}
            </span>
            <span className="hidden lg:inline-block text-white/20">|</span>
            <span className="hidden lg:flex items-center text-white/60">
              Al Qusais Industrial 1, Warehouse B-25, Dubai
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <a 
              href="https://wa.me/971555585079?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project%20in%20Dubai." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Inquiries</span>
            </a>

            <span className="hidden sm:inline-block text-white/20">|</span>

            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="flex items-center text-white/90 hover:text-white transition font-medium"
            >
              <span>Tel: <strong className="text-white font-mono">{COMPANY_INFO.phone}</strong></span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5DED3] py-3' 
          : 'bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-[#E5DED3]/60 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <KachorasLogo />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#7A2E16] hover:bg-[#F2ECE1]/60 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-2 text-xs font-bold bg-[#7A2E16] hover:bg-[#652310] text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shimmer-trigger active:scale-95"
            >
              <span>Submit Tender / RFP</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="text-xs font-bold bg-[#7A2E16] text-white px-3 py-2 rounded-lg shrink-0 min-h-[38px] flex items-center justify-center shadow-sm active:scale-95 transition"
            >
              RFP
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#7A2E16] focus:outline-none bg-[#FAF8F5] rounded-lg border border-[#E5DED3] min-w-[40px] min-h-[40px] flex items-center justify-center active:scale-95 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5DED3] p-4 sm:p-5 shadow-xl space-y-3 sm:space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#FAF8F5] rounded-lg transition min-h-[40px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5DED3] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 bg-[#7A2E16] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-2 min-h-[44px] shadow-md active:scale-95 transition"
            >
              <span>Submit Tender / RFP</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
