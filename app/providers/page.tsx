import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/layout/Container";
import FAQSection from "@/components/sections/FAQSection";
import ProviderDirectory, {
  type DirectoryRow,
  type PendingRow,
} from "@/components/provider/ProviderDirectory";
import { getProviderDirectoryAggregates, getDataFreshness } from "@/lib/data/reviews";

export const metadata: Metadata = {
  title: "Tattoo Removal Providers: Compare Clinics, Chains, and Methods | RealTattooReviews",
  description:
    "Browse tattoo removal providers reviewed by RealTattooReviews. Compare national chains, local specialists, and non-laser brands by method, technology, footprint, and reviews.",
  alternates: {
    canonical: "https://realtattooreviews.com/providers",
  },
  openGraph: {
    title: "Tattoo Removal Providers: Compare Clinics, Chains, and Methods | RealTattooReviews",
    description:
      "Browse tattoo removal providers reviewed by RealTattooReviews. Compare national chains, local specialists, and non-laser brands by method, technology, footprint, and reviews.",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tattoo Removal Providers",
  description: "Tattoo removal providers tracked by RealTattooReviews",
  itemListElement: [
    { "@type": "ListItem", position: 1,  name: "Arviv Medical Aesthetics",    url: "https://realtattooreviews.com/reviews/arviv-medical-aesthetics" },
    { "@type": "ListItem", position: 2,  name: "Clarity Skin",                url: "https://realtattooreviews.com/reviews/clarity-skin" },
    { "@type": "ListItem", position: 3,  name: "Clean Slate Ink",             url: "https://realtattooreviews.com/reviews/clean-slate-ink" },
    { "@type": "ListItem", position: 4,  name: "DermSurgery Associates",      url: "https://realtattooreviews.com/reviews/dermsurgery-associates" },
    { "@type": "ListItem", position: 5,  name: "Enfuse Medical Spa",          url: "https://realtattooreviews.com/reviews/enfuse-medical-spa" },
    { "@type": "ListItem", position: 6,  name: "Erasable Med Spa",            url: "https://realtattooreviews.com/reviews/erasable-med-spa" },
    { "@type": "ListItem", position: 7,  name: "inkOUT",                      url: "https://realtattooreviews.com/reviews/inkout" },
    { "@type": "ListItem", position: 8,  name: "Inkfree, MD",                 url: "https://realtattooreviews.com/reviews/inkfree-md" },
    { "@type": "ListItem", position: 9,  name: "Inklifters",                  url: "https://realtattooreviews.com/reviews/inklifters-aesthetica" },
    { "@type": "ListItem", position: 10, name: "Kovak Cosmetic Center",       url: "https://realtattooreviews.com/reviews/kovak-cosmetic-center" },
    { "@type": "ListItem", position: 11, name: "MEDermis Laser Clinic",       url: "https://realtattooreviews.com/reviews/medermis-laser-clinic" },
    { "@type": "ListItem", position: 12, name: "Removery",                    url: "https://realtattooreviews.com/reviews/removery-bucktown" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",      item: "https://realtattooreviews.com" },
    { "@type": "ListItem", position: 2, name: "Providers", item: "https://realtattooreviews.com/providers" },
  ],
};

// Static config per brand. supabaseSlug is passed to getProviderDirectoryAggregates
// for live review counts, avg stars, and city lists.
const PROVIDER_STATIC: (DirectoryRow & { supabaseSlug: string })[] = [
  { name: "Arviv Medical Aesthetics",    slug: "arviv-medical-aesthetics", supabaseSlug: "arviv-medical-aesthetics", method: "Laser",     technology: "PicoWay",                      locations: "3 (Tampa, Miami, Ocala)",         locationCount: 3,   yearsActive: null, bestFor: "Med spa setting in Florida",                             footprint: "Regional",       setting: "Medical spa",               reviews: null, avgStars: null },
  { name: "Clarity Skin",               slug: "clarity-skin",             supabaseSlug: "clarity-skin",             method: "Laser",     technology: "PicoWay",                      locations: "1 (Draper, UT)",                  locationCount: 1,   yearsActive: null, bestFor: "Plastic surgeon-led med spa in Utah",                    footprint: "Single-market",  setting: "Medical spa",               reviews: null, avgStars: null },
  { name: "Clean Slate Ink",            slug: "clean-slate-ink",          supabaseSlug: "clean-slate-ink",          method: "Laser",     technology: "FDA-cleared",                  locations: "2 (Austin, Round Rock)",          locationCount: 2,   yearsActive: null, bestFor: "Affordable Austin-area specialist",                      footprint: "Regional",       setting: "Tattoo removal specialist", reviews: null, avgStars: null },
  { name: "DermSurgery Associates",     slug: "dermsurgery-associates",   supabaseSlug: "dermsurgery-associates",   method: "Laser",     technology: "PicoSure + Q-Switched Nd:YAG", locations: "12 (Greater Houston)",            locationCount: 12,  yearsActive: null, bestFor: "Dermatologist-supervised treatment",                     footprint: "Regional",       setting: "Dermatology practice",      reviews: null, avgStars: null },
  { name: "Enfuse Medical Spa",         slug: "enfuse-medical-spa",       supabaseSlug: "enfuse-medical-spa",       method: "Laser",     technology: "PicoWay",                      locations: "1 (Chicago)",                     locationCount: 1,   yearsActive: 16,   bestFor: "Inclusive med spa in Wicker Park",                       footprint: "Single-market",  setting: "Medical spa",               reviews: null, avgStars: null },
  { name: "Erasable Med Spa",           slug: "erasable-med-spa",         supabaseSlug: "erasable-med-spa",         method: "Laser",     technology: "Cutera enlighten",             locations: "1 (Tampa)",                       locationCount: 1,   yearsActive: 12,   bestFor: "Veteran-owned tattoo removal specialist",                footprint: "Single-market",  setting: "Tattoo removal specialist", reviews: null, avgStars: null },
  { name: "inkOUT",                     slug: "inkout",                   supabaseSlug: "inkout",                   method: "Non-laser", technology: "TEPR",                         locations: "5 (TX, IL, FL, UT)",              locationCount: 5,   yearsActive: 11,   bestFor: "Complete removal, all skin types, cosmetic tattoos",     footprint: "National chain", setting: "Tattoo removal specialist", reviews: null, avgStars: null },
  { name: "Inkfree, MD",               slug: "inkfree-md",               supabaseSlug: "inkfree-md",               method: "Laser",     technology: "Lutronic PicoPlus + Spectra",  locations: "1 (Houston)",                     locationCount: 1,   yearsActive: 14,   bestFor: "Physician-owned independent clinic",                     footprint: "Single-market",  setting: "Medical spa",               reviews: null, avgStars: null },
  { name: "Inklifters",                slug: "inklifters-aesthetica",     supabaseSlug: "inklifters-aesthetica",    method: "Laser",     technology: "PicoWay",                      locations: "1 (Pleasant Grove, UT)",          locationCount: 1,   yearsActive: 18,   bestFor: "Long-running Utah specialist",                           footprint: "Single-market",  setting: "Tattoo removal specialist", reviews: null, avgStars: null },
  { name: "Kovak Cosmetic Center",      slug: "kovak-cosmetic-center",    supabaseSlug: "kovak-cosmetic-center",    method: "Laser",     technology: "PicoWay",                      locations: "1 (Oakbrook Terrace, IL)",         locationCount: 1,   yearsActive: 27,   bestFor: "Established cosmetic practice, Chicago",                 footprint: "Single-market",  setting: "Medical spa",               reviews: null, avgStars: null },
  { name: "MEDermis Laser Clinic",      slug: "medermis-laser-clinic",    supabaseSlug: "medermis-laser-clinic",    method: "Laser",     technology: "Lutronic Spectra Pico Plus",    locations: "2 (Austin, San Antonio)",         locationCount: 2,   yearsActive: 19,   bestFor: "Tattoo-removal-only specialist, Austin/San Antonio",     footprint: "Regional",       setting: "Tattoo removal specialist", reviews: null, avgStars: null },
  { name: "Removery",                   slug: "removery-bucktown",        supabaseSlug: "removery",                 method: "Laser",     technology: "PicoWay",                      locations: "150+ (US, Canada, Australia)",     locationCount: 150, yearsActive: 7,    bestFor: "Largest US footprint, package pricing",                  footprint: "National chain", setting: "Tattoo removal specialist", reviews: null, avgStars: null },
];

const PENDING_PROVIDERS: PendingRow[] = [
  { name: "LaserAway",                  markets: "Houston, Chicago, Tampa" },
  { name: "Advanced Laser Aesthetics",  markets: "Chicago" },
  { name: "Pigment",                    markets: "Austin" },
  { name: "Think Again",               markets: "Austin" },
  { name: "Austin Laser Solutions",    markets: "Austin" },
  { name: "UNBRANDED",                  markets: "Austin" },
  { name: "ReversaTatt",               markets: "Tampa (3202 Henderson Blvd)" },
  { name: "Tampa Bay Tattoo Removal",  markets: "Clearwater (2561 Nursery Rd)" },
  { name: "St Pete Tattoo Removal",    markets: "Pinellas Park (8130 66th St N)" },
  { name: "EradiTatt",                 markets: "St. Petersburg (9210 4th St N)" },
];

const faqs = [
  {
    question: "How many tattoo removal providers does RealTattooReviews cover?",
    answer:
      "We currently track providers across Austin, Chicago, Houston, Tampa Bay, and Draper (Utah). The full list is in the provider table above. Coverage expands as we verify additional providers and markets.",
  },
  {
    question: "How is this page different from the reviews hub?",
    answer:
      "The providers page is a discovery hub for browsing and comparing providers at a high level. The reviews hub is the destination for reading full provider reviews, evidence summaries, and outcome patterns. Use this page to narrow your shortlist. Use the reviews hub to evaluate the shortlist in depth.",
  },
  {
    question: "Can a provider pay to be added or moved up the list?",
    answer:
      "No. Inclusion is based on whether the provider operates in a tracked market and meets our public-data verification standards. Sort order is user-controlled. Default sort is alphabetical.",
  },
  {
    question: "How often is provider data updated?",
    answer:
      "Provider review data is refreshed through periodic scraping of public Google business listings. The Data refreshed timestamp on the table shows the most recent update. For full details, see the methodology page.",
  },
  {
    question: "I am a provider. How do I request a correction or update?",
    answer:
      "Use the contact page and include the specific page, the field you want updated, and a public source we can verify against. We respond to provider correction requests within 5 business days.",
  },
];

export default async function ProvidersPage() {
  const supabaseSlugs = PROVIDER_STATIC.map((p) => p.supabaseSlug);
  const [aggregates, refreshedAt] = await Promise.all([
    getProviderDirectoryAggregates(supabaseSlugs),
    getDataFreshness(),
  ]);

  const providers: DirectoryRow[] = PROVIDER_STATIC.map(({ supabaseSlug, ...row }) => ({
    ...row,
    reviews: aggregates[supabaseSlug]?.totalReviews ?? null,
    avgStars: aggregates[supabaseSlug]?.avgStars ?? null,
  }));

  return (
    <>
      <Script
        id="providers-item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="providers-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen">

        {/* Hero */}
        <section className="hero-section border-b border-border py-12">
          <Container>
            <nav className="mb-4 text-[12px] text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-heading">Providers</span>
            </nav>
            <h1 className="text-[36px] font-bold text-heading">
              Tattoo Removal <span className="text-(--accent)">Providers</span>
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
              Browse tattoo removal providers reviewed by RealTattooReviews. Compare national chains, local specialists, and non-laser brands by method, technology, footprint, and reviews.
            </p>
          </Container>
        </section>

        {/* Intro + Provider Directory */}
        <section className="bg-surface py-14">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">Browse and Compare Providers</h2>
                <p className="mt-1 text-sm text-muted">Every provider evaluated under the same framework — no paid placement.</p>
              </div>
              <Link href="/comparisons" className="hidden text-sm font-medium text-accent hover:underline sm:block">
                All comparisons →
              </Link>
            </div>
            <div className="mb-6 max-w-2xl space-y-3 text-[14px] leading-relaxed text-muted">
              <p>
                RealTattooReviews tracks tattoo removal providers across multiple US markets. Every provider listed here is evaluated using the same{" "}
                <Link href="/methodology" className="text-accent hover:underline">scoring methodology</Link>{" "}
                regardless of brand size, advertising relationship, or business model.
              </p>
              <p>
                If you already know which city you are in, the{" "}
                <Link href="#browse-by-city" className="text-accent hover:underline">city pages</Link>{" "}
                are the faster path. If you are comparing two specific brands, the{" "}
                <Link href="/comparisons" className="text-accent hover:underline">comparison pages</Link>{" "}
                give you a head-to-head breakdown.
              </p>
            </div>
            <ProviderDirectory
              providers={providers}
              pendingProviders={PENDING_PROVIDERS}
              refreshedAt={refreshedAt}
            />
          </Container>
        </section>

        {/* How to Choose */}
        <section className="bg-bg py-14">
          <Container>
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-heading">How to Choose a Tattoo Removal Provider</h2>
              <p className="mt-1 text-sm text-muted">Five questions that change which provider is right for your case.</p>
            </div>
            <p className="mb-8 max-w-2xl text-[14px] leading-relaxed text-muted">
              Choosing a tattoo removal provider is mostly about matching method and protocol to your tattoo and your skin. Brand recognition and footprint matter less than they look. The five questions below cover the decisions that actually change which provider is right for you.
            </p>

            <div className="flex max-w-2xl flex-col gap-8">

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Decide on method first</h3>
                <div className="space-y-3 text-[14px] leading-relaxed text-muted">
                  <p>
                    Tattoo removal providers fall into two categories: laser and non-laser.
                  </p>
                  <p>
                    Most clinics in the US use laser systems. The current standard is picosecond lasers like PicoWay (Candela), PicoSure (Cynosure), or PiQo4 (Lumenis). Older Q-switched Nd:YAG systems are still in use at many independent practices. Laser works by shattering ink particles with light energy. The body then clears the fragments through the lymphatic system over weeks. Laser sessions are spaced 6 to 8 weeks apart. Standard body tattoos typically clear in 4 to 12 sessions depending on the laser platform, ink colors, and skin type.
                  </p>
                  <p>
                    A small number of providers use non-laser methods. inkOUT (Rejuvatek Medical) uses TEPR (Trans-Epidermal Pigment Release), which lifts ink out through the skin surface rather than shattering it with light. Saline removal uses osmotic lift and is most common for cosmetic tattoo and microblading cases. Neither non-laser method depends on ink color or interacts with melanin the way laser does.
                  </p>
                  <p>
                    Neither laser nor non-laser is universally better. The right choice depends on your tattoo, your skin type, your tolerance for the healing process, and the specific characteristics of your case. For the full method comparison, see the{" "}
                    <Link href="/comparisons/inkout-vs-removery" className="text-accent hover:underline">inkOUT vs Removery</Link>{" "}
                    head-to-head.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Check fit for your skin type</h3>
                <div className="space-y-3 text-[14px] leading-relaxed text-muted">
                  <p>
                    Laser tattoo removal carries a wavelength-versus-melanin interaction for darker Fitzpatrick skin types (IV through VI). The laser does not distinguish between tattoo pigment and natural melanin. Aggressive settings on darker skin can cause post-inflammatory hyperpigmentation or hypopigmentation. Picosecond lasers at 1064nm reduce this risk compared to Q-switched systems and shorter wavelengths, but they do not eliminate it.
                  </p>
                  <p>
                    Non-laser methods like TEPR and saline do not target melanin because they do not use light energy. For darker skin types, non-laser methods are structurally lower-risk. Laser is viable with experienced providers and conservative settings.
                  </p>
                  <p>
                    If you have Fitzpatrick V or VI skin, ask any laser provider about their specific protocol and case experience for darker tones before booking. For deeper guidance, see{" "}
                    <Link href="/categories/dark-skin-tattoo-removal" className="text-accent hover:underline">dark skin tattoo removal</Link>.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Check fit for your tattoo&apos;s colors</h3>
                <div className="space-y-3 text-[14px] leading-relaxed text-muted">
                  <p>
                    Laser performance varies by ink color. Black, dark blue, and red respond well to standard wavelengths (1064nm, 532nm). Green and blue-green require additional wavelengths (785nm on PicoWay, 755nm on PicoSure). Yellow and white inks respond poorly to all current laser wavelengths.
                  </p>
                  <p>
                    Non-laser methods like TEPR and saline are not wavelength-bound. Their performance does not depend on ink color absorption. For multi-color tattoos with hard-to-laser shades, non-laser methods avoid the color limitation entirely.
                  </p>
                  <p>
                    If your tattoo has significant yellow, white, or pastel content, ask laser providers which specific wavelengths their device supports.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Decide between complete removal and fading for cover-up</h3>
                <div className="space-y-3 text-[14px] leading-relaxed text-muted">
                  <p>
                    Complete removal and cover-up fading are different goals with different session counts and different pricing. Complete removal aims to eliminate the tattoo entirely. Fading reduces the ink enough that a cover-up tattoo can be applied over it, typically requiring fewer sessions.
                  </p>
                  <p>
                    Some providers price these as separate packages. Some price per session regardless of goal. If you are planning a cover-up, ask the provider how their cover-up protocol differs from complete removal and how that changes your total cost. For cover-up-specific guidance, see{" "}
                    <Link href="/categories/cover-up-prep" className="text-accent hover:underline">cover-up prep</Link>.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-[16px] font-bold text-heading">Decide between national footprint and local specialist</h3>
                <div className="space-y-3 text-[14px] leading-relaxed text-muted">
                  <p>
                    National chains like Removery and LaserAway offer standardized protocols, multi-location convenience, and (in Removery&apos;s case) package pricing that covers unlimited sessions. Local specialists and physician-led practices often offer more individualized treatment plans and direct provider continuity across your treatment series.
                  </p>
                  <p>
                    Footprint matters most if you travel often or may relocate during your treatment timeline, which can run 12 to 24 months. Specialist depth matters more if your case is unusual, your skin tone is in the higher Fitzpatrick range, or your tattoo has stubborn colors or scarring history.
                  </p>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* Browse by City */}
        <section id="browse-by-city" className="bg-surface py-14">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">Browse Providers by City</h2>
                <p className="mt-1 text-sm text-muted">Provider availability varies by city. Each page ranks every tracked provider in that market.</p>
              </div>
            </div>
            <p className="mb-6 text-[14px] leading-relaxed text-muted">
              Provider availability varies by city. The pages below compare every tracked provider in each market, including local specialists not listed in the national table above.
            </p>
            <ul className="flex flex-col gap-3 max-w-2xl">
              {[
                { href: "/cities/austin",  label: "Austin, TX" },
                { href: "/cities/chicago", label: "Chicago, IL" },
                { href: "/cities/houston", label: "Houston, TX" },
                { href: "/cities/tampa",   label: "Tampa Bay, FL", note: "covers Tampa, St. Petersburg, and Clearwater" },
              ].map(({ href, label, note }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 transition-all hover:border-accent/30 hover:shadow-sm"
                  >
                    <div>
                      <span className="font-medium text-heading">{label}</span>
                      {note && <span className="ml-2 text-[12px] text-muted">{note}</span>}
                    </div>
                    <span className="text-[13px] text-accent">Compare options →</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-muted">More cities will be added as our dataset expands.</p>
          </Container>
        </section>

        {/* Browse by Treatment Need */}
        <section className="bg-bg py-14">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">Browse by Treatment Need</h2>
                <p className="mt-1 text-sm text-muted">Providers and methods organized by what your case actually requires.</p>
              </div>
            </div>
            <p className="mb-6 text-[14px] leading-relaxed text-muted">
              Tattoo removal needs vary by case. The pages below cover providers and methods that handle specific situations.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl">
              {[
                { slug: "microblading-removal",      label: "Microblading and PMU removal",  desc: "Providers and methods for cosmetic tattoo removal" },
                { slug: "permanent-makeup-removal",  label: "Permanent makeup removal",      desc: "Eyebrow, lip, and eyeliner pigment removal" },
                { slug: "dark-skin-tattoo-removal",  label: "Dark skin tattoo removal",      desc: "Providers and methods for Fitzpatrick types V and VI" },
                { slug: "scarring-concerns",         label: "Scarring concerns",             desc: "Methods for scar-prone skin and existing scar tissue" },
                { slug: "complete-removal",          label: "Complete tattoo removal",       desc: "Methods and providers for full ink elimination" },
                { slug: "cover-up-prep",             label: "Cover-up preparation",          desc: "Fading protocols for new tattoo work" },
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
        <section className="bg-surface py-14">
          <Container>
            <div className="mb-6">
              <h2 className="text-[28px] font-bold text-heading">How We Cover Providers</h2>
              <p className="mt-1 text-sm text-muted">Our standards for inclusion, evaluation, and disclosure.</p>
            </div>
            <div className="max-w-2xl space-y-3 text-[14px] leading-relaxed text-muted">
              <p>
                RealTattooReviews tracks tattoo removal providers across the US based on coverage in their target markets, treatment method, and public review volume. Provider data is verified against each provider&apos;s published locations, public websites, and Google Business listings as of the page&apos;s last review date.
              </p>
              <p>
                We do not accept payment from providers for inclusion or placement in any listing on this site. Providers cannot edit, remove, or pre-approve their listings. Listings update as providers add or close locations and as new public review data becomes available.
              </p>
              <p>
                inkOUT (operated by Rejuvatek Medical) is a current advertising client of RealTattooReviews. This relationship is fully disclosed on the{" "}
                <Link href="/editorial-policy" className="text-accent hover:underline">editorial policy page</Link>.
                inkOUT is evaluated using the same scoring framework as every other provider. Advertising clients cannot pay for higher rankings, favorable review classifications, or preferential positioning.
              </p>
              <p>
                Read more about our review approach in our{" "}
                <Link href="/methodology" className="text-accent hover:underline">methodology</Link>.
                Read our{" "}
                <Link href="/editorial-policy" className="text-accent hover:underline">editorial policy</Link>{" "}
                for full disclosure on commercial relationships and review independence. To report an inaccuracy,{" "}
                <Link href="/contact" className="text-accent hover:underline">contact us</Link>.
              </p>
            </div>
          </Container>
        </section>

      </main>

      <FAQSection
        title="Frequently Asked Questions"
        faqs={faqs}
      />

      {/* Editorial note */}
      <section className="border-t border-border py-8">
        <Container>
          <p className="text-center text-[12px] leading-relaxed text-subtle">
            Provider data is sourced from public Google business listings and verified against provider-published materials. Review counts in the table reflect our internal review sample, not lifetime Google totals. inkOUT is a current advertising client of RealTattooReviews and is evaluated under the same framework as every other provider. See our{" "}
            <Link href="/methodology" className="text-accent hover:underline">methodology</Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="text-accent hover:underline">editorial policy</Link>{" "}
            for full details.
          </p>
        </Container>
      </section>
    </>
  );
}
