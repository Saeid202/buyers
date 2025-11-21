import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8 sm:py-12">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="h-10 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg w-48 mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-72" />
            </div>
            <div className="h-12 bg-purple-100 rounded-xl w-40" />
          </div>

          {/* Progress Steps Skeleton */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="size-8 sm:size-10 rounded-full bg-emerald-200" />
            <div className="h-px w-12 sm:w-24 bg-purple-200" />
            <div className="size-8 sm:size-10 rounded-full bg-purple-300" />
            <div className="h-px w-12 sm:w-24 bg-neutral-200" />
            <div className="size-8 sm:size-10 rounded-full bg-neutral-200" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Forms Skeleton */}
          <div className="space-y-6">
            {/* اطلاعات تماس */}
            <div className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden animate-pulse">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 px-6 py-4 border-b border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-purple-200" />
                  <div className="flex-1">
                    <div className="h-5 bg-purple-200 rounded w-32 mb-1" />
                    <div className="h-3 bg-purple-100 rounded w-40" />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-32" />
                    <div className="h-11 bg-neutral-100 rounded-xl w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-24" />
                    <div className="h-11 bg-neutral-100 rounded-xl w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-20" />
                  <div className="h-11 bg-neutral-100 rounded-xl w-full" />
                </div>
              </div>
            </div>

            {/* آدرس ارسال */}
            <div className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden animate-pulse">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 px-6 py-4 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-amber-200" />
                  <div className="flex-1">
                    <div className="h-5 bg-amber-200 rounded w-28 mb-1" />
                    <div className="h-3 bg-amber-100 rounded w-44" />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-24" />
                  <div className="h-11 bg-neutral-100 rounded-xl w-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-28" />
                  <div className="h-28 bg-neutral-100 rounded-xl w-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-20" />
                  <div className="h-11 bg-neutral-100 rounded-xl w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-2xl border border-purple-100/60 shadow-lg overflow-hidden animate-pulse">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl bg-white/20" />
                  <div className="flex-1">
                    <div className="h-5 bg-white/30 rounded w-28 mb-1" />
                    <div className="h-3 bg-white/20 rounded w-32" />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-purple-200 rounded w-32" />
                          <div className="h-3 bg-neutral-200 rounded w-20" />
                        </div>
                        <div className="h-5 bg-purple-300 rounded w-16" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-4 border-t border-purple-100">
                  <div className="flex justify-between">
                    <div className="h-4 bg-neutral-200 rounded w-16" />
                    <div className="h-4 bg-neutral-200 rounded w-20" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-neutral-200 rounded w-20" />
                    <div className="h-6 bg-amber-100 rounded-lg w-16" />
                  </div>
                  <div className="flex justify-between pt-3 border-t border-purple-100">
                    <div className="h-5 bg-purple-200 rounded w-32" />
                    <div className="h-6 bg-purple-300 rounded w-24" />
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

