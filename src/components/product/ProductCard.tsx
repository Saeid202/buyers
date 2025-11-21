import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { PriceTag } from "@/components/common/PriceTag";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-purple-100/60 bg-white shadow-sm transition-all hover:shadow-lg hover:border-purple-300/60 hover:-translate-y-1"
    >
      <article className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-purple-50 to-amber-50">
          <Image
            src={product.images[0]?.url}
            alt={product.images[0]?.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 20vw, 16vw"
            loading="lazy"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-1 flex-col gap-3 px-4 py-5">
          <h3 className="text-base font-bold text-neutral-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
          <div className="mt-auto pt-2 border-t border-purple-100">
            <div className="flex items-center justify-between">
              <PriceTag
                value={product.price}
                currency={product.currency}
                size="lg"
              />
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded-md">
                موجود
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
