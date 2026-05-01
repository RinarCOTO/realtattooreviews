import DevLabel from "@/components/dev/DevLabel";

type Props = {
  heading: string;
  children: React.ReactNode;
};

export default function GuideSection({ heading, children }: Props) {
  return (
    <DevLabel name={`GuideSection: ${heading}`}>
    <div className="py-12">
      <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
        {heading}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
    </DevLabel>
  );
}
