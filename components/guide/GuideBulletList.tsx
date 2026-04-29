"use client";

import { useContentCard } from "@/components/comparison/ContentCardContext";

type Props = {
  items: string[];
  variant?: "accent" | "warning";
};

function PlusIcon() {
  return (
    <svg
      className="shrink-0 mt-0.5"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8.5" stroke="#22c55e" strokeWidth="1.5" />
      <path d="M10 6v8M6 10h8" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="shrink-0 mt-0.5"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8.5" stroke="#ef4444" strokeWidth="1.5" />
      <path d="M6 10h8" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function GuideBulletList({ items, variant = "accent" }: Props) {
  const { useIcons } = useContentCard();
  const isWarning = variant === "warning";
  const dot = isWarning ? "bg-(--danger)" : "bg-(--accent)";

  return (
    <ul className="space-y-2.5 m-0 p-0 list-none">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 font-sans text-[13px] leading-snug text-(--muted)"
        >
          {useIcons ? (
            isWarning ? <MinusIcon /> : <PlusIcon />
          ) : (
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
