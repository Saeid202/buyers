'use client';

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, User, LogOut } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";

const navItems = [
  { href: "/#categories", label: "دسته بندی کالاها" },
  { href: "/#new-products", label: "جدیدترین" },
  { href: "/#featured", label: "پیشنهاد ویژه" },
  { href: "/#smart-home", label: "خانه هوشمند" },
  { href: "/#wearables", label: "گجت پوشیدنی" },
  { href: "/checkout", label: "ثبت سفارش" },
];

export function Header() {
  const { totalItems } = useCart();
  const { user, loading, signOut, refresh } = useSupabaseAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const profileName = useMemo(() => {
    if (!user) return "";
    const first = user.user_metadata?.first_name ?? "";
    const last = user.user_metadata?.last_name ?? "";
    const name = `${first} ${last}`.trim();
    if (name) return name;
    return user.email?.split("@")[0] ?? "کاربر بازار نو";
  }, [user]);

  const profileInitial = useMemo(() => {
    if (!profileName) {
      return user?.email?.charAt(0)?.toUpperCase() ?? "کاربر".charAt(0);
    }
    return profileName.trim().charAt(0).toUpperCase();
  }, [profileName, user?.email]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleSignOut = async () => {
    await signOut();
    await refresh();
    setMenuOpen(false);
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="relative px-4 py-3 sm:px-6 lg:px-10">
        <div className="absolute inset-0 -z-20 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-r from-white/90 via-white/75 to-white/90 shadow-[0_15px_45px_-20px_rgba(20,20,20,0.5)] backdrop-blur-xl">
          <div className="absolute -top-24 right-8 h-56 w-56 rounded-full bg-gradient-to-br from-rose-200/60 via-purple-200/40 to-blue-200/60 blur-3xl" />
          <div className="absolute -bottom-28.left-0 h-60 w-60 rounded-full bg-gradient-to-br from-sky-200/50 via-teal-200/40 to-emerald-200/50 blur-3xl" />
          <div className="absolute -bottom-8.right-1/3 h-24 w-24 rounded-full border border-white/40 bg-white/40 backdrop-blur-xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <Link href="/" className="flex.items-center gap-3 text-neutral-900">
            <span className="text-2xl font-black">بازار نو</span>
            <span className="hidden text-xs text-neutral-500 sm:inline">
              تجربه خرید محصولات دیجیتال با ارسال سریع و پشتیبانی اختصاصی
            </span>
          </Link>

          <form
            action="/search"
            className="group order-last flex w-full items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-neutral-600 shadow-sm transition focus-within:border-neutral-900 focus-within:bg-white focus-within:text-neutral-900 sm:order-none sm:flex-1"
          >
            <Search className="size-4 text-neutral-400 group-focus-within:text-neutral-900" aria-hidden />
            <input
              id="search-header"
              name="q"
              placeholder="جستجوی کالا"
              className="flex-1 bg-transparent text-neutral-700 outline-none placeholder:text-neutral-500"
              autoComplete="off"
            />
          </form>

          <div className="flex items-center gap-2 sm:ml-auto">
            {loading ? (
              <div className="hidden h-10 w-24 animate-pulse rounded-2xl bg-white/60 sm:block" />
            ) : user ? (
              <div className="relative hidden sm:block" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                    {profileInitial}
                  </span>
                  <span className="max-w-[120px] truncate text-right">{profileName}</span>
                </button>

                {menuOpen ? (
                  <div className="absolute left-0 right-0 top-12 z-50 flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-xl">
                    <div className="text-xs text-neutral-500">با حساب کاربری بازار نو خوش آمدید</div>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl border border-neutral-200 px-3 py-2 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
                    >
                      پروفایل من
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-neutral-500 transition hover:border-rose-500 hover:text-rose-500"
                    >
                      خروج از حساب
                      <LogOut className="size-4" aria-hidden />
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-900 hover:text-neutral-900 sm:flex"
              >
                <User className="size-4" aria-hidden />
                <span>ورود | ثبت نام</span>
              </Link>
            )}

            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-2xl border.border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-neutral-900 hover:text-neutral-900"
            >
              <ShoppingBag className="size-4" aria-hidden />
              <span className="hidden sm:inline">سبد خرید</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                {totalItems}
              </span>
            </Link>
          </div>

          <div className="flex w-full items-center gap-3 pt-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border.border-white/70 bg-white/70 px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm.transition hover:border-neutral-900 hover:text-neutral-900"
            >
              <Menu className="size-4" aria-hidden />
              <span>همه دسته بندی ها</span>
            </button>

            <div className="hidden flex-1 items-center gap-4 overflow-x-auto text-sm text-neutral-600 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-xl px-3 py-2 text-neutral-600 transition.hover:bg-white/80 hover:text-neutral-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex w-full items-center gap-2 overflow-x-auto text-sm text-neutral-600 lg:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  {item.label}
                </Link>
              ))}
              {!loading && user ? (
                <Link
                  href="/profile"
                  className="whitespace-nowrap rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  حساب کاربری
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
