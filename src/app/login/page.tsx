import type { Metadata } from "next";
import { AuthPageClient } from "./AuthPageClient";

export const metadata: Metadata = {
  title: "ورود و ثبت نام | بازار نو",
  description:
    "ایجاد حساب کاربری یا ورود به بازار نو برای مدیریت سفارش ها، سبد خرید و دریافت پیشنهادهای ویژه.",
};

export default function LoginPage() {
  return <AuthPageClient />;
}
