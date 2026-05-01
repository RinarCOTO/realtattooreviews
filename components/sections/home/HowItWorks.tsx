import Link from "next/link";
import Container from "@/components/layout/Container";
import { type PortableTextBlock } from "@portabletext/react";
import HowItWorksCards from "./HowItWorksCards";

// What this component can receive from the outside
type Props = {
  steps?: Array<{ stepNumber: string; title: string; body: PortableTextBlock[] }>;
  //  ↑                   ↑               ↑              ↑
  //  optional       "01","02","03"    card title     rich text (supports bold, italic)
};

// Fallback content: plain strings, used when Sanity has nothing published yet
type FallbackStep = { stepNumber: string; title: string; body: string };
const DEFAULT_STEPS: FallbackStep[] = [
  { stepNumber: "01", title: "We source public Google reviews",             body: "Reviews are collected from Google business listings for every provider and location we track. We do not accept reviews submitted to us. We do not use provider-owned testimonials." },
  { stepNumber: "02", title: "We classify each review for signals that matter", body: "Every review is tagged for sentiment (positive, negative, mixed), use case (complete removal, cover-up, microblading, color), and scarring mentions. This turns a star rating into a structured comparison." },
  { stepNumber: "03", title: "You compare before you book",                  body: "City pages rank providers. Comparison pages put methods and brands side by side. Category pages filter by your specific case. Guides cover healing, aftercare, and scarring. You make the decision." },
];

// Visual decoration per step: stays hardcoded, never comes from Sanity
const STEP_DECORATIONS = [
  {
    color: "text-accent",
    iconBg: "bg-accent-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    color: "text-secondary",
    iconBg: "bg-secondary-soft",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    color: "text-primary",
    iconBg: "bg-primary/10",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function HowItWorks({ steps }: Props) {
  // If Sanity sent steps → use them. Otherwise → use plain-string defaults.
  const activeSteps: Array<{ stepNumber: string; title: string; body: PortableTextBlock[] | string }> =
    steps && steps.length > 0 ? steps : DEFAULT_STEPS;

  return (
    <section className="pt-4 pb-6">
      <Container>
        <div className="mb-4 relative text-center">
          <h2 className="font-(family-name:--font-satoshi) text-[28px] font-bold text-heading">How reviews work</h2>
          <p className="mt-1 font-(family-name:--font-inter) text-sm font-medium text-heading">
            Google reviews, structured for faster clinic comparison.
          </p>
          <Link href="/methodology" className="absolute right-0 top-0 hidden font-(family-name:--font-inter) text-sm font-medium text-accent hover:underline sm:block">
            Our methodology →
          </Link>
        </div>

        <HowItWorksCards steps={activeSteps} />

        {/* Editorial note */}
        <div
          className="mt-6 flex items-start gap-3 rounded-2xl px-6 py-4"
          style={{
            border: "1.5px solid transparent",
            background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #C8E6E4, #F5DDD0, #C8E6E4) border-box",
          }}
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-muted">
            No paid placement. No hidden negatives.{" "}
            <Link href="/editorial-policy" className="font-medium text-accent hover:underline">
              Read our editorial policy
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
