import React, { useState, useEffect } from 'react';
import ProjectDetailModal from './ProjectDetailModal';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { getAllProjects } from '../services/projectService';

export default function ProjectsSection({ onOpenQuoteModal, hideHeader = false }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Load clean authentic projects
    const list = getAllProjects();
    setProjects(list);
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.categoryFilter === filter;
  });

  const counts = {
    all: projects.length,
    villas: projects.filter(p => p.categoryFilter === 'villas').length,
    majlis: projects.filter(p => p.categoryFilter === 'majlis').length,
    aluminium: projects.filter(p => p.categoryFilter === 'aluminium').length,
    civic_mep: projects.filter(p => p.categoryFilter === 'civic_mep').length,
  };

  const categories = [
    { id: 'all', label: 'All Projects', count: counts.all },
    { id: 'villas', label: 'Luxury G+1 Villas', count: counts.villas },
    { id: 'majlis', label: 'Majlis & Traditional', count: counts.majlis },
    { id: 'aluminium', label: 'Aluminium & Glazing', count: counts.aluminium },
    { id: 'civic_mep', label: 'Civic & MEP Works', count: counts.civic_mep }
  ];

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[#FAF9F6] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
              Executed Works • Handover Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#14171F] font-display">
              Completed Contracting Works
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Explore our verified portfolio of Dubai Municipality-approved luxury G+1 villas, Arabian majlis halls, in-house architectural aluminium fabrication, and civic infrastructure works.
            </p>
          </div>
        )}

        {/* Clean Category Filter Tabs (ECC Group & Dani Trading Style) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E5DED3]">
          {categories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#7A2E16] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#F2ECE1] hover:text-[#7A2E16]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Grid (Clean & Simple) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E5DED3] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7A2E16] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Project Image */}
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Clean Category Tag on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded bg-[#111622]/85 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Location Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2E16] block">
                    {item.type}
                  </span>

                  <h3 className="text-base font-bold font-display text-[#111622] leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                    {item.scope}
                  </p>

                  {/* Client & Consultant Info */}
                  <div className="pt-2 border-t border-[#F0EBE1] text-[11px] text-slate-500 space-y-0.5">
                    {item.client && (
                      <div className="truncate">Client: <strong className="text-slate-700 font-semibold">{item.client}</strong></div>
                    )}
                    {item.consultant && (
                      <div className="truncate">Consultant: <strong className="text-slate-700 font-semibold">{item.consultant}</strong></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 pt-0 border-t border-[#F0EBE1] mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(item)}
                  className="w-full mt-3 py-2.5 px-4 bg-[#FAF8F5] hover:bg-[#7A2E16] hover:text-white border border-[#E5DED3] hover:border-[#7A2E16] rounded-xl text-xs font-bold text-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Project Sheet & Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Detail Sheet Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </section>
  );
}
