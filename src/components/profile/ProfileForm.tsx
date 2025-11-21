"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";

type ProfileFormProps = {
  userId: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companySite: string;
  phone: string;
  notes: string;
};

type FormState = {
  fullName: string;
  companyName: string;
  companySite: string;
  phone: string;
  notes: string;
};

export function ProfileForm({
  userId,
  email,
  fullName,
  companyName,
  companySite,
  phone,
  notes,
}: ProfileFormProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [formValues, setFormValues] = useState<FormState>({
    fullName,
    companyName,
    companySite,
    phone,
    notes,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      setStatus("error");
      setErrorMessage("تنظیمات Supabase تکمیل نشده است.");
      return;
    }

    setStatus("saving");
    setErrorMessage(null);

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        full_name: formValues.fullName.trim() || null,
        company_name: formValues.companyName.trim() || null,
        website: formValues.companySite.trim() || null,
        phone: formValues.phone.trim() || null,
        bio: formValues.notes.trim() || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-neutral-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/10 sm:p-8"
    >
      <div className="relative">
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25">
                <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  اطلاعات پروفایل
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  مشخصات خود را تکمیل و به‌روزرسانی کنید
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <FormField
            id="full-name"
            label="نام و نام خانوادگی"
            placeholder="مثال: علی رضایی"
            value={formValues.fullName}
            onChange={handleChange("fullName")}
            icon={
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="company-name"
              label="نام شرکت"
              placeholder="مثال: بازار نو"
              value={formValues.companyName}
              onChange={handleChange("companyName")}
              icon={
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              }
            />
            <FormField
              id="phone"
              label="شماره تماس"
              placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
              value={formValues.phone}
              onChange={handleChange("phone")}
              icon={
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              }
            />
          </div>

          <FormField
            id="company-site"
            label="وب سایت شرکت"
            placeholder="https://example.com"
            value={formValues.companySite}
            onChange={handleChange("companySite")}
            icon={
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            }
          />

          <div className="space-y-2">
            <label htmlFor="notes" className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
              <svg className="size-5 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span>توضیحات و یادداشت ها</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formValues.notes}
              onChange={handleChange("notes")}
              placeholder="توضیح کوتاهی درباره کسب و کار خود بنویسید..."
              className="w-full rounded-2xl border border-neutral-200/60 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-700 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-neutral-400 focus:border-blue-500/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200/60 bg-gradient-to-r from-emerald-50 to-emerald-50/50 px-4 py-3 backdrop-blur-sm">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25">
              <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-medium text-emerald-700">
              اطلاعات با موفقیت ذخیره شد!
            </p>
          </div>
        )}

        {status === "error" && errorMessage && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200/60 bg-gradient-to-r from-red-50 to-red-50/50 px-4 py-3 backdrop-blur-sm">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/25">
              <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">خطا در ذخیره اطلاعات</p>
              <p className="mt-0.5 text-xs text-red-600">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setFormValues({
                  fullName,
                  companyName,
                  companySite,
                  phone,
                  notes,
                });
                setStatus("idle");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              disabled={status === "saving"}
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              بازگشت
            </button>
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === "saving"}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                {status === "saving" ? (
                  <>
                    <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <svg className="size-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    ذخیره تغییرات
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
        {icon && <span className="text-neutral-400">{icon}</span>}
        <span>{label}</span>
      </label>
      <div className="relative">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-neutral-200/60 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-700 outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-neutral-400 focus:border-blue-500/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
}
