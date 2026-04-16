export type Provider = {
  id: string;
  name: string;
  slug: string;
  brand?: string;       // parent brand for multi-location providers
  market: string;       // city, state
  rating: number;
  reviewCount: number;
  summary: string;
  tags: string[];
  photo?: string;
  specialty?: string;
  yearsActive?: number;
  location?: string;    // full address or neighborhood
  featured?: boolean;
  featuredScore?: number;
};
