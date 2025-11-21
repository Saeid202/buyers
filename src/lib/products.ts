import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getSupabaseBuildClient } from "@/lib/supabase/buildClient";
import type { Product, ProductImage } from "@/data/products";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/**
 * Type for database product row with relations
 */
type DbProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  inventory: number | null;
  shipping_notes: string | null;
  lead_time_days: number | null;
  category?: { name: string } | null;
  subcategory?: { name: string } | null;
  product_images?: Array<{
    id: string;
    storage_path: string;
    position: number;
  }> | null;
};

/**
 * Gets the public URL for a product image from storage path
 */
function getProductImageUrl(storagePath: string): string {
  if (!SUPABASE_URL) {
    return "";
  }
  return `${SUPABASE_URL}/storage/v1/object/public/product-images/${storagePath}`;
}

/**
 * Fetches product images for a given product ID
 */
async function getProductImages(
  productId: string,
  useBuildClient = false
): Promise<Array<{ storage_path: string; position: number }>> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const supabase = useBuildClient
      ? getSupabaseBuildClient()
      : await getSupabaseServerClient();

    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("product_images")
      .select("storage_path, position")
      .eq("product_id", productId)
      .order("position", { ascending: true });

    if (error) {
      // Silently fail - products can work without images
      return [];
    }

    return data || [];
  } catch (error) {
    // Silently fail - products can work without images
    return [];
  }
}

/**
 * Maps database row to Product type
 */
function mapDbProductToProduct(dbProduct: DbProductRow): Product {
  // Extract category names from nested objects
  const categories: string[] = [];
  if (dbProduct.category) {
    categories.push(dbProduct.category.name);
  }
  if (dbProduct.subcategory) {
    categories.push(dbProduct.subcategory.name);
  }

  // Extract images from product_images array
  const images: ProductImage[] = [];
  if (
    Array.isArray(dbProduct.product_images) &&
    dbProduct.product_images.length > 0
  ) {
    // Sort by position
    const sortedImages = [...dbProduct.product_images].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0)
    );
    images.push(
      ...sortedImages.map((img) => ({
        url: getProductImageUrl(img.storage_path),
        alt: dbProduct.name ?? "",
      }))
    );
  }

  // Extract short description from description (first 100 characters)
  const description = dbProduct.description ?? "";
  const shortDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description || "محصول با کیفیت و مناسب";

  // Extract shipping estimate from shipping_notes or use default
  const shippingEstimate = dbProduct.shipping_notes
    ? dbProduct.shipping_notes
    : dbProduct.lead_time_days
    ? `ارسال در ${dbProduct.lead_time_days} روز کاری`
    : "ارسال ۲۴ الی ۴۸ ساعته";

  return {
    id: dbProduct.id?.toString() ?? "",
    slug: dbProduct.slug ?? "",
    name: dbProduct.name ?? "",
    shortDescription,
    description: description || "توضیحات محصول در دست تهیه است.",
    price: Number(dbProduct.price) ?? 0,
    currency: (dbProduct.currency as "IRR") ?? "IRR",
    categories,
    tags: [], // Tags not available in current schema
    features: [], // Features not available in current schema
    images:
      images.length > 0
        ? images
        : [
            {
              // Placeholder image - you can replace this with a local image in /public folder
              url: "/placeholder-product.svg",
              alt: dbProduct.name ?? "محصول",
            },
          ],
    specs: [], // Specs not available in current schema
    inventory: Number(dbProduct.inventory ?? 0),
    shippingEstimate,
  };
}

/**
 * Fetches all published products from Supabase
 * @param useBuildClient - If true, uses build client (for generateStaticParams). Default: false
 */
export async function getAllProducts(
  useBuildClient = false
): Promise<Product[]> {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return [];
  }

  try {
    const supabase = useBuildClient
      ? getSupabaseBuildClient()
      : await getSupabaseServerClient();

    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Fetch images for all products
    const productsWithImages = await Promise.all(
      data.map(async (product) => {
        const images = await getProductImages(product.id, useBuildClient);
        return {
          ...product,
          product_images: images.length > 0 ? images : null,
        };
      })
    );

    return productsWithImages.map(mapDbProductToProduct);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return [];
  }
}

/**
 * Fetches a published product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return null;
  }

  try {
    const supabase = await getSupabaseServerClient();

    if (!supabase) {
      return null;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Fetch images for the product
    const images = await getProductImages(data.id);
    const productWithImages = {
      ...data,
      product_images: images.length > 0 ? images : null,
    };

    return mapDbProductToProduct(productWithImages);
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
    return null;
  }
}

/**
 * Fetches featured products (currently returns latest published products)
 * You can add a featured column to the products table later if needed
 */
export async function getFeaturedProducts(
  limit: number = 4
): Promise<Product[]> {
  try {
    // For now, return latest products as featured
    // You can add a featured boolean column to products table later
    return getLatestProducts(limit);
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    return [];
  }
}

/**
 * Fetches latest published products
 */
export async function getLatestProducts(limit: number = 5): Promise<Product[]> {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return [];
  }

  try {
    const supabase = await getSupabaseServerClient();

    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching latest products:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Fetch images for all products
    const productsWithImages = await Promise.all(
      data.map(async (product) => {
        const images = await getProductImages(product.id);
        return {
          ...product,
          product_images: images.length > 0 ? images : null,
        };
      })
    );

    return productsWithImages.map(mapDbProductToProduct);
  } catch (error) {
    console.error("Error in getLatestProducts:", error);
    return [];
  }
}

/**
 * Gets category counts from products
 */
export async function getCategoryCounts(): Promise<
  Array<{ category: string; total: number }>
> {
  try {
    const products = await getAllProducts();
    const counts = new Map<string, number>();

    products.forEach((product) => {
      product.categories.forEach((category) => {
        counts.set(category, (counts.get(category) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  } catch (error) {
    console.error("Error in getCategoryCounts:", error);
    return [];
  }
}

/**
 * Fetches products with discounts (currently returns products with lower prices)
 * In a real implementation, you would check for a discount_price or discount_percentage field
 */
export async function getDiscountedProducts(
  limit: number = 4
): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();

    // For now, we'll simulate discounts by selecting some products
    // In a real app, you'd filter by discount_price or discount_percentage
    // Return first few products as discounted products
    return allProducts.slice(0, limit);
  } catch (error) {
    console.error("Error in getDiscountedProducts:", error);
    return [];
  }
}

/**
 * Fetches best-selling products (currently returns featured products)
 * In a real implementation, you would order by sales_count or order_count
 */
export async function getBestSellingProducts(
  limit: number = 4
): Promise<Product[]> {
  try {
    // For now, return featured products as best-selling
    // In a real app, you'd query by sales_count or order_count
    return getFeaturedProducts(limit);
  } catch (error) {
    console.error("Error in getBestSellingProducts:", error);
    return [];
  }
}
