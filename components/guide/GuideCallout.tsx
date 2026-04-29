type Props = {
  label?: string;
  children: React.ReactNode;
};

export default function GuideCallout({ label = "Note", children }: Props) {
  return (
    <div className="border border-(--line) bg-(--surface) px-5 py-4 rounded-xl">
      <p className="font-sans text-[13px] leading-relaxed text-(--muted) m-0">
        <span className="font-semibold text-(--ink)">{label}: </span>
        {children}
      </p>
    </div>
  );
}
