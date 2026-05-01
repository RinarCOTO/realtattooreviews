import Link from "next/link";
import Container from "@/components/layout/Container";
import DevLabel from "@/components/dev/DevLabel";

type Props = {
  providerName: string;
  copy: string;
  actionLine: string;
  alternativesHref?: string;
};

export default function BottomLineSection({
  providerName,
  copy,
  actionLine,
  alternativesHref = "#alternatives",
}: Props) {
  return (
    <DevLabel name="BottomLineSection">
    <section id="bottom-line" className="bg-canvas py-8 px-4 sm:px-6">
      <div
        className="rounded-3xl py-22 px-10 sm:px-16"
        style={{ background: "linear-gradient(135deg, #C8E6E4 0%, #F0EDE8 52%, #F5DDD0 100%)" }}
      >
      <Container>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-sans font-bold text-[32px] leading-[1.1] tracking-[-0.02em] text-(--heading) mb-3 m-0">
            Bottom Line on {providerName}
          </h2>
          <p className="text-[15px] leading-[1.6] text-(--body)">{copy}</p>
        </div>
        <p className="-mt-4 mb-10 font-sans text-[14px] leading-relaxed text-(--muted) max-w-prose">
          {actionLine}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={alternativesHref}
            className="inline-flex items-center px-5 py-2.5 bg-accent text-white font-sans text-[13px] font-medium no-underline tracking-[-0.01em] rounded-full hover:bg-accent-hover transition-colors"
          >
            Compare {providerName} Alternatives
          </Link>
          <Link
            href="/reviews"
            className="inline-flex items-center px-5 py-2.5 border border-(--line) bg-white text-(--heading) font-sans text-[13px] font-medium no-underline tracking-[-0.01em] rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            Read Tattoo Removal Reviews
          </Link>
        </div>
      </Container>
      </div>
    </section>
    </DevLabel>
  );
}
