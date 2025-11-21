"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";

// ترجمه پیام‌های خطا به فارسی
const translateErrorMessage = (errorMessage: string): string => {
  const translations: Record<string, string> = {
    "Invalid login credentials": "ایمیل یا رمز عبور اشتباه است",
    "Email not confirmed": "لطفاً ابتدا ایمیل خود را تایید کنید",
    "User already registered": "این ایمیل قبلاً ثبت شده است",
    "Password should be at least 6 characters":
      "رمز عبور باید حداقل ۶ کاراکتر باشد",
    "Unable to validate email address: invalid format":
      "فرمت ایمیل نامعتبر است",
    "Invalid email": "ایمیل نامعتبر است",
    "Signup requires a valid password": "رمز عبور معتبر وارد کنید",
    "Email rate limit exceeded":
      "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید",
    "User not found": "کاربری با این ایمیل یافت نشد",
    "Email link is invalid or has expired":
      "لینک ایمیل نامعتبر یا منقضی شده است",
    "Token has expired or is invalid": "توکن منقضی شده یا نامعتبر است",
    "New password should be different from the old password":
      "رمز عبور جدید باید با رمز قبلی متفاوت باشد",
    "Password is too weak": "رمز عبور بسیار ضعیف است",
  };

  // اگر ترجمه دقیق پیدا شد، برگردان
  if (translations[errorMessage]) {
    return translations[errorMessage];
  }

  // اگر پیام شامل کلمات کلیدی بود، ترجمه تقریبی
  const lowerMessage = errorMessage.toLowerCase();
  if (lowerMessage.includes("email") && lowerMessage.includes("already")) {
    return "این ایمیل قبلاً ثبت شده است";
  }
  if (
    lowerMessage.includes("password") &&
    (lowerMessage.includes("weak") || lowerMessage.includes("strong"))
  ) {
    return "رمز عبور باید قوی‌تر باشد";
  }
  if (lowerMessage.includes("rate limit")) {
    return "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید";
  }
  if (lowerMessage.includes("network") || lowerMessage.includes("connection")) {
    return "خطا در برقراری ارتباط. اینترنت خود را بررسی کنید";
  }

  // اگر ترجمه‌ای پیدا نشد، پیام فارسی عمومی
  return "خطایی رخ داده است. لطفاً دوباره تلاش کنید";
};

export function AuthPageClient() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    refresh: refreshSession,
  } = useSupabaseAuth();

  const toggleMode = () =>
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/profile");
    }
  }, [authLoading, user, router]);

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-blue-50 px-4 py-16">
        <div className="max-w-lg space-y-6 rounded-3xl border border-violet-200/50 bg-white/95 px-8 py-12 text-center shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900">
            پیکربندی Supabase تکمیل نشده است
          </h1>
          <p className="text-sm leading-7 text-neutral-600">
            برای فعال سازی ورود و ثبت نام، مقادیر{" "}
            <code className="rounded bg-violet-100 px-2 py-1 text-violet-700">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            و
            <code className="mx-1 rounded bg-violet-100 px-2 py-1 text-violet-700">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            را در فایل{" "}
            <code className="rounded bg-violet-100 px-2 py-1 text-violet-700">
              .env.local
            </code>
            وارد کنید و سپس سرور را مجدداً راه اندازی نمایید.
          </p>
          <p className="text-xs text-neutral-500">
            به مستندات Supabase مراجعه کنید یا راهنمای پروژه در README را دنبال
            نمایید.
          </p>
          <Link
            href="https://supabase.com/"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-xl hover:shadow-violet-500/40"
          >
            <Sparkles className="h-4 w-4" />
            ساخت پروژه Supabase
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-8 sm:py-12 lg:py-16">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute right-[-100px] top-[-100px] h-96 w-96 rounded-full bg-gradient-to-br from-violet-300/40 via-purple-300/30 to-fuchsia-300/40 blur-3xl" />
        <div className="animate-float-slower absolute bottom-[-150px] left-[-100px] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-300/40 via-blue-300/30 to-indigo-300/40 blur-3xl" />
        <div className="animate-float absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-300/20 via-rose-300/20 to-orange-300/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:px-8">
        {/* Left Sidebar - Enhanced Design */}
        <aside className="relative hidden overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600 shadow-2xl shadow-violet-500/30 lg:flex">
          {/* Glassy overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-[2px]" />

          {/* Decorative elements */}
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex w-full flex-col justify-between gap-8 p-8 lg:p-10 xl:p-12 text-white">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur-xl">
                <ShoppingBag className="h-4 w-4" />
                <span className="text-sm font-bold tracking-wide">
                  بازار نو
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-black leading-tight lg:text-4xl xl:text-[2.75rem]">
                  تجربه خرید هوشمند با حساب کاربری بازار نو
                </h1>
                <p className="text-base leading-relaxed text-white/90">
                  از پشتیبانی اختصاصی ۲۴/۷، ارسال فوری، امتیازات باشگاه مشتریان
                  و پیشنهادهای ویژه روزانه بهره‌مند شوید.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                <div className="rounded-full bg-emerald-400/20 p-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    پیگیری لحظه‌ای سفارشات
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    مدیریت ساده و دسترسی آسان به تمام خریدهای شما
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                <div className="rounded-full bg-amber-400/20 p-2">
                  <Zap className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white">تخفیف‌های انحصاری</h3>
                  <p className="mt-1 text-sm text-white/80">
                    دسترسی به کدهای تخفیف و پیشنهادهای ویژه اعضا
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                <div className="rounded-full bg-blue-400/20 p-2">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white">پشتیبانی تخصصی</h3>
                  <p className="mt-1 text-sm text-white/80">
                    مشاوره رایگان و پاسخگویی سریع در تمام مراحل خرید
                  </p>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-300/30 to-orange-300/30 blur-2xl" />
              <div className="relative flex flex-col gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80"
                  alt="محصولات منتخب بازار نو"
                  width={500}
                  height={300}
                  className="h-44 w-full rounded-xl object-cover shadow-xl"
                />
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 p-2">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">
                      ارسال رایگان ویژه اعضا!
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-white/90">
                      با ثبت نام امروز، اولین سفارش خود را با ارسال رایگان و
                      تخفیف ویژه تجربه کنید.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Form - Enhanced Design */}
        <main className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/80 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
          <div className="absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-gradient-to-br from-violet-200/60 via-purple-200/50 to-fuchsia-200/60 blur-3xl" />
          <div className="absolute left-[-80px] bottom-[-100px] h-72 w-72 rounded-full bg-gradient-to-br from-cyan-200/60 via-blue-200/50 to-indigo-200/60 blur-3xl" />

          <div className="relative flex flex-col gap-7 px-6 py-8 sm:px-10 sm:py-12">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30">
                  {mode === "signup" ? (
                    <User className="h-6 w-6 text-white" />
                  ) : (
                    <Lock className="h-6 w-6 text-white" />
                  )}
                </div>
                <h2 className="text-3xl font-black text-neutral-900">
                  {mode === "signup" ? "ثبت نام" : "ورود"}
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">
                {mode === "signup"
                  ? "چند ثانیه فاصله دارید تا از امکانات ویژه اعضا بهره‌مند شوید."
                  : "خوش برگشتید! وارد حساب کاربری خود شوید."}
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);

                const email = String(formData.get("auth-email") ?? "").trim();
                const password = String(formData.get("password") ?? "").trim();
                const firstName = String(
                  formData.get("signup-name") ?? ""
                ).trim();
                const lastName = String(
                  formData.get("signup-family") ?? ""
                ).trim();

                setFeedback(null);
                setIsSubmitting(true);

                try {
                  if (mode === "signup") {
                    const { error } = await supabase.auth.signUp({
                      email,
                      password,
                      options: {
                        emailRedirectTo: `${window.location.origin}/login`,
                        data: {
                          first_name: firstName,
                          last_name: lastName,
                        },
                      },
                    });

                    if (error) {
                      setFeedback({
                        type: "error",
                        message: translateErrorMessage(error.message),
                      });
                    } else {
                      form.reset();
                      setFeedback({
                        type: "success",
                        message:
                          "🎉 حساب شما با موفقیت ساخته شد! لطفاً ایمیل خود را برای تایید بررسی کنید.",
                      });
                      setMode("login");
                    }
                  } else {
                    const { error } = await supabase.auth.signInWithPassword({
                      email,
                      password,
                    });

                    if (error) {
                      setFeedback({
                        type: "error",
                        message: translateErrorMessage(error.message),
                      });
                    } else {
                      setFeedback({
                        type: "success",
                        message: "✅ ورود موفقیت‌آمیز بود! در حال انتقال...",
                      });
                      await refreshSession();
                      router.refresh();
                      router.push("/profile");
                    }
                  }
                } catch (error) {
                  console.error("Supabase auth error", error);
                  setFeedback({
                    type: "error",
                    message:
                      "خطایی در برقراری ارتباط با سرور رخ داد. لطفاً اینترنت خود را بررسی کنید.",
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {mode === "signup" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    id="signup-name"
                    label="نام"
                    placeholder="مثال: علی"
                    icon={
                      <User className="size-5 text-violet-400" aria-hidden />
                    }
                  />
                  <FormField
                    id="signup-family"
                    label="نام خانوادگی"
                    placeholder="مثال: رضایی"
                    icon={
                      <User className="size-5 text-violet-400" aria-hidden />
                    }
                  />
                </div>
              )}

              <FormField
                id="auth-email"
                label="ایمیل"
                placeholder="example@email.com"
                type="email"
                icon={<Mail className="size-5 text-blue-400" aria-hidden />}
              />

              <div className="space-y-2">
                <label
                  htmlFor="auth-password"
                  className="text-sm font-semibold text-neutral-800"
                >
                  رمز عبور
                </label>
                <div className="group flex items-center gap-3 rounded-2xl border-2 border-neutral-200 bg-white/50 px-4 py-3.5 shadow-sm backdrop-blur-sm transition-all focus-within:border-violet-500 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-violet-500/20">
                  <Lock
                    className="size-5 text-violet-400 transition group-focus-within:text-violet-500"
                    aria-hidden
                  />
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور قوی"
                    className="flex-1 bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-none"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="rounded-xl p-1.5 text-neutral-400 transition hover:bg-violet-50 hover:text-violet-600"
                    aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden />
                    ) : (
                      <Eye className="size-4" aria-hidden />
                    )}
                  </button>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <Lock className="h-3 w-3" />
                  حداقل ۸ کاراکتر با ترکیب حروف و اعداد
                </p>
              </div>

              {mode === "signup" && (
                <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm">
                  <CheckCircle2
                    className="mt-0.5 size-5 flex-shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <span className="text-xs leading-relaxed text-emerald-900">
                    با ایجاد حساب،{" "}
                    <Link href="/terms" className="font-bold underline">
                      شرایط استفاده
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="font-bold underline">
                      سیاست حریم خصوصی
                    </Link>{" "}
                    بازار نو را می‌پذیرم و از برنامه‌های باشگاه مشتریان بهره‌مند
                    می‌شوم.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      در حال پردازش...
                    </>
                  ) : mode === "signup" ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      ثبت نام و ورود
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      ورود به حساب
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Feedback Message */}
            {feedback ? (
              <div
                className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 shadow-sm ${
                  feedback.type === "success"
                    ? "bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-800 shadow-emerald-500/10"
                    : "bg-gradient-to-br from-rose-50 to-red-50 text-rose-800 shadow-rose-500/10"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                ) : (
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                    !
                  </div>
                )}
                <span className="text-sm font-medium leading-relaxed">
                  {feedback.message}
                </span>
              </div>
            ) : null}

            {/* Mode Toggle */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white/80 px-3 text-neutral-500">یا</span>
                </div>
              </div>

              {mode === "signup" ? (
                <p className="text-center text-sm text-neutral-600">
                  قبلاً حساب دارید؟
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="mr-2 font-bold text-violet-600 transition hover:text-violet-700 hover:underline underline-offset-4"
                  >
                    ورود به حساب
                  </button>
                </p>
              ) : (
                <p className="text-center text-sm text-neutral-600">
                  حسابی ندارید؟
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="mr-2 font-bold text-violet-600 transition hover:text-violet-700 hover:underline underline-offset-4"
                  >
                    ثبت نام رایگان
                  </button>
                </p>
              )}
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
              <Link
                href="/terms"
                className="font-medium transition hover:text-violet-600"
              >
                شرایط استفاده
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                href="/privacy"
                className="font-medium transition hover:text-violet-600"
              >
                حریم خصوصی
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                href="/support"
                className="font-medium transition hover:text-violet-600"
              >
                پشتیبانی
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  placeholder,
  icon,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  icon?: ReactNode;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-neutral-800">
        {label}
      </label>
      <div className="group flex items-center gap-3 rounded-2xl border-2 border-neutral-200 bg-white/50 px-4 py-3.5 shadow-sm backdrop-blur-sm transition-all focus-within:border-violet-500 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-violet-500/20">
        {icon}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-none"
          required
          autoComplete="off"
        />
      </div>
    </div>
  );
}
