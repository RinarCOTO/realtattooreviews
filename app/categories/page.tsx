import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import FAQSection from "@/components/sections/FAQSection";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Tattoo Removal by Category: Find the Right Method for Your Case | RealTattooReviews",
  description:
    "Browse tattoo removal by use case. Microblading, permanent makeup, dark skin, color ink, scarring concerns, complete removal, and cover-up prep guides with provider fit.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories",
  },
  openGraph: {
    title: "Tattoo Removal by Category: Find the Right Method for Your Case | RealTattooReviews",
    description:
      "Browse tattoo removal by use case. Microblading, permanent makeup, dark skin, color ink, scarring concerns, complete removal, and cover-up prep guides with provider fit.",
  },
};

const faqs = [
  {
    question: "Which category page should I start with?",
    answer:
      "Start with the category that matches your primary concern. If you have microblading to remove, start with microblading removal. If you have darker skin, start with dark skin tattoo removal. If you are not sure, start with complete removal for a general overview.",
  },
  {
    question: "Do category pages recommend specific providers?",
    answer:
      "Yes. Each category page identifies which providers and methods have documented positive outcomes for that case type. Recommendations are based on review-sample evidence and method fit, not on commercial relationships.",
  },
  {
    question: "Are these pages specific to a city?",
    answer:
      "No. Category pages cover methods and provider types nationally. For city-specific provider rankings by use case, see the city pages.",
  },
];

const GROUPS = [
  {
    id: "cosmetic",
    heading: "Cosmetic Tattoo Removal",
    intro:
      "Cosmetic tattoo removal is a different category from body tattoo removal. PMU pigments often contain iron oxides and titanium dioxide that can darken paradoxically under laser. Method choice matters more here than on standard body tattoos.",
    categories: [
      {
        slug: "microblading-removal",
        title: "Microblading Removal",
        description:
          "How to remove microblading safely. Covers saline vs laser for microblading, iron oxide oxidation risk, session counts, cost, and which providers handle eyebrow tattoo removal best.",
      },
      {
        slug: "permanent-makeup-removal",
        title: "Permanent Makeup Removal",
        description:
          "Removal of eyebrow tattoos, lip liner, lip blush, eyeliner, and other PMU. Covers method fit by pigment type, dark skin considerations, and provider selection for cosmetic cases.",
      },
    ],
  },
  {
    id: "skin-ink",
    heading: "Skin Type and Ink Considerations",
    intro:
      "Your skin type and ink colors change which methods and providers are safest and most effective. These pages help you filter by the characteristics that matter most.",
    categories: [
      {
        slug: "dark-skin-tattoo-removal",
        title: "Dark Skin Tattoo Removal",
        description:
          "Tattoo removal for Fitzpatrick skin types IV through VI. Covers the wavelength-versus-melanin interaction, which laser platforms are safest, non-laser alternatives that avoid melanin interaction entirely, and provider experience on darker skin tones.",
      },
      {
        slug: "color-ink-removal",
        title: "Color Ink Removal",
        description:
          "Removing green, blue, red, yellow, white, and multi-color tattoos. Covers which wavelengths handle which colors, which platforms offer the broadest color coverage, and non-laser alternatives that are not wavelength-bound.",
      },
    ],
  },
  {
    id: "goals",
    heading: "Treatment Goals",
    intro:
      "Your removal goal changes the provider, the session count, and the total cost. These pages help you match your goal to the right approach.",
    categories: [
      {
        slug: "complete-removal",
        title: "Complete Removal",
        description:
          "Methods and providers for full tattoo elimination. Covers laser session counts, non-laser alternatives, package pricing versus per-session, and how to set realistic expectations for complete clearance.",
      },
      {
        slug: "cover-up-prep",
        title: "Cover-Up Preparation",
        description:
          "Fading protocols for users planning a new tattoo over an existing one. Covers how many sessions are needed for adequate fading, how cover-up fading differs from complete removal, and how to coordinate with your tattoo artist.",
      },
    ],
  },
  {
    id: "risk",
    heading: "Risk Management",
    intro: null,
    categories: [
      {
        slug: "scarring-concerns",
        title: "Scarring Concerns",
        description:
          "For users who are scarring-sensitive or have existing scar tissue in the treatment area. Covers which methods carry the lowest scarring risk, how provider technique affects outcomes, and what to ask at consultation if scarring is your primary concern.",
      },
    ],
  },
];

export default function CategoriesPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home",       href: "https://realtattooreviews.com" },
    { name: "Categories", href: "https://realtattooreviews.com/categories" },
  ]);

  return (
    <main className="min-h-screen bg-(--bg)">
      <Script
        id="categories-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Hero */}
      <PageHero
        heroClassName="category-page-hero"
        label={
          <>
            <Link href="/" className="hover:text-(--ink) transition-colors">
              Home
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Categories
            </span>
          </>
        }
        title={<>Tattoo Removal <span className="text-(--accent)">Categories</span></>}
        subtitle="Browse tattoo removal by use case. Find the methods, providers, and protocols that fit your specific situation."
      />

      {/* Intro */}
      <section className="py-16">
        <Container>
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-heading">Find the Right Approach for Your Case</h2>
            <p className="mt-1 text-sm font-medium text-heading">
              Not every removal case is the same. Start with your situation.
            </p>
          </div>
          <div className="max-w-2xl space-y-3">
            <p className="text-[15px] leading-relaxed text-body">
              The method, provider, and protocol that work best depend on what you are removing, what your skin looks like, and what you are trying to accomplish. The category pages below organize tattoo removal by use case so you can start with your situation and find the providers and methods that fit.
            </p>
            <p className="text-[15px] leading-relaxed text-body">
              Each category page covers which methods work best for that case type, which providers have documented positive outcomes, what the risks are, and what to ask at consultation.
            </p>
          </div>
        </Container>
      </section>

      {/* Category groups */}
      {GROUPS.map((group) => (
        <section key={group.id} className="py-14">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">{group.heading}</h2>
                {group.intro && (
                  <p className="mt-1 text-sm font-medium text-heading max-w-2xl">
                    {group.intro}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-border bg-white p-5 shadow-card transition-colors hover:border-accent hover:bg-accent/8"
                >
                  <p className="font-semibold text-heading text-[14px] transition-colors group-hover:text-accent">{cat.title}</p>
                  <p className="text-[13px] leading-relaxed font-medium text-heading flex-1">{cat.description}</p>
                  <span className="text-[13px] font-medium text-accent">
                    Browse {cat.title.toLowerCase()} →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* How categories connect */}
      <section className="py-14">
        <Container>
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-heading">How Categories Connect to the Rest of the Site</h2>
            <p className="mt-1 text-sm font-medium text-heading">
              Category pages are one layer in the site's decision framework.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                label: "City pages",
                body: "show which providers in your metro handle your specific case type.",
                links: [
                  { label: "Austin", href: "/cities/austin" },
                  { label: "Chicago", href: "/cities/chicago" },
                  { label: "Houston", href: "/cities/houston" },
                  { label: "Tampa Bay", href: "/cities/tampa" },
                ],
              },
              {
                label: "Comparison pages",
                body: "put methods and brands side by side.",
                links: [{ label: "All comparisons", href: "/comparisons" }],
              },
              {
                label: "Guide pages",
                body: "cover the practical details of healing, aftercare, scarring, and saline removal.",
                links: [{ label: "All guides", href: "/guides" }],
              },
              {
                label: "Provider pages",
                body: "give you the full review picture for individual brands.",
                links: [{ label: "All providers", href: "/providers" }],
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 rounded-xl border border-border bg-white p-5 shadow-card">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-[14px] leading-relaxed text-body">
                  <span className="font-semibold text-heading">{item.label}</span>{" "}
                  {item.body}{" "}
                  {item.links.map((link, i) => (
                    <span key={link.href}>
                      {i > 0 && ", "}
                      <Link href={link.href} className="text-accent hover:underline">
                        {link.label}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] leading-relaxed text-muted">
            Every category page, city page, comparison page, and provider page is evaluated using the same{" "}
            <Link href="/methodology" className="text-accent hover:underline">methodology</Link>.
            See our{" "}
            <Link href="/editorial-policy" className="text-accent hover:underline">editorial policy</Link>{" "}
            for full details.
          </p>
        </Container>
      </section>

      <FAQSection faqs={faqs} className="" />

      {/* Editorial note */}
      <section className="py-8">
        <Container>
          <p className="max-w-2xl text-[12px] leading-relaxed text-subtle">
            Category pages are based on the same review-sample evidence, clinical literature, and scoring methodology used across the site. See our{" "}
            <Link href="/methodology" className="text-accent hover:underline">methodology</Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="text-accent hover:underline">editorial policy</Link>{" "}
            for full details.
          </p>
        </Container>
      </section>
    </main>
  );
}
