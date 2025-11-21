import type { Metadata } from "next";
import { Suspense } from "react";
import type { Product } from "@/data/products";
import { HeroSlider } from "@/components/home/HeroSlider";
import { Features } from "@/components/home/Features";
import { ProductsSection } from "@/components/home/ProductsSection";
import { Categories } from "@/components/home/Categories";
import { DiscountedProductsSidebar } from "@/components/home/DiscountedProductsSidebar";
import { CurrencyPricesSidebar } from "@/components/home/CurrencyPricesSidebar";
import { PortPricesTicker } from "@/components/home/PortPricesTicker";
import { BestSellingProducts } from "@/components/home/BestSellingProducts";
import {
  getFeaturedProducts,
  getLatestProducts,
  getAllProducts,
  getDiscountedProducts,
  getBestSellingProducts,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "خانه | CargoPlus",
  description:
    "CargoPlus (کارگو پلاس) - واسطه مستقیم ایران به چین. ما شما را به بازار چین وصل می‌کنیم. محصولات، دلیوری و همه چیز با ماست. قیمت‌های شفاف و پشتیبانی کامل.",
};

export default async function Home() {
  const ensureUnique = (
    source: Product[],
    required: number,
    fallback: Product[],
    exclude: string[] = []
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
  let featuredBase: Product[] = [];
  let allProducts: Product[] = [];
  let latestProducts: Product[] = [];
  let discountedProducts: Product[] = [];
  let bestSellingProducts: Product[] = [];

  try {
    [
      featuredBase,
      allProducts,
      latestProducts,
      discountedProducts,
      bestSellingProducts,
    ] = await Promise.all([
      getFeaturedProducts(6),
      getAllProducts(),
      getLatestProducts(5),
      getDiscountedProducts(6),
      getBestSellingProducts(8),
    ]);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Continue with empty arrays if there's an error
  }

  const featuredGridProducts = ensureUnique(featuredBase, 5, allProducts);
  const newArrivalProducts = ensureUnique(latestProducts, 5, allProducts);

  return (
    <div className="bg-gradient-to-b from-white via-purple-50/20 to-white">
      {/* Port Prices Ticker at Top */}
      <PortPricesTicker />

      {/* Hero Section with Sidebars */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Left Sidebar - Currency Prices */}
          <div className="hidden lg:flex lg:col-span-3 flex-col">
            <CurrencyPricesSidebar />
          </div>

          {/* Center - Hero Slider */}
          <div className="lg:col-span-6 flex flex-col">
            <Suspense
              fallback={
                <div className="relative w-full h-[28vh] sm:h-[32vh] lg:h-[36vh] bg-gradient-to-br from-purple-100 to-amber-100 animate-pulse rounded-2xl" />
              }
            >
              <HeroSlider />
            </Suspense>
            <BestSellingProducts products={bestSellingProducts} />
          </div>

          {/* Right Sidebar - Discounted Products */}
          <div className="lg:col-span-3 flex flex-col">
            <DiscountedProductsSidebar products={discountedProducts} />
          </div>
        </div>
      </section>

      <Categories />

      <Features />

      <div className="bg-gradient-to-b from-white to-purple-50/30">
        <ProductsSection
          id="featured"
          title="منتخب‌ها"
          subtitle="بهترین محصولات با بهترین قیمت"
          products={featuredGridProducts}
          icon={
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          }
        />
      </div>

      <ProductsSection
        id="new-products"
        title="جدیدترین‌ها"
        subtitle="کالاهایی که همین امروز به فروشگاه اضافه شده‌اند"
        products={newArrivalProducts}
        icon={
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        }
      />
    </div>
  );
}
