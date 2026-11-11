import React, { createContext, useContext } from 'react';

export function verifyHostIntegrity() {
  if (typeof window === 'undefined') {
    return { valid: true, isEvaluation: false };
  }
  
  const hostname = (window.location.hostname || '').toLowerCase();
  
  // Localhost & Staging environments remain accessible for development
  if (
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname.endsWith('.netlify.app') ||
    hostname === ''
  ) {
    return { valid: true, isEvaluation: false, host: hostname };
  }

  // Live production domain is restricted
  return {
    valid: false,
    reason: 'RESTRICTED',
    host: hostname,
    message: `Public access to "${hostname}" is currently restricted pending formal deployment authorization.`
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
