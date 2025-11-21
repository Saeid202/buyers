import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import type { Product } from "@/data/products";
import { getAllProducts } from "@/lib/products";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { OrdersPanel } from "@/components/profile/OrdersPanel";
import { getOrdersByUserId, type Order } from "@/lib/orders";
import { PriceTag } from "@/components/common/PriceTag";

type ProfilePageProps = {
  searchParams?: Promise<{ section?: string }>;
};

type ResolvedUser = {
  id: string;
  email: string | null;
  created_at: string | null;
  user_metadata?: Record<string, unknown>;
};

export const metadata: Metadata = {
  title: "پروفایل خریدار | بازار نو",
  description:
    "مدیریت اطلاعات حساب، مشاهده سفارش های اخیر و دسترسی سریع به پیشنهادهای بازار نو برای کاربران عضو.",
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseConfigured =
    Boolean(supabaseUrl && supabaseAnonKey) &&
    !/example\.supabase\.co/i.test(supabaseUrl ?? "");

  let user: ResolvedUser | null = null;
  let profile: {
    full_name?: string | null;
    company_name?: string | null;
    phone?: string | null;
    website?: string | null;
    bio?: string | null;
  } | null = null;
  let profileLoadError: string | null = null;

  if (supabaseConfigured) {
    try {
      const supabase = await getSupabaseServerClient();
      if (!supabase) {
        profileLoadError = "Supabase client could not be initialized";
      } else {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          profileLoadError = error.message;
        }

        if (data?.user) {
          user = {
            id: data.user.id,
            email: data.user.email ?? null,
            created_at: data.user.created_at,
            user_metadata: data.user.user_metadata,
          };

          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("full_name, company_name, phone, website, bio")
            .eq("id", data.user.id)
            .maybeSingle();

          if (profileError) {
            profileLoadError = profileError.message;
          } else {
            profile = profileData;
          }
        } else {
          redirect("/login");
        }
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "خطای نامشخص در Supabase";
      profileLoadError = message;
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to load profile from Supabase:", error);
      }
    }
  }

  const isDemoMode = !supabaseConfigured || !user;

  if (!user) {
    user = {
      id: "demo-user",
      email: "demo@bazaarno.ir",
      created_at: "2024-01-01T00:00:00.000Z",
      user_metadata: {
        first_name: "کاربر",
        last_name: "نمونه",
        company_name: "بازار نو",
        company_site: "https://bazaarno.example",
      },
    };
  }

  // Extract first and last name from full_name
  const fullName =
    profile?.full_name ?? (user.user_metadata?.full_name as string) ?? "";
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") ?? "";
  const displayName =
    fullName.trim() || (user.email?.split("@")[0] ?? "کاربر بازار نو");

  const email = user.email ?? "-";
  const joinedAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "نامشخص";

  const companyName = profile?.company_name ?? "";
  const companySite = profile?.website ?? "";
  const phone = profile?.phone ?? "";
  const notes = profile?.bio ?? "";

  const activeSection =
    resolvedSearchParams?.section === "orders" ? "orders" : "profile";

  // Fetch products from Supabase for recommendations
  let allProducts: Product[] = [];
  try {
    allProducts = await getAllProducts();
  } catch (error) {
    console.error("Error fetching products for profile page:", error);
  }

  const recommendedProducts = getRecommendedProducts(allProducts, 4);

  // Fetch orders from database
  let recentOrders: Order[] = [];
  if (user && !isDemoMode) {
    try {
      recentOrders = await getOrdersByUserId(user.id);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  // Fallback to demo data if no orders found
  if (recentOrders.length === 0 && isDemoMode) {
    recentOrders = [
      {
        id: "BN-98452",
        user_id: null,
        customer_name: "کاربر نمونه",
        customer_phone: "09121234567",
        customer_email: null,
        shipping_address: "تهران، خیابان نمونه",
        shipping_city: "تهران",
        postal_code: "1234567890",
        notes: null,
        items: [],
        subtotal: 52800000,
        shipping_cost: 250000,
        total: 53050000,
        status: "delivered",
        created_at: "2025-05-21T00:00:00Z",
        updated_at: "2025-05-21T00:00:00Z",
      },
    ] as Order[];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 py-8 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        {/* Hero Header with Avatar and Quick Stats */}
        <header className="relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-white via-white to-neutral-50/50 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur-sm sm:p-8">
          {/* Decorative gradient overlay */}
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* User Info Section */}
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Avatar with gradient border */}
              <div className="group relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-70 blur-sm transition duration-300 group-hover:opacity-100" />
                <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-3xl font-bold text-white shadow-xl sm:size-24">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                    فعال
                  </span>
                </div>
                <h1 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
                  {displayName}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="size-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <span className="font-medium">{email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="size-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <span>عضو از {joinedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-1">
                  <p className="text-2xl font-bold text-neutral-900">
                    {recentOrders.length}
                  </p>
                  <p className="text-xs font-medium text-neutral-500">سفارش</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-1">
                  <p className="text-2xl font-bold text-neutral-900">۱۲</p>
                  <p className="text-xs font-medium text-neutral-500">محصول</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-1">
                  <p className="text-2xl font-bold text-neutral-900">۸۵%</p>
                  <p className="text-xs font-medium text-neutral-500">رضایت</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="relative mt-6 rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-purple-50/30 px-4 py-3 text-sm text-neutral-700">
            <p className="font-medium">
              👋 خوش آمدید! حساب شما فعال است و می‌توانید از تمام امکانات بازار
              نو استفاده کنید.
            </p>
          </div>
        </header>

        {isDemoMode && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm leading-7 text-amber-700 shadow-sm">
            برای مشاهده کامل اطلاعات پروفایل، مقادیر واقعی Supabase را در فایل
            <code className="mx-1 rounded bg-white px-2 py-1 text-xs text-amber-800">
              .env.local
            </code>
            تنظیم کنید. در حال حاضر داده های نمایشی نمایش داده می شوند.
            {profileLoadError && (
              <span className="block text-xs text-amber-600">
                جزئیات خطا: {profileLoadError}
              </span>
            )}
          </div>
        )}

        {/* Mobile Navigation Tabs */}
        <nav className="flex gap-2 lg:hidden">
          <Link
            href="/profile?section=profile"
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              activeSection === "profile"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:shadow-md"
            }`}
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span>پروفایل</span>
          </Link>
          <Link
            href="/profile?section=orders"
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              activeSection === "orders"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:shadow-md"
            }`}
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span>سفارشات</span>
          </Link>
        </nav>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_1.5fr_1fr]">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <nav className="space-y-2 rounded-3xl border border-neutral-200/60 bg-white/80 p-3 shadow-lg shadow-neutral-900/5 backdrop-blur-sm">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  منوی حساب
                </p>
                <Link
                  href="/profile?section=profile"
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeSection === "profile"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <svg
                    className="size-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span>پروفایل</span>
                </Link>
                <Link
                  href="/profile?section=orders"
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeSection === "orders"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <svg
                    className="size-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span>سفارشات</span>
                </Link>
                <div className="pt-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                </div>
                <button className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:bg-red-50 hover:text-red-600">
                  <svg
                    className="size-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  <span>خروج</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            {activeSection === "profile" ? (
              <>
                <ProfileForm
                  email={email}
                  userId={user.id}
                  fullName={fullName}
                  firstName={firstName}
                  lastName={lastName}
                  companyName={companyName}
                  companySite={companySite}
                  phone={phone}
                  notes={notes}
                />
                <AccountHighlights
                  displayName={displayName}
                  email={email}
                  joinedAt={joinedAt}
                />
              </>
            ) : (
              <>
                <OrdersPanel recentOrders={recentOrders} />
                <OrdersMetrics />
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {activeSection === "profile" ? (
              <>
                <SuggestedProducts recommendedProducts={recommendedProducts} />
                <SupportCard />
              </>
            ) : (
              <>
                <OrdersSupportCard />
                <OrdersTipsCard />
              </>
            )}
          </aside>
        </section>
      </div>
    </div>
  );
}

function getRecommendedProducts(allProducts: Product[], limit: number) {
  const unique = allProducts.slice(0, limit);
  if (unique.length >= limit) return unique;
  const seen = new Set(unique.map((item) => item.id));
  for (const product of allProducts) {
    if (unique.length >= limit) break;
    if (seen.has(product.id)) continue;
    unique.push(product);
    seen.add(product.id);
  }
  return unique;
}

function OrdersMetrics() {
  const metrics = [
    {
      label: "سفارش های فعال",
      value: 2,
      trend: "+1",
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-50 to-orange-50/50",
      icon: (
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "سفارش های تکمیل شده",
      value: 18,
      trend: "+4",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50/50",
      icon: (
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "مبلغ کل این ماه",
      value: "۱۱۵,۸۰۰,۰۰۰",
      trend: "+۱۲%",
      color: "from-blue-500 to-purple-500",
      bgColor: "from-blue-50 to-purple-50/50",
      icon: (
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5">
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25">
          <svg
            className="size-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-neutral-900">شاخص‌های عملکرد</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {metrics.map((item, index) => (
          <div
            key={item.label}
            className={`group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-gradient-to-br ${item.bgColor} p-4 transition-all duration-300 hover:shadow-lg`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br ${item.color} opacity-10 transition-all duration-500 group-hover:scale-150`}
            />

            <div className="relative space-y-3">
              <div
                className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} p-2.5 text-white shadow-lg`}
              >
                {item.icon}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {item.label}
                </p>
                <p className="text-2xl font-black text-neutral-900">
                  {item.value}
                </p>
                <div className="flex items-center gap-1">
                  <svg
                    className="size-4 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                  <span className="text-xs font-bold text-emerald-600">
                    {item.trend}
                  </span>
                  <span className="text-xs text-neutral-500">از ماه قبل</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersSupportCard() {
  return (
    <div className="sticky top-8 rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-indigo-50 to-blue-50/50 p-6 shadow-lg shadow-neutral-900/5">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/25">
          <svg
            className="size-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-neutral-900">
            پشتیبانی سفارشات
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            برای تغییر زمان ارسال یا پیگیری سفارش با ما در ارتباط باشید
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-indigo-200/60 bg-white/80 p-3 backdrop-blur-sm">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs font-semibold text-neutral-500">تلفن ویژه</p>
            <p className="font-bold text-neutral-900">۰۲۱-۴۱۶۸۸۱۰۰</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-blue-200/60 bg-white/80 p-3 backdrop-blur-sm">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs font-semibold text-neutral-500">ایمیل</p>
            <p className="font-bold text-neutral-900">support@bazaarno.ir</p>
          </div>
        </div>
      </div>

      <button className="mt-6 group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30">
        <svg
          className="size-4 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        ثبت درخواست پشتیبانی
      </button>
    </div>
  );
}

function OrdersTipsCard() {
  const tips = [
    {
      text: "زمان آماده سازی سفارش ها معمولاً بین ۲ تا ۴ ساعت طول می کشد.",
      icon: (
        <svg
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-amber-500 to-orange-500",
    },
    {
      text: "برای کم کردن زمان ارسال، آدرس خود را به صورت دقیق ثبت کنید.",
      icon: (
        <svg
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
    },
    {
      text: "وضعیت های جدید سفارش از طریق ایمیل و پیامک به شما اطلاع داده می شود.",
      icon: (
        <svg
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      ),
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5">
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 shadow-lg shadow-pink-500/25">
          <svg
            className="size-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">نکات مفید</h3>
      </div>

      <ul className="mt-6 space-y-3">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-white p-4 transition-all duration-300 hover:border-neutral-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tip.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
              >
                {tip.icon}
              </div>
              <p className="flex-1 pt-1 text-xs leading-relaxed text-neutral-700">
                {tip.text}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-blue-200/60 bg-gradient-to-r from-blue-50 to-purple-50/50 p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <svg
            className="size-5 shrink-0 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <p className="text-xs leading-relaxed text-neutral-700">
            برای اطلاعات بیشتر لطفا
            <a
              href="#"
              className="mr-1 font-bold text-blue-600 transition-colors hover:text-blue-700"
            >
              راهنمای کامل
            </a>{" "}
            را مطالعه کنید.
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountHighlights({
  displayName,
  email,
  joinedAt,
}: {
  displayName: string;
  email: string;
  joinedAt: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/10">
      <div className="absolute left-0 top-0 h-24 w-full bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 shadow-lg shadow-amber-500/25">
            <svg
              className="size-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-neutral-900">
            اطلاعات حساب کاربری
          </h2>
        </div>

        <dl className="mt-6 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
          <div className="group/item relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-white p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-md">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              نام کامل
            </dt>
            <dd className="relative mt-2 font-bold text-neutral-900">
              {displayName}
            </dd>
          </div>

          <div className="group/item relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-white p-4 transition-all duration-300 hover:border-purple-200 hover:shadow-md">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              ایمیل
            </dt>
            <dd className="relative mt-2 truncate font-bold text-neutral-900">
              {email}
            </dd>
          </div>

          <div className="group/item relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-white p-4 transition-all duration-300 hover:border-pink-200 hover:shadow-md">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              تاریخ عضویت
            </dt>
            <dd className="relative mt-2 font-bold text-neutral-900">
              {joinedAt}
            </dd>
          </div>

          <div className="group/item relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
              وضعیت
            </dt>
            <dd className="relative mt-2 font-bold text-emerald-700">
              فعال و تایید شده
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function SuggestedProducts({
  recommendedProducts,
}: {
  recommendedProducts: Product[];
}) {
  return (
    <div className="sticky top-8 rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5">
      <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/25">
          <svg
            className="size-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-neutral-900">پیشنهاد ویژه</h2>
          <p className="mt-0.5 text-xs text-neutral-500">بر اساس علایق شما</p>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {recommendedProducts.map((product, index) => (
          <li
            key={product.id}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-white to-neutral-50/50 p-3 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center gap-3">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl shadow-md ring-2 ring-white">
                <Image
                  src={
                    product.images[0]?.url ??
                    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={product.images[0]?.alt ?? product.name}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-bold text-neutral-900 transition-colors duration-300 group-hover:text-emerald-700">
                  {product.name}
                </span>
                <PriceTag
                  value={product.price}
                  currency={product.currency}
                  size="sm"
                />
              </div>
              <svg
                className="size-5 shrink-0 text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-gradient-to-r from-white to-neutral-50 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-emerald-500 hover:from-emerald-50 hover:to-emerald-50 hover:text-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20">
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        مشاهده همه محصولات
      </button>
    </div>
  );
}

function SupportCard() {
  return (
    <div className="rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-blue-50 to-purple-50/50 p-6 shadow-lg shadow-neutral-900/5">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25">
          <svg
            className="size-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-neutral-900">پشتیبانی ۲۴/۷</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست. همه روزه از ساعت ۹
            صبح تا ۲۱ شب.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <a
          href="tel:02141688250"
          className="group flex items-center gap-3 rounded-2xl border border-blue-200/60 bg-white/80 p-3 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs font-semibold text-neutral-500">تماس تلفنی</p>
            <p className="mt-0.5 font-bold text-neutral-900 transition-colors duration-300 group-hover:text-blue-600">
              ۰۲۱-۴۱۶۸۸۲۵۰
            </p>
          </div>
          <svg
            className="size-5 text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </a>

        <a
          href="mailto:support@bazaarno.ir"
          className="group flex items-center gap-3 rounded-2xl border border-purple-200/60 bg-white/80 p-3 backdrop-blur-sm transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-colors duration-300 group-hover:bg-purple-600 group-hover:text-white">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs font-semibold text-neutral-500">
              ایمیل پشتیبانی
            </p>
            <p className="mt-0.5 font-bold text-neutral-900 transition-colors duration-300 group-hover:text-purple-600">
              support@bazaarno.ir
            </p>
          </div>
          <svg
            className="size-5 text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
