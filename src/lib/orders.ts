import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getSupabaseBuildClient } from "@/lib/supabase/buildClient";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  shipping_city: string;
  postal_code: string;
  notes: string | null;
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
    currency?: string;
  }>;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار بررسی",
  processing: "در حال پردازش",
  shipped: "ارسال شد",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return statusLabels[status] || status;
}

export async function getOrdersByUserId(
  userId: string,
  useBuildClient = false
): Promise<Order[]> {
  try {
    const supabase = useBuildClient
      ? getSupabaseBuildClient()
      : await getSupabaseServerClient();

    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }

    return (data || []) as Order[];
  } catch (error) {
    console.error("Error in getOrdersByUserId:", error);
    return [];
  }
}

export async function getAllOrders(useBuildClient = false): Promise<Order[]> {
  try {
    const supabase = useBuildClient
      ? getSupabaseBuildClient()
      : await getSupabaseServerClient();

    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }

    return (data || []) as Order[];
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return [];
  }
}
