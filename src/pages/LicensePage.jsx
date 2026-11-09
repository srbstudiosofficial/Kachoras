import React from 'react';
import PageHeader from '../components/PageHeader';
import TradeLicenseSection from '../components/TradeLicenseSection';
import MunicipalSection from '../components/MunicipalSection';
import { 
  Building2, 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Download,
  AlertCircle,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function LicensePage({ onNavigate, onOpenQuoteModal }) {
  return (
    <div className="space-y-0">
      
      {/* 1. Page Header */}
      <PageHeader 
        title="Trade License & Municipal Compliance"
        subtitle="Dubai Municipality Approved G+1 Building Contractor • Dubai Commercial License #578964 • DEWA & DCD Accredited"
        breadcrumb="License & Compliance"
        onNavigate={onNavigate}
      />

      {/* 2. Official Trade License Section (includes visual Commercial License Document) */}
      <TradeLicenseSection />

      {/* 3. Dubai Municipality Civic Works & Public Contracts */}
      <MunicipalSection />

      {/* 4. Company Prequalification & Registration (Word Document Exact) */}
      <section className="py-10 sm:py-12 bg-gradient-to-b from-white to-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B6D1B]">
                  Contractor Credentials & Documents
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111622] font-display">
                  Company Prequalification & Registration
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Kachoras welcomes enquiries from consultants, developers, main contractors, and project management companies for contractor registration and prequalification.
                </p>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                <span>Request PQD</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
              </button>
            </div>

            {/* Checklist of 6 Official Documents from Word File */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                The following documents can be provided upon request:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    num: "01", 
                    title: "Company Trade Licence", 
                    desc: "Commercial License #578964 issued by Dubai Department of Economy and Tourism",
                    downloadUrl: "./assets/dubai-commercial-license-578964.pdf",
                    downloadLabel: "Download License PDF"
                  },
                  { num: "02", title: "Dubai Municipality G+1 Approval Certificate", desc: "Building Contracting G+1 accreditation & statutory engineer records" },
                  { num: "03", title: "Dubai Chamber Membership Certificate", desc: "Active DCCI corporate membership #169651 in good standing" },
                  { num: "04", title: "Company Registration Documents", desc: "Official establishment card, civil defense, and MOHRE compliance dossiers" },
                  { num: "05", title: "Completed Project List", desc: "Audited delivery logs across luxury residential, commercial, and municipal sites" },
                  { num: "06", title: "Relevant Technical & Company Credentials", desc: "Staff engineering qualifications, DEWA approvals, and HSE safety manuals" }
                ].map((doc, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#8B6D1B]/40 hover:shadow-xs transition flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {doc.num}
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {doc.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {doc.desc}
                        </p>
                      </div>
                    </div>

                    {doc.downloadUrl && (
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <a
                          href={doc.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download="Kachoras_Commercial_License_578964.pdf"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B3261E] hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{doc.downloadLabel}</span>
                        </a>
                        <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Available Now
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-amber-900 space-y-0.5">
                <span className="font-bold block">Need formal submission for a tender shortlist?</span>
                <span>Our estimation desk provides customized prequalification files within 24 working hours.</span>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-bold text-[#B3261E] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Contact Us to Request Our Company Prequalification Documents (PQD)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
