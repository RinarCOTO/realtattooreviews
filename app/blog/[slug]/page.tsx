import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Container from "@/components/layout/Container";
import Tag from "@/components/ui/Tag";
import { getBlogPost, getAllBlogSlugs } from "@/lib/page-data/blog";
import { blogPosts as mockPosts } from "@/lib/mock-data/blog-posts";
import FAQSection from "@/components/sections/FAQSection";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const sanitySlugs = await getAllBlogSlugs();
  const mockSlugs = mockPosts.map((p) => p.slug);
  const all = Array.from(new Set([...sanitySlugs, ...mockSlugs]));
  return all.map((slug) => ({ slug }));
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
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const sanityPost = await getBlogPost(slug);
  const mockPost = mockPosts.find((p) => p.slug === slug);
  const post = sanityPost ?? mockPost;
  if (!post) notFound();

  const isSanity = !!sanityPost;

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/blog" className="hover:text-accent">Blog</Link>
            {" / "}
            <span className="text-heading">{post.title}</span>
          </p>
          <div className="mb-3 flex items-center gap-3">
            <Tag label={post.category} />
            <span className="text-xs text-subtle">{post.date}</span>
            <span className="text-xs text-subtle">By {post.author}</span>
          </div>
          <h1 className="text-[36px] font-bold leading-tight text-heading">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {post.description}
          </p>
        </Container>
      </section>

      {isSanity && sanityPost.featuredImage?.url && (
        <div className="border-b border-border bg-surface">
          <Container>
            <img
              src={sanityPost.featuredImage.url}
              alt={sanityPost.featuredImage.alt ?? post.title}
              className="w-full max-h-120 object-cover rounded-xl"
            />
          </Container>
        </div>
      )}

      <section className="py-12">
        <Container>
          <div className="max-w-2xl space-y-5">
            {isSanity && sanityPost.body ? (
              <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-body">
                <PortableText value={sanityPost.body} />
              </div>
            ) : (
              (mockPost?.body ?? []).map((paragraph, index) => (
                <p key={index} className="text-[15px] leading-relaxed text-body">
                  {paragraph}
                </p>
              ))
            )}
          </div>
        </Container>
      </section>

      <FAQSection
        title="Common Questions"
        faqs={[
          {
            question: "How many sessions does tattoo removal take?",
            answer: "Most tattoos take 6 to 10 sessions for significant fading, though complex or colorful tattoos on darker skin tones can require 12 to 15. The Kirby-Desai scale is the best predictor. Ask your provider to score your tattoo before booking.",
          },
          {
            question: "Does tattoo removal hurt?",
            answer: "It's often described as a rubber band snap repeated over the same area. Pain varies by body location. Ribs and ankles are most sensitive, upper arms and thighs are more tolerable. Topical numbing cream is widely available and reduces surface discomfort significantly.",
          },
          {
            question: "How much does tattoo removal cost?",
            answer: "Per-session costs typically range from $150–$300 at national chains. Multiply by your estimated session count for a realistic total. Unlimited packages ($500–$800 flat) are worth considering for complex tattoos.",
          },
          {
            question: "What's the difference between Q-switch and picosecond lasers?",
            answer: "Picosecond lasers fire shorter pulses, which means less heat and faster clearance, especially for stubborn blue, green, and yellow inks. Q-switch lasers are effective for black ink and are more widely available. For multicolor tattoos, picosecond technology has a meaningful edge.",
          },
        ]}
      />
    </main>
  );
}
