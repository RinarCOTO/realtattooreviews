import type { ReactNode } from "react";

type FaqItem = { question: string; answer: ReactNode };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-(--line)">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <span className="text-[14px] font-semibold text-(--ink)">{item.question}</span>
            <span className="shrink-0 text-[13px] text-(--muted) transition-transform duration-200 group-open:rotate-90">
              ▸
            </span>
          </summary>
          <div className="mt-3 text-[13px] leading-relaxed text-(--muted)">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
