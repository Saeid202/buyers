import { formatPrice } from "@/lib/formatPrice";

type PriceTagProps = {
  value: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  weight?: "regular" | "medium" | "bold";
  className?: string;
};

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

const weightMap = {
  regular: "font-normal",
  medium: "font-semibold",
  bold: "font-bold",
} as const;

export function PriceTag({
  value,
  currency,
  size = "md",
  weight = "bold",
  className = "",
}: PriceTagProps) {
  return (
    <span className={`${sizeMap[size]} ${weightMap[weight]} text-primary ${className}`}>
      {formatPrice(value, currency)}
    </span>
  );
}
