type Props = {
  name: string;
  /** Path to logo under /public, e.g. "/images/providers/logos/inkout-logo.jpg" */
  logoSrc?: string;
  /** Two-letter initials shown when no logoSrc is provided */
  initials?: string;
};

export default function BrandTableHeader({ name, logoSrc, initials }: Props) {
  return (
    <span className="flex flex-col items-center gap-1.5">
      {logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoSrc}
          alt={name}
          className="h-8 w-24 object-contain"
        />
      ) : (
        <span className="font-mono text-[10px] font-semibold text-heading tracking-wide">
          {initials ?? name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span>{name}</span>
    </span>
  );
}
