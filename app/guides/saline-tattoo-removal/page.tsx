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
    "Saline Tattoo Removal: How It Works, Safety, Cost & Results | RealTattooReviews",
  description:
    "How saline tattoo removal works, whether it is safe, what it costs, and which cases it handles best. Covers microblading, PMU, Li-FT, A+Ocean, Rejuvi, and Botched Ink.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides/saline-tattoo-removal",
  },
  openGraph: {
    title: "Saline Tattoo Removal: How It Works, Safety, Cost & Results",
    description:
      "How saline tattoo removal works, whether it is safe, what it costs, and which cases it handles best. Covers microblading, PMU, Li-FT, A+Ocean, Rejuvi, and Botched Ink.",
  },
};

const faqs = [
  {
    question: "What is saline tattoo removal?",
    answer:
      "Saline tattoo removal is a non-laser method that uses a high-concentration salt solution to lift tattoo pigment out of the skin through osmosis. A trained technician implants the solution into the tattooed area using a tattoo machine or manual tool. The treated area forms a scab that carries lifted pigment out of the skin when it sheds naturally. The method is most commonly used for cosmetic tattoos like microblading, powder brows, lip liner, and eyeliner.",
  },
  {
    question: "Is saline tattoo removal safe?",
    answer:
      "Yes, when performed by a trained technician using a professional-grade solution such as Li-FT, A+Ocean, Rejuvi, or Botched Ink. The main risks are scarring from overworking the skin and infection from improper aftercare. Both are manageable with proper technique and post-treatment care. It is not recommended for users who are pregnant, breastfeeding, on blood thinners or immunosuppressants, or who have active skin infections or a history of keloid scarring.",
  },
  {
    question: "Does saline tattoo removal work?",
    answer:
      "Yes. Saline removal is effective at lightening and removing cosmetic tattoos and small body tattoos. It works best on shallower pigment such as microblading and PMU. Results are progressive across sessions. Limitations include large body tattoos (saline covers a smaller area per session than laser) and very deep or multi-layered ink where internal fragmentation is more efficient.",
  },
  {
    question: "How does saline tattoo removal work?",
    answer:
      "The technician implants a hypertonic saline solution into the tattooed skin. The solution has a higher salt concentration than the surrounding tissue, which creates an osmotic pressure gradient. Water is drawn from dermal cells upward toward the more concentrated solution, and pigment particles travel with it. A scab forms and contains the lifted pigment. When the scab sheds naturally, pigment comes with it.",
  },
  {
    question: "Does saline tattoo removal hurt?",
    answer:
      "Most clients describe the sensation as similar to getting a tattoo. A tattoo machine or manual tool implants the solution into the skin, producing a similar feeling to the original application. Most practitioners apply topical numbing cream before the session. Clients generally report saline as less painful than laser.",
  },
  {
    question: "How long does saline tattoo removal take?",
    answer:
      "Most cosmetic tattoo cases take 2 to 6 sessions. Heavily saturated or older work may need up to 10. Sessions are spaced 6 to 8 weeks apart to allow full healing between treatments. A 3-session microblading removal typically spans 4 to 5 months from first session to completion.",
  },
  {
    question: "How much does saline tattoo removal cost?",
    answer:
      "Per-session pricing typically runs $100 to $350, with most sessions falling in the $150 to $250 range. Total cost for microblading removal generally runs $300 to $1,200 depending on the number of sessions needed. Lip liner and eyeliner removal typically runs $300 to $1,400 total. Saline is generally cheaper than laser for cosmetic tattoo removal. For broader pricing context see the cost guide.",
  },
  {
    question: "What is saline tattoo removal healing time?",
    answer:
      "The scab typically forms within 24 to 72 hours and sheds naturally within 7 to 14 days. Full healing between sessions takes 6 to 8 weeks. During the scab phase, the area should be kept dry and the scab must not be picked, peeled, or pulled — premature removal of the scab reduces results and increases scarring risk.",
  },
  {
    question: "Is saline better than laser for microblading removal?",
    answer:
      "For microblading and other cosmetic tattoos containing iron-oxide or titanium-dioxide pigments, saline is generally the lower-risk starting point. Laser can cause paradoxical darkening of iron-oxide pigments, turning them gray or black. Saline avoids this risk entirely because it does not use light energy. See the saline vs laser comparison for the full breakdown.",
  },
  {
    question: "Can you do saline tattoo removal at home?",
    answer:
      "No. DIY saline tattoo removal using household salt or non-professional solutions is not safe and is not effective. Professional saline solutions are formulated specifically for dermal implantation. Applying salt or saline to the skin surface has no removal effect. Attempting to implant solutions without proper training risks serious scarring and infection. Always see a trained, certified technician.",
  },
];

const PAGE_PATH = "/guides/saline-tattoo-removal";
const SITE_URL = "https://realtattooreviews.com";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Consultation",
    body: "A trained technician assesses your tattoo or cosmetic tattoo. They evaluate pigment depth, saturation, color, skin type, and the age of the work. The consultation determines how many sessions are likely needed and whether saline is the right method for your case.",
  },
  {
    step: 2,
    title: "Numbing",
    body: "A topical anesthetic is applied to the treatment area. Most technicians use a lidocaine-based numbing cream. The area sits for 15 to 30 minutes before work begins.",
  },
  {
    step: 3,
    title: "Saline implantation",
    body: "The technician uses a tattoo machine or manual tool to implant the saline solution into the tattooed skin. The saline solution is hypertonic — its salt concentration is higher than the surrounding tissue — which creates the osmotic gradient needed for lift.",
  },
  {
    step: 4,
    title: "Osmotic lift",
    body: "Once implanted, osmosis draws water from the dermal cells upward toward the more concentrated solution. Pigment particles travel with the water, moving from the dermis through the epidermis.",
  },
  {
    step: 5,
    title: "Scab formation",
    body: "Over the next 24 to 72 hours, the treated area forms a controlled scab containing lifted pigment. The scab appearing dark is expected and is a sign the process is working.",
  },
  {
    step: 6,
    title: "Scab shedding",
    body: "The scab falls off naturally within 7 to 14 days. Do not pick, peel, or pull the scab. Premature removal reduces the amount of pigment that leaves with it and increases scarring risk.",
  },
  {
    step: 7,
    title: "Healing",
    body: "Full healing between sessions takes 6 to 8 weeks. The skin needs this time to fully recover before another session can safely be performed.",
  },
  {
    step: 8,
    title: "Repeat",
    body: "Most cases require 2 to 6 sessions for cosmetic tattoos. Heavily saturated or layered work may need up to 10. Each session progressively lifts more pigment.",
  },
];

export default function SalineTattooRemovalGuidePage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Guides", href: "/guides" },
    { name: "Saline Tattoo Removal", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Saline Tattoo Removal: How It Works, Safety, Cost & Results",
    description:
      "How saline tattoo removal works, whether it is safe, what it costs, and which cases it handles best.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Saline tattoo removal",
      "Microblading removal",
      "PMU removal",
      "Saline tattoo lightening",
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
              Saline Tattoo Removal
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Saline{" "}
            <span className="text-(--accent)">Tattoo Removal</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            How saline solution tattoo removal works, which cases it handles best, what it costs,
            and what to expect across the healing process.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* What is saline tattoo removal */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Saline tattoo removal is a non-laser method that uses a salt-based solution to
                  lift tattoo pigment out of the skin. A trained technician implants a
                  high-concentration saline solution into the tattooed area using a tattoo machine
                  or manual tool. The solution creates an osmotic gradient. Water and pigment are
                  drawn upward from the dermis through the epidermis. The area forms a controlled
                  scab. When the scab falls off naturally, lifted pigment comes with it.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  Saline removal is most commonly used on cosmetic tattoos: microblading, powder
                  brows, lip liner, eyeliner, and other permanent makeup (PMU). It is also used on
                  small body tattoos, typically two square inches or less. The method is sometimes
                  called saline tattoo lightening because full removal takes multiple sessions and
                  the visible result after each session is progressive lightening.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  Products like Li-FT, A+Ocean, Rejuvi, and Botched Ink have established
                  themselves as the most widely used professional saline removal brands. Each has
                  a slightly different formulation but the core mechanism is the same: saline
                  solution, osmotic lift, scab formation, pigment removal. For the head-to-head
                  comparison with laser, see the{" "}
                  <Link
                    href="/comparisons/saline-vs-laser-tattoo-removal"
                    className="text-(--accent) hover:underline"
                  >
                    saline vs laser tattoo removal comparison
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* How the process works */}
            <GuideSection heading="How the Saline Removal Process Works">
              <div className="space-y-3">
                {PROCESS_STEPS.map((s) => (
                  <div
                    key={s.step}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5 flex gap-4"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-(--accent) text-white text-[11px] font-bold shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-sans text-[14px] font-semibold text-(--ink) mb-1">
                        {s.title}
                      </p>
                      <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Is it safe */}
            <GuideSection heading="Is Saline Tattoo Removal Safe?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline tattoo removal is considered safe when performed by a trained technician
                using a professional-grade solution. The saline solutions used in professional
                removal (Li-FT, A+Ocean, Rejuvi, Botched Ink) are formulated with purified water,
                salt, and natural additives. They are designed specifically for dermal implantation
                at safe concentrations.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline tattoo removal is not recommended for users who:
              </p>
              <GuideBulletList
                variant="warning"
                items={[
                  "Are pregnant or breastfeeding",
                  "Have active skin infections in or near the treatment area",
                  "Are on blood thinners or immunosuppressant medications",
                  "Have a history of keloid scarring",
                  "Have uncontrolled diabetes",
                ]}
              />
              <GuideCallout label="Practitioner quality">
                The biggest safety variable is the technician. Always verify training
                certification, ask to see documented before-and-after results, and confirm the
                brand of solution being used. A+Ocean, Li-FT, Botched Ink, and Rejuvi are all
                professional-grade products. Household salt or unlicensed solutions are unsafe and
                ineffective.
              </GuideCallout>
            </GuideSection>

            {/* Side effects */}
            <GuideSection heading="Common Side Effects and Risks">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2 uppercase tracking-wider">
                    Expected (common)
                  </p>
                  <GuideBulletList
                    items={[
                      "Redness and swelling in the first 24 to 48 hours",
                      "Dark scab formation — expected and desired",
                      "Mild tenderness during healing",
                      "Temporary hyperpigmentation or hypopigmentation that typically resolves",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2 uppercase tracking-wider">
                    Less common (avoidable)
                  </p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Scarring from overworking the skin or picking scabs",
                      "Infection from poor aftercare or unclean tools",
                      "Incomplete removal from sessions spaced too close together",
                      "Allergic reaction to the saline solution (rare)",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            {/* Scarring */}
            <GuideSection heading="Saline Tattoo Removal Scarring: What to Know">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Scarring risk is low with proper technique and aftercare. Most scarring from
                saline removal is practitioner-caused or client-caused, not method-caused.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Causes of scarring",
                    body: "Overworking the skin during the session (too many passes, going too deep), picking or peeling the scab before it falls off naturally, and booking sessions too close together before the skin has fully healed.",
                  },
                  {
                    title: "How to minimize risk",
                    body: "Choose a conservative technician who does not overwork the skin in a single session. Follow aftercare instructions strictly — no picking, no sun, keep the area dry. Wait the full 6 to 8 weeks between sessions. Do not rush the process.",
                  },
                  {
                    title: "No thermal scarring risk",
                    body: "Saline removal does not use heat or light energy. Thermal scarring — the risk category associated with aggressive laser settings — is not a saline removal risk. This is one structural advantage saline has over laser modalities for skin-sensitive users.",
                  },
                ].map((item) => (
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
                See the{" "}
                <Link
                  href="/guides/tattoo-removal-scarring"
                  className="text-(--accent) hover:underline"
                >
                  tattoo removal scarring guide
                </Link>{" "}
                for a full method comparison on scarring risk.
              </p>
            </GuideSection>

            {/* Microblading and PMU */}
            <GuideSection heading="Saline Removal for Microblading and Cosmetic Tattoos">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline removal for microblading is the most common use case. Cosmetic tattoo
                pigments have characteristics that make them a better fit for saline than for laser.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Iron oxide pigment safety",
                    body: "Most PMU pigments contain iron oxides. Under laser energy, iron oxide can oxidize and darken — a phenomenon called paradoxical darkening. The treated area turns gray or black instead of fading. Saline does not use light, so no oxidation occurs. Iron oxide pigment lifts out intact through osmosis.",
                  },
                  {
                    title: "Titanium dioxide pigment safety",
                    body: "Many PMU pigments also contain titanium dioxide as a white base or brightening agent. Laser energy can cause titanium dioxide to turn dark on contact. Saline avoids this entirely. Titanium dioxide lifts out along with other pigment particles through the osmotic mechanism.",
                  },
                  {
                    title: "Shallow pigment depth",
                    body: "Cosmetic tattoos are generally implanted at a shallower depth than body tattoos. Saline's osmotic lift is most effective on shallower pigment. This makes PMU and microblading ideal candidates for saline removal.",
                  },
                  {
                    title: "Coverage across brow and PMU types",
                    body: "Saline eyebrow tattoo removal works across all brow styles: microblading strokes, powder brows, combination brows, and older faded brow tattoos. Most eyebrow cases complete in 2 to 4 sessions. Lip liner, lip blush, and eyeliner cases also respond well to saline removal.",
                  },
                ].map((item) => (
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

            {/* Before and after */}
            <GuideSection heading="Saline Tattoo Removal Before and After">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Results from saline tattoo removal are progressive across sessions. Understanding
                what to expect at each stage helps set realistic expectations.
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "During the scab phase (days 1–14)",
                    body: "The treated area will look darker while the scab is sitting. This is normal. The scab contains concentrated lifted pigment and will appear more saturated than the original tattoo. Do not be alarmed — this is how the process works.",
                  },
                  {
                    label: "After session 1 scab sheds",
                    body: "Once the scab falls off naturally, the underlying skin will be noticeably lighter than before the session. The degree of lightening varies by pigment saturation, depth, and age.",
                  },
                  {
                    label: "Sessions 2 to 3",
                    body: "Cumulative lightening becomes clearly visible. Many microblading cases show 50 to 70 percent reduction in pigment visibility by the third session.",
                  },
                  {
                    label: "Sessions 4 to 6",
                    body: "Many cosmetic tattoos are fully removed or ready for color correction at this point. Heavily saturated or layered work may need additional sessions. The area may show temporary hypopigmentation (lighter skin) that typically normalizes over months.",
                  },
                ].map((item) => (
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
                For visual reference across methods and case types, see the{" "}
                <Link href="/before-and-after" className="text-(--accent) hover:underline">
                  before-and-after gallery
                </Link>
                .
              </p>
            </GuideSection>

            {/* Cost */}
            <GuideSection heading="Saline Tattoo Removal Cost">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline tattoo removal is generally cheaper per session than laser, and cheaper
                in total for most cosmetic tattoo cases because fewer sessions are needed.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Per session (typical)", price: "$100 – $350 (most: $150 – $250)" },
                  { label: "Microblading removal (total)", price: "$300 – $1,200" },
                  { label: "Lip liner removal (total)", price: "$300 – $1,000" },
                  { label: "Eyeliner removal (total)", price: "$400 – $1,400" },
                  { label: "Small body tattoo (total)", price: "$450 – $1,800" },
                ].map((tier) => (
                  <div
                    key={tier.label}
                    className="flex items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-5 py-4"
                  >
                    <p className="font-sans text-[14px] text-(--muted) m-0">{tier.label}</p>
                    <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 ml-4 shrink-0">
                      {tier.price}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Pricing varies by provider, location, and tattoo size. Most saline practitioners
                offer free consultations where session-count estimates and total cost quotes are
                provided. For national pricing context across all methods, see the{" "}
                <Link href="/cost" className="text-(--accent) hover:underline">
                  cost guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* Aftercare and healing */}
            <GuideSection heading="Saline Tattoo Removal Aftercare and Healing">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Aftercare directly affects both the result of each session and the risk of
                scarring. The scab is the vehicle for pigment removal — protecting it is the
                most important aftercare task.
              </p>
              <div className="space-y-3">
                {[
                  {
                    phase: "First 24 to 48 hours",
                    instructions: [
                      "Keep the area clean and dry",
                      "Do not apply makeup, sunscreen, or skincare products to the treated area",
                      "Avoid touching or rubbing the area",
                    ],
                  },
                  {
                    phase: "Scab phase (days 3 to 14)",
                    instructions: [
                      "Do not pick, peel, or pull the scab — this is critical",
                      "Apply only the aftercare product recommended by your technician",
                      "Avoid sun exposure, swimming, saunas, and sweating",
                      "Keep the area dry where possible",
                    ],
                  },
                  {
                    phase: "Post-scab (weeks 3 to 8)",
                    instructions: [
                      "Moisturize gently once the skin has fully closed",
                      "Continue to avoid direct sun exposure on the treated area",
                      "Wait the full 6 to 8 weeks before your next session",
                      "Do not book follow-up sessions before full healing is confirmed",
                    ],
                  },
                ].map((phase) => (
                  <div
                    key={phase.phase}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-2 text-[13px] font-semibold uppercase tracking-wider text-(--muted)">
                      {phase.phase}
                    </p>
                    <GuideBulletList items={phase.instructions} />
                  </div>
                ))}
              </div>
              <GuideCallout label="Total timeline">
                A 3-session microblading removal, spaced 6 to 8 weeks apart, takes roughly 4 to 5
                months from first session to completion.
              </GuideCallout>
            </GuideSection>

            {/* Does it work */}
            <GuideSection heading="Does Saline Tattoo Removal Work?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Yes. Saline tattoo removal is an effective, established method with documented
                results. It is not a fringe technique. Products like Li-FT (Li Pigments), A+Ocean,
                Botched Ink, and Rejuvi are used by trained PMU professionals worldwide.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Works well on</p>
                  <GuideBulletList
                    items={[
                      "Microblading and powder brow removal",
                      "Lip liner, lip blush, and full lip color",
                      "Eyeliner tattoo removal",
                      "Small body tattoos (roughly 2 sq in or less)",
                      "Cases where prior laser treatment caused paradoxical darkening",
                      "Cosmetic tattoos with iron oxide or titanium dioxide pigments",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Limitations</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Large body tattoos (saline covers a small area per session)",
                      "Deep or multi-layered ink where internal fragmentation is more efficient",
                      "Cases where speed of coverage across a large surface area is the priority",
                      "Very full, heavily saturated lip color in sensitive tissue (requires extra care)",
                    ]}
                  />
                </div>
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Note on Rejuvi: Rejuvi tattoo removal uses a chemical extraction mechanism rather
                than pure osmotic lift. The healing scab (sometimes called eschar in clinical
                literature) is still the vehicle for pigment removal, but the formulation and
                mechanism differ from saline-only products. Ask your technician which product they
                use and how it works.
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                This guide is based on product documentation (Li-FT, A+Ocean, Rejuvi, Botched Ink),
                PMU industry training materials, and published dermatology literature including
                PMC4928479 (JCAD 2016). Iron-oxide paradoxical darkening under laser is documented
                in dermatology consensus literature. inkOUT, a current advertising client of
                RealTattooReviews, is not promoted on this page. This guide covers saline removal
                as a standalone method. See our{" "}
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
                  desc: "Full head-to-head comparison across PMU, microblading, dark skin, scarring risk, and cost.",
                },
                {
                  href: "/categories/microblading-removal",
                  title: "Microblading Removal",
                  desc: "Category page covering microblading and PMU removal options, provider fit, and session expectations.",
                },
                {
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "Scarring risk by method, skin type, and provider — and what to do if scarring occurs.",
                },
                {
                  href: "/cost",
                  title: "Tattoo Removal Cost",
                  desc: "National pricing breakdown by method, size, and provider type.",
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
