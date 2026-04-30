import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { getAllBlogPosts } from "@/lib/page-data/blog";
import { blogPosts as mockPosts } from "@/lib/mock-data/blog-posts";

export const metadata: Metadata = {
  title: "Blog: Tattoo Removal Research & Updates",
  description:
    "Editorial articles on tattoo removal research, provider trends, method comparisons, and patient outcomes. Written by the RealTattooReviews team.",
  openGraph: {
    title: "Blog: Tattoo Removal Research & Updates",
    description:
      "Editorial articles on tattoo removal research, provider trends, and patient outcomes.",
  },
  alternates: {
    canonical: "https://realtattooreviews.com/blog",
  },
};

export default async function BlogPage() {
  const sanityPosts = await getAllBlogPosts();
  const posts = sanityPosts.length > 0 ? sanityPosts : mockPosts;

  return (
    <main className="min-h-screen bg-bg">
      <PageHero
        label="Blog"
        title={<>RTR <span className="text-(--accent)">Blog</span></>}
        subtitle="Research, provider trends, and editorial coverage on tattoo removal."
      />

      <section className="py-12">
        <Container>
          <BlogGrid posts={posts} />
        </Container>
      </section>
    </main>
  );
}
