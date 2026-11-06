import React from 'react';
import { ShieldCheck, ChevronRight, Home, Building2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function PageHeader({ title, subtitle, breadcrumb, onNavigate }) {
  return (
    <div className="relative bg-[#121620] text-white pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-8 border-b border-[#232A38] overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C59B27 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#B3261E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <nav className="flex items-center space-x-2 text-xs text-white/60 font-medium">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="flex items-center gap-1.5 hover:text-[#C59B27] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-white font-semibold text-[#C59B27]">{breadcrumb || title}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-white/80 font-medium backdrop-blur-sm max-w-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate sm:whitespace-normal">Dubai Municipality Approved G+1 Contractor • License #{COMPANY_INFO.licenseNumber}</span>
          </div>
        </div>

        {/* Grand Headline */}
        <div className="max-w-3xl space-y-2.5 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-base text-white/70 leading-relaxed font-sans">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
