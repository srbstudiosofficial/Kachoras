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
        title="Engineering Projects & Live Pipeline"
        subtitle="450+ Cumulative Completed Works Across Dubai (2006–2026) • Featuring Recent Completed Handovers & Active Sites"
        breadcrumb="Projects"
        onNavigate={onNavigate}
      />

      {/* 2. Projects Statistics Strip */}
      <section className="py-12 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A2E16]">Handed Over</span>
              <div className="text-3xl font-black text-[#1E293B] font-mono">450+</div>
              <p className="text-xs text-slate-600">Projects completed across the UAE since 2006</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Active Sites</span>
              <div className="text-3xl font-black text-emerald-700 font-mono">100%</div>
              <p className="text-xs text-slate-600">On-schedule execution under DM supervision</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">Authority Grade</span>
              <div className="text-3xl font-black text-[#1E293B] font-display">G+1</div>
              <p className="text-xs text-slate-600">Dubai Municipality licensed structural rating</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Approval Rate</span>
              <div className="text-3xl font-black text-[#7A2E16] font-mono">Zero</div>
              <p className="text-xs text-slate-600">First-pass DEWA inspection rejections</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Full Projects Section & Interactive Grid */}
      <ProjectsSection onOpenQuoteModal={onOpenQuoteModal} hideHeader={true} />

      {/* 4. Pre-Footer Call to Action */}
      

    </div>
  );
}
