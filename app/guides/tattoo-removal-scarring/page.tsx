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
    "Tattoo Removal Scarring (2026): Does It Scar, What Causes It, How to Prevent It | RealTattooReviews",
  description:
    "Does tattoo removal leave scars? What causes scarring, how to tell normal healing from scar formation, prevention steps, and when to see a dermatologist.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides/tattoo-removal-scarring",
  },
  openGraph: {
    title: "Tattoo Removal Scarring (2026): Does It Scar, What Causes It, How to Prevent It",
    description:
      "Does tattoo removal leave scars? What causes scarring, how to tell normal healing from scar formation, prevention steps, and when to see a dermatologist.",
  },
};

const faqs = [
  {
    question: "Does tattoo removal leave scars?",
    answer:
      "Tattoo removal can leave scars but usually does not when performed by an experienced provider with proper aftercare. Most healing reactions (redness, blistering, pigment changes) are temporary and not scars.",
  },
  {
    question: "Does laser tattoo removal leave scars?",
    answer:
      "Laser tattoo removal carries a scarring risk. Laser tattoo removal scars are most often caused by aggressive settings, overtreatment, or poor aftercare. The risk is lower with picosecond lasers (PicoWay, PicoSure) than with Q-switched lasers at aggressive settings. Provider experience, appropriate settings, and patient aftercare are the primary determinants.",
  },
  {
    question: "Can tattoo removal cause scarring?",
    answer:
      "Yes, tattoo removal can cause scarring. The main causes are excessive thermal energy, overtreatment, infection, picking blisters or scabs, and pre-existing scar tissue in the treatment area.",
  },
  {
    question: "How do I prevent scarring after tattoo removal?",
    answer:
      "Choose an experienced provider. Follow aftercare instructions exactly. Avoid sun exposure. Wait the full 6 to 8 weeks between sessions. Do not pick blisters or scabs. Start with conservative laser settings.",
  },
  {
    question: "Is blistering normal after tattoo removal?",
    answer:
      "Yes. Blistering is a common and usually normal healing response. Small blisters are expected, especially with Q-switched lasers. Do not pop or pick blisters. Let them heal naturally.",
  },
  {
    question: "What does normal healing look like after tattoo removal?",
    answer:
      "Normal healing includes redness, swelling, frosting (whitening), blistering, scabbing, mild itching, and temporary pigment changes. These resolve within days to weeks. Persistent textural changes beyond 8 to 12 weeks may indicate scarring.",
  },
  {
    question: "When is tattoo removal scarring permanent?",
    answer:
      "Hypertrophic scars often improve over 6 to 12 months. Keloid scars are more persistent and may require treatment. Atrophic (depressed) scars and severe keloids can be permanent without intervention.",
  },
  {
    question: "What causes tattoo removal scarring?",
    answer:
      "Excessive thermal energy, overtreatment, infection, patient behavior (picking, sun exposure), pre-existing scar tissue, and skin type (keloid-prone individuals).",
  },
  {
    question: "Can you treat scars from tattoo removal?",
    answer:
      "Yes. Treatments include silicone sheeting, corticosteroid injections, fractional laser resurfacing, microneedling, pressure therapy, and surgical revision for severe cases. Consult a dermatologist.",
  },
  {
    question: "Does tattoo removal cause hyperpigmentation?",
    answer:
      "Tattoo removal can cause temporary hyperpigmentation, especially in darker skin types. This is a pigment response, not a scar. It usually resolves within 3 to 6 months. Sun avoidance during healing is the best prevention.",
  },
  {
    question: "Is tattoo removal safe for dark skin?",
    answer:
      "Tattoo removal is safe for darker Fitzpatrick skin types with an experienced provider using appropriate settings. Picosecond lasers at 1064nm are the safest laser option for darker skin. Non-laser methods (saline, TEPR) avoid the wavelength-versus-melanin interaction entirely. See the best tattoo removal method overview for a full comparison.",
  },
  {
    question: "When should I see a dermatologist?",
    answer:
      "See a dermatologist if the treated area remains raised or textually changed for more than 8 to 12 weeks, if you suspect infection, if a keloid develops, or if pigment changes have not improved after 6 months.",
  },
];

const CAUSES = [
  {
    title: "Excessive thermal energy",
    body: "Laser tattoo removal uses light energy absorbed by ink particles. Some of that energy converts to heat in the surrounding tissue. Q-switched lasers deliver longer pulses that transfer more heat than picosecond lasers. Aggressive fluence settings (too much energy per pulse) on any laser can cause thermal burns. Burns trigger scar formation.",
  },
  {
    title: "Overtreatment",
    body: "Too many passes in a single session, or sessions spaced too closely together, can overwhelm the skin's healing capacity. The tissue does not have enough time to recover before the next round of damage. Six to eight weeks between sessions is the standard interval for a reason.",
  },
  {
    title: "Infection",
    body: "Open blisters or treated skin exposed to bacteria can become infected. Infection delays healing and increases scar risk. Proper wound care and avoiding submersion in water during healing are the primary defenses.",
  },
  {
    title: "Patient behavior",
    body: "Picking blisters, peeling scabs, or exposing treated skin to sun are the most common patient-side causes of scarring. These are preventable.",
  },
  {
    title: "Pre-existing scar tissue",
    body: "If the original tattoo was applied over scar tissue (from injury, surgery, or a prior tattoo), the skin in that area is already compromised. Tattoo removal in scarred skin carries elevated risk.",
  },
  {
    title: "Skin type",
    body: "Darker Fitzpatrick skin types (IV through VI) are more prone to post-inflammatory hyperpigmentation and keloid formation. This is a structural risk factor, not a provider failure.",
  },
];

const HEALING_NORMAL = [
  "Redness and mild swelling for 24 to 48 hours (standard inflammatory response)",
  "Frosting (whitening) immediately after treatment from gas bubbles; fades within minutes to hours",
  "Blistering within 24 to 72 hours (common, especially with Q-switched lasers; part of healing, not scarring)",
  "Scabbing as blisters dry; scabs typically shed within one to two weeks",
  "Temporary darkening or lightening of skin (hyperpigmentation or hypopigmentation), resolves within weeks to months",
  "Mild itching during healing",
];

const HEALING_SCAR = [
  "Raised, firm tissue that persists beyond 3 months: hypertrophic scarring",
  "Thickened, raised tissue extending beyond the original treatment area: keloid scarring",
  "Depressed (sunken) skin texture in the treated area: atrophic scarring",
  "Persistent textural change (rough, bumpy, or leathery skin) that does not improve with time",
];

const BLISTER_CARDS = [
  {
    title: "Tattoo removal blistering",
    body: "Blistering after tattoo removal is common and usually normal. Blisters form when the laser creates heat that causes fluid to collect between skin layers. Small blisters are expected. Large blisters or blisters that last more than a week may indicate overtreatment. Do not pop or pick blisters. Let them heal naturally. If a blister breaks on its own, keep the area clean and apply the aftercare product your provider recommended.",
  },
  {
    title: "Scabbing",
    body: "Scabs form as blisters dry and the skin begins to heal. Dark scabs may contain residual ink. Do not pick scabs. Premature scab removal disrupts healing and increases scar risk. Scabs typically fall off within 7 to 14 days.",
  },
  {
    title: "Skin color changes",
    body: "Temporary hyperpigmentation (darkening) and hypopigmentation (lightening) are common, especially on darker skin types. These are pigment responses, not scars. Hyperpigmentation usually resolves within 3 to 6 months. Hypopigmentation may take 6 to 12 months to normalize. Sun exposure during healing can make pigment changes worse and last longer.",
  },
];

const PIGMENT_CARDS = [
  {
    title: "Hyperpigmentation",
    body: "Darkening of the skin in the treated area. Occurs when the laser stimulates excess melanin production. More common in darker Fitzpatrick skin types (IV through VI). Usually resolves within 3 to 6 months. Avoiding sun exposure during healing is the single best prevention step.",
  },
  {
    title: "Hypopigmentation",
    body: "Lightening of the skin in the treated area. Occurs when the laser damages melanocytes (the cells that produce melanin). More common after aggressive treatment. Takes longer to resolve than hyperpigmentation, sometimes 6 to 12 months or more. In rare cases it can be permanent.",
  },
];

const SCAR_TYPES = [
  {
    title: "Hypertrophic scars",
    body: "Raised, firm, and red or pink. Stay within the boundaries of the original treatment area. More common type after tattoo removal. Hypertrophic scars often improve on their own over 6 to 12 months. Silicone sheeting, pressure therapy, and corticosteroid injections can accelerate improvement.",
  },
  {
    title: "Keloid scars",
    body: "Raised, firm, and extend beyond the boundaries of the original treatment area. Less common but more difficult to treat. More prevalent in darker skin types and in individuals with a personal or family history of keloid formation. Require treatment; do not typically resolve on their own.",
  },
];

const PREVENTION_STEPS = [
  {
    title: "Choose an experienced provider",
    body: "Provider skill is the single biggest variable in scarring risk. Ask about their experience level, the laser platform they use (picosecond systems carry lower thermal risk than Q-switched), their protocol for adjusting settings by skin type, and their scarring rate. A good provider should be willing to discuss scarring risk honestly.",
  },
  {
    title: "Follow aftercare instructions exactly",
    body: "Do not pick blisters or scabs. Keep the treated area clean and dry. Apply only the products your provider recommends. Avoid heavy sweating, swimming, and submerging the area in water during healing.",
  },
  {
    title: "Avoid sun exposure",
    body: "Keep the treated area out of direct sun between sessions and for at least 4 to 6 weeks after each session. Sun exposure increases the risk of both pigment changes and scar formation. Use a broad-spectrum SPF 30+ sunscreen on the treated area once the skin has healed enough to tolerate it.",
  },
  {
    title: "Wait the full healing interval",
    body: "Do not rush sessions. Six to eight weeks between sessions is the standard. If the skin has not fully healed, postpone the next session. Your provider should assess healing before treating again.",
  },
  {
    title: "Disclose your medical history",
    body: "Tell your provider about any history of keloid scarring, autoimmune conditions, blood thinners, skin conditions, or recent sun exposure. These affect treatment protocol.",
  },
  {
    title: "Start conservative",
    body: "A good provider starts with lower energy settings and increases gradually based on how your skin responds. Aggressive first sessions carry higher risk than conservative ramp-up.",
  },
];

const TREATMENTS = [
  {
    title: "Silicone-based products",
    body: "Silicone sheeting and silicone gel are first-line treatments for hypertrophic scars. They flatten and soften raised scar tissue over time. Available over the counter. Apply consistently for 8 to 12 weeks for best results.",
  },
  {
    title: "Corticosteroid injections",
    body: "Intralesional corticosteroid injections (typically triamcinolone) can flatten hypertrophic and keloid scars. Administered by a dermatologist. Multiple sessions may be needed.",
  },
  {
    title: "Fractional laser resurfacing",
    body: "Fractional CO2 or erbium laser treatments can improve scar texture by stimulating controlled collagen remodeling. This is a dermatologist-level treatment.",
  },
  {
    title: "Microneedling",
    body: "Microneedling can improve superficial scar texture by stimulating collagen production in the affected area. Multiple sessions are typically needed.",
  },
  {
    title: "Pressure therapy",
    body: "Compression garments or silicone sheets with pressure can help flatten hypertrophic and keloid scars over time.",
  },
  {
    title: "Surgical revision",
    body: "For severe keloid scars, surgical excision followed by corticosteroid injection or radiation therapy may be recommended. This is a last-resort option.",
  },
];

const WHEN_TO_SEE = [
  "The treated area remains raised, hard, or textually different from surrounding skin for more than 8 to 12 weeks after the last session",
  "A blister becomes infected (increasing pain, warmth, pus, red streaks spreading from the area)",
  "You develop a keloid (raised tissue extending beyond the treatment area)",
  "Hyperpigmentation or hypopigmentation has not improved after 6 months",
  "You are unsure whether what you are seeing is normal healing or scar formation",
];

const PAGE_PATH = "/guides/tattoo-removal-scarring";
const SITE_URL = "https://realtattooreviews.com";

export default function TattooRemovalScarringGuidePage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Guides", href: "/guides" },
    { name: "Tattoo Removal Scarring", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tattoo Removal Scarring: Does It Scar, What Causes It, How to Prevent It",
    description:
      "Does tattoo removal leave scars? What causes scarring, how to tell normal healing from scar formation, prevention steps, and when to see a dermatologist.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal scarring",
      "Laser tattoo removal side effects",
      "Keloid scars",
      "Hypertrophic scars",
      "Tattoo removal aftercare",
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
              Tattoo Removal Scarring
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal{" "}
            <span className="text-(--accent)">Scarring</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Whether tattoo removal leaves scars, what causes them, how to tell normal healing from
            scar formation, and what to do if scarring occurs.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Does tattoo removal leave scars */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Tattoo removal can leave scars, but it usually does not when performed correctly
                  by an experienced provider with proper aftercare. The honest answer is: scarring
                  is a real risk, not a guaranteed outcome. Most people who complete tattoo removal
                  with an experienced provider and follow aftercare instructions do not develop
                  permanent scars.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  The confusion around tattoo removal scars comes from three sources. First, normal
                  healing reactions (redness, blistering, scabbing, temporary pigment changes)
                  are often mistaken for scarring. Second, low-quality providers using aggressive
                  settings or outdated equipment produce more scar cases than experienced providers
                  using modern technology. Third, poor aftercare by the patient (picking blisters,
                  sun exposure, skipping healing time) causes scarring that is preventable.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This guide separates normal healing from actual scarring. It explains what causes
                  tattoo removal scarring, what increases risk, how to prevent it, and what to do if
                  scarring occurs.
                </p>
              </div>
            </div>

            {/* What Causes Scarring */}
            <GuideSection heading="What Causes Tattoo Removal Scarring?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal scarring results from excessive tissue damage during treatment. The
                skin responds to damage by producing collagen to repair the wound. When the damage
                exceeds what the skin can repair normally, excess collagen forms scar tissue.
              </p>
              <div className="space-y-3">
                {CAUSES.map((item) => (
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

            {/* Normal Healing vs Scarring */}
            <GuideSection heading="Normal Healing vs Scarring: How to Tell the Difference">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most people who think they have a tattoo removal scar are actually experiencing
                normal healing. Understanding the difference is the most important thing on this page.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2 uppercase tracking-wider">
                    Normal healing
                  </p>
                  <GuideBulletList items={HEALING_NORMAL} />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2 uppercase tracking-wider">
                    Signs of actual scarring
                  </p>
                  <GuideBulletList variant="warning" items={HEALING_SCAR} />
                </div>
              </div>
              <GuideCallout label="When to worry">
                If the treated area remains raised, hard, or textually different from surrounding
                skin for more than 8 to 12 weeks after the last session, consult your provider or
                a dermatologist. Most healing reactions resolve within 6 to 8 weeks.
              </GuideCallout>
            </GuideSection>

            {/* Blisters, Scabs, Skin Changes */}
            <GuideSection heading="Blisters, Scabs, and Skin Changes: What Is Normal?">
              <div className="space-y-3">
                {BLISTER_CARDS.map((item) => (
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

            {/* Hyperpigmentation and Hypopigmentation */}
            <GuideSection heading="Hyperpigmentation and Hypopigmentation After Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal hyperpigmentation and hypopigmentation are the most common non-scar
                side effects. They are pigment responses, not permanent damage in most cases.
              </p>
              <div className="space-y-3">
                {PIGMENT_CARDS.map((item) => (
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
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] font-semibold text-(--ink) mb-1">
                  Neither is a scar
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Both are pigment changes, not texture changes. A scar involves altered collagen
                  structure. Pigment changes involve altered melanin production. They look different,
                  feel different, and have different timelines.
                </p>
              </div>
            </GuideSection>

            {/* Keloid and Hypertrophic Scars */}
            <GuideSection heading="Keloid and Hypertrophic Scars From Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Keloid and hypertrophic scars are the two types of raised scars that can result from
                tattoo removal.
              </p>
              <div className="space-y-3">
                {SCAR_TYPES.map((item) => (
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
              <GuideCallout label="Keloid tattoo removal">
                Removing a tattoo that sits over an existing keloid scar, or removing a tattoo on a
                patient with known keloid tendency, requires conservative settings, longer healing
                intervals, and close monitoring. Some providers may decline treatment on keloid-prone
                patients. If you have a history of keloids, discuss this with your provider before
                starting tattoo removal.
              </GuideCallout>
            </GuideSection>

            {/* How to Prevent Scarring */}
            <GuideSection heading="How to Prevent Scarring After Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal scar prevention starts before the first session and continues through
                every healing cycle.
              </p>
              <div className="space-y-3">
                {PREVENTION_STEPS.map((item) => (
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
                For full session-by-session aftercare guidance, see the{" "}
                <Link
                  href="/guides/tattoo-removal-aftercare"
                  className="text-(--accent) hover:underline"
                >
                  tattoo removal aftercare guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* How to Treat Scars */}
            <GuideSection heading="How to Treat Scars After Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                If scarring does occur, treatment options exist. Consult a dermatologist for any
                persistent scar.
              </p>
              <div className="space-y-3">
                {TREATMENTS.map((item) => (
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

            {/* When to See a Dermatologist */}
            <GuideSection heading="When to See a Dermatologist">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                See a dermatologist or return to your tattoo removal provider if any of the
                following apply.
              </p>
              <GuideBulletList variant="warning" items={WHEN_TO_SEE} />
              <GuideCallout label="Infection: do not wait">
                Do not wait to seek help if you suspect infection. Infection worsens scar outcomes
                and can spread. Signs include increasing pain, warmth, pus, and red streaks
                radiating from the treated area.
              </GuideCallout>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                This guide is based on peer-reviewed dermatology literature and clinical consensus.
                Sources include PMC2923953 (Kirby-Desai predictive scale), PMC4928479 (JCAD 2016
                on darker skin considerations), MDPI Applied Sciences 2021 (Bennardo on picosecond
                vs nanosecond), PubMed 9487208 (Ross et al, Arch Dermatol 1998 on Q-switched
                Nd:YAG), and PMC4411590 (Kazandjieva-Tsankov on tattoo complications). Scar
                treatment recommendations follow American Academy of Dermatology guidelines. This
                page is an educational guide and does not replace medical advice. Consult a
                qualified dermatologist for any persistent scar. See our{" "}
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
                  href: "/guides/saline-tattoo-removal",
                  title: "Saline Tattoo Removal",
                  desc: "How saline removal works, which cases it handles best, cost, and what to expect during healing.",
                },
                {
                  href: "/comparisons/saline-vs-laser-tattoo-removal",
                  title: "Saline vs Laser Tattoo Removal",
                  desc: "Full head-to-head comparison across PMU, microblading, dark skin, scarring risk, and cost.",
                },
                {
                  href: "/guides/tattoo-removal-aftercare",
                  title: "Tattoo Removal Aftercare",
                  desc: "Session-by-session aftercare instructions for laser and non-laser methods.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Which method fits your case: laser, saline, or TEPR, compared across skin type, use case, and cost.",
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
