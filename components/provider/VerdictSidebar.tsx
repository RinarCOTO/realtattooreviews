"use client";

import CountUp from "@/components/ui/CountUp";

interface VerdictSidebarProps {
  rows: Array<{ label: string; value: string; numeric: number; decimals?: number }>;
}

export default function VerdictSidebar({ rows }: VerdictSidebarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-y-6 mb-10">
      {rows.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col pr-10 ${i < rows.length - 1 ? "mr-10 border-r border-(--line)" : ""}`}
        >
          <p className="text-[42px] font-black leading-none tracking-[-0.03em] text-(--ink)">
            <CountUp end={stat.numeric} decimals={stat.decimals ?? 0} duration={1600} />
          </p>
          <p className="mt-1.5 font-sans text-[10px] font-medium tracking-widest uppercase text-(--muted)">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
