import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllGuides } from "@/lib/page-data/guides";
import { guides as mockGuides } from "@/lib/mock-data/guides";

export const metadata: Metadata = {
  title: "Tattoo Removal Guides: What Patients Need to Know",
  description:
    "In-depth guides on tattoo removal aftercare, healing, side effects, scarring, and saline removal. Written from real patient experiences.",
  openGraph: {
    title: "Tattoo Removal Guides: What Patients Need to Know",
    description: "In-depth guides on aftercare, healing, side effects, and more.",
  },
};

export default async function GuidesPage() {
  const sanityGuides = await getAllGuides();
  const guides = sanityGuides.length > 0 ? sanityGuides : mockGuides;

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Guides</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            What to expect before, during, and after tattoo removal. Written from real patient experiences, not clinic marketing.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
              >
                <h2 className="mb-2 text-[16px] font-semibold leading-snug text-heading group-hover:text-accent">
                  {guide.title}
                </h2>
                <p className="mb-4 flex-1 text-[14px] leading-relaxed text-muted">
                  {guide.description}
                </p>
                <span className="text-sm font-medium text-accent">Read guide</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
