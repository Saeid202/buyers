export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-1.5 animate-pulse">
          <div className="h-3 bg-neutral-200 rounded w-12" />
          <div className="h-3 w-3 bg-neutral-200 rounded" />
          <div className="h-3 bg-neutral-200 rounded w-16" />
          <div className="h-3 w-3 bg-neutral-200 rounded" />
          <div className="h-3 bg-neutral-200 rounded w-20" />
          <div className="h-3 w-3 bg-neutral-200 rounded" />
          <div className="h-3 bg-purple-200 rounded w-32" />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Right: Product Info Skeleton */}
          <div>
            <div className="sticky top-4 space-y-6">
              <div className="space-y-3 animate-pulse">
                <div className="space-y-2">
                  <div className="h-7 bg-purple-200 rounded w-3/4 lg:h-8" />
                  <div className="h-4 bg-neutral-200 rounded w-full" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-neutral-200 rounded w-20" />
                  <div className="h-4 w-px bg-neutral-200" />
                  <div className="h-4 bg-neutral-200 rounded w-24" />
                  <div className="h-4 w-px bg-neutral-200" />
                  <div className="h-4 bg-neutral-200 rounded w-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-purple-100/60 shadow-sm p-6 animate-pulse">
                <div className="mb-4 flex items-center justify-between border-b border-purple-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 bg-purple-200 rounded w-32" />
                    <div className="h-7 bg-purple-100 rounded w-24" />
                  </div>
                  <div className="h-6 bg-emerald-100 rounded-full w-20" />
                </div>

                <div className="space-y-2">
                  <div className="h-11 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg w-full" />
                  <div className="h-11 bg-white border border-purple-100/60 rounded-lg w-full" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-purple-100 pt-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div className="size-8 bg-purple-100 rounded-full" />
                      <div className="h-3 bg-neutral-200 rounded w-12" />
                      <div className="h-2 bg-neutral-100 rounded w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Left: Image Gallery Skeleton */}
          <div className="animate-pulse">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-amber-100 rounded-2xl shadow-sm" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white rounded-xl border border-purple-100/60 shadow-sm p-6 animate-pulse">
          <div className="mb-4 flex gap-4 border-b border-purple-100 pb-3">
            <div className="h-6 bg-purple-200 rounded w-24" />
            <div className="h-6 bg-neutral-200 rounded w-20" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-5/6" />
            <div className="h-4 bg-neutral-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
