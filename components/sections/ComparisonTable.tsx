import type { ComparisonTableRow } from "@/types/comparison";

type ComparisonTableProps = {
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonTableRow[];
};

export default function ComparisonTable({
  leftLabel,
  rightLabel,
  rows,
}: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-(--line) bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-hero-bg text-left">
              <th className="px-5 py-4 font-mono text-[11px] font-medium tracking-widest uppercase text-heading">
                Criteria
              </th>
              <th className="px-5 py-4 font-mono text-[11px] font-medium tracking-widest uppercase text-(--ink)">
                {leftLabel}
              </th>
              <th className="px-5 py-4 font-mono text-[11px] font-medium tracking-widest uppercase text-(--ink)">
                {rightLabel}
              </th>
              <th className="hidden md:table-cell px-5 py-4 font-mono text-[11px] font-medium tracking-widest uppercase text-heading">
                Why it matters
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.criterion} className="border-t border-(--line) align-top">
                <th className="px-5 py-4 text-left text-[13px] font-semibold text-(--ink)">
                  {row.criterion}
                </th>
                <td className="px-5 py-4 text-[13px] leading-relaxed text-heading">
                  {row.left}
                </td>
                <td className="px-5 py-4 text-[13px] leading-relaxed text-heading">
                  {row.right}
                </td>
                <td className="hidden md:table-cell px-5 py-4 text-[13px] leading-relaxed text-heading">
                  {row.takeaway ?? "Compare this against your tattoo type, skin tone, and expected session count."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
