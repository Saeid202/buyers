import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProductBySlug,
  products,
} from "@/data/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PriceTag } from "@/components/common/PriceTag";
import { FeatureList } from "@/components/product/FeatureList";
import { SpecList } from "@/components/product/SpecList";
import { Badge } from "@/components/common/Badge";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
      images: product.images.map((image) => ({ url: image.url, alt: image.alt })),
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-xs text-neutral-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-neutral-900">
                خانه
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#categories" className="hover:text-neutral-900">
                {product.categories[0]}
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-700">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex flex-col gap-8">
            <header className="space-y-4">
              <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>
              <p className="text-sm text-neutral-600">{product.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4">
                <PriceTag value={product.price} size="lg" className="font-black" />
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                  موجود در انبار: {product.inventory} عدد
                </span>
              </div>
            </header>

            <section className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">معرفی محصول</h2>
              <p className="text-sm leading-7 text-neutral-600">{product.description}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                {product.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">ویژگی های شاخص</h2>
              <FeatureList features={product.features} />
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">مشخصات فنی</h2>
              <SpecList specs={product.specs} />
            </section>

            <section className="rounded-3xl border border-neutral-900 bg-neutral-900 px-6 py-6 text-white">
              <h2 className="text-lg font-semibold">ارسال و پشتیبانی</h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-neutral-200">
                <span>{product.shippingEstimate}</span>
                <span>۷ روز ضمانت بازگشت کالا</span>
                <span>پشتیبانی تخصصی قبل و بعد از خرید</span>
              </div>
            </section>
          </div>
        </div>

        <aside className="mt-12 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url ?? "",
              }}
            />
            <Link
              href="/cart"
              className="w-full rounded-2xl border border-neutral-200 px-6 py-4 text-center text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
            >
              مشاهده سبد خرید
            </Link>
            <p className="text-xs text-neutral-500">
              با افزودن به سبد خرید می توانید مقدار دلخواه را در مرحله بعد مشخص کنید.
            </p>
          </div>
        </aside>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-semibold text-neutral-900">محصولات مرتبط</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700 transition hover:border-neutral-900"
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={item.images[0]?.url}
                      alt={item.images[0]?.alt ?? item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="neutral" className="w-fit">
                      {item.categories[0]}
                    </Badge>
                    <span className="font-semibold text-neutral-900">{item.name}</span>
                    <PriceTag value={item.price} size="sm" className="text-neutral-700" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
