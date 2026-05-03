import Link from "next/link";
import DevLabel from "@/components/dev/DevLabel";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

interface ResultsSnapshotProps {
  resultsMentioned: number;
  painMentioned: number;
  scarringMentioned: number;
}

export default function ResultsSnapshot({ resultsMentioned, painMentioned, scarringMentioned }: ResultsSnapshotProps) {
  return (
    <DevLabel name="ResultsSnapshot">
    <div>
      <div className="rounded-xl bg-white p-5" style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}>
        <p className="mb-4 font-sans text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-(--ink)">
          Results Snapshot
        </p>

        <div className="grid grid-cols-3 divide-x divide-(--line)">

          {/* Results mentioned */}
          <div className="flex flex-col gap-1 pr-4">
            <p className="text-3xl font-bold text-(--ink)">{resultsMentioned}</p>
            <p className="text-sm text-heading">Results mentioned</p>
          </div>

          {/* Pain signals */}
          <div className="flex flex-col gap-1 px-4">
            <p
              className="text-3xl font-bold"
              style={{ color: painMentioned === 0 ? "#5A7A5A" : "var(--ink)" }}
            >
              {painMentioned}
            </p>
            <p className="text-sm" style={{ color: painMentioned === 0 ? "#5A7A5A" : "var(--muted)" }}>
              Pain signals
            </p>
          </div>

          {/* Scarring mentions */}
          <div className="flex flex-col gap-1 pl-4">
            <p
              className="text-3xl font-bold"
              style={{ color: scarringMentioned === 0 ? "#5A7A5A" : "var(--accent)" }}
            >
              {scarringMentioned}
            </p>
            <p className="text-sm" style={{ color: scarringMentioned === 0 ? "#5A7A5A" : "var(--muted)" }}>
              Scarring mentions
            </p>
          </div>

        </div>
      </div>

      {/* Moved outside the card */}
      <Link
        href="/before-and-after"
        className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-(--accent) hover:underline"
      >
        Explore before-and-after research <ChevronRightIcon className="size-3.5" />
      </Link>
    </div>
    </DevLabel>
  );
}
