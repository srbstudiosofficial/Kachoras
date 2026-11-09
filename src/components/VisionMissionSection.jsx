import React from 'react';
import { Target, Compass, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function VisionMissionSection() {
  return (
    <section id="vision" className="py-10 sm:py-14 bg-white border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2 reveal-on-scroll reveal-init">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Institutional Values & Governance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Vision & Mission
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Since 2006, Kachoras Electromechanical Contracting LLC has focused on quality construction, reliable engineering services, and professional project management. We follow applicable Dubai regulations and maintain honest and transparent relationships with our clients. Our work is guided by quality, safety, responsibility, and customer satisfaction.
          </p>
        </div>

        {/* 2 Refined Executive Columns */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Vision Column */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm hover:shadow-2xl hover:border-[#B3261E] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between space-y-6 reveal-on-scroll reveal-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E]">
                  Strategic Purpose
                </span>
                <span className="text-xs font-mono text-slate-400">01 / VISION</span>
              </div>

              <h3 className="text-2xl font-bold text-[#14171F] font-display">
                Vision
              </h3>

              <blockquote className="border-l-2 border-[#B3261E] pl-5 py-2 text-slate-700 text-base leading-relaxed italic font-serif">
                "To become a trusted contracting company in Dubai, known for quality work, modern solutions, and sustainable construction that benefits our clients and communities."
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quality & Sustainable Handover</span>
              <span className="text-[11px] font-mono text-slate-400">Dubai Municipality G+1</span>
            </div>
          </div>

          {/* Mission Column */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E2E8F0] shadow-sm hover:shadow-2xl hover:border-[#C59B27] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between space-y-6 reveal-on-scroll reveal-right">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B6D1B]">
                  Operational Commitment
                </span>
                <span className="text-xs font-mono text-slate-400">02 / MISSION</span>
              </div>

              <h3 className="text-2xl font-bold text-[#14171F] font-display">
                Mission
              </h3>

              <blockquote className="border-l-2 border-[#C59B27] pl-5 py-2 text-slate-700 text-base leading-relaxed italic font-serif">
                "To provide reliable construction and engineering services that meet client expectations through quality workmanship, safe working practices, experienced staff, and professional service."
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Client-First Accountability</span>
              <span className="text-[11px] font-mono text-slate-400">Est. 2006</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
