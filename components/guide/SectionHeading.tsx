import type { ReactNode } from "react";
import MonoLabel from "@/components/reviews/MonoLabel";

type Props = {
  /** The h2 text */
  children: ReactNode;
  /** Optional MonoLabel shown above the heading */
  label?: string;
  className?: string;
};

/**
 * Shared section heading used across comparison and guide pages.
 * Renders an optional MonoLabel kicker above a consistently-styled h2.
 *
 * Usage:
 *   <SectionHeading>inkOUT vs Removery at a Glance</SectionHeading>
 *   <SectionHeading label="Key Difference">TEPR vs PicoWay</SectionHeading>
 */
export default function SectionHeading({ children, label, className = "" }: Props) {
  return (
    <div className={className}>
      {label && (
        <MonoLabel color="accent" size="xs" className="mb-3">
          {label}
        </MonoLabel>
      )}
      <h2 className="font-sans font-bold text-[clamp(24px,3.5vw,36px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
        {children}
      </h2>
    </div>
  );
}
