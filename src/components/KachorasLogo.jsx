import React from 'react';

export default function KachorasLogo({ 
  className = "h-11", 
  showTagline = true, 
  variant = "dark" 
}) {
  // variant "dark" = dark text for light backgrounds (Navbar)
  // variant "light" = light text for dark backgrounds (Footer)
  const isLightText = variant === "light";

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* 3D Chamfered Architectural "K" Crest */}
      <div className="relative w-11 h-11 shrink-0 group-hover:scale-105 transition-transform duration-300">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-[0_4px_10px_rgba(122,46,22,0.3)]" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shield Background Radial */}
            <radialGradient id="kCrestBg" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#5E1D0C" />
              <stop offset="55%" stopColor="#2E0E05" />
              <stop offset="100%" stopColor="#12151D" />
            </radialGradient>

            {/* Brushed Champagne Gold Facets */}
            <linearGradient id="kGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5D6" />
              <stop offset="50%" stopColor="#E5C368" />
              <stop offset="100%" stopColor="#C59B27" />
            </linearGradient>

            <linearGradient id="kGoldMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECC666" />
              <stop offset="60%" stopColor="#B88A1E" />
              <stop offset="100%" stopColor="#7A580E" />
            </linearGradient>

            <linearGradient id="kGoldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8F6813" />
              <stop offset="50%" stopColor="#593E07" />
              <stop offset="100%" stopColor="#301F02" />
            </linearGradient>

            <linearGradient id="kRimGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF0BE" />
              <stop offset="50%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#8C6514" />
            </linearGradient>
          </defs>

          {/* Base Crest Shield */}
          <rect 
            x="4" 
            y="4" 
            width="92" 
            height="92" 
            rx="22" 
            fill="url(#kCrestBg)" 
            stroke="url(#kRimGold)" 
            strokeWidth="1.75" 
          />

          {/* Precision Inset Drafting Dashed Border */}
          <rect 
            x="9" 
            y="9" 
            width="82" 
            height="82" 
            rx="17" 
            fill="none" 
            stroke="#E5C368" 
            strokeWidth="0.75" 
            strokeDasharray="3 2" 
            opacity="0.35" 
          />

          {/* 1. Left Vertical Structural Column (Faceted 3D) */}
          <polygon points="26,22 34,18 34,50 26,50" fill="url(#kGoldLight)" />
          <polygon points="34,18 42,22 42,50 34,50" fill="url(#kGoldMid)" />
          <polygon points="26,50 34,50 34,82 26,78" fill="url(#kGoldMid)" />
          <polygon points="34,50 42,50 42,78 34,82" fill="url(#kGoldShadow)" />

          {/* 2. Upper Cantilever Arm (45° Architectural Rafter) */}
          <polygon points="42,46 58,32 74,18 78,24 50,52" fill="url(#kGoldLight)" />
          <polygon points="50,52 78,24 82,30 54,58" fill="url(#kGoldShadow)" />
          <polygon points="74,18 82,30 78,24" fill="url(#kGoldMid)" />

          {/* 3. Lower Diagonal Strut (Electromechanical Conduit) */}
          <polygon points="44,54 52,48 78,74 70,82" fill="url(#kGoldMid)" />
          <polygon points="44,54 70,82 60,82 38,58" fill="url(#kGoldShadow)" />

          {/* 4. Central Keystone Nexus (Locking Diamond) */}
          <polygon points="38,50 45,43 52,50 45,57" fill="url(#kGoldLight)" stroke="#FFF5D6" strokeWidth="0.5" />

          {/* Architectural Polished Ridge Bevels */}
          <line x1="34" y1="18" x2="34" y2="82" stroke="#FFF5D6" strokeWidth="0.75" opacity="0.6" />
          <polyline points="26,22 34,18 42,22" fill="none" stroke="url(#kRimGold)" strokeWidth="1" />
          <polyline points="26,78 34,82 42,78" fill="none" stroke="url(#kRimGold)" strokeWidth="1" />

          {/* Registration Micro-Marks */}
          <circle cx="18" cy="18" r="1.2" fill="#E5C368" opacity="0.5" />
          <circle cx="82" cy="82" r="1.2" fill="#E5C368" opacity="0.5" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        {/* Primary Wordmark with Licensure Grade */}
        <div className="flex items-baseline gap-2">
          <span 
            className={`text-[20px] font-bold tracking-[0.16em] uppercase font-display leading-none transition-colors ${
              isLightText ? 'text-white' : 'text-[#14171F]'
            }`}
          >
            Kachoras
          </span>

          <span className="text-[10px] font-semibold tracking-wider text-[#C59B27] uppercase px-1.5 py-0.5 rounded bg-[#C59B27]/10 border border-[#C59B27]/30">
            G+1
          </span>
        </div>

        {/* Secondary Subtitle / Official Legal Translation */}
        {showTagline && (
          <div className="flex items-center gap-2 mt-1">
            <span 
              className={`text-[9.5px] uppercase tracking-[0.18em] font-medium leading-none ${
                isLightText ? 'text-[#ECC768]/90' : 'text-[#7A2E16]'
              }`}
            >
              Electromechanical Contracting L.L.C.
            </span>
            <span className={`text-[10px] font-normal leading-none font-sans hidden sm:inline-block ${
              isLightText ? 'text-white/40' : 'text-slate-400'
            }`}>
              •
            </span>
            <span 
              className={`text-[10px] font-medium leading-none hidden sm:inline-block tracking-normal ${
                isLightText ? 'text-white/70' : 'text-slate-600'
              }`}
              dir="rtl"
            >
              كاشوراس للمقاولات
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
