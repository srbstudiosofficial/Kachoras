import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Calendar, 
  DollarSign, 
  FileText, 
  Sparkles, 
  ShieldCheck,
  Mail,
  MessageSquare,
  AlertTriangle 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { submitInquiry } from '../services/inquiryService';

export default function QuoteModal({ isOpen, onClose, initialData }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: 'Building Contracting (G+1 Villa / Majlis)',
    sqft: '6500',
    timeline: 'Immediate (Next 30-60 Days)',
    budget: '',
    location: 'Dubai',
    plotNo: '',
    hasBlueprints: 'Yes, full stamped drawings',
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [offlineWarning, setOfflineWarning] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        category: initialData.category || prev.category,
        sqft: initialData.sqft ? String(initialData.sqft) : prev.sqft,
        budget: initialData.estimatedRange || initialData.budget || prev.budget,
        notes: initialData.tier ? `Calculated from Dubai Cost Estimator: ${initialData.tier} tier (${initialData.estimatedTotal || ''})` : prev.notes
      }));
    }
  }, [initialData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setOfflineWarning(false);
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        plotNo: formData.plotNo,
        serviceType: formData.category,
        budgetRange: formData.budget,
        location: formData.location || 'Dubai, UAE',
        message: `${formData.sqft ? `Approx Area: ${formData.sqft} sq.ft. ` : ''}${formData.timeline ? `Timeline: ${formData.timeline}. ` : ''}${formData.hasBlueprints ? `Blueprints: ${formData.hasBlueprints}. ` : ''}${formData.notes || ''}`
      });

      if (res && res.success) {
        setReferenceId(res.referenceId || '');
        setOfflineWarning(false);
        setIsSubmitted(true);
      } else if (res && res.offlineSaved) {
        setReferenceId(res.referenceId || '');
        setOfflineWarning(true);
        setIsSubmitted(true);
      } else {
        setSubmitError(res?.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry error:', err);
      setSubmitError(err.message || 'Failed to transmit RFQ. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <div className="bg-white border border-[#E5DED3] max-w-2xl w-full rounded-2xl p-4 sm:p-8 shadow-2xl relative z-10 space-y-6 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#64748B] hover:text-[#1E293B] bg-[#FBF9F5] border border-[#E5DED3] rounded-xl transition min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4 sm:py-6 space-y-5">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">Tender Protocol Generated</span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1E293B] font-display">
                Kachoras RFQ Dispatched
              </h3>
              <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                Your preliminary RFQ has been logged. Send this protocol directly to our engineering desk for immediate review:
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-[#FBF9F5] border border-[#E5DED3] p-4 sm:p-5 rounded-xl max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#64748B] border-b border-[#E5DED3] pb-2">
                <span>Protocol Reference:</span>
                <strong className="text-[#7A2E16] font-mono text-sm font-black">{referenceId}</strong>
              </div>
              <div className="flex justify-between items-center text-[#475569]">
                <span>Discipline:</span>
                <span className="font-bold text-[#1E293B]">{formData.category}</span>
              </div>
              <div className="flex justify-between items-center text-[#475569]">
                <span>Built-Up Area:</span>
                <span className="font-bold text-[#1E293B]">{formData.sqft} sq.ft</span>
              </div>
              <div className="flex justify-between items-center text-[#475569]">
                <span>Contractor Lead:</span>
                <span className="font-bold text-[#7A2E16]">Jose K. George (General Manager)</span>
              </div>
            </div>

            {/* Offline Notice Banner if cloud failed */}
            {offlineWarning && (
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 text-left max-w-md mx-auto space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Notice: Offline Browser Cache Mode</span>
                </div>
                <p className="text-amber-800/90 leading-relaxed text-[11px]">
                  Your RFQ was stored in local browser cache because cloud connectivity was unavailable. Please tap the WhatsApp button below to ensure our engineering desk receives your request immediately.
                </p>
              </div>
            )}

            {/* Instant Communication Actions */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <a
                href={`https://wa.me/971555585079?text=${encodeURIComponent(
                  `*KACHORAS RFQ SUBMISSION [${referenceId}]*\n• Client: ${formData.name || 'Client'}\n• Phone: ${formData.phone || 'N/A'}\n• Discipline: ${formData.category}\n• Area: ${formData.sqft} sq.ft\n• Budget: ${formData.budget || 'As per BOQ'}\n• Timeline: ${formData.timeline}\n• Location: ${formData.location} ${formData.plotNo ? `(Plot: ${formData.plotNo})` : ''}\n• Drawings: ${formData.hasBlueprints}\n• Notes: ${formData.notes || 'None'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Kachoras RFQ Proposal [${referenceId}] - ${formData.name || 'Client'}`)}&body=${encodeURIComponent(
                  `Dear Kachoras Estimating Team,\n\nPlease find my official RFQ protocol:\n\nReference: ${referenceId}\nClient: ${formData.name}\nPhone: ${formData.phone}\nDiscipline: ${formData.category}\nEstimated Area: ${formData.sqft} sq.ft\nBudget: ${formData.budget || 'As per BOQ'}\nTimeline: ${formData.timeline}\nLocation: ${formData.location}\nPlot No: ${formData.plotNo || 'N/A'}\nDrawings Status: ${formData.hasBlueprints}\nAdditional Notes: ${formData.notes || 'N/A'}\n\nBest regards,\n${formData.name}`
                )}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl shadow-md transition min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>Email Official Desk</span>
              </a>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleResetAndClose}
                className="text-xs font-bold text-[#64748B] hover:text-[#1E293B] underline transition"
              >
                Close & Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-[#E5DED3] pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A2E16] bg-[#7A2E16]/10 px-3 py-0.5 rounded-full border border-[#7A2E16]/20">
                  Step {step} of 3
                </span>
                <span className="text-xs text-[#64748B] font-medium">• Dubai Municipality G+1 Contractor</span>
              </div>
              <h3 className="text-2xl font-black text-[#1E293B] font-display">
                Request Official Project Proposal / RFP
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-5">
              
              {/* Step 1: Discipline & Footprint */}
              {/* Step 1: Discipline & Area */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Contracting Discipline</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    >
                      <option value="Building Contracting (G+1 Villa / Majlis)">Building Contracting (G+1 Villa / Majlis)</option>
                      <option value="MEP & HVAC Works">MEP & HVAC Works</option>
                      <option value="Aluminium and Glass Works">Aluminium and Glass Works</option>
                      <option value="Civil Maintenance & Gypsum Decor">Civil Maintenance & Gypsum Decor</option>
                      <option value="Dubai Municipality Government Tender">Dubai Municipality Government Tender</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Estimated Area (sq.ft)</label>
                      <input
                        type="text"
                        placeholder="e.g. 6,500"
                        value={formData.sqft}
                        onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Groundbreaking Target</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      >
                        <option value="Immediate (Next 30-60 Days)">Immediate (Next 30-60 Days)</option>
                        <option value="3 - 6 Months">3 – 6 Months</option>
                        <option value="6 - 12 Months">6 – 12 Months</option>
                        <option value="Tender / Feasibility Phase">Tender / Feasibility Phase</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3.5 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition w-full sm:w-auto min-h-[44px]"
                    >
                      <span>Proceed to Plot Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Plot No & Budget */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Plot Number (Dubai Municipality)</label>
                      <input
                        type="text"
                        placeholder="e.g. 4317233"
                        value={formData.plotNo}
                        onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Community / Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Al Barsha, Wadi Al Shabak"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B] flex items-center justify-between">
                        <span>Estimated Budget (AED)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Optional / As per BOQ</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. As per BOQ or enter amount"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Consultant Drawings</label>
                      <select
                        value={formData.hasBlueprints}
                        onChange={(e) => setFormData({ ...formData, hasBlueprints: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      >
                        <option value="Yes, full stamped drawings">Yes, full stamped drawings</option>
                        <option value="Under Review by Consultant">Under Review by Consultant</option>
                        <option value="Concept / Inquiries only">Concept / Inquiries only</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 bg-[#F4EFE6] hover:bg-[#E5DED3] text-[#475569] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-[#E5DED3] w-full sm:w-auto min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3.5 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition w-full sm:w-auto min-h-[44px]"
                    >
                      <span>Proceed to Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Transmit */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Client / Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. Ahmed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Company (if applicable)</label>
                      <input
                        type="text"
                        placeholder="Company or Private"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">UAE Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971-5X-XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Scope Notes or Consultant Name</label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Consultant: Croquis Engineering; Majlis with custom kitchen and guest bathroom."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-base sm:text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    />
                  </div>

                  {/* Error Banner */}
                  {submitError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Submission Notice:</strong>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isSubmitting}
                      className="px-5 py-3.5 bg-[#F4EFE6] hover:bg-[#E5DED3] text-[#475569] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-[#E5DED3] w-full sm:w-auto min-h-[44px] disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#7A2E16] via-[#8E341B] to-[#7A2E16] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg transition w-full sm:w-auto min-h-[44px] disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Transmitting Request...' : 'Transmit Proposal Request'}</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
