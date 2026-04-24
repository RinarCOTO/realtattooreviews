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
  title: "Microblading Removal: Laser, Saline, and Correction Guide | RealTattooReviews",
  description:
    "A practical guide to microblading removal. Compare laser and saline methods, understand oxidation risk, and learn when correction is smarter than full removal.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories/microblading-removal",
  },
  openGraph: {
    title: "Microblading Removal: Laser, Saline, and Correction Guide",
    description:
      "A practical guide to microblading removal. Compare laser and saline methods, understand oxidation risk, and learn when correction is smarter than full removal.",
  },
};

const faqs = [
  {
    question: "Can microblading be removed completely?",
    answer:
      "Sometimes. Full removal is realistic for standard iron oxide pigments placed at normal depth. Saturated, deep, or white-based work often ends with significant fading rather than zero. Many people choose to stop at a heavily faded stage and pair that with corrective work.",
  },
  {
    question: "Is saline or laser better for microblading removal?",
    answer:
      "Neither is universally better. Laser works best on dark iron-oxide pigments. Saline works better on warm-toned, white-based, or titanium dioxide pigments. These can react badly to laser. A patch test is the most reliable way to decide.",
  },
  {
    question: "Can laser remove microblading?",
    answer:
      "Yes, laser can remove microblading for most standard pigments. The main risks are oxidation with titanium dioxide or iron oxide formulas (pigment darkening instead of fading), and slow response from very light pigments. A patch test before full treatment is standard practice.",
  },
  {
    question: "How much does microblading removal cost?",
    answer:
      "Most people spend in the low four figures total. Laser sessions typically run $150 to $400 each. Saline sessions run $150 to $350 each. Session count ranges from three to eight for laser and three to six for saline, depending on saturation and pigment type.",
  },
  {
    question: "How many sessions does microblading removal take?",
    answer:
      "Three to eight laser sessions, or three to six saline sessions, is the normal range. Saturation, pigment type, skin response, and depth all affect the count. A clinic that promises a specific number without examining your brows is overselling.",
  },
  {
    question: "Does microblading removal leave scars?",
    answer:
      "Scarring risk is low when method, technician, and spacing are right, but it is not zero. The brow area is more prone to visible texture change than body skin. Aggressive settings and at-home attempts sharply raise scarring risk.",
  },
  {
    question: "How do you remove microblading at home?",
    answer:
      "You should not. The brow is close to the eyes. The skin there scars easily. Unregulated removal products can cause migration, patchy color loss, and long-term texture damage. Every at-home method carries real risk and no professional oversight.",
  },
  {
    question: "Why can laser darken eyebrow tattoos?",
    answer:
      "Iron oxide and titanium dioxide, common in microblading pigments, can oxidize when hit by laser energy. The pigment particles chemically react. They shift to darker tones (gray, black, or greenish) instead of fading. A patch test six to eight weeks before treatment is the standard way to catch this issue early.",
  },
  {
    question: "Is correction better than complete removal?",
    answer:
      "For many people, yes. If shape or color is the real problem and the base pigment is usable, correction costs less. It also takes less time and leaves you with brows you actually want. Full removal makes sense when you do not want any brow tattoo. It also fits when the existing work is too saturated or mis-colored to correct cleanly.",
  },
];

const PAGE_PATH = "/categories/microblading-removal";
const SITE_URL = "https://realtattooreviews.com";

export default function MicrobladingRemovalPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Categories", href: "/categories" },
    { name: "Microblading Removal", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Microblading Removal: Laser, Saline, and Correction Guide",
    description:
      "A practical guide to microblading removal. Compare laser and saline methods, understand oxidation risk, and learn when correction is smarter than full removal.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["Microblading removal", "Saline removal", "Laser removal", "PMU removal"],
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
            <Link href="/categories" className="hover:text-(--ink) transition-colors">
              Categories
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Microblading Removal
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Microblading{" "}
            <span className="text-(--accent)">Removal</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            A practical guide to microblading removal. Compare laser and saline methods, understand
            oxidation risk, and learn when correction is smarter than full removal.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Intro callout */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Microblading can usually be removed or corrected, but the right method depends on
                  more than price or convenience. The pigments used in microblading behave differently
                  from standard tattoo ink. The skin on the brow is thinner and more reactive than
                  body skin. And the goal for many people is not total removal. It is fixing shape,
                  color, or migration so the brows look natural again.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page explains how microblading removal actually works. It covers where laser
                  and saline each make sense, why some brows darken or turn orange during removal,
                  and how to decide between correction and full removal before booking anything.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <GuideSection heading="How Microblading Removal Works">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Microblading deposits pigment into the upper dermis using a hand tool that creates
                fine, hair-like strokes. The pigment sits shallower than body tattoo ink and uses
                different ingredients, typically iron oxide, sometimes combined with organic dyes or
                titanium dioxide. Removal has to account for both depth and chemistry.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                There are three realistic paths:
              </p>
              <GuideBulletList
                items={[
                  "Laser removal uses specific wavelengths of light to fragment pigment particles so the body can clear them through the lymphatic system.",
                  "Saline removal, also called salt or saline lightening, uses a hypertonic solution implanted into the existing pigment with a tattoo machine or manual tool. The salt draws pigment upward through osmosis, and pigment leaves as the area scabs and heals.",
                  "Correction keeps some or all of the existing pigment and either camouflages, reshapes, or re-colors the brows instead of removing them.",
                ]}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The right path depends on several things: how saturated the brows are, what pigment
                was used, how long ago the procedure was done, and whether the goal is clean skin or
                just better-looking brows.
              </p>
            </GuideSection>

            {/* Section 2 */}
            <GuideSection heading="Can Microblading Be Removed?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Yes, in most cases microblading can be removed. Whether it can be removed completely
                is a different question, and the honest answer is: sometimes.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Full removal is realistic when:
              </h3>
              <GuideBulletList
                items={[
                  "The pigment is a standard iron oxide or carbon-based formula",
                  "The brows are at normal depth",
                  "The patient commits to multiple sessions spaced weeks apart",
                  "The method and technician match the pigment and skin type",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Full removal is harder when:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "The original work is saturated or layered over years of touch-ups",
                  "Pigment may be placed too deep",
                  "The work uses titanium dioxide or white-based pigments that react unpredictably to laser",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                At-home microblading removal using creams, scrubs, or DIY saline kits is not
                recommended. The brow area is close to the eyes. Skin damage here scars easily.
                Unregulated removal products can cause migration, patchy color loss, and long-term
                texture issues.
              </p>
            </GuideSection>

            {/* Section 3 */}
            <GuideSection heading="Laser Microblading Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Laser is the method most people know, and for the right pigment it works well. A
                picosecond or Q-switched Nd:YAG laser delivers energy that fragments pigment. The
                particles become small enough for the body to clear through the lymphatic system.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Laser works well for:
              </h3>
              <GuideBulletList
                items={[
                  "Darker black, gray, or true brown iron oxide pigments",
                  "Standard, well-documented ink",
                  "Significant lightening before a new brow design",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Laser gets complicated with:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "Pigments containing titanium dioxide or white base, which can oxidize and turn gray, black, or greenish instantly when hit by laser energy",
                  "Warm-toned pigments (orange, red, light brown) that can shift color before they fade",
                  "Very light or blonde work that often lacks enough pigment contrast to respond efficiently",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Sessions are usually spaced six to eight weeks apart. Most people need three to eight
                sessions for meaningful fading. Laser technicians who specialize in PMU will almost
                always test a small area first to check how the specific pigment reacts before
                treating the full brow.
              </p>
            </GuideSection>

            {/* Section 4 */}
            <GuideSection heading="Saline Removal for Microblading">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline removal uses a sterile hypertonic solution implanted into the existing
                microblading with a tattoo machine or manual tool. The salt draws pigment upward
                through osmosis, and as the area scabs and heals, pigment leaves with the scab.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Saline works well for:
              </h3>
              <GuideBulletList
                items={[
                  "Warm or light pigments where laser oxidation is a real risk",
                  "Titanium dioxide or white-base pigments that laser cannot safely treat",
                  "Shallow microblading strokes that respond well to surface-level lifting",
                  "Patients who want a non-laser option for any reason",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Saline is limited for:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "Deeper work pushed into the dermis, which saline may not reach efficiently",
                  "Heavily saturated machine-done brows that behave more like body tattoos",
                  "Patients who cannot tolerate visible scabbing on the face for 10 to 14 days per session",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline sessions are typically spaced six to eight weeks apart, and three to six
                sessions is a normal range. Done well, saline has a lower color-shift risk than
                laser. Done poorly, it can cause scarring, patchy healing, or texture changes.
                Technician skill matters more than the brand of saline used.
              </p>
            </GuideSection>

            {/* Section 5 */}
            <GuideSection heading="Saline vs Laser for Microblading Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                There is no universal winner. The choice comes down to pigment, goals, and how much
                visible downtime you can tolerate per session.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Choose laser when:",
                    items: [
                      "Pigment is dark and iron-oxide based",
                      "You want fewer sessions of visible scabbing",
                      "A patch test shows clean lightening without oxidation",
                      "Your goal is heavy fading before rebooking new brows",
                    ],
                  },
                  {
                    title: "Choose saline when:",
                    items: [
                      "Pigment is warm-toned, white-based, or contains titanium dioxide",
                      "Laser patch tests have shifted color or caused concern",
                      "You would rather have facial scabbing than risk a color shift",
                      "Your brows are shallow enough that saline can reach the pigment",
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
                Consider both methods in sequence when the brows are saturated enough that one method
                alone will stall, or when partial removal has left a stubborn residual tone. A good
                PMU removal specialist will tell you honestly which method fits. A technician who
                only offers one method and insists it is always best for everyone is a signal to get
                a second opinion.
              </p>
            </GuideSection>

            {/* Section 6 */}
            <GuideSection heading="Microblading Correction vs Complete Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Correction is often the smarter endpoint, and it is underused because clinics make
                more money on full-removal packages.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Correction makes sense when:
              </h3>
              <GuideBulletList
                items={[
                  "Shape is wrong but color is acceptable",
                  "Color has shifted warm (orange, red) and can be neutralized with complementary pigment",
                  "Brows have migrated slightly but the base pigment is still usable",
                  "You want brows, just not these brows",
                ]}
              />

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Full removal makes sense when:
              </h3>
              <GuideBulletList
                items={[
                  "You do not want any brow tattoo going forward",
                  "Pigment has shifted to cool, gray, or blue tones that camouflage poorly",
                  "The work is too saturated or uneven to correct cleanly",
                  "Previous correction attempts have stacked and made the problem worse",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Many people start thinking they want full removal. After a few sessions they realize
                that 70% faded plus a skilled new brow design gives them a better result than chasing
                100% clearance. That is a legitimate outcome, not a failure.
              </p>
            </GuideSection>

            {/* Section 7 */}
            <GuideSection heading="Microblading Removal Cost">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Pricing varies by region, provider type, and method. Typical ranges are:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Laser",
                    body: "Roughly $150 to $400 per session, with most people needing three to eight sessions.",
                  },
                  {
                    title: "Saline",
                    body: "Roughly $150 to $350 per session, with most people needing three to six sessions.",
                  },
                  {
                    title: "Correction",
                    body: "Pricing varies widely depending on scope. Simple color correction may be quoted as a single service, while full reshaping is often bundled with new brow work.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Total cost for meaningful fading or full removal usually runs in the low four figures,
                depending on session count and method. Correction can be cheaper than full removal if
                the existing color is usable.
              </p>

              <GuideCallout label="Red flag">
                Ask any provider for a written session estimate before committing. A clinic that
                refuses to estimate session count is a red flag. No honest provider can promise a
                number, but they should be able to give you a realistic range after examining the
                brows in person.
              </GuideCallout>
            </GuideSection>

            {/* Section 8 */}
            <GuideSection heading="Risks: Scarring, Oxidation, and Color Changes">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most microblading removal risk falls into three categories.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Scarring risk",
                    body: "Real but usually low when the method matches the pigment and the technician is experienced. Aggressive settings, too-close session spacing, or at-home attempts raise scarring risk sharply. The brow area heals differently from body skin and is more prone to visible texture change.",
                  },
                  {
                    title: "Oxidation",
                    body: "The biggest laser-specific risk for PMU. Titanium dioxide and iron oxide can react to laser energy by darkening or shifting color instantly, sometimes turning orange brows gray or light brown brows black. A patch test done six to eight weeks before full treatment is the only reliable way to rule this out.",
                  },
                  {
                    title: "Color changes during removal",
                    body: "Can happen with both methods. Saline can leave a faint yellow or warm residue before a session heals fully. Laser can leave a cooler or ashier tone as pigment fades unevenly. Both usually resolve across subsequent sessions, but the interim weeks can look uneven.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Temporary swelling, redness, and scabbing are normal for both methods. These
                typically resolve within 10 to 14 days per session. Contact your technician promptly
                for signs of infection, prolonged pain beyond 48 hours, or any color change that
                spreads beyond the treated area.
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Technical claims about iron oxide oxidation, titanium dioxide response to laser, and
                pigment depth are grounded in standard dermatology consensus on PMU removal. Session
                counts and cost ranges reflect typical pricing across US PMU removal specialists.
                Individual outcomes vary. Consult a qualified provider before proceeding. See our{" "}
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
                  href: "/comparisons/saline-vs-laser-tattoo-removal",
                  title: "Saline vs Laser Tattoo Removal",
                  desc: "Side-by-side comparison of the two most common removal methods: how they work, which pigments each handles, and how to decide.",
                },
                {
                  href: "/categories/permanent-makeup-removal",
                  title: "Permanent Makeup Removal",
                  desc: "A broader look at cosmetic tattoo removal across brows, lip blush, and eyeliner.",
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
                <p className="text-[13px] leading-relaxed text-(--muted) m-0">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
