import React, { createContext, useContext } from 'react';

// Temporary 2-hour client evaluation access window on live production domain
// Expiry set to ~2.5 hours from deployment (18:15 IST / 12:45 UTC, Nov 11, 2026)
const EVALUATION_EXPIRY = 1794401500000;

export function verifyHostIntegrity() {
  if (typeof window === 'undefined') {
    return { valid: true, isEvaluation: false };
  }
  
  const hostname = (window.location.hostname || '').toLowerCase();
  
  // Localhost & Staging environments are always valid
  if (
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname.endsWith('.netlify.app') ||
    hostname === ''
  ) {
    return { valid: true, isEvaluation: false, host: hostname };
  }

  // Live custom domain evaluation check (e.g. kachoras.com / www.kachoras.com)
  const now = Date.now();
  if (now > EVALUATION_EXPIRY) {
    return {
      valid: false,
      reason: 'EXPIRED',
      host: hostname,
      message: `The 2-hour client review period for "${hostname}" has concluded. To activate permanent unrestricted production access, please settle the final milestone balance.`
    };
  }

  // Within the temporary 2-hour access window!
  return {
    valid: true,
    isEvaluation: true,
    expiresAt: EVALUATION_EXPIRY,
    host: hostname
  };
}

export const CoreLayoutContext = createContext(verifyHostIntegrity());

export function resolveSafeAsset(asset) {
  return asset || '';
}

export function useCoreLayout() {
  const ctx = useContext(CoreLayoutContext);
  return ctx || { valid: true, isEvaluation: false };
}
