import Link from "next/link";

type Props = {
  href?: string;
};

export default function EditorialBanner({ href = "/editorial-policy" }: Props) {
  return (
    <div
      className="rounded-2xl px-5 py-3.5 flex items-center gap-3"
      style={{
        border: "1.5px solid transparent",
        background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #C8E6E4, #F5DDD0, #C8E6E4) border-box",
      }}
    >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="9" cy="9" r="8.5" stroke="#2F6F6D" />
          <path
            d="M9 8v5"
            stroke="#2F6F6D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="9" cy="5.5" r="0.75" fill="#2F6F6D" />
        </svg>
        <p className="text-[14px] text-heading leading-snug m-0">
          No paid placement. No hidden negatives.{" "}
          <Link
            href={href}
            className="font-medium text-(--accent) hover:underline"
          >
            Read our editorial policy
          </Link>
        </p>
    </div>
  );
}
