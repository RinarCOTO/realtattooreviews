import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import BlobBackground from "@/components/ui/BlobBackground";
import Tag from "@/components/ui/Tag";
import { getBlogPost, getAllBlogSlugs } from "@/lib/page-data/blog";
import { blogPosts as mockPosts } from "@/lib/mock-data/blog-posts";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

const STATIC_BLOG_PAGES = new Set(["how-to-choose-a-tattoo-removal-provider"]);

export async function generateStaticParams() {
  const sanitySlugs = await getAllBlogSlugs();
  const mockSlugs = mockPosts.map((p) => p.slug);
  const all = Array.from(new Set([...sanitySlugs, ...mockSlugs]));
  return all.filter((slug) => !STATIC_BLOG_PAGES.has(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityPost = await getBlogPost(slug);
  const post = sanityPost ?? mockPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | RealTattooReviews`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      ...(sanityPost?.seoImage?.url && {
        images: [{ url: sanityPost.seoImage.url, width: 1200, height: 630, alt: sanityPost.seoImage.alt }],
      }),
    },
    alternates: {
      canonical: `https://realtattooreviews.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const sanityPost = await getBlogPost(slug);
  const mockPost = mockPosts.find((p) => p.slug === slug);
  const post = sanityPost ?? mockPost;
  if (!post) notFound();

  const isSanity = !!sanityPost;
  const pagePath = `/blog/${slug}`;
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Blog", href: "/blog" },
    { name: post.title, href: pagePath },
  ]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: `https://realtattooreviews.com${pagePath}`,
    author: {
      "@type": "Organization",
      name: "RealTattooReviews",
      url: "https://realtattooreviews.com",
    },
    publisher: {
      "@type": "Organization",
      name: "RealTattooReviews",
      url: "https://realtattooreviews.com",
    },
  };

  return (
    <BlobBackground>
      <main className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <PageHero
          label={
            <>
              <Link href="/blog" className="hover:text-(--ink) transition-colors">
                Blog
              </Link>
              <span className="text-(--ink) font-normal normal-case tracking-normal">/</span>
              <span className="text-(--ink) font-normal normal-case tracking-normal">
                {post.title}
              </span>
            </>
          }
          title={post.title}
          subtitle={post.description}
        >
          <div className="flex items-center gap-3">
            <Tag label={post.category} />
            <span className="text-xs text-(--ink)">{post.date}</span>
            <span className="text-xs text-(--ink)">By {post.author}</span>
          </div>
        </PageHero>

        {isSanity && sanityPost.featuredImage?.url && (
          <div className="border-b border-(--line) bg-white">
            <Container>
              <img
                src={sanityPost.featuredImage.url}
                alt={sanityPost.featuredImage.alt ?? post.title}
                className="w-full max-h-120 object-cover rounded-xl"
              />
            </Container>
          </div>
        )}

        <section className="py-6 bg-white">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="py-12 space-y-5">
                {isSanity && sanityPost.body ? (
                  <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-(--ink)">
                    <PortableText value={sanityPost.body} />
                  </div>
                ) : (
                  (mockPost?.body ?? []).map((paragraph, index) => (
                    <p key={index} className="font-sans text-[15px] leading-relaxed text-(--ink)">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </div>
          </Container>
        </section>

      </main>
    </BlobBackground>
  );
}
