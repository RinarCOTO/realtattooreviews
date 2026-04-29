import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const hasSections = category.sections && category.sections.length > 0;
  const faqs = category.faqItems && category.faqItems.length > 0 ? category.faqItems : undefined;

  return (
    <GuideLayout
      breadcrumb={category.title}
      h1={category.title}
      description={category.description}
      faqs={faqs}
      path={`/categories/${slug}`}
    >
      {/* Intro box */}
      {category.intro && (
        <div className="py-12">
          <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
            <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
              {category.intro}
            </p>
          </div>
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
