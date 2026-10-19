import React from 'react';
import { 
  Building2, 
  Cpu, 
  Layers, 
  Landmark, 
  ArrowRight, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { CORE_CATEGORIES } from '../data/mockData';

const DISCIPLINE_ASSETS = {
  construction: {
    tag: 'G+1 Villa Contracting',
    image: './assets/villa.jpg',
    webp: './assets/villa.webp',
    details: 'Ground-up civil execution, structural substructures, luxury G+1 villas, and Arabian majlis blocks.'
  },
  mep: {
    tag: 'Electromechanical Engineering',
    image: './assets/mep.jpg',
    webp: './assets/mep.webp',
    details: 'Ducted HVAC systems, DEWA-approved electrical substations, plumbing, and building management networks.'
  },
  aluminium: {
    tag: 'Aluminium & Glass Fabrication',
    image: './assets/aluminium.jpg',
    webp: './assets/aluminium.webp',
    details: 'Manufactured at our Al Qusais B-25 fabrication workshop: curtain walls, structural glazing, and thermal-break systems.'
  },
  maintenance: {
    tag: 'Dubai Civic & Maintenance',
    image: './assets/civic.jpg',
    webp: './assets/civic.webp',
    details: 'Municipal civic contracts, hydraulic valve chambers, public park infrastructure, and commercial refurbishment.'
  }
};

export default function CategoriesWheel({ onSelectServiceForQuote }) {
  return (
    <section id="services" className="py-24 bg-[#F5F2EB] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3 reveal-on-scroll reveal-init">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Capabilities & Contracting Scope
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Core Contracting Disciplines
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Kachoras integrates civil building contracting, specialized MEP engineering, in-house aluminium fabrication, and civic infrastructure under unified Dubai Municipality G+1 management.
          </p>
        </div>

        {/* 4 Architectural Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_CATEGORIES.map((cat, idx) => {
            const asset = DISCIPLINE_ASSETS[cat.id] || DISCIPLINE_ASSETS.construction;
            return (
              <div
                key={cat.id}
                data-delay={idx * 150}
                className="bg-white rounded-2xl border border-[#E5DED3] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#7A2E16] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group reveal-on-scroll reveal-init shimmer-trigger"
              >
                <div>
                  {/* Discipline Photography */}
                  <div className="h-48 overflow-hidden relative">
                    <picture className="w-full h-full block">
                      <source srcSet={asset.webp} type="image/webp" />
                      <img 
                        src={asset.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[10px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-200 block">
                        {asset.tag}
                      </span>
                      <h3 className="text-base font-bold font-display text-white mt-0.5">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {asset.details}
                    </p>

                    {/* Key Technical Deliverables */}
                    <ul className="space-y-1.5 pt-1 text-xs text-slate-700">
                      {cat.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A2E16] shrink-0 mt-1.5" />
                          <span className="leading-snug text-[11px] text-slate-600 font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0 border-t border-[#F2ECE1] mt-2">
                  <button
                    onClick={() => onSelectServiceForQuote && onSelectServiceForQuote(cat.title)}
                    className="w-full min-h-[44px] pt-1 flex items-center justify-between text-xs font-bold text-[#7A2E16] group-hover:text-[#5C200E] transition cursor-pointer"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
