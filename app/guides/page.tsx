import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideCallout from "@/components/guide/GuideCallout";
import FAQSection from "@/components/sections/FAQSection";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

export const metadata: Metadata = {
  title:
    "Tattoo Removal Guides: Methods, Scarring, Healing, and Aftercare | RealTattooReviews",
  description:
    "Practical tattoo removal guides covering laser, non-laser, saline, scarring risk, healing, aftercare, and side effects. What to expect before, during, and after treatment.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides",
  },
  openGraph: {
    title: "Tattoo Removal Guides: Methods, Scarring, Healing, and Aftercare",
    description:
      "Practical tattoo removal guides covering method choice, scarring risk, healing, aftercare, and side effects.",
  },
};

const faqs = [
  {
    question: "Which guide should I read first?",
    answer:
      "If you have not started treatment yet, start with the method guides: laser, non-laser, and saline. If you have already had a session and want to know what to expect, read the healing process guide. If you are between sessions, read the aftercare guide.",
  },
  {
    question: "Are these guides specific to a method or provider?",
    answer:
      "The laser, non-laser, and saline guides are method-specific. The healing, aftercare, side-effects, and scarring guides apply across methods, with method-specific notes where instructions differ.",
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
    badge: "METHOD",
    desc: "How saline removal works, which cosmetic tattoo and microblading cases it suits, and how it compares to laser in outcomes, cost, and healing time.",
  },
  {
    href: "/guides/non-laser-tattoo-removal",
    title: "Non-Laser Tattoo Removal",
    badge: "METHOD",
    desc: "How non-laser methods work, where dermabrasion-based tissue expulsion and chemical extraction fit, and how to weigh them against laser.",
  },
  {
    href: "/guides/laser-tattoo-removal",
    title: "Laser Tattoo Removal",
    badge: "METHOD",
    desc: "How laser tattoo removal works, how Q-switched and picosecond lasers differ, and what affects outcomes by ink color and skin tone.",
  },
];

const HEALING_GUIDES = [
  {
    href: "/guides/tattoo-removal-healing-process",
    title: "Tattoo Removal Healing Process",
    badge: "WHAT TO EXPECT",
    desc: "Stage-by-stage healing timeline from frosting through full recovery. Covers the five healing stages, what is normal versus what is not at each stage, and how long each phase lasts.",
  },
  {
    href: "/guides/tattoo-removal-aftercare",
    title: "Tattoo Removal Aftercare",
    badge: "WHAT TO EXPECT",
    desc: "Step-by-step aftercare instructions for laser and saline methods. Covers the first 24 hours, Saniderm and Tegaderm removal timing, product recommendations, what to avoid, and warning signs that mean you should call your provider.",
  },
];

const RISK_GUIDES = [
  {
    href: "/guides/tattoo-removal-side-effects",
    title: "Tattoo Removal Side Effects",
    badge: "RISKS",
    desc: "Common and uncommon side effects across all removal methods: hypopigmentation, hyperpigmentation, blistering, swelling, and infection risk.",
  },
  {
    href: "/guides/tattoo-removal-scarring",
    title: "Tattoo Removal Scarring",
    badge: "RISKS",
    desc: "A focused look at scarring specifically: when it happens, why it happens, and what your skin type means for the risk.",
  },
];

const ELSEWHERE_LINKS = [
  { href: "/comparisons", label: "Comparison pages", desc: "Choose between methods and brands." },
  { href: "/categories", label: "Category pages", desc: "Filter by your specific case type." },
  { href: "/cities", label: "City pages", desc: "Find and compare providers in your metro." },
  { href: "/providers", label: "Provider pages", desc: "Full review picture for individual brands." },
];

function GuideCard({ href, title, desc, badge }: { href: string; title: string; desc: string; badge: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-xl border border-(--line) bg-white p-5 transition hover:border-(--accent) hover:shadow-sm"
    >
      <span className="w-fit rounded-full border border-(--line) px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-(--muted)">
        {badge}
      </span>
      <p className="font-sans text-[17px] font-semibold text-(--ink) m-0 leading-snug group-hover:text-(--accent) transition-colors">
        {title}
      </p>
      <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 flex-1">
        {desc}
      </p>
      <span className="mt-1 inline-flex items-center gap-1 font-sans text-[14px] font-medium text-(--accent)">
        Read guide <ChevronRightIcon className="size-3.5" />
      </span>
    </Link>
  );
}

const PAGE_PATH = "/guides";

export default function GuidesIndexPage() {
  const breadcrumbJsonLd = breadcrumbSchema([{ name: "Guides", href: PAGE_PATH }]);
  const faqJsonLd = faqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GuideLayout
        breadcrumb="Guides"
        h1={<>Tattoo Removal <span className="text-(--accent)">Guides</span></>}
        description="Practical knowledge for before, during, and after treatment. Based on clinical literature, not clinic marketing."
        faqs={faqs}
        path={PAGE_PATH}
      >
        {/* Intro */}
        <div className="py-12">
          <p className="font-sans text-[17px] leading-relaxed text-(--muted) m-0">
            Tattoo removal is a multi-session process that spans months. The treatment itself
            is only part of the equation. What happens between sessions, including healing,
            aftercare, and scar prevention, determines how well each session builds on the
            last and whether you end up with clean skin or complications.
          </p>
          <p className="font-sans text-[17px] leading-relaxed text-(--muted) m-0 mt-4">
            The guides below cover the practical knowledge that providers often assume you
            already have. Each guide is based on peer-reviewed clinical literature, published
            aftercare protocols, and professional-practice consensus. They are not
            provider-specific. They apply across laser and non-laser methods.
          </p>
        </div>

        {/* Method Guides */}
        <GuideSection heading="Method Guides">
          <div className="grid gap-3 sm:grid-cols-2">
            {METHOD_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </GuideSection>

        {/* Healing and Recovery */}
        <GuideSection heading="Healing and Recovery Guides">
          <div className="grid gap-3 sm:grid-cols-2">
            {HEALING_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </GuideSection>

        {/* Risk and Safety */}
        <GuideSection heading="Risk and Safety Guides">
          <div className="grid gap-3 sm:grid-cols-2">
            {RISK_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </GuideSection>

        {/* How guides connect */}
        <GuideSection heading="How Guides Connect to the Rest of the Site">
          <p className="font-sans text-[17px] leading-relaxed text-(--muted)">
            Guides cover practical knowledge that applies across all providers and methods.
            From here:
          </p>
          {ELSEWHERE_LINKS.map((item) => (
            <div key={item.href} className="flex items-center justify-between border-b border-(--line) py-4 last:border-0">
              <p className="font-sans text-[15px] text-(--muted) m-0">{item.desc}</p>
              <Link
                href={item.href}
                className="ml-4 inline-flex shrink-0 items-center gap-1 font-sans text-[14px] font-medium text-(--accent) hover:underline"
              >
                {item.label} <ChevronRightIcon className="size-3.5" />
              </Link>
            </div>
          ))}
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) mt-4">
            Every guide is based on the same clinical sources and editorial standards described
            in our{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">methodology</Link>
            . See our{" "}
            <Link href="/editorial-policy" className="text-(--accent) hover:underline">editorial policy</Link>{" "}
            for full details.
          </p>
        </GuideSection>

        {/* Editorial note */}
        <div className="py-12">
          <GuideCallout label="Editorial note">
            Guides are based on peer-reviewed clinical literature (PMC2923953, PMC4928479,
            PMC4859414, MDPI Applied Sciences 2021), published aftercare protocols, and
            professional-practice consensus. See our{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">methodology</Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="text-(--accent) hover:underline">editorial policy</Link>{" "}
            for full details.
          </GuideCallout>
        </div>
      </GuideLayout>
    </>
  );
}
