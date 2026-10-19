import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Check, 
  Building, 
  ExternalLink 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function TradeLicenseSection() {
  return (
    <section id="license" className="py-24 bg-[#FAF9F6] border-t border-[#E5DED3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
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

        {/* Certificate Card Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detailed Commercial License Record (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0EBE1] pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A2E16] block">
                  Government of Dubai • Economy and Tourism (DET)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14171F] font-display mt-0.5">
                  Commercial License (رخصة تجارية)
                </h3>
                <span className="text-xs text-slate-500 font-arabic mt-0.5 block">
                  كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م
                </span>
              </div>
              <div className="text-right bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">License No.</span>
                <span className="text-xl font-bold text-[#7A2E16] font-mono tracking-wider">{COMPANY_INFO.licenseNumber}</span>
              </div>
            </div>

            {/* License Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-slate-400 block text-[10px] font-medium">Legal Form</span>
                <span className="font-semibold text-slate-900 mt-0.5 block">Limited Liability (LLC)</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-slate-400 block text-[10px] font-medium">Registration Date</span>
                <span className="font-semibold text-[#7A2E16] mt-0.5 block">19 / 03 / 2006 (20 Yrs)</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-slate-400 block text-[10px] font-medium">DM Contractor Grade</span>
                <span className="font-semibold text-emerald-800 mt-0.5 block">G+1 Approved</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-slate-400 block text-[10px] font-medium">D&B D-U-N-S®</span>
                <span className="font-semibold text-slate-900 mt-0.5 block font-mono">{COMPANY_INFO.dunsNumber}</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-slate-400 block text-[10px] font-medium">DCCI Membership</span>
                <span className="font-semibold text-slate-900 mt-0.5 block font-mono">No. {COMPANY_INFO.dcciNo}</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF]">
                <span className="text-slate-400 block text-[10px] font-medium">Commercial Register</span>
                <span className="font-semibold text-slate-900 mt-0.5 block font-mono">No. {COMPANY_INFO.registerNo}</span>
              </div>
            </div>

            {/* Approved Activities List */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                Licensed Commercial Activities
              </span>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {COMPANY_INFO.specialties.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFE9DF] text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2E16] shrink-0 mt-1.5" />
                    <span className="leading-snug text-[11px] font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>General Manager: <strong className="text-slate-800 font-semibold">Jose K. George</strong></span>
              <span className="text-[11px] font-mono text-emerald-800 font-medium">Dubai Municipality Verified</span>
            </div>

          </div>

          {/* Institutional Accreditation Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-7 shadow-sm space-y-4">
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
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF] text-center">
                  <div className="text-xl font-bold text-[#7A2E16] font-display">20+ Yrs</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Continuous Standing</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EFE9DF] text-center">
                  <div className="text-xl font-bold text-emerald-800 font-display">G+1</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">Contractor License</div>
                </div>
              </div>
            </div>

            <div className="bg-[#14171F] text-white rounded-2xl p-7 shadow-sm space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C59B27] block">
                Official Tender Submissions
              </span>
              <h4 className="text-lg font-bold font-display text-white">
                Submit Architectural Plans for Tendering
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Send consultant-approved Croquis, structural drawings, and BOQ files for comprehensive contractor pricing under strict UAE commercial non-disclosure practices.
              </p>
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

      </div>
    </section>
  );
}
