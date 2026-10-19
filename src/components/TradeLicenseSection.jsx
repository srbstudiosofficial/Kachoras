import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  Building, 
  Award, 
  Calendar,
  Lock,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function TradeLicenseSection() {
  return (
    <section id="license" className="py-24 bg-[#F4EFE6] border-t border-[#E5DED3] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-architect-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A2E16]/10 border border-[#7A2E16]/30 text-[#7A2E16] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Government of Dubai • Commercial License #578964 Verified</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight font-display">
            COMMERCIAL TRADE LICENSE
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Fully certified by the Government of Dubai, Department of Economy and Tourism (DET), with official G+1 Building Contracting approval from Dubai Municipality.
          </p>
        </div>

        {/* Certificate Card Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Detailed Commercial License Certificate Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#7A2E16]/40 rounded-3xl p-6 sm:p-10 shadow-luxury space-y-6 relative overflow-hidden">
            
            {/* Certificate Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#7A2E16]/20 pb-6">
              <div>
                <div className="text-[11px] font-black uppercase tracking-widest text-[#7A2E16]">
                  GOVERNMENT OF DUBAI • ECONOMY AND TOURISM
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111827] font-display mt-0.5">
                  COMMERCIAL LICENSE (رخصة تجارية)
                </h3>
                <span className="text-xs font-serif italic text-slate-500 block">
                  Kachoras Electromechanical Contracting L.L.C (ش.ذ.م.م)
                </span>
              </div>
              <div className="text-right bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5DED3]">
                <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-wider">License Number</span>
                <span className="text-2xl font-black text-[#7A2E16] font-mono tracking-wider">{COMPANY_INFO.licenseNumber}</span>
              </div>
            </div>

            {/* License Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <span className="text-slate-500 block text-[11px] font-medium">Legal Type</span>
                <span className="font-bold text-slate-900 mt-0.5 block">Limited Liability (LLC)</span>
              </div>
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <span className="text-slate-500 block text-[11px] font-medium">Established Date</span>
                <span className="font-bold text-[#7A2E16] mt-0.5 block">19 / 03 / 2006 (20 Yrs)</span>
              </div>
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <span className="text-slate-500 block text-[11px] font-medium">Municipality Grade</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">G+1 Approved</span>
              </div>
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <span className="text-slate-500 block text-[11px] font-medium">D&B D-U-N-S®</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{COMPANY_INFO.dunsNumber}</span>
              </div>
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <span className="text-slate-500 block text-[11px] font-medium">DCCI Membership</span>
                <span className="font-bold text-slate-900 mt-0.5 block">No. {COMPANY_INFO.dcciNo}</span>
              </div>
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                <span className="text-slate-500 block text-[11px] font-medium">Commercial Register</span>
                <span className="font-bold text-slate-900 mt-0.5 block">No. {COMPANY_INFO.registerNo}</span>
              </div>
            </div>

            {/* Officially Licensed Activities */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                Approved Commercial Activities (نشاط الرخصة التجارية)
              </span>
              <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                {COMPANY_INFO.specialties.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DED3] text-slate-800 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#7A2E16] shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Certificate Notes */}
            <div className="pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span>Manager / In-Charge: <strong className="text-slate-900">Jose Kachora George</strong></span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Dubai Municipality Electronic Register (deqsmart.dm.gov.ae)
              </span>
            </div>

          </div>

          {/* Right Column: Municipal Partner Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Dubai Municipality Trust Card */}
            <div className="bg-white border border-[#E5DED3] rounded-3xl p-7 shadow-luxury space-y-4">
              <div className="flex items-center gap-3.5 border-b border-[#F0EBE1] pb-4">
                <div className="w-13 h-13 rounded-2xl bg-[#7A2E16]/10 border border-[#7A2E16]/30 flex items-center justify-center text-[#7A2E16]">
                  <Building className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#111827] font-display">
                    Dubai Municipality Partner
                  </h4>
                  <p className="text-xs text-[#7A2E16] font-semibold">General Maintenance Department Contractor</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kachoras Electromechanical Contracting LLC is actively registered and approved for civil contracting and specialized electromechanical maintenance across Dubai and Hatta public sectors.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                  <div className="text-2xl font-black text-[#7A2E16] font-display">20 Yrs</div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Continuous Record</div>
                </div>
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DED3]">
                  <div className="text-2xl font-black text-[#C59B27] font-display">G+1</div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Civil License Grade</div>
                </div>
              </div>
            </div>

            {/* Official Coordinates Badge */}
            <div className="bg-white border border-[#E5DED3] p-6 rounded-3xl space-y-2.5 text-xs text-slate-600 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Official Registered Address (Dubai DET)
              </div>
              <div className="font-semibold text-slate-800 leading-relaxed text-sm">
                {COMPANY_INFO.address}
              </div>
              <div className="text-[#7A2E16] font-bold pt-1 text-xs">
                P.O. Box: {COMPANY_INFO.poBox} • Phone: {COMPANY_INFO.phone}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
