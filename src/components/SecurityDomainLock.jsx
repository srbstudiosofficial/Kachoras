import React from 'react';
import { Lock, ShieldAlert, AlertTriangle } from 'lucide-react';

/**
 * Production License & Domain Security Lock
 * Protects developer intellectual property until final invoice settlement.
 * Restricts live execution exclusively to authorized staging hosts.
 */
export function isAuthorizedDeployment() {
  if (typeof window === 'undefined') return true;
  
  const hostname = (window.location.hostname || '').toLowerCase();
  
  // Authorized staging & development environments
  const isAuthorized = 
    hostname === 'kachoras.netlify.app' ||
    hostname.endsWith('.netlify.app') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '';

  return isAuthorized;
}

export default function SecurityDomainLock({ children }) {
  const authorized = isAuthorizedDeployment();

  if (!authorized) {
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'unknown-domain';
    
    return (
      <div className="fixed inset-0 z-[999999] bg-[#0A0D14] text-white flex items-center justify-center p-4 font-sans select-none">
        <div className="max-w-xl w-full bg-[#121620] border border-red-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          {/* Top Warning Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono uppercase tracking-widest font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>License Verification Required</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Unlicensed Domain Deployment
            </h1>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
              This web application build is restricted to authorized staging servers. Commercial deployment has not been licensed for <strong className="text-white font-mono">{currentHost}</strong>.
            </p>
          </div>

          {/* Invoice Clearance Notice */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed text-left space-y-1">
            <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
              Notice to Website Owner / Client:
            </div>
            <p>
              To authorize this domain and receive the full unencrypted source code, please ensure the development milestone invoice has been settled with the agency/developer.
            </p>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-white/10">
            <span>Protocol: SEC-LOCK-V2</span>
            <span>Ref: KACHORAS-CONTRACTING</span>
          </div>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}
