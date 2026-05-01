import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import DevLabel from "@/components/dev/DevLabel";

interface BestForSectionProps {
  providerName: string;
  bestFor: string[];
  lessIdealFor: string[];
}

export default function BestForSection({ providerName, bestFor, lessIdealFor }: BestForSectionProps) {
  return (
    <DevLabel name="BestForSection">
    <section id="best-for" className="py-22">
      <Container>
        <BlockHeading
          title={`Who ${providerName} Is Best For`}
          body="Use this section to quickly judge whether this provider fits your situation before going deeper."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
            <p className="mb-4 text-[15px] font-semibold text-(--ink)">
              {providerName} may be a strong option if you:
            </p>
            <ul className="flex flex-col gap-2">
              {bestFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#5A7A5A" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
            <p className="mb-4 text-[15px] font-semibold text-(--ink)">
              You should compare more carefully if you:
            </p>
            <ul className="flex flex-col gap-2">
              {lessIdealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
    </DevLabel>
  );
}
