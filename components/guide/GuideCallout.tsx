type Props = {
  label?: string;
  children: React.ReactNode;
};

export default function GuideCallout({ label = "Note", children }: Props) {
  return (
    <div className="border-l-4 border-(--accent) bg-(--surface) px-5 py-4 rounded-r-xl">
      <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
        <span className="font-semibold text-(--ink)">{label}: </span>
        {children}
      </p>
    </div>
  );
}
