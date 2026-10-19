import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Building2, 
  CheckCircle2, 
  Calculator, 
  FileText,
  MapPin,
  MessageSquare,
  Sparkles,
  Layers,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import ArchitecturalVisual from './ArchitecturalVisual';

const SPECIMENS = [
  {
    id: 'villa',
    label: 'G+1 Luxury Villa',
    visualType: 'villa',
    plotNo: '4317233',
    location: 'Wadi Al Shabak, Dubai',
    bua: '8,400 sq.ft',
    consultant: 'Croquis Engineering',
    category: 'Private G+1 Villa (Completed 2024-2025)'
  },
  {
    id: 'majlis',
    label: 'Royal Arabian Majlis',
    visualType: 'majlis',
    plotNo: '3670958',
    location: 'Umm Al Sheif, Dubai',
    bua: '4,200 sq.ft',
    consultant: 'Active Execution',
    category: 'Bespoke Majlis Pavilion'
  },
  {
    id: 'civic',
    label: 'Municipality Civic Hub',
    visualType: 'municipality',
    plotNo: '8912682',
    location: 'Hatta / Dubai Municipality',
    bua: '12,500 sq.ft',
    consultant: 'Dubai Municipality Works',
    category: 'Civic Veterinary Facility'
  },
  {
    id: 'mep',
    label: 'HVAC & MEP Plant',
    visualType: 'mep',
    plotNo: 'DEWA-MDB',
    location: 'Al Barsha Second, Dubai',
    bua: '100% Complete',
    consultant: 'DEWA Approved Standards',
    category: 'Commercial Electromechanical Core'
  }
];

export default function Hero({ onOpenQuoteModal }) {
  const [selectedSpecimen, setSelectedSpecimen] = useState(SPECIMENS[0]);

  return (
    <section className="relative min-h-[94vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#F4EFE6] via-[#FBF9F5] to-[#FBF9F5]">
      
      {/* Blueprint Grid Watermark */}
      <div className="absolute inset-0 bg-architect-grid opacity-70 pointer-events-none" />
      
      {/* Subtle Gold / Bronze Gradient Glow */}
      <div className="absolute -top-24 right-0 w-[600px] h-[600px] bg-[#C59B27]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7A2E16]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full z-10">
        
        {/* Ticker Ribbon */}
        <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E5DED3] shadow-sm text-xs font-semibold text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[#7A2E16] font-black uppercase tracking-wider text-[11px]">
            Dubai Municipality G+1 License #578964
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">Est. 2006 • 20-Year UAE Contracting Legacy</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="space-y-4">
              <div className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#C59B27] flex items-center gap-2">
                <span>كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111827] leading-[1.08] font-display">
                MASTERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A2E16] via-[#9E3D1E] to-[#7A2E16]">
                  DUBAI ARCHITECTURE.
                </span>
                <br />
                ENGINEERING LEGACY.
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl font-normal leading-relaxed pt-1">
                Since 2006, <strong>Kachoras Electromechanical Contracting LLC</strong> has delivered turnkey G+1 luxury residences, royal majlis pavilions, Dubai Municipality civic projects, and precision MEP infrastructure under unified Dubai Municipality engineering compliance.
              </p>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0" />
                <span>G+1 Villa Construction</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0" />
                <span>Bespoke Majlis Blocks</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0" />
                <span>Full MEP & HVAC Works</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0" />
                <span>Aluminium & Glass Yard</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0" />
                <span>Dubai Municipality Works</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7A2E16] shrink-0" />
                <span>Gypsum & Luxury Joinery</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <button
                onClick={() => onOpenQuoteModal()}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7A2E16] to-[#943B20] hover:from-[#652310] hover:to-[#7A2E16] text-white font-extrabold text-sm rounded-xl shadow-luxury transition transform hover:-translate-y-0.5 active:translate-y-0 border border-[#C59B27]/40"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27] stroke-[2.5]" />
              </button>

              <a
                href="#portfolio"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-[#F4EFE6] text-slate-800 font-bold text-sm rounded-xl border border-[#E5DED3] transition shadow-sm"
              >
                <Building2 className="w-4 h-4 text-[#7A2E16]" />
                <span>Explore 2024-2025 Projects</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5 text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#7A2E16]" />
                <span>Dubai Municipality G+1 Certified</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <FileText className="w-4 h-4 text-[#7A2E16]" />
                <span>D&B D-U-N-S: {COMPANY_INFO.dunsNumber}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Award className="w-4 h-4 text-[#C59B27]" />
                <span>DCCI: {COMPANY_INFO.dcciNo}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Architectural Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DED3] shadow-luxury space-y-5 relative overflow-hidden">
              
              {/* Interactive Specimen Selector Tabs */}
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7A2E16]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#7A2E16]">
                    Interactive Portfolio Specimen
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#C59B27] bg-[#F7EFCF] px-2.5 py-0.5 rounded-full border border-[#C59B27]/40">
                  {selectedSpecimen.plotNo}
                </span>
              </div>

              {/* Specimen Switcher Buttons */}
              <div className="grid grid-cols-4 gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#E5DED3]">
                {SPECIMENS.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecimen(spec)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition truncate text-center ${
                      selectedSpecimen.id === spec.id
                        ? 'bg-[#7A2E16] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {spec.label.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Photorealistic Render / CAD Dual View Container */}
              <div className="rounded-2xl overflow-hidden border border-[#E5DED3] shadow-inner h-64">
                <ArchitecturalVisual 
                  type={selectedSpecimen.visualType} 
                  plotNo={selectedSpecimen.plotNo} 
                  location={selectedSpecimen.location}
                  category={selectedSpecimen.category}
                  className="w-full h-full"
                />
              </div>

              {/* Active Specimen Metadata */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FBF9F5] p-3 rounded-xl border border-[#E5DED3]">
                  <div className="text-xl font-black text-[#7A2E16] font-display">{selectedSpecimen.bua}</div>
                  <div className="text-[11px] text-slate-500 font-semibold">{selectedSpecimen.category}</div>
                </div>

                <div className="bg-[#FBF9F5] p-3 rounded-xl border border-[#E5DED3]">
                  <div className="text-base font-bold text-slate-900 truncate font-display">{selectedSpecimen.location}</div>
                  <div className="text-[11px] text-slate-500 font-semibold truncate">Consultant: {selectedSpecimen.consultant}</div>
                </div>
              </div>

              {/* In-Charge Details Bar */}
              <div className="bg-[#F4EFE6] p-3.5 rounded-xl border border-[#E5DED3] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">General Manager In-Charge</div>
                  <div className="text-xs font-bold text-[#111827]">Jose K. George (+971 55 5585079)</div>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-xs font-bold text-[#7A2E16] hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
              </div>

            </div>

            {/* Quick 20-Year Milestones Grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white border border-[#E5DED3] p-2.5 rounded-xl shadow-sm">
                <div className="text-lg font-black text-[#7A2E16] font-display">2006</div>
                <div className="text-[10px] text-slate-500 font-semibold">Established</div>
              </div>
              <div className="bg-white border border-[#E5DED3] p-2.5 rounded-xl shadow-sm">
                <div className="text-lg font-black text-[#C59B27] font-display">G+1</div>
                <div className="text-[10px] text-slate-500 font-semibold">DM License</div>
              </div>
              <div className="bg-white border border-[#E5DED3] p-2.5 rounded-xl shadow-sm">
                <div className="text-lg font-black text-emerald-600 font-display">100%</div>
                <div className="text-[10px] text-slate-500 font-semibold">Compliance</div>
              </div>
              <div className="bg-white border border-[#E5DED3] p-2.5 rounded-xl shadow-sm">
                <div className="text-lg font-black text-slate-800 font-display">380+</div>
                <div className="text-[10px] text-slate-500 font-semibold">Completed</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
