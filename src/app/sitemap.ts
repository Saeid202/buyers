import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bazaarno.example.com";
  const lastModified = new Date();

  let products: Array<{ slug: string }> = [];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified,
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified,
    })),
  ];
}
