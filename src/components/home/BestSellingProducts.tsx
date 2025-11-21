"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";
import { PriceTag } from "@/components/common/PriceTag";

type BestSellingProductsProps = {
  products: Product[];
};

export function BestSellingProducts({ products }: BestSellingProductsProps) {
  // Take first 8 products or all if less than 8
  const displayedProducts = products.slice(0, 8);

  if (displayedProducts.length === 0) {
    return (
      <div className="mt-4 sm:mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-purple-100/60 p-4 sm:p-5 shadow-sm animate-pulse"
            >
              <div className="h-24 bg-gradient-to-br from-purple-100 to-amber-100 rounded-lg mb-3" />
              <div className="h-4 bg-purple-200 rounded mb-2" />
              <div className="h-4 bg-neutral-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="size-5 text-purple-600" />
        <h3 className="text-lg font-black text-neutral-900">
          پرفروش‌ترین‌ها
        </h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative bg-white rounded-xl border border-neutral-200 hover:border-purple-300 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10">
              {/* Product Image */}
              <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-purple-50 to-amber-50">
                <Image
                  src={product.images[0]?.url || "/placeholder-product.svg"}
                  alt={product.images[0]?.alt ?? product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  loading="lazy"
                  quality={80}
                />
                <div className="absolute top-1 left-1 bg-purple-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  <TrendingUp className="size-3" />
                  پرفروش
                </div>
              </div>

              {/* Product Name */}
              <h4 className="text-sm font-bold text-neutral-900 line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                {product.name}
              </h4>

              {/* Price */}
              <div className="flex items-center justify-between">
                <PriceTag
                  value={product.price}
                  currency={product.currency}
                  size="sm"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

