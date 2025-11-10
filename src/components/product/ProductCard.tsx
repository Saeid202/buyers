import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { PriceTag } from "@/components/common/PriceTag";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 transition hover:border-neutral-900">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.images[0]?.url}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-6">
        <h3 className="text-lg font-semibold text-neutral-900">{product.name}</h3>
        <p className="text-sm text-neutral-600 line-clamp-3">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between">
          <PriceTag value={product.price} />
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            مشاهده جزئیات
          </Link>
        </div>
      </div>
    </article>
  );
}
