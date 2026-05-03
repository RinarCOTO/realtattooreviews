import type { ReactNode } from "react";
import MonoLabel from "./MonoLabel";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  right?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  right,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <MonoLabel color="accent" size="sm" className="mb-2.5">
        {eyebrow}
      </MonoLabel>
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="max-w-160">
          <h2 className="font-normal text-[clamp(28px,3.2vw,40px)] leading-[1.05] tracking-[-0.02em] m-0 text-(--ink)">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-[15px] leading-[1.55] text-heading max-w-140">
              {description}
            </p>
          )}
        </div>
        {right}
      </div>
    </div>
  );
}
