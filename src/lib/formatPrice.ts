export function formatPrice(value: number, currencyLabel = "تومان") {
  return `${new Intl.NumberFormat("fa-IR").format(Math.max(0, value))} ${currencyLabel}`;
}

export function formatCompactPrice(value: number, currencyLabel = "تومان") {
  return `${new Intl.NumberFormat("fa-IR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Math.max(0, value))} ${currencyLabel}`;
}
