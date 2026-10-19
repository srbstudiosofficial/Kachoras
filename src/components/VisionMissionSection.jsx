import React from 'react';
import { Target, Compass, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function VisionMissionSection() {
  return (
    <section id="vision" className="py-24 bg-[#FAF9F6] border-y border-[#E5DED3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3 reveal-on-scroll reveal-init">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Institutional Values & Governance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Corporate Vision & Mission
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Guided by uncompromising engineering standards, Dubai statutory compliance, and transparent contracting relationships across the UAE since 2006.
          </p>
        </div>

        {/* 2 Refined Executive Columns */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Vision Column */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E5DED3] shadow-sm hover:shadow-2xl hover:border-[#7A2E16] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between space-y-6 reveal-on-scroll reveal-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A2E16]">
                  Strategic Purpose
                </span>
                <span className="text-xs font-mono text-slate-400">01 / VISION</span>
              </div>

              <h3 className="text-2xl font-bold text-[#14171F] font-display">
                Corporate Vision (رؤيتنا)
              </h3>

              <blockquote className="border-l-2 border-[#7A2E16] pl-5 py-2 text-slate-700 text-base leading-relaxed italic font-serif">
                "To be the leading contracting company recognized for our commitment to quality, innovation, and sustainability, transforming the built environment while enhancing the communities we serve."
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quality & Sustainable Handover</span>
              <span className="text-[11px] font-mono text-slate-400">Dubai Municipality G+1</span>
            </div>
          </div>

          {/* Mission Column */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E5DED3] shadow-sm hover:shadow-2xl hover:border-[#C59B27] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between space-y-6 reveal-on-scroll reveal-right">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B6D1B]">
                  Operational Commitment
                </span>
                <span className="text-xs font-mono text-slate-400">02 / MISSION</span>
              </div>

              <h3 className="text-2xl font-bold text-[#14171F] font-display">
                Corporate Mission (رسالتنا)
              </h3>

              <blockquote className="border-l-2 border-[#C59B27] pl-5 py-2 text-slate-700 text-base leading-relaxed italic font-serif">
                "To deliver exceptional construction services and engineering craftsmanship that exceed client expectations, through unwavering integrity, rigorous safety, and seasoned technical leadership."
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Client-First Accountability</span>
              <span className="text-[11px] font-mono text-slate-400">Est. 2006</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
