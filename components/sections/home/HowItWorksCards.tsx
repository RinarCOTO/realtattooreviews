"use client";

import { useEffect, useRef, useState } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type Step = {
  stepNumber: string;
  title: string;
  body: PortableTextBlock[] | string;
};

type Props = {
  steps: Step[];
};

export default function HowItWorksCards({ steps }: Props) {
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
    <div ref={ref} className="grid gap-5 sm:gap-8 sm:grid-cols-3">
      {steps.map((step, i) => (
        <div
          key={step.stepNumber}
          className="flex flex-col bg-white rounded-2xl p-4 sm:p-6 text-center shadow-[-3px_5px_12px_rgba(200,230,228,0.3),3px_5px_12px_rgba(245,221,208,0.3)] transition-all duration-500"
          style={{
            transitionDelay: `${i * 150}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-20px)",
          }}
        >
          <h3 className="font-(family-name:--font-satoshi) text-[14px] font-semibold leading-5 text-heading">{step.title}</h3>
          <div className="mt-2 font-(family-name:--font-inter) text-[13px] font-normal leading-5 text-heading">
            {typeof step.body === "string"
              ? step.body
              : <PortableText value={step.body} />}
          </div>
        </div>
      ))}
    </div>
  );
}
