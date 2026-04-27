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
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title:
    "Color Tattoo Removal: Hardest Colors, Best Lasers, and Real Expectations | RealTattooReviews",
  description:
    "A color-by-color guide to removing colored tattoos. Learn which ink colors are hardest, which lasers match which pigments, and what complete removal realistically looks like.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories/color-ink-removal",
  },
  openGraph: {
    title: "Color Tattoo Removal: Hardest Colors, Best Lasers, and Real Expectations",
    description:
      "A color-by-color guide to removing colored tattoos. Learn which ink colors are hardest, which lasers match which pigments, and what complete removal realistically looks like.",
  },
};

const faqs = [
  {
    question: "Are multi-colored tattoos harder to remove?",
    answer:
      "Yes. Multi-color tattoos need multiple laser wavelengths to treat effectively. A single-wavelength laser can fade multi-color work but rarely achieves complete clearance. Expect eight to fifteen sessions for professional multi-color tattoos, compared to six to ten for comparable black ink work.",
  },
  {
    question: "Which tattoo colors are hardest to remove?",
    answer:
      "White is hardest and riskiest due to titanium dioxide oxidation. Yellow often leaves trace pigment even with the correct wavelength. Green and teal are moderate to hard. Red and orange are moderate. Dark blue and navy are easier. Black is easiest.",
  },
  {
    question: "Which tattoo colors are easiest to remove?",
    answer:
      "Black is the easiest. Dark blue and dark green follow. These darker pigments absorb laser energy across a wider range of wavelengths, so they respond to more laser types with fewer sessions than bright or light colors.",
  },
  {
    question: "Can tattoo removal lasers remove all colors?",
    answer:
      "Most colors, yes. White ink often cannot be removed safely and is skipped by many providers. Yellow often leaves residual even with the right wavelength. Nearly every other color can be removed with the right laser wavelength, though session counts vary.",
  },
  {
    question: "What is the best laser for color tattoo removal?",
    answer:
      "A multi-wavelength picosecond laser (PicoSure, PicoWay, Enlighten) typically offers the best color results. These systems combine multiple wavelengths in one machine, which allows wavelength-to-pigment matching in a single session. Clinics with access to both Q-switched Nd:YAG and Alexandrite lasers can also cover most colors effectively.",
  },
  {
    question: "Does laser tattoo removal work on colored ink?",
    answer:
      "Yes, for most colors. Effectiveness depends on laser wavelength matching the ink color. 1064 nm Nd:YAG for black and dark blue. 532 nm KTP for red and orange. 755 nm Alexandrite or 694 nm Ruby for green and teal. White and yellow remain difficult.",
  },
  {
    question: "Can green tattoo ink be removed?",
    answer:
      "Usually yes, with the right laser. Green ink responds to 755 nm Alexandrite or 694 nm Ruby wavelengths, and to picosecond lasers offering those wavelengths. Green often takes more sessions than black, and bright green can leave trace pigment after ten or more sessions in some cases.",
  },
  {
    question: "Can yellow tattoo ink be removed?",
    answer:
      "Partially, usually. Yellow is one of the hardest colors to clear completely. A 532 nm KTP wavelength helps, but yellow often leaves residual pigment even with extensive treatment. Trace yellow is common in tattoos described as completely removed.",
  },
  {
    question: "How many sessions does color tattoo removal take?",
    answer:
      "Six to ten sessions for single-color red or orange. Eight to twelve for green. Six to twelve for blue depending on shade. Eight to fifteen for multi-color professional work. Amateur work often clears in three to six sessions. Skin type, saturation, tattoo age, and provider skill all shift these ranges.",
  },
  {
    question: "Why are color tattoos harder to remove than black ink?",
    answer:
      "Black absorbs nearly every laser wavelength, so almost any tattoo removal laser can treat it. Color inks absorb specific wavelengths. Red needs 532 nm. Green needs 755 nm. Blue responds to multiple wavelengths. Removing a multi-color tattoo requires matching wavelength to ink color, which often means using multiple laser types. Single-wavelength clinics fade color tattoos slowly or incompletely.",
  },
];

const COLOR_DIFFICULTY = [
  {
    color: "White",
    difficulty: "Hardest",
    body: "White pigment often contains titanium dioxide, which can oxidize under laser and turn gray, black, or greenish instantly. Many experienced providers will not treat white ink at all. Others will treat it only after a careful patch test six to eight weeks before the full session. White highlights mixed into colored tattoos often persist after the rest of the tattoo has cleared.",
  },
  {
    color: "Yellow",
    difficulty: "Very difficult",
    body: "Yellow sits at a wavelength range that most laser systems do not target well. A 532 nm KTP wavelength helps, but yellow often leaves trace pigment even after extensive treatment. Yellow is a common color to see in otherwise completely removed tattoos as a faint residual shadow.",
  },
  {
    color: "Bright green and teal",
    difficulty: "Hard",
    body: "Green ink is typically removed with a 755 nm Alexandrite or a 694 nm Ruby laser. Picosecond lasers with multiple wavelengths handle green better than older Q-switched systems. Even so, green can leave residual pigment after ten or more sessions in some cases.",
  },
  {
    color: "Light blue and turquoise",
    difficulty: "Moderate",
    body: "Light blues can respond reasonably well to Alexandrite (755 nm) and certain picosecond wavelengths, but lighter pigments take more sessions than saturated dark blue.",
  },
  {
    color: "Red and orange",
    difficulty: "Moderate",
    body: "Red and orange both respond to 532 nm KTP laser energy. Red usually clears within a normal session range. Orange takes somewhat longer. Neither is as easy as black, but both are usually fully removable.",
  },
  {
    color: "Dark blue and navy",
    difficulty: "Easier",
    body: "Dark blue absorbs 1064 nm Nd:YAG reasonably well and clears close to the rate of black ink.",
  },
  {
    color: "Black",
    difficulty: "Easiest",
    body: "Black pigment absorbs nearly every laser wavelength and is the benchmark for tattoo removal. Most professional black tattoos clear in six to ten sessions.",
  },
];

const WAVELENGTH_ROWS = [
  {
    wavelength: "1064 nm Nd:YAG",
    targets: "Black, dark blue, dark green",
  },
  {
    wavelength: "532 nm KTP",
    targets: "Red, orange, some yellows",
  },
  {
    wavelength: "755 nm Alexandrite",
    targets: "Green, teal, some light blues",
  },
  {
    wavelength: "694 nm Ruby",
    targets: "Blue, green (less common than Alexandrite but effective)",
  },
  {
    wavelength: "785 nm picosecond",
    targets: "Blue and green (available on some Enlighten and PicoWay systems)",
  },
];

const SESSION_ROWS = [
  { type: "Single-color red or orange", range: "6 to 10 sessions" },
  { type: "Single-color green", range: "8 to 12 sessions" },
  { type: "Single-color blue", range: "6 to 12 sessions (depends on shade)" },
  { type: "Multi-color professional work", range: "8 to 15 sessions" },
  { type: "Heavily saturated or layered multi-color", range: "15 or more sessions" },
  { type: "Amateur color tattoos", range: "Often 3 to 6 sessions" },
];

const PAGE_PATH = "/categories/color-ink-removal";
const SITE_URL = "https://realtattooreviews.com";

export default function ColorInkRemovalPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Categories", href: "/categories" },
    { name: "Color Ink Removal", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Color Tattoo Removal: Hardest Colors, Best Lasers, and Real Expectations",
    description:
      "A color-by-color guide to removing colored tattoos. Which ink colors are hardest, which lasers match which pigments, and what complete removal realistically looks like.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Color tattoo removal",
      "Multi-color tattoos",
      "Laser wavelengths",
      "Tattoo removal sessions",
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
      <section className="border-b border-(--line) pt-12 pb-10 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/categories" className="hover:text-(--ink) transition-colors">
              Categories
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Color Ink Removal
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Color Tattoo{" "}
            <span className="text-(--accent)">Removal</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Not all colors respond the same way. A color-by-color guide to which inks are hardest,
            which wavelengths match which pigments, and what complete removal realistically looks like.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="divide-y divide-(--line)">

            {/* Intro */}
            <div className="py-12">
              <div>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Color tattoos can be removed, but not all colors respond the same way. Black and
                  dark blue clear well. Red and orange usually clear with the right wavelength. Green
                  often takes more sessions than black. Yellow and white are the hardest, and white
                  can darken instead of fading.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page breaks down what to expect by color. It covers which laser wavelengths
                  match which pigments, why multi-color work is harder than single-color work, and
                  when near-complete removal is the honest end state rather than total clearance.
                  For broader full-removal expectations, see the{" "}
                  <Link
                    href="/categories/complete-removal"
                    className="text-(--accent) hover:underline"
                  >
                    complete removal page
                  </Link>
                  . For method comparisons, see the{" "}
                  <Link
                    href="/comparisons/best-tattoo-removal-method"
                    className="text-(--accent) hover:underline"
                  >
                    best tattoo removal method guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Multi-color harder */}
            <GuideSection heading="Are Multi-Colored Tattoos Harder to Remove?">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Yes. Multi-color tattoos are harder to remove than single-color work, for two
                  reasons.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  First, different colors absorb different laser wavelengths. A 1064 nm Nd:YAG
                  laser targets black well but does little for red or yellow. A 532 nm KTP laser
                  targets red and orange but does little for blue or green. Removing a multi-color
                  tattoo usually means treating with multiple wavelengths over the course of the
                  full treatment plan. A clinic using only one laser wavelength on a full-color
                  piece can achieve fading, but rarely complete clearance.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  Second, multi-color tattoos often involve layered pigment. Colors mixed to achieve
                  specific shades can contain ink blends that react unpredictably. Under laser,
                  those blends can shift color before fading, or they can fade at different rates,
                  leaving a patchy appearance mid-treatment.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  The practical result: multi-color removal takes more sessions than black ink
                  removal. Eight to fifteen sessions is a typical range for professional multi-color
                  work, compared to six to ten for black. Rushing the process or treating with a
                  single-wavelength laser does not shorten this timeline. It usually lengthens it.
                </p>
              </div>
            </GuideSection>

            {/* Hardest colors ranked */}
            <GuideSection heading="Which Tattoo Colors Are Hardest to Remove?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Ranked from hardest to easiest, here is how colors generally respond to color
                tattoo removal. The ranking is a rough guide, not a rule. Ink manufacturer,
                saturation, tattoo age, and skin type all shift color-specific outcomes.
              </p>
              <div className="space-y-3">
                {COLOR_DIFFICULTY.map((item) => (
                  <div
                    key={item.color}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <p className="font-sans text-[14px] font-semibold text-(--ink) m-0">
                        {item.color}
                      </p>
                      <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-(--muted) m-0">
                        {item.difficulty}
                      </p>
                    </div>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Easiest colors */}
            <GuideSection heading="Which Tattoo Colors Are Easiest to Remove?">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Black is the easiest, followed by dark blue and dark green. These darker pigments
                  absorb laser energy across the widest range of wavelengths, so they respond to
                  more laser types and clear with fewer sessions.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  Older tattoos of any color usually clear faster than fresh work, because ink
                  naturally fades over years. A five-year-old red tattoo often clears in fewer
                  sessions than a six-month-old red tattoo of the same size and saturation.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  Amateur tattoos are typically single-ink and shallower than professional work.
                  They often clear in three to six sessions regardless of original color.
                </p>
              </div>
            </GuideSection>

            {/* Best lasers */}
            <GuideSection heading="Best Lasers for Color Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                No single laser wavelength covers every tattoo color. Color tattoo removal often
                requires a multi-wavelength laser system, or access to multiple laser types over the
                course of treatment. Here is how wavelengths match to colors.
              </p>
              <div className="space-y-2">
                {WAVELENGTH_ROWS.map((row) => (
                  <div
                    key={row.wavelength}
                    className="flex gap-4 rounded-xl border border-(--line) bg-(--surface) px-5 py-4"
                  >
                    <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 shrink-0 w-44">
                      {row.wavelength}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {row.targets}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Picosecond lasers (PicoSure, PicoWay, Enlighten) typically offer better color
                results than older Q-switched Nd:YAG systems. Shorter pulse widths deliver less
                thermal energy per pulse, which means more efficient fragmentation of pigment
                particles. Many picosecond platforms include multiple wavelengths in one machine,
                allowing wavelength-to-ink matching across a multi-color tattoo in the same session.
              </p>
              <GuideCallout label="Ask your provider">
                For any color tattoo, ask which wavelengths they will use and which wavelengths are
                available on their equipment. If the clinic has only one wavelength (commonly
                1064 nm Nd:YAG), color work will be slower or incomplete. Some colors may need
                referral to a different clinic.
              </GuideCallout>
            </GuideSection>

            {/* Can all colors be removed */}
            <GuideSection heading="Can Tattoo Removal Lasers Remove All Colors?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most colors, yes. Some, no.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Modern multi-wavelength picosecond systems can treat nearly every tattoo color
                except white and some yellows. Clinics with access to multiple laser types can
                handle full-color work effectively.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "White ink",
                    body: "May not remove cleanly with any laser. Titanium dioxide oxidation risk makes most providers skip it entirely.",
                  },
                  {
                    title: "Yellow",
                    body: "Often leaves trace pigment even with the right wavelength.",
                  },
                  {
                    title: "Proprietary color blends",
                    body: "Some proprietary color blends from specific ink manufacturers have unpredictable responses.",
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
              <GuideCallout label="Provider claims">
                If a provider tells you every color on your tattoo will clear completely with their
                specific laser, ask which wavelengths the machine offers. If they hesitate or cannot
                answer, the claim is not grounded.
              </GuideCallout>
            </GuideSection>

            {/* Color vs black */}
            <GuideSection heading="Color Tattoo Removal vs Black Ink Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Color and black ink tattoos are genuinely different removal projects. Black tattoos
                respond to almost every laser wavelength. Clearance rates are high, session counts
                are predictable, and complete removal is realistic for most cases.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Color tattoos require wavelength matching to specific pigments. Clearance rates
                depend heavily on which colors are present and which laser wavelengths the provider
                has. Session counts are harder to predict. Complete clearance is realistic for some
                colors and difficult for others.
              </p>
              <div className="space-y-2">
                {[
                  "Expect more sessions for color work than for comparable-sized black work.",
                  "Budget more time. Total treatment can run 12 to 24 months.",
                  "Budget more cost. More sessions at similar per-session pricing.",
                  "Accept that some colors may leave trace pigment.",
                  "Choose a provider with multi-wavelength laser access or access to multiple laser machines.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-(--line) bg-(--surface) px-5 py-3"
                  >
                    <span className="text-(--accent) font-bold shrink-0 mt-0.5">+</span>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Sessions */}
            <GuideSection heading="How Many Sessions Does Color Tattoo Removal Take?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Typical session ranges by tattoo type. Color tattoo removal uses the same session
                spacing as black ink work: six to eight weeks for lighter skin, eight to twelve
                weeks for darker skin.
              </p>
              <div className="space-y-2">
                {SESSION_ROWS.map((row) => (
                  <div
                    key={row.type}
                    className="flex items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-5 py-3"
                  >
                    <p className="font-sans text-[14px] text-(--muted) m-0">{row.type}</p>
                    <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 ml-4 shrink-0 text-right">
                      {row.range}
                    </p>
                  </div>
                ))}
              </div>
              <GuideCallout label="Kirby-Desai scale">
                The Kirby-Desai scale assigns points based on six factors: Fitzpatrick skin type,
                tattoo location, ink color, amount of ink, scarring, and layering. It gives a more
                accurate session estimate than a clinic's default package count. A provider using
                Kirby-Desai is doing a methodical assessment. A provider promising a fixed session
                count without assessment is overselling.
              </GuideCallout>
            </GuideSection>

            {/* Complete vs Partial */}
            <GuideSection heading="Complete vs Partial Color Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Partial removal is often the right end goal for color work.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Complete removal",
                    body: "No visible trace at normal viewing distance. For many color tattoos, especially multi-color pieces with yellow or white, complete removal is genuinely difficult and may not be achievable. Fifteen sessions in, if residual yellow is still present, more sessions often produce diminishing returns.",
                  },
                  {
                    title: "Partial removal or significant fading",
                    body: "A legitimate outcome. A tattoo that is 80 to 90 percent faded is dramatically less visible than the original and opens the door to effective cover-up work if desired.",
                  },
                  {
                    title: "Cover-up prep",
                    body: "Complete removal is usually not even the goal. Three to five sessions of fading often creates a clean enough base for a new tattoo to hide the original.",
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

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Wavelength-to-color guidance, session count ranges, and pigment behavior claims
                (including titanium dioxide oxidation on white ink and yellow-pigment resistance)
                are grounded in standard dermatology consensus and peer-reviewed tattoo removal
                literature. Individual outcomes vary by tattoo, ink manufacturer, skin type,
                aftercare, and provider skill. Consult a qualified provider before proceeding. See
                our{" "}
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
                  href: "/categories/complete-removal",
                  title: "Complete Removal",
                  desc: "What complete removal realistically looks like, and which cases achieve it.",
                },
                {
                  href: "/categories/dark-skin-tattoo-removal",
                  title: "Dark Skin Tattoo Removal",
                  desc: "Safe laser choices, wavelengths, and providers for Fitzpatrick IV through VI.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Compare laser, TEPR, and saline across effectiveness, skin type, and use case.",
                },
                {
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "Scarring risk by method, skin type, and provider. Prevention and treatment.",
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
