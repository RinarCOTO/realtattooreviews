const siteUrl = "https://realtattooreviews.com";

/** Organisation schema — add to root layout or homepage */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RealTattooReviews",
    url: siteUrl,
    description:
      "Independent tattoo removal review and comparison platform. No affiliate deals.",
  };
}

/** LocalBusiness schema for a single provider location */
export function localBusinessSchema(provider: {
  name: string;
  slug: string;
  market: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    url: `${siteUrl}/reviews/${provider.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: provider.market,
    },
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.href}`,
    })),
  };
}

/** FAQPage schema */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
