'use client';

import { Minus, Plus } from "lucide-react";

type QuantityInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityInput({ value, onChange, min = 1, max = 99, className = "" }: QuantityInputProps) {
  const handleDecrease = () => {
    const next = Math.max(min, value - 1);
    if (next !== value) {
      onChange(next);
    }
  };

  const handleIncrease = () => {
    const next = Math.min(max, value + 1);
    if (next !== value) {
      onChange(next);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-700 ${className}`}
    >
      <button
        type="button"
        onClick={handleIncrease}
        aria-label="افزایش تعداد"
        className="rounded-full border border-neutral-200 p-1 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
      <span className="min-w-[2rem] text-center font-semibold text-neutral-900">{value}</span>
      <button
        type="button"
        onClick={handleDecrease}
        aria-label="کاهش تعداد"
        className="rounded-full border border-neutral-200 p-1 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
