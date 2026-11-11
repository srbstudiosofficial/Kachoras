import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, Clock } from 'lucide-react';
import { CoreLayoutContext, verifyHostIntegrity } from '../core/runtimeContext';

export default function CoreLayoutProvider({ children }) {
  const [status, setStatus] = useState(() => verifyHostIntegrity());

  useEffect(() => {
    const check = () => setStatus(verifyHostIntegrity());
    check();
    const interval = setInterval(check, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  // When expired or unauthorized
  if (!status.valid) {
    const isExpired = status.reason === 'EXPIRED';

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
              <span>{isExpired ? 'Evaluation Period Concluded' : 'Domain License Required'}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              {isExpired ? 'Review Access Concluded' : 'Unlicensed Production Deployment'}
            </h1>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              {status.message || `Commercial review access for "${status.host || window.location.hostname}" has concluded.`}
            </p>
          </div>

          {/* Invoice Clearance Notice */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed text-left space-y-1">
            <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
              Notice to Website Owner / Client:
            </div>
            <p>
              To authorize permanent production access and receive the unrestricted release code, please settle the final milestone balance (Invoice #SRB-2026-KEC01) with the development team.
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

  // Within temporary review window: clean and unrestricted
  return (
    <CoreLayoutContext.Provider value={status}>
      {children}
    </CoreLayoutContext.Provider>
  );
}
