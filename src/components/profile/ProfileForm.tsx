"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";

type ProfileFormProps = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companySite: string;
  address: string;
  notes: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  companySite: string;
  address: string;
  notes: string;
};

export function ProfileForm({
  userId,
  email,
  firstName,
  lastName,
  companyName,
  companySite,
  address,
  notes,
}: ProfileFormProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [formValues, setFormValues] = useState<FormState>({
    firstName,
    lastName,
    companyName,
    companySite,
    address,
    notes,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof FormState,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const { error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          user_id: userId,
          first_name: formValues.firstName.trim(),
          last_name: formValues.lastName.trim(),
          company_name: formValues.companyName.trim(),
          company_site: formValues.companySite.trim(),
          address: formValues.address.trim(),
          notes: formValues.notes.trim(),
        },
        { onConflict: "user_id" },
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
      className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">پروفایل کاربری</h2>
          <p className="mt-1 text-xs text-neutral-500">
            اطلاعات خود را برای دریافت خدمات اختصاصی بازار نو تکمیل کنید.
          </p>
        </div>
        <span className="rounded-2xl bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
          ایمیل ورود: {email}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="first-name"
          label="نام"
          placeholder="مثال: علی"
          value={formValues.firstName}
          onChange={handleChange("firstName")}
        />
        <FormField
          id="last-name"
          label="نام خانوادگی"
          placeholder="مثال: رضایی"
          value={formValues.lastName}
          onChange={handleChange("lastName")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="company-name"
          label="نام شرکت"
          placeholder="مثال: بازار نو"
          value={formValues.companyName}
          onChange={handleChange("companyName")}
        />
        <FormField
          id="company-site"
          label="وب سایت شرکت"
          placeholder="https://example.com"
          value={formValues.companySite}
          onChange={handleChange("companySite")}
        />
      </div>

      <FormField
        id="address"
        label="آدرس کامل"
        placeholder="تهران، خیابان ..."
        value={formValues.address}
        onChange={handleChange("address")}
      />

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium text-neutral-800">
          توضیحات و یادداشت ها
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formValues.notes}
          onChange={handleChange("notes")}
          placeholder="توضیح کوتاهی درباره کسب و کار خود بنویسید"
          className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-neutral-500">
          {status === "success"
            ? "اطلاعات با موفقیت ذخیره شد."
            : "پس از ذخیره، اطلاعات شما در پروفایل و سفارش ها استفاده می شود."}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
          disabled={status === "saving"}
        >
          {status === "saving" ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>

      {status === "error" && errorMessage && (
        <p className="text-xs text-red-600">خطا در ذخیره اطلاعات: {errorMessage}</p>
      )}
    </form>
  );
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
      />
    </div>
  );
}
