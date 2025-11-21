"use client";

import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";

const currencies = [
  {
    name: "دلار آمریکا",
    code: "USD",
    price: 113500,
    change: 1500,
    trend: "up" as const,
  },
  {
    name: "یوان چین",
    code: "CNY",
    price: 15970,
    change: -200,
    trend: "down" as const,
  },
  {
    name: "یورو",
    code: "EUR",
    price: 130960,
    change: 800,
    trend: "up" as const,
  },
  {
    name: "درهم امارات",
    code: "AED",
    price: 31200,
    change: 0,
    trend: "stable" as const,
  },
];

const promotionalTexts = [
  "کارگوپلاس: واسطه مستقیم ایران به چین",
  "قیمت‌های شفاف، بدون هزینه‌های پنهان",
  "دسترسی مستقیم به بازار چین",
  "پشتیبانی کامل از ابتدا تا انتها",
  "دلیوری سریع و قابل اعتماد",
  "ترخیص سریع از گمرک",
];

export function CurrencyPricesSidebar() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Currency Prices Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100/60 p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-md">
            <DollarSign className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900">قیمت ارزها</h3>
            <p className="text-xs text-neutral-600">به‌روزرسانی لحظه‌ای</p>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {currencies.map((currency, index) => (
            <div
              key={index}
              className="p-3 rounded-xl border border-neutral-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-800">
                    {currency.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    ({currency.code})
                  </span>
                </div>
                {currency.trend === "up" && (
                  <TrendingUp className="size-4 text-green-600" />
                )}
                {currency.trend === "down" && (
                  <TrendingDown className="size-4 text-red-600" />
                )}
                {currency.trend === "stable" && (
                  <Minus className="size-4 text-neutral-400" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-amber-700">
                  {currency.price.toLocaleString("fa-IR")} تومان
                </span>
                {currency.change !== 0 && (
                  <span
                    className={`text-xs font-semibold ${
                      currency.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {currency.trend === "up" ? "+" : ""}
                    {currency.change.toLocaleString("fa-IR")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CargoPlus Promotional Section */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg border border-purple-500/50 p-6 text-white flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-black mb-2">کارگوپلاس</h3>
          <p className="text-sm text-purple-100 leading-relaxed">
            پلتفرم تخصصی خرید و حمل کالا از چین به ایران
          </p>
        </div>

        <div className="space-y-3 flex-1">
          {promotionalTexts.map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-purple-50"
            >
              <span className="text-purple-300 mt-1">✓</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-purple-500/50">
          <p className="text-xs text-purple-200 text-center leading-relaxed">
            با کارگوپلاس، تجارت با چین را ساده و مطمئن کنید
          </p>
        </div>
      </div>
    </div>
  );
}
