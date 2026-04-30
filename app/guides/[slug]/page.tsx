import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import { getGuide, getAllGuideSlugs } from "@/lib/page-data/guides";
import { guides as mockGuides } from "@/lib/mock-data/guides";

export const dynamicParams = false;
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

const FALLBACK_GUIDE_SLUGS = [
  "saline-tattoo-removal",
  "tattoo-removal-aftercare",
  "tattoo-removal-healing-process",
  "tattoo-removal-scarring",
  "tattoo-removal-side-effects",
];

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  if (slugs.length > 0) return slugs.map((slug) => ({ slug }));
  return FALLBACK_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  const title = guide.seoTitle ?? `${guide.title} | RealTattooReviews`;
  const description = guide.seoDescription ?? guide.description;
  return {
    title,
    description,
    alternates: { canonical: `https://realtattooreviews.com/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description,
      ...(guide.seoImage?.url
        ? { images: [{ url: guide.seoImage.url, alt: guide.seoImage.alt ?? "" }] }
        : {}),
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

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  let guide = await getGuide(slug);

  // Fall back to mock data if Sanity has no content yet
  if (!guide) {
    const mock = mockGuides.find((g) => g.slug === slug);
    if (!mock) notFound();
    guide = { title: mock.title, slug: mock.slug, description: mock.description };
  }

  const hasSections = guide.sections && guide.sections.length > 0;
  const hasLegacyBody = guide.body && guide.body.length > 0;
  const faqs = guide.faqItems && guide.faqItems.length > 0 ? guide.faqItems : undefined;

  return (
    <GuideLayout
      breadcrumb={guide.title}
      h1={guide.title}
      description={guide.description}
      faqs={faqs}
      path={`/guides/${slug}`}
    >
      {/* Intro box */}
      {guide.intro && (
        <div className="py-12">
          <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
            <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
              {guide.intro}
            </p>
          </div>
        </div>
      )}

      {/* Author */}
      {guide.author && !hasSections && (
        <div className="py-5 border-b border-(--line)">
          <p className="font-mono text-[11px] tracking-widest uppercase text-(--muted)">
            By {guide.author}
          </p>
        </div>
      )}

      {/* CMS sections */}
      {hasSections &&
        guide.sections!.map((section, i) => (
          <GuideSection key={i} heading={section.heading}>
            {section.body && section.body.length > 0 ? (
              <PortableText value={section.body} components={ptComponents} />
            ) : null}
          </GuideSection>
        ))}

      {/* Legacy rich-text body */}
      {!hasSections && hasLegacyBody && (
        <div className="py-10 space-y-4">
          <PortableText value={guide.body!} components={ptComponents} />
        </div>
      )}

      {/* Empty state */}
      {!hasSections && !hasLegacyBody && (
        <div className="py-10">
          <p className="text-(--muted) text-[14px] italic">Content coming soon.</p>
        </div>
      )}

      {/* Related links */}
      {guide.relatedLinks && guide.relatedLinks.length > 0 && (
        <GuideRelatedLinks links={guide.relatedLinks} />
      )}
    </GuideLayout>
  );
}
