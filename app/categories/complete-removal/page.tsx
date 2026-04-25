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
  title: "Complete Tattoo Removal: Can Tattoos Be Fully Removed? | RealTattooReviews",
  description:
    "A realistic guide to complete tattoo removal. Learn what affects full clearance, how many sessions it takes, and when near-complete is the honest outcome.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories/complete-removal",
  },
  openGraph: {
    title: "Complete Tattoo Removal: Can Tattoos Be Fully Removed?",
    description:
      "A realistic guide to complete tattoo removal. Learn what affects full clearance, how many sessions it takes, and when near-complete is the honest outcome.",
  },
};

const faqs = [
  {
    question: "Can tattoos be removed completely?",
    answer:
      "Yes, many tattoos can be removed completely. The best candidates are black or dark blue ink on lighter skin, treated by an experienced provider using a picosecond or modern Q-switched Nd:YAG laser. Colored work, saturated work, darker skin, and certain ink types can make complete clearance harder. It can sometimes be impossible.",
  },
  {
    question: "Can tattoos be fully removed?",
    answer:
      "Most tattoos can be fully removed in the sense of leaving no visible trace at normal viewing distance. Trace pigment may remain at the microscopic level. That is not visible in everyday conditions. Completeness depends on ink color, saturation, age, skin type, and method.",
  },
  {
    question: "Does tattoo removal completely remove the tattoo?",
    answer:
      "It can, for most tattoos, with enough sessions and the right approach. Single-color black and dark blue work typically clears completely. Multi-color, saturated, or white-ink work may leave residual pigment even after extensive treatment.",
  },
  {
    question: "Can laser remove a tattoo completely?",
    answer:
      "Yes, laser can completely remove many tattoos, especially black and dark blue. Picosecond lasers achieve higher clearance rates than older Q-switched Nd:YAG. Complete removal of colored work requires a multi-wavelength laser. It may also need treatment across multiple laser types.",
  },
  {
    question: "How many sessions does complete tattoo removal take?",
    answer:
      "Typically six to ten sessions for professional black tattoos. Eight to fifteen for multi-color work. Three to six for amateur tattoos. Session count depends on ink, skin type, tattoo age, saturation, and provider skill. Kirby-Desai scale assessments give a more accurate estimate.",
  },
  {
    question: "How long does it take to completely remove a tattoo?",
    answer:
      "Most complete removal takes nine months to two years total. Sessions are spaced six to twelve weeks apart depending on skin type. Complex or large tattoos can take longer. Rushing treatment reduces clearance and raises risk.",
  },
  {
    question: "Can black tattoos be completely removed?",
    answer:
      "Yes. Black ink is the easiest color to clear completely with laser. The 1064 nm Nd:YAG wavelength targets it best. Most black professional tattoos clear in six to ten sessions on lighter skin, somewhat more on darker skin.",
  },
  {
    question: "Can colored tattoos be fully removed?",
    answer:
      "Often, but not always. Red, orange, blue, and some greens can clear fully with the right wavelengths. Yellow, bright green, and white ink can leave residual pigment even after extensive treatment. Multi-color tattoos need more sessions than single-color work.",
  },
  {
    question: "Is complete tattoo removal possible?",
    answer:
      "Yes, for many tattoos. It is realistic for black and dark blue work. It fits older tattoos, professional work at standard depth, and smaller pieces. Less realistic for heavily saturated multi-color work, white ink, and cover-ups. A Kirby-Desai assessment from an experienced provider gives the best session estimate for your specific tattoo.",
  },
  {
    question: "Will laser tattoo removal completely remove a tattoo?",
    answer:
      "Often, but not guaranteed. Most black tattoos clear completely. Colored, saturated, or layered work may leave some residual pigment. A modern picosecond laser, with an experienced provider, on appropriate skin type, offers the highest chance of complete clearance.",
  },
];

const PAGE_PATH = "/categories/complete-removal";
const SITE_URL = "https://realtattooreviews.com";

export default function CompleteRemovalPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Categories", href: "/categories" },
    { name: "Complete Tattoo Removal", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Complete Tattoo Removal: Can Tattoos Be Fully Removed?",
    description:
      "A realistic guide to complete tattoo removal. Learn what affects full clearance, how many sessions it takes, and when near-complete is the honest outcome.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Complete tattoo removal",
      "Full tattoo clearance",
      "Laser tattoo removal",
      "Kirby-Desai scale",
      "Color ink removal",
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
              Complete Tattoo Removal
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Complete Tattoo{" "}
            <span className="text-(--accent)">Removal</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            A realistic guide to complete tattoo removal. Learn what affects full clearance, how
            many sessions it takes, and when near-complete is the honest outcome.
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
                  Complete tattoo removal is often possible, but it is not guaranteed for every
                  tattoo. The honest answer sits between "yes, always" (which is overpromising) and
                  "no, never" (which is wrong). What determines complete clearance versus leftover
                  shadow is a combination of ink color, tattoo age, depth, skin type, and method
                  choice. Understanding which of those apply to your tattoo is the difference
                  between realistic expectations and disappointment.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page explains what complete removal actually looks like. It covers why fading
                  and complete clearance are not the same goal. It covers which factors move the
                  odds in your favor. And it covers when "near-complete" is the most honest outcome
                  a provider can offer.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <GuideSection heading="Can Tattoos Be Removed Completely?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Yes, many tattoos can be removed completely. Black ink tattoos have a realistic
                chance of full clearance when several conditions are met: the tattoo is average size
                and at normal depth, the skin is lighter, the laser is a modern picosecond or
                Q-switched Nd:YAG, and the provider is experienced.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The word "completely" is where honest and dishonest providers part ways. A clinic
                promising 100% removal in a fixed session count without examining your tattoo is
                overpromising. A provider who explains that complete removal is realistic but
                depends on specific factors, and gives you a range, is being honest.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Factors that increase the odds of complete removal:
              </h3>
              <GuideBulletList
                items={[
                  "Black or dark blue ink",
                  "Professional tattoo placed at standard depth (amateur tattoos often sit shallower and clear faster)",
                  "Older tattoos (ink naturally fades over years, giving the laser less to break down)",
                  "Smaller size",
                  "Lighter skin tone, which allows higher fluence without thermal risk",
                  "A picosecond laser or modern Q-switched Nd:YAG with appropriate wavelength",
                  "Consistent session spacing and good aftercare",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Colored tattoos, new work, saturated or layered work, very large pieces, darker
                skin tones, and ink placed near lymph nodes all make complete clearance harder.
              </p>
            </GuideSection>

            {/* Section 2 */}
            <GuideSection heading="Can Tattoos Be Fully Removed?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                "Fully removed" usually means two things to patients. The first is clean skin with
                no visible trace of the tattoo. The second is no detectable pigment at all under
                close examination.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The first is achievable for most tattoos with the right treatment plan and enough
                sessions. The second is rarer. Trace particles can remain in the skin even after a
                tattoo appears visually gone. A careful dermatologist looking closely may still see
                faint shadow. That is not the same as the tattoo still being visible in normal
                conditions.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For the purposes of this page, "complete removal" means no visible trace of the
                tattoo at normal viewing distance under normal lighting. By that standard, yes, most
                tattoos can be fully removed. Some require more sessions than others. Some leave a
                faint ghost that only the patient can see. And some residual work sits at the edge
                of what any method can clear.
              </p>
            </GuideSection>

            {/* Section 3 */}
            <GuideSection heading="Does Tattoo Removal Completely Remove the Tattoo?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                It depends on the tattoo and the treatment.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Laser tattoo removal, done well, can achieve complete visual clearance for most
                black and dark blue tattoos. It also clears many color tattoos with appropriate
                wavelength selection. Tattoos that typically clear fully include single-color black
                pieces, dark blue lettering, and faded older tattoos regardless of original color.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                Tattoos that often leave residual pigment:
              </h3>
              <GuideBulletList
                variant="warning"
                items={[
                  "Bright colors (especially yellow, green, and white) that resist clearance",
                  "Heavily saturated multi-color work with trace pigment across layers",
                  "Recently done tattoos where ink is still fresh",
                  "Tattoos with white highlighting, which can resist removal and sometimes darken",
                  "Cover-up tattoos with multiple ink layers that compound the challenge",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Saline removal and other non-laser methods are better suited to PMU and small
                tattoos than to complete removal of large body tattoos. For body tattoo complete
                removal, laser is the standard.
              </p>
            </GuideSection>

            {/* Section 4 */}
            <GuideSection heading="Can Laser Remove a Tattoo Completely?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Yes, laser can remove many tattoos completely, especially black and dark blue ink on
                lighter skin. The practical limits are color, saturation, size, depth, and the laser
                used.
              </p>

              <h3 className="font-sans text-[16px] font-semibold text-(--ink)">
                What determines whether laser achieves full clearance:
              </h3>
              <GuideBulletList
                items={[
                  "Ink color. Black absorbs most laser wavelengths well. Red, orange, yellow, green, blue, and white all respond differently. Yellow, green, and white can leave trace pigment.",
                  "Tattoo depth and saturation. Deep, saturated ink takes more sessions. Shallow amateur work clears faster, often with fewer sessions.",
                  "Laser type. Picosecond lasers (PicoWay, PicoSure, Enlighten) generally achieve higher clearance rates than older Q-switched Nd:YAG, especially for stubborn colors and saturated work.",
                  "Wavelength match. 1064 nm Nd:YAG for black, 532 nm KTP for red and orange, 755 nm Alexandrite for green and blue. A single-wavelength laser cannot optimally treat every color.",
                  "Patient factors. Skin type, immune function, smoking status, and sun exposure all affect how effectively the body clears fragmented ink.",
                  "Session count and spacing. Complete removal requires enough sessions with adequate spacing between them. Rushing sessions reduces clearance.",
                ]}
              />

              <GuideCallout label="Red flag">
                A provider claiming laser will completely remove any tattoo in any number of
                sessions regardless of these factors is not being honest.
              </GuideCallout>
            </GuideSection>

            {/* Section 5 */}
            <GuideSection heading="How Many Sessions Does Complete Tattoo Removal Take?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most black ink tattoos of moderate size and saturation require six to ten laser
                sessions for complete removal. Complex, colorful, or saturated tattoos often need
                ten to fifteen sessions. Some tattoos may need more.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Amateur black tattoos",
                    body: "Often three to six sessions. Shallower placement and less saturated ink typically respond faster.",
                  },
                  {
                    title: "Professional black tattoos",
                    body: "Typically six to ten sessions. Deeper, more consistent ink placement takes more sessions to fully clear.",
                  },
                  {
                    title: "Multi-color professional tattoos",
                    body: "Typically eight to fifteen sessions. Different colors require different wavelengths, extending the overall treatment.",
                  },
                  {
                    title: "Heavily saturated or layered tattoos",
                    body: "Can require fifteen or more sessions. Volume of ink and layered deposits compound the challenge.",
                  },
                  {
                    title: "Cover-up tattoos",
                    body: "Often need additional sessions compared to the original work due to multiple overlapping ink layers.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Sessions are usually spaced six to eight weeks apart for lighter skin, and eight to
                twelve weeks apart for darker skin. Total treatment timeline for complete removal is
                typically nine months to two years, sometimes longer for complex cases.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The Kirby-Desai scale is a clinical tool some providers use to estimate session
                count. It scores Fitzpatrick skin type, tattoo location, ink color, amount of ink,
                scarring, and layering to estimate how many sessions complete removal will require.
                Any provider who gives you a Kirby-Desai score is being methodical. A provider who
                promises a fixed session count without this kind of assessment is not.
              </p>
            </GuideSection>

            {/* Section 6 */}
            <GuideSection heading="Complete Color Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Color ink is where complete removal gets harder. Different colors absorb different
                wavelengths, and not every laser covers every color optimally.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Black and dark blue",
                    body: "The easiest to clear completely. The 1064 nm Nd:YAG wavelength targets them well.",
                  },
                  {
                    title: "Red, orange, and yellow",
                    body: "Need a 532 nm wavelength. Yellow is particularly difficult and may not clear completely even with the right laser. Trace yellow is common in \"completely removed\" color tattoos.",
                  },
                  {
                    title: "Green and teal",
                    body: "Need a 755 nm Alexandrite or picosecond laser with 532 nm and 694 nm options. Green can leave residual pigment after multiple sessions.",
                  },
                  {
                    title: "White ink",
                    body: "The hardest and riskiest to remove. White pigment often contains titanium dioxide, which can oxidize and turn gray or black under laser. Many providers will not treat white ink at all, or will only treat it after a careful patch test.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Multi-color work requires multiple wavelengths over the course of treatment. A
                single-wavelength laser cannot achieve complete removal on a full-color tattoo.
                Complete removal for complex color work usually means treating with a
                multi-wavelength system or scheduling sessions on different lasers. A provider
                treating a full-color tattoo with only one laser wavelength is likely to achieve
                fading but not complete clearance.
              </p>
            </GuideSection>

            {/* Section 7 */}
            <GuideSection heading="Complete Removal vs Fading">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Fading and complete removal are not the same goal. Confusing them is one of the
                most common reasons patients feel disappointed with outcomes.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Fading",
                    body: "The tattoo is significantly lighter, often by 50-80%. It may still be visible as a shadow or ghost image. Fading is a legitimate end goal for cover-ups or patients who want reduced visibility without the time and cost of full removal. Three to five sessions is often enough for meaningful fading.",
                  },
                  {
                    title: "Complete removal",
                    body: "No visible trace of the tattoo at normal viewing distance. Requires more sessions, more time, and more money. Six to fifteen sessions is typical. A tattoo that is 80% faded is not 80% of the way to complete removal. The last 20% often takes disproportionately more sessions than the first 80%.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Deciding which goal fits matters. If you want a cover-up, fading is usually the
                better plan. If you never want the tattoo visible again, complete removal is the
                right frame from session one.
              </p>
            </GuideSection>

            {/* Section 8 */}
            <GuideSection heading="What Affects Complete Tattoo Removal Results?">
              <GuideBulletList
                items={[
                  "Ink color and saturation. Black and dark blue clear best. Yellow, green, and white are hardest. Heavily saturated work takes more sessions regardless of color.",
                  "Tattoo age. Older tattoos have already undergone natural fading. Tattoos over five years old often clear in fewer sessions than fresh work.",
                  "Professional vs amateur. Professional tattoos are deeper and more saturated but use consistent ink. Amateur tattoos often sit shallower but can contain unpredictable ink mixtures.",
                  "Body location. Tattoos closer to the heart and lymph nodes clear faster. Ankles, feet, wrists, and hands clear slower.",
                  "Skin type. Lighter skin (Fitzpatrick I-III) allows higher laser fluence with lower thermal risk. Darker skin (IV-VI) requires more conservative settings and longer session spacing.",
                  "Patient health. Immune function, smoking, hydration, sun exposure, and aftercare all affect how well the body clears ink between sessions.",
                  "Method and provider. Picosecond lasers typically achieve higher clearance rates than Q-switched Nd:YAG. An experienced provider adjusts fluence, wavelength, and spacing by session based on how the tattoo is responding.",
                ]}
              />
              <GuideCallout label="Note">
                Control what you can. Choose a good method and provider. Follow aftercare. Accept
                that the rest is biological.
              </GuideCallout>
            </GuideSection>

            {/* Section 9 */}
            <GuideSection heading="Complete vs Near-Complete Outcomes">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Near-complete is often the honest endpoint, and it is a legitimate outcome.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Some tattoos reach a point where additional sessions produce diminishing returns.
                The remaining pigment may be resistant ink, deep particles the laser struggles to
                reach, or trace residual that only close examination reveals. At that point,
                additional sessions are expensive, carry risk, and may not produce visible change.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most experienced providers will have a conversation around session eight, ten, or
                twelve. The question: is the remaining trace worth continuing to treat? Sometimes
                the honest answer is blunt: you are at 95% clearance, and the remaining 5% will not
                respond to more sessions. That conversation is a sign of a good provider, not a bad
                one.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Ghost images and shadowing occur when the outline of the tattoo remains faintly
                visible even after pigment is gone. This is usually a textural change rather than
                residual pigment. Ghosting can fade slowly over years. It is not true scarring and
                does not respond to further laser treatment.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                If your goal was complete removal and you end up at 90-95% clearance, you still
                have a much less visible tattoo than you started with. That is a successful outcome,
                even if it does not meet the literal definition of "complete."
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Session count ranges, Kirby-Desai scale references, wavelength guidance, and
                clearance expectations are grounded in standard dermatology consensus and
                peer-reviewed tattoo-removal literature. Individual outcomes vary by tattoo, skin
                type, aftercare, and provider skill. Complete removal is often possible but is not
                guaranteed for every case. Consult a qualified provider before proceeding. See our{" "}
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
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Compare laser, TEPR, and saline removal across effectiveness, pain, cost, and scarring risk.",
                },
                {
                  href: "/categories/color-ink-removal",
                  title: "Color Ink Removal",
                  desc: "Why certain ink colors are harder to clear and what wavelengths each color requires.",
                },
                {
                  href: "/categories/dark-skin-tattoo-removal",
                  title: "Tattoo Removal on Dark Skin",
                  desc: "Wavelength choice, hyperpigmentation risk, and finding a provider experienced with Fitzpatrick IV-VI skin.",
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
