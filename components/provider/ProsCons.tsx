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
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="border border-(--line) bg-white p-5 rounded-xl shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <DotGreen />
          <span className="font-sans text-[11px] font-medium tracking-widest uppercase text-(--muted)">What They Do Well</span>
        </div>
        {pros.length === 0 ? (
          <p className="text-[13px] text-(--muted)">Not enough review data to identify consistent positives.</p>
        ) : (
          <ul>
            {pros.map((pro, i) => (
              <li key={pro} className="flex items-start gap-4 border-t border-(--line) py-3">
                <span className="font-sans text-[11px] text-secondary shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] leading-relaxed text-(--muted)">{pro}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border border-(--line) bg-white p-5 rounded-xl shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <DotRed />
          <span className="font-sans text-[11px] font-medium tracking-widest uppercase text-(--muted)">Where Users Hesitate</span>
        </div>
        {cons.length === 0 ? (
          <p className="text-[13px] text-(--muted)">No consistent negative signals in the current review dataset.</p>
        ) : (
          <ul>
            {cons.map((con, i) => (
              <li key={con} className="flex items-start gap-4 border-t border-(--line) py-3">
                <span className="font-sans text-[11px] text-accent shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] leading-relaxed text-(--muted)">{con}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
