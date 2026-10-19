import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Layers,
  Sparkles
} from 'lucide-react';
import { getAllProjects, fetchServerProjects } from '../services/projectService';

export default function ProjectsSection({ onOpenQuoteModal }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'ongoing' | 'completed'

  const loadProjects = async () => {
    const local = getAllProjects();
    setProjects(local);

    try {
      const live = await fetchServerProjects();
      if (live && Array.isArray(live) && live.length > 0) {
        setProjects(live);
      }
    } catch (err) {
      // Retain local state
    }
  };

  useEffect(() => {
    loadProjects();
    const handleUpdate = () => loadProjects();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('kachoras_projects_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('kachoras_projects_updated', handleUpdate);
    };
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const counts = {
    all: projects.length,
    upcoming: projects.filter(p => p.status === 'upcoming').length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  return (
    <section id="portfolio" className="py-24 bg-[#F5F2EB] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3 reveal-on-scroll reveal-init">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Contracting Portfolio • Future Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Projects & Upcoming Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore our track record of Dubai Municipality approved G+1 villas, active majlis construction sites, and upcoming pipeline developments across the UAE.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#E5DED3] reveal-on-scroll reveal-init delay-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              filter === 'all'
                ? 'bg-[#14171F] text-white shadow-md'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
            }`}
          >
            <span>All Works</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/20">{counts.all}</span>
          </button>

          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              filter === 'upcoming'
                ? 'bg-indigo-700 text-white shadow-md'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-spin-slow" />
            <span>Upcoming Tenders (2026)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">{counts.upcoming}</span>
          </button>

          <button
            onClick={() => setFilter('ongoing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              filter === 'ongoing'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>Active Construction</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">{counts.ongoing}</span>
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              filter === 'completed'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 border border-[#E5DED3] hover:bg-[#FAF8F5]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Completed Handovers</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">{counts.completed}</span>
          </button>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item, idx) => {
            const isUpcoming = item.status === 'upcoming';
            const isOngoing = item.status === 'ongoing';
            
            const badgeConfig = isUpcoming
              ? { bg: 'bg-indigo-600/95 text-white', label: 'Upcoming 2026', icon: Sparkles }
              : isOngoing
              ? { bg: 'bg-amber-600/95 text-white', label: 'Under Construction', icon: Clock }
              : { bg: 'bg-emerald-700/95 text-white', label: 'Handed Over', icon: CheckCircle2 };

            const BadgeIcon = badgeConfig.icon;

            return (
              <div
                key={item.id}
                data-delay={(idx % 6) * 120}
                className="bg-white rounded-2xl border border-[#E5DED3] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#7A2E16] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group reveal-on-scroll reveal-init shimmer-trigger"
              >
                <div>
                  {/* Project Image */}
                  <div className="h-52 overflow-hidden relative bg-slate-100">
                    <img
                      src={item.image || './assets/villa.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md shadow-sm ${badgeConfig.bg}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{badgeConfig.label}</span>
                      </span>
                    </div>

                    {/* Timeline Tag */}
                    {item.timeline && (
                      <div className="absolute top-3 right-3">
                        <span className="font-mono text-[10px] font-bold text-white/95 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                          {item.timeline}
                        </span>
                      </div>
                    )}

                    {/* Category Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-200 block">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold font-display text-white mt-0.5 line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3.5">
                    {/* Location & Plot */}
                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 border-b border-[#F0EBE1] pb-3 gap-2">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                        <span>{item.location || 'Dubai, UAE'}</span>
                      </div>
                      {item.plotNo && (
                        <span className="font-mono text-[11px] text-slate-500 bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5DED3]">
                          Plot #{item.plotNo}
                        </span>
                      )}
                    </div>

                    {/* Scope text */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                      {item.scope}
                    </p>

                    {/* Client / Consultant metadata */}
                    {(item.client || item.consultant) && (
                      <div className="pt-1 text-[11px] text-slate-500 space-y-0.5">
                        {item.client && (
                          <div>Client: <strong className="text-slate-700">{item.client}</strong></div>
                        )}
                        {item.consultant && (
                          <div>Consultant: <strong className="text-slate-700">{item.consultant}</strong></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0 border-t border-[#F2ECE1] mt-2">
                  <button
                    onClick={() => onOpenQuoteModal && onOpenQuoteModal({ category: item.category, notes: `Inquiry regarding: ${item.title}` })}
                    className="w-full min-h-[44px] pt-1 flex items-center justify-between text-xs font-bold text-[#7A2E16] group-hover:text-[#5C200E] transition cursor-pointer"
                  >
                    <span>Inquire for Similar Project</span>
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
