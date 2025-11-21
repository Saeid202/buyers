"use client";

import { useState } from "react";
import { TrendingUp, DollarSign } from "lucide-react";

const currencies = [
  {
    name: "دلار آمریکا",
    price: 113500,
    unit: "USD",
    trend: "up" as const,
  },
  {
    name: "یورو",
    price: 130960,
    unit: "EUR",
    trend: "up" as const,
  },
  {
    name: "یوان چین",
    price: 15970,
    unit: "CNY",
    trend: "stable" as const,
  },
  {
    name: "درهم امارات",
    price: 31200,
    unit: "AED",
    trend: "stable" as const,
  },
];

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

export function PortPricesTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const animationDuration = 50;

  // Currency item component
  const CurrencyItem = ({ currency }: { currency: (typeof currencies)[0] }) => (
    <div className="inline-flex items-center whitespace-nowrap px-4" dir="rtl">
      <span className="text-sm font-medium ml-2">{currency.name}</span>
      <span className="text-sm font-bold ml-2 text-yellow-300">
        {currency.price.toLocaleString("fa-IR")} تومان
      </span>
      {currency.trend === "up" && (
        <TrendingUp className="size-3.5 text-green-300 ml-2" />
      )}
      <span className="text-purple-400 mx-3">•</span>
    </div>
  );

  // Port item component
  const PortItem = ({ port }: { port: (typeof ports)[0] }) => (
    <div className="inline-flex items-center whitespace-nowrap px-4" dir="rtl">
      <span className="text-sm font-medium ml-3">{port.name}</span>
      <span className="text-sm font-bold ml-2">
        از {port.price.toLocaleString("fa-IR")} دلار
      </span>
      {port.trend === "up" && (
        <TrendingUp className="size-3.5 text-green-300 ml-2" />
      )}
      {port.trend === "down" && (
        <TrendingUp className="size-3.5 text-red-300 rotate-180 ml-2" />
      )}
      <span className="text-xs text-purple-200 ml-2">{port.description}</span>
      <span className="text-purple-400 mx-3">•</span>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes seamless-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ticker-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
        }
        .ticker-content {
          display: flex;
          animation: seamless-scroll ${animationDuration}s linear infinite;
          will-change: transform;
        }
        .ticker-wrapper.paused .ticker-content {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="w-full bg-linear-to-r from-purple-600 to-purple-700 text-white py-2.5 overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center">
          <div className="flex items-center gap-2 px-4 bg-purple-800/50 shrink-0 z-10">
            <DollarSign className="size-4" />
            <span className="text-sm font-bold whitespace-nowrap">
              قیمت بنادر:
            </span>
          </div>
          <div className="flex-1 overflow-hidden" dir="ltr">
            <div className={`ticker-wrapper ${isPaused ? "paused" : ""}`}>
              <div className="ticker-content">
                {/* تکرار محتوا برای اسکرول بدون فاصله */}
                {[...Array(6)].map((_, setIndex) => (
                  <div key={setIndex} className="inline-flex">
                    {currencies.map((currency, currencyIndex) => (
                      <CurrencyItem
                        key={`currency-${setIndex}-${currencyIndex}`}
                        currency={currency}
                      />
                    ))}
                    {ports.map((port, portIndex) => (
                      <PortItem key={`${setIndex}-${portIndex}`} port={port} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
