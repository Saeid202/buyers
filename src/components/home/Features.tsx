import {
  Truck,
  Clock,
  CreditCard,
  Package,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "دلیوری کامل",
    description: "از چین تا ایران، همه چیز با ماست",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Clock,
    title: "تحویل سریع",
    description: "زمان‌بندی دقیق و قابل اعتماد",
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: Shield,
    title: "قیمت‌های شفاف",
    description: "بدون هزینه‌های پنهان، کاملاً شفاف",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: CreditCard,
    title: "پرداخت آسان",
    description: "روش‌های متنوع پرداخت",
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: Package,
    title: "کلی فروش",
    description: "دسترسی مستقیم به بازار چین",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: HeadphonesIcon,
    title: "پشتیبانی کامل",
    description: "همراه شما از ابتدا تا انتها",
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
  },
];

export function Features() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isPurple = feature.color === "purple";

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white border border-purple-100/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon Container */}
                <div
                  className={`relative mb-4 rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br ${feature.gradient} shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}
                >
                  <Icon className="size-5 sm:size-6 text-white" />
                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className={`text-sm sm:text-base font-bold mb-1.5 ${
                      isPurple ? "text-purple-700" : "text-amber-700"
                    } group-hover:scale-105 transition-transform`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-full`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
