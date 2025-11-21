import { Star, Users, ShoppingBag } from "lucide-react";

type ProductStatsProps = {
  rating?: number;
  reviewCount?: number;
  buyerCount?: number;
  salesCount?: number;
};

export function ProductStats({
  rating = 4.5,
  reviewCount = 127,
  buyerCount = 342,
  salesCount = 856,
}: ProductStatsProps) {
  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5">
        <Star className="size-3.5 fill-amber-500 text-amber-500" />
        <span className="font-semibold text-neutral-900">{rating}</span>
        <span className="text-neutral-500">({reviewCount})</span>
      </div>
      <span className="h-3 w-px bg-neutral-200" />
      <div className="flex items-center gap-1.5 text-neutral-600">
        <Users className="size-3.5" />
        <span>{buyerCount.toLocaleString("fa-IR")} خریدار</span>
      </div>
      <span className="h-3 w-px bg-neutral-200" />
      <div className="flex items-center gap-1.5 text-neutral-600">
        <ShoppingBag className="size-3.5" />
        <span>{salesCount.toLocaleString("fa-IR")} فروش</span>
      </div>
    </div>
  );
}
