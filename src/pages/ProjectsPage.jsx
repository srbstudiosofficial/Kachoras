import React from 'react';
import PageHeader from '../components/PageHeader';
import ProjectsSection from '../components/ProjectsSection';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Clock,
  Layers
} from 'lucide-react';

export default function ProjectsPage({ onNavigate, onOpenQuoteModal }) {
  return (
    <div className="space-y-0">
      
      {/* 1. Page Header */}
      <PageHeader 
        title="Engineering Projects Portfolio"
        subtitle="20+ Years of Structural & Electromechanical Excellence Across Dubai (2006–2026) • Verified Project Portfolio"
        breadcrumb="Projects"
        onNavigate={onNavigate}
      />

      {/* 2. Projects Statistics Strip */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7A2E16]">Handed Over</span>
              <div className="text-2xl sm:text-3xl font-black text-[#1E293B] font-mono">500+</div>
              <p className="text-[11px] sm:text-xs text-slate-600">Projects completed across the UAE since 2006</p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700">Track Record</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">20+ Yrs</div>
              <p className="text-[11px] sm:text-xs text-slate-600">Trusted engineering in Dubai under Jose K. George</p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B6D1B]">Authority Rating</span>
              <div className="text-2xl sm:text-3xl font-black text-[#1E293B] font-display">G+1</div>
              <p className="text-[11px] sm:text-xs text-slate-600">Dubai Municipality licensed structural contractor</p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">Authority Compliance</span>
              <div className="text-2xl sm:text-3xl font-black text-[#7A2E16] font-mono">100%</div>
              <p className="text-[11px] sm:text-xs text-slate-600">DM, DEWA, and Civil Defence standards</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Full Projects Section & Interactive Grid */}
      <ProjectsSection onNavigate={onNavigate} onOpenQuoteModal={onOpenQuoteModal} hideHeader={true} />

    </div>
  );
}
