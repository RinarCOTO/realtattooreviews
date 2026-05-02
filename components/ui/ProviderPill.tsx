const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  // Methods — warm neutrals, quiet/technical
  "TEPR":      { bg: "#FAF8F5", color: "#8A8178" },
  "Non-Laser": { bg: "#EDE8E1", color: "#8A8178" },
  "Laser":     { bg: "#E8E0D8", color: "#8A8178" },
  "PicoWay":   { bg: "#E8E0D8", color: "#8A8178" },
  "PicoSure":  { bg: "#E8E0D8", color: "#8A8178" },
  "Q-Switch":  { bg: "#E8E0D8", color: "#8A8178" },
  "Spectra":   { bg: "#E8E0D8", color: "#8A8178" },
  "Enlighten": { bg: "#E8E0D8", color: "#8A8178" },
  "RevLite":   { bg: "#E8E0D8", color: "#8A8178" },
  // Sentiments — clear signal colors
  "Positive": { bg: "#D4EDDA", color: "#2D6A4F" },
  "Negative": { bg: "#F5DDD0", color: "#B05C42" },
  "Mixed":    { bg: "#EDE3C4", color: "#8A7340" },
  "Neutral":  { bg: "#ECECEC", color: "#777777" },
  // Use cases — teal family, darkest = most prominent
  "Complete Removal": { bg: "#A8D5D3", color: "#2E6A68" },
  "Color Ink":        { bg: "#C8E6E4", color: "#3A7A78" },
  "Cover-Up":         { bg: "#D7EDEC", color: "#3A7A78" },
  "Microblading":     { bg: "#E4F0EF", color: "#4A8A87" },
  "General":          { bg: "#F0EDE8", color: "#8A8178" },
  // Provider type
  "Medical Spa":    { bg: "#D7EDEC", color: "#3A7A78" },
  "National Chain": { bg: "#A8D5D3", color: "#2E6A68" },
  // NOTE: Promo-style "Top Rated" / "High Rated" / "Most Reviewed" tags were
  // intentionally removed. They read as advertising rather than editorial
  // signal, and the verdict card already conveys rating context with
  // grounded, data-derived language.
};

const DEFAULT_STYLE = { bg: "#F0EDE8", color: "#8A8178" };

interface ProviderPillProps {
  tag: string;
}

export default function ProviderPill({ tag }: ProviderPillProps) {
  const { bg, color } = TAG_STYLES[tag] ?? DEFAULT_STYLE;

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full font-sans text-[10px] tracking-widest uppercase"
      style={{
        background: bg,
        color,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
      }}
    >
      {tag}
    </span>
  );
}
