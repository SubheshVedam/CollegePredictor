"use client";

import { createContext, useContext } from "react";

const VsatIntakeContext = createContext(null);

export function VsatIntakeProvider({ value, children }) {
  return (
    <VsatIntakeContext.Provider value={value}>
      {children}
    </VsatIntakeContext.Provider>
  );
}

export function useVsatIntake() {
  return useContext(VsatIntakeContext);
}
