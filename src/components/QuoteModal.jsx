import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calculator, 
  Building2, 
  Calendar, 
  DollarSign, 
  FileText, 
  Sparkles, 
  ShieldCheck,
  Mail,
  MessageSquare 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export default function QuoteModal({ isOpen, onClose, initialData }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: 'Building Contracting (G+1 Villa / Majlis)',
    sqft: '6500',
    timeline: 'Immediate (Next 30-60 Days)',
    budget: 'AED 1.5M - AED 5M',
    location: 'Dubai',
    plotNo: '',
    hasBlueprints: 'Yes, full stamped drawings',
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `KCH-${randomNum}-RFQ`;
    setReferenceId(ref);

    try {
      const quotes = JSON.parse(localStorage.getItem('kachoras_quotes') || '[]');
      quotes.push({
        referenceId: ref,
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('kachoras_quotes', JSON.stringify(quotes));
    } catch (err) {
      console.warn('Storage warning:', err);
    }

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={handleResetAndClose} />

      <div className="bg-white border border-[#E5DED3] max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-[#64748B] hover:text-[#1E293B] bg-[#FBF9F5] border border-[#E5DED3] rounded-xl transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-5">
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
            <div className="bg-[#FBF9F5] border border-[#E5DED3] p-5 rounded-xl max-w-md mx-auto text-left space-y-2 text-xs">
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

            {/* Instant Communication Actions */}
            <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
              <a
                href={`https://wa.me/971555585079?text=${encodeURIComponent(
                  `*KACHORAS RFQ SUBMISSION [${referenceId}]*\n• Client: ${formData.name || 'Client'}\n• Phone: ${formData.phone || 'N/A'}\n• Discipline: ${formData.category}\n• Area: ${formData.sqft} sq.ft\n• Budget: ${formData.budget}\n• Timeline: ${formData.timeline}\n• Location: ${formData.location} ${formData.plotNo ? `(Plot: ${formData.plotNo})` : ''}\n• Drawings: ${formData.hasBlueprints}\n• Notes: ${formData.notes || 'None'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Kachoras RFQ Proposal [${referenceId}] - ${formData.name || 'Client'}`)}&body=${encodeURIComponent(
                  `Dear Kachoras Estimating Team,\n\nPlease find my official RFQ protocol:\n\nReference: ${referenceId}\nClient: ${formData.name}\nPhone: ${formData.phone}\nDiscipline: ${formData.category}\nEstimated Area: ${formData.sqft} sq.ft\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nLocation: ${formData.location}\nPlot No: ${formData.plotNo || 'N/A'}\nDrawings Status: ${formData.hasBlueprints}\nAdditional Notes: ${formData.notes || 'N/A'}\n\nBest regards,\n${formData.name}`
                )}`}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl shadow-md transition"
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
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1E293B]">Contracting Discipline</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    >
                      <option value="Building Contracting (G+1 Villa / Majlis)">Building Contracting (G+1 Villa / Majlis)</option>
                      <option value="MEP & HVAC Works">MEP & HVAC Works</option>
                      <option value="Aluminium and Glass Works">Aluminium and Glass Works</option>
                      <option value="Civil Maintenance & Gypsum Decor">Civil Maintenance & Gypsum Decor</option>
                      <option value="Dubai Municipality Government Tender">Dubai Municipality Government Tender</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Estimated Area (sq.ft)</label>
                      <input
                        type="text"
                        placeholder="e.g. 6,500"
                        value={formData.sqft}
                        onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Groundbreaking Target</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
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
                      className="px-6 py-3 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition"
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Plot Number (Dubai Municipality)</label>
                      <input
                        type="text"
                        placeholder="e.g. 4317233"
                        value={formData.plotNo}
                        onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Community / Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Al Barsha, Wadi Al Shabak"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Estimated Budget (AED)</label>
                      <input
                        type="text"
                        placeholder="e.g. AED 2,500,000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Consultant Drawings</label>
                      <select
                        value={formData.hasBlueprints}
                        onChange={(e) => setFormData({ ...formData, hasBlueprints: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      >
                        <option value="Yes, full stamped drawings">Yes, full stamped drawings</option>
                        <option value="Under Review by Consultant">Under Review by Consultant</option>
                        <option value="Concept / Inquiries only">Concept / Inquiries only</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 bg-[#F4EFE6] hover:bg-[#E5DED3] text-[#475569] font-semibold text-xs rounded-xl flex items-center gap-2 border border-[#E5DED3]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[#7A2E16] hover:bg-[#5C200E] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition"
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Client / Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. Ahmed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Company (if applicable)</label>
                      <input
                        type="text"
                        placeholder="Company or Private"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1E293B]">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
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
                        className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
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
                      className="w-full bg-[#FBF9F5] border border-[#CBD5E1] rounded-xl p-3 text-sm text-[#1E293B] focus:border-[#7A2E16] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7A2E16]"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 bg-[#F4EFE6] hover:bg-[#E5DED3] text-[#475569] font-semibold text-xs rounded-xl flex items-center gap-2 border border-[#E5DED3]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#7A2E16] via-[#8E341B] to-[#7A2E16] hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg transition"
                    >
                      Transmit Proposal Request
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
