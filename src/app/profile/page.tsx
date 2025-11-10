import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "پروفایل خریدار | بازار نو",
  description:
    "مدیریت اطلاعات حساب، مشاهده سفارش های اخیر و دسترسی سریع به پیشنهادهای بازار نو برای کاربران عضو.",
};

export default async function ProfilePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const firstName = user.user_metadata?.first_name ?? "";
  const lastName = user.user_metadata?.last_name ?? "";
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
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
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

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">سفارش های اخیر</h2>
                <span className="text-xs text-neutral-500">اطلاعات نمایشی برای طراحی صفحه</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
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
          </div>

          <aside className="space-y-6">
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
