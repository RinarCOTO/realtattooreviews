import Link from "next/link";
import MonoLabel from "@/components/reviews/MonoLabel";

type RelatedLink = {
  href: string;
  title: string;
  desc: string;
};

type Props = {
  links: RelatedLink[];
};

export default function GuideRelatedLinks({ links }: Props) {
  return (
    <div className="py-12">
      <MonoLabel color="accent" size="sm" className="mb-5">
        Related guides
      </MonoLabel>
      <div className="flex flex-col divide-y divide-(--line) border border-(--line) rounded-xl overflow-hidden bg-white">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between px-6 py-4 bg-white no-underline text-inherit hover:bg-(--surface) transition-colors"
          >
            <div className="min-w-0 pr-4">
              <p className="font-sans font-medium text-(--ink) text-[15px] m-0 mb-0.5">
                {link.title}
              </p>
              <p className="font-sans text-[13px] text-(--muted) m-0 leading-snug">
                {link.desc}
              </p>
            </div>
            <span className="text-(--accent) text-[14px] font-medium shrink-0">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
