import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/layout/Container";
import { guides } from "@/lib/mock-data/guides";
import { assetPath } from "@/lib/utils/asset";

const guidesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tattoo Removal Treatment Guides",
  description: "Patient-written guides on tattoo removal aftercare, healing, side effects, and more.",
  numberOfItems: guides.length,
  itemListElement: guides.map((guide, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://realtattooreviews.com/guides/${guide.slug}`,
    name: guide.title,
    description: guide.description,
  })),
};

export default function IsItWorthIt() {
  return (
    <section aria-label="Treatment Guides" className="border-t border-border bg-bg py-16">
      <Script
        id="guides-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesListSchema) }}
      />
      <Container>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-bold text-heading">
              Treatment Guides
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              What to expect before, during, and after tattoo removal — written
              from real patient experiences, not clinic marketing.
            </p>
          </div>
          <Link
            href="/guides"
            className="shrink-0 text-sm font-medium text-accent hover:underline"
          >
            Browse all guides →
          </Link>
        </div>

        {/* Top row — 2 hero cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {guides.slice(0, 2).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group relative flex aspect-3/2 w-full overflow-hidden rounded-xl bg-card-dark"
            >
              {/* Image — z-0 */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <Image
                  src={assetPath(guide.image)}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Gradient + text — always on top */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-6"
                style={{
                  zIndex: 1,
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)",
                }}
              >
                {/* Guide badge — top right */}
                <div className="ml-auto rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Guide
                  </span>
                </div>

                {/* Text — bottom */}
                <div>
                  <h3
                    className="text-xl font-bold leading-snug tracking-wide uppercase"
                    style={{ color: "#ffffff" }}
                  >
                    {guide.title}
                  </h3>
                  <p
                    className="mt-2 text-xs leading-relaxed line-clamp-2"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {guide.description}
                  </p>
                  <p
                    className="mt-3 text-xs font-semibold"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    Read guide →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row — 3 secondary cards */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(2).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group relative flex aspect-4/3 w-full overflow-hidden rounded-xl bg-card-dark"
            >
              {/* Image — z-0 */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <Image
                  src={assetPath(guide.image)}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Gradient + text — always on top */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-5"
                style={{
                  zIndex: 1,
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)",
                }}
              >
                {/* Guide badge — top right */}
                <div className="ml-auto rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Guide
                  </span>
                </div>

                {/* Text — bottom */}
                <div>
                  <h3
                    className="text-base font-bold leading-snug tracking-wide uppercase"
                    style={{ color: "#ffffff" }}
                  >
                    {guide.title}
                  </h3>
                  <span className="sr-only">{guide.description}</span>
                  <p
                    className="mt-2.5 text-xs font-semibold"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    Read guide →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-subtle">
          Guides are based on patterns from verified patient reviews, not clinical claims.{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            How we evaluate outcomes →
          </Link>
        </p>

      </Container>
    </section>
  );
}
