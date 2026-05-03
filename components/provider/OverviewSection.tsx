import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import ProsCons from "./ProsCons";
import VerdictSidebar from "./VerdictSidebar";
import DevLabel from "@/components/dev/DevLabel";

interface OverviewSectionProps {
  providerName: string;
  intro: string;
  pros: string[];
  cons: string[];
  statsRows?: Array<{ label: string; value: string; numeric: number; decimals?: number }>;
}

export default function OverviewSection({ providerName, intro, pros, cons, statsRows }: OverviewSectionProps) {
  return (
    <DevLabel name="OverviewSection">
    <section id="overview" className="py-22">
      <Container>
        <BlockHeading
          title={`Is ${providerName} Worth It?`}
          body="For some users, yes. The question is whether the reviews, treatment approach, pricing, and location consistency make it a good fit for your tattoo, budget, and goals."
        />
        <p className="-mt-4 mb-8 font-sans text-[14px] leading-relaxed text-heading max-w-prose">
          {intro}
        </p>
        {statsRows && <VerdictSidebar rows={statsRows} />}
        <ProsCons pros={pros} cons={cons} />
        <p className="mt-6 font-sans text-[13px] leading-relaxed text-heading border-t border-(--line) pt-5">
          The important question is not whether every review is positive. It is whether the negatives feel isolated or repeated.
        </p>
      </Container>
    </section>
    </DevLabel>
  );
}
