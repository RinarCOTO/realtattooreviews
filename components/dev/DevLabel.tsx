"use client";

import type { ReactNode } from "react";
import { useDevLabels } from "./DevContext";

interface DevLabelProps {
  name: string;
  children: ReactNode;
  className?: string;
}

export default function DevLabel({ name, children, className = "" }: DevLabelProps) {
  const visible = useDevLabels();

  if (!visible) return <>{children}</>;

  return (
    <div className={`relative ${className}`} style={{ outline: "1.5px dashed #9333ea" }}>
      <span className="absolute left-0 top-0 z-9998 bg-purple-600 px-1.5 py-0.5 font-mono text-[10px] text-white leading-none pointer-events-none">
        {name}
      </span>
      {children}
    </div>
  );
}
