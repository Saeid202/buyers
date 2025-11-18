import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { PriceTag } from "@/components/common/PriceTag";
import { HeroSlider } from "@/components/home/HeroSlider";
import {Features} from "@/components/home/Features";
import { 
  getFeaturedProducts, 
  getLatestProducts, 
  getAllProducts 
} from "@/lib/products";

export const metadata: Metadata = {
  title: "خانه | بازار نو",
  description:
    "بازار نو فروشگاه آنلاین محصولات دیجیتال، گجت و لوازم خانه هوشمند به زبان فارسی با ارسال سریع و پشتیبانی اختصاصی است.",
};

export default async function Home() {
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

  // Fetch products from Supabase
  const [featuredBase, allProducts, latestProducts] = await Promise.all([
    getFeaturedProducts(6),
    getAllProducts(),
    getLatestProducts(5),
  ]);

  const spotlightProduct = featuredBase[0] ?? allProducts[0] ?? null;

  const quickBuyProducts = ensureUnique(
    spotlightProduct ? featuredBase.filter((item) => item.id !== spotlightProduct.id) : featuredBase,
    4,
    allProducts,
    spotlightProduct ? [spotlightProduct.id] : [],
  );

  const featuredGridProducts = ensureUnique(featuredBase, 5, allProducts);
  const newArrivalProducts = ensureUnique(latestProducts, 5, allProducts);

  return (
    <div className="bg-neutral-50">
      <HeroSlider />

      <Features/>

      <section id="quick-buy" className="bg-white py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">خرید سریع</h2>
            <Link href="/cart" className="text-sm text-neutral-600 hover:text-neutral-900">
              لیست تمام محصولات
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {featuredGridProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="bg-white py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">منتخب های بازار نو</h2>
            <Link href="/cart" className="text-sm text-neutral-600 hover:text-neutral-900">
              لیست تمام محصولات
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {featuredGridProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="new-products" className="mx-auto container px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">جدیدترین محصولات</h2>
            <p className="mt-2 text-sm text-neutral-600">
              کالاهایی که همین امروز به فروشگاه اضافه شده اند
            </p>
          </div>
          <Link href="/cart" className="text-sm text-neutral-600 hover:text-neutral-900">
            لیست تمامی محصولات
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
