import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import GuideLayout from "@/components/guide/GuideLayout";
import { getGuide, getAllGuideSlugs } from "@/lib/page-data/guides";
import { guides as mockGuides } from "@/lib/mock-data/guides";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const sanitySlugs = await getAllGuideSlugs();
  if (sanitySlugs.length > 0) return sanitySlugs.map((slug) => ({ slug }));
  return mockGuides.map((g) => ({ slug: g.slug }));
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
      ...(guide.seoImage?.url ? { images: [{ url: guide.seoImage.url, alt: guide.seoImage.alt ?? "" }] } : {}),
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const faqs = guide.faqItems && guide.faqItems.length > 0 ? guide.faqItems : undefined;

  return (
    <GuideLayout
      breadcrumb={guide.title}
      h1={guide.title}
      description={guide.description}
      faqs={faqs}
      path={`/guides/${slug}`}
    >
      {guide.author && (
        <div className="py-5 border-b border-(--line)">
          <p className="font-mono text-[11px] tracking-widest uppercase text-(--muted)">
            By {guide.author}
          </p>
        </div>
      )}
      {guide.body && guide.body.length > 0 ? (
        <div className="py-10 prose prose-neutral max-w-none text-[15px] leading-relaxed text-(--muted) [&_h2]:font-sans [&_h2]:font-semibold [&_h2]:text-(--ink) [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-(--ink) [&_a]:text-(--accent) [&_a]:underline">
          <PortableText value={guide.body} />
        </div>
      ) : (
        <div className="py-10">
          <p className="text-(--muted) text-[14px] italic">Content coming soon.</p>
        </div>
      )}
    </GuideLayout>
  );
}
