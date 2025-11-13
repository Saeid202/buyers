import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { ProfileForm } from "@/components/profile/ProfileForm";

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
  let profile:
    | {
        first_name?: string | null;
        last_name?: string | null;
        company_name?: string | null;
        company_site?: string | null;
        address?: string | null;
        notes?: string | null;
      }
    | null = null;
  let profileLoadError: string | null = null;

  if (supabaseConfigured) {
    try {
      const supabase = await getSupabaseServerClient();
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
          .from("user_profiles")
          .select(
            "first_name, last_name, company_name, company_site, address, notes",
          )
          .eq("user_id", data.user.id)
          .maybeSingle();

        if (profileError) {
          profileLoadError = profileError.message;
        } else {
          profile = profileData;
        }
      } else {
        redirect("/login");
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

  const firstName =
    profile?.first_name ?? (user.user_metadata?.first_name as string) ?? "";
  const lastName =
    profile?.last_name ?? (user.user_metadata?.last_name as string) ?? "";
  const displayName =
    `${firstName} ${lastName}`.trim() || (user.email?.split("@")[0] ?? "کاربر بازار نو");

  const email = user.email ?? "-";
  const joinedAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("fa-IR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "نامشخص";

  const companyName =
    profile?.company_name ??
    (user.user_metadata?.company_name as string) ??
    "";
  const companySite =
    profile?.company_site ??
    (user.user_metadata?.company_site as string) ??
    "";
  const address =
    profile?.address ?? (user.user_metadata?.address as string) ?? "";
  const notes = profile?.notes ?? (user.user_metadata?.bio as string) ?? "";

  const activeSection =
    resolvedSearchParams?.section === "orders" ? "orders" : "profile";

  const recommendedProducts = getRecommendedProducts(products, 4);

  const recentOrders: Array<{
    id: string;
    status: "در حال پردازش" | "ارسال شد" | "تحویل شده";
    total: number;
    created_at: string;
  }> = [
    {
      id: "BN-98452",
      status: "تحویل شده",
      total: 52800000,
      created_at: "2025-05-21",
    },
    {
      id: "BN-98412",
      status: "ارسال شد",
      total: 7800000,
      created_at: "2025-05-17",
    },
    {
      id: "BN-97333",
      status: "در حال پردازش",
      total: 18900000,
      created_at: "2025-05-12",
    },
  ];

  return (
    <div className="bg-neutral-50 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white/90 p-8 text-neutral-800 shadow-[0_25px_60px_-35px_rgba(16,24,40,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-neutral-900 text-2xl font-bold text-white">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-xs text-neutral-500">خوش آمدید</p>
              <h1 className="text-2xl font-black text-neutral-900">{displayName}</h1>
              <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                <span>ایمیل: {email}</span>
                <span className="hidden sm:inline">•</span>
                <span>عضویت از {joinedAt}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 text-xs text-neutral-500 sm:text-right">
            <div className="rounded-2xl bg-neutral-100 px-4 py-2 text-neutral-600">
              حساب شما فعال است و می توانید سفارش های خود را مدیریت کنید.
            </div>
            <p>برای استفاده از خدمات ویژه باشگاه مشتریان ادامه دهید.</p>
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

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr_160px]">
          <div className="space-y-6">
            {activeSection === "profile" ? (
              <>
                <ProfileForm
                  email={email}
                  userId={user.id}
                  firstName={firstName}
                  lastName={lastName}
                  companyName={companyName}
                  companySite={companySite}
                  address={address}
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

          <aside className="order-first hidden lg:flex">
            <nav className="flex w-full flex-col items-center gap-3 rounded-3xl border border-neutral-200 bg-white/90 p-3 text-sm font-semibold text-neutral-700 shadow-[0_25px_60px_-35px_rgba(16,24,40,0.2)] backdrop-blur-xl">
              <span className="text-neutral-400">بخش های حساب</span>
              <Link
                href="/profile?section=profile"
                className={`flex w-full items-center justify-center rounded-2xl px-4 py-3 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 ${
                  activeSection === "profile"
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "border border-neutral-200 text-neutral-800 hover:border-neutral-800 hover:text-neutral-900"
                }`}
              >
                پروفایل کاربری
              </Link>
              <Link
                href="/profile?section=orders"
                className={`flex w-full items-center justify-center rounded-2xl px-4 py-3 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 ${
                  activeSection === "orders"
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "border border-neutral-200 text-neutral-800 hover:border-neutral-800 hover:text-neutral-900"
                }`}
              >
                سفارشات
              </Link>
            </nav>
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

function OrdersPanel({
  recentOrders,
}: {
  recentOrders: {
    id: string;
    status: "در حال پردازش" | "ارسال شد" | "تحویل شده";
    total: number;
    created_at: string;
  }[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">مدیریت سفارش ها</h2>
          <p className="mt-1 text-xs text-neutral-500">
            وضعیت سفارش های فعال، در حال ارسال و تحویل شده را اینجا پیگیری کنید.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input
            className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
            placeholder="جست و جو با کد سفارش"
          />
          <button className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900">
            دانلود گزارش
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {[
          "همه سفارش ها",
          "در حال پردازش",
          "در حال ارسال",
          "تحویل شده",
          "لغو شده",
        ].map((status) => (
          <button
            key={status}
            className={`rounded-2xl border px-3 py-1 text-xs transition ${
              status === "همه سفارش ها"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
            }`}
            type="button"
          >
            {status}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3 text-sm text-neutral-600">
        {recentOrders.map((order) => (
          <li
            key={order.id}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-100 px-4 py-3 transition hover:border-neutral-300 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-neutral-900">سفارش {order.id}</span>
              <span className="text-xs text-neutral-500">
                ثبت شده در {new Date(order.created_at).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <div className="flex flex-col-reverse gap-2 text-sm sm:flex-row sm:items-center">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                {order.status}
              </span>
              <span className="font-bold text-neutral-900">
                {new Intl.NumberFormat("fa-IR").format(order.total)} تومان
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrdersMetrics() {
  const metrics = [
    { label: "سفارش های فعال", value: 2, trend: "+1" },
    { label: "سفارش های تکمیل شده", value: 18, trend: "+4" },
    { label: "مبلغ کل این ماه", value: "۱۱۵,۸۰۰,۰۰۰ تومان", trend: "+۱۲%" },
  ];

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900">شاخص های سفارش</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-2 rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-3"
          >
            <span className="text-xs text-neutral-500">{item.label}</span>
            <strong className="text-base text-neutral-900">{item.value}</strong>
            <span className="text-xs text-emerald-500">{item.trend} نسبت به ماه قبل</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersSupportCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900">پشتیبانی سفارش ها</h2>
      <p className="mt-2 text-sm leading-7 text-neutral-600">
        اگر نیاز به تغییر زمان ارسال یا پیگیری وضعیت سفارش دارید، از طریق مرکز پشتیبانی سفارش ها اقدام کنید.
      </p>
      <div className="mt-4 space-y-2 text-sm text-neutral-700">
        <p>تلفن ویژه سفارشات: ۰۲۱-۴۱۶۸۸۱۰۰</p>
        <p>گزارش وضعیت: support@bazaarno.ir</p>
      </div>
      <button className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:text-neutral-900">
        ثبت درخواست پشتیبانی
      </button>
    </div>
  );
}

function OrdersTipsCard() {
  const tips = [
    "زمان آماده سازی سفارش ها معمولاً بین ۲ تا ۴ ساعت طول می کشد.",
    "برای کم کردن زمان ارسال، آدرس خود را به صورت دقیق ثبت کنید.",
    "وضعیت های جدید سفارش از طریق ایمیل و پیامک به شما اطلاع داده می شود.",
  ];

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-900">راهنما و نکات</h3>
      <ul className="mt-4 space-y-3 text-xs text-neutral-600">
        {tips.map((tip) => (
          <li
            key={tip}
            className="flex items-start gap-2 rounded-2xl bg-neutral-50 px-4 py-3"
          >
            <span className="mt-1 size-2 shrink-0 rounded-full bg-neutral-400" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
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
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900">اطلاعات حساب</h2>
      <dl className="mt-4 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2">
        <div className="space-y-1 rounded-2xl bg-neutral-50 px-4 py-3">
          <dt className="text-xs text-neutral-500">نام و نام خانوادگی</dt>
          <dd className="font-medium text-neutral-900">{displayName}</dd>
        </div>
        <div className="space-y-1 rounded-2xl bg-neutral-50 px-4 py-3">
          <dt className="text-xs text-neutral-500">ایمیل</dt>
          <dd className="font-medium text-neutral-900">{email}</dd>
        </div>
        <div className="space-y-1 rounded-2xl bg-neutral-50 px-4 py-3">
          <dt className="text-xs text-neutral-500">عضویت از تاریخ</dt>
          <dd className="font-medium text-neutral-900">{joinedAt}</dd>
        </div>
        <div className="space-y-1 rounded-2xl bg-neutral-50 px-4 py-3">
          <dt className="text-xs text-neutral-500">وضعیت باشگاه مشتریان</dt>
          <dd className="font-medium text-neutral-900">فعال</dd>
        </div>
      </dl>
    </div>
  );
}

function SuggestedProducts({ recommendedProducts }: { recommendedProducts: Product[] }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900">پیشنهاد برای خرید بعدی</h2>
      <p className="mt-2 text-xs text-neutral-500">بر اساس کالاهای محبوب بازار نو</p>
      <ul className="mt-4 space-y-4">
        {recommendedProducts.map((product) => (
          <li key={product.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
              <Image
                src={product.images[0]?.url ?? "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80"}
                alt={product.images[0]?.alt ?? product.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-xs text-neutral-600">
              <span className="font-semibold text-neutral-900">{product.name}</span>
              <span className="text-neutral-500">
                {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SupportCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900">پشتیبانی بازار نو</h2>
      <p className="mt-2 text-sm leading-7 text-neutral-600">
        برای تغییر اطلاعات حساب یا سوال درباره سفارش ها با تیم پشتیبانی تماس بگیرید. ما همه روزه از ساعت ۹ تا ۲۱ پاسخگو هستیم.
      </p>
      <div className="mt-4 space-y-2 text-sm text-neutral-700">
        <p>تلفن: ۰۲۱-۴۱۶۸۸۲۵۰</p>
        <p>ایمیل: support@bazaarno.ir</p>
      </div>
    </div>
  );
}