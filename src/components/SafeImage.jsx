import React, { useState } from 'react';
import { Building2, Home, Hammer, ShieldCheck, HardHat, Compass } from 'lucide-react';

export default function SafeImage({ 
  src, 
  alt, 
  className = "w-full h-full object-cover", 
  category = "Construction",
  plotNo = ""
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback architectural pattern if external CDN fails or is blocked
  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#131B2A] via-[#0E1522] to-[#182338] relative flex flex-col items-center justify-center p-4 select-none overflow-hidden">
        {/* Architectural Blueprint Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        {/* Subtle geometric circles */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full border border-amber-500/20 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-amber-500/15 pointer-events-none" />

        {/* Central Graphic */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Building2 className="w-6 h-6 stroke-[1.8]" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400/90 block">
              KACHORAS SITE OPERATION
            </span>
            <span className="text-xs font-bold text-white font-display">
              {category || 'Dubai Municipality Site'}
            </span>
          </div>
          {plotNo && (
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
              Plot #{plotNo}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* Underlying architectural placeholder while image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center animate-pulse">
          <HardHat className="w-6 h-6 text-slate-700" />
        </div>
      )}

      <img
        src={src}
        alt=""
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </div>
  );
}
