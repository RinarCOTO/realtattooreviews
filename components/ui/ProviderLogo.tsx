"use client";

import { useState } from "react";

type StageKey = "slug-png" | "slug-jpg" | "brand-png" | "brand-jpg" | "fallback";

type Props = {
  slug: string;
  brandSlug?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
};

function nextStage(current: StageKey, hasBrand: boolean): StageKey {
  if (current === "slug-png") return "slug-jpg";
  if (current === "slug-jpg") return hasBrand ? "brand-png" : "fallback";
  if (current === "brand-png") return "brand-jpg";
  return "fallback";
}

function srcFor(stage: StageKey, slug: string, brandSlug: string | undefined) {
  if (stage === "slug-png") return `/images/providers/logos/${slug}-logo.png`;
  if (stage === "slug-jpg") return `/images/providers/logos/${slug}-logo.jpg`;
  if (stage === "brand-png") return `/images/providers/logos/${brandSlug}-logo.png`;
  if (stage === "brand-jpg") return `/images/providers/logos/${brandSlug}-logo.jpg`;
  return "";
}

export default function ProviderLogo({ slug, brandSlug, name, className, fallbackClassName }: Props) {
  const [stage, setStage] = useState<StageKey>("slug-png");

  if (stage === "fallback") {
    return <span className={fallbackClassName}>{name.charAt(0)}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={srcFor(stage, slug, brandSlug)}
      alt={`${name} logo`}
      className={className}
      onError={() => setStage(nextStage(stage, !!brandSlug))}
    />
  );
}
