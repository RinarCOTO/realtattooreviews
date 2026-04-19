"use client";

import { useState } from "react";
import Link from "next/link";
import Tag from "@/components/ui/Tag";

type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

const POSTS_PER_PAGE = 6;

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  function goTo(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
          >
            <div className="mb-3 flex items-center gap-2">
              <Tag label={post.category} />
              <span className="text-xs text-subtle">{post.date}</span>
            </div>
            <h2 className="mb-2 text-[17px] font-semibold leading-snug text-heading group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mb-4 flex-1 text-[14px] leading-relaxed text-muted">
              {post.description}
            </p>
            <span className="text-sm font-medium text-accent">Read full article →</span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md border border-border px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goTo(page)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                page === currentPage
                  ? "border-accent bg-accent text-white"
                  : "border-border text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-border px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
