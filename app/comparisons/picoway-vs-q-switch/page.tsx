import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title: "PicoWay vs Q-Switch Laser | Independent Comparison | RealTattooReviews",
  description:
    "Compare PicoWay and Q-switch tattoo removal lasers across ink colors, session count, heat profile, cost, and who each technology fits best.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/picoway-vs-q-switch",
  },
  openGraph: {
    title: "PicoWay vs Q-Switch Laser | Independent Comparison",
    description:
      "Compare PicoWay and Q-switch tattoo removal lasers across ink colors, session count, heat profile, cost, and who each technology fits best.",
  },
};

const faqs = [
  {
    question: "Is PicoWay always better than Q-switch?",
    answer:
      "No. PicoWay usually has the edge on harder color work and on cases where reducing heat matters, but Q-switch can still be a perfectly reasonable choice for simpler black-ink tattoos and lower-budget treatment plans.",
  },
  {
    question: "Does PicoWay mean fewer sessions every time?",
    answer:
      "No. It can reduce sessions in the right case, but session count still depends on tattoo age, depth, color mix, skin tone, body location, and how aggressive or conservative the clinic's settings are.",
  },
  {
    question: "Is Q-switch riskier for dark skin?",
    answer:
      "The bigger issue is protocol, not just the machine name. Darker skin needs the right wavelength choice, careful settings, and usually longer spacing between sessions. Clinics that cannot explain that clearly are the bigger risk.",
  },
  {
    question: "Why is PicoWay more expensive?",
    answer:
      "Usually because the technology is newer, clinics position it as premium equipment, and they price around the possibility of faster or cleaner clearance. The important question is whether that premium lowers your total treatment cost, not just your first invoice.",
  },
  {
    question: "What should I ask before choosing either one?",
    answer:
      "Ask what wavelength they will use, how many sessions they expect, whether they test patch higher-risk cases, and whether they have before-and-after examples similar to your tattoo and skin tone. That conversation is often more revealing than the device brand.",
  },
];

const GLANCE_ROWS: [string, string, string][] = [
  ["Pulse speed", "Picosecond (trillionths of a second)", "Nanosecond (billionths of a second)"],
  ["Best use case", "Harder removals, mixed colors, reducing total sessions", "Straightforward black-ink work, budget-sensitive cases"],
  ["Color performance", "Usually stronger on stubborn blue and green", "Can struggle more on difficult colors"],
  ["Black ink performance", "Very strong, often with faster visible clearance", "Still effective for many black tattoos"],
  ["Heat profile", "Typically lower thermal load", "More heat-driven, can matter for reactive skin"],
  ["Session expectations", "Often fewer sessions in strong candidates", "Often more sessions on color or stubborn work"],
  ["Availability", "Premium chains and specialty clinics", "More widely available across older setups"],
  ["Price", "Usually higher per session", "Usually lower per session"],
];

const PAGE_PATH = "/comparisons/picoway-vs-q-switch";
const SITE_URL = "https://realtattooreviews.com";

export default function PicowayVsQSwitchPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "PicoWay vs Q-Switch", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "PicoWay vs Q-Switch Laser: Independent Comparison",
    description:
      "Compare PicoWay and Q-switch tattoo removal lasers across ink colors, session count, heat profile, cost, and who each technology fits best.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["PicoWay vs Q-Switch", "Tattoo removal technology comparison"],
  };

  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-(--line) pt-20 pb-16 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/comparisons" className="hover:text-(--ink) transition-colors">
              Comparisons
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              PicoWay vs Q-Switch
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            PicoWay vs{" "}
            <span className="text-(--accent)">Q-Switch</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Compare picosecond and nanosecond laser technology across ink colors, session counts,
            heat profile, and cost to find which fits your tattoo and skin type best.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Intro */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6 space-y-4">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  PicoWay is a picosecond platform, which means it delivers much shorter pulses than
                  traditional Q-switch systems. In practical terms, that usually translates into
                  stronger photoacoustic impact and less leftover heat in the surrounding skin.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  That does not mean Q-switch is obsolete. Q-switch lasers still clear a lot of
                  black ink successfully, they are more widely available, and experienced operators
                  can get solid outcomes when the tattoo is straightforward.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  The mistake patients make is treating the device label like the whole answer.
                  Wavelength availability, test patches, skin-tone protocol, session spacing, and the
                  clinician running the machine matter just as much as whether the laser is pico or
                  nano.
                </p>
              </div>
            </div>

            {/* At a glance */}
            <GuideSection heading="PicoWay vs Q-Switch at a Glance">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The table below puts the two technologies side by side on the factors that matter
                most in a removal decision. Use it as an orientation before going deeper into the
                sections below.
              </p>
              <GuideTable
                headers={["", "PicoWay", "Q-Switch"]}
                rows={GLANCE_ROWS.map(([feature, a, b]) => [feature, a, b])}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The cheaper device can become more expensive if it adds multiple extra sessions. Do
                the math on total treatment cost, not just single-session price.
              </p>
            </GuideSection>

            {/* When to choose */}
            <GuideSection heading="When to Choose Each Technology">
              <div className="space-y-4">
                {[
                  {
                    title: "Choose PicoWay if",
                    body: "You are paying for better odds on stubborn work, not just newer branding.",
                    bullets: [
                      "Your tattoo has blue, green, or mixed-color ink.",
                      "You want to minimize heat-heavy treatment on reactive or pigment-prone skin.",
                      "You care more about total sessions than cheapest per-session price.",
                    ],
                  },
                  {
                    title: "Choose Q-switch if",
                    body: "The case is simple enough that the older platform may still be the more practical choice.",
                    bullets: [
                      "The tattoo is mostly black ink and not especially dense.",
                      "The clinic has a strong long-term track record with your tattoo type.",
                      "Budget matters more than chasing the newest hardware.",
                    ],
                  },
                  {
                    title: "Do not decide by device alone",
                    body: "Bad settings on a premium laser are still bad treatment.",
                    bullets: [
                      "Ask what wavelength they will use for your colors and skin tone.",
                      "Ask how many sessions they expect and why.",
                      "Ask whether they test patch darker skin tones or difficult color work.",
                    ],
                  },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{card.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mb-3">{card.body}</p>
                    <GuideBulletList items={card.bullets} />
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* What actually matters */}
            <GuideSection heading="What Actually Matters More Than the Marketing">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Device name is one factor. These are the others that tend to matter just as much.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Wavelength fit",
                    body: "Device name matters less than whether the clinic has the right wavelength for your ink colors and skin tone.",
                  },
                  {
                    title: "Operator judgment",
                    body: "A clinician who can explain fluence, spot size, session spacing, and test patches is usually more important than the logo on the machine.",
                  },
                  {
                    title: "Tattoo complexity",
                    body: "Layered tattoos, scarred tattoos, cover-up work, and dense color saturation are where technology differences show up fastest.",
                  },
                  {
                    title: "Total-treatment math",
                    body: "Paying less per session is not a real savings if you need two to four extra rounds to reach the same endpoint.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Pros and cons */}
            <GuideSection heading="Pros and Cons of PicoWay">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                  <GuideBulletList
                    items={[
                      "Usually stronger on stubborn multicolor tattoos.",
                      "Often better session efficiency on difficult cases.",
                      "Lower heat profile can be a meaningful safety advantage.",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Higher per-session pricing is common.",
                      "Not every market has a strong PicoWay operator nearby.",
                      "The premium is harder to justify for easy black-ink removals.",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            <GuideSection heading="Pros and Cons of Q-Switch">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                  <GuideBulletList
                    items={[
                      "More available across local markets.",
                      "Often cheaper per session.",
                      "Still effective for many black-ink and lower-complexity tattoos.",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Can require more sessions on harder cases.",
                      "Less forgiving on difficult color combinations.",
                      "Heat-heavy treatment can be a bigger concern on reactive skin.",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            {/* Consultation checklist */}
            <GuideSection heading="Consultation Checklist">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Questions to ask before you let anyone treat your tattoo, regardless of which laser
                type you are considering.
              </p>
              <ol className="flex flex-col gap-3 m-0 p-0 list-none">
                {[
                  "What wavelength will you use on my tattoo colors, and why is that the right fit?",
                  "How many sessions do you expect for my case, and what assumptions are behind that estimate?",
                  "How do you change settings for darker skin tones or a history of pigmentation changes?",
                  "Do you use test patches before treating difficult color work or higher-risk skin types?",
                  "Can you show before-and-after examples that match my ink colors, placement, and skin tone?",
                ].map((question, i) => (
                  <li
                    key={question}
                    className="border border-(--line) bg-(--surface) p-5 rounded-xl text-[14px] leading-relaxed text-(--muted)"
                  >
                    <span className="mr-2 font-semibold text-(--ink)">{i + 1}.</span>
                    {question}
                  </li>
                ))}
              </ol>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Source transparency">
                This comparison is framed as an evaluation page, not a medical recommendation. It
                pulls together common device characteristics, clinic disclosures, and the patterns
                patients usually care about most: color clearance, session count, price, and
                skin-safety trade-offs. Individual outcomes vary by tattoo, skin type, ink density,
                and provider skill. Consult your provider before deciding. See our{" "}
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

            <GuideRelatedLinks
              links={[
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Broader method hub comparing laser, saline, and non-laser options.",
                },
                {
                  href: "/cost",
                  title: "Tattoo Removal Cost Guide",
                  desc: "Price the full treatment path after comparing devices, not just one visit.",
                },
                {
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "Helpful if skin risk, blistering, or pigment change is part of your device decision.",
                },
                {
                  href: "/comparisons/saline-vs-laser-tattoo-removal",
                  title: "Saline vs Laser Removal",
                  desc: "For cases where a non-laser alternative is part of your comparison.",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-(--line) bg-(--surface) py-20">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5">
            FAQ
          </MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(24px,3.5vw,36px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-(--line) bg-white p-6 rounded-xl"
              >
                <p className="font-semibold text-(--ink) text-[15px] mb-3 leading-snug m-0">
                  {faq.question}
                </p>
                <p className="text-[13px] leading-relaxed text-(--muted) m-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
