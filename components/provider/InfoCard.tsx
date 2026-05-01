import Link from "next/link";
import DevLabel from "@/components/dev/DevLabel";

interface InfoCardProps {
  label: string;
  body: string;
  link: string;
  linkHref: string;
  beforeBookingNote?: string;
}

export default function InfoCard({ label, body, link, linkHref, beforeBookingNote }: InfoCardProps) {
  return (
    <DevLabel name="InfoCard">
    <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
      <p className="mb-3 text-[15px] font-bold text-(--ink)">{label}</p>
      <p className="text-[14px] leading-relaxed text-(--muted)">{body}</p>

      {beforeBookingNote && (
        <>
          <div className="my-4 border-t border-(--line)" />
          <p className="text-[13px] leading-relaxed text-(--muted)">
            <span className="font-bold text-(--accent)">Before booking, ask:</span>{" "}
            {beforeBookingNote}
          </p>
        </>
      )}

      <Link href={linkHref} className="mt-4 inline-block text-[13px] font-medium text-(--accent) hover:underline">
        {link} →
      </Link>
    </div>
    </DevLabel>
  );
}
