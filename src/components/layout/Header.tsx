"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, LogOut, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";

// Hook to prevent hydration mismatch
function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  return isMounted;
}

const navItems = [
  { href: "/#featured", label: "منتخب‌ها" },
  { href: "/#new-products", label: "جدیدترین‌ها" },
  { href: "/checkout", label: "ثبت سفارش" },
];

export function Header() {
  const { totalItems } = useCart();
  const { user, loading, signOut, refresh } = useSupabaseAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMounted = useIsMounted();

  const profileName = useMemo(() => {
    if (!user) return "";
    const first = user.user_metadata?.first_name ?? "";
    const last = user.user_metadata?.last_name ?? "";
    const name = `${first} ${last}`.trim();
    if (name) return name;
    return user.email?.split("@")[0] ?? "کاربر بازار نو";
  }, [user]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    await refresh();
    setUserMenuOpen(false);
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-purple-100/50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative flex items-center justify-between gap-4">
            {/* Action Buttons - Desktop: Cart + Profile, Mobile: Profile + Menu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Cart - Desktop Only */}
              <Link
                href="/cart"
                className="hidden lg:flex relative items-center gap-2 rounded-xl border border-purple-200/60 bg-white px-3 py-2.5 text-purple-700 shadow-sm transition-all hover:border-purple-400 hover:bg-purple-50 hover:shadow-md"
                aria-label="سبد خرید"
              >
                <ShoppingBag className="size-5" aria-hidden />
                <span className="text-sm font-medium">سبد خرید</span>
                {isMounted && totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-bold text-white shadow-sm"
                    suppressHydrationWarning
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Profile - Always Visible */}
              {loading ? (
                <div className="h-10 w-10 animate-pulse rounded-xl bg-purple-100" />
              ) : user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl border border-purple-200/60 bg-white px-3 py-2.5 text-purple-700 shadow-sm transition-all hover:border-purple-400 hover:bg-purple-50 hover:shadow-md"
                    aria-label="حساب کاربری"
                  >
                    <User className="size-5" aria-hidden />
                    <span className="text-sm font-medium">پروفایل</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 z-50 w-56 flex flex-col gap-1 rounded-xl border border-purple-100 bg-white p-2 text-sm shadow-xl backdrop-blur-sm">
                      <div className="px-3 py-2 text-xs text-purple-600 font-medium border-b border-purple-100">
                        خوش آمدید {profileName}
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-neutral-700 transition-all hover:bg-purple-50 hover:text-purple-700"
                      >
                        پروفایل من
                      </Link>
                      <Link
                        href="/#featured"
                        onClick={() => setUserMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-neutral-700 transition-all hover:bg-purple-50 hover:text-purple-700"
                      >
                        سفارش‌های من
                      </Link>
                      <div className="border-t border-purple-100 my-1" />
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-red-600 transition-all hover:bg-red-50"
                      >
                        خروج از حساب
                        <LogOut className="size-4" aria-hidden />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-xl border border-purple-200/60 bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-2.5 text-white shadow-sm transition-all hover:from-purple-700 hover:to-purple-800 hover:shadow-md"
                  aria-label="ورود | ثبت نام"
                >
                  <User className="size-5" aria-hidden />
                  <span className="text-sm font-medium">پروفایل</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden flex items-center justify-center rounded-xl border border-purple-200/60 bg-white p-2.5 text-purple-700 shadow-sm transition-all hover:border-purple-400 hover:bg-purple-50"
                aria-label="منو"
              >
                {mobileMenuOpen ? (
                  <X className="size-5" aria-hidden />
                ) : (
                  <Menu className="size-5" aria-hidden />
                )}
              </button>
            </div>

            {/* Search Bar - Desktop Only */}
            <form
              action="/search"
              className="hidden lg:flex flex-1 max-w-2xl items-center gap-3 rounded-xl border border-purple-200/60 bg-white px-4 py-2.5 text-sm text-neutral-600 shadow-sm transition-all focus-within:border-purple-500 focus-within:shadow-md focus-within:shadow-purple-100"
            >
              <Search
                className="size-5 text-purple-400 group-focus-within:text-purple-600 transition-colors flex-shrink-0"
                aria-hidden
              />
              <input
                id="search-header"
                name="q"
                placeholder="جستجوی محصولات..."
                className="flex-1 bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400"
                autoComplete="off"
              />
            </form>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="relative">
                <span className="relative text-2xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                  کارگو پلاس
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-1 mt-3 pt-3 border-t border-purple-100/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-4 py-2 text-sm text-neutral-600 font-medium transition-all hover:bg-purple-50 hover:text-purple-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu - Simple and Visible - Outside header for proper z-index */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-[99999] overflow-y-auto">
          {/* Header in Mobile Menu */}
          <div className="sticky top-0 bg-white border-b border-purple-100 p-4 flex items-center justify-between z-10 shadow-sm">
            <span className="text-xl font-black text-purple-700">
              کارگو پلاس
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
              aria-label="بستن منو"
            >
              <X className="size-6 text-purple-700" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="p-4 space-y-4">
            {/* Search */}
            <form action="/search" className="w-full">
              <div className="flex items-center gap-3 rounded-xl border-2 border-purple-200 bg-white px-4 py-3 shadow-sm">
                <Search className="size-5 text-purple-600" />
                <input
                  name="q"
                  placeholder="جستجوی محصولات..."
                  className="flex-1 bg-transparent text-neutral-700 outline-none placeholder:text-neutral-400"
                  autoComplete="off"
                />
              </div>
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between gap-3 rounded-xl border-2 border-purple-200 bg-purple-50 px-4 py-4 hover:bg-purple-100 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="size-6 text-purple-700" />
                <span className="text-lg font-bold text-purple-700">
                  سبد خرید
                </span>
              </div>
              {isMounted && totalItems > 0 && (
                <span className="flex size-7 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Navigation Links */}
            <div className="space-y-2 pt-4">
              <div className="px-2 text-sm font-bold text-purple-600 mb-2">
                منوی اصلی
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-purple-50 px-4 py-4 text-base font-semibold text-purple-700 hover:bg-purple-100 transition-colors shadow-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
