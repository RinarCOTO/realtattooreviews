import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideFAQSection from "@/components/guide/GuideFAQSection";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title:
    "Tattoo Removal Guides: Scarring, Healing, Aftercare, and Saline Removal | RealTattooReviews",
  description:
    "Practical tattoo removal guides covering scarring risk, the healing process, aftercare instructions, and saline removal. What to expect before, during, and after treatment.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides",
  },
  openGraph: {
    title: "Tattoo Removal Guides: Scarring, Healing, Aftercare, and Saline Removal",
    description:
      "Practical tattoo removal guides covering scarring risk, the healing process, aftercare instructions, and saline removal. What to expect before, during, and after treatment.",
  },
};

const faqs = [
  {
    question: "Which guide should I read first?",
    answer:
      "If you have not started treatment yet, read the saline tattoo removal guide or the saline vs laser comparison to decide on method. If you have already had a session and want to know what to expect, read the healing process guide. If you are between sessions, read the aftercare guide.",
  },
  {
    question: "Are these guides specific to a method or provider?",
    answer:
      "The saline guide is method-specific. The healing, aftercare, and scarring guides apply across both laser and saline methods, with method-specific sections where instructions differ.",
  },
  {
    question: "Do these guides replace medical advice?",
    answer:
      "No. These guides are educational. They are based on clinical literature and professional consensus. They do not replace the specific instructions given by your provider or the judgment of a qualified dermatologist. If you have a concern about your healing, contact your provider.",
  },
];

const METHOD_GUIDES = [
  {
    href: "/guides/saline-tattoo-removal",
    title: "Saline Tattoo Removal",
    desc: "The complete guide to saline removal. How osmotic lift works, which cases it handles best (microblading, PMU, cosmetic tattoos), product brands (Li-FT, A+Ocean, Rejuvi, Botched Ink), cost, sessions, aftercare, and realistic before-and-after expectations.",
  },
];

const HEALING_GUIDES = [
  {
    href: "/guides/tattoo-removal-healing-process",
    title: "Tattoo Removal Healing Process",
    desc: "Stage-by-stage healing timeline from frosting through full recovery. Covers the five healing stages, what is normal versus what is not at each stage, and how long each phase lasts.",
  },
  {
    href: "/guides/tattoo-removal-aftercare",
    title: "Tattoo Removal Aftercare",
    desc: "Step-by-step aftercare instructions for laser and saline methods. Covers the first 24 hours, Saniderm and Tegaderm removal timing, product recommendations, what to avoid, and warning signs that mean you should call your provider.",
  },
];

const RISK_GUIDES = [
  {
    href: "/guides/tattoo-removal-scarring",
    title: "Tattoo Removal Scarring",
    desc: "Does tattoo removal leave scars? Separates normal healing reactions (blistering, pigment changes) from actual scarring (hypertrophic, keloid, atrophic). Covers causes, prevention, treatment options, and when to see a dermatologist.",
  },
];

const ELSEWHERE_LINKS = [
  { href: "/comparisons", label: "Comparison pages", desc: "Choose between methods and brands." },
  { href: "/categories", label: "Category pages", desc: "Filter by your specific case type." },
  { href: "/cities", label: "City pages", desc: "Find and compare providers in your metro." },
  { href: "/providers", label: "Provider pages", desc: "Full review picture for individual brands." },
];

function GuideCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-(--line) bg-(--surface) p-5 transition hover:border-(--accent)"
    >
      <p className="font-sans text-[15px] font-semibold text-(--ink) m-0 leading-snug group-hover:text-(--accent) transition-colors">
        {title}
      </p>
      <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-2 flex-1">
        {desc}
      </p>
      <span className="font-sans text-[13px] font-medium text-(--accent) mt-3">
        Read guide →
      </span>
    </Link>
  );
}

const PAGE_PATH = "/guides";

export default function GuidesIndexPage() {
  const breadcrumbJsonLd = breadcrumbSchema([{ name: "Guides", href: PAGE_PATH }]);
  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-(--line) pt-20 pb-16 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5">
            Guides
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal{" "}
            <span className="text-(--accent)">Guides</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Practical knowledge for before, during, and after treatment — based on clinical
            literature, not clinic marketing.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Intro */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Tattoo removal is a multi-session process that spans months. The treatment itself
                  is only part of the equation. What happens between sessions — healing, aftercare,
                  scar prevention — determines how well each session builds on the last and whether
                  you end up with clean skin or complications.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  The guides below cover the practical knowledge that providers often assume you
                  already have. Each guide is based on peer-reviewed clinical literature, published
                  aftercare protocols, and professional-practice consensus. They are not
                  provider-specific. They apply across laser and non-laser methods.
                </p>
              </div>
            </div>

            {/* Method Guides */}
            <GuideSection heading="Method Guides">
              <div className="space-y-3">
                {METHOD_GUIDES.map((g) => (
                  <GuideCard key={g.href} {...g} />
                ))}
              </div>
            </GuideSection>

            {/* Healing and Recovery */}
            <GuideSection heading="Healing and Recovery Guides">
              <div className="space-y-3">
                {HEALING_GUIDES.map((g) => (
                  <GuideCard key={g.href} {...g} />
                ))}
              </div>
            </GuideSection>

            {/* Risk and Safety */}
            <GuideSection heading="Risk and Safety Guides">
              <div className="space-y-3">
                {RISK_GUIDES.map((g) => (
                  <GuideCard key={g.href} {...g} />
                ))}
              </div>
            </GuideSection>

            {/* How guides connect */}
            <GuideSection heading="How Guides Connect to the Rest of the Site">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Guides cover practical knowledge that applies across all providers and methods.
                From here:
              </p>
              <div className="space-y-2">
                {ELSEWHERE_LINKS.map((item) => (
                  <div
                    key={item.href}
                    className="flex items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-5 py-4"
                  >
                    <p className="font-sans text-[14px] text-(--muted) m-0">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="font-sans text-[13px] font-medium text-(--accent) hover:underline shrink-0 ml-4"
                    >
                      {item.label} →
                    </Link>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[14px] leading-relaxed text-(--muted)">
                Every guide is based on the same clinical sources and editorial standards described
                in our{" "}
                <Link href="/methodology" className="text-(--accent) hover:underline">
                  methodology
                </Link>
                . See our{" "}
                <Link href="/editorial-policy" className="text-(--accent) hover:underline">
                  editorial policy
                </Link>{" "}
                for advertising disclosures.
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Guides are based on peer-reviewed clinical literature (PMC2923953, PMC4928479,
                PMC4859414, MDPI Applied Sciences 2021), published aftercare protocols, and
                professional-practice consensus. inkOUT is a current advertising client of
                RealTattooReviews and is not promoted on any guide page. See our{" "}
                <Link href="/methodology" className="text-(--accent) hover:underline">
                  methodology
                </Link>{" "}
                and{" "}
                <Link href="/editorial-policy" className="text-(--accent) hover:underline">
                  editorial policy
                </Link>{" "}
                for full details.
              </GuideCallout>
            </div>
          </div>
        </Container>
      </section>

      <GuideFAQSection faqs={faqs} />
    </div>
  );
}
