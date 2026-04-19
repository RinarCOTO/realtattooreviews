import Link from "next/link";
import MonoLabel from "@/components/reviews/MonoLabel";

interface ResultsSnapshotProps {
  resultsMentioned: number;
  painMentioned: number;
  scarringMentioned: number;
}

export default function ResultsSnapshot({ resultsMentioned, painMentioned, scarringMentioned }: ResultsSnapshotProps) {
  const rows = [
    { label: "Results mentioned",    value: resultsMentioned },
    { label: "Pain signal captured", value: painMentioned },
    { label: "Scarring mentioned",   value: scarringMentioned },
  ];

  return (
    <div className="border border-(--line) bg-white p-5 rounded-xl">
      <p className="font-sans font-semibold text-[22px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-4">
        Results Snapshot
      </p>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="border-t border-(--line) pt-3">
            <MonoLabel className="mb-1">{row.label}</MonoLabel>
            <p className="text-[18px] font-semibold text-(--ink)">{row.value} reviews</p>
          </div>
        ))}
      </div>
      <Link href="/before-and-after" className="mt-5 inline-block text-[13px] font-medium text-(--accent) hover:underline">
        Explore before-and-after research →
      </Link>
    </div>
  );
}
