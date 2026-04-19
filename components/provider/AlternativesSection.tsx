import Link from "next/link";
import type { Provider } from "@/types/provider";
import { brandToSlug } from "@/lib/providers";
import MonoLabel from "@/components/reviews/MonoLabel";

function reviewPageHref(provider: Provider): string {
  return provider.brand
    ? `/reviews/${brandToSlug(provider.brand)}`
    : `/reviews/${provider.slug}`;
}

export default function AlternativesSection({ alternatives }: { alternatives: Provider[] }) {
  if (alternatives.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {alternatives.map((provider) => (
        <Link
          key={provider.id}
          href={reviewPageHref(provider)}
          className="group flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl transition-colors hover:border-(--accent)/30"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-(--ink) text-[15px]">{provider.name}</p>
              <MonoLabel className="mt-1">{provider.market}</MonoLabel>
            </div>
            <span className="font-mono font-semibold text-[13px] text-(--accent) shrink-0">
              {provider.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-[13px] text-(--muted) line-clamp-3 leading-normal">{provider.summary}</p>
          <span className="mt-auto text-[12px] font-medium text-(--accent) transition-transform group-hover:translate-x-0.5">
            Read review →
          </span>
        </Link>
      ))}
    </div>
  );
}
