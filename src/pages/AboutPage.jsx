import React from 'react';
import PageHeader from '../components/PageHeader';
import VisionMissionSection from '../components/VisionMissionSection';
import SafetyStats from '../components/SafetyStats';
import Testimonials from '../components/Testimonials';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowRight, 
  Sparkles,
  MapPin,
  FileCheck2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function AboutPage({ onNavigate, onOpenQuoteModal }) {
  return (
    <div className="space-y-0">
      
            {/* 1. Page Header */}
      <PageHeader 
        title="About Kachoras Contracting"
        subtitle="20+ Years of Structural & Electromechanical Excellence Across the Emirate of Dubai (2006–2026)"
        breadcrumb="About Us"
        onNavigate={onNavigate}
      />

      {/* 2. Who We Are (ECC Reference & Client Recommended Architecture) */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E5DED3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111622] font-display tracking-tight">
            Who We Are
          </h2>
          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-sans text-left sm:text-center">
            <p>
              With over two decades of industry experience, <strong>Kachoras Electro-Mechanical Contracting LLC</strong> has built a strong reputation for delivering high-quality luxury G+1 villas, electromechanical (MEP) services, Dubai Municipality-approved general maintenance, and architectural aluminium and glass fabrication works in accordance with applicable industry standards and project specifications.
            </p>
            <p>
              We are committed to excellence in every project, combining technical expertise, skilled workmanship, rigorous safety practices, and professional project management to deliver reliable, efficient, and lasting solutions that exceed client expectations across the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Executive Leadership & Company Heritage */}
      <section className="py-20 bg-white border-b border-[#E5DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
                Executive Leadership & Company Heritage
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-display tracking-tight leading-tight">
                Two Decades of Engineering Precision Under Managing Director Jose K. George
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Established in Dubai in <strong>2006</strong>, Kachoras Electromechanical Contracting LLC was founded with a singular commitment: delivering uncompromised engineering quality for residential, commercial, and municipal clients across the UAE.
                </p>
                <p>
                  Under the stewardship of General Manager and Managing Director <strong>Jose K. George</strong>, the firm has expanded from specialized MEP works into a fully accredited <strong>Dubai Municipality G+1 Building Contractor (Commercial License #{COMPANY_INFO.licenseNumber})</strong>.
                </p>
                <p>
                  Unlike contracting firms that rely heavily on fragmented subcontractors, Kachoras maintains in-house execution across structural civil works, MEP installations, architectural aluminium and glass, and civil maintenance. This turnkey model guarantees that every project adheres to strict DEWA, Civil Defence, and Dubai Municipality standards without cost overruns or scheduling delays.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5DED3] text-center space-y-1">
                  <span className="text-2xl font-black text-[#7A2E16] font-display">2006</span>
                  <p className="text-xs text-slate-600 font-medium">Dubai Incorporation</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5DED3] text-center space-y-1">
                  <span className="text-2xl font-black text-[#7A2E16] font-display">G+1</span>
                  <p className="text-xs text-slate-600 font-medium">Municipality Approval</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5DED3] text-center space-y-1">
                  <span className="text-2xl font-black text-[#7A2E16] font-display">450+</span>
                  <p className="text-xs text-slate-600 font-medium">Delivered Works</p>
                </div>
              </div>

            </div>

            {/* Right Card: Al Qusais HQ & Executive Profile */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E5DED3] p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="border-b border-[#E5DED3] pb-4 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A2E16]">Corporate Governance</span>
                <h3 className="text-xl font-black text-[#1E293B] font-display">Kachoras Electromechanical Contracting LLC</h3>
                <p className="text-xs text-slate-600">Registered with Dubai Economy & Tourism and Dubai Municipality</p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E5DED3]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Trade License #578964</strong>
                    <span className="text-slate-600">Active status with Dubai DED and Dubai Chamber of Commerce</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E5DED3]">
                  <Building2 className="w-4 h-4 text-[#7A2E16] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Dubai Municipality G+1 License</strong>
                    <span className="text-slate-600">Permitted for structural building contracting of Ground + 1 storey developments</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E5DED3]">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Operational Headquarters</strong>
                    <span className="text-slate-600">Al Qusais Industrial 1, Warehouse B-25, Dubai, UAE</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('license')}
                  className="w-full py-3 bg-[#7A2E16] hover:bg-[#63220E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-[#C59B27]" />
                  <span>Inspect Official License Documents</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <VisionMissionSection />

      {/* 4. Safety & Operational Standards */}
      <SafetyStats />

      {/* 5. Approved Consultant Engineering Partners */}
      <Testimonials />

      {/* 6. Bottom Call to Action */}
      

    </div>
  );
}
