import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-neutral-600 ${className}`}
    >
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-neutral-500">{description}</p>
      ) : null}
      {actionLabel && actionHref ? (
        <div className="mt-6 flex justify-center">
          <Link
            href={actionHref}
            className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
