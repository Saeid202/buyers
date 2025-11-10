type FeatureListProps = {
  features: string[];
};

export function FeatureList({ features }: FeatureListProps) {
  if (features.length === 0) {
    return null;
  }

  return (
    <ul className="mt-4 space-y-3 text-sm text-neutral-600">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <span className="mt-1 size-1.5 rounded-full bg-neutral-400" aria-hidden />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
