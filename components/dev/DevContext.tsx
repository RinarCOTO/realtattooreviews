"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const DevContext = createContext(false);

export function useDevLabels() {
  return useContext(DevContext);
}

export function DevProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <DevContext.Provider value={visible}>
      {children}
      {/* Floating toggle button */}
      <button
        onClick={() => setVisible((v) => !v)}
        className="fixed bottom-4 right-4 z-[9999] rounded-full bg-purple-600 px-3 py-1.5 font-mono text-[11px] text-white shadow-lg hover:bg-purple-700"
        title="Toggle component labels (Ctrl+Shift+D)"
      >
        {visible ? "Hide labels" : "DEV"}
      </button>
    </DevContext.Provider>
  );
}
