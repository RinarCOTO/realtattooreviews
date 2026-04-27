"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";

type Stat = {
  value: number;
  label: string;
  icon: React.ReactNode;
};

type Props = {
  stats: Stat[];
};

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

export default function StatsCounter({ stats }: Props) {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2500;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutQuad(progress);
      setCounts(stats.map((s) => Math.floor(eased * s.value)));
      if (progress < 1) requestAnimationFrame(step);
      else setCounts(stats.map((s) => s.value));
    };

    requestAnimationFrame(step);
  }, [started, stats]);

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-x-14 gap-y-6">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
            {stat.icon}
          </div>
          <div>
            <p className="text-xl font-bold leading-none text-white">{counts[i]}</p>
            <p className="mt-0.5 text-xs text-white/50">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
