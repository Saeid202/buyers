import { Suspense } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ProductsSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
  linkText?: string;
  icon?: React.ReactNode;
};

export function ProductsSection({
  id,
  title,
  subtitle,
  products,
  href = "/cart",
  linkText = "مشاهده همه",
  icon,
}: ProductsSectionProps) {
  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              {icon && (
                <div className="inline-flex items-center gap-2 mb-1.5">
                  {icon}
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-1.5">
                {title}
              </h2>
            </div>
            {subtitle && <p className="text-sm text-neutral-600">{subtitle}</p>}
          </div>

          <Link
            href={href}
            className="text-sm font-semibold text-purple-700 hover:text-purple-800 transition-colors inline-flex items-center gap-1 w-fit"
          >
            {linkText}
            <span className="text-purple-600">
              <ArrowLeft className="size-4" />
            </span>
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
}
