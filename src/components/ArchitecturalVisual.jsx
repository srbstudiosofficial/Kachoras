import React from 'react';
import { MapPin, Building2 } from 'lucide-react';

const getAssetForProject = (type = '', plotNo = '') => {
  const t = (type || '').toLowerCase();
  const p = (plotNo || '').toString().toLowerCase();

  // Specialized disciplines
  if (t.includes('majlis')) return './assets/majlis.jpg';
  if (t.includes('municipality') || t.includes('clinic') || t.includes('park') || t.includes('sculpture') || t.includes('chamber') || t.includes('graveyard')) return './assets/civic.jpg';
  if (t.includes('mep') || t.includes('electrical') || t.includes('hvac')) return './assets/mep.jpg';
  if (t.includes('aluminium') || t.includes('glass') || t.includes('metal')) return './assets/aluminium.jpg';
  
  // Specific villa plot mappings
  if (p.includes('4317233')) return './assets/villa.jpg';          // Wadi Al Shabak Villa 1
  if (p.includes('4312137')) return './assets/villa_stone.jpg';    // Wadi Al Shabak Villa 2
  if (p.includes('3760253')) return './assets/villa_glass.jpg';    // Al Barsha Second
  if (p.includes('4247036')) return './assets/villa_arabic.jpg';   // Al Warqaa Villa
  if (p.includes('7113697')) return './assets/villa_stone.jpg';    // Al Awir Villa
  if (p.includes('6720582')) return './assets/villa_annex.jpg';    // Al Barsha South Extension
  if (p.includes('2631376')) return './assets/villa_annex.jpg';    // Al Mizhar Service Block
  if (p.includes('3760283')) return './assets/villa_glass.jpg';    // Al Barsha Second
  if (p.includes('4164036')) return './assets/villa_arabic.jpg';   // Nadd Al Hamar
  if (p.includes('3670958')) return './assets/majlis.jpg';         // Umm Al Sheif Majlis
  if (p.includes('6716536')) return './assets/majlis.jpg';         // Al Barsha South Majlis
  if (p.includes('3761835')) return './assets/majlis.jpg';         // Al Barsha Second Majlis
  if (p.includes('325-262')) return './assets/villa_stone.jpg';    // Al Mizhar Villa

  return './assets/villa.jpg';
};

export default function ArchitecturalVisual({ 
  type = 'villa', 
  plotNo = '', 
  location = '', 
  className = "w-full h-full",
  category = "Building Contracting"
}) {
  const imageSrc = getAssetForProject(type, plotNo);

  return (
    <div className={`relative overflow-hidden select-none group bg-[#11161F] ${className}`}>
      {/* High-Resolution Architectural Photography with WebP Source */}
      <picture className="w-full h-full block">
        <source srcSet={imageSrc.replace(/\.jpg$/, '.webp')} type="image/webp" />
        <img 
          src={imageSrc} 
          alt={plotNo ? `Plot ${plotNo} Project in ${location}` : 'Kachoras Dubai Contracting Project'} 
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          decoding="async"
        />
      </picture>

      {/* Elegant Architectural Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/90 via-[#0A0D14]/25 to-transparent pointer-events-none" />

      {/* Subtle Bottom Technical Overlay */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-medium border border-white/10 text-white/90">
          <MapPin className="w-3 h-3 text-[#C59B27]" />
          <span>{location || 'Dubai, UAE'}</span>
        </span>

        {plotNo && (
          <span className="font-mono text-[10px] text-amber-200/90 font-medium bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
            Plot {plotNo}
          </span>
        )}
      </div>
    </div>
  );
}
