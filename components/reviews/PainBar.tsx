export default function PainBar({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-[2px] items-center">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className="inline-block w-2 h-[10px]"
          style={{
            background: i <= level ? "var(--ink)" : "var(--line)",
            opacity: i <= level ? 0.4 + i * 0.1 : 1,
          }}
        />
      ))}
    </span>
  );
}
