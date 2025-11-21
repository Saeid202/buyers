import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function Loading() {
  return (
    <div className="bg-gradient-to-b from-white via-purple-50/20 to-white min-h-screen">
      {/* Hero Slider Skeleton */}
      <div className="relative w-full h-[28vh] sm:h-[32vh] lg:h-[36vh] bg-gradient-to-br from-purple-100 to-amber-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>

      {/* Features Skeleton */}
      <div className="py-12 sm:py-16 bg-gradient-to-b from-white via-purple-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white border border-purple-100/60 animate-pulse"
              >
                <div className="size-16 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-300 mb-4" />
                <div className="h-4 bg-purple-200 rounded w-20 mb-2" />
                <div className="h-3 bg-neutral-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Skeleton */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-10 animate-pulse">
            <div className="h-8 bg-purple-200 rounded w-48 mb-2" />
            <div className="h-4 bg-neutral-200 rounded w-64" />
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

