import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllCategories } from "@/lib/page-data/categories";
import { categories as mockCategories } from "@/lib/mock-data/categories";

export const metadata: Metadata = {
  title: "Tattoo Removal Categories: Browse by Treatment Type",
  description:
    "Browse tattoo removal reviews by category. Complete removal, color ink, dark skin, microblading, permanent makeup, cover-up prep, and scarring concerns.",
  openGraph: {
    title: "Tattoo Removal Categories: Browse by Treatment Type",
    description: "Browse reviews by category: complete removal, color ink, dark skin, and more.",
  },
};

export default async function CategoriesPage() {
  const sanityCategories = await getAllCategories();
  const categories = sanityCategories.length > 0 ? sanityCategories : mockCategories;

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Categories</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Browse verified patient reviews by treatment type, skin concern, or removal goal.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
              >
                <h2 className="mb-2 text-[16px] font-semibold leading-snug text-heading group-hover:text-accent">
                  {category.title}
                </h2>
                <p className="mb-4 flex-1 text-[14px] leading-relaxed text-muted">
                  {category.description}
                </p>
                <span className="text-sm font-medium text-accent">Browse reviews</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
