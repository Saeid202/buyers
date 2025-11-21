import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Send, Twitter } from "lucide-react";

const quickLinks = [
  { href: "/", label: "خانه" },
  { href: "/#featured", label: "منتخب‌ها" },
  { href: "/#new-products", label: "جدیدترین‌ها" },
  { href: "/cart", label: "سبد خرید" },
];

const customerService = [
  { href: "/faq", label: "سوالات متداول" },
  { href: "/shipping", label: "روش‌های ارسال" },
  { href: "/return", label: "بازگشت کالا" },
  { href: "/warranty", label: "گارانتی" },
];

const supportLinks = [
  {
    icon: Phone,
    label: "پشتیبانی",
    value: "021-41688250",
    href: "tel:02141688250",
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: "info@cargoplus.ir",
    href: "mailto:info@cargoplus.ir",
  },
  {
    icon: MapPin,
    label: "آدرس",
    value: "تهران، میرداماد جنوبی",
    href: "#",
  },
];

const socialLinks = [
  { icon: Instagram, label: "اینستاگرام", href: "#" },
  { icon: Send, label: "تلگرام", href: "#" },
  { icon: Twitter, label: "توییتر", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-purple-50/40 via-white to-white border-t border-purple-100/50 mt-16">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-purple-200/20 via-purple-100/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-200/20 via-amber-100/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="relative py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-5">
              <div className="flex flex-col gap-1">
                <div className="relative inline-block">
                  <h2 className="relative text-2xl font-black bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    کارگو پلاس
                  </h2>
                </div>
              </div>
              <p className="text-sm leading-6 text-neutral-600">
                تجربه‌ای مدرن و لوکس از خرید آنلاین کالاهای دیجیتال، گجت‌های
                پوشیدنی و تجهیزات خانه هوشمند
              </p>

              {/* Social Media */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="flex items-center justify-center size-10 rounded-xl bg-white border border-purple-100 text-purple-600 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all shadow-sm hover:shadow-md"
                      aria-label={social.label}
                    >
                      <Icon className="size-5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-5">
              <h3 className="text-base font-bold text-neutral-900">
                دسترسی سریع
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-sm text-neutral-600 hover:text-purple-700 transition-colors inline-block hover:translate-x-[-4px] duration-200"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-5">
              <h3 className="text-base font-bold text-neutral-900">
                خدمات مشتریان
              </h3>
              <ul className="space-y-2.5">
                {customerService.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-sm text-neutral-600 hover:text-purple-700 transition-colors inline-block hover:translate-x-[-4px] duration-200"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="text-base font-bold text-neutral-900">
                ارتباط با ما
              </h3>
              <ul className="space-y-4">
                {supportLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 flex-shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-purple-700 mb-1">
                          {item.label}
                        </p>
                        {item.href !== "#" ? (
                          <Link
                            href={item.href}
                            className="text-sm text-neutral-600 hover:text-purple-700 transition-colors break-words"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className="text-sm text-neutral-600 break-words">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-purple-100/60 bg-white/50 backdrop-blur-sm py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-neutral-600 font-medium text-center sm:text-right">
              © {new Date().getFullYear()} کارگو پلاس. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <Link
                href="/privacy"
                className="text-neutral-600 hover:text-purple-700 transition-colors font-medium"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-neutral-600 hover:text-purple-700 transition-colors font-medium"
              >
                شرایط استفاده
              </Link>
              <Link
                href="/about"
                className="text-neutral-600 hover:text-purple-700 transition-colors font-medium"
              >
                درباره ما
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
