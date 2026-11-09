import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

const CONSULTANCY_RECORDS = [
  {
    consultant: 'Al Manhal Engineering Consultants',
    discipline: 'G+1 Turnkey Villa & Service Block',
    location: 'Al Warqaa Fourth, Dubai',
    plotRef: 'Plot #424-7036',
    client: 'Mariam Hussain Redha Hassan Albannay',
    scope: 'Full civil structural frame, post-tensioned slabs, MEP installations, and Dubai Municipality BCC certification.'
  },
  {
    consultant: 'Al Majal Engineering Consultants',
    discipline: 'Luxury G+1 Villa & Boundary Wall',
    location: 'Al Warqaa Third, Dubai',
    plotRef: 'Plot #423-1407',
    client: 'Abdul Raouf Siraj Shehab Ahmad Mohammad',
    scope: 'Turnkey residential villa, specialized electrical fittings, and in-house aluminium thermal-break glazing.'
  },
  {
    consultant: 'Croquis Engineering Consultancy',
    discipline: 'Majlis Block & Joinery Remodel',
    location: 'Al Barsha Second, Dubai',
    plotRef: 'Plot #3761835',
    client: 'Ismail Ibrahim Mohammad Ahmad',
    scope: 'Foundation excavation, structural blockwork, ducted AC networks, and luxury custom kitchen joinery.'
  },
  {
    consultant: 'Arkiplan Consulting Architects',
    discipline: 'G+1 Villa & Boundary Infrastructure',
    location: 'Al Barsha Second, Dubai',
    plotRef: 'Plot #3760253',
    client: 'Ahmed Khalil Ibrahim Al Sayegh',
    scope: 'Reinforced concrete structure, DEWA MDB substation connection, and architectural glazing.'
  },
  {
    consultant: 'Teamwork Engineering Consultants',
    discipline: 'Proposed Majlis Block & Interior Fitout',
    location: 'Al Barsha South First, Dubai',
    plotRef: 'Plot #6716536',
    client: 'Maha Ebrahim Mohammad Hassan Alblooshi',
    scope: 'Superstructure concrete casting, custom gypsum ceiling rough-ins, and ducted HVAC air-distribution.'
  },
  {
    consultant: 'Gulf Engineering Consultants',
    discipline: 'Structural Villa Remodel & Facade',
    location: 'Al Barsha Second, Dubai',
    plotRef: 'Plot #3760283',
    client: 'Talal Malalla Mohammad Jassem',
    scope: 'Load-bearing modifications, structural steel reinforcement, MEP rerouting, and boundary wall restoration.'
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
            Approved Consultant Engineering Partners
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kachoras operates under direct supervision and inspection protocols with premier Dubai architectural and structural engineering consultancies.
          </p>
        </div>

        {/* 6-Card Consultant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONSULTANCY_RECORDS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#B3261E] transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <span className="text-[11px] font-mono font-bold text-[#B3261E] bg-[#B3261E]/10 px-2 py-0.5 rounded">
                    {item.plotRef}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.location}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111622] font-display leading-snug">
                  {item.consultant}
                </h3>

                <div className="text-xs font-semibold text-[#8B6D1B]">
                  {item.discipline}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.scope}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] text-[11px] text-slate-500">
                Client: <strong className="text-slate-800">{item.client}</strong>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
