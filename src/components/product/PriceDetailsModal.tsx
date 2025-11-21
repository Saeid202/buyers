"use client";

import { Info } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PriceDetailsModalProps = {
  price: number;
  currency: string;
};

type PriceBreakdown = {
  label: string;
  value: number;
  description?: string;
};

export function PriceDetailsModal({ price, currency }: PriceDetailsModalProps) {
  // محاسبه جزئیات قیمت (نمونه - می‌تواند از API بیاید)
  const priceBreakdown: PriceBreakdown[] = [
    {
      label: "قیمت پایه محصول",
      value: price * 0.6,
      description: "قیمت خرید از کارخانه در چین",
    },
    {
      label: "هزینه حمل و نقل دریایی",
      value: price * 0.15,
      description: "از بندر شانگهای چین به بندر بندرعباس ایران",
    },
    {
      label: "هزینه گمرک و ترخیص",
      value: price * 0.1,
      description: "ترخیص کالا از گمرک بندرعباس",
    },
    {
      label: "هزینه بسته‌بندی",
      value: price * 0.05,
      description: "بسته‌بندی استاندارد و محافظ",
    },
    {
      label: "هزینه حمل داخلی",
      value: price * 0.05,
      description: "حمل از بندرعباس به انبار تهران",
    },
    {
      label: "سود و خدمات",
      value: price * 0.05,
      description: "سود معقول و خدمات پشتیبانی",
    },
  ];

  const total = priceBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 border-purple-200 text-xs text-purple-700 hover:bg-purple-50 hover:border-purple-300"
        >
          <Info className="size-3.5" />
          <span>جزئیات قیمت</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">جزئیات قیمت محصول</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* قیمت نهایی */}
          <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700">
                قیمت نهایی:
              </span>
              <span className="text-lg font-black text-purple-700">
                {formatPrice(price, currency)}
              </span>
            </div>
          </div>

          {/* تفکیک هزینه‌ها */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              تفکیک هزینه‌ها
            </h4>
            <div className="space-y-1.5">
              {priceBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-2.5 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900">{item.label}</p>
                    {item.description && (
                      <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm font-bold text-neutral-700">
                    {formatPrice(item.value, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* مجموع */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700">
                مجموع:
              </span>
              <span className="text-base font-black text-purple-700">
                {formatPrice(total, currency)}
              </span>
            </div>
          </div>

          {/* نکته */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
            <p className="text-xs leading-relaxed text-amber-800">
              <span className="font-semibold">نکته:</span> تمام قیمت‌ها به تومان
              محاسبه شده‌اند. قیمت نهایی شامل تمام هزینه‌های حمل، گمرک،
              بسته‌بندی و خدمات می‌باشد.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
