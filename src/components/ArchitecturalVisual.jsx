import React, { useState } from 'react';
import { Building2, Home, Landmark, Cpu, Hammer, ShieldCheck, Layers, Eye } from 'lucide-react';

const getAssetForProject = (type = '', plotNo = '') => {
  const t = (type || '').toLowerCase();
  const p = (plotNo || '').toString().toLowerCase();

  // Specialized disciplines
  if (t.includes('majlis')) return '/assets/majlis.jpg';
  if (t.includes('municipality') || t.includes('clinic') || t.includes('park') || t.includes('sculpture') || t.includes('chamber') || t.includes('graveyard')) return '/assets/civic.jpg';
  if (t.includes('mep') || t.includes('electrical') || t.includes('hvac')) return '/assets/mep.jpg';
  if (t.includes('aluminium') || t.includes('glass') || t.includes('metal')) return '/assets/aluminium.jpg';
  
  // Specific villa plot mappings for diverse visuals across cards
  if (p.includes('4317233')) return '/assets/villa.jpg';          // Wadi Al Shabak Villa 1
  if (p.includes('4312137')) return '/assets/villa_stone.jpg';    // Wadi Al Shabak Villa 2 (Stone Facade)
  if (p.includes('3760253')) return '/assets/villa_glass.jpg';    // Al Barsha Second (Cantilever Glass)
  if (p.includes('4247036')) return '/assets/villa_arabic.jpg';   // Al Warqaa Villa (Contemporary Arabic)
  if (p.includes('7113697')) return '/assets/villa_stone.jpg';    // Al Awir Villa
  if (p.includes('6720582')) return '/assets/villa_annex.jpg';    // Al Barsha South Extension & Service Block
  if (p.includes('2631376')) return '/assets/villa_annex.jpg';    // Al Mizhar Service Block
  if (p.includes('3760283')) return '/assets/villa_glass.jpg';    // Al Barsha Second
  if (p.includes('4164036')) return '/assets/villa_arabic.jpg';   // Nadd Al Hamar
  if (p.includes('3670958')) return '/assets/majlis.jpg';         // Umm Al Sheif Majlis
  if (p.includes('6716536')) return '/assets/majlis.jpg';         // Al Barsha South Majlis
  if (p.includes('3761835')) return '/assets/majlis.jpg';         // Al Barsha Second Majlis
  if (p.includes('325-262')) return '/assets/villa_stone.jpg';    // Al Mizhar Villa

  return '/assets/villa.jpg';
};

export default function ArchitecturalVisual({ 
  type = 'villa', 
  plotNo = '', 
  location = '', 
  className = "w-full h-full",
  category = "Building Contracting"
}) {
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | 'blueprint'

  // Normalize visual type
  const normalizedType = (() => {
    const t = (type || '').toLowerCase();
    if (t.includes('majlis')) return 'majlis';
    if (t.includes('municipality') || t.includes('clinic') || t.includes('park') || t.includes('sculpture') || t.includes('chamber') || t.includes('graveyard')) return 'municipality';
    if (t.includes('mep') || t.includes('electrical') || t.includes('hvac')) return 'mep';
    if (t.includes('aluminium') || t.includes('glass') || t.includes('metal')) return 'aluminium';
    return 'villa';
  })();

  const imageSrc = getAssetForProject(type, plotNo);

  return (
    <div className={`relative overflow-hidden select-none group bg-[#111827] ${className}`}>
      
      {/* 1. Photorealistic View Mode */}
      {viewMode === 'photo' && (
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src={imageSrc} 
            alt={plotNo ? `Plot ${plotNo} Project in ${location}` : 'Kachoras Dubai Contracting Project'} 
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Ambient Luxury Dark Vignette for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0907]/90 via-[#0E0907]/20 to-transparent pointer-events-none" />
          
          {/* Subtle Golden Architectural Grid Overlay on hover */}
          <div className="absolute inset-0 bg-architect-grid opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none" />
        </div>
      )}

      {/* 2. Blueprint / CAD Elevation Mode */}
      {viewMode === 'blueprint' && (
        <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A120E] via-[#120B07] to-[#24130A] p-4">
          {/* CAD Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`cad-${plotNo || 'def'}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#C59B27" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#cad-${plotNo || 'def'})`} />
          </svg>

          {/* Villa Blueprint */}
          {normalizedType === 'villa' && (
            <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="210" x2="380" y2="210" stroke="#7A2E16" strokeWidth="2.5" />
              <rect x="70" y="210" width="260" height="8" fill="#4D1A0B" opacity="0.6" />
              <rect x="80" y="125" width="240" height="85" fill="#2A3442" stroke="#C59B27" strokeWidth="1.2" />
              <rect x="60" y="55" width="240" height="70" fill="#1C2430" stroke="#7A2E16" strokeWidth="1.5" />
              <path d="M50 55 L310 55" stroke="#C59B27" strokeWidth="3" />
              <line x1="70" y1="46" x2="290" y2="46" stroke="#C59B27" strokeWidth="1" strokeDasharray="4 4" />
              <rect x="80" y="70" width="90" height="42" fill="#3B82F6" fillOpacity="0.25" stroke="#93C5FD" strokeWidth="1" />
              <line x1="125" y1="70" x2="125" y2="112" stroke="#93C5FD" strokeWidth="0.8" />
              <rect x="55" y="105" width="30" height="20" fill="#93C5FD" fillOpacity="0.2" stroke="#C59B27" strokeWidth="1" />
              <rect x="180" y="145" width="45" height="65" fill="#7A2E16" stroke="#C59B27" strokeWidth="1.2" />
              <line x1="202" y1="145" x2="202" y2="210" stroke="#C59B27" strokeWidth="1" />
              <circle cx="198" cy="180" r="2" fill="#C59B27" />
              <rect x="100" y="145" width="60" height="45" fill="#3B82F6" fillOpacity="0.2" stroke="#93C5FD" strokeWidth="0.8" />
              <rect x="245" y="145" width="60" height="45" fill="#3B82F6" fillOpacity="0.2" stroke="#93C5FD" strokeWidth="0.8" />
              <line x1="230" y1="55" x2="230" y2="125" stroke="#C59B27" strokeWidth="1" />
              <line x1="240" y1="55" x2="240" y2="125" stroke="#C59B27" strokeWidth="1" />
              <line x1="250" y1="55" x2="250" y2="125" stroke="#C59B27" strokeWidth="1" />
              <line x1="260" y1="55" x2="260" y2="125" stroke="#C59B27" strokeWidth="1" />
              <text x="200" y="230" fill="#C59B27" fontSize="8" textAnchor="middle" fontFamily="monospace">DUBAI MUNICIPALITY G+1 VILLA ELEVATION</text>
            </svg>
          )}

          {/* Majlis Blueprint */}
          {normalizedType === 'majlis' && (
            <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="210" x2="380" y2="210" stroke="#7A2E16" strokeWidth="2.5" />
              <rect x="60" y="200" width="280" height="10" fill="#4D1A0B" stroke="#C59B27" strokeWidth="1" />
              <rect x="75" y="90" width="250" height="110" fill="#251F1C" stroke="#7A2E16" strokeWidth="1.5" />
              <path d="M 160 200 L 160 135 Q 200 95 240 135 L 240 200 Z" fill="#7A2E16" stroke="#C59B27" strokeWidth="1.8" />
              <rect x="95" y="125" width="45" height="55" rx="3" fill="#1C1815" stroke="#C59B27" strokeWidth="1" />
              <rect x="260" y="125" width="45" height="55" rx="3" fill="#1C1815" stroke="#C59B27" strokeWidth="1" />
              <path d="M 175 75 Q 200 45 225 75 Z" fill="#C59B27" fillOpacity="0.3" stroke="#C59B27" strokeWidth="1.2" />
              <text x="200" y="230" fill="#C59B27" fontSize="9" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">ROYAL ARABIAN MAJLIS SCHEMATIC</text>
            </svg>
          )}

          {/* Municipality Blueprint */}
          {normalizedType === 'municipality' && (
            <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="205" x2="380" y2="205" stroke="#059669" strokeWidth="2.5" />
              <rect x="90" y="205" width="220" height="25" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="90" y="95" width="220" height="110" fill="#182A24" stroke="#059669" strokeWidth="1.5" />
              <rect x="110" y="115" width="16" height="90" fill="#047857" stroke="#10B981" strokeWidth="1" />
              <rect x="150" y="115" width="16" height="90" fill="#047857" stroke="#10B981" strokeWidth="1" />
              <rect x="234" y="115" width="16" height="90" fill="#047857" stroke="#10B981" strokeWidth="1" />
              <rect x="274" y="115" width="16" height="90" fill="#047857" stroke="#10B981" strokeWidth="1" />
              <circle cx="200" cy="140" r="18" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />
              <path d="M 192 140 L 197 145 L 208 134" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
              <text x="200" y="48" fill="#34D399" fontSize="8" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.2">DUBAI MUNICIPALITY CIVIC CONTRACT</text>
            </svg>
          )}

          {/* MEP Blueprint */}
          {normalizedType === 'mep' && (
            <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="40" width="300" height="160" fill="#132338" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 70 70 L 330 70" stroke="#60A5FA" strokeWidth="12" strokeLinecap="round" />
              <rect x="105" y="105" width="30" height="12" fill="#93C5FD" rx="2" />
              <rect x="185" y="105" width="30" height="12" fill="#93C5FD" rx="2" />
              <rect x="265" y="105" width="30" height="12" fill="#93C5FD" rx="2" />
              <path d="M 70 170 L 160 170 L 160 135 L 240 135 L 240 170 L 330 170" stroke="#F59E0B" strokeWidth="3" fill="none" />
              <rect x="175" y="145" width="50" height="45" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
              <text x="200" y="222" fill="#60A5FA" fontSize="8" textAnchor="middle" fontFamily="monospace">ELECTROMECHANICAL & HVAC MEP BLUEPRINT</text>
            </svg>
          )}

          {/* Aluminium Blueprint */}
          {normalizedType === 'aluminium' && (
            <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="70" y="45" width="260" height="155" fill="#15202B" stroke="#94A3B8" strokeWidth="2" />
              <line x1="135" y1="45" x2="135" y2="200" stroke="#7A2E16" strokeWidth="5" />
              <line x1="200" y1="45" x2="200" y2="200" stroke="#7A2E16" strokeWidth="5" />
              <line x1="265" y1="45" x2="265" y2="200" stroke="#7A2E16" strokeWidth="5" />
              <line x1="70" y1="95" x2="330" y2="95" stroke="#7A2E16" strokeWidth="4" />
              <line x1="70" y1="145" x2="330" y2="145" stroke="#7A2E16" strokeWidth="4" />
              <text x="200" y="222" fill="#C59B27" fontSize="8" textAnchor="middle" fontFamily="monospace">BIN SOUGAT B-25 ALUMINIUM & GLASS FABRICATION</text>
            </svg>
          )}
        </div>
      )}

      {/* Interactive Render / CAD Switcher (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-30 flex items-center bg-black/80 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-xl">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('photo');
          }}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide transition flex items-center gap-1 ${
            viewMode === 'photo' 
              ? 'bg-[#7A2E16] text-white shadow-sm' 
              : 'text-white/60 hover:text-white'
          }`}
          title="View High-Resolution Architectural Photo"
        >
          <Eye className="w-3 h-3" />
          <span>Render</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('blueprint');
          }}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide transition flex items-center gap-1 ${
            viewMode === 'blueprint' 
              ? 'bg-[#C59B27] text-[#2E0E05] shadow-sm font-extrabold' 
              : 'text-white/60 hover:text-white'
          }`}
          title="View CAD Elevation Blueprint"
        >
          <Layers className="w-3 h-3" />
          <span>CAD</span>
        </button>
      </div>

      {/* Bottom Left Location Tag */}
      <div className="absolute bottom-3 left-3 z-20 text-white/90">
        <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-white/90 uppercase text-[9px] tracking-wider font-semibold">
          {location || 'Dubai, UAE'}
        </span>
      </div>

    </div>
  );
}
