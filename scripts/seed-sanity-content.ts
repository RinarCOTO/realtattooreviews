/**
 * scripts/seed-sanity-content.ts
 *
 * One-time seeding script: populates Sanity documents from hardcoded Next.js
 * fallback content. Idempotent — safe to run multiple times without duplicating
 * data. Existing documents are replaced in-place; missing ones are created with
 * deterministic IDs.
 *
 * Run with:
 *   npx tsx scripts/seed-sanity-content.ts
 *
 * Requires a write token in .env.local:
 *   SANITY_WRITE_TOKEN=sk...  (create one at sanity.io > project > API > Tokens)
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@sanity/client";

// ── Load .env.local without requiring the dotenv package ─────────────────────
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([^#=][^=]*)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, "");
    });
}

// ── Sanity client (needs a write token, not the read-only token) ─────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Portable-text helpers ─────────────────────────────────────────────────────
let _kc = 0;
const k = () => `k${++_kc}`;

function block(text: string) {
  return {
    _type: "block" as const,
    _key: k(),
    style: "normal",
    markDefs: [] as unknown[],
    children: [{ _type: "span" as const, _key: k(), text, marks: [] as string[] }],
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════

const homepageContent = {
  _type: "homepage",
  heroHeadline: "Compare Tattoo Removal Clinics Before You Book",
  heroSubheadline: [
    block(
      "Read real reviews, compare clear ratings, and explore provider and city pages built to help you choose with more confidence."
    ),
  ],
  howItWorksSteps: [
    {
      _type: "object",
      _key: k(),
      stepNumber: "01",
      title: "We collect public Google reviews",
      body: [block("We gather publicly available reviews across the tattoo removal providers and locations we track.")],
    },
    {
      _type: "object",
      _key: k(),
      stepNumber: "02",
      title: "We tag the patterns that matter",
      body: [block("Each review is structured around signals like pain, healing, scarring, staff experience, pricing, and complaints.")],
    },
    {
      _type: "object",
      _key: k(),
      stepNumber: "03",
      title: "You compare before you book",
      body: [block("See ratings, read review excerpts, and compare providers side by side with more context.")],
    },
  ],
  faqItems: [
    {
      _type: "object",
      _key: k(),
      question: "How are reviews collected?",
      answer: [block("We source reviews from public Google Business Profile listings for every provider and location we track. We do not accept reviews submitted directly to us. We do not use provider-owned testimonials.")],
    },
    {
      _type: "object",
      _key: k(),
      question: "Does RealTattooReviews accept payment from providers?",
      answer: [block("No. We are not affiliated with any tattoo removal provider and do not accept payment for coverage, placement, or ratings. All reviews reflect independent findings.")],
    },
    {
      _type: "object",
      _key: k(),
      question: "How are provider ratings calculated?",
      answer: [block("Ratings are based on a scored methodology covering result outcomes, session consistency, pricing transparency, and patient communication. The full scoring model is published on our methodology page.")],
    },
    {
      _type: "object",
      _key: k(),
      question: "Why do some providers have low ratings?",
      answer: [block("We publish findings as they are, including negative ones. A low rating reflects consistent patterns across multiple reviews, not a single complaint. We do not suppress unfavorable results.")],
    },
    {
      _type: "object",
      _key: k(),
      question: "How often is coverage updated?",
      answer: [block("Provider pages and ratings are reviewed on a rolling basis as new reviews are submitted. The last update date is shown on each provider page.")],
    },
  ],
  seoTitle: "RealTattooReviews: Compare Tattoo Removal Clinics Before You Book",
  seoDescription:
    "848 sourced reviews across 22 tattoo removal providers in 6 markets. Compare clinics by rating, city, ink type, and outcome before you book.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. GUIDES
// Content source: deleted static pages (recovered from transcripts) +
//   lib/mock-data/guides.ts for title/description/slug
// Body left blank intentionally — editors fill in via Studio rich-text editor.
// ═══════════════════════════════════════════════════════════════════════════════

const guideSeeds = [
  {
    slug: "saline-tattoo-removal",
    title: "Saline Tattoo Removal",
    description:
      "How saline removal works, which use cases it suits, and how it compares to laser in terms of outcomes, cost, and healing time.",
    author: "RealTattooReviews",
    seoTitle: "Saline Tattoo Removal | RealTattooReviews",
    seoDescription:
      "Learn how saline tattoo removal works, including the healing process, safety, cost, session expectations, and which tattoos and skin types it suits best.",
    faqItems: [
      {
        question: "What is saline tattoo removal?",
        answer:
          "Saline tattoo removal is a non-laser method that uses a highly concentrated salt solution to draw ink out of the skin through osmosis. The solution is applied to the dermis, draws fluid and ink toward the surface, and the ink lifts out as a scab forms and heals over 2 to 4 weeks per session.",
      },
      {
        question: "Is saline tattoo removal safe?",
        answer:
          "Yes, when performed by a trained technician using appropriate solutions. It is safe across skin types including darker tones where laser carries documented hypopigmentation risk. Main risks include scarring from disturbed scabs and elevated risk for patients with keloid history.",
      },
      {
        question: "Does saline tattoo removal work?",
        answer:
          "Yes, particularly for cosmetic tattoos (microblading, eyebrow tattooing, lip blush, eyeliner) and correction work. It works less reliably on dense, deeply saturated body tattoos where laser is typically the higher-efficiency option.",
      },
      {
        question: "How does saline tattoo removal work?",
        answer:
          "A hypertonic saline solution is worked into the dermis over the tattooed area. The high salt concentration draws fluid upward through osmosis, carrying ink particles with it. A scab forms over the following days, trapping the ink. As the scab heals and separates naturally over 2 to 4 weeks, it lifts the ink out of the skin.",
      },
      {
        question: "How long does saline tattoo removal take to heal?",
        answer:
          "Each session produces a visible scabbing phase lasting 2 to 4 weeks. Most providers recommend 6 to 10 weeks between sessions. The total treatment course for cosmetic tattoo removal typically involves 2 to 6 sessions.",
      },
      {
        question: "How much does saline tattoo removal cost?",
        answer:
          "Per-session costs typically range from 100 to 250 USD for small cosmetic tattoo areas depending on provider and location. Total cost depends on the number of sessions required.",
      },
      {
        question: "Does saline tattoo removal hurt?",
        answer:
          "Pain during application is comparable to the original tattoo or PMU session. Topical anesthetic is typically used. Post-session discomfort resembles a sunburn and typically resolves within 24 to 48 hours.",
      },
      {
        question: "Is saline better than laser for microblading removal?",
        answer:
          "For most microblading removal cases, saline is the safer default because it avoids the oxidation risk that laser carries for iron oxide and titanium dioxide pigments. Laser energy can cause cosmetic pigments to darken or change color, a reaction known as paradoxical darkening. Saline works mechanically and does not trigger this reaction.",
      },
      {
        question: "Can saline remove a full body tattoo?",
        answer:
          "Yes, but it typically requires more sessions than laser for the same tattoo and is less practical for large surface areas. It is most appropriate when laser is contraindicated, when the patient has darker skin and wants to avoid laser hypopigmentation risk, or when the tattoo is small and lightly saturated.",
      },
    ],
  },
  {
    slug: "tattoo-removal-aftercare",
    title: "Tattoo Removal Aftercare",
    description:
      "What to do between sessions to protect skin, reduce risk of scarring, and support fading. Covers sun protection, wound care, and what to avoid.",
    author: "RealTattooReviews",
    seoTitle: "Tattoo Removal Aftercare: What to Do and What to Avoid | RealTattooReviews",
    seoDescription:
      "Complete aftercare guide for tattoo removal: what to do in the first 24 hours, what to avoid, when to remove Saniderm, and warning signs to watch for.",
    faqItems: [
      {
        question: "What should I do after tattoo removal?",
        answer:
          "Keep the area clean and covered, avoid sun, do not pick blisters or scabs, and use only approved products. In the first 24 hours: leave the dressing in place, stay out of the sun, and avoid getting the area wet.",
      },
      {
        question: "What should I not do after tattoo removal?",
        answer:
          "Do not pick, scratch, or peel blisters or scabs. Do not expose to direct sunlight. Do not swim or soak. Do not apply unapproved products. Do not exercise heavily for 48 hours. Do not re-treat before the full interval.",
      },
      {
        question: "When should I remove Saniderm after tattoo removal?",
        answer:
          "Within 24 to 48 hours after laser removal. Remove slowly in the direction of hair growth. For TEPR, follow your provider's specific instructions.",
      },
      {
        question: "What cream should I use after tattoo removal?",
        answer:
          "Thin layer of petroleum-based ointment (Aquaphor) in early healing. Unscented moisturiser once blistering has settled. SPF 30 or higher on fully healed skin. Avoid fragrance, alcohol, retinol, and active ingredients during healing.",
      },
      {
        question: "When can I shower after tattoo removal?",
        answer:
          "Avoid getting the area wet for 24 hours. After that, brief showers with mild pressure are acceptable. Pat dry gently. Avoid hot water and high pressure on the treated area.",
      },
      {
        question: "When can I exercise after tattoo removal?",
        answer:
          "Light activity after 24 hours. Heavy exercise and significant sweating: avoid for 48 hours.",
      },
      {
        question: "How long does tattoo removal take to heal between sessions?",
        answer:
          "Surface healing after laser: 1 to 2 weeks. Full cellular healing: 6 to 8 weeks (the standard session interval). TEPR and saline: 2 to 4 week scabbing phase, 8 to 10 weeks between sessions for some providers.",
      },
      {
        question: "Is it normal for the area to look worse before it looks better?",
        answer:
          "Yes. Redness, swelling, and blistering are expected in the first days. With TEPR and saline, scabbing makes the area look disrupted before it heals. If the area looks worse specifically after day 3, contact your provider.",
      },
    ],
  },
  {
    slug: "tattoo-removal-healing-process",
    title: "The Tattoo Removal Healing Process",
    description:
      "A timeline of what to expect after each session: blistering, scabbing, fading, and how long full healing takes between treatments.",
    author: "RealTattooReviews",
    seoTitle: "Tattoo Removal Healing Process: Stage-by-Stage Timeline | RealTattooReviews",
    seoDescription:
      "What to expect during tattoo removal healing: blistering, scabbing, fading timelines, and how healing differs between laser, TEPR, and saline methods.",
    faqItems: [
      {
        question: "How long does tattoo removal take to heal?",
        answer:
          "Surface healing after laser typically settles within 1 to 2 weeks per session. Full cellular recovery takes 6 to 8 weeks. TEPR and saline have a visible 2 to 4 week scabbing phase per session, with full recovery taking 6 to 10 weeks. The full treatment course takes 10 to 15 months for TEPR and 18 to 36 months or more for laser.",
      },
      {
        question: "What does tattoo removal healing look like?",
        answer:
          "In the first 72 hours: redness, warmth, swelling, and possibly frosting or blistering with laser. Over the following 2 weeks: blisters drain or rupture, scabs form and begin to separate. Weeks 2 to 4: peeling, flaking, itching, and gradual improvement. By weeks 4 to 8: the skin looks settled at the surface even as the immune system continues clearing ink beneath.",
      },
      {
        question: "How long does laser tattoo removal take to heal?",
        answer:
          "Visible surface healing settles within 1 to 2 weeks for most patients. Full cellular healing, including immune system clearing of fragmented ink, takes 6 to 8 weeks. This is why providers recommend that interval between sessions.",
      },
      {
        question: "Is redness after tattoo removal normal?",
        answer:
          "Yes. Redness is a normal inflammatory response in the first days after treatment. It should decrease day by day after the first 72 hours. Redness that increases after day 3 or persists unchanged past 2 weeks is worth discussing with your provider.",
      },
      {
        question: "How long does blistering last after tattoo removal?",
        answer:
          "Blisters from laser treatment typically develop within 24 hours and drain or rupture naturally within 1 to 2 weeks. Do not pop them. Once they open, keep the area clean and protected.",
      },
      {
        question: "What is frosting during tattoo removal?",
        answer:
          "Frosting is a temporary white discoloration that appears immediately after laser pulses. It results from rapid heating of ink particles releasing carbon dioxide gas in the skin. It typically fades within 20 to 30 minutes and is a normal treatment response, not a sign of a burn or complication.",
      },
      {
        question: "Why is my tattoo not fading between sessions?",
        answer:
          "Ink clearance is driven by the immune system and takes time. Most fading happens in the 4 to 8 week window after treatment, not immediately. If fading appears to have stalled after several sessions with appropriate spacing, discuss with your provider whether treatment parameters need adjustment.",
      },
      {
        question: "How long does tattoo removal scabbing last?",
        answer:
          "With laser, scabbing typically forms and resolves within 1 to 2 weeks. With TEPR and saline, the scabbing phase lasts 2 to 4 weeks per session. Do not interfere with scabs. They separate naturally when healing is complete.",
      },
    ],
  },
  {
    slug: "tattoo-removal-scarring",
    title: "Tattoo Removal Scarring",
    description:
      "When scarring happens, why it happens, and how to evaluate providers on their scarring track record before you book.",
    author: "RealTattooReviews",
    seoTitle:
      "Tattoo Removal Scarring: Does It Scar, What Causes It, and How to Prevent It | RealTattooReviews",
    seoDescription:
      "Learn about tattoo removal scarring, including what causes it, what normal healing looks like, how to tell the difference, and what reduces your risk before and after treatment.",
    faqItems: [
      {
        question: "Does tattoo removal leave scars?",
        answer:
          "It can, but it is not the typical outcome when treatment is performed correctly and aftercare is followed. A clinical review of 1,041 patients found hypertrophic scarring in only 0.28% of cases with Q-switched laser. Most visible skin reactions are part of normal healing and resolve over time. Risk is higher in patients with keloid history, darker skin tones undergoing laser treatment, or those who do not follow aftercare instructions.",
      },
      {
        question: "Does laser tattoo removal leave scars?",
        answer:
          "Laser tattoo removal carries a scarring risk, but it is low when performed with appropriate settings for the patient's skin type. Clinical data shows hypertrophic scarring in under 1% of properly treated cases. The documented higher-risk outcome for laser specifically is hypopigmentation in Fitzpatrick V and VI skin types, where laser energy is partially absorbed by melanin and can damage melanin-producing cells.",
      },
      {
        question: "Is blistering after tattoo removal normal?",
        answer:
          "Yes. Blistering after laser tattoo removal is a normal and expected reaction in many patients. It results from the rapid heating of ink particles and is not a sign of a burn when it occurs within the expected healing pattern. The standard guidance is to leave blisters intact where possible and allow them to drain naturally. Do not pop them, as this increases infection risk and can disrupt healing tissue underneath.",
      },
      {
        question: "What does normal healing look like after tattoo removal?",
        answer:
          "In the first 24 to 72 hours: redness, swelling, tenderness, and sometimes blistering. Over the following 1 to 2 weeks: scabbing forms and gradually separates, redness fades, and swelling resolves. Temporary lightening or darkening of the treated area is normal. Itching as new skin generates is expected. The area should look progressively better across the 6 to 8 week healing window between sessions.",
      },
      {
        question: "What causes scarring after tattoo removal?",
        answer:
          "The most significant preventable cause is incorrect technique, including settings that are too aggressive for the skin type. Patient behavior during healing also matters significantly: picking blisters, disturbing scabs, and sun exposure during healing are among the most common causes of avoidable scarring. Keloid history and darker skin tones under laser treatment carry elevated risk.",
      },
      {
        question: "How do I know if my skin is scarring?",
        answer:
          "Normal healing reactions (redness, blistering, scabbing, temporary pigment change) resolve over weeks. True scarring refers to permanent changes in skin texture or pigmentation that remain after full healing is complete. Signs worth monitoring: raised or thickened tissue that grows over weeks, texture change that remains past 3 months, pigmentation change that shows no improvement at 6 months.",
      },
      {
        question: "Can you prevent scarring from tattoo removal?",
        answer:
          "Risk can be reduced but not eliminated. The most effective prevention: choose a provider with documented experience treating your skin type, follow aftercare instructions precisely (especially not disturbing scabs or blisters), avoid sun exposure during healing, and disclose any personal or family history of keloids before treatment.",
      },
    ],
  },
  {
    slug: "tattoo-removal-side-effects",
    title: "Tattoo Removal Side Effects",
    description:
      "Honest overview of common and uncommon side effects: hypopigmentation, hyperpigmentation, blistering, and scarring risk by skin type.",
    author: "RealTattooReviews",
    seoTitle:
      "Tattoo Removal Side Effects: What Is Normal, What Is Not, and When to Call Your Provider | RealTattooReviews",
    seoDescription:
      "A complete overview of tattoo removal side effects across laser and non-laser methods. What is normal, what is not, when to be concerned, and how to reduce risk.",
    faqItems: [
      {
        question: "What are the most common side effects of tattoo removal?",
        answer:
          "Redness, swelling, and mild tenderness are the most common side effects across both laser and non-laser methods. They usually peak within 24 to 48 hours and resolve within a week. Blistering is also common after laser sessions. Frosting, the immediate white discoloration after a laser pulse, fades within 30 minutes. None of these require treatment beyond standard aftercare.",
      },
      {
        question: "Is blistering after tattoo removal normal?",
        answer:
          "Yes. Blisters are a normal reaction in many laser tattoo removal patients, particularly with Q-switched systems. They usually appear within 24 to 72 hours and contain clear or slightly pink fluid. Do not pop them. Allow them to drain naturally. Yellow or green fluid, blisters that continue to grow after 72 hours, or significant pain are signs to contact your provider.",
      },
      {
        question: "How long do tattoo removal side effects last?",
        answer:
          "Most short-term effects (redness, swelling, tenderness) resolve within 3 to 7 days. Blistering and scabbing typically clear within 7 to 14 days. Temporary pigment changes can take 3 to 6 months to normalize. Healing is generally faster on areas with strong lymphatic drainage (chest, upper back) than on the extremities.",
      },
      {
        question: "What is hyperpigmentation after tattoo removal?",
        answer:
          "Hyperpigmentation is darkening of the skin in the treated area. It is caused by the skin producing extra melanin in response to the laser pulse or non-laser trauma. It is more common in Fitzpatrick IV through VI skin types and is worsened by sun exposure during healing. Most cases resolve within 3 to 6 months. Sun avoidance and SPF 30 or higher accelerate recovery.",
      },
      {
        question: "What is hypopigmentation after tattoo removal?",
        answer:
          "Hypopigmentation is lightening of the skin in the treated area. It is caused by damage to melanin-producing cells. It is more common after aggressive laser settings and in darker skin tones treated with shorter wavelengths. Most cases resolve over 6 to 12 months. In rare cases the change is permanent. Risk is reduced by using 1064nm Nd:YAG on darker skin and by avoiding excessive fluence.",
      },
      {
        question: "When should I be worried about a tattoo removal side effect?",
        answer:
          "Contact your provider if you see signs of infection: pain that increases after 48 hours, yellow or green discharge, warmth or red streaks spreading beyond the treatment area, or fever. Persistent texture change, pigment change that has not improved by 6 months, or raised tissue that continues to grow may indicate scar formation and should be evaluated. For cosmetic tattoos (microblading, lip blush, eyeliner), darkening of the ink after a laser session requires immediate provider review.",
      },
      {
        question: "Are tattoo removal side effects different for laser and non-laser methods?",
        answer:
          "Yes. The side-effect profiles differ. Laser produces frosting, blistering, and a higher risk of pigment change in darker skin tones when shorter wavelengths are used. Non-laser saline removal produces a controlled scab as part of the removal mechanism, which means visible scabbing for 2 to 4 weeks per session. The risk of scarring is roughly comparable when both methods are performed by experienced providers with appropriate aftercare.",
      },
      {
        question: "How can I reduce side effects from tattoo removal?",
        answer:
          "Choose a provider with documented experience treating your skin type. Follow the provider's aftercare instructions precisely. Wait the full 6 to 8 weeks between sessions to allow complete healing. Avoid sun exposure on the treated area before and after each session. Stay hydrated, eat well during healing, and disclose any personal or family history of keloid scarring before treatment begins.",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 3. COMPARISONS
// Content source: lib/mock-data/comparison-pages.ts (inkout-vs-laseraway,
//   picoway-vs-q-switch). Only these two have detailed content in the codebase.
// ═══════════════════════════════════════════════════════════════════════════════

const comparisonSeeds = [
  {
    slug: "inkout-vs-laseraway",
    title: "inkOUT vs LaserAway",
    description:
      "inkOUT's non-laser TEPR method compared to LaserAway's laser approach. Review-backed comparison across outcomes, pricing, and patient experience.",
    providerA: "inkOUT",
    providerB: "LaserAway",
    verdict:
      "inkOUT is the stronger choice for darker skin tones, PMU removal, color ink, and patients who want a non-laser specialist. LaserAway suits standard dark-ink tattoos, wide location access, and patients who prefer a mainstream laser chain.",
    seoTitle: "inkOUT vs LaserAway | RealTattooReviews",
    seoDescription:
      "Compare inkOUT and LaserAway side by side, including TEPR vs PicoSure, pricing, results, pain, scarring risk, and which option fits your tattoo and skin type best.",
    tableRows: [
      {
        criteria: "Method",
        valueA: "TEPR (Trans-Epidermal Pigment Release), non-laser",
        valueB: "PicoSure picosecond laser (Cynosure)",
        whyItMatters: "Fundamentally different removal mechanisms, not two versions of the same thing.",
      },
      {
        criteria: "How it works",
        valueA: "Solution introduced into dermis creates a controlled wound. Ink bonds to healing scab and lifts out.",
        valueB: "Ultra-short laser pulses shatter ink into fragments. Body's immune system clears fragments over weeks.",
        whyItMatters: "TEPR physically draws ink out. Laser fragments it for immune clearance.",
      },
      {
        criteria: "Dark skin (Fitzpatrick V/VI)",
        valueA: "Low hypopigmentation risk. Does not interact with melanin.",
        valueB: "Moderate risk. Laser energy is partially absorbed by melanin and can damage pigment-producing cells.",
        whyItMatters: "For darker skin, inkOUT is the more conservative clinical choice.",
      },
      {
        criteria: "PMU and microblading",
        valueA: "Strong fit. No oxidation risk for iron oxide or titanium dioxide pigments.",
        valueB: "Oxidation risk. Laser can trigger paradoxical darkening with iron oxide pigments.",
        whyItMatters: "inkOUT is the safer default for cosmetic tattoo removal.",
      },
      {
        criteria: "Color ink",
        valueA: "Physical mechanism. Does not rely on ink absorbing a specific wavelength.",
        valueB: "Wavelength-dependent. Light blue, green, and yellow can resist laser removal.",
        whyItMatters: "TEPR may be more reliable per session for difficult color profiles.",
      },
      {
        criteria: "Typical sessions",
        valueA: "3 to 5 per area (complete removal)",
        valueB: "6 to 15 sessions depending on tattoo",
        whyItMatters: "Fewer sessions per course can offset comparable per-session pricing.",
      },
      {
        criteria: "Healing window",
        valueA: "Visible 2 to 4 week scabbing phase per session. The scab is the removal mechanism.",
        valueB: "Surface healing within 1 to 2 weeks. Less visible wound phase.",
        whyItMatters: "TEPR requires planning around the healing window. Session timing matters.",
      },
      {
        criteria: "Provider type",
        valueA: "Tattoo removal specialist. Singular focus.",
        valueB: "Multi-service aesthetics chain. Tattoo removal is one of many services.",
        whyItMatters: "Specialisation matters most for complex cases.",
      },
      {
        criteria: "Location footprint",
        valueA: "Select markets",
        valueB: "Broad chain footprint across the US",
        whyItMatters: "Availability depends on your location.",
      },
      {
        criteria: "Pricing model",
        valueA: "Per session or package. Fewer sessions can lower total spend.",
        valueB: "Per session or unlimited package. Flat fee reduces financial uncertainty.",
        whyItMatters: "Compare total treatment cost, not just per-session price.",
      },
    ],
    prosA: [
      "Non-laser method with consistent risk profile across skin tones",
      "No melanin interaction, lower hypopigmentation risk for darker skin",
      "No oxidation risk for PMU and cosmetic tattoo pigments",
      "Typically fewer sessions for complete removal in the right cases",
      "Specialist focus on tattoo removal",
    ],
    consA: [
      "Smaller location footprint than a national chain",
      "Visible 2 to 4 week healing window per session",
      "Not suited for very large body tattoos where wound surface area is impractical",
      "Less brand familiarity for patients used to mainstream aesthetics chains",
    ],
    prosB: [
      "Widely available locations across the US",
      "PicoSure is a capable picosecond laser technology",
      "Unlimited package pricing reduces financial risk for longer treatments",
      "Works well on black and dark body ink",
      "Familiar, accessible brand",
    ],
    consB: [
      "Documented hypopigmentation risk for Fitzpatrick V and VI skin tones",
      "Oxidation risk for PMU and iron oxide pigments",
      "Treatment-resistant colors (light blue, green, yellow) can be challenging",
      "Multi-service chain model rather than specialist focus",
      "Potentially more sessions required compared to TEPR for the right cases",
    ],
    faqItems: [
      {
        question: "Is inkOUT better than LaserAway?",
        answer:
          "Neither is universally better. inkOUT is the stronger choice for darker skin tones, PMU removal, color ink, and patients who want a non-laser specialist. LaserAway is the stronger choice for standard dark-ink tattoos, wide location access, and patients who prefer a mainstream laser chain.",
      },
      {
        question: "What laser does LaserAway use?",
        answer:
          "LaserAway uses PicoSure, a picosecond laser made by Cynosure. Picosecond lasers fire in ultra-short pulses that shatter ink particles with less thermal damage than older Q-switched nanosecond devices.",
      },
      {
        question: "Is TEPR better than PicoSure?",
        answer:
          "TEPR and PicoSure use fundamentally different mechanisms. TEPR uses precision dermabrasion to disrupt ink, which the body then expels through the skin surface. PicoSure is a laser that fragments ink into particles cleared by the immune system via the lymphatic system.",
      },
      {
        question: "Is inkOUT cheaper than LaserAway?",
        answer:
          "Per-session prices vary and neither provider is consistently cheaper at that level. The more relevant comparison is total cost across the full treatment course. TEPR typically requires fewer sessions for the right cases, which can result in lower total spend even at comparable per-session prices.",
      },
      {
        question: "How many sessions does inkOUT take vs LaserAway?",
        answer:
          "inkOUT typically requires 3 to 5 TEPR sessions for complete removal, 1 to 3 for cover-up prep, and 1 to 2 for PMU and microblading. LaserAway typically requires 6 to 15 laser sessions for the same tattoo. Session counts vary by ink density, color, skin type, and individual response.",
      },
      {
        question: "Which is better for dark skin?",
        answer:
          "inkOUT is the more conservative clinical choice for Fitzpatrick V and VI skin tones. TEPR does not use laser energy and does not interact with melanin, avoiding the documented hypopigmentation risk that laser carries for darker skin.",
      },
      {
        question: "Which is better for PMU and microblading removal?",
        answer:
          "inkOUT is the safer default for PMU and microblading. Laser energy can trigger oxidation in iron oxide and titanium dioxide pigments, causing cosmetic tattoos to darken or change color. TEPR works mechanically and does not trigger this reaction.",
      },
      {
        question: "Is LaserAway legit?",
        answer:
          "Yes. LaserAway is a legitimate multi-location aesthetics chain with a significant US footprint. PicoSure is a clinically established picosecond laser. The relevant question is not whether LaserAway is legitimate but whether its method and service model are the right fit for your specific removal case.",
      },
    ],
  },
  {
    slug: "picoway-vs-q-switch",
    title: "PicoWay vs Q-Switch Laser",
    description:
      "How PicoWay and Q-Switch lasers differ in mechanism, ink types treated, session requirements, and what patient reviews say about each.",
    providerA: "PicoWay",
    providerB: "Q-Switch",
    verdict:
      "PicoWay usually wins on difficult color, faster clearance potential, and lower heat load. Q-switch still makes sense for simpler black-ink work, price-sensitive cases, and clinics with strong operator experience.",
    seoTitle: "PicoWay vs Q-Switch Laser | Independent Comparison | RealTattooReviews",
    seoDescription:
      "Compare PicoWay and Q-switch tattoo removal lasers across ink colors, session count, heat profile, cost, and who each technology fits best.",
    tableRows: [
      {
        criteria: "Pulse speed",
        valueA: "Picosecond pulses measured in trillionths of a second.",
        valueB: "Nanosecond pulses measured in billionths of a second.",
        whyItMatters: "Shorter pulses usually mean more photoacoustic breakup and less heat spill.",
      },
      {
        criteria: "Best use case",
        valueA: "Harder removals, mixed colors, and patients trying to reduce total sessions.",
        valueB: "Straightforward black-ink work and budget-sensitive cases.",
        whyItMatters: "The more complex the tattoo, the more the pico advantage tends to matter.",
      },
      {
        criteria: "Color performance",
        valueA: "Usually stronger on stubborn blue and green when the clinic has the right wavelengths.",
        valueB: "Can struggle more on difficult colors depending on the platform and wavelength mix.",
        whyItMatters: "Color is one of the clearest reasons patients pay for pico technology.",
      },
      {
        criteria: "Black ink performance",
        valueA: "Very strong, often with faster visible clearance.",
        valueB: "Still effective for many black tattoos when treated well.",
        whyItMatters: "For simple black ink, the outcome gap can narrow a lot.",
      },
      {
        criteria: "Heat profile",
        valueA: "Typically lower thermal load and gentler surrounding-skin impact.",
        valueB: "More heat-driven, which can matter for sensitive or pigment-prone skin.",
        whyItMatters: "This is part of why pico is often preferred for tougher skin-and-ink combinations.",
      },
      {
        criteria: "Session expectations",
        valueA: "Often fewer sessions in strong candidates, but not guaranteed.",
        valueB: "Often more sessions, especially when fading plateaus or color is stubborn.",
        whyItMatters: "Do the math on total treatment cost, not just single-session price.",
      },
      {
        criteria: "Availability",
        valueA: "Less universal and more common at premium chains or specialty clinics.",
        valueB: "More widely available across older dermatology and med-spa setups.",
        whyItMatters: "Local market reality may narrow your options before performance does.",
      },
      {
        criteria: "Price",
        valueA: "Usually higher per session.",
        valueB: "Usually lower per session.",
        whyItMatters: "The cheaper device can become more expensive if it adds multiple extra sessions.",
      },
    ],
    prosA: [
      "Usually stronger on stubborn multicolor tattoos.",
      "Often better session efficiency on difficult cases.",
      "Lower heat profile can be a meaningful safety advantage.",
    ],
    consA: [
      "Higher per-session pricing is common.",
      "Not every market has a strong PicoWay operator nearby.",
      "The premium is harder to justify for easy black-ink removals.",
    ],
    prosB: [
      "More available across local markets.",
      "Often cheaper per session.",
      "Still effective for many black-ink and lower-complexity tattoos.",
    ],
    consB: [
      "Can require more sessions on harder cases.",
      "Less forgiving on difficult color combinations.",
      "Heat-heavy treatment can be a bigger concern on reactive skin.",
    ],
    faqItems: [
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
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEEDING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

async function seedHomepage() {
  const existingId = await client.fetch<string | null>(`*[_type == "homepage"][0]._id`);
  const id = existingId ?? "homepage";
  console.log(`  ${existingId ? "Replacing" : "Creating"} homepage document (id: ${id})`);
  await client.createOrReplace({ ...homepageContent, _id: id });
}

async function seedGuide(guide: typeof guideSeeds[0]) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "guide" && slug.current == $slug][0]._id`,
    { slug: guide.slug }
  );
  const id = existingId ?? `guide-${guide.slug}`;
  console.log(`  ${existingId ? "Replacing" : "Creating"} guide: ${guide.slug}`);
  await client.createOrReplace({
    _id: id,
    _type: "guide",
    title: guide.title,
    slug: { _type: "slug", current: guide.slug },
    description: guide.description,
    author: guide.author,
    seoTitle: guide.seoTitle,
    seoDescription: guide.seoDescription,
    faqItems: guide.faqItems.map((faq) => ({
      _type: "object",
      _key: k(),
      question: faq.question,
      answer: faq.answer,
    })),
  });
}

async function seedComparison(comparison: typeof comparisonSeeds[0]) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "comparison" && slug.current == $slug][0]._id`,
    { slug: comparison.slug }
  );
  const id = existingId ?? `comparison-${comparison.slug}`;
  console.log(`  ${existingId ? "Replacing" : "Creating"} comparison: ${comparison.slug}`);
  await client.createOrReplace({
    _id: id,
    _type: "comparison",
    title: comparison.title,
    slug: { _type: "slug", current: comparison.slug },
    description: comparison.description,
    providerA: comparison.providerA,
    providerB: comparison.providerB,
    verdict: comparison.verdict,
    seoTitle: comparison.seoTitle,
    seoDescription: comparison.seoDescription,
    tableRows: comparison.tableRows.map((row) => ({
      _type: "tableRow",
      _key: k(),
      criteria: row.criteria,
      valueA: row.valueA,
      valueB: row.valueB,
      whyItMatters: row.whyItMatters,
    })),
    prosA: comparison.prosA,
    consA: comparison.consA,
    prosB: comparison.prosB,
    consB: comparison.consB,
    faqItems: comparison.faqItems.map((faq) => ({
      _type: "faqItem",
      _key: k(),
      question: faq.question,
      answer: faq.answer,
    })),
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log("Sanity content seeding\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
    process.exit(1);
  }
  const token = process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN;
  if (!token) {
    console.error(
      "Error: No write token found. Add SANITY_WRITE_TOKEN to .env.local.\n" +
        "Create one at sanity.io > your project > API > Tokens (choose Editor or above)."
    );
    process.exit(1);
  }
  if (token.startsWith("sk") === false) {
    console.warn(
      "Warning: Token does not look like a Sanity write token (expected prefix: sk...).\n" +
        "If writes fail with 401, create an Editor token at sanity.io and add it as SANITY_WRITE_TOKEN."
    );
  }

  console.log("Homepage:");
  await seedHomepage();

  console.log("\nGuides (5):");
  for (const guide of guideSeeds) {
    await seedGuide(guide);
  }

  console.log("\nComparisons (2):");
  for (const comparison of comparisonSeeds) {
    await seedComparison(comparison);
  }

  console.log("\nDone. Open Sanity Studio to verify the documents.");
}

main().catch((err) => {
  console.error("\nSeeding failed:", err.message ?? err);
  process.exit(1);
});
