"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { PriceTag } from "@/components/common/PriceTag";
import { createOrder } from "./actions";
import { getCartCurrency, convertShippingCost } from "@/lib/currency";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  FileText,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Package,
} from "lucide-react";
import { FormSection } from "./components/FormSection";
import { FormField } from "./components/FormField";

// کامپوننت ProgressStep برای جلوگیری از re-render های غیر ضروری
const ProgressStep = memo(function ProgressStep({
  icon: Icon,
  label,
  isActive = false,
  isCompleted = false,
}: {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center size-8 sm:size-10 rounded-full ${
          isCompleted
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
            : isActive
            ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg"
            : "bg-neutral-200 text-neutral-400"
        }`}
      >
        <Icon className="size-4 sm:size-5" />
      </div>
      <span
        className={`text-xs sm:text-sm ${
          isCompleted || isActive
            ? "font-semibold text-neutral-700"
            : "font-medium text-neutral-400"
        } ${isActive ? "text-purple-700" : ""} hidden sm:inline`}
      >
        {label}
      </span>
    </div>
  );
});

// کامپوننت CartItemCard برای بهینه‌سازی rendering
const CartItemCard = memo(function CartItemCard({
  item,
}: {
  item: { id: string; name: string; quantity: number; price: number; currency: string };
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-transparent border border-purple-100/50 hover:shadow-sm transition-shadow">
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-neutral-900 line-clamp-2 mb-1">
          {item.name}
        </h4>
        <p className="text-xs text-neutral-500">تعداد: {item.quantity} عدد</p>
      </div>
      <PriceTag
        value={item.price * item.quantity}
        currency={item.currency}
        weight="bold"
        size="sm"
      />
    </div>
  );
});

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  
  // بهینه‌سازی محاسبات با useMemo
  const cartCurrency = useMemo(() => getCartCurrency(items), [items]);
  
  const shipping = useMemo(() => {
    const baseShippingToman = 250000;
    return items.length > 0
      ? convertShippingCost(baseShippingToman, cartCurrency)
      : 0;
  }, [items.length, cartCurrency]);
  
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // بهینه‌سازی form submit handler با useCallback
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [items, subtotal, shipping, total, clearCart, router]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                تکمیل خرید
              </h1>
              <p className="text-sm sm:text-base text-neutral-600">
                اطلاعات خود را وارد کنید تا سفارش ثبت شود
              </p>
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-purple-200 text-purple-700 font-semibold text-sm transition-all hover:bg-purple-50 hover:border-purple-300 hover:shadow-md"
            >
              <ArrowRight className="size-4" />
              بازگشت به سبد خرید
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
            <ProgressStep
              icon={CheckCircle2}
              label="انتخاب محصولات"
              isCompleted
            />
            <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-emerald-500 to-purple-500" />
            <ProgressStep
              icon={FileText}
              label="اطلاعات ارسال"
              isActive
            />
            <div className="h-px w-12 sm:w-24 bg-neutral-200" />
            <ProgressStep icon={Package} label="تأیید سفارش" />
          </div>
        </div>

        <form
          className="grid gap-6 lg:grid-cols-[1.2fr_1fr]"
          onSubmit={handleSubmit}
        >
          <section className="space-y-6">
            {/* اطلاعات تماس */}
            <FormSection
              title="اطلاعات تماس"
              description="اطلاعات تماس خود را وارد کنید"
              icon={User}
              iconColor="purple"
            >
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    type="input"
                    label="نام و نام خانوادگی"
                    icon={User}
                    iconColor="purple"
                    name="customer_name"
                    placeholder="مثال: علی رضایی"
                    required
                    disabled={status === "submitting" || status === "success"}
                  />
                  <FormField
                    type="input"
                    label="شماره تماس"
                    icon={Phone}
                    iconColor="purple"
                    name="customer_phone"
                    placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                    required
                    disabled={status === "submitting" || status === "success"}
                  />
                </div>
                <FormField
                  type="input"
                  inputType="email"
                  label="ایمیل"
                  icon={Mail}
                  iconColor="purple"
                  name="customer_email"
                  placeholder="example@email.com"
                  optional
                  disabled={status === "submitting" || status === "success"}
                />
              </div>
            </FormSection>

            {/* آدرس ارسال */}
            <FormSection
              title="آدرس ارسال"
              description="محل دریافت سفارش را مشخص کنید"
              icon={MapPin}
              iconColor="amber"
            >
              <div className="space-y-5">
                <FormField
                  type="input"
                  label="استان و شهر"
                  icon={MapPin}
                  iconColor="amber"
                  name="shipping_city"
                  placeholder="مثال: تهران، منطقه ۵"
                  required
                  disabled={status === "submitting" || status === "success"}
                />
                <FormField
                  type="textarea"
                  label="آدرس کامل"
                  icon={Home}
                  iconColor="amber"
                  name="shipping_address"
                  placeholder="نام خیابان، پلاک و واحد را وارد کنید"
                  rows={3.5}
                  required
                  disabled={status === "submitting" || status === "success"}
                />
                <FormField
                  type="input"
                  label="کد پستی"
                  icon={Package}
                  iconColor="amber"
                  name="postal_code"
                  placeholder="مثال: ۱۱۱۳۳۴۴۵۶۷"
                  required
                  disabled={status === "submitting" || status === "success"}
                />
              </div>
            </FormSection>

            {/* توضیحات تکمیلی */}
            <FormSection
              title="توضیحات تکمیلی"
              description="یادداشت برای ارسال (اختیاری)"
              icon={FileText}
              iconColor="purple"
            >
              <div className="space-y-4">
                <FormField
                  type="textarea"
                  label="یادداشت شما"
                  icon={FileText}
                  iconColor="purple"
                  name="notes"
                  placeholder="در صورت نیاز توضیحی برای هماهنگی ارسال اضافه کنید"
                  rows={4}
                  optional
                  disabled={status === "submitting" || status === "success"}
                />
                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <AlertCircle className="size-5 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    پس از ثبت اطلاعات، تیم فروش برای هماهنگی پرداخت و زمان ارسال با
                    شما تماس خواهد گرفت.
                  </p>
                </div>
              </div>
            </FormSection>
          </section>

          <aside className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-2xl border border-purple-100/60 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center justify-center size-11 rounded-xl bg-white/20 backdrop-blur-sm">
                    <ShoppingBag className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">خلاصه سفارش</h2>
                    <p className="text-xs text-purple-100">
                      {items.length} محصول در سبد خرید
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center size-16 rounded-full bg-neutral-100 mb-4">
                      <ShoppingBag className="size-8 text-neutral-400" />
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      سبد خرید شما خالی است. لطفا ابتدا محصولات مورد نظر را به سبد
                      اضافه کنید.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 text-sm font-semibold hover:bg-purple-100 transition-colors"
                    >
                      بازگشت به فروشگاه
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* لیست محصولات */}
                    <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-neutral-100">
                      {items.map((item) => (
                        <CartItemCard key={item.id} item={item} />
                      ))}
                    </div>

                    {/* جزئیات قیمت */}
                    <div className="space-y-3 pt-4 border-t border-purple-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">جمع جزء</span>
                        <PriceTag
                          value={subtotal}
                          currency={cartCurrency}
                          weight="semibold"
                          size="sm"
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">هزینه ارسال</span>
                        {shipping === 0 ? (
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                            رایگان
                          </span>
                        ) : (
                          <PriceTag
                            value={shipping}
                            currency={cartCurrency}
                            weight="semibold"
                            size="sm"
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-purple-100">
                        <span className="font-bold text-neutral-900">
                          جمع کل قابل پرداخت
                        </span>
                        <PriceTag
                          value={total}
                          currency={cartCurrency}
                          size="lg"
                          weight="bold"
                          className="text-purple-700"
                        />
                      </div>
                    </div>

                    {/* توضیحات */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
                      <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        پرداخت در این وب سایت انجام نمی‌شود. پس از تایید اطلاعات،
                        کارشناسان ما برای هماهنگی با شما تماس خواهند گرفت.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* دکمه‌ها و پیغام‌ها */}
              <div className="p-6 pt-0">
                {status === "success" ? (
                  <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-12 rounded-full bg-emerald-500 text-white">
                        <CheckCircle2 className="size-6" />
                      </div>
                      <div>
                        <p className="font-bold text-emerald-900">
                          سفارش با موفقیت ثبت شد!
                        </p>
                        {orderId && (
                          <p className="text-sm text-emerald-700 mt-1">
                            کد سفارش: <span className="font-mono">{orderId}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-white/60 rounded-lg px-3 py-2">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      در حال انتقال به صفحه سفارشات...
                    </div>
                  </div>
                ) : (
                  <>
                    {status === "error" && errorMessage && (
                      <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-red-900 mb-1">
                              خطا در ثبت سفارش
                            </p>
                            <p className="text-sm text-red-700">{errorMessage}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={items.length === 0 || status === "submitting"}
                      className="group w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 text-base font-bold text-white transition-all hover:shadow-xl hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-center gap-2">
                        {status === "submitting" ? (
                          <>
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            در حال ثبت سفارش...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="size-5" />
                            ثبت سفارش بدون پرداخت آنلاین
                          </>
                        )}
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
