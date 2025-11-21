// Client-safe utilities for orders

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

