import DevLabel from "@/components/dev/DevLabel";

interface BlockHeadingProps {
  title: string;
  body?: string;
}

export default function BlockHeading({ title, body }: BlockHeadingProps) {
  return (
    <DevLabel name="BlockHeading">
    <div className="mb-8 max-w-4xl">
      <h2 className="font-sans font-bold text-[32px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-3 m-0">
        {title}
      </h2>
      {body && <p className="text-[17px] leading-[1.6] text-heading">{body}</p>}
    </div>
    </DevLabel>
  );
}
