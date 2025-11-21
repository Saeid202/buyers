import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import { CartProvider } from "@/providers/CartProvider";
import { SupabaseAuthProvider } from "@/providers/SupabaseAuthProvider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CargoPlus | فروشگاه آنلاین لوکس محصولات دیجیتال",
    template: "%s | CargoPlus",
  },
  description:
    "CargoPlus (کارگو پلاس) فروشگاه آنلاین لوکس و مدرن برای خرید محصولات دیجیتال، گجت‌های پوشیدنی و تجهیزات خانه هوشمند با ارسال سریع، ضمانت بازگشت و پشتیبانی ۲۴/۷.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} bg-gradient-to-b from-purple-50/30 via-white to-amber-50/20 text-neutral-900 antialiased`}
      >
        <SupabaseAuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
