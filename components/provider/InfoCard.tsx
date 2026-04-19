import Link from "next/link";
import MonoLabel from "@/components/reviews/MonoLabel";

interface InfoCardProps {
  label: string;
  body: string;
  link: string;
  linkHref: string;
}

export default function InfoCard({ label, body, link, linkHref }: InfoCardProps) {
  return (
    <div className="border border-(--line) bg-white p-6 rounded-xl">
      <MonoLabel className="mb-3">{label}</MonoLabel>
      <p className="text-[14px] leading-relaxed text-(--muted)">{body}</p>
      <Link href={linkHref} className="mt-4 inline-block text-[13px] font-medium text-(--accent) hover:underline">
        {link} →
      </Link>
    </div>
  );
}
