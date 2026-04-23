import { sanity } from "@/lib/sanity";

export type SanityProviderReview = {
  providerName: string;
  slug: string;
  // Verdict table
  method?: string;
  technology?: string;
  locationsValue?: string;
  typicalSessions?: string;
  typicalTimeline?: string;
  healingPerSession?: string;
  pricingModel?: string;
  yearsOperating?: string;
  publicReviewsAnalyzed?: string;
  bestFor?: string[];
  lessIdealFor?: string[];
  // Editorial sections
  verdictLead?: string;
  doesWell?: string[];
  usersHesitate?: string[];
  whatMakesDifferent?: string;
  pricingBody?: string;
  comparisonBody?: string;
  bestForDetails?: string[];
  lessIdealForDetails?: string[];
  lastReviewed?: string;
  // FAQ
  faqItems?: { question: string; answer: string }[];
  // SEO overrides
  seoTitle?: string;
  seoDescription?: string;
};

const PROVIDER_REVIEW_QUERY = `*[_type == "providerReview" && slug.current == $slug][0] {
  providerName,
  "slug": slug.current,
  method,
  technology,
  locationsValue,
  typicalSessions,
  typicalTimeline,
  healingPerSession,
  pricingModel,
  yearsOperating,
  publicReviewsAnalyzed,
  bestFor,
  lessIdealFor,
  verdictLead,
  doesWell,
  usersHesitate,
  whatMakesDifferent,
  pricingBody,
  comparisonBody,
  bestForDetails,
  lessIdealForDetails,
  lastReviewed,
  faqItems[] {
    question,
    answer
  },
  seoTitle,
  seoDescription
}`;

export async function getProviderReview(slug: string): Promise<SanityProviderReview | null> {
  try {
    const review = await sanity.fetch(PROVIDER_REVIEW_QUERY, { slug });
    return review ?? null;
  } catch {
    return null;
  }
}
