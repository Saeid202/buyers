'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { QuantityInput } from "@/components/common/QuantityInput";
import { EmptyState } from "@/components/common/EmptyState";
import { PriceTag } from "@/components/common/PriceTag";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const shipping = items.length > 0 ? 250000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">سبد خرید شما</h1>
            <p className="text-sm text-neutral-600">
              کالاهای انتخاب شده را بررسی کنید و در صورت نیاز تعداد را تغییر دهید.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/checkout"
              className="rounded-2xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              ادامه به ثبت سفارش
            </Link>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-2xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-500 transition hover:border-red-500 hover:text-red-500"
              >
                خالی کردن سبد خرید
              </button>
            )}
          </div>
        </header>

        {items.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="سبد خرید خالی است"
            description="برای شروع خرید، محصولات مورد علاقه را انتخاب کرده و به سبد اضافه کنید."
            actionLabel="بازگشت به فروشگاه"
            actionHref="/"
          />
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative block h-28 w-full overflow-hidden rounded-2xl bg-neutral-100 transition hover:ring-2 hover:ring-neutral-900/40 sm:h-24 sm:w-24"
                    aria-label={`نمایش جزئیات ${item.name}`}
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-700">
                    <span className="font-semibold text-neutral-900">{item.name}</span>
                    <span className="text-neutral-500">
                      قیمت واحد: <PriceTag value={item.price} size="sm" weight="medium" className="text-neutral-600" />
                    </span>
                    <span className="font-medium text-neutral-900">
                      <PriceTag value={item.price * item.quantity} weight="bold" />
                    </span>
                    <Link
                      href={`/products/${item.slug}`}
                      className="w-fit text-xs text-neutral-500 underline-offset-4 hover:text-neutral-800 hover:underline"
                    >
                      مشاهده جزئیات محصول
                    </Link>
                  </div>
                  <div className="flex flex-col items-end gap-3 text-xs sm:flex-row sm:items-center">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(next) => updateQuantity(item.id, next)}
                      className="sm:order-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full border border-neutral-200 px-3 py-2 text-neutral-500 transition hover:border-red-500 hover:text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">خلاصه سفارش</h2>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-center justify-between">
                  <span>جمع جزء</span>
                  <PriceTag value={subtotal} weight="medium" />
                </div>
                <div className="flex items-center justify-between">
                  <span>هزینه ارسال</span>
                  {shipping === 0 ? (
                    <span className="font-medium text-neutral-900">رایگان</span>
                  ) : (
                    <PriceTag value={shipping} weight="medium" />
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-neutral-900">
                  <span className="font-semibold">جمع کل</span>
                  <PriceTag value={total} size="lg" weight="bold" className="font-black" />
                </div>
              </div>
              <Link
                href="/checkout"
                className="block rounded-2xl bg-neutral-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                رفتن به صفحه اطلاعات ارسال
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
