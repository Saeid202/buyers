import type { Metadata } from "next";
import { CheckoutPageClient } from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "ثبت سفارش | بازار نو",
  description: "فرم ثبت سفارش بازار نو برای وارد کردن اطلاعات تماس و آدرس بدون پرداخت آنلاین.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
