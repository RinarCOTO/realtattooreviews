import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title:
    "Tattoo Removal Healing Process (2026): Stages, Timeline, and What to Expect | RealTattooReviews",
  description:
    "What does tattoo removal healing look like? Stage-by-stage timeline from frosting to full recovery, normal vs abnormal signs, and how long each phase lasts.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides/tattoo-removal-healing-process",
  },
  openGraph: {
    title: "Tattoo Removal Healing Process (2026): Stages, Timeline, and What to Expect",
    description:
      "What does tattoo removal healing look like? Stage-by-stage timeline from frosting to full recovery, normal vs abnormal signs, and how long each phase lasts.",
  },
};

const faqs = [
  {
    question: "How long does tattoo removal take to heal?",
    answer:
      "Full healing per session takes 6 to 8 weeks. Visible healing (frosting through scab shedding) completes within 2 to 3 weeks. Deeper recovery continues through week 6 to 8.",
  },
  {
    question: "How long does it take for tattoo removal to heal?",
    answer:
      "6 to 8 weeks per session for full recovery. The visible stages move faster (2 to 3 weeks). Wait the full 6 to 8 weeks before the next session.",
  },
  {
    question: "How long does laser tattoo removal take to heal?",
    answer:
      "Laser tattoo removal healing follows the same 6 to 8 week timeline. Recovery tends to be slightly faster with picosecond systems (PicoWay, PicoSure) than Q-switched because of lower thermal impact.",
  },
  {
    question: "How does tattoo removal heal?",
    answer:
      "The body heals in stages: frosting (minutes), redness and swelling (hours to days), blistering (days 1 to 7), scabbing (days 5 to 14), peeling and recovery (weeks 2 to 8). Underneath, macrophages clear fragmented ink through the lymphatic system.",
  },
  {
    question: "Does skin heal after tattoo removal?",
    answer:
      "Yes. Skin heals after tattoo removal. Most people's skin returns to near-normal appearance after completed treatment. Slight textural or pigment differences are possible but usually subtle.",
  },
  {
    question: "What does tattoo removal look like after healing?",
    answer:
      "After one session: lighter tattoo, mild pinkness. After multiple sessions: cumulative fading. After completed treatment: near-normal skin, possible subtle texture or pigment variation.",
  },
  {
    question: "What does a healed tattoo removal look like?",
    answer:
      "Fully healed skin after complete removal typically looks close to normal. Slight textural smoothness or mild pigment variation may be visible in certain lighting.",
  },
  {
    question: "Can you get a tattoo removed before it heals?",
    answer:
      "No. Wait the full 6 to 8 weeks between sessions. Treating skin that has not fully healed increases scarring risk and reduces treatment effectiveness.",
  },
  {
    question: "How long for blisters to heal after tattoo removal?",
    answer:
      "Blisters typically form within 72 hours and dry within 7 days. Do not pop them. Let them heal naturally. Full resolution of the blister phase takes roughly one week.",
  },
  {
    question: "How to heal faster after laser tattoo removal?",
    answer:
      "Follow aftercare instructions exactly. Keep the area clean and dry. Avoid sun exposure. Do not pick blisters or scabs. Stay hydrated and eat well. Do not rush the healing interval. For full aftercare guidance, see the aftercare guide.",
  },
];

const STAGES = [
  {
    step: 1,
    title: "Frosting and Immediate Reaction",
    duration: "Minutes 0 to 60",
    body: "Tattoo removal frosting is the first visible reaction. Immediately after laser treatment, the treated skin turns white or grayish. This is caused by gas bubbles (carbon dioxide and steam) released when the laser interacts with ink particles. Frosting is temporary. It typically fades within 10 to 30 minutes.",
    normal: [
      "White or gray discoloration over the treated area",
      "Mild pinpoint bleeding",
      "Warm or stinging sensation",
      "Frosting pattern often follows the tattoo lines",
    ],
    abnormal: [
      "Frosting covering a much larger area than the tattoo (possible overtreatment)",
      "Severe pain that does not subside after the session",
    ],
    note: null,
  },
  {
    step: 2,
    title: "Redness, Swelling, and Inflammation",
    duration: "Hours 1 to 48",
    body: "Tattoo removal redness and swelling begin within the first hour and typically peak within 24 hours. The treated area will look red, feel warm, and may be mildly swollen. This is a standard inflammatory response. The body is sending blood and immune cells to the treatment site.",
    normal: [
      "Redness (erythema) ranging from mild pink to deep red",
      "Edema (swelling) making the treated area feel slightly raised or puffy",
      "Mild tenderness to the touch",
      "Redness and swelling typically subsiding within 24 to 48 hours",
    ],
    abnormal: [
      "Swelling spreading significantly beyond the treatment area",
      "Increasing pain after 48 hours rather than decreasing",
      "Red streaks radiating outward from the treatment area (possible infection)",
    ],
    note: null,
  },
  {
    step: 3,
    title: "Blistering",
    duration: "Days 1 to 7",
    body: "Tattoo removal blistering is common, especially after Q-switched laser sessions. Blisters form when fluid collects between skin layers in response to the treatment energy. They may appear as small, clear or blood-tinged bubbles on the skin surface.",
    normal: [
      "Small to moderate blisters forming within 24 to 72 hours",
      "Blisters that are clear or slightly pink",
      "Blisters that feel tight but not intensely painful",
      "Blisters that begin to flatten and dry within 3 to 7 days",
    ],
    abnormal: [
      "Blisters filled with yellow or green fluid (possible infection)",
      "Blisters that continue growing after 72 hours",
      "Significant pain, warmth, or odor around the blistered area",
    ],
    note: "Do not pop blisters. Let them heal naturally. If a blister breaks on its own, keep the area clean and apply the aftercare product your provider recommended.",
  },
  {
    step: 4,
    title: "Scabbing and Crusting",
    duration: "Days 5 to 14",
    body: "Tattoo removal scabbing begins as blisters dry and the skin moves into wound repair. The treated area forms a crust or scab over the healing skin. Scabs may appear dark because they contain residual ink lifted toward the surface during treatment.",
    normal: [
      "Dark or brownish scabs forming over the treated area",
      "Mild itching as the skin heals underneath",
      "Scabs beginning to loosen and shed naturally within 7 to 14 days",
    ],
    abnormal: [
      "Thick, hard scabs that crack and bleed repeatedly",
      "Yellow or green discharge from under the scab",
      "Increasing redness or warmth around the scab edges after the first week",
    ],
    note: "Do not pick scabs. Premature scab removal disrupts the healing process and significantly increases scarring risk.",
  },
  {
    step: 5,
    title: "Peeling and Skin Recovery",
    duration: "Weeks 2 to 8",
    body: "Tattoo removal peeling is the final visible healing stage. After scabs shed, the underlying skin may appear pink, dry, or slightly textured. The skin continues to heal and normalize over the following weeks. Fading of the tattoo becomes visible as the body clears fragmented ink through the lymphatic system.",
    normal: [
      "Dry, flaky skin in the treated area",
      "Mild peeling similar to a sunburn",
      "Treated area appearing lighter or slightly different in texture from surrounding skin",
      "Gradual fading of the tattoo ink over weeks",
    ],
    abnormal: [
      "Persistent raised tissue that does not flatten after 8 weeks (possible hypertrophic scarring)",
      "Deepening skin depression in the treated area",
      "Significant color change (darkening or lightening) that does not begin to normalize within 3 months",
    ],
    note: null,
  },
];

const TIMELINE_ROWS = [
  { phase: "Frosting", duration: "Fades within 30 minutes" },
  { phase: "Redness and swelling", duration: "Peak at 24 hours, resolve within 48 hours" },
  { phase: "Blistering", duration: "Forms within 72 hours, dries within 7 days" },
  { phase: "Scabbing", duration: "Forms by day 5, sheds by day 14" },
  { phase: "Peeling and recovery", duration: "Weeks 2 through 4" },
  { phase: "Full recovery (next session)", duration: "6 to 8 weeks" },
];

const HEALING_FACTORS = [
  {
    label: "Method",
    body: "Picosecond laser healing is typically faster than Q-switched because of lower thermal damage. Saline removal healing involves a longer scab phase (7 to 14 days) with a similar overall timeline.",
  },
  {
    label: "Tattoo size and density",
    body: "Larger and denser tattoos produce more healing activity per session.",
  },
  {
    label: "Skin type",
    body: "Darker Fitzpatrick skin types may experience longer-lasting pigment changes during healing.",
  },
  {
    label: "Individual healing speed",
    body: "Age, health, hydration, nutrition, and immune function all affect recovery speed.",
  },
  {
    label: "Aftercare compliance",
    body: "Following aftercare instructions (no picking, no sun, no submersion) directly affects healing quality and speed.",
  },
];

const HEALED_STAGES = [
  {
    label: "After one session",
    body: "The tattoo will look lighter. Some areas may have faded more than others. The treated skin may have mild residual pinkness or slight texture difference. This is normal. The tattoo is not gone after one session.",
  },
  {
    label: "After multiple sessions",
    body: "Cumulative fading becomes clearly visible. Dark inks fade fastest. Color inks may take longer depending on the laser wavelengths used. The skin between ink traces will look increasingly normal.",
  },
  {
    label: "After completed treatment",
    body: "Fully healed skin after complete tattoo removal often looks close to normal. Some users report slight textural difference in the treated area. Mild pigment variation may be visible in certain lighting. Most people will not notice the difference unless they know where to look.",
  },
];

const WARNING_SIGNS = [
  "Infection signs: increasing pain after 48 hours, yellow or green discharge, warmth spreading beyond the treatment area, red streaks, fever. Contact your provider or a medical professional immediately.",
  "Excessive blistering: blisters continuing to grow beyond 72 hours, covering a much larger area than the treated tattoo, or filling with cloudy fluid",
  "Scarring signs: raised, firm tissue persisting beyond 8 to 12 weeks; thickened tissue extending beyond the treatment area (keloid); depressed skin texture",
  "Prolonged pigment changes: hyperpigmentation or hypopigmentation that has not begun to improve after 3 to 6 months",
];

const PAGE_PATH = "/guides/tattoo-removal-healing-process";
const SITE_URL = "https://realtattooreviews.com";

export default function TattooRemovalHealingProcessPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Guides", href: "/guides" },
    { name: "Tattoo Removal Healing Process", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tattoo Removal Healing Process: Stages, Timeline, and What to Expect",
    description:
      "What does tattoo removal healing look like? Stage-by-stage timeline from frosting to full recovery, normal vs abnormal signs, and how long each phase lasts.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal healing",
      "Laser tattoo removal recovery",
      "Tattoo removal stages",
      "Post-treatment healing",
    ],
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
            <Link href="/guides" className="hover:text-(--ink) transition-colors">
              Guides
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Tattoo Removal Healing Process
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal{" "}
            <span className="text-(--accent)">Healing</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Stage-by-stage breakdown of what happens to your skin after each session, from frosting
            and blistering through full recovery, and how to tell normal healing from warning signs.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* How healing works */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Tattoo removal healing is a staged process. The skin moves through a predictable
                  sequence of reactions after each treatment session: an immediate reaction
                  (frosting, redness, swelling), a wound-healing phase (blistering, scabbing,
                  crusting), and a recovery phase (peeling, fading, skin normalization). The full
                  cycle from one session to readiness for the next takes 6 to 8 weeks.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  The healing process is driven by the body's immune response. Laser energy shatters
                  ink particles. Macrophages (immune cells) then clear the fragmented ink through
                  the lymphatic system over weeks. The visible healing on the skin surface is the
                  wound-repair layer of this process. The invisible ink clearance continues
                  underneath even after the skin looks healed.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  The stages below describe the typical laser tattoo removal healing timeline.
                  Saline removal follows a similar pattern with some differences in the scabbing
                  phase. For full aftercare instructions, see the{" "}
                  <Link
                    href="/guides/tattoo-removal-aftercare"
                    className="text-(--accent) hover:underline"
                  >
                    tattoo removal aftercare guide
                  </Link>
                  . For scarring concerns, see the{" "}
                  <Link
                    href="/guides/tattoo-removal-scarring"
                    className="text-(--accent) hover:underline"
                  >
                    tattoo removal scarring guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Healing Stages */}
            <GuideSection heading="Tattoo Removal Healing Stages">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Each stage has a normal duration and a set of expected reactions. Deviations from
                this timeline are not automatically a problem, but knowing the expected pattern helps
                you identify when something needs attention.
              </p>
              <div className="space-y-4">
                {STAGES.map((s) => (
                  <div
                    key={s.step}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-(--accent) text-white text-[11px] font-bold shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <div>
                        <p className="font-sans text-[15px] font-semibold text-(--ink) m-0 leading-snug">
                          {s.title}
                        </p>
                        <p className="font-sans text-[12px] text-(--muted) m-0 mt-0.5 uppercase tracking-wider">
                          {s.duration}
                        </p>
                      </div>
                    </div>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) mb-3">
                      {s.body}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="font-sans text-[11px] font-semibold text-(--ink) uppercase tracking-wider mb-1.5">
                          What is normal
                        </p>
                        <GuideBulletList items={s.normal} />
                      </div>
                      <div>
                        <p className="font-sans text-[11px] font-semibold text-(--ink) uppercase tracking-wider mb-1.5">
                          What is not normal
                        </p>
                        <GuideBulletList variant="warning" items={s.abnormal} />
                      </div>
                    </div>
                    {s.note && (
                      <p className="font-sans text-[13px] leading-relaxed text-(--ink) font-medium mt-3 pt-3 border-t border-(--line) m-0">
                        {s.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* How Long Does It Take */}
            <GuideSection heading="How Long Does Tattoo Removal Take to Heal?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal healing time per session is typically 6 to 8 weeks for full skin
                recovery. The visible healing stages (frosting through peeling) complete within 2
                to 3 weeks. The deeper recovery (immune clearance of ink, collagen remodeling, skin
                normalization) continues for the remaining weeks.
              </p>
              <div className="space-y-2">
                {TIMELINE_ROWS.map((row) => (
                  <div
                    key={row.phase}
                    className="flex items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-5 py-3"
                  >
                    <p className="font-sans text-[14px] text-(--muted) m-0">{row.phase}</p>
                    <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 ml-4 shrink-0 text-right">
                      {row.duration}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted) mt-2">
                Tattoo removal recovery time varies by several factors:
              </p>
              <div className="space-y-2">
                {HEALING_FACTORS.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-xl border border-(--line) bg-(--surface) px-5 py-4"
                  >
                    <span className="font-sans text-[14px] font-semibold text-(--ink)">
                      {f.label}:{" "}
                    </span>
                    <span className="font-sans text-[14px] text-(--muted)">{f.body}</span>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* What Does Healed Look Like */}
            <GuideSection heading="What Does Healed Tattoo Removal Look Like?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                What healed tattoo removal looks like depends on how far along you are in the
                treatment series.
              </p>
              <div className="space-y-3">
                {HEALED_STAGES.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[12px] font-semibold uppercase tracking-wider text-(--muted)">
                      {item.label}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--ink) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For visual reference across methods and stages, see the{" "}
                <Link href="/before-and-after" className="text-(--accent) hover:underline">
                  before-and-after gallery
                </Link>
                .
              </p>
            </GuideSection>

            {/* When Healing Is Not Normal */}
            <GuideSection heading="When Healing Is Not Normal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most tattoo removal healing follows the stages above without complications. Knowing
                the warning signs lets you act early.
              </p>
              <GuideBulletList variant="warning" items={WARNING_SIGNS} />
              <GuideCallout label="What to do">
                Contact your tattoo removal provider first. They can assess whether the reaction is
                within expected range or needs medical attention. If you suspect infection, do not
                wait. Seek medical care promptly. For deeper scarring guidance, see the{" "}
                <Link
                  href="/guides/tattoo-removal-scarring"
                  className="text-(--accent) hover:underline"
                >
                  tattoo removal scarring guide
                </Link>
                .
              </GuideCallout>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                This guide is based on dermatology consensus on wound healing and post-laser
                recovery. Sources include published clinical literature on laser-tissue interaction,
                post-treatment wound healing (PMC2923953, Kirby-Desai), and tattoo removal recovery
                timelines from peer-reviewed reviews (MDPI Applied Sciences 2021, PMC4859414). This
                page is an educational guide and does not replace medical advice. Consult your
                provider or a dermatologist for any healing concern. inkOUT is a current advertising
                client of RealTattooReviews; this page is a healing guide and does not promote
                inkOUT. See our{" "}
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
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "Scarring risk by method and skin type, normal vs scar healing, and treatment options.",
                },
                {
                  href: "/guides/tattoo-removal-aftercare",
                  title: "Tattoo Removal Aftercare",
                  desc: "Session-by-session aftercare instructions for laser and non-laser methods.",
                },
                {
                  href: "/guides/saline-tattoo-removal",
                  title: "Saline Tattoo Removal",
                  desc: "How saline removal works, healing differences from laser, and what to expect.",
                },
                {
                  href: "/comparisons/saline-vs-laser-tattoo-removal",
                  title: "Saline vs Laser Tattoo Removal",
                  desc: "Full head-to-head comparison across healing, scarring risk, cost, and use cases.",
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
