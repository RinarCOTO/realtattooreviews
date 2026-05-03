type TagProps = {
  label: string;
};

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-bg px-2.5 py-0.5 text-xs text-heading">
      {label}
    </span>
  );
}
