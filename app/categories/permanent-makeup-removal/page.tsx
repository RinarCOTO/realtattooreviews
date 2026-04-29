import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import MonoLabel from "@/components/reviews/MonoLabel";
import GuideFAQSection from "@/components/guide/GuideFAQSection";

export const metadata: Metadata = {
  title: "Permanent Makeup Removal: Laser, Saline, and Correction Guide | RealTattooReviews",
  description:
    "A practical guide to permanent makeup removal across brows, eyeliner, and lip blush. Compare laser and saline methods, understand oxidation risk, and learn when correction beats full removal.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories/permanent-makeup-removal",
  },
  openGraph: {
    title: "Permanent Makeup Removal: Laser, Saline, and Correction Guide",
    description:
      "A practical guide to permanent makeup removal across brows, eyeliner, and lip blush. Compare laser and saline methods, understand oxidation risk, and learn when correction beats full removal.",
  },
};

const faqs = [
  {
    question: "Can permanent makeup be removed?",
    answer:
      "Yes, in most cases. Full removal is realistic for standard pigments placed at normal depth. Saturated, deep, or titanium-heavy work often ends with significant fading rather than zero. Many people choose to stop at a heavily faded stage and add corrective PMU on top.",
  },
  {
    question: "How do you remove permanent makeup?",
    answer:
      "The three main methods are laser, saline, and correction. Laser fragments pigment so the body can clear it. Saline lifts pigment out through osmosis as the area scabs and heals. Correction reshapes or re-colors existing PMU with complementary pigment. The right choice depends on pigment type, area, and goal.",
  },
  {
    question: "Can you remove permanent eyebrow makeup?",
    answer:
      "Yes. Eyebrows are the most commonly removed PMU area. Both laser and saline work, depending on pigment. For detailed brow-specific guidance, see the microblading removal page.",
  },
  {
    question: "Can permanent eye makeup be removed?",
    answer:
      "Yes. Eyeliner removal is usually done with saline because of proximity to the eye. It must be done by a practitioner with specific eyelid removal experience, not a general tattoo remover.",
  },
  {
    question: "How many sessions does permanent makeup removal take?",
    answer:
      "Three to eight sessions is typical, depending on area, method, saturation, and pigment type. Sessions are usually spaced six to eight weeks apart. A clinic that promises a specific number without examining the work in person is overselling.",
  },
  {
    question: "How much does permanent makeup removal cost?",
    answer:
      "Per-session pricing is typically $150 to $400, with lip and eyeliner often priced higher due to technique complexity. Total cost for full removal usually runs in the low four figures. Correction-only work is often cheaper.",
  },
  {
    question: "Does permanent makeup removal leave scars?",
    answer:
      "Scarring risk is low when the method matches the pigment and the technician is experienced. It is not zero. Facial skin is more prone to visible texture change than body skin. Aggressive settings and at-home attempts raise scarring risk sharply.",
  },
  {
    question: "Why can laser darken eyebrow tattoos?",
    answer:
      "Iron oxide and titanium dioxide, common in PMU pigments, can oxidize when hit by laser energy. The pigment particles chemically react and shift to darker tones rather than fading. A patch test six to eight weeks before treatment is the standard way to catch this issue early.",
  },
  {
    question: "Is permanent makeup correction different from removal?",
    answer:
      "Yes. Correction keeps most of the existing pigment and adjusts shape or color with complementary pigment. Removal aims to fade or eliminate pigment entirely. Correction is often cheaper, faster, and better for cases where shape or color is the real problem, not the PMU itself.",
  },
  {
    question: "Can you remove permanent makeup at home?",
    answer:
      "No. The brow, eyelid, and lip areas are close to the eyes and mouth, and the skin there scars easily. At-home creams, scrubs, and DIY saline kits carry real risk of migration, patchy color loss, and long-term texture damage. Every at-home PMU removal method is unsafe and without professional oversight.",
  },
];

const PAGE_PATH = "/categories/permanent-makeup-removal";
const SITE_URL = "https://realtattooreviews.com";

export default function PermanentMakeupRemovalPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Categories", href: "/categories" },
    { name: "Permanent Makeup Removal", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Permanent Makeup Removal: Laser, Saline, and Correction Guide",
    description:
      "A practical guide to permanent makeup removal across brows, eyeliner, and lip blush. Compare laser and saline methods, understand oxidation risk, and learn when correction beats full removal.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["Permanent makeup removal", "PMU removal", "Saline removal", "Laser removal", "Lip blush removal", "Eyeliner removal"],
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
      <section className="border-b border-(--line) pt-12 pb-10 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/categories" className="hover:text-(--ink) transition-colors">
              Categories
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Permanent Makeup Removal
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Permanent Makeup{" "}
            <span className="text-(--accent)">Removal</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            A practical guide to permanent makeup removal across brows, eyeliner, and lip blush.
            Compare laser and saline methods, understand oxidation risk, and learn when correction
            beats full removal.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="divide-y divide-(--line)">

            {/* Intro callout */}
            <div className="py-12">
              <div>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Permanent makeup can usually be removed or corrected, but cosmetic tattoos do not
                  behave like body tattoos. The pigments are different. The skin is thinner. The
                  stakes for color shifts are higher because the work is on your face. And the right
                  method often depends less on price or convenience. It depends more on what pigment
                  was used and what area of the face it sits on.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page covers how permanent makeup removal works across the three most common
                  areas: brows, lip blush, and eyeliner. It explains where laser and saline each fit,
                  why certain pigments darken instead of fading, and when correction is a smarter
                  endpoint than chasing total removal.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <GuideSection heading="How Permanent Makeup Removal Works">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Permanent makeup uses pigments deposited into the upper dermis, similar to a tattoo
                but shallower and in smaller amounts. Common PMU pigments include iron oxide,
                titanium dioxide, carbon-based dyes, and organic colorants. The specific mix matters
                because different pigments behave differently during removal.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                There are three realistic paths:
              </p>
              <GuideBulletList
                items={[
                  "Laser removal uses specific wavelengths to fragment pigment particles so the body can clear them through the lymphatic system.",
                  "Saline removal uses a sterile hypertonic solution implanted into the PMU with a tattoo machine or manual tool. Salt draws pigment upward through osmosis, and pigment leaves as the area scabs and heals.",
                  "Correction reshapes, re-colors, or camouflages existing PMU with complementary pigment instead of removing it.",
                ]}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Glycolic acid removal is a less common chemical method, sometimes marketed under
                brand names like PhiRemoval. Providers using it position it as gentler than laser
                for facial skin, but industry opinions are split. Critics note that acid deep enough
                to reach pigment also causes significant skin trauma and scarring risk. If you are
                considering it, ask the technician specifically about their scarring rate and
                aftercare protocol before booking.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The right path depends on several things: pigment chemistry, how saturated the work
                is, what area of the face it sits on, and whether your goal is a clean slate or
                better-looking PMU.
              </p>
            </GuideSection>

            {/* Section 2 */}
            <GuideSection heading="Why Permanent Makeup Removal Is Different">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                PMU removal has its own logic that does not carry over from body tattoo removal.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Pigment chemistry changes the rules. Iron oxide, the most common PMU base, can
                reduce under laser energy and shift from red or brown to gray or black. Titanium
                dioxide, often used for opacity or light shades, can react to laser and turn
                gray-black almost instantly. This is why patch tests are standard for PMU laser work
                and not optional.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Location raises the stakes. Body tattoos can be partially faded and hidden. A color
                shift on brows, lip line, or eyeliner cannot be hidden. Mistakes show every day
                until they are corrected.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The skin is thinner. Brow, eyelid, and lip skin heals differently from body skin.
                Scarring risk, pigment migration, and healing time all shift compared to a standard
                body tattoo.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The goal is often not total removal. Many people want correction, not erasure.
                Getting 60 to 80% faded and then adding new PMU over a clean base often gives a
                better result than chasing 100% clearance.
              </p>
            </GuideSection>

            {/* Section 3 */}
            <GuideSection heading="Laser Removal for Permanent Makeup">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Laser is the most familiar method and, for the right pigment, it works. Picosecond
                and Q-switched Nd:YAG lasers fragment pigment into particles the body can clear.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Laser works well for:
              </h3>
              <GuideBulletList
                items={[
                  "Dark, iron-oxide based pigments in brows where the technician used a known, documented ink",
                  "Heavy lightening before rebooking new PMU",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Laser is risky for:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "Pigments with high titanium dioxide content",
                  "Warm-toned pigments (orange, red, light brown) that can shift color before fading",
                  "Lip blush work, where pigment composition is often unpredictable",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                A patch test six to eight weeks before full treatment is the only reliable way to
                check how your specific PMU reacts. Sessions are typically spaced six to eight weeks
                apart, and most people need three to eight sessions depending on saturation and
                pigment response.
              </p>
            </GuideSection>

            {/* Section 4 */}
            <GuideSection heading="Saline Removal for Permanent Makeup">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline removal implants a hypertonic salt solution into the existing PMU and lifts
                pigment through osmosis as the area heals and scabs.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Saline works well for:
              </h3>
              <GuideBulletList
                items={[
                  "Warm or light pigments where laser oxidation is a real concern",
                  "Titanium dioxide or white-base pigments that laser cannot safely treat",
                  "Shallow PMU that responds to surface-level lifting",
                  "Patients who want a non-laser option for any reason",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Saline is limited for:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "Deeper, denser PMU that behaves more like a body tattoo",
                  "Patients who cannot tolerate visible scabbing on the face for 10 to 14 days per session",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Sessions are spaced six to eight weeks apart, and three to six sessions is a normal
                range. Done well, saline has a lower color-shift risk than laser. Done poorly, it
                can cause scarring, patchy healing, or texture changes. Technician skill matters
                more than the saline brand used.
              </p>
            </GuideSection>

            {/* Section 5 */}
            <GuideSection heading="Laser vs Saline for Permanent Makeup Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                There is no universal winner. The choice depends on pigment, area, and goals.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Choose laser when:",
                    items: [
                      "PMU is dark and iron-oxide based",
                      "You want fewer sessions of visible facial scabbing",
                      "A patch test shows clean lightening without oxidation",
                    ],
                  },
                  {
                    title: "Choose saline when:",
                    items: [
                      "PMU is warm-toned, white-based, or contains titanium dioxide",
                      "Laser patch tests have caused any color concern",
                      "You are treating lip blush, where pigment unpredictability makes laser risky",
                      "You would rather manage scabbing than risk a color shift on the face",
                    ],
                  },
                  {
                    title: "Consider both methods in sequence when:",
                    items: [
                      "PMU is saturated enough that one method alone stalls",
                      "Partial removal has left a stubborn residual tone",
                    ],
                  },
                ].map((block) => (
                  <div key={block.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-3 text-[14px] font-semibold text-(--ink)">{block.title}</p>
                    <ul className="space-y-1 m-0 pl-4">
                      {block.items.map((item) => (
                        <li key={item} className="font-sans text-[14px] leading-relaxed text-(--muted)">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                A good PMU removal specialist tells you honestly which method fits. A technician who
                offers only one method and insists it is always best is a signal to get a second
                opinion.
              </p>
            </GuideSection>

            {/* Section 6 */}
            <GuideSection heading="Permanent Makeup Removal by Area">

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Eyebrow Tattoo and Microblading Removal
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Brows are the most common PMU removal request and the most flexible in terms of
                method. Microblading (hand tool, hair-stroke pattern) often removes more easily than
                machine-done ombre or powder brows, because the pigment sits shallower.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both laser and saline work on brows, depending on pigment. Laser tends to be faster
                for saturated, dark work. Saline tends to be safer for warm-toned or titanium-heavy
                work. For full brow-specific detail, see the{" "}
                <Link href="/categories/microblading-removal" className="text-(--accent) hover:underline">
                  microblading removal page
                </Link>
                .
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink) mt-6">
                Lip Blush Removal
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Lip blush is the trickiest PMU to remove. Pigment formulas vary widely, lip tissue
                heals differently from facial skin, and color shifts are highly visible.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline removal is often the safer choice for lip blush because laser energy on lip
                pigments has a higher risk of unpredictable color reactions. That said, saline on
                lips causes significant swelling and 10 to 14 days of visible healing per session,
                which some patients find hard to commit to.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Correction is often the smarter endpoint for lip blush. A skilled artist can
                neutralize or adjust color with complementary pigment, which is frequently cheaper
                and faster than full removal.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink) mt-6">
                Eyeliner Tattoo Removal
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Eyeliner removal is the most cautious of the three. Proximity to the eye means the
                margin for error is very small.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most experienced practitioners prefer saline for eyeliner, because laser energy near
                the eye area carries extra risk even with proper eye shields. Saline is slower but
                keeps the treatment superficial.
              </p>
              <GuideCallout label="Important">
                Eyeliner removal must be done by a practitioner with specific eyelid experience. A
                technician who does body tattoos and mentions eyeliner as an afterthought is the
                wrong fit for this.
              </GuideCallout>
            </GuideSection>

            {/* Section 7 */}
            <GuideSection heading="Permanent Makeup Correction vs Complete Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Correction is underused and often better than full removal.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Correction makes sense when:
              </h3>
              <GuideBulletList
                items={[
                  "Shape is wrong but color is usable",
                  "Color has shifted warm and can be neutralized with complementary pigment",
                  "PMU has migrated slightly but the base is intact",
                  "You want PMU, just not this PMU",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Complete removal makes sense when:
              </h3>
              <GuideBulletList
                items={[
                  "You do not want any PMU going forward",
                  "Pigment has shifted to cool gray or blue tones that camouflage poorly",
                  "Work is too saturated to correct cleanly",
                  "Previous correction attempts have made the problem worse",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Many people start out wanting full removal and realize partway through that 70%
                faded plus skilled new PMU gives them a better result than chasing 100% clearance.
                That is a legitimate outcome.
              </p>
            </GuideSection>

            {/* Section 8 */}
            <GuideSection heading="Risks of Permanent Makeup Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                PMU removal risk falls into three main categories.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Oxidation and color shift",
                    body: "The biggest laser-specific risk. Iron oxide and titanium dioxide can react to laser energy by darkening rather than fading, turning pigment gray, black, or greenish instantly. A patch test is the only reliable way to rule this out before full treatment.",
                  },
                  {
                    title: "Scarring and skin texture change",
                    body: "Usually low when the method matches the pigment and the technician is experienced. Aggressive laser settings, too-close session spacing, or at-home attempts raise scarring risk sharply. Facial skin is more prone to visible texture change than body skin.",
                  },
                  {
                    title: "Pigment migration or patchy healing",
                    body: "Can occur with saline if the solution is applied unevenly or if scabs are picked during healing. Migration is rare when aftercare is followed.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Temporary swelling, redness, and scabbing are normal for both methods and typically
                resolve in 10 to 14 days per session. Contact your technician for signs of
                infection, pain beyond 48 hours, or any color change that spreads beyond the treated
                area.
              </p>
            </GuideSection>

            {/* Section 9 */}
            <GuideSection heading="What to Expect: Sessions, Cost, and Healing">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Sessions for both laser and saline are typically spaced six to eight weeks apart.
                Full removal usually takes three to eight sessions total, depending on the area,
                saturation, and pigment type.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Cost per session",
                    body: "Typically $150 to $400 for most PMU removal work. Lip and eyeliner work is sometimes priced higher due to technique complexity. Total cost for meaningful fading or full removal usually runs in the low four figures.",
                  },
                  {
                    title: "Correction vs removal cost",
                    body: "Correction-only work is often cheaper than full removal, since fewer sessions are needed and the goal is adjustment rather than elimination.",
                  },
                  {
                    title: "Healing per session",
                    body: "Mild swelling, redness, and a visible scab that resolves in 10 to 14 days. Keep the area clean, do not pick the scab, avoid sun exposure, and avoid makeup on the treated area until healing is complete.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Technical claims about iron oxide oxidation, titanium dioxide behavior under laser,
                pigment depth, and method fit are grounded in standard dermatology consensus on PMU
                removal. Session counts and cost ranges reflect typical pricing across US PMU removal
                specialists. Individual outcomes vary. Consult a qualified provider before
                proceeding. See our{" "}
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
                  href: "/categories/microblading-removal",
                  title: "Microblading Removal",
                  desc: "A deep dive on brow-specific decisions: pigment types, laser vs saline for microblading, and when correction is smarter than full removal.",
                },
                {
                  href: "/comparisons/saline-vs-laser-tattoo-removal",
                  title: "Saline vs Laser Tattoo Removal",
                  desc: "Side-by-side comparison of the two most common removal methods: how they work, which pigments each handles, and how to decide.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Compare laser, TEPR, and saline removal across effectiveness, pain, cost, and scarring risk.",
                },
                {
                  href: "/reviews",
                  title: "Tattoo Removal Reviews",
                  desc: "Move from method research into provider-level review evidence when you are ready to evaluate specific clinics.",
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
