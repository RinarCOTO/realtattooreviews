type Props = {
  headers: string[];
  rows: React.ReactNode[][];
};

export default function GuideTable({ headers, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-(--line)">
      <table className="min-w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-(--surface) text-left">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-(--line) align-top ${i % 2 === 1 ? "bg-(--surface)" : "bg-white"}`}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 leading-relaxed ${j === 0 ? "font-medium text-(--ink)" : "text-(--muted)"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
