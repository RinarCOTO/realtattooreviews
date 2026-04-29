import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/layout/Container";
import GuideFAQSection from "@/components/guide/GuideFAQSection";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Our Methodology: How RealTattooReviews Ranks Providers | RealTattooReviews",
  description:
    "How RealTattooReviews collects, verifies, scores, and updates tattoo removal provider data. Scoring logic, review verification, weighting, update cadence, and corrections.",
  alternates: {
    canonical: "https://realtattooreviews.com/methodology",
  },
  openGraph: {
    title: "Our Methodology: How RealTattooReviews Ranks Providers",
    description:
      "How RealTattooReviews collects, verifies, scores, and updates tattoo removal provider data.",
  },
};

const faqs = [
  {
    question: "How does RealTattooReviews rank providers?",
    answer:
      "Providers are ranked using a six-factor framework: review sample size and sentiment, use-case fit signals, method specialization, technology fit, pricing transparency, and honest fit framing. The framework is applied consistently across all providers. Rankings are not pay-for-placement.",
  },
  {
    question: "How are review scores calculated?",
    answer:
      "Review scores are composite scores built from star ratings, sentiment classification (from review text), scarring signals, use-case tags, and sample-size confidence adjustments. They are not simple star averages.",
  },
  {
    question: "Are provider ratings weighted by review count?",
    answer:
      "Yes. Larger review samples produce higher-confidence scores. Providers with fewer than 5 classified reviews are flagged as Review sample pending and are not ranked until sufficient data accumulates.",
  },
  {
    question: "How do you verify tattoo removal reviews?",
    answer:
      "Reviews are sourced from public Google business listings. We classify review text for sentiment, use case, and scarring signals. Reviews that appear to be spam, incentivized, or fraudulent are flagged for manual review.",
  },
  {
    question: "How often is provider data updated?",
    answer:
      "Review data is refreshed through periodic scraping of Google business listings. The Data refreshed timestamp on each page shows the most recent update. Updates are not real-time.",
  },
  {
    question: "Do providers pay to be listed or ranked higher?",
    answer:
      "No. No provider can pay for listing, ranking, or favorable treatment. inkOUT is a current advertising client and is evaluated under the same scoring framework as every other provider. See the editorial policy for full disclosure.",
  },
  {
    question: "How do I report incorrect information?",
    answer:
      "Use the contact page to report errors, outdated information, or unfair assessments. We review all correction requests and update the site when errors are confirmed.",
  },
  {
    question: "What makes a review verified?",
    answer:
      "We source reviews from public Google business listings. Google has its own review moderation system. We classify review text for additional signals but do not independently verify reviewer identity.",
  },
];

const RANKING_FACTORS = [
  {
    number: "1",
    title: "Review sample size and sentiment",
    body: "Larger review samples carry more weight than smaller ones. Sentiment is classified from review text (Positive, Negative, Neutral, Mixed) rather than from star ratings alone. Star ratings are captured but sentiment classification provides a more granular signal than a single number.",
  },
  {
    number: "2",
    title: "Use-case fit signals",
    body: "Reviews are tagged by use case: Complete removal, Cover-up fading, Microblading, Color ink, and Other. Providers with repeated positive outcomes in a specific use case receive credit for that fit. A provider with strong Complete-removal results ranks differently from one with strong Microblading results.",
  },
  {
    number: "3",
    title: "Method specialization",
    body: "Tattoo-removal-only specialists are weighted differently from med spas where tattoo removal is one of many services. Specialization typically correlates with deeper expertise and higher treatment-specific volume per clinician.",
  },
  {
    number: "4",
    title: "Technology fit for the case",
    body: "The scoring framework accounts for which technology each provider uses (picosecond laser, Q-switched laser, TEPR, saline, or other methods) and how that technology fits the cases the provider handles. A picosecond laser provider treating multi-color tattoos is evaluated differently from a Q-switched provider treating standard black ink.",
  },
  {
    number: "5",
    title: "Pricing transparency and access",
    body: "Providers with publicly visible pricing or clear consultation-to-quote processes receive a small positive weight versus providers that withhold pricing information entirely.",
  },
  {
    number: "6",
    title: "Honest fit framing",
    body: "Every provider profile on the site includes a best for and a less ideal for section. The ranking framework rewards breadth of documented fit rather than universal claims.",
  },
];

export default function MethodologyPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", href: "https://realtattooreviews.com" },
    { name: "Methodology", href: "https://realtattooreviews.com/methodology" },
  ]);

  return (
    <main className="min-h-screen bg-bg">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Hero */}
      <section className="border-b border-border bg-feathering-mist py-14">
        <Container>
          <p className="mb-3 text-sm text-muted">
            <Link href="/" className="hover:text-accent">Home</Link>
            {" / "}
            <span className="text-heading">Methodology</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">Our Methodology</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            How RealTattooReviews collects, verifies, scores, and updates tattoo removal provider data.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="py-14">
        <Container>
          <div className="mx-auto max-w-2xl space-y-12">

            {/* Intro */}
            <div className="space-y-4">
              <p className="text-[15px] leading-relaxed text-body">
                RealTattooReviews ranks tattoo removal providers using a structured, repeatable process. This page explains how that process works. It covers how we collect review data, how we calculate scores, how we verify and moderate reviews, how we extract use-case signals, how often we update, and how errors are corrected.
              </p>
              <p className="text-[15px] leading-relaxed text-body">
                This is not a marketing page. It is an operating document. The goal is to make our scoring system understandable, consistent, and defensible. Every provider page, city page, category page, and comparison page on this site is built on the same framework described here.
              </p>
              <p className="text-[15px] leading-relaxed text-muted">
                If you want to know our editorial standards and advertising disclosures, see the{" "}
                <Link href="/editorial-policy" className="font-medium text-accent hover:underline">editorial policy</Link>.
                If you want to contact us about an error or dispute, see the{" "}
                <Link href="/contact" className="font-medium text-accent hover:underline">contact page</Link>.
              </p>
            </div>

            {/* How We Rank */}
            <div className="space-y-6">
              <h2 className="text-[24px] font-bold text-heading">How We Rank Tattoo Removal Providers</h2>
              <p className="text-[15px] leading-relaxed text-body">
                Provider rankings on RealTattooReviews are generated from structured analysis of public review data. Rankings are not pay-for-placement. No provider can pay to rank higher. Rankings are not editorial opinion. They are produced from a scoring framework applied consistently across all providers.
              </p>
              <p className="text-[15px] font-semibold text-heading">The ranking framework uses six weighted factors:</p>
              <div className="space-y-4">
                {RANKING_FACTORS.map((f) => (
                  <div key={f.number} className="flex gap-4 rounded-xl border border-border bg-surface p-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {f.number}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-heading">{f.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How Scores Are Calculated */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">How Review Scores Are Calculated</h2>
              <p className="text-[15px] leading-relaxed text-body">
                Review scores on RealTattooReviews are not simple star averages. They are composite scores built from multiple data points extracted from each review.
              </p>

              <div className="rounded-xl border border-border bg-surface p-5">
                <p className="mb-3 text-[14px] font-semibold uppercase tracking-wider text-muted">Data points per review</p>
                <ul className="space-y-2">
                  {[
                    "Star rating (1 to 5)",
                    "Result rating (Positive, Negative, Neutral, Mixed) classified from review text",
                    "Scarring mentioned (Yes, No, or Positive) classified from review text",
                    "Use case (Complete, Cover-up, Microblading, Color, Other) classified from review text",
                    "Method used (PicoWay, PicoSure, Q-switched, TEPR, Saline, Other) classified from review text or provider records",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-body">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[15px] font-semibold text-heading">Sentiment classification</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Each review's text is classified for result sentiment independently of the star rating. A 5-star review that describes a negative outcome is classified as Negative. A 3-star review that describes a positive outcome with a minor complaint is classified as Positive. Star ratings and sentiment classifications are both stored but sentiment classification drives the scoring framework.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Sample-size confidence</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Providers with larger review samples produce higher-confidence scores. A provider with 50 classified reviews generates a more reliable score than a provider with 6. The scoring framework applies a confidence adjustment that reduces the weight of small-sample scores in provider rankings. Providers with fewer than 5 reviews are flagged as "Review sample pending" and are not ranked until sufficient data accumulates.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Location-level scoring</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Scores are calculated at the location level, not the brand level. A national chain with 10 locations receives a separate score for each location based on that location's review sample. Brand-level aggregation (used on comparison pages) sums location-level data across cities.
                  </p>
                </div>
              </div>
            </div>

            {/* Review Sources */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">Review Sources</h2>
              <p className="text-[15px] leading-relaxed text-body">
                RealTattooReviews currently sources review data from public Google business listings. Reviews are scraped from each provider's Google business profile and stored in our internal review dataset.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-accent">What we use</p>
                  <ul className="space-y-2">
                    {[
                      "Public Google reviews for each provider location",
                      "Review text for sentiment classification, use-case tagging, and scarring signal extraction",
                      "Star ratings",
                      "Review dates for freshness weighting",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted">What we do not use</p>
                  <ul className="space-y-2">
                    {[
                      "Reviews from provider-owned websites (potential selection bias)",
                      "Reviews from affiliate platforms",
                      "Reviews submitted directly to RealTattooReviews",
                      "Reviews from Yelp, RealSelf, or other platforms (not currently in scope)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-[15px] leading-relaxed text-body">
                <span className="font-semibold text-heading">Sample-size cap.</span>{" "}
                The current scrape captures up to 50 of the most recent reviews per provider location. Total lifetime review counts on Google are higher than the sample sizes shown on our pages. We display sample sizes transparently alongside all provider scores.
              </p>
            </div>

            {/* Verification */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">How We Verify Reviews and Provider Data</h2>
              <p className="text-[15px] leading-relaxed text-body">
                Verification operates at two levels: review-level and provider-level.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[15px] font-semibold text-heading">Review-level verification</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Reviews are sourced from public Google business listings. Google has its own review moderation system. We do not independently verify the identity of each reviewer. We do classify review text for sentiment, use case, and scarring signals using a structured classification process. Reviews that appear to be spam, incentivized, or obviously fraudulent (based on text patterns, timing clusters, or content anomalies) are flagged for manual review and may be excluded from scoring.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Provider-level verification</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Provider information (name, address, technology used, services offered) is verified against Google Places data and, where available, the provider's own published materials. Addresses are cross-referenced with Google Places listings. Technology claims are verified against published provider information and review text mentions.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted">What we do not verify</p>
                  <ul className="space-y-2">
                    {[
                      "Whether individual reviewers actually received treatment at the provider",
                      "Whether individual reviewers have financial relationships with the provider",
                      "Whether provider-published pricing is current",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Signals */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">How We Analyze Scarring, Pain, and Use-Case Signals</h2>
              <p className="text-[15px] leading-relaxed text-body">
                Review text is analyzed for three signal categories beyond basic sentiment.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[15px] font-semibold text-heading">Scarring signals</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Each review is classified for scarring mentions: "Yes" (scarring reported), "No" (no scarring mentioned), or "Positive" (reviewer explicitly praises lack of scarring or good skin outcome). Scarring signal rates per provider inform the scarring-related sections on provider profiles, category pages, and comparison pages.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Pain signals</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Pain mentions are extracted from review text where reviewers describe the treatment experience. Pain is not scored on a numeric scale. Instead, pain language is classified qualitatively and used to inform the pain-related sections on guide pages and method comparisons.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Use-case tagging</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Use-case tagging classifies each review with the case it describes: Complete removal, Cover-up fading, Microblading/PMU, Color ink, or Other. Use-case tags drive the "best for" fit assessments on provider profiles and the use-case win counts on city pages and comparison pages.
                  </p>
                </div>
              </div>
            </div>

            {/* Weighting */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">Weighting and Thresholds</h2>
              <p className="text-[15px] leading-relaxed text-body">
                The scoring framework applies review weighting rules and thresholds to prevent misleading scores.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Minimum sample threshold",
                    body: "Providers with fewer than 5 classified reviews are not ranked. They appear with a Review sample pending badge until sufficient data is available.",
                  },
                  {
                    title: "Recency weighting",
                    body: "More recent reviews carry slightly more weight than older reviews within the same sample. This reflects the reality that provider quality, staff, and technology can change over time.",
                  },
                  {
                    title: "Sentiment over stars",
                    body: "Sentiment classification from review text is weighted more heavily than the star rating in scoring. This prevents star-inflation (where most reviews are 5 stars regardless of described outcome) from distorting provider scores.",
                  },
                  {
                    title: "Use-case depth bonus",
                    body: "Providers with documented positive outcomes across multiple use cases (Complete, Cover-up, Microblading, Color) receive a small breadth bonus in overall scoring versus providers with evidence in only one use case.",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <p className="text-[15px] font-semibold text-heading">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-body">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Frequency */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">Update Frequency and Data Freshness</h2>
              <p className="text-[15px] leading-relaxed text-body">
                Review data is refreshed periodically through automated scraping of public Google business listings. The current update cadence is not real-time. Data refreshes occur on a rolling basis, with the most recently refreshed timestamp displayed at the bottom of each dynamic data component on the site.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-accent">What triggers an update</p>
                  <ul className="space-y-2">
                    {[
                      "Scheduled scrape cycle (the primary refresh mechanism)",
                      "Manual refresh when a provider or user reports outdated information",
                      "New provider added to coverage (initial scrape)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted">What does not trigger an update</p>
                  <ul className="space-y-2">
                    {[
                      "Provider requests for immediate re-scoring",
                      "Advertising relationship changes",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-body">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-body">
                Provider scores, rankings, and review evidence on the site reflect the most recent scrape data available. Users should check the "Data refreshed" timestamp on each page for the date of the most recent data.
              </p>
            </div>

            {/* Editorial Independence */}
            <div className="space-y-5">
              <h2 className="text-[24px] font-bold text-heading">Editorial Independence and Corrections</h2>
              <p className="text-[15px] leading-relaxed text-body">
                RealTattooReviews maintains editorial independence from all providers, including advertising clients. The scoring framework, ranking methodology, and review classification process described on this page apply equally to every provider regardless of advertising relationship.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[15px] font-semibold text-heading">Advertising disclosure</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    inkOUT (operated by Rejuvatek Medical) is a current advertising client of RealTattooReviews. This relationship is fully disclosed on the{" "}
                    <Link href="/editorial-policy" className="font-medium text-accent hover:underline">editorial policy page</Link>.
                    inkOUT is evaluated using the same scoring framework as every other provider. Advertising clients cannot pay for higher rankings, favorable review classifications, or preferential positioning in city pages or comparison pages.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">No pay-for-placement</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    No provider can pay to be listed, ranked, or featured on RealTattooReviews. All provider inclusions are based on the presence of the provider in our review dataset or in verified Google Places data.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Corrections process</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    If you believe any information on the site is incorrect, outdated, or unfair, you can report it through the{" "}
                    <Link href="/contact" className="font-medium text-accent hover:underline">contact page</Link>.
                    We review all correction requests and update the site when errors are confirmed. Providers, users, and third parties can all submit corrections. The corrections process is the same regardless of whether the submitter is an advertising client.
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-heading">Challenge process</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">
                    Providers who believe their score is inaccurate can request a review of their scoring data. The request is processed through the{" "}
                    <Link href="/contact" className="font-medium text-accent hover:underline">contact page</Link>.
                    We will share the review-sample data that produced the score (aggregated, not individual reviews) and explain how the scoring framework was applied. We will correct errors when found. We will not change scores based on provider disagreement with the framework itself.
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial note */}
            <div className="rounded-xl border border-border bg-surface p-5 text-[14px] leading-relaxed text-muted">
              <p className="font-semibold text-heading">Editorial note</p>
              <p className="mt-2">
                This page describes the scoring and review methodology used across RealTattooReviews as of the publication date. The methodology may evolve as data sources expand, classification methods improve, and user feedback is incorporated. Any material changes to the methodology will be reflected on this page. See our{" "}
                <Link href="/editorial-policy" className="font-medium text-accent hover:underline">editorial policy</Link>{" "}
                for advertising disclosures and our{" "}
                <Link href="/contact" className="font-medium text-accent hover:underline">contact page</Link>{" "}
                for corrections.
              </p>
            </div>

          </div>
        </Container>
      </section>

      <GuideFAQSection faqs={faqs} />
    </main>
  );
}
