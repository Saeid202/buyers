import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-4 animate-pulse">
          <div className="h-10 bg-purple-200 rounded w-64" />
          <div className="h-4 bg-neutral-200 rounded w-96" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Main Content Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-purple-100/60 shadow-sm p-6 space-y-6 animate-pulse">
              <div className="h-6 bg-purple-200 rounded w-40" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-24" />
                  <div className="h-10 bg-neutral-100 rounded w-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-24" />
                  <div className="h-10 bg-neutral-100 rounded w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-32" />
                <div className="h-10 bg-neutral-100 rounded w-full" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-purple-100/60 shadow-sm p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-purple-200 rounded w-32" />
              <div className="space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-5/6" />
                <div className="h-4 bg-neutral-200 rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

