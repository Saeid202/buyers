import { memo } from "react";
import { LucideIcon } from "lucide-react";

type FormFieldProps = {
  label: string;
  icon: LucideIcon;
  iconColor: "purple" | "amber";
  required?: boolean;
  optional?: boolean;
} & (
  | {
      type: "input";
      inputType?: string;
      name: string;
      placeholder: string;
      disabled?: boolean;
    }
  | {
      type: "textarea";
      name: string;
      placeholder: string;
      rows?: number;
      disabled?: boolean;
    }
);

export const FormField = memo(function FormField(props: FormFieldProps) {
  const { label, icon: Icon, iconColor, required = false, optional = false } = props;

  const colorMap = {
    purple: "focus:border-purple-500 focus:ring-purple-100",
    amber: "focus:border-amber-500 focus:ring-amber-100",
  };

  const iconColorMap = {
    purple: "text-purple-600",
    amber: "text-amber-600",
  };

  const baseInputClasses = `w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-all ${colorMap[iconColor]} disabled:bg-neutral-50`;

  return (
    <label className="space-y-2">
      <span className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <Icon className={`size-4 ${iconColorMap[iconColor]}`} />
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-xs text-neutral-500">(اختیاری)</span>}
      </span>
      {props.type === "input" ? (
        <input
          name={props.name}
          type={props.inputType || "text"}
          className={baseInputClasses}
          placeholder={props.placeholder}
          required={required}
          disabled={props.disabled}
        />
      ) : (
        <textarea
          name={props.name}
          className={`${baseInputClasses} resize-none`}
          style={{ height: `${(props.rows || 4) * 2}rem` }}
          placeholder={props.placeholder}
          required={required}
          disabled={props.disabled}
        />
      )}
    </label>
  );
});

