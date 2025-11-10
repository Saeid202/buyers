import type { Metadata } from "next";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "سبد خرید | بازار نو",
  description: "سبد خرید شما در بازار نو؛ اقلام انتخابی را بررسی و برای ثبت سفارش آماده کنید.",
};

export default function CartPage() {
  return <CartPageClient />;
}
