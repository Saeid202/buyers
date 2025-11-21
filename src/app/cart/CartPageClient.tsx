'use client';

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { QuantityInput } from "@/components/common/QuantityInput";
import { EmptyState } from "@/components/common/EmptyState";
import { PriceTag } from "@/components/common/PriceTag";
import { getCartCurrency, convertShippingCost } from "@/lib/currency";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const cartCurrency = useMemo(() => getCartCurrency(items), [items]);
  const baseShippingToman = 250000;
  const shipping = items.length > 0 ? convertShippingCost(baseShippingToman, cartCurrency) : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header with animated gradient */}
        <header className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5 sm:p-8">
          <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-blue-500/5 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25">
                <svg className="size-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">سبد خرید شما</h1>
                <p className="mt-1 text-sm text-neutral-600">
                  {isMounted && items.length > 0 
                    ? `${items.length} محصول در سبد خرید شما` 
                    : "سبد خرید شما خالی است"}
                </p>
              </div>
            </div>

            {isMounted && items.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="group/btn inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 hover:shadow-lg hover:shadow-red-500/10"
                >
                  <svg className="size-4 transition-transform duration-300 group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  خالی کردن سبد
                </button>
              </div>
            )}
          </div>
        </header>

        {!isMounted || items.length === 0 ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-12 shadow-lg shadow-neutral-900/5">
            <EmptyState
              title="سبد خرید خالی است"
              description="برای شروع خرید، محصولات مورد علاقه را انتخاب کرده و به سبد اضافه کنید."
              actionLabel="مشاهده محصولات"
              actionHref="/"
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Cart Items - 2 columns */}
            <section className="space-y-4 lg:col-span-2">
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className="group/item relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-5 shadow-lg shadow-neutral-900/5 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 sm:p-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                  
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.slug}`}
                      className="group/img relative block h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 sm:h-28 sm:w-28"
                      aria-label={`نمایش جزئیات ${item.name}`}
                    >
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover/img:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/products/${item.slug}`}
                            className="group/link inline-flex items-center gap-2 text-base font-bold text-neutral-900 transition-colors hover:text-blue-600 sm:text-lg"
                          >
                            {item.name}
                            <svg className="size-4 opacity-0 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </Link>
                          <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                            </svg>
                            <span>قیمت واحد:</span>
                            <PriceTag value={item.price} currency={item.currency} size="sm" weight="semibold" className="text-neutral-700" />
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="group/del flex size-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 hover:shadow-lg hover:shadow-red-500/20"
                          aria-label="حذف محصول"
                        >
                          <svg className="size-5 transition-transform duration-300 group-hover/del:scale-110" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity and Total */}
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-neutral-50 p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-neutral-600">تعداد:</span>
                          <QuantityInput
                            value={item.quantity}
                            onChange={(next) => updateQuantity(item.id, next)}
                          />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-medium text-neutral-600">قیمت کل:</span>
                          <PriceTag 
                            value={item.price * item.quantity} 
                            currency={item.currency} 
                            weight="bold" 
                            className="text-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Order Summary Sidebar - 1 column */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Summary Card */}
                <div className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5">
                  <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                        <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold text-neutral-900">خلاصه سفارش</h2>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3 text-sm">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                          </svg>
                          <span className="font-medium">جمع جزء</span>
                        </div>
                        <PriceTag value={subtotal} currency={cartCurrency} weight="bold" className="text-neutral-900" />
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3 text-sm">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.11-.504 1.11-1.125V14.25m-17.25 0a1.125 1.125 0 011.125-1.125h12.75c.621 0 1.125.504 1.125 1.125m-17.25 0h7.5m-7.5 0l-1.5 1.5M12 11.25a2.25 2.25 0 112.25 2.25M12 11.25a2.25 2.25 0 00-2.25 2.25M12 11.25V9m0 0a2.25 2.25 0 012.25-2.25M12 9a2.25 2.25 0 00-2.25 2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">هزینه ارسال</span>
                        </div>
                        {shipping === 0 ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">رایگان</span>
                        ) : (
                          <PriceTag value={shipping} currency={cartCurrency} weight="bold" className="text-neutral-900" />
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 shadow-inner">
                        <div className="flex items-center gap-2">
                          <svg className="size-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                          </svg>
                          <span className="text-base font-bold text-neutral-900">مبلغ قابل پرداخت</span>
                        </div>
                        <PriceTag
                          value={total}
                          currency={cartCurrency}
                          size="lg"
                          weight="bold"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        />
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="group/checkout mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-center font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
                    >
                      <span>ادامه فرآیند خرید</span>
                      <svg className="size-5 transition-transform duration-300 group-hover/checkout:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </Link>

                    <Link
                      href="/"
                      className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-center text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:shadow-md"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                      </svg>
                      <span>ادامه خرید</span>
                    </Link>
                  </div>
                </div>

                {/* Shipping Info Card */}
                <div className="overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-lg shadow-emerald-900/5">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-500/25">
                      <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900">ارسال رایگان</h3>
                      <p className="mt-1 text-xs text-emerald-700">
                        برای سفارش‌های بالای 500 هزار تومان
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
