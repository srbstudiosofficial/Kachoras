import React from 'react';
import { Lock, ShieldAlert, AlertTriangle, Clock } from 'lucide-react';
import { verifyEvaluationLicense } from '../core/licenseVerifier';

export default function EvaluationWatermark({ children }) {
  const license = verifyEvaluationLicense();

  // 1. Hard Kill-Switch Screen (If domain is unauthorized OR time expired)
  if (!license.valid) {
    const isExpired = license.reason === 'EXPIRED';

    return (
      <div className="fixed inset-0 z-[999999] bg-[#0A0D14] text-white flex items-center justify-center p-4 font-sans select-none">
        <div className="max-w-xl w-full bg-[#121620] border border-red-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          {/* Top Warning Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500 shadow-lg">
            {isExpired ? <Clock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono uppercase tracking-widest font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isExpired ? 'Evaluation Expired' : 'Domain License Required'}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              {isExpired ? 'Evaluation Period Expired' : 'Unlicensed Production Deployment'}
            </h1>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              {license.message}
            </p>
          </div>

          {/* Invoice Clearance Notice */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed text-left space-y-1">
            <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
              Notice to Website Owner / Client:
            </div>
            <p>
              To authorize this domain and receive the unrestricted production code release, please ensure the project milestone invoice has been settled with the agency/developer.
            </p>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-white/10">
            <span>Protocol: AGY-SEC-EVAL-V2</span>
            <span>Ref: KACHORAS-CONTRACTING</span>
          </div>

        </div>
      </div>
    );
  }

  // 2. Evaluation Mode Active (Localhost / Staging Preview)
  return (
    <>
      {/* Top Persistent Staging Banner */}
      <aside aria-label="Evaluation mode" className="bg-[#121620] border-b border-amber-500/40 text-white text-[11px] py-1.5 px-4 text-center sticky top-0 z-[100] flex flex-wrap items-center justify-center gap-2 backdrop-blur-md shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
        <span className="font-semibold text-amber-300 uppercase tracking-wider font-mono">Client Evaluation Build</span>
        <span className="hidden sm:inline text-white/40">•</span>
        <span className="hidden sm:inline text-slate-300">Restricted to content review & local testing</span>
        <span className="text-white/40">•</span>
        <span className="text-amber-400 font-mono font-medium">Evaluation Expiry: Nov 12, 2026</span>
      </aside>

      {/* Diagonal Anti-Theft Watermark Pattern */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] flex flex-wrap gap-28 items-center justify-center select-none overflow-hidden"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span 
            key={i} 
            className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-slate-900 -rotate-45 whitespace-nowrap"
          >
            EVALUATION DRAFT • NOT FOR PRODUCTION USE
          </span>
        ))}
      </div>

      {children}
    </>
  );
}
