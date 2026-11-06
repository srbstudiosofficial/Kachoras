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
import { useCoreLayout } from '../core/runtimeContext';

export default function Navbar({ currentPage = 'home', onNavigate, onOpenQuoteModal }) {
  try { useCoreLayout(); } catch (err) { return null; }

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'services', label: 'Disciplines', href: '/services' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'license', label: 'License & Compliance', href: '/license' },
    { id: 'contact', label: 'Contact & Tender', href: '/contact' }
  ];

  const handleNavClick = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Corporate Strip - Responsive across all phone sizes */}
      <div className="bg-[#14171F] border-b border-[#242A38] text-white/80 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
          
          <div className="flex items-center space-x-2 sm:space-x-4 text-center sm:text-left">
            <span className="flex items-center text-white/90 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 shrink-0" />
              <span className="hidden sm:inline">Dubai Municipality Approved G+1 Contractor • </span>License #{COMPANY_INFO.licenseNumber}
            </span>
            <span className="hidden lg:inline-block text-white/20">|</span>
            <span className="hidden lg:flex items-center text-white/60">
              Al Qusais Industrial 1, Warehouse B-25, Dubai
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href="https://wa.me/971565066904?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project%20in%20Dubai." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <MessageSquare className="w-3 h-3 shrink-0" />
              <span>WhatsApp Inquiries</span>
            </a>

            <span className="text-white/20">|</span>

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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5DED3] py-2 sm:py-2.5' 
          : 'bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E5DED3]/70 py-2.5 sm:py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={(e) => handleNavClick(e, 'home')} 
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
            aria-label="Kachoras Home"
          >
            <KachorasLogo />
          </button>

          {/* Desktop Multi-Page Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (currentPage === 'project-detail' && item.id === 'projects');
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3 py-2 text-xs rounded-xl transition-all relative ${
                    isActive 
                      ? 'text-[#B3261E] bg-[#B3261E]/10 font-black shadow-inner' 
                      : 'text-slate-700 hover:text-[#B3261E] hover:bg-[#F2ECE1]/60 font-semibold'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B3261E] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-2 text-xs font-bold bg-[#B3261E] hover:bg-[#961F18] text-white px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>ENQUIRY / RFQ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button & Quick RFQ */}
          <div className="flex items-center space-x-2 lg:hidden shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="text-xs font-bold bg-[#B3261E] text-white px-3 py-2 rounded-lg shrink-0 min-h-[38px] flex items-center justify-center shadow-sm active:scale-95 transition"
            >
              RFP
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#B3261E] focus:outline-none bg-[#FAF8F5] rounded-lg border border-[#E5DED3] min-w-[40px] min-h-[40px] flex items-center justify-center active:scale-95 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5DED3] p-4 sm:p-5 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (currentPage === 'project-detail' && item.id === 'projects');
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block px-4 py-3 text-sm rounded-xl transition flex items-center justify-between ${
                    isActive 
                      ? 'bg-[#B3261E] text-white font-bold' 
                      : 'text-slate-800 hover:bg-[#FAF8F5] font-semibold'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#C59B27]">Active</span>}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5DED3] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3.5 bg-[#B3261E] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-2 min-h-[44px] shadow-md active:scale-95 transition cursor-pointer"
            >
              <span>Submit Tender / RFQ</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
