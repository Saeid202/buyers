"use client";

import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import type { CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const rawSlides = [
  {
    id: "wholesale-connector",
    title: "واسطه مستقیم ایران به چین",
    description:
      "ما شما را به بازار چین وصل می‌کنیم. محصولات، دلیوری و همه چیز با ماست. شما فقط به بیزینس خود برسید!",
    gradient: "from-purple-600 via-purple-700 to-purple-800",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  },
  {
    id: "china-market",
    title: "دسترسی مستقیم به بازار چین",
    description:
      "کلی فروش هستیم و شما را از ایران به چین وصل می‌کنیم. قیمت‌های شفاف، دلیوری سریع و پشتیبانی کامل",
    gradient: "from-amber-500 via-amber-600 to-amber-700",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
  },
];

export function HeroSlider() {
  const slides = useMemo(() => rawSlides, []);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Set initial state
    updateCurrent();

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden rounded-2xl" dir="ltr">
      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="flex h-[28vh] sm:h-[32vh] lg:h-[36vh]">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="min-w-full h-full relative group rounded-2xl overflow-hidden"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                  quality={85}
                  unoptimized={false}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-85`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content - Only Slogan Text */}
              <div
                className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 select-none"
                dir="rtl"
              >
                <div className="max-w-3xl mx-auto text-center text-white space-y-3 sm:space-y-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight pointer-events-none text-right">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed pointer-events-none text-right">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slide Indicators Only */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                current === index
                  ? "w-8 bg-white shadow-md"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`مشاهده اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
