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
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-hero-bg text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Criteria
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-heading">
                {leftLabel}
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-heading">
                {rightLabel}
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                Why it matters
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.criterion} className="border-t border-border align-top">
                <th className="w-44 px-5 py-4 text-left text-sm font-semibold text-heading">
                  {row.criterion}
                </th>
                <td className="min-w-60 px-5 py-4 text-sm leading-relaxed text-muted">
                  {row.left}
                </td>
                <td className="min-w-60 px-5 py-4 text-sm leading-relaxed text-muted">
                  {row.right}
                </td>
                <td className="min-w-64 px-5 py-4 text-sm leading-relaxed text-muted">
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
