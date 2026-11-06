import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';
import OfficeMapSection from '../components/OfficeMapSection';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function ContactPage({ onNavigate, onOpenQuoteModal }) {
  return (
    <div className="space-y-0">
      
      {/* 1. Page Header */}
      <PageHeader 
        title="Contact Estimating Desk & Headquarters"
        subtitle="Submit Villa Blueprints, Request Tender Proposals & Schedule In-Person Technical Consultations in Al Qusais"
        breadcrumb="Contact & Tender Desk"
        onNavigate={onNavigate}
      />

      {/* 2. Quick Communication Channels Strip */}
      <section className="py-10 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#7A2E16] transition group flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7A2E16]/10 text-[#7A2E16] flex items-center justify-center shrink-0 group-hover:bg-[#7A2E16] group-hover:text-white transition">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dubai Landline</span>
                <strong className="block text-sm font-bold text-slate-900 font-mono">{COMPANY_INFO.phone}</strong>
                <p className="text-[11px] text-slate-500">Official Switchboard</p>
              </div>
            </a>

            <a 
              href="https://wa.me/971565066904?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai."
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 hover:border-emerald-500 transition group flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Direct WhatsApp</span>
                <strong className="block text-sm font-bold text-slate-900 font-mono">+971 56 506 6904</strong>
                <p className="text-[11px] text-emerald-700">Immediate Technical Chat</p>
              </div>
            </a>

            <a 
              href={`mailto:${COMPANY_INFO.email}`}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] hover:border-[#7A2E16] transition group flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7A2E16]/10 text-[#7A2E16] flex items-center justify-center shrink-0 group-hover:bg-[#7A2E16] group-hover:text-white transition">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estimating Desk Email</span>
                <strong className="block text-xs font-bold text-slate-900 break-all">{COMPANY_INFO.email}</strong>
                <p className="text-[11px] text-slate-500">Drawings & Tender Docs</p>
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DED3] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#C59B27]/15 text-[#7A2E16] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Visiting Hours</span>
                <strong className="block text-xs font-bold text-slate-900">Sat – Thu: 8AM – 6PM</strong>
                <p className="text-[11px] text-slate-500">Friday: Site Operations Only</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Direct Tender Transmittal & RFP Form */}
      <ContactSection />

      {/* 4. Warehouse B-25 Al Qusais Office & Interactive Google Map */}
      <OfficeMapSection />

    </div>
  );
}
