import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedProducts,
  products,
} from "@/data/products";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { PriceTag } from "@/components/common/PriceTag";
import { HeroSlider } from "@/components/home/HeroSlider";

export const metadata: Metadata = {
  title: "خانه | بازار نو",
  description:
    "بازار نو فروشگاه آنلاین محصولات دیجیتال، گجت و لوازم خانه هوشمند به زبان فارسی با ارسال سریع و پشتیبانی اختصاصی است.",
};

export default function Home() {
  const ensureUnique = (
    source: Product[],
    required: number,
    fallback: Product[],
    exclude: string[] = [],
  ) => {
    const result: Product[] = [];
    const seen = new Set(exclude);

    const append = (items: Product[]) => {
      for (const item of items) {
        if (result.length >= required) {
          break;
        }
        if (seen.has(item.id)) {
          continue;
        }
        result.push(item);
        seen.add(item.id);
      }
    };

    append(source);
    append(fallback);

    return result.slice(0, required);
  };

  const featuredBase = getFeaturedProducts(6);
  const spotlightProduct = featuredBase[0] ?? products[0] ?? null;

  const quickBuyProducts = ensureUnique(
    spotlightProduct ? featuredBase.filter((item) => item.id !== spotlightProduct.id) : featuredBase,
    4,
    products,
    spotlightProduct ? [spotlightProduct.id] : [],
  );

  const featuredGridProducts = ensureUnique(featuredBase, 5, products);
  const newArrivalProducts = ensureUnique(products, 5, products);

  return (
    <div className="bg-neutral-50">
      <HeroSlider />

      <section id="quick-buy" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">خرید سریع</h2>
            <Link href="/cart" className="text-sm text-neutral-600 hover:text-neutral-900">
              مشاهده سبد خرید
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 transition hover:border-neutral-900">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={
                    spotlightProduct?.images[0]?.url ??
                    "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={spotlightProduct?.images[0]?.alt ?? spotlightProduct?.name ?? "پیشنهاد ویژه"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-5 py-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {spotlightProduct?.name ?? "پیشنهاد ویژه امروز"}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-3">
                  {spotlightProduct?.shortDescription ??
                    "ترکیبی از محبوب ترین کالاهای دیجیتال با ارسال رایگان و تخفیف اختصاصی برای اعضای باشگاه بازار نو."}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  {spotlightProduct ? (
                    <PriceTag value={spotlightProduct.price} />
                  ) : (
                    <span className="text-base font-bold text-neutral-900">---</span>
                  )}
                  <Link
                    href={spotlightProduct ? `/products/${spotlightProduct.slug}` : "/checkout"}
                    className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              </div>
            </article>

            {quickBuyProducts.map((product) => (
              <ProductCard key={`quick-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">منتخب های بازار نو</h2>
            <Link href="/cart" className="text-sm text-neutral-600 hover:text-neutral-900">
              خرید سریع
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {featuredGridProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="new-products" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">جدیدترین محصولات</h2>
            <p className="mt-2 text-sm text-neutral-600">
              کالاهایی که همین امروز به فروشگاه اضافه شده اند
            </p>
          </div>
          <Link href="/cart" className="text-sm text-neutral-600 hover:text-neutral-900">
            تکمیل خرید
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {newArrivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
