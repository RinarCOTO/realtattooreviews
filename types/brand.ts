export type Brand = {
  id: string;
  name: string;
  slug: string;
  descriptor: string;        // one-liner: what they do / who they are
  method: "Laser" | "Non-Laser" | "Laser + Non-Laser";
  footprint: string;         // e.g. "National chain" | "Regional" | "Single location"
  locationCount: number;
  markets: string[];         // city names where covered
  totalReviews: number;
  avgRating: number;
  tags: string[];
  logo?: string;
  featured?: boolean;
};
