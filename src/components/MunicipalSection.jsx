import React from 'react';
import { 
  Building, 
  MapPin, 
  CheckCircle2, 
  Award, 
  ShieldCheck,
  Trees,
  Volume2,
  Syringe,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DUBAI_MUNICIPALITY_PROJECTS } from '../data/mockData';

const ICONS = [Syringe, ShieldCheck, Layers, Trees, Volume2, Award];

export default function MunicipalSection() {
  return (
    <section id="municipal" className="py-24 bg-[#F4EFE6] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/10 border border-emerald-800/30 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Official Government Infrastructure • Dubai Municipality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-display">
            DUBAI MUNICIPALITY CIVIC CONTRACTS
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Proudly appointed by the <strong>Dubai Municipality General Maintenance Department</strong> to construct and upgrade public health facilities, public parks, hydraulic valve chambers, and civic structures across the Emirate.
          </p>
        </div>

        {/* Feature Split Banner: Civic Building Render & Credentials */}
        <div className="mb-14 bg-white border border-[#E5DED3] rounded-3xl overflow-hidden shadow-luxury grid lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative h-72 sm:h-84 lg:h-full min-h-[300px] overflow-hidden group">
            <picture className="w-full h-full">
              <source srcSet="./assets/civic.webp" type="image/webp" />
              <img 
                src="./assets/civic.jpg" 
                alt="Dubai Municipality Civic Project Specimen" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0907]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs">
              <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Dubai Municipality Standards</span>
              </span>
              <span className="font-mono text-[11px] text-amber-200">Plot #8912682 (Hatta)</span>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <span>Civic Partner Division</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-[#111827] font-display leading-tight">
              Executing Government Infrastructure Across Dubai & Hatta
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              From specialized foundation pours for public art in Al Barsha Pond Park to veterinary clinic modifications in Hatta and underground hydraulic chambers in Mirdif, Kachoras is trusted by Dubai Municipality for public safety and code compliance.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <div className="text-xl font-black text-[#7A2E16] font-display">100%</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Municipal Inspection Pass Rate</div>
              </div>
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <div className="text-xl font-black text-emerald-700 font-display">6+ Projects</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Delivered Public Infrastructure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dubai Municipality Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUBAI_MUNICIPALITY_PROJECTS.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div 
                key={item.id}
                className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-luxury hover:border-emerald-700 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#F4EFE6] border border-[#E5DED3] text-[#7A2E16] px-2.5 py-1 rounded-full font-mono">
                      Plot #{item.plotNo}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#111827] group-hover:text-emerald-800 transition-colors font-display leading-snug">
                      {item.projectDetails}
                    </h3>
                    <div className="text-xs text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{item.scope}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-[#F0EBE1]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Building className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                      <span className="truncate">Client: <strong className="text-slate-800">Dubai Municipality</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {item.status}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">DM Certified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
