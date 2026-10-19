import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  UploadCloud,
  FileText,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    plotNo: '',
    serviceType: 'Building Contracting (G+1 Villa / Majlis)',
    budgetRange: 'AED 1.5M - AED 5M',
    location: 'Dubai',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem('kachoras_inquiries') || '[]');
      existing.push({
        ...formData,
        attachedFile,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('kachoras_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleFakeFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0].name);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FBF9F5] relative border-t border-[#E5DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B6D1B] block">
            Tenders & Technical Submissions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            Request an Official Tender Proposal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Submit your plot drawings, villa floorplans, or MEP scope for evaluation by our engineering managers in Al Qusais. Direct response provided within 24 business hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Official Contact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-black text-[#1E293B] font-display border-b border-[#E5DED3] pb-4">
                Corporate Office Details
              </h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-[#7A2E16]/10 flex items-center justify-center text-[#7A2E16] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Office & Workshop Location:</strong>
                    <span className="leading-relaxed block mt-0.5">{COMPANY_INFO.address}</span>
                    <span className="text-xs text-[#64748B] block mt-0.5 font-medium">Post Box: {COMPANY_INFO.poBox}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-[#7A2E16]/10 flex items-center justify-center text-[#7A2E16] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Official Landline:</strong>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#7A2E16] font-bold hover:underline text-sm">
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[#64748B] block text-xs mt-0.5">Fax: {COMPANY_INFO.fax} | Mobile: {COMPANY_INFO.mobile}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-[#7A2E16]/10 flex items-center justify-center text-[#7A2E16] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Official Email Desk:</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#7A2E16] font-bold hover:underline text-sm">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Working Hours:</strong>
                    <span className="block">Saturday – Thursday: 7:30 AM – 6:00 PM</span>
                    <span className="block text-[#64748B] text-xs mt-0.5 font-medium">Friday Closed • Emergency site teams on call</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/971555585079?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat (+971 55 5585079)</span>
                </a>
              </div>

              {/* License Quick Summary */}
              <div className="bg-[#FBF9F5] border border-[#E5DED3] p-4 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-[#7A2E16] block uppercase tracking-wider text-[11px]">
                  Government of Dubai License Verified
                </span>
                <div className="text-[#475569] space-y-1">
                  <div>Commercial License No: <strong className="text-[#1E293B] font-mono font-bold">{COMPANY_INFO.licenseNumber}</strong></div>
                  <div>Dubai Municipality: <strong className="text-emerald-700 font-bold">G+1 Building Contractor</strong></div>
                  <div>D&B D-U-N-S: <strong className="text-[#1E293B] font-mono font-bold">{COMPANY_INFO.dunsNumber}</strong></div>
                </div>
              </div>

            </div>

            {/* Quality Commitment Card */}
            <div className="bg-[#7A2E16]/5 border border-[#7A2E16]/20 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#7A2E16] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#7A2E16]" />
                <span>Our Dubai Contracting Guarantee</span>
              </div>
              <ul className="text-xs text-[#475569] space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Full compliance with Dubai Municipality & DEWA building codes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  In-house aluminium & glass fabrication at Al Qusais B-25
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Certified resident engineers on-site from shoring to handover
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: RFP & Bid Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5DED3] rounded-2xl p-6 sm:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 px-4 space-y-5">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Inquiry Logged Successfully</span>
                  <h3 className="text-2xl font-black text-[#1E293B] font-display">Tender / RFP Transmitted!</h3>
                </div>
                <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1E293B]">{formData.name}</strong>. Your project details have been recorded. You can also connect directly with our engineering desk right now:
                </p>

                {/* Instant Dispatch Actions */}
                <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                  <a
                    href={`https://wa.me/971555585079?text=${encodeURIComponent(
                      `*NEW KACHORAS PROJECT INQUIRY*\n• Client: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Service: ${formData.serviceType}\n• Plot/Area: ${formData.plotNo || 'Dubai'}\n• Budget: ${formData.budgetRange}\n• Scope: ${formData.message || 'Consultation request'}${attachedFile ? `\n• Drawing: ${attachedFile}` : ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+971 55 5585079)</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`RFP Tender: ${formData.serviceType} - ${formData.name}`)}&body=${encodeURIComponent(
                      `Dear Kachoras Estimating Team,\n\nI would like to submit a project inquiry:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Service: ${formData.serviceType}\n• Plot/Location: ${formData.plotNo || 'Dubai'}\n• Budget Range: ${formData.budgetRange}\n• Scope Details: ${formData.message || 'N/A'}\n${attachedFile ? `• Attached Document: ${attachedFile}\n` : ''}\nBest regards,\n${formData.name}`
                    )}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Desk</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E5DED3]">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        plotNo: '',
                        serviceType: 'Building Contracting (G+1 Villa / Majlis)',
                        budgetRange: 'AED 1.5M - AED 5M',
                        location: 'Dubai',
                        message: ''
                      });
                      setAttachedFile(null);
                    }}
                    className="text-xs font-bold text-[#64748B] hover:text-[#1E293B] underline transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E5DED3] pb-4">
                  <h3 className="text-xl font-black text-[#1E293B] font-display">Submit RFP / Villa Tender</h3>
                  <p className="text-xs text-[#64748B] mt-1 font-medium">Direct routing to General Manager Jose K. George and engineering managers.</p>
                </div>

                {/* Name & Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Client / Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Khalifa Almas"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Contact Number (UAE Mobile) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971-5X-XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    />
                  </div>
                </div>

                {/* Email & Plot No */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Plot Number / Location in Dubai</label>
                    <input
                      type="text"
                      placeholder="e.g. Plot No. 4317233, Al Barsha"
                      value={formData.plotNo}
                      onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    />
                  </div>
                </div>

                {/* Service Discipline & Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Service Category</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    >
                      <option value="Building Contracting (G+1 Villa / Majlis)">Building Contracting (G+1 Villa / Majlis)</option>
                      <option value="MEP & HVAC Engineering">MEP & HVAC Engineering</option>
                      <option value="Aluminium and Glass Works">Aluminium and Glass Works</option>
                      <option value="Civil Maintenance & Gypsum Decor">Civil Maintenance & Gypsum Decor</option>
                      <option value="Dubai Municipality Civic Projects">Dubai Municipality Civic Projects</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Estimated Budget (AED)</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    >
                      <option value="Under AED 500k">Under AED 500,000</option>
                      <option value="AED 500k - AED 1.5M">AED 500,000 – AED 1,500,000</option>
                      <option value="AED 1.5M - AED 5M">AED 1,500,000 – AED 5,000,000</option>
                      <option value="AED 5M - AED 15M">AED 5,000,000 – AED 15,000,000</option>
                      <option value="AED 15M+">AED 15,000,000+ (Major Development)</option>
                    </select>
                  </div>
                </div>

                {/* Scope / Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">Scope Description / Consultant Details</label>
                  <textarea
                    rows="3"
                    placeholder="Provide details about consultant (e.g. Croquis, Al Manhal), required ground breaking date, Majlis requirements, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                  />
                </div>

                {/* File upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E293B] flex items-center justify-between">
                    <span>Attach Municipality Drawings / Blueprints & BOQ</span>
                    <span className="text-[11px] text-[#64748B] font-normal">Optional (Max 50MB)</span>
                  </label>
                  <div className="relative border-2 border-dashed border-[#CBD5E1] hover:border-[#7A2E16] rounded-xl p-4 text-center cursor-pointer transition bg-[#FBF9F5]">
                    <input
                      type="file"
                      onChange={handleFakeFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-6 h-6 text-[#7A2E16] mx-auto mb-1" />
                    <div className="text-xs text-[#64748B]">
                      {attachedFile ? (
                        <span className="text-[#7A2E16] font-bold">Attached: {attachedFile}</span>
                      ) : (
                        <span>Click or drag blueprints, CAD files, or BOQ documents here</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#7A2E16] via-[#8E341B] to-[#7A2E16] hover:brightness-110 text-white font-black text-sm rounded-xl shadow-lg shadow-[#7A2E16]/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting to Estimating Desk...</span>
                  ) : (
                    <>
                      <span>Submit RFP to Kachoras Estimating Desk</span>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#64748B] text-center font-medium">
                  All drawings are reviewed confidentially under UAE commercial non-disclosure practices.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
