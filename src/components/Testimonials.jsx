import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileCheck2,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

const CONSULTANCY_RECORDS = [
  {
    consultant: 'Al Manhal Engineering Consultants',
    discipline: 'Construction of G+1 Villa and Service Block',
    location: 'Al Warqaa Fourth, Dubai',
    plotRef: 'Plot # 424 7036',
    client: 'Mariam Hussain Redha Hassan Albannay',
    scope: 'Full civil structural frame, post-tensioned slabs, MEP installations, and Dubai Municipality BCC certification.'
  },
  {
    consultant: 'Al Majal Engineering Consultants',
    discipline: 'Construction of G+1 Villa & Boundary Wall',
    location: 'Al Warqaa Third, Dubai',
    plotRef: 'Plot # 4231407',
    client: 'Abdul Raouf Siraj Shehab Ahmad Mohammad',
    scope: 'Turnkey residential villa, specialized electrical fittings, and in-house aluminium thermal-break glazing.'
  },
  {
    consultant: 'Croquis Engineering Consultancy',
    discipline: 'Construction of G+1 Villa',
    location: 'Al Athbah, Dubai',
    plotRef: 'Plot # 4317233',
    client: 'Khalifa Sebil Almas Khamis Salmin',
    scope: 'Complete G+1 villa construction under direct Dubai Municipality engineering supervision and inspections.'
  },
  {
    consultant: 'Gulf Engineering Consultants',
    discipline: 'Construction of G+1 Villa, Majlis and Service Block',
    location: 'Al Barsha Second, Dubai',
    plotRef: 'Plot # 3760253',
    client: 'Ahmed Khalil Ibrahim Al Sayegh',
    scope: 'Reinforced concrete structure, traditional majlis pavilion, and turnkey MEP integration.'
  },
  {
    consultant: 'Teamwork Engineering Consultants',
    discipline: 'Construction of G+1 Villa and Additional Block',
    location: 'Al Athbah, Dubai',
    plotRef: 'Plot # 4314129',
    client: 'Ahmad Jaber Ismail Ali Alsaffar',
    scope: 'Superstructure concrete casting, additional service quarters, and full architectural coordination.'
  },
  {
    consultant: 'Al Anwar Architectural Engineering Consultancies',
    discipline: 'Construction of G+1 Villa and Service Block',
    location: 'Al Awir First, Dubai',
    plotRef: 'Plot # 7117134',
    client: 'Rashid Saeed Tarish Saif Al marri',
    scope: 'Full turnkey structural delivery of residential G+1 villa and independent service annex.'
  }
];

export default function Testimonials() {
  return (
    <section id="consultants" className="py-10 sm:py-14 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
            Consultant Coordination & Execution Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111622] font-display">
            Approved Consultant Engineering
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kachoras operates under direct supervision and inspections with following architectural and structural engineering consultancies.
          </p>
        </div>

        {/* 6-Card Consultant Grid matching Client Evaluation PDF Page 5 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONSULTANCY_RECORDS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#B3261E] hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <span className="text-[11px] font-mono font-bold text-[#B3261E] bg-[#B3261E]/10 px-2.5 py-0.5 rounded">
                    {item.plotRef}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.location}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#111622] font-display leading-snug">
                  {item.consultant}
                </h3>

                <div className="text-xs font-semibold text-[#8B6D1B]">
                  {item.discipline}
                </div>

                {/* Approved Client Name Only */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700">
                  <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong className="text-slate-500 font-medium">Client:</strong> {item.client}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Direct Consultant Supervision & BCC Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
