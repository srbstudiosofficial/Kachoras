import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Hammer, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  FileCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { CORE_CATEGORIES } from '../data/mockData';
import SafeImage from './SafeImage';

const ICON_MAP = {
  Building2,
  Cpu,
  ShieldCheck,
  Hammer
};

export default function Services({ onSelectServiceForQuote }) {
  const [activeModalService, setActiveModalService] = useState(null);

  return (
    <section id="services" className="py-24 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>Core Business Sectors • Turnkey Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              CORE CONTRACTING DISCIPLINES
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Kachoras Electromechanical Contracting LLC integrates civil building contracting, specialized MEP engineering, in-house aluminium fabrication, and government-approved maintenance under one roof.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Dubai Municipality G+1 Licensed Operations</span>
          </div>
        </div>

        {/* 4 Main Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {CORE_CATEGORIES.map((service, idx) => {
            const IconComponent = ICON_MAP[service.icon] || Building2;
            return (
              <div
                key={service.id}
                className="bg-[#121A27] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <SafeImage 
                      src={service.image} 
                      alt={service.title}
                      category={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121A27] via-[#121A27]/50 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950/80 text-amber-400 border border-slate-700/80 px-3 py-1 rounded-full shadow-lg">
                        Category 0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-bold text-white bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors font-display">
                        {service.title}
                      </h3>
                      <p className="text-xs text-amber-500 font-medium mt-1">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition text-center"
                  >
                    View Scope & Deliverables
                  </button>
                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="py-3 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <span>RFQ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Scope Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#121A27] border border-slate-700 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
                {(() => {
                  const Icon = ICON_MAP[activeModalService.icon] || Building2;
                  return <Icon className="w-6 h-6 stroke-[2.5]" />;
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">{activeModalService.title}</h3>
                <p className="text-xs text-amber-400 font-semibold">{activeModalService.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeModalService.description}
            </p>

            {/* Scope Capabilities */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Technical Scope & Execution</h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {activeModalService.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Deliverables */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Included Deliverables & Approvals</h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {activeModalService.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80 text-xs text-amber-300 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForQuote(s);
                }}
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg"
              >
                Request Proposal for this Discipline →
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
