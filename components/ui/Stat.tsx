type StatProps = {
  value: string;
  label: string;
};

export default function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-semibold text-heading">{value}</span>
      <span className="text-sm text-heading">{label}</span>
    </div>
  );
}
