import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Maximize2, 
  ArrowUpRight, 
  X, 
  CheckCircle2, 
  User, 
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  COMPLETED_PROJECTS_VILLAS, 
  DUBAI_MUNICIPALITY_PROJECTS, 
  ONGOING_PROJECTS 
} from '../data/mockData';
import ArchitecturalVisual from './ArchitecturalVisual';

export default function Portfolio({ onInquireSimilar }) {
  const [activeTab, setActiveTab] = useState("all");
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Unified items
  const allProjects = [
    ...COMPLETED_PROJECTS_VILLAS.map(p => ({ ...p, sectionType: 'villa', visualType: 'villa' })),
    ...DUBAI_MUNICIPALITY_PROJECTS.map(p => ({ ...p, sectionType: 'municipality', visualType: 'municipality' })),
    ...ONGOING_PROJECTS.map(p => ({ 
      ...p, 
      sectionType: 'ongoing',
      category: 'Current Works in Progress',
      consultant: 'Active Field Execution',
      visualType: (p.type && p.type.toLowerCase().includes('majlis')) ? 'majlis' : 'villa'
    }))
  ];

  const filteredProjects = activeTab === "all" 
    ? allProjects 
    : activeTab === "villas"
    ? allProjects.filter(p => p.sectionType === 'villa')
    : activeTab === "municipality"
    ? allProjects.filter(p => p.sectionType === 'municipality')
    : allProjects.filter(p => p.sectionType === 'ongoing');

  return (
    <section id="portfolio" className="py-24 bg-[#FBF9F5] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/30 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Dubai Engineering Portfolio • 20-Year Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-display">
            COMPLETED LANDMARKS & ACTIVE SITES
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Every project below represents certified civil construction and electromechanical works verified under Dubai Municipality regulations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "all"
                ? 'bg-[#7A2E16] text-white shadow-luxury scale-105 border border-[#C59B27]/40'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#F4EFE6]'
            }`}
          >
            All Projects ({allProjects.length})
          </button>
          
          <button
            onClick={() => setActiveTab("villas")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "villas"
                ? 'bg-[#7A2E16] text-white shadow-luxury scale-105 border border-[#C59B27]/40'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#F4EFE6]'
            }`}
          >
            Private Luxury Villas ({COMPLETED_PROJECTS_VILLAS.length})
          </button>

          <button
            onClick={() => setActiveTab("municipality")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "municipality"
                ? 'bg-[#7A2E16] text-white shadow-luxury scale-105 border border-[#C59B27]/40'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#F4EFE6]'
            }`}
          >
            Dubai Municipality Works ({DUBAI_MUNICIPALITY_PROJECTS.length})
          </button>

          <button
            onClick={() => setActiveTab("ongoing")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              activeTab === "ongoing"
                ? 'bg-[#7A2E16] text-white shadow-luxury scale-105 border border-[#C59B27]/40'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#F4EFE6]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Works in Progress ({ONGOING_PROJECTS.length})</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveModalProject(proj)}
              className="bg-white border border-[#E5DED3] rounded-2xl overflow-hidden shadow-luxury hover:border-[#7A2E16] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* 100% Reliable Architectural Elevation Header */}
                <div className="relative h-52 overflow-hidden border-b border-[#E5DED3]">
                  <ArchitecturalVisual 
                    type={proj.visualType || proj.sectionType}
                    plotNo={proj.plotNo}
                    location={proj.location}
                    category={proj.type || proj.category}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Status & Plot Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                    <span className="bg-[#111827]/90 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#C59B27] font-mono shadow-md">
                      Plot #{proj.plotNo}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                      proj.status.includes('Completed') 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#7A2E16] text-white'
                    }`}>
                      {proj.status.includes('Completed') ? 'Handed Over' : 'Active Site'}
                    </span>
                  </div>

                  {/* Inspect CTA Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px] z-30">
                    <span className="bg-[#7A2E16] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xl border border-[#C59B27]/40">
                      <span>View Specifications</span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#C59B27]" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2E16] bg-[#7A2E16]/10 px-2.5 py-0.5 rounded-full">
                      {proj.category || (proj.sectionType === 'municipality' ? 'Dubai Municipality Civic' : 'Private G+1 Villa')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#7A2E16] transition-colors shrink-0" />
                  </div>

                  <h3 className="text-base font-bold text-[#111827] group-hover:text-[#7A2E16] transition-colors font-display line-clamp-2 leading-snug">
                    {proj.projectDetails}
                  </h3>

                  {/* Metadata Matrix */}
                  <div className="space-y-2 pt-3 border-t border-[#F0EBE1] text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <User className="w-3.5 h-3.5 text-[#7A2E16] shrink-0" />
                      <span className="truncate">Client: <strong className="text-slate-900">{proj.client}</strong></span>
                    </div>

                    {proj.consultant && (
                      <div className="flex items-center gap-2 text-slate-700">
                        <Briefcase className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                        <span className="truncate">Consultant: <strong className="text-slate-900">{proj.consultant}</strong></span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">Location: <strong className="text-slate-900">{proj.location}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-[#FAF7F2] border-t border-[#E5DED3] text-[11px] text-slate-500 flex justify-between items-center">
                <span>Dubai Municipality Approved Project</span>
                <span className="text-[#7A2E16] font-bold group-hover:underline">Inspect Details →</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5DED3] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header Visual */}
            <div className="relative h-64 w-full border-b border-[#E5DED3]">
              <ArchitecturalVisual
                type={activeModalProject.visualType || activeModalProject.sectionType}
                plotNo={activeModalProject.plotNo}
                location={activeModalProject.location}
                category={activeModalProject.type || activeModalProject.category}
                className="w-full h-full"
              />

              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 text-white bg-black/60 hover:bg-black/80 rounded-full border border-white/20 transition z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27] bg-[#111827]/90 px-3 py-1 rounded-full border border-amber-500/40">
                  {activeModalProject.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2 font-display">
                  {activeModalProject.projectDetails}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DED3]">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Plot Number</div>
                  <div className="text-sm font-bold text-[#7A2E16] font-mono mt-0.5">{activeModalProject.plotNo}</div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DED3]">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Project Location</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{activeModalProject.location}</div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DED3]">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Execution Status</div>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">{activeModalProject.status}</div>
                </div>
              </div>

              {/* Client & Consultant Info */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DED3] space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="text-slate-500">Owner / Client:</span>
                  <strong className="text-slate-900 text-sm">{activeModalProject.client}</strong>
                </div>
                {activeModalProject.consultant && (
                  <div className="flex justify-between items-center text-slate-700 border-t border-[#E5DED3] pt-2">
                    <span className="text-slate-500">Engineering Consultant:</span>
                    <strong className="text-[#7A2E16]">{activeModalProject.consultant}</strong>
                  </div>
                )}
                {activeModalProject.scope && (
                  <div className="flex justify-between items-center text-slate-700 border-t border-[#E5DED3] pt-2">
                    <span className="text-slate-500">Scope of Works:</span>
                    <span className="text-slate-900 font-semibold">{activeModalProject.scope}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#E5DED3] flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-[#F4EFE6] rounded-xl border border-[#E5DED3]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const desc = activeModalProject.projectDetails;
                    setActiveModalProject(null);
                    onInquireSimilar(desc);
                  }}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#7A2E16] hover:bg-[#652310] rounded-xl shadow-md border border-[#C59B27]/40"
                >
                  Inquire for Similar Project →
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
