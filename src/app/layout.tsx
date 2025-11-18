import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/providers/CartProvider";
import { SupabaseAuthProvider } from "@/providers/SupabaseAuthProvider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "بازار نو | فروشگاه آنلاین محصولات دیجیتال",
    template: "%s | بازار نو",
  },
  description:
    "بازار نو فروشگاه آنلاین فارسی برای خرید محصولات دیجیتال، گجت و خانه داری با ارسال سریع و پشتیبانی اختصاصی است.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} bg-neutral-50 text-neutral-900 antialiased overflow-x-hidden`}
      >
        <SupabaseAuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 bg-neutral-50">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
