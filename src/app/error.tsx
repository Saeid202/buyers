"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, AlertCircle, ArrowRight } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-white to-amber-50/20 flex items-center justify-center px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="relative">
          {/* Background Decorations */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-red-200/20 via-purple-200/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-200/20 via-orange-200/20 to-transparent blur-3xl" />
          </div>

          {/* Main Content */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-red-100/60 shadow-xl p-8 sm:p-12 lg:p-16">
            {/* Error Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-24 sm:size-32 rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-6">
                <AlertCircle className="size-12 sm:size-16 text-red-600" />
              </div>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-red-500 to-amber-500 rounded-full mb-6" />
            </div>

            {/* Message */}
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900">
                خطایی رخ داد!
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                متأسفانه مشکلی در بارگذاری صفحه پیش آمده است. لطفاً دوباره تلاش کنید یا به صفحه اصلی بازگردید.
              </p>
              {error.message && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-sm font-mono text-red-700 break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-red-600 mt-2">
                      کد خطا: {error.digest}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={reset}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 hover:shadow-xl transition-all"
              >
                <RefreshCw className="size-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>تلاش مجدد</span>
              </button>
              
              <Link
                href="/"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border-2 border-purple-200 bg-white px-8 py-4 text-base font-semibold text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                <Home className="size-5" />
                <span>بازگشت به خانه</span>
                <ArrowRight className="size-5 group-hover:translate-x-[-4px] transition-transform" />
              </Link>
            </div>

            {/* Help Section */}
            <div className="border-t border-red-100 pt-8">
              <p className="text-sm font-semibold text-neutral-700 text-center mb-4">
                اگر مشکل ادامه داشت:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg border border-purple-100 bg-white px-4 py-2 text-sm text-neutral-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all"
                >
                  <Home className="size-4" />
                  صفحه اصلی
                </Link>
                <Link
                  href="/#featured"
                  className="flex items-center gap-2 rounded-lg border border-purple-100 bg-white px-4 py-2 text-sm text-neutral-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all"
                >
                  محصولات
                </Link>
                <a
                  href="mailto:info@cargoplus.ir"
                  className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-all"
                >
                  تماس با پشتیبانی
                </a>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 size-16 rounded-full bg-gradient-to-br from-red-400/20 to-red-600/20 blur-xl hidden sm:block" />
          <div className="absolute -bottom-8 -left-8 size-20 rounded-full bg-gradient-to-tr from-amber-400/20 to-amber-600/20 blur-xl hidden sm:block" />
        </div>
      </div>
    </div>
  );
}

