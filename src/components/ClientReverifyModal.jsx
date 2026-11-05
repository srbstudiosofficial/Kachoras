import React, { useState } from 'react';
import { CheckCircle2, X, ExternalLink, Image, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const SECTIONS = [
  {
    id: 'hero',
    title: '01: Hero & Navbar',
    targetId: 'top',
    screenshot: './client-screenshots/01-hero-showcase.png',
    checks: [
      { label: 'Company Title', value: 'Kachoras Electro-Mechanical Contracting LLC (Exact Title)' },
      { label: 'License Strip', value: 'Dubai Municipality Approved G+1 Contractor • License #578964 | Al Qusais' },
      { label: 'Subhead (Arabic)', value: 'كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م • EST. 2006' },
      { label: 'Editorial Paragraphs', value: 'Exact 2 paragraphs on 20+ years, MEP, villas & quality management' },
      { label: 'Action Buttons', value: 'ENQUIRY / RFQ →, EXPLORE DISCIPLINES, 04-2390946' },
      { label: 'Metrics Bar', value: '20+ Years in Dubai | G+1 License | 380+ Works | 100% DM & DEWA Compliance' },
      { label: 'Showcase Card', value: 'Luxury G+1 Villa | CIVIL & MEP | Plot 4317233 | BUA 8,400 sq.ft | Croquis Eng.' }
    ]
  },
  {
    id: 'vision',
    title: '02: Vision & Mission',
    targetId: 'vision',
    screenshot: './client-screenshots/02-vision-mission.png',
    checks: [
      { label: 'Section Header', value: 'Vision & Mission (Institutional Values & Governance)' },
      { label: 'Governance Lead', value: 'Since 2006, Kachoras ElectroMechanical Contracting LLC has been guided...' },
      { label: 'Vision Card', value: 'Strategic Purpose 01 / VISION: Leading contracting company for quality...' },
      { label: 'Mission Card', value: 'Operational Commitment 02 / MISSION: Exceptional services & engineering excellence...' },
      { label: 'Verification Badges', value: 'Quality & Sustainable Handover | DM G+1 | Client Accountability | Est. 2006' }
    ]
  },
  {
    id: 'disciplines',
    title: '03: Disciplines',
    targetId: 'services',
    screenshot: './client-screenshots/03-disciplines.png',
    checks: [
      { label: 'Section Title', value: 'Disciplines (Capabilities & Contracting Scope)' },
      { label: 'Lead Text', value: 'Exact 2 paragraphs on civil, MEP, aluminium fabrication & project delivery' },
      { label: '01 Building Contracting', value: 'Ground-up civil execution, structural substructures, luxury villas & majlis' },
      { label: '02 MEP Works', value: 'Ducted HVAC, DEWA electrical, plumbing + Normal realistic engineering photo' },
      { label: '03 Aluminium & Glass', value: 'Thermal-break profiles, double-glazed curtain walls, glass balustrades' },
      { label: '04 Civil Maintenance', value: 'DM works with Internal Villa Photography' },
      { label: '05 Kitchen Cabinets (NEW)', value: 'Custom luxury modular kitchens, islands, wardrobes, Blum/Häfele hardware' },
      { label: '06 Gypsum Works (NEW)', value: 'Classical & modern false ceilings, concealed LED troughs, GRC screens' }
    ]
  },
  {
    id: 'projects',
    title: '04: Projects & Pipeline',
    targetId: 'projects',
    screenshot: './client-screenshots/04-projects-portfolio.png',
    checks: [
      { label: 'Section Title', value: 'Projects & Upcoming Works (Contracting Projects • Future Pipeline)' },
      { label: 'Navigation Tabs', value: 'All Works (6) | Upcoming Tenders (2) | Active Construction (6) | Completed (380)' },
      { label: 'Active Tab Styling', value: 'Active Construction highlighted with solid warm terracotta tab' },
      { label: 'Featured Active Site', value: 'Proposed Majlis Block & Structural Remodel (Plot #6716536, Al Barsha South 1st)' },
      { label: 'Client / Consultant', value: 'Maha Ebrahim Mohammad Hassan Alblooshi | Teamwork Engineering' },
      { label: 'Timeline & Badges', value: 'Under Construction | Superstructure Pours & MEP Rough-Ins' }
    ]
  },
  {
    id: 'municipal',
    title: '05: Dubai Municipality Works',
    targetId: 'municipal',
    screenshot: './client-screenshots/05-municipal-works.png',
    checks: [
      { label: 'Top Split Banner', value: 'Normal realistic civic works photo with DM General Maintenance Dept tag' },
      { label: 'Headline', value: 'Executing Public Infrastructure Across Dubai & Hatta' },
      { label: 'Inspection Metric', value: '100% Municipal Inspection Pass Rate' },
      { label: 'Delivered Metric', value: '7+ Contracts Delivered Public Facilities' },
      { label: 'Initial 6 Contracts', value: 'Hatta Clinics, Boundary Wall, Al Quoz Pest Control, Mirdif Chamber, Parks, Sculptures' },
      { label: 'New Contract Added', value: 'Modifications, Maintenance and Painting works at Cattle Market, Al Qusais' }
    ]
  },
  {
    id: 'tender',
    title: '06: Tender Proposal / RFQ',
    targetId: 'contact',
    screenshot: './client-screenshots/06-tender-rfq.png',
    checks: [
      { label: 'Section Header', value: 'Tenders & Technical Submissions: Request an Official Tender Proposal' },
      { label: 'Office Details', value: 'B25 Bin Sougat, Al Qusais 1 | Tel: 04-2390946 | Fax: 04-2582778 | Mobile: +971-55-5585079' },
      { label: 'Working Hours', value: 'Saturday – Thursday: 7:30 AM – 6:00 PM | Friday Closed' },
      { label: 'Licenses & Ratings', value: 'Commercial License #578964 | DM G+1 Contractor | D-U-N-S #561419908' },
      { label: 'Form Placeholders', value: 'Client: Mr. Khalifa Almas | Plot No: 4317233, Al Barsha | Budget: Optional/As per BOQ' },
      { label: 'Attachment Uploader', value: 'Max 50MB (PDF, CAD DWG/DXF, Images, ZIP)' },
      { label: 'Category Dropdown', value: 'Updated to include Kitchen Cabinets & Wardrobes + Gypsum Decoration Works' }
    ]
  }
];

export default function ClientReverifyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) return null;

  const current = SECTIONS[activeTab];

  const handleJump = (targetId) => {
    onClose();
    setTimeout(() => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF9F6] border-2 border-[#7A2E16] max-w-6xl w-full h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#14171F] text-white p-4 px-6 flex items-center justify-between border-b border-[#2D3748]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display tracking-wide">
                Client Data Re-Verification Panel
              </h2>
              <p className="text-xs text-slate-400">
                Cross-referencing all 6 client screenshots against the active prototype
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#E5DED3] bg-white px-4 py-2 gap-2 text-xs">
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                idx === activeTab
                  ? 'bg-[#7A2E16] text-white shadow'
                  : 'bg-[#FAF8F5] text-slate-700 hover:bg-[#F2ECE1] border border-[#E5DED3]'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${idx === activeTab ? 'text-amber-300' : 'text-emerald-600'}`} />
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* Modal Body: Split View (Screenshot Left, Checklist Right) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid lg:grid-cols-12 gap-6 bg-[#FAF9F6]">
          
          {/* Left Column: Client Screenshot (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-white rounded-xl border border-[#E5DED3] p-3 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DED3] text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Image className="w-4 h-4 text-[#7A2E16]" />
                Client Reference Screenshot
              </span>
              <a
                href={current.screenshot}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#7A2E16] hover:underline flex items-center gap-1"
              >
                <span>Open Full Resolution</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 mt-3 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center p-2 min-h-[300px] max-h-[550px]">
              <img
                src={current.screenshot}
                alt={current.title}
                className="max-h-full max-w-full object-contain rounded shadow"
              />
            </div>
          </div>

          {/* Right Column: Verification Checklist (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl border border-[#E5DED3] p-5 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                <span className="text-xs uppercase font-bold text-[#8B6D1B]">
                  Section Audit ({activeTab + 1} of 6)
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  100% Included
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#14171F] font-display mt-2">
                {current.title} Checklist
              </h3>

              <div className="mt-4 space-y-3">
                {current.checks.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#EFE9DF]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-[#14171F] block">{c.label}</span>
                      <span className="text-slate-600 text-[11px] leading-snug">{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DED3] flex items-center justify-between gap-3">
              <button
                onClick={() => handleJump(current.targetId)}
                className="flex-1 py-2.5 px-4 bg-[#7A2E16] hover:bg-[#652310] text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>Jump to this Section on Prototype</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
                  className="p-2 border border-[#E5DED3] rounded-lg disabled:opacity-40 hover:bg-[#FAF8F5]"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  disabled={activeTab === SECTIONS.length - 1}
                  onClick={() => setActiveTab(prev => Math.min(SECTIONS.length - 1, prev + 1))}
                  className="p-2 border border-[#E5DED3] rounded-lg disabled:opacity-40 hover:bg-[#FAF8F5]"
                >
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
