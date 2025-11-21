"use client";

import { 
  ArrowLeftRight, 
  Globe, 
  Zap, 
  CheckCircle2,
  Truck,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "دسترسی به بازار چین",
    description: "اتصال مستقیم به تمام بنادر",
    color: "purple",
  },
  {
    icon: Zap,
    title: "دلیوری سریع",
    description: "تحویل در کمترین زمان",
    color: "amber",
  },
  {
    icon: DollarSign,
    title: "قیمت‌های شفاف",
    description: "بدون هزینه‌های پنهان",
    color: "purple",
  },
  {
    icon: Shield,
    title: "پشتیبانی کامل",
    description: "همراه شما از ابتدا تا انتها",
    color: "amber",
  },
];

export function InfoCard() {
  return (
    <div className="mt-4 sm:mt-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          const isPurple = benefit.color === "purple";
          
          return (
            <div
              key={index}
              className="group relative bg-white rounded-xl border border-neutral-200 hover:border-purple-300 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Gradient on Hover */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                  isPurple
                    ? "from-purple-50 to-purple-100/50"
                    : "from-amber-50 to-amber-100/50"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex p-2.5 sm:p-3 rounded-xl mb-3 ${
                    isPurple
                      ? "bg-gradient-to-br from-purple-500 to-purple-600"
                      : "bg-gradient-to-br from-amber-500 to-amber-600"
                  } shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
                >
                  <Icon className="size-4 sm:size-5 text-white" />
                </div>
                
                {/* Title */}
                <h4 className="text-sm sm:text-base font-black text-neutral-900 mb-1.5">
                  {benefit.title}
                </h4>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

