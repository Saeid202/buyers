import { memo } from "react";
import { formatPrice } from "@/lib/formatPrice";

type PriceTagProps = {
  value: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  weight?: "regular" | "medium" | "semibold" | "bold";
  className?: string;
};

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

const weightMap = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export const PriceTag = memo(function PriceTag({
  value,
  currency,
  size = "md",
  weight = "bold",
  className = "",
}: PriceTagProps) {
  return (
    <span
      className={`${sizeMap[size]} ${weightMap[weight]} bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent ${className}`}
    >
      {formatPrice(value, currency)}
    </span>
  );
});
