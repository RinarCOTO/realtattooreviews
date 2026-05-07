"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  duration?: number;
  decimals?: number;
};

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

export default function CountUp({ end, duration = 1200, decimals = 0 }: Props) {
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const frame = useRef<number | null>(null);
  const formattedCount = count.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let isVisible = false;
    let hasScrolled = window.scrollY > 0;

    const animate = () => {
      if (started.current || !isVisible || !hasScrolled) return;
      started.current = true;
      let startTime: number | null = null;
      setCount(0);

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(easeOutQuad(progress) * end);
        if (progress < 1) frame.current = requestAnimationFrame(step);
        else setCount(end);
      };

      frame.current = requestAnimationFrame(step);
    };

    const handleScroll = () => {
      hasScrolled = true;
      animate();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        animate();
      },
      { threshold: 0.3 }
    );

    setCount(end);
    observer.observe(el);
    window.addEventListener("scroll", handleScroll, { once: true, passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [end, duration]);

  return <span ref={ref}>{formattedCount}</span>;
}
