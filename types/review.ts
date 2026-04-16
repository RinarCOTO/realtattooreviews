export type ReviewSubRatings = {
  outcomes: number;
  consistency: number;
  pricing: number;
  communication: number;
};

export type Review = {
  id: string;
  providerId: string;
  providerName: string;
  providerSlug: string;
  rating: number;
  subRatings?: ReviewSubRatings;
  body: string;
  date: string;
  city: string;
  sessions?: number;
  tags?: string[];
  verified: boolean;
};
