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
  MessageSquare,
  AlertTriangle,
  X
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { submitInquiry } from '../services/inquiryService';
import { useLanguage } from '../core/LanguageContext';

export default function ContactSection() {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    plotNo: '',
    serviceType: 'Building Contracting (G+1 Villa / Majlis)',
    budgetRange: '',
    location: 'Dubai',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [submissionRef, setSubmissionRef] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [offlineWarning, setOfflineWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setOfflineWarning(false);
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        plotNo: formData.plotNo,
        serviceType: formData.serviceType,
        budgetRange: formData.budgetRange,
        location: formData.location,
        message: formData.message
      }, attachmentFile);

      if (res && res.success) {
        setSubmissionRef(res.referenceId || '');
        setOfflineWarning(false);
        setIsSubmitted(true);
      } else if (res && res.offlineSaved) {
        setSubmissionRef(res.referenceId || '');
        setOfflineWarning(true);
        setIsSubmitted(true);
      } else {
        setSubmitError(res?.error || 'Unable to submit inquiry to company servers. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Transmission failed. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    setSubmitError('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Strict 50MB check
    if (file.size > 50 * 1024 * 1024) {
      setSubmitError(`File "${file.name}" exceeds the 50 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB). Please select a smaller drawing or document.`);
      e.target.value = '';
      return;
    }

    // Allowed extensions check
    const allowed = ['.pdf', '.dwg', '.dxf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.zip'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext) && !file.type.startsWith('image/')) {
      setSubmitError(`Unsupported file format "${ext}". Allowed: PDF, AutoCAD (DWG/DXF), Images, Word, ZIP.`);
      e.target.value = '';
      return;
    }

    setAttachmentFile(file);
    setAttachedFile(file.name);
  };

  const handleRemoveFile = () => {
    setAttachmentFile(null);
    setAttachedFile(null);
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-white relative border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2 reveal-on-scroll reveal-init">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#14171F] font-display">
            {language === 'ar' ? 'طلب عرض أسعار ومناقصة رسمية' : 'Request an Official Tender Proposal'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {language === 'ar' ? 'أرسل مخططات الأرض أو فيلتك السكنية أو نطاق الأعمال الكهروميكانيكية لتقييمها من قبل مهندسينا في القصيص. يتم الرد خلال 24 ساعة عمل.' : 'Submit your plot drawings, villa floorplans, or MEP scope for evaluation by our engineering managers in Al Qusais. Direct response provided within 24 business hours.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Official Contact Card (Equal Width & Height) */}
          <div className="flex flex-col justify-between gap-6 h-full reveal-on-scroll reveal-left">
            
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-2xl hover:border-[#B3261E] transition-all duration-500 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-black text-[#1E293B] font-display border-b border-[#E2E8F0] pb-4">
                {language === 'ar' ? 'بيانات المقر الرئيسي للمجموعة' : 'Corporate Office Details'}
              </h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-[#B3261E]/10 flex items-center justify-center text-[#B3261E] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Office & Workshop Location:</strong>
                    <span className="leading-relaxed block mt-0.5">{COMPANY_INFO.address}</span>
                    <span className="text-xs text-[#64748B] block mt-0.5 font-medium">Post Box: {COMPANY_INFO.poBox}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-[#B3261E]/10 flex items-center justify-center text-[#B3261E] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Official Landline:</strong>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#B3261E] font-bold hover:underline text-sm">
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[#64748B] block text-xs mt-0.5">Fax: {COMPANY_INFO.fax} | Mobile: {COMPANY_INFO.mobile}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-[#B3261E]/10 flex items-center justify-center text-[#B3261E] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Official Email Desk:</strong>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#B3261E] font-bold hover:underline text-sm font-mono">
                        {COMPANY_INFO.email}
                      </a>
                      <a href="mailto:info@kachoras.com" className="text-[#B3261E] font-bold hover:underline text-sm font-mono">
                        info@kachoras.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-[#475569]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-[#1E293B] block font-bold text-sm">Working Hours:</strong>
                    <span className="block font-medium text-slate-800">Monday – Saturday: 7:00 AM – 4:00 PM</span>
                    <span className="block text-[#64748B] text-xs mt-0.5 font-medium">Sunday Closed • Emergency site teams on call</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/971565066904?text=Hello%20Kachoras%20Team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project%20in%20Dubai.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat (+971 56 506 6904)</span>
                </a>
              </div>

              {/* License Quick Summary */}
              <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-[#B3261E] block uppercase tracking-wider text-[11px]">
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
            <div className="bg-[#B3261E]/5 border border-[#B3261E]/20 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#B3261E] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#B3261E]" />
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

          {/* Right Column: RFP & Bid Request Form (Equal Width & Height) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-[#B3261E] transition-all duration-500 h-full flex flex-col justify-between reveal-on-scroll reveal-right">
            {isSubmitted ? (
              <div className="text-center py-12 px-4 space-y-5">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Inquiry Logged Successfully</span>
                  <h3 className="text-2xl font-black text-[#1E293B] font-display">Tender / RFP Transmitted!</h3>
                  {submissionRef && (
                    <div className="inline-block font-mono text-xs font-bold text-[#B3261E] bg-[#F8FAFC] px-3 py-1 rounded-lg border border-[#E2E8F0] mt-1">
                      Tracking Reference: {submissionRef}
                    </div>
                  )}
                </div>
                <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1E293B]">{formData.name}</strong>. Your project specifications have been dispatched to our estimating desk at <strong>kachorasdubai@gmail.com</strong> and logged into our engineering leads portal.
                </p>

                {/* Offline Warning Banner if Cloud failed */}
                {offlineWarning && (
                  <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 text-left max-w-lg mx-auto space-y-1">
                    <div className="flex items-center gap-2 font-bold text-amber-800">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Notice: Offline Browser Cache Mode</span>
                    </div>
                    <p className="text-amber-800/90 leading-relaxed">
                      Your project specifications were saved in your browser cache, but could not be transmitted to our cloud servers due to network connectivity. Please reach out to our team directly via WhatsApp or Email below to ensure immediate pricing.
                    </p>
                  </div>
                )}

                {/* Instant Dispatch Actions */}
                <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                  <a
                    href={`https://wa.me/971565066904?text=${encodeURIComponent(
                      `*NEW KACHORAS PROJECT INQUIRY*\n• Client: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Service: ${formData.serviceType}\n• Plot/Area: ${formData.plotNo || 'Dubai'}\n• Budget: ${formData.budgetRange}\n• Scope: ${formData.message || 'Consultation request'}${attachedFile ? `\n• Drawing: ${attachedFile}` : ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+971 56 506 6904)</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`RFP Tender: ${formData.serviceType} - ${formData.name}`)}&body=${encodeURIComponent(
                      `Dear Kachoras Estimating Team,\n\nI would like to submit a project inquiry:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Service: ${formData.serviceType}\n• Plot/Location: ${formData.plotNo || 'Dubai'}\n• Budget Range: ${formData.budgetRange}\n• Scope Details: ${formData.message || 'N/A'}\n${attachedFile ? `• Attached Document: ${attachedFile}\n` : ''}\nBest regards,\n${formData.name}`
                    )}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-[#B3261E] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Desk</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
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
                        budgetRange: '',
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
              <form onSubmit={handleSubmit} className="space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-xl font-black text-[#1E293B] font-display">Submit RFP / Villa Tender</h3>
                  <p className="text-xs text-[#64748B] mt-1 font-medium">Direct routing to General Manager Jose K. George and engineering managers.</p>
                </div>

                {/* Name & Contact */}
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Client / Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Khalifa Almas"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
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
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                    />
                  </div>
                </div>

                {/* Email & Plot No */}
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Plot Number / Location in Dubai</label>
                    <input
                      type="text"
                      placeholder="e.g. Plot No. 4317233, Al Barsha"
                      value={formData.plotNo}
                      onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                    />
                  </div>
                </div>

                {/* Service Discipline & Budget */}
                <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Service Category</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                    >
                      <option value="Building Contracting (G+1 Villa / Majlis)">Building Contracting (G+1 Villa / Majlis)</option>
                      <option value="MEP & HVAC Engineering">MEP & HVAC Engineering</option>
                      <option value="Aluminium and Glass Works">Aluminium and Glass Works</option>
                      <option value="General Maintenance & Fit-out">General Maintenance & Fit-out</option>
                      <option value="Kitchen Cabinets & Wardrobes">Kitchen Cabinets & Wardrobes</option>
                      <option value="Gypsum Decoration Works">Gypsum Decoration Works</option>
                      <option value="Dubai Municipality Civil Projects">Dubai Municipality Civil Projects</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B] flex items-center justify-between">
                      <span>Estimated Budget (AED)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Optional / As per BOQ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. As per Consultant BOQ / Tender drawings"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                    />
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
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#B3261E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                  />
                </div>

                {/* File upload */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1E293B] flex items-center justify-between">
                    <span>Attach Municipality Drawings / Blueprints & BOQ</span>
                    <span className="text-[11px] text-[#64748B] font-normal">Max 50MB (PDF, DWG, DXF, Images, ZIP)</span>
                  </label>
                  <div className="relative border-2 border-dashed border-[#CBD5E1] hover:border-[#B3261E] rounded-xl p-4 text-center cursor-pointer transition bg-white">
                    <input
                      type="file"
                      accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.doc,.docx,.zip"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-6 h-6 text-[#B3261E] mx-auto mb-1" />
                    <div className="text-xs text-[#64748B]">
                      {attachedFile ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-[#B3261E] font-bold">
                            Attached: {attachedFile} {attachmentFile?.size ? `(${(attachmentFile.size / 1024 / 1024).toFixed(2)} MB)` : ''}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile();
                            }}
                            className="p-1 text-red-600 hover:text-red-800 transition z-10"
                            title="Remove file"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span>Click or drag blueprints, CAD files, or BOQ documents here (Max 50MB)</span>
                      )}
                    </div>
                  </div>
                </div>

                </div>

                <div className="space-y-3 pt-2">
                  {/* Error Banner */}
                  {submitError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Submission Notice:</strong>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#B3261E] via-[#8E341B] to-[#B3261E] hover:brightness-110 text-white font-black text-sm rounded-xl shadow-lg shadow-[#B3261E]/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
