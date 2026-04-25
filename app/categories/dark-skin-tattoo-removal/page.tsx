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
  title: "Tattoo Removal on Dark Skin: Safe Laser, Wavelengths, and Provider Guide | RealTattooReviews",
  description:
    "A practical guide to tattoo removal on dark skin. Understand laser wavelength choice, hyperpigmentation risk, and how to find a provider experienced with Fitzpatrick IV-VI skin.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories/dark-skin-tattoo-removal",
  },
  openGraph: {
    title: "Tattoo Removal on Dark Skin: Safe Laser, Wavelengths, and Provider Guide",
    description:
      "A practical guide to tattoo removal on dark skin. Understand laser wavelength choice, hyperpigmentation risk, and how to find a provider experienced with Fitzpatrick IV-VI skin.",
  },
};

const faqs = [
  {
    question: "Can you do tattoo removal on dark skin?",
    answer:
      "Yes. Tattoo removal on dark skin is safe and effective with the right setup. That means the right laser wavelength, appropriate settings, and a provider experienced with Fitzpatrick IV, V, and VI skin. The key decisions are wavelength (1064 nm Nd:YAG), fluence (lower is safer), and session spacing (eight to twelve weeks, not six).",
  },
  {
    question: "Does laser tattoo removal work on dark skin?",
    answer:
      "Yes, laser tattoo removal works on dark skin. It typically takes more sessions than on lighter skin, and sessions are usually spaced further apart. Q-switched and picosecond Nd:YAG lasers at 1064 nm are the standard choice.",
  },
  {
    question: "Can Black people get tattoo removal?",
    answer:
      "Yes. Laser tattoo removal on black skin, including Fitzpatrick V and VI skin tones, is safe with the right laser and provider. Avoid clinics that treat all skin tones with the same settings and wavelengths. Ask directly about their experience with darker skin before booking.",
  },
  {
    question: "Is tattoo removal safe for dark skin?",
    answer:
      "It can be, with the right setup. Safety depends on wavelength choice (1064 nm for most dark-skin cases), appropriate fluence, careful session spacing, patch testing, and real provider experience. Any of those done poorly raises risk of pigment change or scarring.",
  },
  {
    question: "What is the best laser for dark skin tattoo removal?",
    answer:
      "A Q-switched or picosecond Nd:YAG laser at 1064 nm is the standard safest choice. Picosecond machines like PicoWay, PicoSure, or Enlighten are preferred over older Q-switched models when available. Shorter pulse widths reduce thermal injury. Alexandrite (755 nm) and KTP (532 nm) lasers are higher risk on darker skin.",
  },
  {
    question: "Can tattoo removal cause hyperpigmentation on dark skin?",
    answer:
      "Yes, it can. Hyperpigmentation is the most common side effect on darker skin. Thermal injury triggers extra melanin production. It usually fades in three to twelve months. Risk is reduced with lower fluence, correct wavelength, and longer session spacing.",
  },
  {
    question: "Can tattoo removal cause hypopigmentation on dark skin?",
    answer:
      "Yes, but less commonly than hyperpigmentation. Hypopigmentation is lightening of the skin where the laser treated, and it is more likely to be permanent. Aggressive settings, overlapping pulses, or too-frequent sessions raise the risk.",
  },
  {
    question: "How can you reduce pigmentation risk during tattoo removal?",
    answer:
      "Use a 1064 nm Nd:YAG laser. Run lower fluence. Space sessions eight to twelve weeks apart. Patch test before treating the full tattoo. Follow aftercare strictly (sun avoidance, sunscreen, no scab picking). And pause treatment if pigment change appears. Choose a provider with documented Fitzpatrick V-VI experience.",
  },
  {
    question: "Does tattoo removal leave scars on dark skin?",
    answer:
      "Scarring is uncommon with experienced providers using appropriate settings. Risk is higher than on lighter skin if treatment is aggressive or aftercare is poor. People with a keloid or hypertrophic scarring tendency have a higher baseline risk. Most pigment change after treatment is not scarring and usually resolves.",
  },
];

const PAGE_PATH = "/categories/dark-skin-tattoo-removal";
const SITE_URL = "https://realtattooreviews.com";

export default function DarkSkinTattooRemovalPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Categories", href: "/categories" },
    { name: "Dark Skin Tattoo Removal", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tattoo Removal on Dark Skin: Safe Laser, Wavelengths, and Provider Guide",
    description:
      "A practical guide to tattoo removal on dark skin. Understand laser wavelength choice, hyperpigmentation risk, and how to find a provider experienced with Fitzpatrick IV-VI skin.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal on dark skin",
      "Fitzpatrick IV-VI laser removal",
      "Nd:YAG tattoo removal",
      "Hyperpigmentation risk",
      "Dark skin laser safety",
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
            <Link href="/categories" className="hover:text-(--ink) transition-colors">
              Categories
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Dark Skin Tattoo Removal
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal on{" "}
            <span className="text-(--accent)">Dark Skin</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            A practical guide to tattoo removal on dark skin. Understand laser wavelength choice,
            hyperpigmentation risk, and how to find a provider experienced with Fitzpatrick IV-VI
            skin.
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
                  Tattoo removal works on dark skin. What changes is the margin for error. Melanin
                  absorbs laser energy along with the tattoo pigment. So the wrong wavelength, the
                  wrong settings, or an inexperienced provider can cause hyperpigmentation,
                  hypopigmentation, or burns. These can take months to fade. With the right laser,
                  the right settings, and a provider experienced in treating Fitzpatrick IV, V, and
                  VI skin, outcomes are safe and effective.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page explains why melanin raises risk, covers which wavelengths and
                  technologies are safest, shows how to tell pigment change apart from true
                  scarring, and covers what to look for in a provider. Generic clinic pages that
                  say "safe for all skin tones" without specifics are the reason this page exists.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <GuideSection heading="Does Tattoo Removal Work on Dark Skin?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Yes. Tattoo removal is safe and effective on dark skin in the right setup. The laser
                and settings have to be chosen correctly. The provider has to have real experience
                treating melanated skin.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The reason this question keeps coming up is simple. Older lasers, some current
                mid-tier machines, and providers without Fitzpatrick IV-VI experience do cause
                problems. Those problems are not the same as "tattoo removal does not work on dark
                skin." They are the result of the wrong tool or hands on the right skin.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Modern picosecond and Q-switched Nd:YAG lasers at the 1064 nm wavelength are
                well-suited for darker skin. That wavelength bypasses most melanin absorption.
                Alexandrite lasers (755 nm) and KTP lasers (532 nm) are higher-risk on darker skin.
                Those wavelengths are absorbed more aggressively by melanin. Knowing which
                wavelength you are being treated with matters. Ask.
              </p>
            </GuideSection>

            {/* Section 2 */}
            <GuideSection heading="Best Lasers for Dark Skin Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The safest choice for most dark skin tattoo removal is a Q-switched or picosecond
                Nd:YAG laser operating at 1064 nm.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Here is why that wavelength matters. Melanin absorbs light strongly in the visible
                spectrum (shorter wavelengths like 532 nm and 755 nm) and weakly at longer
                wavelengths like 1064 nm. A 1064 nm laser can pass through melanin-rich skin and
                target black tattoo ink with minimal competing absorption. That is the core reason
                Nd:YAG is the standard for darker skin types.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Picosecond lasers (PicoWay, PicoSure, Enlighten) with a 1064 nm option are a step
                up from older Q-switched Nd:YAG. They deliver shorter pulse widths. Shorter pulses
                mean less heat per pulse, which means lower thermal injury risk. That thermal
                difference is why picosecond is often preferred for Fitzpatrick V and VI skin, even
                at higher cost.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Lasers and settings to approach carefully:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "Alexandrite lasers (755 nm) are useful for certain ink colors but aggressively absorbed by melanin. Higher risk on darker skin.",
                  "KTP lasers (532 nm) are often used for red and orange ink, but absorbed by melanin at the surface. Risky for dark skin.",
                  "IPL (intense pulsed light) is not a tattoo removal laser at all and should never be used for tattoo removal, regardless of skin tone.",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                If a provider wants to treat black ink with a 755 nm or 532 nm laser on your skin,
                ask detailed questions about their experience with your specific skin tone.
              </p>
            </GuideSection>

            {/* Section 3 */}
            <GuideSection heading="Laser Tattoo Removal on Dark Skin: How It Works">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The physical mechanism is the same as with any skin tone. Laser energy fragments
                tattoo pigment. The particles become small enough for the body to clear through the
                lymphatic system. What changes on dark skin is how laser energy interacts with
                melanin on its way to and from the ink.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Key mechanical differences:
              </h3>
              <GuideBulletList
                items={[
                  "Melanin absorbs laser energy. On darker skin, more energy is absorbed in the epidermis before reaching the ink.",
                  "More absorption in the epidermis means more heat in the top skin layer. More heat raises the risk of pigment change and burn.",
                  "Longer wavelengths (1064 nm) and shorter pulse widths (picosecond) reduce that thermal load.",
                  "Lower fluence (energy per pulse) and more sessions spaced further apart also reduce risk.",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                A provider experienced with Fitzpatrick V and VI skin usually runs lower fluence.
                They treat more conservatively. They space sessions further apart (eight to twelve
                weeks instead of six to eight). And they patch-test before treating the full tattoo.
                All of those adjustments trade a slower treatment for a safer one.
              </p>
            </GuideSection>

            {/* Section 4 */}
            <GuideSection heading="Hyperpigmentation, Hypopigmentation, and Scarring Risks">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These three risks get conflated in clinic marketing. They are different.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Hyperpigmentation",
                    body: "The skin producing extra melanin in response to thermal injury from the laser. It shows up as darker patches where the tattoo was treated. On dark skin it can be noticeable and can take three to twelve months to fade, sometimes longer. It is usually not permanent but can feel like it while waiting.",
                  },
                  {
                    title: "Hypopigmentation",
                    body: "The skin losing melanin and becoming lighter than the surrounding skin. It is less common than hyperpigmentation but more concerning because it is more often permanent. Hypopigmentation risk rises with aggressive settings, too-close session spacing, or overlapping pulses.",
                  },
                  {
                    title: "True scarring",
                    body: "Textural change, raised or indented skin. Different from pigmentation change. Scarring on dark skin carries a higher baseline risk of keloid and hypertrophic scarring for people with that predisposition. Scarring is rare with experienced providers using appropriate settings. It is more common with aggressive treatment or poor aftercare.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The risk ranking for darker skin, from most common to least common, is typically:
                hyperpigmentation first, then hypopigmentation, then textural scarring or keloids.
                All three are reducible with the right laser, the right settings, and a careful
                provider.
              </p>
            </GuideSection>

            {/* Section 5 */}
            <GuideSection heading="How to Reduce Risk During Tattoo Removal on Dark Skin">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Several decisions move the needle on risk.
              </p>
              <GuideBulletList
                items={[
                  "Confirm the laser wavelength. Ask the provider directly: \"What wavelength is the laser treating my tattoo?\" 1064 nm Nd:YAG is standard for dark skin. Anything else needs justification.",
                  "Ask for a patch test. Six to eight weeks before the full session, the provider tests a small area. If pigment change or healing issues appear, you know before the whole tattoo is treated.",
                  "Accept lower fluence. Less energy per pulse means a slower treatment but lower thermal injury risk. A provider who runs high fluence on your skin without discussion is not experienced with Fitzpatrick V-VI.",
                  "Space sessions eight to twelve weeks apart. Dark skin typically needs more healing time between sessions than the standard six to eight weeks. Six-week spacing is too aggressive for many Fitzpatrick V-VI patients.",
                  "Follow aftercare closely. Sun avoidance, consistent sunscreen use, no picking of scabs, and immediate contact with the provider at any sign of blister or infection. Post-inflammatory hyperpigmentation often comes from aftercare failure, not the laser itself.",
                  "Pause if pigment change appears. If you see hyperpigmentation or hypopigmentation after a session, stop and let the skin recover before the next session. Pushing through accelerates the problem.",
                ]}
              />
              <GuideCallout label="Note">
                These are not extra precautions. They are the baseline for safe dark skin tattoo
                removal.
              </GuideCallout>
            </GuideSection>

            {/* Section 6 */}
            <GuideSection heading="Tattoo Removal on Dark Skin: What Results Look Like">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Real expectations matter more than generic before-and-after galleries.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Fading on dark skin usually takes more sessions than on lighter skin. A tattoo that
                fully fades in six laser sessions on Fitzpatrick II might need eight to twelve on
                Fitzpatrick V-VI. This is partly because settings are more conservative and partly
                because melanin competes for laser energy.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                After each session, the treated area may look lighter or darker. It may match the
                surrounding skin temporarily before settling. This can be confusing. Most pigment
                change within the first three months after a session is not permanent. It will
                resolve with time.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Complete removal is possible on dark skin but takes patience. Most providers
                experienced with darker skin talk about "significant fading" for the first several
                sessions. Full clearance is a longer-term outcome. A provider who promises complete
                removal in a fixed session count without examining your tattoo and skin is
                overpromising.
              </p>
              <GuideCallout label="What to look for">
                Look for before-and-after photos specifically on darker skin. A clinic page showing
                only Fitzpatrick I-III results is not demonstrating relevant experience for your
                case.
              </GuideCallout>
            </GuideSection>

            {/* Section 7 */}
            <GuideSection heading="What to Look for in a Provider">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The single most important variable for safe dark skin tattoo removal is provider
                experience. The machine model matters less. A board-certified dermatologist with ten
                years of Fitzpatrick V-VI work on a mid-range Q-switched Nd:YAG is usually safer
                than an inexperienced technician with a brand-new picosecond laser.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Specific questions to ask before booking:
              </h3>
              <GuideBulletList
                items={[
                  "What wavelength will you use to treat my tattoo, and why that one for my skin tone?",
                  "How many patients with Fitzpatrick V or VI skin (darker brown or black skin) have you personally treated?",
                  "Can you show me before-and-after photos of patients with skin similar to mine?",
                  "Do you offer a patch test before the full first session?",
                  "What is your protocol if hyperpigmentation appears after a session?",
                  "How long do you wait between sessions for darker skin tones?",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                A provider who answers all six confidently and specifically is a fit. A provider who
                deflects, generalizes, or says "it's safe for all skin tones" without detail is not.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Medical credentials also matter. A dermatology practice or physician-supervised
                laser clinic is usually safer than a medspa chain with rotating technicians. A
                specialist with documented training on darker skin is best.
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Wavelength guidance (1064 nm Nd:YAG for Fitzpatrick IV-VI skin), risk explanations,
                and provider-selection advice are grounded in standard dermatology consensus on laser
                tattoo removal. Session count and spacing ranges reflect typical clinical practice.
                Individual outcomes vary by tattoo, skin type, aftercare, and provider skill.
                Consult a qualified provider before proceeding. See our{" "}
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
                  href: "/blog/tattoo-removal-on-dark-skin",
                  title: "Tattoo Removal on Dark Skin",
                  desc: "A closer look at real outcomes and what the research says about laser removal on melanated skin.",
                },
                {
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "A full guide to scarring risk during tattoo removal: causes, prevention, and what to do if it happens.",
                },
                {
                  href: "/cost",
                  title: "Tattoo Removal Cost",
                  desc: "Pay-as-you-go vs package pricing, what drives cost, and typical ranges across provider types.",
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
