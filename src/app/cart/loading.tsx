import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <div className="h-8 bg-purple-200 rounded w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-white rounded-xl border border-purple-100/60 shadow-sm animate-pulse"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-amber-100 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-purple-200 rounded w-3/4" />
                  <div className="h-4 bg-neutral-200 rounded w-1/2" />
                  <div className="h-6 bg-purple-300 rounded w-24" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="h-8 w-24 bg-neutral-200 rounded" />
                  <div className="h-6 w-16 bg-red-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white rounded-xl border border-purple-100/60 shadow-sm space-y-4 animate-pulse">
              <div className="h-6 bg-purple-200 rounded w-32" />
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-3/4" />
                <div className="h-4 bg-neutral-200 rounded w-5/6" />
              </div>
              <div className="pt-4 border-t border-purple-100">
                <div className="h-8 bg-purple-300 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

