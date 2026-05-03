import Link from "next/link";
import MonoLabel from "@/components/reviews/MonoLabel";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

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
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] px-5 py-4 no-underline text-inherit hover:border-(--accent) transition-colors"
          >
            <div className="min-w-0 pr-4">
              <p className="font-sans font-medium text-(--ink) text-[15px] m-0 mb-0.5">
                {link.title}
              </p>
              <p className="font-sans text-[13px] text-heading m-0 leading-snug">
                {link.desc}
              </p>
            </div>
            <ChevronRightIcon className="size-4 shrink-0 text-(--accent)" />
          </Link>
        ))}
      </div>
    </div>
  );
}
