import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import ProviderComparisonTable, { type TableProvider } from "@/components/provider/ProviderComparisonTable";
import { getBrandStats } from "@/lib/data/reviews";

export const metadata: Metadata = {
  title: "Tattoo Removal Providers: Compare Clinics and Brands | RealTattooReviews",
  description:
    "Browse and compare tattoo removal providers across the US. See methods, technology, locations, and read full provider reviews before booking.",
  alternates: {
    canonical: "https://realtattooreviews.com/providers",
  },
  openGraph: {
    title: "Tattoo Removal Providers: Compare Clinics and Brands | RealTattooReviews",
    description:
      "Browse and compare tattoo removal providers across the US. See methods, technology, locations, and read full provider reviews before booking.",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tattoo Removal Providers",
  description: "Tattoo removal providers tracked by RealTattooReviews",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Arviv Medical Aesthetics", url: "https://realtattooreviews.com/reviews/arviv-medical-aesthetics" },
    { "@type": "ListItem", position: 2, name: "Clarity Skin", url: "https://realtattooreviews.com/reviews/clarity-skin" },
    { "@type": "ListItem", position: 3, name: "Clean Slate Ink", url: "https://realtattooreviews.com/reviews/clean-slate-ink" },
    { "@type": "ListItem", position: 4, name: "DermSurgery Associates", url: "https://realtattooreviews.com/reviews/dermsurgery-associates" },
    { "@type": "ListItem", position: 5, name: "Enfuse Medical Spa", url: "https://realtattooreviews.com/reviews/enfuse-medical-spa" },
    { "@type": "ListItem", position: 6, name: "Erasable Med Spa", url: "https://realtattooreviews.com/reviews/erasable-med-spa" },
    { "@type": "ListItem", position: 7, name: "inkOUT", url: "https://realtattooreviews.com/reviews/inkout" },
    { "@type": "ListItem", position: 8, name: "Inkfree, MD", url: "https://realtattooreviews.com/reviews/inkfree-md" },
    { "@type": "ListItem", position: 9, name: "Inklifters", url: "https://realtattooreviews.com/reviews/inklifters" },
    { "@type": "ListItem", position: 10, name: "Kovak Cosmetic Center", url: "https://realtattooreviews.com/reviews/kovak-cosmetic-center" },
    { "@type": "ListItem", position: 11, name: "MEDermis Laser Clinic", url: "https://realtattooreviews.com/reviews/medermis-laser-clinic" },
    { "@type": "ListItem", position: 12, name: "Removery", url: "https://realtattooreviews.com/reviews/removery" },
    { "@type": "ListItem", position: 13, name: "Skintellect Laser & Aesthetics", url: "https://realtattooreviews.com/reviews/skintellect-laser-aesthetics" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://realtattooreviews.com" },
    { "@type": "ListItem", position: 2, name: "Providers", item: "https://realtattooreviews.com/providers" },
  ],
};

// Static config per brand row. supabaseSlug is the brand-level slug used in the
// reviews table — getBrandStats handles prefix matching (e.g. "removery" catches
// "removery-bucktown", "removery-lincoln-square", etc.).
const PROVIDER_STATIC: (Omit<TableProvider, "reviews"> & { supabaseSlug: string })[] = [
  { name: "Arviv Medical Aesthetics", slug: "arviv-medical-aesthetics", supabaseSlug: "arviv-medical-aesthetics", method: "Laser", technology: "PicoWay", locations: "3 (Tampa, Miami, Ocala)", locationCount: 3, yearsActive: null, bestFor: "Med spa setting in Florida", footprint: "Regional", setting: "Medical spa" },
  { name: "Clarity Skin", slug: "clarity-skin", supabaseSlug: "clarity-skin", method: "Laser", technology: "PicoWay", locations: "1 (Draper, UT)", locationCount: 1, yearsActive: null, bestFor: "Plastic surgeon-led med spa in Utah", footprint: "Single-market", setting: "Medical spa" },
  { name: "Clean Slate Ink", slug: "clean-slate-ink", supabaseSlug: "clean-slate-ink", method: "Laser", technology: "FDA-cleared", locations: "2 (Austin, Round Rock)", locationCount: 2, yearsActive: null, bestFor: "Affordable Austin-area specialist", footprint: "Regional", setting: "Tattoo removal specialist" },
  { name: "DermSurgery Associates", slug: "dermsurgery-associates", supabaseSlug: "dermsurgery-associates", method: "Laser", technology: "PicoSure + Q-Switched Nd:YAG", locations: "12 (Greater Houston)", locationCount: 12, yearsActive: null, bestFor: "Dermatologist-supervised treatment", footprint: "Regional", setting: "Dermatology practice" },
  { name: "Enfuse Medical Spa", slug: "enfuse-medical-spa", supabaseSlug: "enfuse-medical-spa", method: "Laser", technology: "PicoWay", locations: "1 (Chicago)", locationCount: 1, yearsActive: 16, bestFor: "Inclusive med spa in Wicker Park", footprint: "Single-market", setting: "Medical spa" },
  { name: "Erasable Med Spa", slug: "erasable-med-spa", supabaseSlug: "erasable-med-spa", method: "Laser", technology: "Cutera enlighten", locations: "1 (Tampa)", locationCount: 1, yearsActive: 12, bestFor: "Veteran-owned tattoo removal specialist", footprint: "Single-market", setting: "Tattoo removal specialist" },
  { name: "inkOUT", slug: "inkout", supabaseSlug: "inkout", method: "Non-laser", technology: "TEPR", locations: "5 (TX, IL, FL, UT)", locationCount: 5, yearsActive: 11, bestFor: "Complete removal, all skin types, cover-up prep", footprint: "National chain", setting: "Tattoo removal specialist" },
  { name: "Inkfree, MD", slug: "inkfree-md", supabaseSlug: "inkfree-md", method: "Laser", technology: "Lutronic PicoPlus + Spectra", locations: "1 (Houston)", locationCount: 1, yearsActive: 14, bestFor: "Physician-owned independent clinic", footprint: "Single-market", setting: "Medical spa" },
  { name: "Inklifters", slug: "inklifters-aesthetica", supabaseSlug: "inklifters-aesthetica", method: "Laser", technology: "PicoWay", locations: "1 (Pleasant Grove, UT)", locationCount: 1, yearsActive: 18, bestFor: "Long-running Utah specialist", footprint: "Single-market", setting: "Tattoo removal specialist" },
  { name: "Kovak Cosmetic Center", slug: "kovak-cosmetic-center", supabaseSlug: "kovak-cosmetic-center", method: "Laser", technology: "PicoWay", locations: "1 (Oakbrook Terrace, IL)", locationCount: 1, yearsActive: 27, bestFor: "Multi-laser cosmetic practice", footprint: "Single-market", setting: "Medical spa" },
  { name: "MEDermis Laser Clinic", slug: "medermis-laser-clinic", supabaseSlug: "medermis-laser-clinic", method: "Laser", technology: "Lutronic Spectra Pico Plus", locations: "2 (Austin, San Antonio)", locationCount: 2, yearsActive: 19, bestFor: "Tattoo-removal-only specialist with package guarantee", footprint: "Regional", setting: "Tattoo removal specialist" },
  { name: "Removery", slug: "removery-bucktown", supabaseSlug: "removery", method: "Laser", technology: "PicoWay", locations: "150+ (US, Canada, Australia)", locationCount: 150, yearsActive: 7, bestFor: "Largest US footprint, flat-rate package pricing", footprint: "National chain", setting: "Tattoo removal specialist" },
  { name: "Skintellect Laser & Aesthetics", slug: "skintellect", supabaseSlug: "skintellect", method: "Laser", technology: "Fotona StarWalker FracTat", locations: "1 (Tampa)", locationCount: 1, yearsActive: 11, bestFor: "Fractional removal protocol for tougher cases", footprint: "Single-market", setting: "Medical spa" },
];

export default async function ProvidersPage() {
  const supabaseSlugs = PROVIDER_STATIC.map((p) => p.supabaseSlug);
  const stats = await getBrandStats(supabaseSlugs);

  const tableProviders: TableProvider[] = PROVIDER_STATIC.map(({ supabaseSlug, ...row }) => ({
    ...row,
    reviews: stats[supabaseSlug]?.totalReviews || null,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-bg">

        {/* Hero */}
        <section className="border-b border-border bg-hero-bg py-14">
          <Container>
            <nav className="mb-4 text-[12px] text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-heading">Providers</span>
            </nav>
            <h1 className="text-[36px] font-bold text-heading">Tattoo Removal Providers</h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
              Browse the major tattoo removal clinics and brands in our coverage. Compare method, technology, footprint, and treatment approach, then read the full provider review before booking.
            </p>
          </Container>
        </section>

        {/* Comparison Table */}
        <section className="py-12">
          <Container>
            <h2 className="mb-2 text-[22px] font-bold text-heading">Compare Tattoo Removal Providers</h2>
            <p className="mb-6 max-w-2xl text-[14px] leading-relaxed text-muted">
              The table below covers every provider currently tracked on RealTattooReviews. Sort by any column to compare on what matters to you. Method describes whether the provider uses laser, non-laser, or both. Technology names the specific device or system. Locations covers where the provider operates. Click any provider name to read the full review.
            </p>
            <ProviderComparisonTable providers={tableProviders} />
          </Container>
        </section>

        {/* How to Choose */}
        <section className="border-t border-border py-12">
          <Container>
            <h2 className="mb-3 text-[22px] font-bold text-heading">How to Choose a Tattoo Removal Provider</h2>
            <p className="mb-8 max-w-2xl text-[14px] leading-relaxed text-muted">
              Choosing a tattoo removal provider is mostly about matching method and protocol to your tattoo and skin. Brand recognition and footprint matter less than they look. The five questions below cover the decisions that change which provider is right for you.
            </p>

            <div className="flex flex-col gap-8 max-w-2xl">

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Decide on method first</h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  Tattoo removal providers fall into two categories: laser and non-laser. The vast majority of clinics in the US use laser systems, most commonly picosecond lasers like PicoWay, PicoSure, or Cutera enlighten. A small number of providers use non-laser methods, primarily TEPR, which removes ink through controlled superficial dermabrasion and natural healing rather than light fragmentation.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  The two methods produce different healing experiences. Laser leaves the skin intact between sessions but may take 8 to 15 sessions over 18 to 24 months. Non-laser produces visible scabbing during a 2 to 4 week healing phase per session but typically completes in 3 to 5 sessions over 10 to 15 months. Neither is universally better. The right choice depends on your tolerance for scabbing versus session count, and on the specific characteristics of your tattoo.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Check fit for your skin type</h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  Laser tattoo removal can carry a hypopigmentation risk for darker skin tones, particularly Fitzpatrick types V and VI, because laser energy can be absorbed by melanin in addition to ink. Modern picosecond lasers reduce this risk compared to older Q-switched systems, but they do not eliminate it. Providers vary in how they screen and adjust treatment for darker skin.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  Non-laser methods like TEPR do not target melanin and are described by their providers as Fitzpatrick I-VI compatible, though independent comparative studies remain limited. If you have Fitzpatrick V or VI skin, ask any laser provider about their specific protocol and case experience for darker tones before booking.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Check fit for your tattoo&apos;s colors</h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  Laser tattoo removal performance varies sharply by ink color. Black, dark blue, and red typically respond well. Yellow, white, and pastel inks respond poorly to most common wavelengths. Peer-reviewed clearance data shows yellow ink can clear at as low as 5 to 11 percent per session, while purple may reach 85 percent (Bernstein et al., Lasers in Surgery and Medicine, 2018).
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  If your tattoo has significant yellow, white, or pastel content, ask laser providers which specific wavelengths their device supports. Multi-wavelength platforms like the Lutronic PicoPlus or Fotona StarWalker handle a broader color range. Non-laser methods like TEPR are described by their providers as color-agnostic.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Decide between complete removal and fading for cover-up</h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  Complete removal and fading for cover-up are different goals with different session counts and different pricing implications. Complete removal aims to eliminate the tattoo entirely. Fading reduces the ink enough that a cover-up tattoo can be applied over it, typically requiring fewer sessions. Some providers price these as separate packages. Some price per session regardless of goal. If you are planning a cover-up, ask the provider how their cover-up protocol differs from complete removal and how that changes your total cost.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Decide between national footprint and local specialist</h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  National chains like Removery offer standardized protocols, multi-location convenience, and package pricing models that can include unlimited sessions. Local specialists and physician-led practices often offer more individualized treatment plans and direct provider relationships, but at smaller scale.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  Footprint is most useful if you travel often or may relocate during your treatment timeline, which can run 1 to 2 years. Specialist depth matters more if your case is unusual, your skin tone is in the higher Fitzpatrick range, or your tattoo has stubborn colors or scarring history.
                </p>
              </div>

            </div>
          </Container>
        </section>

        {/* Browse by City */}
        <section className="border-t border-border py-12">
          <Container>
            <h2 className="mb-2 text-[22px] font-bold text-heading">Browse Providers by City</h2>
            <p className="mb-6 text-[14px] leading-relaxed text-muted">
              Provider availability varies by city. The pages below compare every tracked provider in each market, including local specialists not listed in the national table above.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { city: "austin-tx", label: "Austin, TX", count: 4 },
                { city: "chicago-il", label: "Chicago, IL", count: 4 },
                { city: "houston-tx", label: "Houston, TX", count: 4 },
                { city: "tampa-fl", label: "Tampa, FL", count: 5 },
                { city: "draper-ut", label: "Draper, UT", count: 3 },
              ].map(({ city, label, count }) => (
                <li key={city}>
                  <Link
                    href={`/cities/${city}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:border-accent/30 hover:shadow-sm"
                  >
                    <div>
                      <span className="font-medium text-heading">{label}</span>
                      <span className="ml-2 text-[12px] text-muted">{count} tracked providers</span>
                    </div>
                    <span className="text-[13px] text-accent">Compare {label} tattoo removal options →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Browse by Treatment Need */}
        <section className="border-t border-border py-12">
          <Container>
            <h2 className="mb-2 text-[22px] font-bold text-heading">Browse Providers by Treatment Need</h2>
            <p className="mb-6 text-[14px] leading-relaxed text-muted">
              Tattoo removal needs vary by case. The pages below cover providers and methods that handle specific situations.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { slug: "microblading-pmu-removal", label: "Microblading and PMU removal", desc: "Providers and methods for cosmetic tattoo removal" },
                { slug: "permanent-makeup-removal", label: "Permanent makeup removal", desc: "Eyebrow, lip, and eyeliner pigment removal" },
                { slug: "dark-skin-tattoo-removal", label: "Dark skin tattoo removal", desc: "Providers and methods for Fitzpatrick types V and VI" },
                { slug: "color-ink-removal", label: "Color ink tattoo removal", desc: "Removing yellow, white, and stubborn colors" },
                { slug: "scarring-concerns", label: "Scarring concerns", desc: "Methods for scar-prone skin and existing scar tissue" },
                { slug: "complete-tattoo-removal", label: "Complete tattoo removal", desc: "Methods and providers for full ink elimination" },
                { slug: "cover-up-preparation", label: "Cover-up preparation", desc: "Fading protocols for new tattoo work" },
              ].map(({ slug, label, desc }) => (
                <li key={slug}>
                  <Link
                    href={`/categories/${slug}`}
                    className="group flex flex-col gap-1 rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:border-accent/30 hover:shadow-sm"
                  >
                    <span className="font-medium text-heading">{label}</span>
                    <span className="text-[12px] text-muted">{desc} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* How We Cover Providers */}
        <section className="border-t border-border py-12">
          <Container>
            <h2 className="mb-4 text-[22px] font-bold text-heading">How We Cover Providers</h2>
            <div className="max-w-2xl text-[14px] leading-relaxed text-muted space-y-3">
              <p>
                RealTattooReviews tracks tattoo removal providers across the US based on coverage in their target markets, treatment method, and public review volume. Provider data is verified against each provider&apos;s published locations, public websites, and Google Business listings as of the page&apos;s last review date.
              </p>
              <p>
                We do not accept payment from providers for inclusion or placement in any listing on this site. Providers cannot edit, remove, or pre-approve their listings. Listings update as providers add or close locations and as new public review data becomes available.
              </p>
              <p>
                Read more about our review approach in our{" "}
                <Link href="/methodology" className="text-accent hover:underline">methodology</Link>.
                Read our{" "}
                <Link href="/editorial-policy" className="text-accent hover:underline">editorial policy</Link>{" "}
                for full disclosure on commercial relationships and review independence. To report an inaccuracy,{" "}
                <Link href="/contact" className="text-accent hover:underline">contact us</Link>.
              </p>
              <p className="text-[12px] text-subtle">Last reviewed: April 2026</p>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-12">
          <Container>
            <h2 className="mb-8 text-[22px] font-bold text-heading">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-6 max-w-2xl">
              {[
                {
                  q: "How many tattoo removal providers does RealTattooReviews cover?",
                  a: "We currently track 13 providers across the US, including national chains, regional specialists, and single-market clinics. The full list is in the comparison table above. Coverage expands as we verify additional providers.",
                },
                {
                  q: "How is this page different from the reviews hub?",
                  a: "The providers page is a discovery hub for browsing and comparing providers at a high level. The reviews hub is the destination for reading full provider reviews, evidence summaries, and complaint patterns. Use this page to narrow your shortlist; use the reviews hub to evaluate the shortlist in depth.",
                },
                {
                  q: "Can a provider pay to be added or moved up the list?",
                  a: "No. Inclusion is based on whether the provider operates in a tracked market and meets our public-data verification standards. Sort order is user-controlled. Default sort is alphabetical.",
                },
                {
                  q: "How often is provider data updated?",
                  a: "Provider data is reviewed at least quarterly. Review counts and ratings update more frequently as new public reviews become available. Each provider review page shows its own last-reviewed date.",
                },
                {
                  q: "I'm a provider. How do I request a correction or update?",
                  a: "Use the contact form and include the specific page, the field you want updated, and a public source we can verify against. We respond to provider correction requests within 5 business days.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <p className="mb-1.5 font-semibold text-heading">{q}</p>
                  <p className="text-[14px] leading-relaxed text-muted">{a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

      </main>
    </>
  );
}
