type Props = {
  label?: string;
  children: React.ReactNode;
};

export default function GuideSummary({ label = "In one line", children }: Props) {
  return (
    <div className="rounded-2xl bg-surface-2 px-5 py-4">
      <p className="text-[14px] leading-relaxed text-(--muted) m-0">
        <span className="font-bold text-(--ink)">{label}:</span>{" "}
        {children}
      </p>
    </div>
  );
}
