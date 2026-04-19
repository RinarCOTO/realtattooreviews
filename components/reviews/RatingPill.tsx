type Tone = "pos" | "mid" | "low" | "neg";

const palette: Record<Tone, { bg: string; fg: string }> = {
  pos: { bg: "oklch(0.94 0.04 150)", fg: "oklch(0.35 0.08 150)" },
  mid: { bg: "oklch(0.95 0.04 90)", fg: "oklch(0.38 0.08 80)" },
  low: { bg: "oklch(0.95 0.05 60)", fg: "oklch(0.42 0.1 50)" },
  neg: { bg: "oklch(0.93 0.06 30)", fg: "oklch(0.42 0.12 30)" },
};

export default function RatingPill({ value }: { value: number }) {
  const tone: Tone =
    value >= 4.5 ? "pos" : value >= 4 ? "mid" : value >= 3.5 ? "low" : "neg";
  const { bg, fg } = palette[tone];

  return (
    <span
      className="inline-flex items-baseline gap-[3px] px-2 py-[3px] rounded-full text-[12px] font-semibold whitespace-nowrap"
      style={{ background: bg, color: fg }}
    >
      {value.toFixed(1)}
      <span className="text-[10px] opacity-70">/5</span>
    </span>
  );
}
