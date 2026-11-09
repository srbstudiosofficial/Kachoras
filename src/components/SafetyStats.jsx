import React from 'react';
import { 
  ShieldCheck, 
  HardHat, 
  Camera, 
  FileCheck2, 
  Leaf, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

const UAE_CERTIFICATIONS = [
  { name: 'Dubai Municipality (DM)', label: 'G+1 Building Contractor Approved' },
  { name: 'DEWA Regulations', label: 'Electrical & Water Compliance' },
  { name: 'Dubai Civil Defence (DCD)', label: 'Fire & Life Safety Certified' },
  { name: 'Dubai Chamber (DCCI)', label: 'Active Commercial Member' },
  { name: 'Dubai Economy (DED)', label: 'Commercial License #578964' }
];

export default function SafetyStats() {
  const safetyProtocols = [
    {
      icon: HardHat,
      title: "100% Dubai Municipality Safety Compliance",
      desc: "Every jobsite operates under DM Code of Construction Safety Practice with continuous site safety engineer oversight."
    },
    {
      icon: Camera,
      title: "Weekly Milestone Photo & BIM Audits",
      desc: "Owners and consultants receive timestamped progress photography, structural milestone verification, and inspection records."
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive UAE Contractor Insurance",
      desc: "Full Contractors All Risk (CAR) and Third-Party Liability insurance protecting property owners and financial institutions."
    },
    {
      icon: Leaf,
      title: "Dubai Green Building (Al Sa'fat)",
      desc: "High thermal performance blockwork, eco-friendly insulation, and sustainable waste management on all residential builds."
    }
  ];

  return (
    <section id="safety" className="py-10 sm:py-12 bg-[#121620] text-white relative border-t border-[#232A38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Uncompromising Jobsite Safety & Risk Management</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            SAFETY CULTURE & FIELD PROTOCOLS
          </h2>
          <p className="text-white/70 text-sm sm:text-base">
            Construction excellence starts with protecting our skilled tradesmen, adjacent properties, and your capital investment under UAE statutory standards.
          </p>
        </div>

        {/* Big Safety Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1A202C] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-display">Zero</div>
            <div className="text-base font-bold text-white">Lost-Time Incidents</div>
            <p className="text-xs text-white/60 max-w-xs mx-auto">
              Exemplary safety record across all private villa, commercial warehouse, and municipal projects.
            </p>
          </div>

          <div className="bg-[#1A202C] border border-[#C59B27]/40 rounded-2xl p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-black text-[#C59B27] font-display">18+</div>
            <div className="text-base font-bold text-white">Years in Dubai</div>
            <p className="text-xs text-white/60 max-w-xs mx-auto">
              Continuous operational presence in Dubai without regulatory penalties or suspension.
            </p>
          </div>

          <div className="bg-[#1A202C] border border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-2 relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-black text-blue-400 font-display">100%</div>
            <div className="text-base font-bold text-white">DEWA & DM Pass Rate</div>
            <p className="text-xs text-white/60 max-w-xs mx-auto">
              Strict adherence to engineering drawings ensuring immediate first-pass approvals from municipal inspectors.
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
                className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/20 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#C59B27] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Partner / Industry Accreditation Badges Strip */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center text-xs uppercase font-bold tracking-widest text-white/60 mb-8">
            Accredited & Certified Under Dubai Regulatory Authorities
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {UAE_CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-xs"
              >
                <CheckCircle className="w-4 h-4 text-[#C59B27] shrink-0" />
                <div>
                  <div className="font-bold text-white">{cert.name}</div>
                  <div className="text-[10px] text-white/60">{cert.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
