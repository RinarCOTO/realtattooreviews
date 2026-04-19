import type { ReactNode } from "react";

export default function ReviewTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.75 bg-(--surface-2) border border-(--line) rounded text-[13px] text-(--muted) font-mono font-medium tracking-[0.02em] uppercase">
      {children}
    </span>
  );
}
