'use client';

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { PriceTag } from "@/components/common/PriceTag";

export function CheckoutPageClient() {
  const { items, subtotal } = useCart();
  const shipping = items.length > 0 ? 250000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">اطلاعات ارسال و تماس</h1>
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

        <form className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-8">
            <fieldset className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <legend className="text-lg font-semibold text-neutral-900">اطلاعات تماس</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-neutral-600">
                  <span>نام و نام خانوادگی</span>
                  <input
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                    placeholder="مثال: علی رضایی"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-neutral-600">
                  <span>شماره تماس</span>
                  <input
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                    placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                    required
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>ایمیل (اختیاری)</span>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="example@email.com"
                />
              </label>
            </fieldset>

            <fieldset className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <legend className="text-lg font-semibold text-neutral-900">آدرس ارسال</legend>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>استان و شهر</span>
                <input
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="مثال: تهران، منطقه ۵"
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>آدرس کامل</span>
                <textarea
                  className="h-24 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="نام خیابان، پلاک و واحد را وارد کنید"
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>کد پستی</span>
                <input
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="مثال: ۱۱۱۳۳۴۴۵۶۷"
                  required
                />
              </label>
            </fieldset>

            <fieldset className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <legend className="text-lg font-semibold text-neutral-900">توضیحات تکمیلی</legend>
              <label className="space-y-2 text-sm text-neutral-600">
                <span>یادداشت شما برای ارسال</span>
                <textarea
                  className="h-28 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                  placeholder="در صورت نیاز توضیحی برای هماهنگی ارسال اضافه کنید"
                />
              </label>
              <p className="text-xs text-neutral-500">
                پس از ثبت اطلاعات، تیم فروش برای هماهنگی پرداخت و زمان ارسال با شما تماس می گیرد.
              </p>
            </fieldset>
          </section>

          <aside className="space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm text-sm text-neutral-600">
            <h2 className="text-lg font-semibold text-neutral-900">خلاصه سفارش</h2>
            {items.length === 0 ? (
              <p className="text-xs leading-6 text-neutral-500">
                در حال حاضر سفارشی در سبد خرید ثبت نشده است. لطفا ابتدا کالاهای مورد نظر را به سبد اضافه کنید و سپس فرم را تکمیل نمایید.
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
                        <span className="font-semibold text-neutral-900">{item.name}</span>
                        <span className="text-neutral-500">تعداد: {item.quantity}</span>
                      </div>
                      <PriceTag value={item.price * item.quantity} weight="medium" />
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>جمع جزء</span>
                    <PriceTag value={subtotal} weight="medium" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>هزینه ارسال</span>
                    {shipping === 0 ? (
                      <span className="font-medium text-neutral-900">بعدا اعلام می شود</span>
                    ) : (
                      <PriceTag value={shipping} weight="medium" />
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-neutral-900">
                    <span className="font-semibold">جمع کل قابل پرداخت</span>
                    <PriceTag value={total} size="lg" weight="bold" className="font-black" />
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs leading-6 text-neutral-500">
              پرداخت در این وب سایت انجام نمی شود. پس از تایید اطلاعات، کارشناسان ما جهت هماهنگی نحوه پرداخت و ارسال با شما تماس خواهند گرفت.
            </p>
            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              ثبت سفارش بدون پرداخت آنلاین
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}
