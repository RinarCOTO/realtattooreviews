"use client";

import { useEffect, useRef, useState } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type Decoration = {
  color: string;
  iconBg: string;
  icon: React.ReactNode;
};

type Step = {
  stepNumber: string;
  title: string;
  body: PortableTextBlock[] | string;
};

type Props = {
  steps: Step[];
  decorations: Decoration[];
};

export default function HowItWorksCards({ steps, decorations }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-3">
      {steps.map((step, i) => {
        const decor = decorations[i] ?? decorations[0];
        return (
          <div
            key={step.stepNumber}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500"
            style={{
              transitionDelay: `${i * 150}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute right-0 top-8 hidden h-px w-6 bg-border sm:block translate-x-full" />
            )}

            {/* Icon */}
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${decor.iconBg} ${decor.color}`}>
              {decor.icon}
            </div>

            {/* Step number */}
            <span className={`mt-4 block text-xs font-semibold uppercase tracking-widest ${decor.color}`}>
              Step {step.stepNumber}
            </span>

            <h3 className="mt-1.5 text-base font-semibold text-heading">{step.title}</h3>
            <div className="mt-2 text-sm leading-relaxed text-muted">
              {typeof step.body === "string"
                ? step.body
                : <PortableText value={step.body} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
