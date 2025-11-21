"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

const categories = [
  {
    id: "mobile",
    name: "موبایل",
    slug: "mobile",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "laptop",
    name: "لپ تاپ",
    slug: "laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "home-appliances",
    name: "لوازم خانگی",
    slug: "home-appliances",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "fashion",
    name: "مد و پوشاک",
    slug: "fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "electronics",
    name: "الکترونیک",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "sports",
    name: "ورزش و سفر",
    slug: "sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "beauty",
    name: "زیبایی و سلامت",
    slug: "beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "books",
    name: "کتاب و لوازم تحریر",
    slug: "books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80",
  },
];

export function CategoriesSidebar() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100/60 p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
          <Package className="size-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-black text-neutral-900">دسته‌بندی محصولات</h3>
          <p className="text-xs text-neutral-600">دسترسی مستقیم به بازار چین</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group flex flex-col items-center text-center p-3 rounded-xl border border-neutral-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30"
          >
            <div className="relative w-14 h-14 mb-2 rounded-full overflow-hidden shadow-sm ring-2 ring-purple-100 group-hover:ring-purple-400 transition-all">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="56px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xs font-semibold text-neutral-700 group-hover:text-purple-700 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="mt-6 block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-sm hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg"
      >
        مشاهده همه محصولات
      </Link>
    </div>
  );
}

