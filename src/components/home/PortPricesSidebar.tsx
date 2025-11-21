"use client";

import { Ship, TrendingUp, MapPin } from "lucide-react";

const ports = [
  {
    name: "بندر شانگهای",
    price: 850,
    description: "محبوب‌ترین مسیر",
    trend: "up" as const,
  },
  {
    name: "بندر شنژن",
    price: 920,
    description: "سریع‌ترین تحویل",
    trend: "stable" as const,
  },
  {
    name: "بندر گوانگژو",
    price: 780,
    description: "اقتصادی‌ترین گزینه",
    trend: "down" as const,
  },
  {
    name: "بندر نینگبو",
    price: 880,
    description: "مناسب برای حجم بالا",
    trend: "stable" as const,
  },
];

export function PortPricesSidebar() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100/60 p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-md">
          <Ship className="size-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-neutral-900">
            قیمت‌های بنادر چین
          </h3>
          <p className="text-xs text-neutral-600">به‌روزرسانی روزانه</p>
        </div>
      </div>

      <div className="space-y-4">
        {ports.map((port, index) => (
          <div
            key={index}
            className="group p-4 rounded-xl border border-neutral-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-purple-600" />
                <span className="text-sm font-bold text-neutral-800">
                  {port.name}
                </span>
              </div>
              {port.trend === "up" && (
                <TrendingUp className="size-4 text-green-600" />
              )}
              {port.trend === "down" && (
                <TrendingUp className="size-4 text-red-600 rotate-180" />
              )}
            </div>
            <div className="text-right mb-1">
              <span className="text-sm text-neutral-600">از </span>
              <span className="text-xl font-black text-purple-700">
                {port.price.toLocaleString()}
                <span className="text-lg">$</span>
              </span>
              <span className="text-xs text-neutral-500"> دلار</span>
            </div>
            <p className="text-xs text-neutral-600">{port.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
