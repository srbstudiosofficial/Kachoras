import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Check, 
  Building, 
  ExternalLink,
  Maximize2,
  X,
  BadgeCheck,
  QrCode
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import AnimatedCounter from './AnimatedCounter';

export default function TradeLicenseSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="license" className="py-10 sm:py-14 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2 reveal-on-scroll reveal-init">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Regulatory Compliance & Registration
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Official Commercial License & Approvals
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Fully licensed and certified by the Government of Dubai, Department of Economy and Tourism (DET), with G+1 Building Contracting statutory approval from Dubai Municipality.
          </p>
        </div>

        {/* Unified Official Commercial License Certificate Showcase */}
        <div className="mb-10 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Document Preview Card (5 cols) */}
            <div className="lg:col-span-5 relative group">
              <div 
                onClick={() => setIsModalOpen(true)}
                className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-lg cursor-pointer transform group-hover:scale-[1.01] transition-all duration-300 group-hover:border-[#B3261E] group-hover:shadow-2xl"
              >
                {/* Official License Image */}
                <div className="relative aspect-[3/4] max-h-[440px] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img 
                    src="./assets/dubai-commercial-license-578964.png" 
                    alt="Government of Dubai Commercial License #578964 - Kachoras Electromechanical Contracting LLC"
                    className="w-full h-full object-contain object-top"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-white text-[#14171F] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-[#B3261E]" />
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                {/* Bottom Card Bar */}
                <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono font-semibold text-[11px] text-slate-200">License #578964</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    DET Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Document Details & Fast Facts (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>Official Government of Dubai Certified e-Document</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#14171F] font-display">
                  Dubai Commercial License Certificate
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-arabic">
                  كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م — رخصة تجارية رقم 578964 صادرة عن دائرة الاقتصاد والسياحة في دبي
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Issued under the Department of Economy and Tourism (DET), accredited for <strong>Building Contracting (G+1)</strong>, <strong>Electromechanical Equipment Installation & Maintenance</strong>, and <strong>Metal Doors & Windows Making & Fixing</strong>.
                </p>
              </div>

              {/* Fast Fact Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">License Number</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">578964</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Register Number</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">2148781</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">DCCI Membership</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">169651</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Legal Form</span>
                  <span className="font-semibold text-slate-900 text-xs">Limited Liability (LLC)</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">DM Accreditation</span>
                  <span className="font-semibold text-[#B3261E] text-xs">G+1 Approved</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Validity & Status</span>
                  <span className="font-semibold text-emerald-700 text-xs">Active & Verified</span>
                </div>
              </div>

              {/* Licensed Commercial Activities List */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                  Licensed Commercial Activities
                </span>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {COMPANY_INFO.specialties.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B3261E] shrink-0 mt-1.5" />
                      <span className="leading-snug text-[11px] font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Institutional Accreditation & Tender Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-[#C59B27] transition-all duration-300 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B6D1B]">
              Statutory Approvals
            </span>
            
            <h3 className="text-xl font-bold text-[#14171F] font-display">
              Certified Dubai Municipality Building Contractor
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Kachoras Electromechanical Contracting LLC maintains continuous active registration with the Dubai Municipality, General Directorate of Civil Defense, and Dubai Electricity and Water Authority (DEWA).
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-center hover:bg-white transition">
                <div className="text-2xl font-bold text-[#B3261E] font-display">
                  <AnimatedCounter target={20} suffix="+ Yrs" duration={1700} />
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">Continuous Standing</div>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-center hover:bg-white transition">
                <div className="text-2xl font-bold text-emerald-800 font-display">G+1</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">Contractor License</div>
              </div>
            </div>
          </div>

          <div className="bg-[#14171F] text-white rounded-2xl p-7 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C59B27] block">
                Official Tender Submissions
              </span>
              <h4 className="text-lg font-bold font-display text-white">
                Submit Architectural Plans for Tendering
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Send consultant-approved Croquis, structural drawings, and BOQ files for comprehensive contractor pricing under strict UAE commercial non-disclosure practices.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C59B27] hover:text-white transition"
              >
                <span>Go to Tender Submission Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for High-Resolution Document Inspection */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl max-h-[92vh] w-full flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-sm text-slate-900 font-display">
                  Government of Dubai • Commercial License #578964
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Full High-Res Document */}
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 flex-1">
              <img 
                src="./assets/dubai-commercial-license-578964.png" 
                alt="Full Official Commercial License #578964"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-md border border-slate-200 bg-white"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
