import Image from "next/image";
import { ProductImage } from "@/data/products";

type ProductGalleryProps = {
  images: ProductImage[];
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100" />
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
        <Image
          src={images[0].url}
          alt={images[0].alt ?? name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-3">
          {images.slice(1).map((image) => (
            <div
              key={image.url}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200"
            >
              <Image src={image.url} alt={image.alt ?? name} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
