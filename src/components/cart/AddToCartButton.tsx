'use client';

import { useState, useTransition } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";

type AddToCartButtonProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    currency?: string;
    image: string;
  };
  quantity?: number;
};

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    startTransition(() => {
      addItem(
        {
          ...product,
          currency: product.currency || "IRR",
        },
        quantity
      );
      setIsAdded(true);
      window.setTimeout(() => setIsAdded(false), 1800);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="w-full rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {isAdded ? "به سبد اضافه شد" : `افزودن به سبد (${formatPrice(product.price, product.currency)})`}
    </button>
  );
}
