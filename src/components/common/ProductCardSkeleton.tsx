export function ProductCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-purple-100/60 bg-white shadow-sm animate-pulse">
      <div className="relative h-48 w-full bg-gradient-to-br from-purple-100 to-amber-100" />
      <div className="flex flex-1 flex-col gap-3 px-4 py-5">
        <div className="h-5 bg-purple-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded w-full" />
          <div className="h-3 bg-neutral-200 rounded w-5/6" />
        </div>
        <div className="mt-auto pt-2 border-t border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 bg-purple-200 rounded w-24" />
            <div className="h-5 bg-amber-100 rounded w-16" />
          </div>
          <div className="h-10 bg-purple-200 rounded-lg w-full" />
        </div>
      </div>
    </article>
  );
}

