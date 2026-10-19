import React from 'react';
import { 
  Building, 
  MapPin, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { DUBAI_MUNICIPALITY_PROJECTS } from '../data/mockData';

export default function MunicipalSection() {
  return (
    <section id="municipal" className="py-24 bg-[#FAF9F6] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3 reveal-on-scroll reveal-init">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-800 block">
            Government Framework • Civic Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Dubai Municipality Civic Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Appointed by the <strong>Dubai Municipality General Maintenance Department</strong> to execute public health centers, municipal parks, hydraulic installations, and civic infrastructure across Dubai and Hatta.
          </p>
        </div>

        {/* Feature Split Banner: Civic Building Render & Credentials */}
        <div className="mb-14 bg-white border border-[#E5DED3] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 grid lg:grid-cols-12 items-center reveal-on-scroll reveal-init shimmer-trigger">
          <div className="lg:col-span-6 relative h-72 sm:h-80 lg:h-full min-h-[320px] overflow-hidden group">
            <picture className="w-full h-full block">
              <source srcSet="./assets/civic.webp" type="image/webp" />
              <img 
                src="./assets/civic.jpg" 
                alt="Dubai Municipality Civic Project Specimen" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs">
              <span className="bg-emerald-700/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-semibold tracking-wide">
                Dubai Municipality General Maintenance Dept
              </span>
              <span className="font-mono text-[11px] text-amber-200">Plot #8912682 (Hatta)</span>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Civic Infrastructure Department
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-[#14171F] font-display leading-tight">
              Executing Public Infrastructure Across Dubai & Hatta
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              From specialized foundation pours for civic sculpture installations in Al Barsha Pond Park to municipal veterinary clinics in Hatta and underground hydraulic chambers in Mirdif, Kachoras is trusted by Dubai Municipality engineers for rigorous safety and code compliance.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE9DF]">
                <div className="text-2xl font-bold text-[#7A2E16] font-display">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Municipal Inspection Pass Rate</div>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE9DF]">
                <div className="text-2xl font-bold text-emerald-800 font-display">6+ Contracts</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Delivered Public Facilities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dubai Municipality Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUBAI_MUNICIPALITY_PROJECTS.map((item, idx) => (
            <div 
              key={item.id}
              data-delay={idx * 150}
              className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-emerald-700 hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll reveal-init shimmer-trigger"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {item.scope}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5DED3]">
                    Plot #{item.plotNo}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#14171F] group-hover:text-emerald-900 transition-colors font-display leading-snug">
                    {item.projectDetails}
                  </h3>
                </div>

                <div className="space-y-1 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Client: <strong className="text-slate-700">Dubai Municipality</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {item.status}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">DM Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
