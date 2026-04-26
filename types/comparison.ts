export type ComparisonTableRow = {
  criterion: string;
  left: string;
  right: string;
  takeaway?: string;
};

export type ComparisonFAQ = {
  question: string;
  answer: string;
};

export type ComparisonChoiceCard = {
  title: string;
  body: string;
  bullets: string[];
};

export type ComparisonProsCons = {
  label: string;
  pros: string[];
  cons: string[];
};

export type ComparisonResearchLink = {
  href: string;
  label: string;
  description: string;
  meta: string;
};

export type DetailedComparisonPage = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intentSummary: string;
  keywordSummary: string;
  verdict: string;
  summary: string;
  intro: string[];
  choiceCards: ComparisonChoiceCard[];
  tableRows: ComparisonTableRow[];
  criteriaTitle: string;
  criteriaPoints: string[];
  consultQuestions: string[];
  prosCons: ComparisonProsCons[];
  sourceNote: string;
  faqs: ComparisonFAQ[];
  relatedLinks: ComparisonResearchLink[];
  brandA?: string;
  brandB?: string;
  brandAPendingCities?: string[];
  brandBPendingCities?: string[];
};
