import { ProductSpec } from "@/data/products";

type SpecListProps = {
  specs: ProductSpec[];
};

export function SpecList({ specs }: SpecListProps) {
  return (
    <dl className="mt-4 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 px-4 py-3"
        >
          <dt className="text-neutral-500">{spec.label}</dt>
          <dd className="font-medium text-neutral-900">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
