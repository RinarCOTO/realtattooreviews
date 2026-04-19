import type { Review } from "@/types/review";
import MonoLabel from "@/components/reviews/MonoLabel";

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function summarizeSources(reviews: Review[]): string {
  const sources = unique(reviews.map((r) => r.source).filter(Boolean)) as string[];
  if (sources.length === 0) return "Public-source reviews";
  if (sources.length === 1) return `${sources[0]} reviews`;
  if (sources.length === 2) return `${sources[0]} and ${sources[1]} reviews`;
  return `${sources.slice(0, -1).join(", ")}, and ${sources.at(-1)} reviews`;
}

function reviewSignalBreakdown(reviews: Review[]) {
  return {
    positive: reviews.filter((r) => (r.rating ?? 0) >= 4).length,
    mixed:    reviews.filter((r) => (r.rating ?? 0) === 3).length,
    negative: reviews.filter((r) => (r.rating ?? 0) <= 2).length,
  };
}

export default function SourceSummary({ reviews }: { reviews: Review[] }) {
  const { positive, mixed, negative } = reviewSignalBreakdown(reviews);
  const sources = summarizeSources(reviews);
  const total = reviews.length;

  const breakdown = [
    { label: "Positive", count: positive, textColor: "text-secondary", dotColor: "bg-secondary" },
    { label: "Mixed",    count: mixed,    textColor: "text-warning",   dotColor: "bg-warning" },
    { label: "Negative", count: negative, textColor: "text-danger",    dotColor: "bg-danger" },
  ].filter((b) => b.count > 0);

  return (
    <div className="border border-(--line) bg-white p-5 rounded-xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-30">
          <MonoLabel className="mb-1">Source</MonoLabel>
          <p className="text-[14px] font-semibold text-(--ink)">{sources}</p>
        </div>
        <div className="min-w-20">
          <MonoLabel className="mb-1">Total</MonoLabel>
          <p className="text-[14px] font-semibold text-(--ink)">{total} reviews</p>
        </div>
        {breakdown.map((b) => (
          <div key={b.label} className="min-w-20">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`h-2 w-2 rounded-full ${b.dotColor}`} />
              <MonoLabel>{b.label}</MonoLabel>
            </div>
            <p className={`text-[14px] font-semibold ${b.textColor}`}>{b.count} reviews</p>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2 overflow-hidden bg-(--surface-2)">
        {total > 0 && (
          <div className="flex h-full">
            {positive > 0 && <div className="bg-secondary" style={{ width: `${(positive / total) * 100}%` }} />}
            {mixed > 0 && <div className="bg-warning" style={{ width: `${(mixed / total) * 100}%` }} />}
            {negative > 0 && <div className="bg-danger" style={{ width: `${(negative / total) * 100}%` }} />}
          </div>
        )}
      </div>
    </div>
  );
}
