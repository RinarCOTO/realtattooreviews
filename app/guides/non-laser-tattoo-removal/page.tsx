/*
 * Static guide page. Lives at /guides/non-laser-tattoo-removal.
 * Static segments win over the [slug] dynamic route, so this file owns the URL.
 *
 * Editorial note: this guide maps method categories without naming commercial
 * providers or trademarked systems. Keep the framing on mechanism, fit, risks,
 * and questions a reader can ask before booking.
 */

import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import { getGuideReviewDate, formatGuideReviewDate } from "@/lib/page-data/guides";

const PAGE_PATH = "/guides/non-laser-tattoo-removal";
const SITE_URL = "https://realtattooreviews.com";

/*
 * Hardcoded fallback for the "Last reviewed" stamp. Used only when Sanity
 * has no `guide` doc for this slug or when the request fails. Editors who
 * want to refresh the date should update the `dateModified` field on the
 * matching Sanity guide document, NOT this constant. Updating this constant
 * still works as a backup, but bypasses the editorial workflow.
 */
const FALLBACK_LAST_REVIEWED = "May 2, 2026";
const SLUG = "non-laser-tattoo-removal";

export const metadata: Metadata = {
  title: "Non-Laser Tattoo Removal: Methods, Healing, Risks, and Fit",
  description:
    "Plain-English guide to non-laser tattoo removal. How chemical extraction and dermabrasion-based tissue expulsion work, how they compare with laser, and what to ask before booking.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Non-Laser Tattoo Removal: Methods, Healing, Risks, and Fit",
    description:
      "How non-laser tattoo removal methods work, when they may fit, and how to compare them with laser before booking.",
  },
};

const faqs = [
  {
    question: "Does non-laser removal scar more than laser?",
    answer:
      "It can, depending on method depth, provider technique, skin type, and aftercare. Laser works below the skin surface by fragmenting ink. Non-laser methods intentionally create a controlled surface wound so ink can be lifted or expelled during healing. That makes wound care and provider skill especially important. Ask how the provider adjusts depth, spacing, and aftercare for your skin type.",
  },
  {
    question: "How many sessions does non-laser removal take compared to laser?",
    answer:
      "There is no universal session count. Laser often takes 6 to 12 sessions for substantial clearance on professional tattoos. Non-laser methods can need fewer sessions in some cases, but each session may involve a longer visible healing window. The right comparison is not sessions alone. Compare total timeline, healing burden, scarring risk, cost, and whether the method fits your ink type and skin profile.",
  },
  {
    question: "Can non-laser remove all ink colors?",
    answer:
      "Non-laser methods are less dependent on ink color than lasers because they do not rely on a specific wavelength being absorbed by a specific pigment. That can be helpful for colors that respond poorly to laser, including some light colors. It does not guarantee complete clearance. Ink depth, density, layering, skin response, and technique still matter.",
  },
  {
    question: "Is non-laser cheaper than laser?",
    answer:
      "Sometimes, but not always. A lower per-session price does not automatically mean a lower total cost. Non-laser methods may have different session spacing, healing requirements, and aftercare needs. Ask for a full-course estimate, not only the first-session price.",
  },
  {
    question: "What does the healing process look like?",
    answer:
      "Expect a controlled wound, redness, swelling, crusting or scabbing, and a healing period where the area must be protected from picking, friction, sun, and contamination. The exact timeline depends on the method and body area. If the wound spreads, smells unusual, produces increasing pain, or shows signs of infection, contact the provider or a medical professional.",
  },
];

export default async function NonLaserTattooRemovalGuidePage() {
  // Pull the review date from Sanity at build time so editors can update
  // it without a code change. Falls back to the hardcoded constant above
  // if Sanity has no doc for this slug or the fetch fails.
  const sanityDate = await getGuideReviewDate(SLUG);
  const lastReviewed = formatGuideReviewDate(sanityDate, FALLBACK_LAST_REVIEWED);

  return (
    <GuideLayout
      breadcrumb="Non-Laser Tattoo Removal"
      h1="Non-Laser Tattoo Removal"
      description="A methods-landscape guide for readers comparing non-laser options with laser. Learn what non-laser actually includes, where each branch fits, and what questions matter before booking."
      faqs={faqs}
      path={PAGE_PATH}
    >
      <GuideSection heading='What "non-laser" actually covers'>
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Non-laser tattoo removal is not one single method. It is a category for approaches that do not use light energy to fragment ink. The two branches readers most often encounter are chemical extraction and dermabrasion-based tissue expulsion. They share one basic idea: instead of breaking ink into smaller particles for the body to clear gradually, they create a controlled surface pathway so pigment can move toward the skin surface during healing.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Chemical extraction includes saline-based approaches. A solution is placed into the tattooed skin, then the treated area heals through a scabbing process. Some pigment can be lifted as the wound closes. For permanent makeup and microblading, this is often discussed because cosmetic pigments may darken or shift when hit with laser energy. See the{" "}
          <Link href="/guides/saline-tattoo-removal" className="text-(--accent) hover:underline">
            saline tattoo removal guide
          </Link>{" "}
          for the deeper version.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Dermabrasion-based tissue expulsion uses superficial abrasion plus a topical solution to create a controlled wound over the tattooed area. The goal is to let ink exit through the skin surface as the wound heals. This is different from classic surgical excision, where skin is cut out, and different from laser, where ink is fragmented under intact skin.
        </p>
        <GuideCallout label="In one line">
          Non-laser removal usually means controlled surface healing, not light-based ink fragmentation.
        </GuideCallout>
      </GuideSection>

      <GuideSection heading="How non-laser methods compare to laser">
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Laser removal and non-laser removal aim at the same reader goal, but the mechanisms are different enough that the tradeoffs should be compared directly. Laser depends on wavelength, pulse duration, ink color, and the body's ability to clear fragmented particles. Non-laser methods depend more on wound creation, pigment movement through the surface, healing discipline, and provider control of depth.
        </p>
        <GuideTable
          headers={["Question", "Laser", "Non-laser"]}
          rows={[
            ["Mechanism", "Fragments ink so the body can clear it through the lymphatic system over multiple sessions", "Creates a controlled surface pathway so pigment is expelled through the skin during healing"],
            ["Color dependence", "Strongly affected by wavelength and pigment color", "Less color-dependent, but still affected by ink depth and density"],
            ["Healing window", "Usually redness, swelling, frosting or blistering, then gradual fading between sessions", "Usually controlled abrasion, crusting, then surface healing over 3 to 6 weeks per session"],
            ["Darker skin considerations", "1064nm protocols are usually recommended, though hypopigmentation and post-inflammatory hyperpigmentation risk remain the top discussion points", "May be a fit when laser risk is high, but scarring and pigment-change risk still need provider screening"],
            ["Best-fit pattern", "Standard black or dark ink, multi-session fading, cover-up prep", "Cosmetic ink concerns, stalled cases, or color situations where laser fit is weaker"],
          ]}
          winners={[null, null, null, null, null]}
        />
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Complete removal also means something different across methods. With laser, progress is usually judged by gradual fading between sessions. With non-laser methods, progress may look more immediate in spots where pigment is expelled, but uneven surface healing can also create patchiness. Neither method guarantees perfectly clean skin.
        </p>
      </GuideSection>

      <GuideSection heading="Who non-laser methods may suit">
        <GuideBulletList
          items={[
            "Readers with darker skin tones who have been told laser carries higher pigment-change risk.",
            "Readers with permanent makeup or cosmetic tattoo pigment where laser darkening is a concern.",
            "Readers whose prior laser sessions have stalled and who want to understand other mechanism categories.",
            "Readers preparing for a cover-up who need targeted fading rather than full clearance.",
            "Readers with stubborn light or mixed colors that a single laser wavelength cannot address well.",
          ]}
        />
      </GuideSection>

      <GuideSection heading="What to ask a non-laser provider">
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Non-laser consultations should be specific. If the explanation sounds like a guaranteed erase, slow down. The provider should be able to explain the mechanism, treatment depth, aftercare, expected number of sessions, and how your skin type changes risk.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Non-laser is not automatically safer than laser. Any controlled abrasion is still a skin event, and a poor consultation is a worse signal than the method itself. If you have a history of keloids, slow healing, diabetes, active eczema, immune suppression, or a recent infection in the area, ask for medical clearance before treating.
        </p>
        <GuideBulletList
          items={[
            "What exact method is being used, and how does it move pigment out of the skin?",
            "How deep does the treatment go, and how is depth controlled across different body areas?",
            "How many sessions are realistic for this tattoo, and what would make the count go up?",
            "What does normal healing look like at day 1, day 7, and week 4?",
            "How do you screen for scarring risk on Fitzpatrick IV to VI skin types?",
            "What aftercare products are required, and what should trigger a medical follow-up?",
          ]}
        />
      </GuideSection>

      <GuideSection heading="How to compare your options before booking">
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Start with method fit, then compare providers. For black or dark professional tattoos on lighter skin, laser is usually the baseline comparison. For cosmetic pigments, difficult colors, darker skin, or stalled laser progress, non-laser options may deserve a consultation. The best answer often comes from getting two opinions from providers using different method categories.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-heading">
          Do not compare only star ratings. Look for reviews that mention healing, scarring, infection, pigment change, session spacing, and whether the provider gave realistic expectations. A good consultation should make the tradeoffs clearer, not make the method sound risk-free.
        </p>
        <p className="font-sans text-[14px] leading-relaxed text-heading">
          For direct method comparisons, see{" "}
          <Link href="/comparisons/saline-vs-laser-tattoo-removal" className="text-(--accent) hover:underline">
            saline vs. laser tattoo removal
          </Link>{" "}
          and the{" "}
          <Link href="/comparisons/best-tattoo-removal-method" className="text-(--accent) hover:underline">
            best tattoo removal method guide
          </Link>
          .
        </p>
      </GuideSection>

      <GuideRelatedLinks
        links={[
          {
            href: "/guides/saline-tattoo-removal",
            title: "Saline Tattoo Removal",
            desc: "Chemical extraction, cosmetic tattoo use cases, sessions, healing, and limits.",
          },
          {
            href: "/guides/laser-tattoo-removal",
            title: "Laser Tattoo Removal",
            desc: "How laser fragmentation works and when it is the baseline method.",
          },
          {
            href: "/guides/tattoo-removal-scarring",
            title: "Tattoo Removal Scarring",
            desc: "How scarring risk develops and how to evaluate it before booking.",
          },
          {
            href: "/guides/tattoo-removal-side-effects",
            title: "Tattoo Removal Side Effects",
            desc: "Pigment change, blistering, swelling, infection risk, and warning signs.",
          },
        ]}
      />

      <div className="py-12">
        <GuideCallout label="Last reviewed">
          {lastReviewed}. This guide is educational and should be used to prepare better questions for a qualified provider. It does not replace medical advice.
        </GuideCallout>
      </div>
    </GuideLayout>
  );
}
