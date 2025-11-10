'use client';

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";

export function AuthPageClient() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const { user, loading: authLoading, refresh: refreshSession } = useSupabaseAuth();

  const toggleMode = () => setMode((prev) => (prev === "login" ? "signup" : "login"));
  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/profile");
    }
  }, [authLoading, user, router]);

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-neutral-100 px-4 py-16">
        <div className="max-w-lg space-y-6 rounded-3xl border border-neutral-200 bg-white/90 px-8 py-10 text-center shadow-[0_25px_60px_-35px_rgba(16,24,40,0.35)] backdrop-blur-xl">
          <h1 className="text-2xl font-black text-neutral-900">پیکربندی Supabase تکمیل نشده است</h1>
          <p className="text-sm leading-7 text-neutral-600">
            برای فعال سازی ورود و ثبت نام، مقادیر <code className="rounded bg-neutral-100 px-2 py-1">NEXT_PUBLIC_SUPABASE_URL</code> و
            <code className="mx-1 rounded bg-neutral-100 px-2 py-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> را در فایل <code className="rounded bg-neutral-100 px-2 py-1">.env.local</code>
            وارد کنید و سپس سرور را مجدداً راه اندازی نمایید.
          </p>
          <p className="text-xs text-neutral-500">
            به مستندات Supabase مراجعه کنید یا راهنمای پروژه در README را دنبال نمایید.
          </p>
          <Link
            href="https://supabase.com/"
            target="_blank"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ساخت پروژه Supabase
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-100 py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-120px] top-[-160px] h-72 w-72 rounded-full bg-gradient-to-br from-indigo-200/60 via-sky-200/50 to-teal-200/60 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-80px] h-80 w-80 rounded-full bg-gradient-to-br from-rose-200/60 via-orange-200/55 to-amber-200/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <aside className="relative hidden overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_30px_70px_-40px_rgba(16,24,40,0.4)] backdrop-blur-xl lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/85 via-neutral-900/80 to-neutral-900/85" />
          <div className="relative flex w-full flex-col justify-between gap-10 p-10 text-white">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-medium uppercase tracking-wide">
                بازار نو
              </span>
              <h1 className="text-3xl font-black leading-snug">
                با حساب کاربری بازار نو هر خرید راحت تر و سریع تر است.
              </h1>
              <p className="text-sm leading-7 text-white/80">
                با عضویت در بازار نو از پشتیبانی اختصاصی، ارسال سریع، باشگاه مشتریان و پیشنهادهای ویژه هفتگی بهره مند شوید.
              </p>
            </div>

            <div className="space-y-4 text-sm text-white/90">
              <Feature text="مدیریت ساده سفارش ها و پیگیری لحظه ای" />
              <Feature text="دسترسی به پیشنهادهای اختصاصی و تخفیف های باشگاه مشتریان" />
              <Feature text="پشتیبانی تخصصی قبل و بعد از خرید" />
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <div className="relative flex flex-col gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=900&q=80"
                  alt="گوشی های منتخب بازار نو"
                  width={480}
                  height={320}
                  className="h-40 w-full rounded-xl object-cover"
                />
                <p className="text-sm leading-6 text-white">
                  در کمتر از دو دقیقه ثبت نام کنید و اولین سفارش خود را با ارسال رایگان برای سفارش های بالای ۱۰ میلیون تومان ثبت کنید.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-[0_25px_60px_-35px_rgba(16,24,40,0.35)] backdrop-blur-xl">
          <div className="absolute right-[-90px] top-[-120px] h-52 w-52 rounded-full bg-gradient-to-br from-purple-200/50 via-blue-200/45 to-sky-200/55 blur-3xl" />
          <div className="absolute left-[-70px] bottom-[-120px] h-56 w-56 rounded-full bg-gradient-to-br from-emerald-200/50 via-teal-200/45 to-cyan-200/50 blur-3xl" />

          <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-black text-neutral-900">
                {mode === "signup" ? "ایجاد حساب جدید" : "ورود به حساب"}
              </h2>
              <p className="text-sm text-neutral-600">
                {mode === "signup"
                  ? "برای دسترسی آسان به سفارش ها و دریافت پیشنهادهای ویژه حساب کاربری بسازید."
                  : "برای مشاهده سفارش های خود وارد شوید و خرید را ادامه دهید."}
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);

                const email = String(formData.get("auth-email") ?? "").trim();
                const password = String(formData.get("password") ?? "").trim();
                const firstName = String(formData.get("signup-name") ?? "").trim();
                const lastName = String(formData.get("signup-family") ?? "").trim();

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
                      setFeedback({ type: "error", message: error.message });
                    } else {
                      form.reset();
                      setFeedback({
                        type: "success",
                        message: "حساب شما ساخته شد. ایمیل خود را برای تایید و ورود بررسی کنید.",
                      });
                      setMode("login");
                    }
                  } else {
                    const { error } = await supabase.auth.signInWithPassword({
                      email,
                      password,
                    });

                    if (error) {
                      setFeedback({ type: "error", message: error.message });
                    } else {
                      setFeedback({ type: "success", message: "ورود با موفقیت انجام شد." });
                      await refreshSession();
                      router.refresh();
                      router.push("/profile");
                    }
                  }
                } catch (error) {
                  console.error("Supabase auth error", error);
                  setFeedback({ type: "error", message: "خطایی هنگام برقراری ارتباط با سرور رخ داد." });
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
                    icon={<User className="size-4 text-neutral-400" aria-hidden />}
                  />
                  <FormField
                    id="signup-family"
                    label="نام خانوادگی"
                    placeholder="مثال: رضایی"
                    icon={<User className="size-4 text-neutral-400" aria-hidden />}
                  />
                </div>
              )}

              <FormField
                id="auth-email"
                label="ایمیل"
                placeholder="example@email.com"
                type="email"
                icon={<Mail className="size-4 text-neutral-400" aria-hidden />}
              />

              <div className="space-y-2">
                <label htmlFor="auth-password" className="text-sm font-medium text-neutral-800">
                  رمز عبور
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 focus-within:border-neutral-900 focus-within:text-neutral-900">
                  <Lock className="size-4 text-neutral-400" aria-hidden />
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور قوی"
                    className="flex-1 bg-transparent outline-none"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="rounded-full p-1 text-neutral-400 transition hover:text-neutral-700"
                    aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
                  >
                    {showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                  </button>
                </div>
                <p className="text-xs text-neutral-500">رمز عبور باید حداقل ۸ کاراکتر و ترکیبی از حروف و اعداد باشد.</p>
              </div>

              {mode === "signup" && (
                <div className="flex items-start gap-2 rounded-2xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" aria-hidden />
                  <span>
                    با ایجاد حساب، شرایط استفاده و سیاست حریم خصوصی بازار نو را می پذیرم و از برنامه های باشگاه مشتریان بهره مند می شوم.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              >
                {isSubmitting ? "در حال ارسال..." : mode === "signup" ? "ثبت نام و ورود" : "ورود"}
              </button>
            </form>

            {feedback ? (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  feedback.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 text-sm text-neutral-600">
              {mode === "signup" ? (
                <p>
                  قبلاً حساب دارید؟
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="mr-2 font-semibold text-neutral-900 underline-offset-4 hover:underline"
                  >
                    ورود به حساب
                  </button>
                </p>
              ) : (
                <p>
                  حسابی ندارید؟
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="mr-2 font-semibold text-neutral-900 underline-offset-4 hover:underline"
                  >
                    ایجاد حساب جدید
                  </button>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                <span>با ورود، شرایط و قوانین را می پذیرم.</span>
                <Link href="/privacy" className="transition hover:text-neutral-700">
                  حریم خصوصی
                </Link>
                <Link href="/terms" className="transition hover:text-neutral-700">
                  شرایط استفاده
                </Link>
              </div>
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
      <label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 focus-within:border-neutral-900 focus-within:text-neutral-900">
        {icon}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
          required
          autoComplete="off"
        />
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="size-4 text-emerald-400" aria-hidden />
      <span className="text-sm text-white/85">{text}</span>
    </div>
  );
}
