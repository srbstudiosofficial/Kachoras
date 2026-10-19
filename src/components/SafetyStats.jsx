import React from 'react';
import { 
  ShieldCheck, 
  HardHat, 
  Camera, 
  FileCheck2, 
  Leaf, 
  Radio, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { COMPANY_INFO, CERTIFICATIONS } from '../data/mockData';

export default function SafetyStats() {
  const safetyProtocols = [
    {
      icon: HardHat,
      title: "100% OSHA 30 Field Supervisors",
      desc: "Every jobsite superintendent holds advanced OSHA 30-hour safety credentials with mandatory daily site hazard audits."
    },
    {
      icon: Camera,
      title: "Weekly 4K Drone & 360° Laser Scans",
      desc: "Clients log in to an encrypted portal to inspect cloud photogrammetry, thermal envelopes, and 3D clash verifications."
    },
    {
      icon: ShieldCheck,
      title: "$25M Comprehensive Bonding & Insurance",
      desc: "Full bonding capacity protecting owners and financial institutions against schedule delays, liens, or default."
    },
    {
      icon: Leaf,
      title: "USGBC LEED & Net-Zero Execution",
      desc: "Over 85% construction waste diversion rates, recycled aggregate utilization, and low-VOC compliant building methods."
    }
  ];

  return (
    <section id="safety" className="py-24 bg-[#0A0E17] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Uncompromising Risk Management</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            SAFETY CULTURE & FIELD PROTOCOLS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Construction excellence starts with keeping our workforce and your investment completely secure. We hold one of the lowest EMR (Experience Modification Ratings) in the Midwest.
          </p>
        </div>

        {/* Big Safety Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#121A27] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-display">0.68</div>
            <div className="text-base font-bold text-white">EMR Safety Rating</div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Well below the 1.0 industry benchmark, ensuring the lowest worker compensation risk and insurance premiums.
            </p>
          </div>

          <div className="bg-[#121A27] border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-black text-amber-400 font-display">1.4M+</div>
            <div className="text-base font-bold text-white">Safe Work Hours</div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Over 1,400,000 consecutive trade hours logged without a single lost-time incident across commercial and civil works.
            </p>
          </div>

          <div className="bg-[#121A27] border border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-black text-blue-400 font-display">100%</div>
            <div className="text-base font-bold text-white">Drug-Free Worksite</div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Strict pre-hire, random, and post-incident testing protocols enforced for all employees and specialized trade partners.
            </p>
          </div>
        </div>

        {/* 4 Core Safety Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyProtocols.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Partner / Industry Accreditation Badges Strip */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="text-center text-xs uppercase font-bold tracking-widest text-slate-400 mb-8">
            Accredited & Certified By Industry Authorities
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl text-xs"
              >
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-200">{cert.name}</div>
                  <div className="text-[10px] text-slate-400">{cert.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
