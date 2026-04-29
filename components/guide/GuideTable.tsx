type Props = {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  /**
   * Per-row winner indicator. 1 = first data column wins, 2 = second data column wins,
   * null = no winner / neutral. Array length should match rows length.
   */
  winners?: (1 | 2 | null)[];
};

export default function GuideTable({ headers, rows, winners }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--line) bg-white shadow-[0_2px_8px_0_rgb(0,0,0,0.08)]">
      <table className="min-w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-white border-b border-(--line) text-left">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const winner = winners?.[i] ?? null;
            return (
              <tr
                key={i}
                className={`border-t border-(--line) align-top ${i % 2 === 1 ? "bg-(--bg)" : "bg-white"}`}
              >
                {row.map((cell, j) => {
                  // j === 0 is the feature label column; data cols start at j === 1
                  const isWinnerCol = winner !== null && j > 0 && j === winner;
                  return (
                    <td
                      key={j}
                      className={`px-4 py-3 leading-relaxed ${
                        j === 0
                          ? "font-medium text-(--ink)"
                          : isWinnerCol
                          ? "text-(--ink) font-medium"
                          : "text-(--muted)"
                      }`}
                    >
                      {isWinnerCol ? (
                        <span className="flex items-start gap-1.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
                          {cell}
                        </span>
                      ) : cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
