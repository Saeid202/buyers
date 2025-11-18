import { getCurrencyLabel } from "./currency";

export function formatPrice(value: number, currency?: string) {
  const currencyLabel = currency ? getCurrencyLabel(currency) : "تومان";
  
  // برای واحدهای پول غیر از IRR، از فرمت بین‌المللی استفاده می‌کنیم
  if (currency && currency !== "IRR") {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Math.max(0, value));
    } catch {
      // در صورت خطا، فرمت ساده استفاده می‌شود
      return `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Math.max(0, value))} ${currencyLabel}`;
    }
  }
  
  // برای IRR (تومان) از فرمت فارسی استفاده می‌کنیم
  return `${new Intl.NumberFormat("fa-IR").format(Math.max(0, value))} ${currencyLabel}`;
}

export function formatCompactPrice(value: number, currency?: string) {
  const currencyLabel = currency ? getCurrencyLabel(currency) : "تومان";
  
  // برای واحدهای پول غیر از IRR
  if (currency && currency !== "IRR") {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        notation: "compact",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(Math.max(0, value));
    } catch {
      return `${new Intl.NumberFormat("en-US", {
        notation: "compact",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(Math.max(0, value))} ${currencyLabel}`;
    }
  }
  
  // برای IRR (تومان)
  return `${new Intl.NumberFormat("fa-IR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Math.max(0, value))} ${currencyLabel}`;
}
