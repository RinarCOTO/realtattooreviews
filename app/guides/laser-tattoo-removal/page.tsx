/*
 * Static guide page. Lives at /guides/laser-tattoo-removal.
 * Static segments win over the [slug] dynamic route, so this file owns the URL.
 *
 * Editorial note: copy below is v1 scaffold. Run through the 9-step RTR content
 * workflow before public launch (claims verification against source tiers, em
 * dash audit, AI readiness check). All factual claims here are standard
 * dermatology consensus around photoacoustic laser removal but should be
 * citation-backed in Step 6 of the workflow.
 */

import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";

const PAGE_PATH = "/guides/laser-tattoo-removal";
const SITE_URL = "https://realtattooreviews.com";

export const metadata: Metadata = {
  title: "Laser Tattoo Removal: How It Works, Sessions, Cost, and Outcomes",
  description:
    "Plain-English guide to laser tattoo removal. How the photoacoustic mechanism breaks ink, how Q-switched and picosecond lasers differ, how many sessions to expect, and which ink colors and skin tones respond best.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Laser Tattoo Removal: How It Works, Sessions, Cost, and Outcomes",
    description:
      "How laser tattoo removal actually works, what affects outcomes, and how to evaluate a provider before booking.",
  },
};

const faqs = [
  {
    question: "How does laser tattoo removal actually work?",
    answer:
      "A laser delivers ultrashort pulses of light at wavelengths that ink particles absorb. The light energy converts to a rapid pressure wave (the photoacoustic effect) that shatters ink into smaller fragments. Over the following weeks, the immune system clears those fragments through the lymphatic system. Each session removes a portion of the ink. Total clearance happens over multiple sessions because the body can only process so much fragmented ink at once.",
  },
  {
    question: "How many laser sessions does it take to remove a tattoo?",
    answer:
      "Most professional tattoos take 6 to 12 sessions for substantial clearance. Amateur or stick-and-poke tattoos often clear in 3 to 6 sessions. Sessions are typically spaced 6 to 8 weeks apart to allow the skin to heal and the lymphatic system to clear fragmented ink. Total treatment time usually runs 12 to 24 months. Color, density, age, location on the body, and skin tone all change the count.",
  },
  {
    question: "What is the difference between Q-switched and picosecond lasers?",
    answer:
      "Both are nanosecond-class pulse technologies, but picosecond pulses are roughly a thousand times shorter than Q-switched (nanosecond) pulses. Shorter pulses produce a stronger photoacoustic shockwave per unit of thermal energy, which fragments ink more efficiently and tends to need fewer sessions for similar clearance. Picosecond systems also generally show better outcomes on stubborn ink colors and a slightly lower side-effect profile in skilled hands. Q-switched lasers still work and remain widely used.",
  },
  {
    question: "Does laser tattoo removal work on all ink colors?",
    answer:
      "Black ink is the easiest to clear at standard near-infrared wavelengths (1064nm). Dark blues, browns, and reds respond well at the right wavelength. Greens and light blues need a different wavelength (typically 755nm). Yellows, oranges, and white inks remain the hardest to remove and may not fully clear. Multi-wavelength platforms or providers with multiple devices give the best chance of complete clearance for a multi-color tattoo.",
  },
  {
    question: "Is laser tattoo removal safe for darker skin?",
    answer:
      "Yes, when the right wavelength and protocol are used. The 1064nm Nd:YAG wavelength has lower absorption in melanin and is the preferred option for Fitzpatrick IV through VI skin types. Risk of pigment changes (hypopigmentation or hyperpigmentation) increases when shorter wavelengths are used on darker skin or when fluence settings are too aggressive. Provider experience with darker skin tones matters more than which device they own.",
  },
  {
    question: "When is laser the wrong choice?",
    answer:
      "Laser is generally not first-line for permanent makeup or microblading because of the risk of paradoxical ink darkening (titanium dioxide and iron oxide pigments can oxidize on contact with laser energy). Saline removal or non-laser mechanical methods are usually safer for cosmetic ink. Patients prone to keloid scarring or with active skin conditions in the treatment area may also be steered toward alternatives.",
  },
];

export default function LaserTattooRemovalGuidePage() {
  return (
    <GuideLayout
      breadcrumb="Laser Tattoo Removal"
      h1="Laser Tattoo Removal"
      description="The dominant tattoo removal method in 2026. Here is how it works, what affects outcomes, how many sessions to expect, and how to evaluate a provider before you book."
      faqs={faqs}
      path={PAGE_PATH}
    >
      <GuideSection heading="How laser tattoo removal works">
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Laser tattoo removal uses a series of very short, very intense pulses of light at wavelengths that the tattoo ink absorbs. Each pulse delivers enough energy to heat the ink particle for a fraction of a billionth of a second, but not long enough to heat the surrounding skin. That sudden temperature spike creates a microscopic pressure wave inside the ink particle (the photoacoustic effect), which fragments it into smaller pieces.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          The fragments are then carried away by the lymphatic system over the following weeks. The tattoo fades because there is less ink left in the dermis, not because the ink has been bleached or burned out. This is why laser removal happens over many sessions: the body can only clear so much fragmented ink at a time, and each session adds incremental clearance.
        </p>
        <GuideCallout label="In one line">
          Laser does not erase ink. It shatters ink into pieces small enough for the body to remove on its own.
        </GuideCallout>
      </GuideSection>

      <GuideSection heading="Q-switched vs. picosecond lasers">
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Two generations of pulse technology dominate the market today. Both create the photoacoustic effect that fragments ink. The difference is pulse duration, and the practical consequence is how efficiently each pulse breaks ink down.
        </p>
        <GuideTable
          headers={["", "Q-switched", "Picosecond"]}
          rows={[
            ["Pulse duration", "Nanoseconds (10⁻⁹ sec)", "Picoseconds (10⁻¹² sec)"],
            ["Photoacoustic strength", "Effective", "Stronger per pulse"],
            ["Typical session count", "8 to 15 for pro tattoos", "6 to 10 for pro tattoos"],
            ["Stubborn ink colors", "Slower clearance", "Generally better"],
            ["Common devices", "RevLite, MedLite, Astanza Trinity", "PicoWay, PicoSure, PicoPlus, Discovery Pico"],
          ]}
          winners={[null, null, null, null, null]}
        />
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Picosecond is not always required. Many Q-switched providers produce excellent results, especially on standard black ink. The most reliable signal is operator skill and protocol fit, not which generation of device the clinic owns.
        </p>
        <p className="font-sans text-[14px] leading-relaxed text-(--muted)">
          See also:{" "}
          <Link href="/comparisons/picoway-vs-q-switch" className="text-(--accent) hover:underline">
            PicoWay vs. Q-Switch
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection heading="Wavelengths and ink color">
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Different ink colors absorb different wavelengths. A clinic using a single-wavelength laser cannot fully clear a multi-color tattoo. The most common wavelengths in tattoo removal practice:
        </p>
        <ul className="space-y-2 m-0 p-0 list-none">
          <li className="flex items-start gap-2.5 font-sans text-[14px] leading-snug text-(--muted)">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
            <span><span className="font-semibold text-(--ink)">1064nm Nd:YAG.</span> Black, dark brown, dark blue. Lower melanin absorption makes it the safer baseline wavelength for Fitzpatrick IV through VI skin tones.</span>
          </li>
          <li className="flex items-start gap-2.5 font-sans text-[14px] leading-snug text-(--muted)">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
            <span><span className="font-semibold text-(--ink)">532nm KTP (frequency-doubled).</span> Red, orange, and warm yellow ink. Higher melanin absorption means more caution required on medium and darker skin.</span>
          </li>
          <li className="flex items-start gap-2.5 font-sans text-[14px] leading-snug text-(--muted)">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
            <span><span className="font-semibold text-(--ink)">755nm alexandrite.</span> Green, light blue, and certain teal pigments. Some absorption in melanin, so still requires careful settings on darker skin.</span>
          </li>
          <li className="flex items-start gap-2.5 font-sans text-[14px] leading-snug text-(--muted)">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
            <span><span className="font-semibold text-(--ink)">694nm ruby.</span> Older platform, still effective on green and dark blue. Less common today.</span>
          </li>
        </ul>
        <GuideCallout label="Ask the clinic">
          Which wavelengths the device offers, and which handpieces are on-site. Multi-wavelength coverage matters more for multi-color tattoos than for solid black work.
        </GuideCallout>
      </GuideSection>

      <GuideSection heading="What affects how many sessions you need">
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          The same tattoo on two patients can take a different number of sessions because removal depends on more than the device. The variables that move the count up or down:
        </p>
        <GuideBulletList
          items={[
            "Ink color and saturation. Solid black on a single layer clears fastest.",
            "Tattoo age. Older ink fades and migrates over time, so older tattoos often respond faster than fresh ones.",
            "Ink depth and layering. Thick or layered ink (cover-ups, touch-ups) takes more sessions.",
            "Location on the body. Areas with strong lymphatic drainage (chest, shoulders, upper back) clear faster than extremities (hands, feet, lower legs).",
            "Skin type (Fitzpatrick scale). Lighter skin tolerates more aggressive settings safely.",
            "General health and immune function. Smoking, autoimmune conditions, and poor sleep slow clearance.",
            "Aftercare compliance. Sun exposure, picking, or skipping wound care between sessions all reduce final outcomes.",
          ]}
        />
      </GuideSection>

      <GuideSection heading="Session pacing and what to expect each visit">
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Sessions are typically spaced 6 to 8 weeks apart. The interval is not arbitrary. The body needs time to clear the fragmented ink from the previous session, and the skin needs time to heal fully before another round of trauma. Going faster than 6 weeks generally raises the risk of side effects without speeding up the timeline.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          A typical session lasts 5 to 30 minutes depending on tattoo size. Patients usually describe the sensation as a hot rubber-band snap, repeated rapidly. Most clinics offer topical numbing or, for larger pieces, a Zimmer cooling air device. Immediately after the pulse, the area frosts white (a normal reaction as the ink fragments expand under the skin). Frosting fades within 20 to 60 minutes.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Cost-wise, expect to budget for the full course, not the first session. Many clinics quote per session or in packages. See the{" "}
          <Link href="/cost" className="text-(--accent) hover:underline">
            cost guide
          </Link>{" "}
          for typical pricing ranges.
        </p>
      </GuideSection>

      <GuideSection heading="Side effects, healing, and aftercare">
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Most patients experience mild swelling, redness, and pinpoint bleeding immediately after a session. Blistering and scabbing are common over the first 1 to 2 weeks and are part of normal healing. Hypopigmentation (skin lightening) and hyperpigmentation (darkening) can occur, especially on medium and darker skin tones, and are usually temporary.
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          Scarring is uncommon when sessions are spaced correctly and aftercare is followed. The strongest predictors of scarring are over-aggressive settings, sessions spaced too close together, and picking at scabs.
        </p>
        <p className="font-sans text-[14px] leading-relaxed text-(--muted)">
          Detail in:{" "}
          <Link href="/guides/tattoo-removal-side-effects" className="text-(--accent) hover:underline">
            Tattoo Removal Side Effects
          </Link>
          ,{" "}
          <Link href="/guides/tattoo-removal-healing-process" className="text-(--accent) hover:underline">
            Healing Process
          </Link>
          ,{" "}
          <Link href="/guides/tattoo-removal-aftercare" className="text-(--accent) hover:underline">
            Aftercare
          </Link>
          ,{" "}
          <Link href="/guides/tattoo-removal-scarring" className="text-(--accent) hover:underline">
            Scarring
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection heading="Who laser is a good fit for">
        <GuideBulletList
          items={[
            "Standard black or dark-ink tattoos on lighter skin tones (Fitzpatrick I to III).",
            "Patients comfortable with a 12 to 24 month timeline.",
            "Healthy patients without active skin conditions in the treatment area.",
            "Multi-color tattoos when the provider has multi-wavelength coverage.",
            "Cover-up prep (partial fading to allow a new tattoo over the old one) where session count can be lower.",
          ]}
        />
      </GuideSection>

      <GuideSection heading="When laser may not be the right choice">
        <GuideBulletList
          variant="warning"
          items={[
            "Permanent makeup and microblading. Laser energy can darken titanium dioxide and iron oxide pigments through paradoxical oxidation. Saline or non-laser mechanical methods are usually safer.",
            "Some color inks (white, beige, light pink) often resist laser fragmentation entirely.",
            "Patients with a history of keloid scarring, particularly in the treatment area.",
            "Active eczema, psoriasis, or recent sunburn in the treatment area.",
          ]}
        />
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          If laser is the right fit, see provider reviews for{" "}
          <Link href="/reviews/laseraway" className="text-(--accent) hover:underline">
            LaserAway
          </Link>
          ,{" "}
          <Link href="/reviews/removery" className="text-(--accent) hover:underline">
            Removery
          </Link>
          , and{" "}
          <Link href="/reviews/medermis-laser-clinic" className="text-(--accent) hover:underline">
            MEDermis Laser Clinic
          </Link>
          , or browse the full{" "}
          <Link href="/providers" className="text-(--accent) hover:underline">
            provider directory
          </Link>
          .
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
          If laser is not the fit, the alternatives are covered in the{" "}
          <Link href="/guides/saline-tattoo-removal" className="text-(--accent) hover:underline">
            saline guide
          </Link>
          ,{" "}
          <Link href="/comparisons/saline-vs-laser-tattoo-removal" className="text-(--accent) hover:underline">
            saline vs. laser
          </Link>
          , and the{" "}
          <Link href="/comparisons/best-tattoo-removal-method" className="text-(--accent) hover:underline">
            best method overview
          </Link>
          .
        </p>
      </GuideSection>

      <GuideSection heading="How to evaluate a laser provider before booking">
        <GuideBulletList
          items={[
            "Confirm device type (Q-switched vs picosecond) and the wavelengths offered. Ask which handpieces are on-site, not just listed on the website.",
            "Ask how the clinic adjusts settings for your skin type. Generic answers are a yellow flag.",
            "Ask for before-and-after photos of patients with similar tattoos and skin tones, not just bestcase examples.",
            "Get a written estimate of total session count and total cost, not just per-session pricing.",
            "Confirm the spacing protocol. Anything closer than 5 weeks between sessions is non-standard and worth questioning.",
            "Read review patterns, not isolated reviews. Look at the negative-first signals on the provider page.",
          ]}
        />
      </GuideSection>

      <GuideRelatedLinks
        links={[
          {
            href: "/comparisons/picoway-vs-q-switch",
            title: "PicoWay vs. Q-Switch",
            desc: "How the two main laser generations differ in practice.",
          },
          {
            href: "/comparisons/saline-vs-laser-tattoo-removal",
            title: "Saline vs. Laser",
            desc: "When non-laser saline removal is the better fit.",
          },
          {
            href: "/comparisons/best-tattoo-removal-method",
            title: "Best Tattoo Removal Method",
            desc: "Full method overview: laser, non-laser, saline, surgical.",
          },
          {
            href: "/cost",
            title: "Tattoo Removal Cost Guide",
            desc: "Typical session pricing and total treatment cost ranges.",
          },
          {
            href: "/guides/tattoo-removal-aftercare",
            title: "Aftercare",
            desc: "What to do between sessions to protect outcomes.",
          },
        ]}
      />
    </GuideLayout>
  );
}
