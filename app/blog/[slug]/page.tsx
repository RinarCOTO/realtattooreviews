import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import ReadableText from "@/components/layout/ReadableText";
import BlobBackground from "@/components/ui/BlobBackground";
import Tag from "@/components/ui/Tag";
import { getBlogPost, getAllBlogSlugs } from "@/lib/page-data/blog";
import { blogPosts as mockPosts } from "@/lib/mock-data/blog-posts";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

// PortableText renderers for Sanity-backed blog posts. Vertical rhythm matches
// the static blog post template: generous top margin on H2 to create section
// breaks, comfortable paragraph leading, and accent-bulleted unordered lists.
// Tailwind Typography (prose) is not installed in this project, so every
// element is styled explicitly.
const blogPtComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-[17px] leading-relaxed text-(--ink) my-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.15] tracking-[-0.02em] text-(--ink) mt-12 mb-5 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans font-semibold text-[17px] leading-[1.25] text-(--ink) mt-7 mb-2">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 my-5 pl-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 my-5 pl-6 font-sans text-[17px] leading-relaxed text-(--ink)">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 font-sans text-[17px] leading-relaxed text-(--ink)">
        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-(--ink)">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href) && !href.includes("realtattooreviews.com");
      return (
        <Link
          href={href}
          className="text-(--accent) underline underline-offset-2 decoration-(--accent)/30 hover:decoration-(--accent)"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    },
  },
};

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
            <ReadableText className="mx-auto">
              <article className="py-12">
                {isSanity && sanityPost.body ? (
                  <PortableText
                    value={sanityPost.body}
                    components={blogPtComponents}
                  />
                ) : (
                  <div className="space-y-4">
                    {(mockPost?.body ?? []).map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-sans text-[17px] leading-relaxed text-(--ink)"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            </ReadableText>
          </Container>
        </section>

      </main>
    </BlobBackground>
  );
}
