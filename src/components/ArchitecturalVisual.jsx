import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { resolveSafeAsset, useCoreLayout } from '../core/runtimeContext';

const getAssetForProject = (type = '', plotNo = '') => {
  const t = (type || '').toLowerCase();
  const p = (plotNo || '').toString().toLowerCase();

  // Specific real client projects from client archive
  if (p.includes('424-7036') || p.includes('4247036')) {
    return './assets/real-projects/completed-construction-albannay-424-7036.jpg';
  }
  if (p.includes('423-1407') || p.includes('4231407')) {
    return './assets/real-projects/completed-construction-shehab-423-1407.jpg';
  }
  if (p.includes('423-19966') || p.includes('42319966')) {
    return './assets/real-projects/completed-construction-alsaffar-423-19966.jpg';
  }
  if (p.includes('376-1176') || p.includes('3761176')) {
    return './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg';
  }
  if (p.includes('422-0200') || p.includes('4220200')) {
    return './assets/real-projects/completed-maintenance-alseraj-422-0200.jpg';
  }
  if (p.includes('422-0322') || p.includes('4220322')) {
    return './assets/real-projects/completed-maintenance-abdulrahman-422-0322.jpg';
  }
  if (p.includes('422-1513') || p.includes('4221513')) {
    return './assets/real-projects/completed-maintenance-basaeed-422-1513.jpg';
  }

  // Specialized disciplines
  if (t.includes('majlis')) {
    return './assets/real-projects/completed-maintenance-majlis-alabdulla-376-1176.jpg';
  }
  if (t.includes('curtain') || t.includes('aluminium') || t.includes('glass')) {
    return './assets/real-projects/completed-aluminum-flag-villa.jpg';
  }
  if (t.includes('civic') || t.includes('municipality')) {
    return './assets/real-projects/completed-maintenance-abdulrahman-422-0322.jpg';
  }
  if (t.includes('mep')) {
    return './assets/real-projects/completed-aluminum-flag-villa.jpg';
  }

  return './assets/real-projects/completed-construction-albannay-424-7036.jpg';
};

export default function ArchitecturalVisual({ 
  type = 'villa', 
  plotNo = '', 
  location = '', 
  className = "w-full h-full",
  category = "Building Contracting",
  image = ""
}) {
  const getSrc = () => {
    if (image) return image;
    return getAssetForProject(type, plotNo);
  };

  const [currentSrc, setCurrentSrc] = useState(getSrc);

  useEffect(() => {
    setCurrentSrc(getSrc());
  }, [image, type, plotNo]);

  return (
    <div className={`relative overflow-hidden select-none group bg-[#11161F] ${className}`}>
      {/* High-Resolution Architectural Photography */}
      <img 
        src={currentSrc} 
        alt={plotNo ? `Plot ${plotNo} Project in ${location}` : 'Kachoras Dubai Contracting Project'} 
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="eager"
        decoding="async"
        onError={() => {
          if (currentSrc !== './assets/real-projects/completed-construction-albannay-424-7036.jpg') {
            setCurrentSrc('./assets/real-projects/completed-construction-albannay-424-7036.jpg');
          }
        }}
      />

      {/* Elegant Architectural Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 via-[#0A0D14]/20 to-transparent pointer-events-none" />

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
