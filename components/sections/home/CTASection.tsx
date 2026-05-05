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
            href="/guides"
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition-all hover:border-accent hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-heading">Treatment Guides</p>
              <p className="mt-1 text-base font-semibold text-heading">How tattoo removal actually works</p>
              <p className="mt-1.5 text-sm text-heading">
                Laser, saline, aftercare, scarring, and side effects explained in plain language.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
              Read the guides <ChevronRightIcon className="size-4" />
            </span>
          </Link>

        </div>
      </Container>
    </section>
  );
}
