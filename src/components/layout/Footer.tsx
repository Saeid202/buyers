import Link from "next/link";

const quickLinks = [
  { href: "/", label: "خانه" },
  { href: "/#categories", label: "دسته بندی ها" },
  { href: "/cart", label: "سبد خرید" },
  { href: "/checkout", label: "تکمیل سفارش" },
];

const supportLinks = [
  { label: "پشتیبانی ۲۴/۷", value: "۰۲۱ ۰۰۰۰۰" },
  { label: "ایمیل", value: "info@cargoplus.site" },
  { label: "آدرس", value: "تهران، خیابان فناوری، ساختمان بازار نو" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-neutral-100 via-white to-white">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[180px] w-[180px] rounded-full bg-gradient-to-br from-purple-200/40 via-blue-200/40 to-sky-200/40 blur-3xl" />
      </div>

      <div className="w-full px-4 pt-10 pb-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_20px_60px_-30px_rgba(16,24,40,0.3)] backdrop-blur-xl">
          <div className="absolute -top-20 right-12 h-40 w-40 rounded-full bg-gradient-to-tr from-rose-200/45 via-orange-200/40 to-amber-200/45 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-gradient-to-tr from-cyan-200/45 via-teal-200/40 to-emerald-200/45 blur-3xl" />

          <div className="relative grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-neutral-900">
                بازار نو
              </h2>
              <p className="text-lg leading-8 text-neutral-600">
                بازار نو تجربه ای مدرن از خرید آنلاین کالاهای دیجیتال، گجت های پوشیدنی و تجهیزات خانه هوشمند است. ما با ارسال سریع، ضمانت بازگشت و پشتیبانی تخصصی همراهتان هستیم.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
                <span className="rounded-full bg-neutral-100 px-4 py-2">ارسال سریع به سراسر کشور</span>
                <span className="rounded-full bg-neutral-100 px-4 py-2">۷ روز ضمانت بازگشت</span>
                <span className="rounded-full bg-neutral-100 px-4 py-2">پشتیبانی همه روزه</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">دسترسی سریع</h3>
              <ul className="mt-6 space-y-4 text-base text-neutral-600">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link className="transition hover:text-neutral-900" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">ارتباط با بازار نو</h3>
              <ul className="mt-6 space-y-4 text-base text-neutral-600">
                {supportLinks.map((item) => (
                  <li key={item.label}>
                    <p className="font-semibold text-neutral-800">{item.label}</p>
                    <p className="text-neutral-600">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative border-t border-white/60 bg-white/70 px-6 py-5 text-sm text-neutral-500 shadow-[0_-12px_35px_-25px_rgba(16,24,40,0.45)] sm:flex sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} بازار نو. تمامی حقوق محفوظ است.</p>
            <div className="flex items-center gap-4 text-neutral-500">
              <Link href="/privacy" className="transition hover:text-neutral-800">
                حریم خصوصی
              </Link>
              <Link href="/terms" className="transition hover:text-neutral-800">
                شرایط استفاده
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
