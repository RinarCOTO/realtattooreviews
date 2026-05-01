"use client";

import type { ReactNode } from "react";
import { ContentCardContext } from "./ContentCardContext";

interface ContentCardProps {
  /** Card heading */
  title: string;
  /** Simple text body — use when there's no complex content */
  body?: string;
  /** Complex content (e.g. GuideBulletList) — used instead of body */
  children?: ReactNode;
  /**
   * "sm" renders the title at 12px — use for Pros / Cons labels.
   * "md" (default) renders at 14px — use for named sections and "Choose X when" blocks.
   */
  titleSize?: "sm" | "md";
  /**
   * Optional "Best for" chip rendered above the title.
   * Highlights the strongest use-case fit for a given card.
   */
  badge?: string;
  className?: string;
}

export default function ContentCard({
  title,
  body,
  children,
  titleSize = "md",
  badge,
  className = "",
}: ContentCardProps) {
  const titleClass =
    titleSize === "sm"
      ? "font-sans text-[12px] font-semibold text-(--ink) mb-2"
      : "font-sans text-[17px] font-semibold text-(--ink) mb-2";

  const bgClass = titleSize === "sm" ? "bg-white" : "bg-(--bg)";

  return (
    <ContentCardContext.Provider value={{ useIcons: titleSize === "sm" }}>
      <div className={`rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] p-5 ${className}`}>
        {badge && (
          <span className="inline-block mb-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-(--accent) text-white">
            {badge}
          </span>
        )}
        <p className={titleClass}>{title}</p>
        {body && (
          <p className="font-sans text-[13px] leading-relaxed text-(--ink) m-0">{body}</p>
        )}
        {children}
      </div>
    </ContentCardContext.Provider>
  );
}
