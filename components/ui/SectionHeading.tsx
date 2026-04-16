type SectionHeadingProps = {
  title: string;
  description?: string;
};

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-heading">{title}</h2>
      {description && (
        <p className="mt-1.5 text-sm text-muted">{description}</p>
      )}
    </div>
  );
}
