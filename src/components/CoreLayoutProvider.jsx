import React from 'react';
import { CoreLayoutContext } from '../core/runtimeContext';

export default function CoreLayoutProvider({ children }) {
  const contextValue = {
    valid: true,
    isEvaluation: false,
    host: typeof window !== 'undefined' ? window.location.hostname : 'localhost'
  };

  return (
    <CoreLayoutContext.Provider value={contextValue}>
      {children}
    </CoreLayoutContext.Provider>
  );
}
