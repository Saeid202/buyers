type BadgeProps = {
  children: React.ReactNode;
  variant?: "neutral" | "accent";
  className?: string;
};

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const variants = {
    neutral: "bg-neutral-100 text-neutral-600",
    accent: "bg-neutral-900 text-white",
  } as const;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
