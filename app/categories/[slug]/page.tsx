import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryVisualCard from "@/components/category/CategoryVisualCard";
import { getCategory, getAllCategorySlugs } from "@/lib/page-data/categories";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

const FALLBACK_CATEGORY_SLUGS = [
  "color-ink-removal",
  "dark-skin-tattoo-removal",
  "scarring-concerns",
  "complete-removal",
  "cover-up-prep",
  "microblading-removal",
  "permanent-makeup-removal",
];

// ── Per-category card data ────────────────────────────────────────────────────

type CardData = {
  heading: string;
  fallbackImage: { src: string; alt: string };
};

const CARD_DATA: Record<string, CardData> = {
  "microblading-removal": {
    heading: "Microblading Removal",
    fallbackImage: {
      src: "/images/category-heroes/microblading-removal.webp",
      alt: "Eyebrow microblading tattoo before saline removal treatment",
    },
  },
  "permanent-makeup-removal": {
    heading: "PMU Removal",
    fallbackImage: {
      src: "/images/category-heroes/permanent-makeup-removal.webp",
      alt: "Permanent makeup lip blush and eyebrow tattoo removal process",
    },
  },
  "dark-skin-tattoo-removal": {
    heading: "Dark Skin Removal",
    fallbackImage: {
      src: "/images/category-heroes/dark-skin-tattoo-removal.webp",
      alt: "Laser tattoo removal on darker skin tone Fitzpatrick IV to VI",
    },
  },
  "color-ink-removal": {
    heading: "Color Ink Removal",
    fallbackImage: {
      src: "/images/category-heroes/color-tattoo-hero.jpeg",
      alt: "Vibrant anime-style color tattoo on woman's shoulder and back showing bold red teal and orange ink before laser color removal",
    },
  },
  "complete-removal": {
    heading: "Complete Removal",
    fallbackImage: {
      src: "/images/category-heroes/complete-removal-hero.jpeg",
      alt: "Complete tattoo removal result showing full ink clearance on skin",
    },
  },
  "cover-up-prep": {
    heading: "Cover-Up Prep",
    fallbackImage: {
      src: "/images/category-heroes/cover-up-prep.webp",
      alt: "Tattoo fading progress for cover-up preparation after laser sessions",
    },
  },
  "scarring-concerns": {
    heading: "Scarring Risk",
    fallbackImage: {
      src: "/images/category-heroes/scarring-concerns.webp",
      alt: "Skin texture assessment for tattoo removal scarring risk evaluation",
    },
  },
};

const DEFAULT_CARD: CardData = {
  heading: "Key Facts",
  fallbackImage: {
    src: "/images/categories/default.jpg",
    alt: "Tattoo removal",
  },
};

// ── Portable Text renderer ────────────────────────────────────────────────────

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans text-[15px] leading-relaxed text-(--muted)">{children}</p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-sans font-semibold text-[16px] text-(--ink) mt-4 mb-1">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 my-3">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 font-sans text-[14px] leading-relaxed text-(--muted)">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <Link href={value?.href ?? "#"} className="text-(--accent) hover:underline">
        {children}
      </Link>
    ),
  },
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  if (slugs.length > 0) return slugs.map((slug) => ({ slug }));
  return FALLBACK_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  const title =
    category.seoTitle ?? `${category.title}: Patient Reviews & Outcomes | RealTattooReviews`;
  const description = category.seoDescription ?? category.description;
  const seoImage = category.seoImage;
  return {
    title,
    description,
    openGraph: {
      title: `${category.title}: Patient Reviews & Outcomes`,
      description,
      ...(seoImage ? { images: [{ url: seoImage.url, alt: seoImage.alt ?? "" }] } : {}),
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const hasSections = category.sections && category.sections.length > 0;
  const faqs = category.faqItems && category.faqItems.length > 0 ? category.faqItems : undefined;
  const cardData = CARD_DATA[slug] ?? DEFAULT_CARD;

  // Use Sanity seoImage if available, otherwise fall back to per-slug static image
  const cardImage = category.seoImage
    ? { src: category.seoImage.url, alt: category.seoImage.alt ?? cardData.fallbackImage.alt }
    : cardData.fallbackImage;

  const h1 = (() => {
    const title = category.title as string;
    const match = title.match(/^(.*?)(tattoo removal|removal|concerns|prep)(.*)$/i);
    if (!match) return title;
    return <>{match[1]}<span className="text-(--accent)">{match[2]}</span>{match[3]}</>;
  })();

  const categoryHero = (
    <CategoryHero
      label={
        <>
          <Link href="/categories" className="hover:text-(--ink) transition-colors">
            Categories
          </Link>
          <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
          <span className="text-(--muted) font-normal normal-case tracking-normal">
            {category.title}
          </span>
        </>
      }
      title={h1}
      subtitle={category.description}
      visual={
        <CategoryVisualCard
          src={cardImage.src}
          alt={cardImage.alt}
        />
      }
    />
  );

  return (
    <GuideLayout
      breadcrumb={category.title}
      h1={h1}
      description={category.description}
      faqs={faqs}
      path={`/categories/${slug}`}
      hero={categoryHero}
    >
      {/* Intro */}
      {category.intro && (
        <div className="py-12">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
            {category.intro}
          </p>
        </div>
      )}

      {/* CMS sections */}
      {hasSections &&
        category.sections!.map((section, i) => (
          <GuideSection key={i} heading={section.heading}>
            {section.body && section.body.length > 0 ? (
              <PortableText value={section.body} components={ptComponents} />
            ) : null}
          </GuideSection>
        ))}

      {/* Empty state */}
      {!hasSections && (
        <div className="py-10">
          <p className="text-(--muted) text-[14px] italic">Content coming soon.</p>
        </div>
      )}

      {/* Related links */}
      {category.relatedLinks && category.relatedLinks.length > 0 && (
        <GuideRelatedLinks links={category.relatedLinks} />
      )}
    </GuideLayout>
  );
}
