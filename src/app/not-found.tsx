import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search, ShoppingBag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "صفحه یافت نشد | CargoPlus",
  description:
    "صفحه مورد نظر شما یافت نشد. به صفحه اصلی بازگردید یا از منوی سایت استفاده کنید.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-white to-amber-50/20 flex items-center justify-center px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="relative">
          {/* Background Decorations */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/30 via-purple-100/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-200/30 via-amber-100/20 to-transparent blur-3xl" />
          </div>

          {/* Main Content */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100/60 shadow-xl p-8 sm:p-12 lg:p-16">
            {/* 404 Number */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <span className="text-9xl sm:text-[12rem] font-black bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-none">
                  404
                </span>
              </div>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-600 to-amber-600 rounded-full mb-6" />
            </div>

            {/* Message */}
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900">
                صفحه مورد نظر یافت نشد!
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس
                دیگری منتقل شده است.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 text-base font-bold text-white shadow-lg hover:from-purple-700 hover:to-purple-800 hover:shadow-xl transition-all"
              >
                <Home className="size-5" />
                <span>بازگشت به خانه</span>
                <ArrowRight className="size-5 group-hover:translate-x-[-4px] transition-transform" />
              </Link>

              <Link
                href="/#featured"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border-2 border-purple-200 bg-white px-8 py-4 text-base font-semibold text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all"
              >
                <ShoppingBag className="size-5" />
                <span>مشاهده محصولات</span>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="border-t border-purple-100 pt-8">
              <p className="text-sm font-semibold text-neutral-700 text-center mb-4">
                صفحات محبوب:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg border border-purple-100 bg-white px-4 py-2 text-sm text-neutral-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all"
                >
                  <Home className="size-4" />
                  خانه
                </Link>
                <Link
                  href="/#featured"
                  className="flex items-center gap-2 rounded-lg border border-purple-100 bg-white px-4 py-2 text-sm text-neutral-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all"
                >
                  <Search className="size-4" />
                  منتخب‌ها
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-all"
                >
                  <ShoppingBag className="size-4" />
                  سبد خرید
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 size-16 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 blur-xl hidden sm:block" />
          <div className="absolute -bottom-8 -left-8 size-20 rounded-full bg-gradient-to-tr from-amber-400/20 to-amber-600/20 blur-xl hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
