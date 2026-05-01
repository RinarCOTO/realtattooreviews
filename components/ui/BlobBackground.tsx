"use client";

import type { ReactNode } from "react";

const blobBase = {
  position: "absolute" as const,
  willChange: "transform, border-radius",
};

export default function BlobBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-white" />
        {/* Top-left */}
        <div style={{ ...blobBase, width: 600, height: 600, top: "5%", left: "5%", background: "#C8E6E4", filter: "blur(80px)", opacity: 0.7, animation: "blob-float-1 18s ease-in-out infinite" }} />
        {/* Top-right */}
        <div style={{ ...blobBase, width: 550, height: 550, top: "8%", right: "8%", background: "#F5DDD0", filter: "blur(80px)", opacity: 0.65, animation: "blob-float-2 24s ease-in-out infinite" }} />
        {/* Center */}
        <div style={{ ...blobBase, width: 500, height: 500, top: "40%", left: "35%", background: "#EDE3C4", filter: "blur(80px)", opacity: 0.55, animation: "blob-float-3 30s ease-in-out infinite" }} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
