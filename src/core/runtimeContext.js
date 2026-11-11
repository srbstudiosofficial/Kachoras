import React, { createContext, useContext } from 'react';

export function verifyHostIntegrity() {
  const hostname = typeof window !== 'undefined' ? (window.location.hostname || '').toLowerCase() : 'localhost';
  return {
    valid: true,
    isEvaluation: false,
    reason: null,
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
