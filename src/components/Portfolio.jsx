import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Maximize2, 
  ArrowUpRight, 
  X, 
  Check, 
  User, 
  Briefcase
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
    <section id="portfolio" className="py-24 bg-[#F5F2EB] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Certified Projects & Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Selected Works & Landmarks
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every project represents certified civil construction and electromechanical works verified under Dubai Municipality G+1 regulations.
          </p>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "all"
                ? 'bg-[#14171F] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#EFE9DF]'
            }`}
          >
            All Works ({allProjects.length})
          </button>
          
          <button
            onClick={() => setActiveTab("villas")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "villas"
                ? 'bg-[#14171F] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#EFE9DF]'
            }`}
          >
            Private Luxury Villas ({COMPLETED_PROJECTS_VILLAS.length})
          </button>

          <button
            onClick={() => setActiveTab("municipality")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "municipality"
                ? 'bg-[#14171F] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#EFE9DF]'
            }`}
          >
            Dubai Municipality Civic ({DUBAI_MUNICIPALITY_PROJECTS.length})
          </button>

          <button
            onClick={() => setActiveTab("ongoing")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "ongoing"
                ? 'bg-[#14171F] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#EFE9DF]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Active Developments ({ONGOING_PROJECTS.length})</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveModalProject(proj)}
              className="bg-white border border-[#E5DED3] rounded-2xl overflow-hidden shadow-sm hover:border-[#7A2E16] hover:shadow-luxury transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-52 overflow-hidden border-b border-[#E5DED3]">
                  <ArchitecturalVisual 
                    type={proj.visualType || proj.sectionType}
                    plotNo={proj.plotNo}
                    location={proj.location}
                    category={proj.type || proj.category}
                    className="w-full h-full"
                  />

                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      proj.status.includes('Completed') 
                        ? 'bg-emerald-800/90 text-white' 
                        : 'bg-[#7A2E16]/90 text-white'
                    }`}>
                      {proj.status.includes('Completed') ? 'Handed Over' : 'Active Site'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2E16] bg-[#7A2E16]/10 px-2 py-0.5 rounded">
                      {proj.category || (proj.sectionType === 'municipality' ? 'Municipal Civic' : 'Private G+1 Villa')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#7A2E16] transition-colors shrink-0" />
                  </div>

                  <h3 className="text-base font-bold text-[#14171F] group-hover:text-[#7A2E16] transition-colors font-display line-clamp-2 leading-snug">
                    {proj.projectDetails}
                  </h3>

                  {/* Specifications */}
                  <div className="space-y-1.5 pt-3 border-t border-[#F0EBE1] text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Client: <strong className="text-slate-800 font-medium">{proj.client}</strong></span>
                    </div>

                    {proj.consultant && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">Consultant: <strong className="text-slate-800 font-medium">{proj.consultant}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-[#FAF8F5] border-t border-[#E5DED3] text-[11px] text-slate-500 flex justify-between items-center">
                <span>Dubai Municipality Verified</span>
                <span className="text-[#7A2E16] font-semibold group-hover:underline">View Specs →</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Specifications Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E5DED3] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            
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
                className="absolute top-4 right-4 p-2 text-white bg-black/60 hover:bg-black/80 rounded-full border border-white/20 transition z-30 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 pt-0 space-y-5">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#7A2E16]">
                  {activeModalProject.category || 'Dubai Construction'}
                </span>
                <h3 className="text-2xl font-bold text-[#14171F] font-display mt-1">
                  {activeModalProject.projectDetails}
                </h3>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE9DF] text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">Plot Number</span>
                  <strong className="text-slate-800 font-mono">{activeModalProject.plotNo || 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">District / Location</span>
                  <strong className="text-slate-800">{activeModalProject.location || 'Dubai, UAE'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">Contractor Role</span>
                  <strong className="text-[#7A2E16]">G+1 Main Contractor</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">Engineering Consultant</span>
                  <strong className="text-slate-800">{activeModalProject.consultant || 'Field Supervision'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">Handover Status</span>
                  <strong className="text-emerald-700">{activeModalProject.status}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">Code Compliance</span>
                  <strong className="text-slate-800">Dubai Municipality</strong>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Executed Engineering Disciplines
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE9DF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2E16]" />
                    <span>Reinforced Concrete & Civil Substructure</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE9DF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2E16]" />
                    <span>DEWA Electrical Substations & Load Distribution</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE9DF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2E16]" />
                    <span>Ducted HVAC & Ventilation Networks</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE9DF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2E16]" />
                    <span>Custom Aluminium & Architectural Glazing</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#E5DED3] flex flex-wrap justify-between items-center gap-3">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    if (onInquireSimilar) onInquireSimilar(activeModalProject.projectDetails);
                  }}
                  className="px-5 py-2.5 bg-[#7A2E16] hover:bg-[#652310] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Inquire on Similar Project
                </button>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
