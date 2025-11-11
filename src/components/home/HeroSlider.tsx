'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const rawSlides = [
  {
    id: "smart-home",
    image:
      "https://treestone.com/wp-content/uploads/2017/01/shopify-banner.png",
  },
  {
    id: "wearables",
    image:
      "https://i.pinimg.com/originals/e3/56/4d/e3564db3fe0e206d9c4e866435e203c7.jpg",
  },
];

export function HeroSlider() {
  const slides = useMemo(() => rawSlides, []);

  return (

      <section className="relative w-full overflow-hidden" dir={'ltr'}>
        <Carousel opts={{ align: "center", loop: true }} className="w-full">
          <CarouselContent className="flex h-[80vh] sm:h-[90vh]">
            {slides.map((slide, index) => (
                <CarouselItem key={slide.id} className="min-w-full h-full relative">
                  <Image
                      src={slide.image}
                      alt={slide.id}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index === 0}
                  />
                </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 bg-white/60 text-neutral-800 hover:bg-white/80" />
          <CarouselNext className="right-4 bg-white/60 text-neutral-800 hover:bg-white/80" />
        </Carousel>

      </section>
  )
    // <section className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    //   <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-[0_25px_70px_-30px_rgba(16,24,40,0.45)] backdrop-blur-xl">
    //     <div
    //       className="flex transition-transform duration-700"
    //       style={{ transform: `translateX(-${activeIndex * 100}%)` }}
    //     >
    //       {slides.map((slide) => (
    //         <article key={slide.id} className="relative flex min-w-full flex-col-reverse gap-6 p-8 sm:flex-row sm:items-center">
    //           <div className="relative z-10 flex flex-1 flex-col gap-5 text-neutral-900">
    //             <span className={`inline-flex w-fit items-center rounded-full bg-gradient-to-r ${slide.accent} px-4 py-1 text-xs font-semibold text-white backdrop-blur-md`}>
    //               پیشنهاد ویژه بازار نو
    //             </span>
    //             <h2 className="text-3xl font-black leading-tight sm:text-4xl">{slide.title}</h2>
    //             <p className="text-sm leading-7 text-neutral-600 sm:text-base">{slide.description}</p>
    //             <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
    //               <Link
    //                 href={slide.href}
    //                 className="rounded-2xl bg-neutral-900 px-6 py-3 text-white transition hover:bg-neutral-800"
    //               >
    //                 {slide.cta}
    //               </Link>
    //               <Link href="/cart" className="rounded-2xl border border-neutral-200 px-6 py-3 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900">
    //                 مشاهده سبد خرید
    //               </Link>
    //             </div>
    //           </div>
    //
    //           <div className="relative flex flex-1 justify-center">
    //             <div className="absolute inset-0 blur-3xl" />
    //             <Image
    //               src={slide.image}
    //               alt={slide.title}
    //               width={820}
    //               height={520}
    //               priority
    //               className="relative h-64 w-full max-w-2xl rounded-3xl object-cover shadow-2xl"
    //             />
    //           </div>
    //         </article>
    //       ))}
    //     </div>
    //
    //     <button
    //       type="button"
    //       aria-label="اسلاید قبلی"
    //       onClick={() => goTo(activeIndex - 1)}
    //       className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/80 p-2 text-neutral-700 shadow-lg transition hover:bg-white"
    //     >
    //       <ChevronRight className="size-5" />
    //     </button>
    //     <button
    //       type="button"
    //       aria-label="اسلاید بعدی"
    //       onClick={() => goTo(activeIndex + 1)}
    //       className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/70.bg-white/80 p-2 text-neutral-700 shadow-lg transition hover:bg-white"
    //     >
    //       <ChevronLeft className="size-5" />
    //     </button>
    //
    //     <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
    //       {slides.map((slide, index) => (
    //         <button
    //           key={slide.id}
    //           type="button"
    //           onClick={() => goTo(index)}
    //           aria-label={`مشاهده اسلاید ${index + 1}`}
    //           className={`h-2 rounded-full transition-all ${
    //             activeIndex === index ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300"
    //           }`}
    //         />
    {/*      ))}*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*</section>*/}
  // );
}
