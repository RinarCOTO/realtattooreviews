"use client";

import { useState } from "react";
import Link from "next/link";
import type { Provider } from "@/types/provider";
import { brandToSlug } from "@/lib/providers";

interface ProvidersTableProps {
  providers: Provider[];
}

type SortKey = "name" | "rating" | "reviewCount" | "market";
type SortDir = "asc" | "desc";

function ratingBar(rating: number) {
  const pct = Math.round((rating / 5) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[13px] font-semibold text-(--ink) w-8 shrink-0">
        {rating.toFixed(1)}
      </span>
      <div className="h-1.5 flex-1 bg-(--line) rounded-full overflow-hidden">
        <div
          className="h-full bg-(--accent) rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ProvidersTable({ providers }: ProvidersTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("reviewCount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "market" ? "asc" : "desc");
    }
  }

  const sorted = [...providers].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") cmp = a.name.localeCompare(b.name);
    else if (sortKey === "market") cmp = a.market.localeCompare(b.market);
    else if (sortKey === "rating") cmp = a.rating - b.rating;
    else if (sortKey === "reviewCount") cmp = a.reviewCount - b.reviewCount;
    return sortDir === "asc" ? cmp : -cmp;
  });

  function arrow(key: SortKey) {
    if (sortKey !== key) return <span className="text-(--line) ml-1">↕</span>;
    return <span className="text-(--accent) ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  function thClass(key: SortKey) {
    return [
      "px-4 py-3 text-left font-mono text-[11px] tracking-widest uppercase text-heading cursor-pointer select-none whitespace-nowrap hover:text-(--ink) transition-colors",
      sortKey === key ? "text-(--ink)" : "",
    ].join(" ");
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-(--line)">
      <table className="w-full min-w-[640px] border-collapse bg-white text-[13px]">
        <thead>
          <tr className="border-b border-(--line) bg-(--surface)">
            <th className={thClass("name")} onClick={() => handleSort("name")}>
              Provider {arrow("name")}
            </th>
            <th className={thClass("market")} onClick={() => handleSort("market")}>
              City {arrow("market")}
            </th>
            <th className={thClass("rating")} onClick={() => handleSort("rating")}>
              Rating {arrow("rating")}
            </th>
            <th className={thClass("reviewCount")} onClick={() => handleSort("reviewCount")}>
              Reviews {arrow("reviewCount")}
            </th>
            <th className="px-4 py-3 text-left font-mono text-[11px] tracking-widest uppercase text-heading whitespace-nowrap">
              Method
            </th>
            <th className="px-4 py-3 text-left font-mono text-[11px] tracking-widest uppercase text-heading">
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => {
            const slug = p.brand ? `${brandToSlug(p.brand)}/${p.slug}` : p.slug;
            const isLast = i === sorted.length - 1;
            const specialty = p.specialty?.toLowerCase() ?? "";
            const tags = (p.tags ?? []).map((tag) => tag.toLowerCase());
            const isHybrid = specialty.includes("hybrid") || specialty.includes("saline") || tags.includes("saline") || tags.includes("hybrid");
            const isNonLaser = !isHybrid && specialty.includes("non-laser");
            const methodLabel = isHybrid ? "Hybrid" : isNonLaser ? "Non-Laser" : "Laser";
            return (
              <tr
                key={p.id}
                className={[
                  "hover:bg-(--wash) transition-colors",
                  !isLast ? "border-b border-(--line)" : "",
                ].join(" ")}
              >
                <td className="px-4 py-3.5">
                  <Link
                    href={`/reviews/${slug}`}
                    className="font-medium text-(--ink) no-underline hover:text-(--accent) transition-colors"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-heading">{p.market.split(",")[0]}</td>
                <td className="px-4 py-3.5 min-w-[120px]">{ratingBar(p.rating)}</td>
                <td className="px-4 py-3.5 font-mono text-(--ink)">{p.reviewCount.toLocaleString()}</td>
                <td className="px-4 py-3.5">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                    style={
                      isHybrid
                        ? { background: "oklch(0.92 0.06 80)", color: "oklch(0.42 0.09 70)" }
                        : isNonLaser
                        ? { background: "oklch(0.93 0.06 30)", color: "oklch(0.42 0.12 30)" }
                        : { background: "oklch(0.93 0.05 200)", color: "oklch(0.35 0.08 200)" }
                    }
                  >
                    {methodLabel}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {(p.tags ?? []).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="border border-(--line) bg-(--surface) px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase text-heading"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
