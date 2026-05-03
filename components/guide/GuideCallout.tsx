type Props = {
  label?: string;
  children: React.ReactNode;
};

export default function GuideCallout({ label = "Note", children }: Props) {
  return (
    <div
      className="rounded-xl px-5 py-4"
      style={{
        border: "1.5px solid transparent",
        background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #C8E6E4, #F5DDD0, #C8E6E4) border-box",
      }}
    >
      <p className="font-sans text-[13px] leading-relaxed text-heading m-0">
        <span className="font-semibold text-(--ink)">{label}: </span>
        {children}
      </p>
    </div>
  );
}
