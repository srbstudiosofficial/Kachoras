import React from 'react';
import { 
  Star, 
  Quote, 
  Building2, 
  CheckCircle,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Reputation & Client Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            WHAT DEVELOPERS & ARCHITECTS SAY
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Our reputation is constructed one project at a time. Over 85% of our annual volume comes from repeat developers and institutional clients.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#121A27] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative hover:border-slate-700 transition"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-amber-400 font-bold ml-2">5.0 Verified</span>
                </div>

                {/* Quote text */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>

                {/* Associated Project Badge */}
                <div className="bg-slate-900/90 border border-slate-800/80 px-3 py-1.5 rounded-lg text-xs text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">Build: <strong className="text-slate-200">{t.project}</strong></span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <div className="text-xs text-slate-400">{t.role}</div>
                  <div className="text-[11px] font-semibold text-amber-400">{t.company}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Client Portal Highlight Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#141E2F] via-[#101927] to-[#141E2F] border border-slate-700/80 rounded-2xl p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Exclusive Owner Experience</span>
            <h3 className="text-2xl font-bold text-white font-display">
              Live Digital Jobsite Transparency
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every client receives dedicated access to our proprietary cloud portal: daily high-resolution drone flights, subcontractor daily logs, submittal approvals, and automated financial draw schedules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-xl text-center">
              <div className="text-xs text-slate-400">Average Client Retention</div>
              <div className="text-xl font-bold text-emerald-400">94.2%</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-xl text-center">
              <div className="text-xs text-slate-400">On-Time Completion Rate</div>
              <div className="text-xl font-bold text-amber-400">98.8%</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
