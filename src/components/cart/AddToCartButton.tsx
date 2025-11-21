"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
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

export function AddToCartButton({
  product,
  quantity = 1,
}: AddToCartButtonProps) {
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
      disabled={isPending || isAdded}
      className="group relative w-full h-11 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-6 text-sm font-semibold text-white shadow-md hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-md flex items-center justify-center gap-2"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>در حال افزودن...</span>
        </>
      ) : isAdded ? (
        <>
          <Check className="size-4" />
          <span>به سبد اضافه شد</span>
        </>
      ) : (
        <span>افزودن به سبد خرید</span>
      )}
    </button>
  );
}
