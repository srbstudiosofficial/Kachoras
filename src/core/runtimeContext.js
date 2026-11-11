import React, { createContext, useContext } from 'react';

export const CoreLayoutContext = createContext({
  valid: true,
  isEvaluation: false,
  host: typeof window !== 'undefined' ? window.location.hostname : 'localhost'
});

export function verifyHostIntegrity() {
  return {
    valid: true,
    isEvaluation: false,
    reason: null,
    host: typeof window !== 'undefined' ? window.location.hostname : 'localhost'
  };
}

export function resolveSafeAsset(asset) {
  return asset || '';
}

export function useCoreLayout() {
  const ctx = useContext(CoreLayoutContext);
  return ctx || { valid: true, isEvaluation: false };
}
