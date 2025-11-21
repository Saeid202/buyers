import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PriceTag } from "@/components/common/PriceTag";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductStats } from "@/components/product/ProductStats";
import { PriceDetailsModal } from "@/components/product/PriceDetailsModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Package, Shield, Truck, Headphones } from "lucide-react";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    // Use build client for static generation (no cookies available)
    const products = await getAllProducts(true);
    return products.map((product) => ({ slug: product.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "محصول یافت نشد",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.map((image) => ({
        url: image.url,
        alt: image.alt,
      })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-neutral-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="hover:text-neutral-900 transition-colors"
              >
                خانه
              </Link>
            </li>
            <li>
              <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </li>
            <li>
              <Link
                href="/#categories"
                className="hover:text-neutral-900 transition-colors"
              >
                محصولات
              </Link>
            </li>
            <li>
              <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </li>
            <li className="text-neutral-700 font-medium line-clamp-1">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Right: Product Info Box */}
          <div>
            <div className="sticky top-4 space-y-4">
              {/* Product Title & Stats */}
              <div className="space-y-3">
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h1 className="mb-1.5 cursor-help text-xl font-bold leading-snug text-neutral-900 transition-colors hover:text-purple-700 lg:text-2xl">
                          {product.name}
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm">
                        <p className="text-sm">{product.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {product.shortDescription}
                  </p>
                </div>
                <ProductStats />
              </div>

              {/* Price, Stock & Actions */}
              <Card>
                <CardContent className="p-4">
                  {/* Price & Stock */}
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-4">
                    <div className="flex items-baseline gap-2">
                      <PriceTag
                        value={product.price}
                        currency={product.currency}
                        size="lg"
                        className="font-black text-xl lg:text-2xl"
                      />
                      <PriceDetailsModal
                        price={product.price}
                        currency={product.currency}
                      />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="secondary"
                            className={`cursor-help ${
                              product.inventory > 0
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <Package className="size-3" />
                            {product.inventory > 0
                              ? `${product.inventory} عدد`
                              : "ناموجود"}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <div className="space-y-2 text-sm">
                            <p className="font-semibold">جزئیات بسته‌بندی:</p>
                            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-400">
                              <li>بسته‌بندی استاندارد و محافظ</li>
                              <li>جنس کارتن: ۳ لایه مقاوم</li>
                              <li>محافظ داخلی: فوم و بابل رپ</li>
                              <li>ابعاد بسته: متناسب با محصول</li>
                              <li>
                                وزن بسته: {Math.round(product.price * 0.0001)}{" "}
                                کیلوگرم
                              </li>
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <AddToCartButton
                      product={{
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        currency: product.currency,
                        image: product.images[0]?.url ?? "",
                      }}
                    />
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <Link href="/cart">مشاهده سبد خرید</Link>
                    </Button>
                  </div>

                  {/* Services - Compact */}
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-4">
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <div className="rounded-full bg-purple-50 p-2">
                        <Truck className="size-4 text-purple-600" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-neutral-900">
                          ارسال سریع
                        </p>
                        <p className="text-[10px] text-neutral-600">
                          {product.shippingEstimate}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <div className="rounded-full bg-purple-50 p-2">
                        <Shield className="size-4 text-purple-600" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-neutral-900">
                          ضمانت
                        </p>
                        <p className="text-[10px] text-neutral-600">
                          ۷ روز بازگشت
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <div className="rounded-full bg-purple-50 p-2">
                        <Headphones className="size-4 text-purple-600" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-neutral-900">
                          پشتیبانی
                        </p>
                        <p className="text-[10px] text-neutral-600">۲۴/۷</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Left: Image Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-6">
          <ProductTabs description={product.description} tags={product.tags} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-neutral-900 lg:text-xl">
              محصولات مرتبط
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="block"
                >
                  <Card className="group transition hover:border-purple-300 hover:shadow-sm">
                    <div className="relative h-32 w-full overflow-hidden sm:h-36">
                      <Image
                        src={item.images[0]?.url}
                        alt={item.images[0]?.alt ?? item.name}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-col gap-1.5 p-3">
                      <Badge variant="outline" className="w-fit text-xs">
                        {item.categories[0]}
                      </Badge>
                      <span className="line-clamp-2 text-sm font-semibold text-neutral-900">
                        {item.name}
                      </span>
                      <PriceTag
                        value={item.price}
                        currency={item.currency}
                        size="sm"
                        className="text-neutral-700"
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
