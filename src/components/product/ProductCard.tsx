import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { PriceTag } from "@/components/common/PriceTag";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.images[0]?.url}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-6">
        <h3 className="text-lg font-semibold text-neutral-900 truncate">{product.name}</h3>
        <p className="text-sm text-neutral-600 line-clamp-3 truncate">{product.shortDescription}</p>
        <div className="mt-auto text-left">
          <PriceTag value={product.price} />
        </div>
          <Link
              href={`/products/${product.slug}`}
              className="rounded-md text-center border border-neutral-200 px-4 py-2 text-xs font-semibold transition text-white bg-primary"
          >
              مشاهده جزئیات
          </Link>
      </div>
    </article>
  );
}
