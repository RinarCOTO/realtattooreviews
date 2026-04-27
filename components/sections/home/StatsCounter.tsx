"use client";

import CountUp from "@/components/ui/CountUp";

type Stat = {
  value: number;
  label: string;
  icon: React.ReactNode;
};

type Props = {
  stats: Stat[];
};

export default function StatsCounter({ stats }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-x-14 gap-y-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
            {stat.icon}
          </div>
          <div>
            <p className="text-[24px] font-bold leading-none text-white">
              <CountUp end={stat.value} duration={2500} />
            </p>
            <p className="mt-0.5 text-xs text-white/50">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
