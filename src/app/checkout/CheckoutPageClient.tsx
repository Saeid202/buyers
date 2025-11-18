"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { PriceTag } from "@/components/common/PriceTag";
import { createOrder } from "./actions";
import { getCartCurrency, convertShippingCost } from "@/lib/currency";

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const cartCurrency = useMemo(() => getCartCurrency(items), [items]);
  const baseShippingToman = 250000;
  const shipping =
    items.length > 0 ? convertShippingCost(baseShippingToman, cartCurrency) : 0;
  const total = subtotal + shipping;

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              اطلاعات ارسال و تماس
            </h1>
            <p className="text-sm text-neutral-600">
              اطلاعات زیر را تکمیل کنید تا سفارش بدون پرداخت آنلاین ثبت شود.
            </p>
          </div>
          <Link
            href="/cart"
            className="rounded-2xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            بازگشت به سبد خرید
          </Link>
        </header>

        <form
          className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          onSubmit={async (e) => {
            e.preventDefault();
            if (items.length === 0) return;

            setStatus("submitting");
            setErrorMessage(null);

            const formData = new FormData(e.currentTarget);
            const customerName = formData.get("customer_name") as string;
            const customerPhone = formData.get("customer_phone") as string;
            const customerEmail = formData.get("customer_email") as string;
            const shippingCity = formData.get("shipping_city") as string;
            const shippingAddress = formData.get("shipping_address") as string;
            const postalCode = formData.get("postal_code") as string;
            const notes = formData.get("notes") as string;

            const orderItems = items.map((item) => ({
              product_id: item.id,
              product_name: item.name,
              quantity: item.quantity,
              price: item.price,
              currency: item.currency,
            }));

            const result = await createOrder({
              customer_name: customerName,
              customer_phone: customerPhone,
              customer_email: customerEmail || undefined,
              shipping_address: shippingAddress,
              shipping_city: shippingCity,
              postal_code: postalCode,
              notes: notes || undefined,
              items: orderItems,
              subtotal,
              shipping_cost: shipping,
              total,
            });

            if (result.success) {
              setStatus("success");
              setOrderId(result.orderId || null);
              clearCart();
              setTimeout(() => {
                router.push("/profile?section=orders");
              }, 3000);
            } else {
              setStatus("error");
              setErrorMessage(result.error || "خطا در ثبت سفارش");
            }
          }}
        >
          <section className="space-y-8">
            <fieldset className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <legend className="text-lg font-semibold text-neutral-900">
                اطلاعات تماس
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-neutral-600">
                  <span>نام و نام خانوادگی</span>
                  <input
                    name="customer_name"
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                    placeholder="مثال: علی رضایی"
                    required
                    disabled={status === "submitting" || status === "success"}
                  />
                </label>
                <label className="space-y-2 text-sm text-neutral-600">
                  <span>شماره تماس</span>
                  <input
                    name="customer_phone"
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                    placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                    required
                    disabled={status === "submitting" || status === "success"}
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>ایمیل (اختیاری)</span>
                <input
                  name="customer_email"
                  type="email"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="example@email.com"
                  disabled={status === "submitting" || status === "success"}
                />
              </label>
            </fieldset>

            <fieldset className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <legend className="text-lg font-semibold text-neutral-900">
                آدرس ارسال
              </legend>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>استان و شهر</span>
                <input
                  name="shipping_city"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="مثال: تهران، منطقه ۵"
                  required
                  disabled={status === "submitting" || status === "success"}
                />
              </label>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>آدرس کامل</span>
                <textarea
                  name="shipping_address"
                  className="h-24 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="نام خیابان، پلاک و واحد را وارد کنید"
                  required
                  disabled={status === "submitting" || status === "success"}
                />
              </label>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>کد پستی</span>
                <input
                  name="postal_code"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="مثال: ۱۱۱۳۳۴۴۵۶۷"
                  required
                  disabled={status === "submitting" || status === "success"}
                />
              </label>
            </fieldset>

            <fieldset className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <legend className="text-lg font-semibold text-neutral-900">
                توضیحات تکمیلی
              </legend>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>یادداشت شما برای ارسال</span>
                <textarea
                  name="notes"
                  className="h-28 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="در صورت نیاز توضیحی برای هماهنگی ارسال اضافه کنید"
                  disabled={status === "submitting" || status === "success"}
                />
              </label>
              <p className="text-xs text-neutral-500">
                پس از ثبت اطلاعات، تیم فروش برای هماهنگی پرداخت و زمان ارسال با
                شما تماس می گیرد.
              </p>
            </fieldset>
          </section>

          <aside className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm text-sm text-neutral-600">
            <h2 className="text-lg font-semibold text-neutral-900">
              خلاصه سفارش
            </h2>
            {items.length === 0 ? (
              <p className="text-xs leading-6 text-neutral-500">
                در حال حاضر سفارشی در سبد خرید ثبت نشده است. لطفا ابتدا کالاهای
                مورد نظر را به سبد اضافه کنید و سپس فرم را تکمیل نمایید.
              </p>
            ) : (
              <div className="space-y-4">
                <ul className="space-y-3 text-xs">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-50 px-4 py-3"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-neutral-900">
                          {item.name}
                        </span>
                        <span className="text-neutral-500">
                          تعداد: {item.quantity}
                        </span>
                      </div>
                      <PriceTag
                        value={item.price * item.quantity}
                        currency={item.currency}
                        weight="medium"
                      />
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>جمع جزء</span>
                    <PriceTag
                      value={subtotal}
                      currency={cartCurrency}
                      weight="medium"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>هزینه ارسال</span>
                    {shipping === 0 ? (
                      <span className="font-medium text-neutral-900">
                        بعدا اعلام می شود
                      </span>
                    ) : (
                      <PriceTag
                        value={shipping}
                        currency={cartCurrency}
                        weight="medium"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-neutral-900">
                    <span className="font-semibold">جمع کل قابل پرداخت</span>
                    <PriceTag
                      value={total}
                      currency={cartCurrency}
                      size="lg"
                      weight="bold"
                      className="font-black"
                    />
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs leading-6 text-neutral-500">
              پرداخت در این وب سایت انجام نمی شود. پس از تایید اطلاعات،
              کارشناسان ما جهت هماهنگی نحوه پرداخت و ارسال با شما تماس خواهند
              گرفت.
            </p>
            {status === "success" ? (
              <div className="space-y-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
                <p className="font-semibold">✓ سفارش شما با موفقیت ثبت شد!</p>
                {orderId && <p>کد سفارش: {orderId}</p>}
                <p className="text-xs">در حال انتقال به صفحه سفارشات...</p>
              </div>
            ) : (
              <>
                {status === "error" && errorMessage && (
                  <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={items.length === 0 || status === "submitting"}
                  className="w-full rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
                >
                  {status === "submitting"
                    ? "در حال ثبت سفارش..."
                    : "ثبت سفارش بدون پرداخت آنلاین"}
                </button>
              </>
            )}
          </aside>
        </form>
      </div>
    </div>
  );
}
