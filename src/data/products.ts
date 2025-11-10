export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: "IRR";
  categories: string[];
  tags: string[];
  features: string[];
  images: ProductImage[];
  specs: ProductSpec[];
  inventory: number;
  shippingEstimate: string;
};

export const products: Product[] = [
  {
    id: "aria-12",
    slug: "aria-12-phone",
    name: "گوشی هوشمند آریا ۱۲",
    shortDescription: "دوربین سه گانه ۵۰ مگاپیکسل و باتری ۵۰۰۰ میلی آمپر",
    description:
      "گوشی آریا ۱۲ با پردازنده هشت هسته ای و نمایشگر AMOLED 6.7 اینچ تجربه ای روان و بی نقص در کاربری روزمره و حرفه ای فراهم می کند.",
    price: 28900000,
    currency: "IRR",
    categories: ["موبایل", "الکترونیک"],
    tags: ["اندروید", "۵G", "حافظه ۲۵۶ گیگ"],
    features: [
      "نمایشگر ۱۲۰ هرتز",
      "پشتیبانی از شارژ سریع ۶۵ وات",
      "بدنه مقاوم در برابر آب IP68",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80",
        alt: "گوشی هوشمند آریا ۱۲",
      },
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
        alt: "نمای پشت گوشی آریا ۱۲",
      },
    ],
    specs: [
      { label: "پردازنده", value: "Snapdragon 8 Gen 2" },
      { label: "حافظه داخلی", value: "۲۵۶ گیگابایت" },
      { label: "رم", value: "۱۲ گیگابایت" },
      { label: "باتری", value: "۵۰۰۰ میلی آمپر" },
      { label: "وزن", value: "۱۹۲ گرم" },
    ],
    inventory: 18,
    shippingEstimate: "ارسال سریع ۲۴ ساعته تهران",
  },
  {
    id: "aria-13",
    slug: "aria-13-phone",
    name: "گوشی هوشمند آریا ۱۳",
    shortDescription: "نمایشگر ۱۲۰ هرتز با پردازنده نسل جدید",
    description:
      "آریا ۱۳ با طراحی مینیمال و چیپست پرقدرت برای گیم و کاربری روزمره بی نظیر است.",
    price: 31500000,
    currency: "IRR",
    categories: ["موبایل"],
    tags: ["اندروید", "دوربین سه گانه"],
    features: [
      "پردازنده هشت هسته ای",
      "نمایشگر ۶.۸ اینچ AMOLED",
      "باتری ۵۲۰۰ میلی آمپر",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
        alt: "گوشی آریا ۱۳",
      },
    ],
    specs: [
      { label: "پردازنده", value: "Snapdragon 8+ Gen 2" },
      { label: "حافظه داخلی", value: "۲۵۶ گیگابایت" },
      { label: "رم", value: "۱۲ گیگابایت" },
      { label: "باتری", value: "۵۲۰۰ میلی آمپر" },
      { label: "وزن", value: "۱۹۵ گرم" },
    ],
    inventory: 15,
    shippingEstimate: "ارسال سریع ۴۸ ساعته",
  },
  {
    id: "nota-pro-15",
    slug: "nota-pro-15-laptop",
    name: "لپ تاپ نوتا پرو ۱۵",
    shortDescription: "شاسی آلومینیومی سبک با نمایشگر ۱۵.۶ اینچ ۲K",
    description:
      "نوتا پرو ۱۵ با وزن ۱.۳ کیلوگرم و کیبورد نور پس زمینه، مناسب طراحان و مدیران است. عمر باتری ۱۲ ساعته و شارژ USB-C آزادی عمل بیشتری می دهد.",
    price: 52900000,
    currency: "IRR",
    categories: ["لپ تاپ", "الکترونیک"],
    tags: ["حرفه ای", "سبک", "پردازنده Core i7"],
    features: [
      "پردازنده نسل سیزدهم اینتل",
      "صفحه نمایش مات ۳۰۰ نیت",
      "دو فن خنک کننده کم صدا",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
        alt: "لپ تاپ نوتا پرو ۱۵ روی میز کاری",
      },
      {
        url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80",
        alt: "صفحه نمایش لپ تاپ نوتا پرو ۱۵",
      },
    ],
    specs: [
      { label: "پردازنده", value: "Intel Core i7-1360P" },
      { label: "حافظه", value: "۱ ترابایت SSD" },
      { label: "رم", value: "۱۶ گیگابایت" },
      { label: "گرافیک", value: "Intel Iris Xe" },
      { label: "وزن", value: "۱.۳ کیلوگرم" },
    ],
    inventory: 9,
    shippingEstimate: "ارسال رایگان به سراسر کشور",
  },
  {
    id: "navas-air",
    slug: "navas-air-headphones",
    name: "هدفون بی سیم نواس Air",
    shortDescription: "حذف نویز هوشمند با ۳ حالت شخصی سازی",
    description:
      "هدفون بی سیم نواس با باتری ۴۵ ساعته و طراحی تاشو همراهی ایده آل برای سفر و ورزش است. اتصال سریع چند نقطه ای تجربه شنیداری را ساده می کند.",
    price: 7800000,
    currency: "IRR",
    categories: ["صوتی", "لوازم جانبی"],
    tags: ["حذف نویز", "بلوتوث ۵.۳", "سبک"],
    features: [
      "قابلیت هم زمان اتصال به دو دستگاه",
      "حالت شفافیت محیط",
      "پشتیبانی از شارژ سریع USB-C",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        alt: "هدفون بی سیم نواس Air سیاه",
      },
      {
        url: "https://images.unsplash.com/photo-1470342492944-3421657b81b0?auto=format&fit=crop&w=1200&q=80",
        alt: "جزئیات بالشتک هدفون",
      },
    ],
    specs: [
      { label: "عمر باتری", value: "۴۵ ساعت" },
      { label: "وزن", value: "۲۳۵ گرم" },
      { label: "میکروفون", value: "چهار میکروفون MEMS" },
      { label: "کدک", value: "AAC, SBC" },
    ],
    inventory: 32,
    shippingEstimate: "ارسال در همان روز برای سفارش های قبل از ۱۵",
  },
  {
    id: "sepehr-watch",
    slug: "sepehr-smartwatch",
    name: "ساعت هوشمند سپهر",
    shortDescription: "پایش کامل سلامت با سنسور اکسیژن خون و فشار",
    description:
      "ساعت سپهر با نمایشگر همیشه روشن AMOLED و بیش از ۱۰۰ برنامه ورزشی، همراهی همه جانبه در سبک زندگی فعال است. بند سیلیکونی ضد تعریق راحتی استفاده را افزایش می دهد.",
    price: 6500000,
    currency: "IRR",
    categories: ["گجت پوشیدنی", "الکترونیک"],
    tags: ["سلامت", "ورزش", "GPS"],
    features: [
      "پایش خواب و استرس پیشرفته",
      "پشتیبانی از تماس بلوتوثی",
      "ضد آب تا عمق ۵۰ متر",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
        alt: "ساعت هوشمند سپهر با بند سرمه ای",
      },
      {
        url: "https://images.unsplash.com/photo-1516893846691-37ec8ea993bf?auto=format&fit=crop&w=1200&q=80",
        alt: "صفحه ساعت هوشمند سپهر",
      },
    ],
    specs: [
      { label: "اندازه", value: "۴۲ میلی متر" },
      { label: "نمایشگر", value: "AMOLED" },
      { label: "عمر باتری", value: "۱۰ روز" },
      { label: "اتصالات", value: "Bluetooth 5.2, GPS" },
    ],
    inventory: 26,
    shippingEstimate: "ارسال ۲۴ الی ۴۸ ساعته",
  },
  {
    id: "pakan-vacuum",
    slug: "pakan-robot-vacuum",
    name: "جاروبرقی رباتیک پاکان S6",
    shortDescription: "قابلیت نقشه برداری لیزری و کنترل از اپلیکیشن فارسی",
    description:
      "پاکان S6 با سیستم مسیریابی هوشمند، مکش ۳۰۰۰ پاسکال و مخزن آب ۲۵۰ میلی لیتر، خانه ای تمیز و بدون دردسر برای شما می سازد.",
    price: 18900000,
    currency: "IRR",
    categories: ["خانه هوشمند", "لوازم خانگی"],
    tags: ["ربات", "اپلیکیشن فارسی", "زمان بندی"],
    features: [
      "برنامه ریزی چندگانه اتاق ها",
      "تشخیص فرش و افزایش مکش",
      "بازگشت خودکار به داک شارژ",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1581578017420-482cd7d3d5a7?auto=format&fit=crop&w=1200&q=80",
        alt: "جاروبرقی رباتیک پاکان S6 در حال کار",
      },
      {
        url: "https://images.unsplash.com/photo-1616628182501-e2f2efc55938?auto=format&fit=crop&w=1200&q=80",
        alt: "نمای نزدیک از سنسور های جاروبرقی رباتیک",
      },
    ],
    specs: [
      { label: "مکش", value: "۳۰۰۰ پاسکال" },
      { label: "ظرفیت مخزن آب", value: "۲۵۰ میلی لیتر" },
      { label: "عمر باتری", value: "۱۵۰ دقیقه" },
      { label: "ارتفاع", value: "۹.۷ سانتی متر" },
    ],
    inventory: 12,
    shippingEstimate: "ارسال ویژه تهران: همان روز",
  },
  {
    id: "atisa-oled",
    slug: "atisa-55-oled",
    name: "تلویزیون OLED آتیسا ۵۵ اینچ",
    shortDescription: "تصویر 4K با فناوری HDR10+ و سیستم صوتی ۴ کاناله",
    description:
      "تلویزیون آتیسا با پنل OLED و سیستم عامل هوشمند فارسی، گزینه ای ممتاز برای تماشای فیلم و بازی است. طراحی حاشیه کم و استند فلزی ظاهری مدرن به فضای شما می دهد.",
    price: 74500000,
    currency: "IRR",
    categories: ["صوتی و تصویری", "الکترونیک"],
    tags: ["تلویزیون هوشمند", "HDR10+", "OLED"],
    features: [
      "پشتیبانی از Dolby Atmos",
      "۴ پورت HDMI 2.1",
      "حالت بازی با تاخیر ورودی پایین",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1594904351111-375fc4d6b016?auto=format&fit=crop&w=1200&q=80",
        alt: "تلویزیون OLED آتیسا در اتاق نشیمن",
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
        alt: "جزئیات پایه تلویزیون OLED",
      },
    ],
    specs: [
      { label: "رزولوشن", value: "۴K HDR10+" },
      { label: "سیستم صوتی", value: "۴ کاناله ۶۰ وات" },
      { label: "سیستم عامل", value: "Smart OS فارسی" },
      { label: "اتصالات", value: "Wi-Fi 6, Bluetooth 5.1" },
    ],
    inventory: 7,
    shippingEstimate: "ارسال با نصب رایگان در تهران",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4) {
  return products.slice(0, limit);
}

export function getCategoryCounts() {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    product.categories.forEach((category) => {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}
