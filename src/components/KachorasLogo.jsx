import React from 'react';

export default function KachorasLogo({ className = "h-11", showTagline = true, variant = "dark" }) {
  // variant "dark" means dark text (for light background like navbar)
  // variant "light" means light text (for dark background like footer)
  const isLightText = variant === "light";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Geometric K Emblem */}
      <div className="relative w-11 h-11 shrink-0 bg-gradient-to-br from-[#7A2E16] via-[#652310] to-[#4D1A0B] p-2 rounded-xl shadow-md border border-[#C59B27]/40 flex items-center justify-center group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {/* Stylized Interlocking K in Warm Gold / Copper */}
          <path 
            d="M20 15 L20 85" 
            stroke="#C59B27" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          <path 
            d="M20 50 L75 15" 
            stroke="#F7EFCF" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          <path 
            d="M38 38 L80 85" 
            stroke="#C59B27" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          <path 
            d="M48 58 L70 85" 
            stroke="#943B20" 
            strokeWidth="8" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-xl font-black tracking-wider font-display ${isLightText ? 'text-white' : 'text-[#7A2E16]'}`}>
            KACHORAS
          </span>
          <span className="text-[10px] uppercase font-bold text-[#C59B27] tracking-widest px-1.5 py-0.5 rounded bg-[#C59B27]/10 border border-[#C59B27]/30">
            LLC
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] italic font-serif block -mt-0.5 tracking-tight ${isLightText ? 'text-amber-200/90' : 'text-[#652310]'}`}>
            Electromechanical Contracting LLC
          </span>
        )}
      </div>
    </div>
  );
}
