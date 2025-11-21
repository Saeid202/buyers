"use client";

import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowLeft } from "lucide-react";
import type { Product } from "@/data/products";
import { PriceTag } from "@/components/common/PriceTag";
import { formatPrice } from "@/lib/formatPrice";

type DiscountedProductsSidebarProps = {
  products: Product[];
};

export function DiscountedProductsSidebar({
  products,
}: DiscountedProductsSidebarProps) {
  // Take first 6 products or all if less than 6
  const displayedProducts = products.slice(0, 6);

  if (displayedProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100/60 p-6 h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-md">
            <Tag className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900">
              محصولات با تخفیف
            </h3>
            <p className="text-xs text-neutral-600">پیشنهادات ویژه</p>
          </div>
        </div>
        <p className="text-sm text-neutral-500 text-center py-8">
          در حال حاضر محصولی با تخفیف موجود نیست
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100/60 p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-md">
          <Tag className="size-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-neutral-900">
            محصولات با تخفیف
          </h3>
          <p className="text-xs text-neutral-600">پیشنهادات ویژه</p>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group flex gap-3 p-3 rounded-xl border border-neutral-200 hover:border-red-300 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-red-50/30"
          >
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-purple-50 to-amber-50">
              <Image
                src={product.images[0]?.url || "/placeholder-product.svg"}
                alt={product.images[0]?.alt ?? product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="80px"
              />
              <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                تخفیف
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-neutral-800 line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
                {product.name}
              </h4>
              <div className="flex flex-col gap-1">
                {/* Original Price with strikethrough */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </div>
                {/* New Price */}
                <div className="flex items-center gap-2">
                  <PriceTag
                    value={Math.round(product.price * 0.8)}
                    currency={product.currency}
                    size="sm"
                    className="text-red-600 font-bold"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors py-2 rounded-lg hover:bg-red-50"
      >
        مشاهده همه محصولات
        <ArrowLeft className="size-4" />
      </Link>
    </div>
  );
}

