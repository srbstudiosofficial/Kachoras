import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowRight, 
  Clock, 
  MapPin, 
  MessageSquare,
  ChevronRight
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
    { label: "About & Vision", href: "#vision" },
    { label: "Categories", href: "#services" },
    { label: "Project Portfolio", href: "#portfolio", badge: "20 Yrs" },
    { label: "Dubai Municipality", href: "#municipal" },
    { label: "Trade License", href: "#license" },
    { label: "AED Estimator", href: "#estimator" },
    { label: "Location Map", href: "#location" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Corporate Strip in Deep Mahogany / Bronze */}
      <div className="bg-[#5C200E] border-b border-[#7A2E16] text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="flex items-center text-[#F4E8C1] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#C59B27]" />
              Dubai Municipality G+1 Approved • Commercial License #{COMPANY_INFO.licenseNumber}
            </span>
            <span className="hidden lg:inline-block text-[#943B20]">|</span>
            <span className="hidden lg:flex items-center text-amber-100/80">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#C59B27]" />
              Al Qusais Industrial 1, Warehouse B-25, Dubai
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            {/* Direct WhatsApp Callout */}
            <a 
              href="https://wa.me/971555585079?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project%20in%20Dubai." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#34D399] hover:text-emerald-300 font-bold transition text-[11px] bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40"
            >
              <MessageSquare className="w-3 h-3 text-[#34D399]" />
              <span>WhatsApp Inquiries</span>
            </a>

            <span className="hidden sm:inline-block text-[#943B20]">|</span>

            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="flex items-center text-white hover:text-[#C59B27] transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#C59B27]" />
              <span>Tel: <strong className="tracking-wide">{COMPANY_INFO.phone}</strong></span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Luxury Navigation Bar in Warm Cream / Ivory */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-luxury border-b border-[#E5DED3] py-3' 
          : 'bg-[#FBF9F5]/90 backdrop-blur-sm border-b border-[#E5DED3]/60 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo with English & Arabic */}
          <a href="#" className="flex items-center gap-3 group">
            <KachorasLogo />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#7A2E16] hover:bg-[#F4EFE6] rounded-lg transition-colors relative group"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 text-[9px] uppercase font-black bg-[#7A2E16]/10 text-[#7A2E16] border border-[#7A2E16]/25 px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#7A2E16] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-2 text-xs font-black bg-[#7A2E16] hover:bg-[#652310] text-white px-5 py-2.5 rounded-xl shadow-md transition transform active:scale-95 border border-[#C59B27]/40"
            >
              <span>Request Quote / RFQ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 xl:hidden">
            <button
              onClick={() => onOpenQuoteModal()}
              className="text-xs font-bold bg-[#7A2E16] text-white px-3 py-2 rounded-lg"
            >
              RFQ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#7A2E16] focus:outline-none bg-[#F4EFE6] rounded-lg border border-[#E5DED3]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FBF9F5] border-b border-[#E5DED3] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-bold text-slate-800 hover:bg-[#F4EFE6] hover:text-[#7A2E16] transition"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5DED3] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#7A2E16] text-white font-bold rounded-xl shadow-md text-xs uppercase"
            >
              <span>Submit Project Proposal / RFQ</span>
              <ArrowRight className="w-4 h-4 text-[#C59B27]" />
            </button>

            <a
              href="https://wa.me/971555585079"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+971 55 5585079)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
