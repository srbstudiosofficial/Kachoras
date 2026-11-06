import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import SafeImage from './SafeImage';

export default function ProjectDetailModal({ project, isOpen, onClose, onOpenQuoteModal }) {
  if (!isOpen || !project) return null;

  const isUpcoming = project.status === 'upcoming';
  const isOngoing = project.status === 'ongoing';

  const badgeConfig = isUpcoming
    ? { bg: 'bg-indigo-600/90 text-white', label: 'Upcoming Tender (2026)', icon: Sparkles }
    : isOngoing
    ? { bg: 'bg-amber-600/90 text-white', label: 'Active Under Construction', icon: Clock }
    : { bg: 'bg-emerald-700/90 text-white', label: 'Handed Over & BCC Certified', icon: CheckCircle2 };

  const BadgeIcon = badgeConfig.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E5DED3] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition cursor-pointer backdrop-blur-md shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual */}
        <div className="relative h-64 sm:h-76 w-full bg-slate-900 shrink-0">
          <SafeImage 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            category={project.category}
            plotNo={project.plotNo}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md ${badgeConfig.bg}`}>
              <BadgeIcon className="w-4 h-4" />
              <span>{badgeConfig.label}</span>
            </span>

            {project.timeline && (
              <span className="font-mono text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                {project.timeline}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] block">
              {project.category || 'Building Contracting'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Metadata Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location</span>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span>{project.location || 'Dubai, UAE'}</span>
              </p>
            </div>

            {project.plotNo && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">DM Plot Number</span>
                <p className="text-xs font-mono font-bold text-[#B3261E]">
                  Plot #{project.plotNo}
                </p>
              </div>
            )}

            {project.year && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DED3] space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Handover Year</span>
                <p className="text-xs font-mono font-bold text-slate-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{project.year}</span>
                </p>
              </div>
            )}
          </div>

          {/* Project Stakeholders */}
          {(project.client || project.consultant) && (
            <div className="grid sm:grid-cols-2 gap-3 p-4 bg-[#FBF9F5] rounded-2xl border border-[#E5DED3]">
              {project.client && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Client / Owner</span>
                  <strong className="text-xs sm:text-sm text-slate-900 font-semibold">{project.client}</strong>
                </div>
              )}
              {project.consultant && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Supervising Consultant</span>
                  <strong className="text-xs sm:text-sm text-slate-900 font-semibold">{project.consultant}</strong>
                </div>
              )}
            </div>
          )}

          {/* Full Scope Breakdown */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E] block">
              Contract Scope & Technical Execution
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-[#E5DED3]">
              {project.scope}
            </p>
          </div>

          {/* In-House Execution Matrix */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              In-House Divisions Mobilized
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 font-medium">
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>DM G+1 Civil</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>DEWA Electrical</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Al Qusais Glass</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5DED3] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>HVAC Systems</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#E5DED3] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-slate-700 hover:bg-white transition cursor-pointer"
          >
            Close Sheet
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenQuoteModal) {
                onOpenQuoteModal({
                  category: project.category,
                  notes: `Inquiry referencing project: ${project.title} (Plot #${project.plotNo || 'N/A'})`
                });
              }
            }}
            className="px-6 py-2.5 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Inquire for Similar Project</span>
            <ArrowRight className="w-4 h-4 text-[#C59B27]" />
          </button>
        </div>

      </div>
    </div>
  );
}
