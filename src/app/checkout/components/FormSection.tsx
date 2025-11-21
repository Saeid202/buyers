import { memo } from "react";
import { LucideIcon } from "lucide-react";

type FormSectionProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: "purple" | "amber";
  children: React.ReactNode;
};

export const FormSection = memo(function FormSection({
  title,
  description,
  icon: Icon,
  iconColor,
  children,
}: FormSectionProps) {
  const colorClasses = {
    purple: {
      bg: "from-purple-50 to-purple-100/50",
      border: "border-purple-100",
      iconBg: "bg-white",
      iconColor: "text-purple-600",
    },
    amber: {
      bg: "from-amber-50 to-amber-100/50",
      border: "border-amber-100",
      iconBg: "bg-white",
      iconColor: "text-amber-600",
    },
  };

  const colors = colorClasses[iconColor];

  return (
    <div className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden">
      <div className={`bg-gradient-to-r ${colors.bg} px-6 py-4 border-b ${colors.border}`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center size-10 rounded-xl ${colors.iconBg} shadow-sm`}>
            <Icon className={`size-5 ${colors.iconColor}`} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
            <p className="text-xs text-neutral-600">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
});

