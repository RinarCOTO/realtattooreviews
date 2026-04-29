/*
 * CC BUILD NOTE:
 * - Zero em dashes and zero en dashes anywhere on this page.
 *   Use periods, commas, colons, or parentheses instead.
 * - Never disclose "Rejuvatek Medical" or "Rejuvatek Aesthetics" in user-facing copy.
 *   The brand is "inkOUT" only.
 */
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import GuideFAQSection from "@/components/guide/GuideFAQSection";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title:
    "Tattoo Removal Side Effects: What to Expect and What Is Not Normal | RealTattooReviews",
  description:
    "Common and uncommon side effects of tattoo removal. Blistering, swelling, pigment changes, scarring risk, and when a side effect means something is wrong.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides/tattoo-removal-side-effects",
  },
  openGraph: {
    title: "Tattoo Removal Side Effects: What to Expect and What Is Not Normal",
    description:
      "Common and uncommon side effects of tattoo removal. Blistering, swelling, pigment changes, scarring risk, and when a side effect means something is wrong.",
  },
};

const faqs = [
  {
    question: "What are the most common side effects of tattoo removal?",
    answer:
      "Redness, swelling, blistering, scabbing, tenderness, and mild itching. These are expected and temporary. They are part of the normal healing process.",
  },
  {
    question: "Is blistering after tattoo removal normal?",
    answer:
      "Yes. Blistering is common, especially after laser sessions. Small clear blisters within 72 hours are normal. Do not pop them. Contact your provider if blisters fill with yellow or green fluid or continue growing.",
  },
  {
    question: "Does tattoo removal cause permanent skin damage?",
    answer:
      "In most cases, no. The majority of side effects are temporary. Permanent changes (scarring, persistent hypopigmentation) are uncommon with experienced providers and proper aftercare.",
  },
  {
    question: "Can tattoo removal cause hyperpigmentation?",
    answer:
      "Yes. Temporary hyperpigmentation is more common in darker skin types. It usually resolves within 3 to 6 months. Sun avoidance during healing is the best prevention.",
  },
  {
    question: "What side effects are different for non-laser removal?",
    answer:
      "Non-laser methods (TEPR, saline) do not produce frosting or laser-specific blistering. They produce scabbing as part of the mechanism. They do not interact with melanin, so hyperpigmentation and hypopigmentation risks from melanin interaction are eliminated.",
  },
  {
    question: "When should I call my provider about a side effect?",
    answer:
      "Call if you notice increasing pain after 48 hours, yellow or green discharge, red streaks spreading from the area, fever, blisters growing after 72 hours, or any reaction that does not match what your provider described as expected.",
  },
];

const COMMON_EFFECTS = [
  {
    title: "Redness and swelling",
    normalRange:
      "Mild to moderate redness confined to the treatment area. Slight puffiness. Warmth to the touch. Peaks within 24 hours, resolves within 48 hours.",
    warnRange:
      "Redness spreading significantly beyond the treatment area. Swelling that worsens after 48 hours. Red streaks radiating outward (possible infection).",
    note: null,
    body: "Redness (erythema) and swelling (edema) appear within the first hour after treatment. They are the body's standard inflammatory response to controlled tissue disruption.",
  },
  {
    title: "Blistering",
    normalRange:
      "Small to moderate clear or slightly pink blisters forming within 24 to 72 hours, flattening and drying within 3 to 7 days.",
    warnRange:
      "Blisters filled with yellow or green fluid. Blisters continuing to grow after 72 hours. Significant pain or odor around the blister.",
    note: "Do not pop blisters. Let them heal naturally. If one breaks on its own, keep the area clean and apply the aftercare product your provider recommended.",
    body: "Blisters form when fluid collects between skin layers in response to treatment energy. They are most common after laser sessions, especially with Q-switched systems.",
  },
  {
    title: "Scabbing and crusting",
    normalRange:
      "Dark or brownish scabs forming by day 5, shedding naturally within 7 to 14 days. Mild itching underneath.",
    warnRange:
      "Thick scabs that crack and bleed repeatedly. Yellow or green discharge from beneath the scab. Increasing redness around the scab edges after the first week.",
    note: "Do not pick scabs. Premature removal disrupts healing and significantly increases scarring risk.",
    body: "Scabs form as blisters dry and the skin begins wound repair. Dark scabs are common because they may contain residual ink lifted toward the surface.",
  },
  {
    title: "Frosting (laser only)",
    normalRange:
      "Immediate white or grayish discoloration over the treatment site, fading within 10 to 30 minutes. No treatment required.",
    warnRange: null,
    note: null,
    body: "Frosting is caused by gas bubbles (carbon dioxide and steam) released when the laser interacts with ink particles. It is a normal immediate reaction.",
  },
  {
    title: "Tenderness and sensitivity",
    normalRange:
      "Tenderness to the touch, clothing friction, and temperature changes. Most resolves within 3 to 5 days. Mild sensitivity may persist up to 2 weeks.",
    warnRange: null,
    note: null,
    body: "The treated area will feel tender for several days after treatment. This is expected.",
  },
  {
    title: "Itching",
    normalRange:
      "Mild itching during the healing phase. Indicates the skin is repairing.",
    warnRange: "Severe or spreading itching. Contact your provider if this occurs.",
    note: "Do not scratch the treated area.",
    body: "Mild itching is common and expected. Most itching resolves as the skin heals.",
  },
];

const LESS_COMMON_EFFECTS = [
  {
    title: "Hyperpigmentation",
    body: "Darkening of the skin in the treated area. Occurs when treatment stimulates excess melanin production. More common in darker Fitzpatrick skin types (IV through VI) and in patients who expose the treated area to sun during healing. A pigment response, not a scar. Usually resolves within 3 to 6 months. Sun avoidance during healing is the best prevention.",
  },
  {
    title: "Hypopigmentation",
    body: "Lightening of the skin in the treated area. Occurs when treatment damages melanocytes. More common after aggressive laser settings or multiple sessions on the same area. May take 6 to 12 months to normalize. In rare cases it can be permanent, particularly after extensive treatment on lighter skin within the treated zone.",
  },
  {
    title: "Texture changes",
    body: "Some patients notice a slight change in skin texture during healing. The skin may feel smoother, rougher, or slightly different from surrounding skin. Most texture changes are temporary and normalize over weeks to months. Persistent texture changes beyond 3 months may indicate early scar formation.",
  },
  {
    title: "Ink darkening (cosmetic tattoos only)",
    body: "Some cosmetic tattoo pigments, particularly those containing iron oxides or titanium dioxide, can darken when exposed to laser energy. This is called paradoxical darkening. The pigment turns gray or black instead of fading. It is a chemical reaction between the laser wavelength and the pigment composition, not a healing side effect. Avoidable by using non-laser methods for cosmetic tattoos.",
  },
  {
    title: "Pinpoint bleeding",
    body: "Small spots of blood at the treatment site are normal immediately after both laser and non-laser sessions. Typically stops within minutes. Apply gentle pressure with clean gauze if needed. If bleeding is heavy or does not stop within 30 minutes, contact your provider.",
  },
];

const SERIOUS_EFFECTS = [
  {
    title: "Infection",
    body: "Occurs when bacteria enter the treated skin through open blisters, wounds, or improperly cleaned equipment. Signs include increasing pain after 48 hours, yellow or green discharge, warmth spreading beyond the treatment area, red streaks radiating outward, and fever.",
    urgent: true,
    urgentText:
      "If you suspect infection, seek medical attention promptly. Do not wait to see if it resolves. Early treatment with antibiotics prevents scarring and complications.",
  },
  {
    title: "Scarring",
    body: "Uncommon with modern picosecond lasers and experienced providers. More common with Q-switched lasers at aggressive settings, with overtreatment (sessions too close together), and with patient behaviors like picking blisters and scabs. Three types: hypertrophic (raised, stays within treatment area), keloid (raised, extends beyond treatment area), and atrophic (depressed).",
    urgent: false,
    urgentText: null,
  },
  {
    title: "Allergic reaction",
    body: "Rarely, the treatment process can release ink particles that trigger an allergic response. More common with certain ink colors (particularly red and yellow pigments). Symptoms include severe itching, rash, or swelling beyond the treatment area. Contact your provider if you experience signs of allergic reaction.",
    urgent: false,
    urgentText: null,
  },
];

const METHOD_PROFILES = [
  {
    method: "Picosecond laser (PicoWay, PicoSure, PiQo4)",
    body: "Lower thermal profile than Q-switched. Less blistering, less scarring risk, faster healing between sessions. Frosting occurs. Hypopigmentation risk exists but is reduced compared to Q-switched.",
  },
  {
    method: "Q-switched laser (Nd:YAG)",
    body: "Higher thermal profile. More blistering, more redness, longer healing time per session. Higher scarring risk at aggressive settings. Effective but produces more pronounced side effects per session.",
  },
  {
    method: "TEPR (inkOUT)",
    body: "Non-laser. No frosting, no wavelength-versus-melanin interaction. Produces scabbing as part of the mechanism. Side-effect profile is different from laser: less acute pain per session, more visible healing phase involving scab formation and shedding.",
  },
  {
    method: "Saline removal",
    body: "Non-laser. Produces a controlled scab that is part of the removal mechanism. No laser-style blistering. Main risk is scarring from overworking the skin or picking the scab. No melanin interaction. No paradoxical darkening.",
  },
];

const REDUCTION_STEPS = [
  {
    title: "Choose an experienced provider",
    body: "Provider skill is the biggest variable. Experienced providers use appropriate settings for your skin type and tattoo, reducing the intensity of side effects.",
  },
  {
    title: "Follow aftercare instructions",
    body: "Do not pick blisters or scabs. Keep the area clean and dry. Avoid sun exposure. Apply only recommended products.",
  },
  {
    title: "Wait the full healing interval",
    body: "Six to eight weeks between sessions. Rushing increases all side-effect risks.",
  },
  {
    title: "Disclose your medical history",
    body: "Medications, skin conditions, allergies, and keloid history all affect side-effect risk. Tell your provider everything relevant at consultation.",
  },
  {
    title: "Avoid sun before and after",
    body: "Sun exposure increases pigment-change risk and can worsen healing outcomes.",
  },
];

const PAGE_PATH = "/guides/tattoo-removal-side-effects";

export default function TattooRemovalSideEffectsPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Guides", href: "/guides" },
    { name: "Tattoo Removal Side Effects", href: PAGE_PATH },
  ]);

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
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/guides" className="hover:text-(--ink) transition-colors">
              Guides
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Tattoo Removal Side Effects
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal{" "}
            <span className="text-(--accent)">Side Effects</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            What to expect after each session, which reactions are normal, which are warning signs,
            and how side effects differ between laser and non-laser methods.
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
                  Every tattoo removal method produces side effects. Most are temporary and
                  expected. Some are signs of a problem. The most common mistake after a session is
                  mistaking a normal side effect for a complication. Blistering is normal. Redness
                  is normal. Temporary pigment changes are normal.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page covers side effects for both laser and non-laser methods. For the
                  stage-by-stage healing timeline, see the{" "}
                  <Link
                    href="/guides/tattoo-removal-healing-process"
                    className="text-(--accent) hover:underline"
                  >
                    healing process guide
                  </Link>
                  . For aftercare instructions that reduce side effects, see the{" "}
                  <Link
                    href="/guides/tattoo-removal-aftercare"
                    className="text-(--accent) hover:underline"
                  >
                    aftercare guide
                  </Link>
                  . For scarring specifically, see the{" "}
                  <Link
                    href="/guides/tattoo-removal-scarring"
                    className="text-(--accent) hover:underline"
                  >
                    scarring guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Common Side Effects */}
            <GuideSection heading="Common Side Effects (Expected)">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These side effects occur in most patients after most sessions. They are part of the
                normal healing process.
              </p>
              <div className="space-y-4">
                {COMMON_EFFECTS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans text-[14px] font-semibold text-(--ink) mb-2">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-(--ink) mb-1">
                          Normal range
                        </p>
                        <p className="font-sans text-[13px] leading-relaxed text-(--muted) m-0">
                          {item.normalRange}
                        </p>
                      </div>
                      {item.warnRange && (
                        <div>
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-(--ink) mb-1">
                            When to be concerned
                          </p>
                          <p className="font-sans text-[13px] leading-relaxed text-(--muted) m-0">
                            {item.warnRange}
                          </p>
                        </div>
                      )}
                    </div>
                    {item.note && (
                      <p className="font-sans text-[13px] leading-relaxed text-(--ink) font-medium mt-3 pt-3 border-t border-(--line) m-0">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Less Common Side Effects */}
            <GuideSection heading="Less Common Side Effects">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These side effects occur in a smaller percentage of patients. They are usually
                temporary but may require attention.
              </p>
              <div className="space-y-3">
                {LESS_COMMON_EFFECTS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For paradoxical darkening on cosmetic tattoos, see the{" "}
                <Link
                  href="/guides/saline-tattoo-removal"
                  className="text-(--accent) hover:underline"
                >
                  saline tattoo removal guide
                </Link>{" "}
                for alternative approaches.
              </p>
            </GuideSection>

            {/* Rare but Serious */}
            <GuideSection heading="Rare but Serious Side Effects">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These side effects are uncommon when treatment is performed by an experienced
                provider. They require prompt attention.
              </p>
              <div className="space-y-3">
                {SERIOUS_EFFECTS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                    {item.urgent && item.urgentText && (
                      <p className="font-sans text-[13px] leading-relaxed text-(--ink) font-medium mt-3 pt-3 border-t border-(--line) m-0">
                        {item.urgentText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For full coverage of scarring types and treatment, see the{" "}
                <Link
                  href="/guides/tattoo-removal-scarring"
                  className="text-(--accent) hover:underline"
                >
                  scarring guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* Side Effects by Method */}
            <GuideSection heading="Side Effects by Method">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Different methods produce different side-effect profiles.
              </p>
              <div className="space-y-3">
                {METHOD_PROFILES.map((item) => (
                  <div
                    key={item.method}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.method}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For full method comparison, see{" "}
                <Link
                  href="/comparisons/best-tattoo-removal-method"
                  className="text-(--accent) hover:underline"
                >
                  best tattoo removal method
                </Link>
                .
              </p>
            </GuideSection>

            {/* How to Reduce */}
            <GuideSection heading="How to Reduce Side Effects">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most side effects are reduced by proper technique and aftercare.
              </p>
              <div className="space-y-3">
                {REDUCTION_STEPS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Related Links */}
            <GuideRelatedLinks
              links={[
                {
                  href: "/guides/tattoo-removal-healing-process",
                  title: "Tattoo Removal Healing Process",
                  desc: "Stage-by-stage timeline from frosting through full recovery. Normal vs abnormal at each phase.",
                },
                {
                  href: "/guides/tattoo-removal-aftercare",
                  title: "Tattoo Removal Aftercare",
                  desc: "Session-by-session aftercare instructions for laser and non-laser methods.",
                },
                {
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "Scarring risk by method and skin type. Prevention, treatment, and when to see a dermatologist.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Compare methods across side-effect profiles, effectiveness, and use-case fit.",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <GuideFAQSection faqs={faqs} />
    </div>
  );
}
