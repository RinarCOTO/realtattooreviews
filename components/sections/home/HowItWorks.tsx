import Link from "next/link";
import Container from "@/components/layout/Container";

const steps = [
  {
    number: "01",
    title: "Patients submit reviews",
    body: "Verified patients submit structured reviews covering outcomes, session consistency, pricing transparency, and communication quality.",
    color: "text-accent",
    iconBg: "bg-accent-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We verify and score",
    body: "Each review is cross-referenced and scored independently. Providers cannot edit, remove, or influence their ratings — including negative ones.",
    color: "text-secondary",
    iconBg: "bg-secondary-soft",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "You compare and decide",
    body: "Browse side-by-side ratings, read real patient accounts, and use our comparison tools to find the right clinic before you book anything.",
    color: "text-primary",
    iconBg: "bg-primary/10",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-bg border-y border-border py-16">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-primary">How reviews work</h2>
            <p className="mt-1 text-sm text-muted">
              Independent, structured, and transparent by design.
            </p>
          </div>
          <Link href="/methodology" className="hidden text-sm font-medium text-secondary hover:underline sm:block">
            Full methodology →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-6 bg-border sm:block translate-x-full" />
              )}

              {/* Icon */}
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.iconBg} ${step.color}`}>
                {step.icon}
              </div>

              {/* Step number */}
              <span className={`mt-4 block text-xs font-semibold uppercase tracking-widest ${step.color}`}>
                Step {step.number}
              </span>

              <h3 className="mt-1.5 text-base font-semibold text-heading">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Editorial note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-surface px-6 py-4">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-muted">
            We publish negative findings without exception. No provider pays for coverage, placement, or ratings. —{" "}
            <Link href="/editorial-policy" className="font-medium text-accent hover:underline">
              Read our editorial policy
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
