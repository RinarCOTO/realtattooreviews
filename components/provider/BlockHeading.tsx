interface BlockHeadingProps {
  title: string;
  body?: string;
}

export default function BlockHeading({ title, body }: BlockHeadingProps) {
  return (
    <div className="mb-8 max-w-2xl">
      <h2 className="font-mono font-bold uppercase tracking-wider text-[14px] text-(--accent) mb-2.5 m-0">
        {title}
      </h2>
      {body && <p className="mt-1 text-[15px] font-medium leading-[1.55] text-(--ink)">{body}</p>}
    </div>
  );
}
