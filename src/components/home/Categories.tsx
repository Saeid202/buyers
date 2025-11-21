"use client";

import Image from "next/image";
import Link from "next/link";

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

export function Categories() {
  return (
    <section
      id="categories"
      className="py-12 sm:py-16 bg-gradient-to-b from-white via-purple-50/20 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-1.5">
            دسته بندی ها
          </h2>
          <p className="text-sm text-neutral-600">
            محصولات را بر اساس دسته بندی مورد نظر خود جستجو کنید
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 ring-2 ring-purple-100 group-hover:ring-purple-400">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-neutral-700 group-hover:text-purple-700 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


