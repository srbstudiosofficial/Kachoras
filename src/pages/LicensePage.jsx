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
  AlertCircle
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

      {/* 2. Official Trade License Section */}
      <TradeLicenseSection />

      {/* 3. Dubai Municipality Civic Works & Public Contracts */}
      <MunicipalSection />

      {/* 4. Pre-Qualification Dossier Notice for Main Contractors & Consultants */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Subcontractor & Main Contractor Pre-Qualification (PQD)</span>
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] font-display">
                Request Complete Legal Credentials & Prequalification Dossier
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consultants, developers, and project management offices (PMOs) can request our verified Trade License copy, Dubai Municipality G+1 Classification Certificate, Chamber of Commerce Certificate, and list of completed projects for official vendor registration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-[#B3261E] hover:bg-[#961F18] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <span>Request PQD Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Footer Call to Action */}
      

    </div>
  );
}
