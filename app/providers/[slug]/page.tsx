import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  getLocationSlug,
  getMultiLocationBrands,
  getProviderBySlug,
  getProvidersByBrand,
  getSingleLocationProviders,
  brandToSlug,
} from "@/lib/providers";
import { getReviewsByProvider } from "@/lib/data/reviews";
import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";

type Props = { params: Promise<{ slug: string }> };

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function citySlugFromMarket(market: string): string {
  return market.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-");
}

function profileType(provider: Provider): string {
  if (provider.brand) return "Multi-location provider";
  if (provider.tags.includes("Medical")) return "Medical practice";
  if (provider.tags.includes("Medical Spa")) return "Medical spa";
  return "Independent provider";
}

function averageRating(providers: Provider[]): string {
  return (
    providers.reduce((sum, provider) => sum + provider.rating, 0) / providers.length
  ).toFixed(1);
}

function totalReviewCount(providers: Provider[]): number {
  return providers.reduce((sum, provider) => sum + provider.reviewCount, 0);
}

function treatmentMethods(providers: Provider[]): string[] {
  return unique(
    providers.flatMap((provider) =>
      provider.tags.filter((tag) =>
        ["TEPR", "PicoWay", "PicoSure", "Q-Switch", "Spectra", "Fotona", "Laser", "Non-Laser"].includes(tag)
      )
    )
  );
}

function serviceFitItems(providers: Provider[]): string[] {
  const tags = unique(providers.flatMap((provider) => provider.tags));
  const specialties = providers.map((provider) => provider.specialty?.toLowerCase() ?? "");
  const items: string[] = [];

  if (specialties.some((specialty) => specialty.includes("non-laser"))) {
    items.push("Useful for users specifically comparing non-laser removal options against laser clinics.");
  }
  if (specialties.some((specialty) => specialty.includes("laser"))) {
    items.push("Relevant for users comparing laser-based removal providers, especially where device choice matters.");
  }
  if (tags.includes("Medical") || tags.includes("Medical Spa")) {
    items.push("Likely to appeal more to users who want a more clinical or medically supervised treatment environment.");
  }
  if (tags.includes("Affordable")) {
    items.push("Worth checking if price sensitivity is part of the decision and you want lower-cost options in the market.");
  }
  if (tags.includes("National Chain")) {
    items.push("Best evaluated alongside city-specific alternatives because chain consistency can vary by location.");
  }

  if (items.length === 0) {
    items.push("Best used as a profile and routing page before moving into reviews, city comparisons, and pricing research.");
  }

  return items.slice(0, 3);
}

function pricingPosture(providers: Provider[]): string {
  const tags = unique(providers.flatMap((provider) => provider.tags));
  const summaries = providers.map((provider) => provider.summary.toLowerCase());

  if (summaries.some((summary) => summary.includes("higher price point"))) {
    return "This provider appears to sit toward the premium end of the market. Users should compare it against city-specific alternatives and the national cost guide.";
  }

  if (tags.includes("Affordable")) {
    return "This provider appears to compete on accessibility or lower-cost positioning more than premium branding.";
  }

  if (tags.includes("National Chain")) {
    return "Pricing is likely more standardized than smaller independents, but still worth checking against city-level competition and the cost guide.";
  }

  if (tags.includes("Medical") || tags.includes("Medical Spa")) {
    return "This provider appears to have a more clinical or premium setup, which may influence pricing relative to standalone laser clinics.";
  }

  return "Use this page to understand the provider profile, then use the review page and cost guide to evaluate whether the pricing posture feels justified.";
}

function reviewSourcesLine(reviews: Review[]): string {
  const sources = unique(reviews.map((review) => review.source).filter(Boolean)) as string[];
  if (sources.length === 0) return "Public-source reviews";
  if (sources.length === 1) return `${sources[0]} reviews`;
  return `${sources.join(", ")} reviews`;
}

function faqItems(name: string, market?: string) {
  const locationLine = market ? ` in ${market}` : "";

  return [
    {
      q: `What is ${name}?`,
      a: `${name} is covered here as a provider profile. This page is meant to show who they are, where they operate, and how to continue into deeper review or city-level research.`,
    },
    {
      q: `Where should I read reviews for ${name}${locationLine}?`,
      a: `Use the dedicated review page for verdicts, review evidence, pricing context, and alternatives. This provider page is the profile and routing layer, not the main review destination.`,
    },
    {
      q: `How should I compare ${name} with other providers?`,
      a: `Start with footprint, treatment type, and service profile here, then move into the review page and the relevant city page to compare local alternatives more directly.`,
    },
  ];
}

function SectionHeading({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-6 max-w-2xl">
      <h2 className="text-[24px] font-bold text-heading">{title}</h2>
      {body ? <p className="mt-1 text-sm text-muted">{body}</p> : null}
    </div>
  );
}

function JumpNav({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <section className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur">
      <Container>
        <nav className="flex gap-3 overflow-x-auto py-3 text-sm whitespace-nowrap">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-muted transition-colors hover:border-accent/30 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const matchedBrand = getMultiLocationBrands().find((brand) => brandToSlug(brand) === slug);
  if (matchedBrand) {
    const locations = getProvidersByBrand(matchedBrand);
    const totalReviews = totalReviewCount(locations);
    const avgRating = averageRating(locations);

    return {
      title: `${matchedBrand} Provider Profile: ${locations.length} Locations | RealTattooReviews`,
      description: `Browse the ${matchedBrand} provider profile, location footprint, treatment methods, and links to deeper review and city-level research. ${totalReviews} sourced reviews tracked across ${locations.length} locations.`,
      openGraph: {
        title: `${matchedBrand} Provider Profile`,
        description: `${locations.length} locations · ${totalReviews} sourced reviews tracked · ${avgRating} avg rating snapshot.`,
      },
    };
  }

  const provider = getProviderBySlug(slug);
  if (!provider) return {};

  return {
    title: `${provider.name} Provider Profile: ${provider.market} | RealTattooReviews`,
    description: `Provider profile for ${provider.name} in ${provider.market}. Explore service profile, treatment methods, and links to reviews and local comparison research.`,
    openGraph: {
      title: `${provider.name} Provider Profile`,
      description: `${provider.market} · ${provider.reviewCount} sourced reviews tracked · ${provider.rating} avg rating snapshot.`,
    },
  };
}

export async function generateStaticParams() {
  const brandParams = getMultiLocationBrands().map((brand) => ({ slug: brandToSlug(brand) }));
  const singleParams = getSingleLocationProviders().map((provider) => ({ slug: provider.slug }));
  return [...brandParams, ...singleParams];
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;

  const matchedBrand = getMultiLocationBrands().find((brand) => brandToSlug(brand) === slug);
  if (matchedBrand) {
    const locations = getProvidersByBrand(matchedBrand);
    const reviews = await getReviewsByProvider(slug);
    return <BrandProfilePage brand={matchedBrand} slug={slug} locations={locations} reviews={reviews} />;
  }

  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  const reviews = await getReviewsByProvider(slug);
  return <SingleProviderProfilePage provider={provider} reviews={reviews} />;
}

function BrandProfilePage({
  brand,
  slug,
  locations,
  reviews,
}: {
  brand: string;
  slug: string;
  locations: Provider[];
  reviews: Review[];
}) {
  const avgRating = averageRating(locations);
  const reviewCount = totalReviewCount(locations);
  const methods = treatmentMethods(locations);
  const fitItems = serviceFitItems(locations);
  const cities = unique(locations.map((location) => location.market));
  const faq = faqItems(brand);
  const jumpItems = [
    { label: "Overview", href: "#overview" },
    { label: "Locations", href: "#locations" },
    { label: "Methods", href: "#methods" },
    { label: "Service fit", href: "#service-fit" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#review-handoff" },
    { label: "Cities", href: "#cities" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/providers" className="hover:text-accent">Providers</Link>
            {" / "}
            <span className="text-heading">{brand}</span>
          </p>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),320px]">
            <div>
              <h1 className="text-[36px] font-bold text-heading">{brand}</h1>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
                Neutral provider profile for {brand}. Use this page to understand who they are, where they operate, and how to move into reviews, city comparisons, and pricing research.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/reviews/${slug}`}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Read reviews
                </Link>
                <a
                  href="#locations"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-body transition-colors hover:border-accent/40 hover:text-accent"
                >
                  Browse locations
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="text-xs uppercase tracking-wide text-subtle">Provider snapshot</p>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Type</p>
                  <p className="mt-1 font-semibold text-heading">Multi-location provider</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Location count</p>
                  <p className="mt-1 font-semibold text-heading">{locations.length} locations</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Average rating snapshot</p>
                  <p className="mt-1 font-semibold text-heading">{avgRating} / 5</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Tracked review volume</p>
                  <p className="mt-1 font-semibold text-heading">{reviewCount} sourced reviews</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JumpNav items={jumpItems} />

      <section id="overview" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Provider Overview"
            body="This page is the profile layer, not the main review destination. Its job is to help users understand the provider footprint and route them into the right next page."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5">
              <h2 className="text-[20px] font-bold text-heading">What this provider is</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {brand} operates as a multi-location tattoo removal provider. The value of this page is understanding how broad the brand footprint is and where to continue for actual review-led evaluation.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h2 className="text-[20px] font-bold text-heading">Coverage snapshot</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {cities.length} markets currently appear in the coverage set. This makes {brand} a provider users are likely to encounter repeatedly when comparing national brands and local options.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="locations" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Locations and Footprint"
            body="This is the main reason the profile page exists. Users should be able to see where the provider operates before deciding which city or review path to open next."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/providers/${slug}/${getLocationSlug(location)}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-heading">{location.market}</p>
                    <p className="mt-0.5 text-xs text-muted">{location.location}</p>
                  </div>
                  <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                    {location.rating}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-muted line-clamp-3">
                  {location.summary}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-divider pt-3">
                  <span className="text-xs text-subtle">{location.reviewCount} reviews tracked</span>
                  <span className="text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
                    View location →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="methods" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Treatment Methods and Technology"
            body="This section stays descriptive. It should help users understand what kind of provider this is without turning into a verdict."
          />
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm leading-relaxed text-body">
              {methods.length > 0
                ? `${brand} appears in the current dataset with these method or technology cues: ${methods.join(", ")}.`
                : `${brand} appears as a tattoo removal provider, but the current dataset does not yet support a more specific technology profile.`}
            </p>
          </div>
        </Container>
      </section>

      <section id="service-fit" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Service Fit and Use Cases"
            body="This should cautiously suggest where the provider may be most relevant without slipping into review-page judgment."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {fitItems.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-body">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="pricing" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Pricing and Financing Overview"
            body="This is a light pricing posture block, not a full pricing review."
          />
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm leading-relaxed text-body">{pricingPosture(locations)}</p>
            <Link href="/cost" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              Compare against the national cost guide →
            </Link>
          </div>
        </Container>
      </section>

      <section id="review-handoff" className="border-b border-border bg-surface py-12">
        <Container>
          <SectionHeading
            title="Reviews and Deeper Research"
            body="This is the handoff block. Users should move from the provider profile into the dedicated review page when they want real evaluation."
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),280px]">
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="text-sm leading-relaxed text-body">
                {reviewCount} sourced reviews are currently tracked for {brand}. The dedicated review page is where verdicts, review evidence, pricing context, and alternatives are consolidated.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/reviews/${slug}`}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Read full review
                </Link>
                <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                  {reviewSourcesLine(reviews)}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="text-xs uppercase tracking-wide text-subtle">Best next steps</p>
              <ul className="mt-4 space-y-2 text-sm text-body">
                <li>• Read the branded review page</li>
                <li>• Compare cities where the brand operates</li>
                <li>• Check pricing against the cost guide</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="cities" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Cities and Local Research Paths"
            body="Users often shift from provider discovery into city-level comparison. This section should make that easy."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((market) => (
              <Link
                key={market}
                href={`/cities/${citySlugFromMarket(market)}`}
                className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 transition-all hover:border-accent/30 hover:shadow-sm"
              >
                <div>
                  <p className="font-semibold text-heading">{market}</p>
                  <p className="mt-0.5 text-xs text-muted">Compare this provider against local alternatives</p>
                </div>
                <svg className="h-4 w-4 text-subtle" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="py-12">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            body="This FAQ keeps the page profile-led and routes users into the review layer when they want actual evaluation."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-surface p-5">
                <p className="text-[14px] font-semibold text-heading">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

function SingleProviderProfilePage({
  provider,
  reviews,
}: {
  provider: Provider;
  reviews: Review[];
}) {
  const fitItems = serviceFitItems([provider]);
  const faq = faqItems(provider.name, provider.market);
  const jumpItems = [
    { label: "Overview", href: "#overview" },
    { label: "Methods", href: "#methods" },
    { label: "Service fit", href: "#service-fit" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#review-handoff" },
    { label: "City", href: "#city" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/providers" className="hover:text-accent">Providers</Link>
            {" / "}
            <span className="text-heading">{provider.name}</span>
          </p>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),320px]">
            <div>
              <h1 className="text-[36px] font-bold text-heading">{provider.name}</h1>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
                Neutral provider profile for {provider.name}. Use this page to understand the clinic profile and move into the review page or city comparison page when you are ready to evaluate quality.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/reviews/${provider.slug}`}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Read reviews
                </Link>
                <Link
                  href={`/cities/${citySlugFromMarket(provider.market)}`}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-body transition-colors hover:border-accent/40 hover:text-accent"
                >
                  See city comparison
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="text-xs uppercase tracking-wide text-subtle">Provider snapshot</p>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Type</p>
                  <p className="mt-1 font-semibold text-heading">{profileType(provider)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Market</p>
                  <p className="mt-1 font-semibold text-heading">{provider.market}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Rating snapshot</p>
                  <p className="mt-1 font-semibold text-heading">{provider.rating.toFixed(1)} / 5</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-subtle">Tracked review volume</p>
                  <p className="mt-1 font-semibold text-heading">{provider.reviewCount} sourced reviews</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JumpNav items={jumpItems} />

      <section id="overview" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Provider Overview"
            body="This is the profile layer. It should tell users what kind of clinic this is before they move into the review-led decision page."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5">
              <h2 className="text-[20px] font-bold text-heading">What this provider is</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{provider.summary}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h2 className="text-[20px] font-bold text-heading">Profile summary</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {provider.name} appears here as a {profileType(provider).toLowerCase()} in {provider.market}. This page is for provider profile context, not the main review verdict.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="methods" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Treatment Methods and Technology"
            body="Keep this descriptive. Users should understand the provider’s method profile without getting a verdict here."
          />
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm leading-relaxed text-body">
              {provider.specialty}. Current technology or method tags in the dataset: {treatmentMethods([provider]).join(", ") || "No specific technology tags available"}.
            </p>
          </div>
        </Container>
      </section>

      <section id="service-fit" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Service Fit and Use Cases"
            body="This section gives cautious fit signals without turning into a review verdict."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {fitItems.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-body">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="pricing" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="Pricing and Financing Overview"
            body="This is a light pricing posture block. The detailed evaluation still belongs on the review page and the national cost page."
          />
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm leading-relaxed text-body">{pricingPosture([provider])}</p>
            <Link href="/cost" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              Compare against the national cost guide →
            </Link>
          </div>
        </Container>
      </section>

      <section id="review-handoff" className="border-b border-border bg-surface py-12">
        <Container>
          <SectionHeading
            title="Reviews and Deeper Research"
            body="This is the handoff block. Users should move into the dedicated review page when they want an actual verdict."
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),280px]">
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="text-sm leading-relaxed text-body">
                {provider.reviewCount} sourced reviews are currently tracked for {provider.name}. The dedicated review page is where verdicts, review evidence, pricing context, and alternatives are consolidated.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/reviews/${provider.slug}`}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Read full review
                </Link>
                <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                  {reviewSourcesLine(reviews)}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="text-xs uppercase tracking-wide text-subtle">Best next steps</p>
              <ul className="mt-4 space-y-2 text-sm text-body">
                <li>• Read the full provider review</li>
                <li>• Compare local alternatives in the city page</li>
                <li>• Check the cost guide before booking</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="city" className="border-b border-border py-12">
        <Container>
          <SectionHeading
            title="City and Local Research Path"
            body="Users often shift from provider profile research into local comparison. This section makes that next step explicit."
          />
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm leading-relaxed text-body">
              {provider.name} is covered in {provider.market}. Use the city page to compare this clinic against other local options before relying on a single provider in isolation.
            </p>
            <Link
              href={`/cities/${citySlugFromMarket(provider.market)}`}
              className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
            >
              See local comparison coverage →
            </Link>
          </div>
        </Container>
      </section>

      <section id="faq" className="py-12">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            body="This FAQ keeps the page profile-led and routes users into the review page when they want actual evaluation."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-surface p-5">
                <p className="text-[14px] font-semibold text-heading">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
