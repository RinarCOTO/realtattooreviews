import DevLabel from "@/components/dev/DevLabel";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

function DotGreen() {
  return <span className="inline-block h-2 w-2 rounded-full bg-secondary shrink-0" />;
}

function DotRed() {
  return <span className="inline-block h-2 w-2 rounded-full bg-danger shrink-0" />;
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <DevLabel name="ProsCons">
    <div className="relative grid gap-4 lg:grid-cols-2">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full" style={{ background: "#C8E6E4", filter: "blur(80px)", opacity: 0.65, zIndex: 0 }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full" style={{ background: "#EDE3C4", filter: "blur(70px)", opacity: 0.55, zIndex: 0 }} />
      <div className="relative z-1 border border-(--line) bg-white p-5 rounded-xl shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <DotGreen />
          <span className="font-sans text-[13px] font-bold tracking-widest uppercase text-heading">What They Do Well</span>
        </div>
        {pros.length === 0 ? (
          <p className="text-[13px] text-heading">Not enough review data to identify consistent positives.</p>
        ) : (
          <ul>
            {pros.map((pro, i) => (
              <li key={pro} className="flex items-start gap-4 border-t border-(--line) py-3">
                <span className="font-sans text-[11px] text-secondary shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] leading-relaxed text-heading">{pro}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative z-1 border border-(--line) bg-white p-5 rounded-xl shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <DotRed />
          <span className="font-sans text-[13px] font-bold tracking-widest uppercase text-heading">Where Users Hesitate</span>
        </div>
        {cons.length === 0 ? (
          <p className="text-[13px] text-heading">No consistent negative signals in the current review dataset.</p>
        ) : (
          <ul>
            {cons.map((con, i) => (
              <li key={con} className="flex items-start gap-4 border-t border-(--line) py-3">
                <span className="font-sans text-[11px] text-accent shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] leading-relaxed text-heading">{con}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </DevLabel>
  );
}
