import React from 'react';
import { Target, Compass, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function VisionMissionSection() {
  return (
    <section className="py-20 bg-[#F4EFE6] border-y border-[#E5DED3] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-architect-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/30 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Corporate Philosophy • Ethics, Quality & Sustainability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-display">
            OUR VISION & MISSION
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Guided by unwavering ethics, engineering excellence, and customer-first dedication across the United Arab Emirates since 2006.
          </p>
        </div>

        {/* 2 Executive Vision / Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E5DED3] shadow-luxury hover:border-[#7A2E16] transition-all duration-300 relative group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#7A2E16] text-white flex items-center justify-center shadow-md">
                  <Target className="w-7 h-7 text-[#C59B27]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] bg-[#F7EFCF] px-3 py-1 rounded-full border border-[#C59B27]/40">
                  Strategic Horizon
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#111827] font-display">
                  Corporate Vision (رؤيتنا)
                </h3>
                <p className="text-xs font-bold text-[#7A2E16] uppercase tracking-wider mt-1">
                  Transforming the Built Environment
                </p>
              </div>

              {/* Corporate Vision Statement */}
              <blockquote className="border-l-4 border-[#7A2E16] pl-5 py-2 text-slate-700 text-base sm:text-lg leading-relaxed italic font-serif">
                "To be the leading contracting Company recognized for our commitment to quality, Innovation, Sustainability and transforming the built environment while enhancing the communities we serve."
              </blockquote>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-[#7A2E16] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                Quality & Sustainability Benchmark
              </span>
              <span className="font-mono text-[11px]">Dubai Municipality G+1</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E5DED3] shadow-luxury hover:border-[#7A2E16] transition-all duration-300 relative group flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#7A2E16] text-white flex items-center justify-center shadow-md">
                  <Compass className="w-7 h-7 text-[#C59B27]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7A2E16] bg-[#7A2E16]/10 px-3 py-1 rounded-full border border-[#7A2E16]/30">
                  Core Commitment
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#111827] font-display">
                  Corporate Mission (رسالتنا)
                </h3>
                <p className="text-xs font-bold text-[#7A2E16] uppercase tracking-wider mt-1">
                  Excellence in Service & Craftsmanship
                </p>
              </div>

              {/* Corporate Mission Statement */}
              <blockquote className="border-l-4 border-[#C59B27] pl-5 py-2 text-slate-700 text-base sm:text-lg leading-relaxed italic font-serif">
                "Our mission is to deliver a high quality level of construction services and products that will give satisfaction to our clients. We aim to do this by being professional, honest and passionate to serve only the best services our clients would wish to have."
              </blockquote>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-[#7A2E16] flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#7A2E16]" />
                Professionalism, Honesty & Passion
              </span>
              <span className="font-mono text-[11px]">Since 2006</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
