import Link from "next/link";
import Container from "@/components/layout/Container";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

export default function CTASection() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2">

          <Link
            href="/cost"
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition-all hover:border-accent hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-heading">Cost Guide</p>
              <p className="mt-1 text-base font-semibold text-heading">How much does tattoo removal cost?</p>
              <p className="mt-1.5 text-sm text-heading">
                Session pricing, package deals, what affects cost, and what to ask before you book.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
              Read the cost guide <ChevronRightIcon className="size-4" />
            </span>
          </Link>

          <Link
            href="/before-and-after"
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition-all hover:border-accent hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-heading">Before &amp; After</p>
              <p className="mt-1 text-base font-semibold text-heading">Removal outcome research by case type</p>
              <p className="mt-1.5 text-sm text-heading">
                Compare result context across providers, ink types, and treatment methods.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
              Browse results <ChevronRightIcon className="size-4" />
            </span>
          </Link>

        </div>
      </Container>
    </section>
  );
}
