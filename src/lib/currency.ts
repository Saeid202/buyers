/**
 * Currency conversion utilities
 */

// نرخ تبدیل تقریبی (این باید از API یا تنظیمات سیستم دریافت شود)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, // پایه
  IRR: 50000, // تقریبی: 1 دلار = 50000 تومان
  EUR: 1.1, // تقریبی: 1 یورو = 1.1 دلار
};

/**
 * Gets the common currency from cart items
 * If all items have the same currency, returns that currency
 * Otherwise returns the most common currency, or "IRR" as default
 */
export function getCartCurrency(items: Array<{ currency?: string }>): string {
  if (!items || items.length === 0) {
    return "IRR";
  }

  const currencies = items
    .map((item) => item.currency)
    .filter((currency): currency is string => !!currency);

  if (currencies.length === 0) {
    return "IRR";
  }

  // اگر همه یکسان هستند، همان را برگردان
  const uniqueCurrencies = new Set(currencies);
  if (uniqueCurrencies.size === 1) {
    return currencies[0];
  }

  // در غیر این صورت، بیشترین تکرار را برگردان
  const currencyCounts = new Map<string, number>();
  currencies.forEach((currency) => {
    currencyCounts.set(currency, (currencyCounts.get(currency) || 0) + 1);
  });

  let maxCount = 0;
  let mostCommonCurrency = "IRR";
  currencyCounts.forEach((count, currency) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommonCurrency = currency;
    }
  });

  return mostCommonCurrency;
}

/**
 * Converts shipping cost from IRR (Toman) to the target currency
 * Base shipping cost is 250000 Toman
 */
export function convertShippingCost(
  baseShippingToman: number,
  targetCurrency: string
): number {
  if (targetCurrency === "IRR" || !targetCurrency) {
    return baseShippingToman;
  }

  // تبدیل تومان به دلار (پایه)
  const usdRate = EXCHANGE_RATES.IRR || 50000;
  const shippingInUSD = baseShippingToman / usdRate;

  // تبدیل به واحد پول هدف
  const targetRate = EXCHANGE_RATES[targetCurrency] || 1;
  return shippingInUSD * targetRate;
}

/**
 * Gets currency label in Persian
 */
export function getCurrencyLabel(currency: string): string {
  const labels: Record<string, string> = {
    IRR: "تومان",
    USD: "دلار",
    EUR: "یورو",
    GBP: "پوند",
  };

  return labels[currency] || currency;
}



