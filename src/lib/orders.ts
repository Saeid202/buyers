import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getSupabaseBuildClient } from "@/lib/supabase/buildClient";

// Re-export client-safe utilities
export type { Order, OrderStatus } from "./orders-utils";
export { getOrderStatusLabel } from "./orders-utils";

import type { Order } from "./orders-utils";

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
