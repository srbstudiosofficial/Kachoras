import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Hammer, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CORE_CATEGORIES } from '../data/mockData';
import ArchitecturalVisual from './ArchitecturalVisual';

const ICONS = {
  Building2,
  Cpu,
  ShieldCheck,
  Hammer
};

export default function CategoriesWheel({ onSelectServiceForQuote }) {
  const [activeCategory, setActiveCategory] = useState(CORE_CATEGORIES[0]);

  const IconComp = ICONS[activeCategory.icon] || Building2;

  return (
    <section id="services" className="py-24 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/30 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>The 4 Operational Pillars • Integrated Engineering & Construction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-display">
            CORE CONTRACTING CATEGORIES
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Kachoras integrates civil building contracting, specialized MEP engineering, in-house aluminium fabrication, and civic maintenance under unified Dubai Municipality G+1 management.
          </p>
        </div>

        {/* 4 Interactive Category Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
          {CORE_CATEGORIES.map((cat, idx) => {
            const Icon = ICONS[cat.icon] || Building2;
            const isSelected = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#7A2E16] text-white border-[#7A2E16] shadow-luxury'
                    : 'bg-white text-slate-800 border-[#E5DED3] hover:border-[#7A2E16]/60 hover:bg-[#FDFBF7]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-white/15 text-[#C59B27]' : 'bg-[#7A2E16]/10 text-[#7A2E16]'
                  }`}>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className={`font-bold text-base font-display ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-[#7A2E16]'}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-amber-200' : 'text-slate-500'}`}>
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Showcase of the Active Category */}
        <div className="bg-white rounded-3xl border border-[#E5DED3] shadow-luxury overflow-hidden">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Visual Architectural Schematic (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              <ArchitecturalVisual 
                type={activeCategory.id}
                plotNo="KACHORAS-B25"
                location="Dubai, UAE"
                category={activeCategory.title}
                className="w-full h-full min-h-[320px]"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-[#7A2E16] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md border border-[#C59B27]/40">
                  {activeCategory.title}
                </span>
              </div>
            </div>

            {/* Right Column: Detailed Engineering Scope & Deliverables (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#7A2E16] text-white flex items-center justify-center shadow-md">
                    <IconComp className="w-6 h-6 text-[#C59B27]" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-display">
                      {activeCategory.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#7A2E16]">
                      {activeCategory.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {activeCategory.description}
                </p>

                {/* Features & Deliverables Dual Checklist */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                      Execution Scope:
                    </span>
                    {activeCategory.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                      Included Approvals & Handover:
                    </span>
                    {activeCategory.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <FileCheck className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-900">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-500">
                  Dubai Municipality Approved Division • Self-Performing Workforce
                </span>

                <button
                  onClick={() => onSelectServiceForQuote(activeCategory.title)}
                  className="px-6 py-3 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 group"
                >
                  <span>Request Proposal for {activeCategory.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#C59B27]" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
