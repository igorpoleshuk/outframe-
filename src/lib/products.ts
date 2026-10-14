export type ProductCategory = "верх" | "низ" | "верхняя одежда" | "аксессуары";

export type ProductStatus = "in_stock" | "low" | "out";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  colors: string[];
  sizes: string[];
  status: ProductStatus;
  swatch: [string, string, string];
  fabric: string;
};

export const STORE = {
  brand: "Ладушки-shop",
  city: "Брест",
  phone: "+37529-723-46-97",
  phoneHref: "tel:+375297234697",
  pickupAddress: "г. Брест, ул. Советская (самовывоз по согласованию)",
  currency: "BYN",
} as const;

export const CATEGORIES: Array<ProductCategory | "все"> = [
  "все",
  "верх",
  "низ",
  "верхняя одежда",
  "аксессуары",
];

export const products: Product[] = [
  {
    slug: "futbolka-liniya",
    name: "Футболка «Линия»",
    price: 89,
    category: "верх",
    description:
      "Прямой крой, плотный хлопок. Унисекс — сидит спокойно на любом силуэте.",
    colors: ["молочный", "графит", "пыльная роза"],
    sizes: ["XS", "S", "M", "L", "XL"],
    status: "in_stock",
    swatch: ["#e8e4df", "#a8a49e", "#8a6b72"],
    fabric: "100% хлопок, 220 г/м²",
  },
  {
    slug: "hudi-tihaya",
    name: "Худи «Тихая»",
    price: 189,
    category: "верх",
    description:
      "Свободное худи без лишних логотипов. Мягкий футер, капюшон на подкладке.",
    colors: ["чёрный", "какао", "оливковый"],
    sizes: ["S", "M", "L", "XL"],
    status: "in_stock",
    swatch: ["#1a1a1c", "#6b5344", "#5a6248"],
    fabric: "80% хлопок, 20% полиэстер",
  },
  {
    slug: "rubashka-kontur",
    name: "Рубашка «Контур»",
    price: 149,
    category: "верх",
    description:
      "Оверсайз рубашка из плотной ткани. Можно как верхний слой поверх футболки.",
    colors: ["белый", "полоска", "индиго"],
    sizes: ["S", "M", "L", "XL"],
    status: "low",
    swatch: ["#f2f2f0", "#d0d4dc", "#3d4a6b"],
    fabric: "хлопок / лён",
  },
  {
    slug: "bryuki-shag",
    name: "Брюки «Шаг»",
    price: 159,
    category: "низ",
    description:
      "Прямые брюки средней посадки. Швы ровные, карман без объёма.",
    colors: ["чёрный", "песок", "графит"],
    sizes: ["XS", "S", "M", "L", "XL"],
    status: "in_stock",
    swatch: ["#141414", "#c4b49a", "#5c5f66"],
    fabric: "ткань с лёгким стрейчем",
  },
  {
    slug: "dzhinsy-ugol",
    name: "Джинсы «Угол»",
    price: 179,
    category: "низ",
    description:
      "Прямые джинсы без жёсткой посадки. Унисекс, длина под подворот.",
    colors: ["синий", "чёрный"],
    sizes: ["S", "M", "L", "XL"],
    status: "in_stock",
    swatch: ["#2c3d5c", "#1a1a1c", "#4a5568"],
    fabric: "деним 12 oz",
  },
  {
    slug: "yubka-net-wait",
    name: "Юбка-брюки «Слой»",
    price: 139,
    category: "низ",
    description:
      "Широкие брюки-юбка для тех, кто хочет движение без юбки. Пояс на резинке.",
    colors: ["чёрный", "хаки"],
    sizes: ["XS", "S", "M", "L"],
    status: "in_stock",
    swatch: ["#171717", "#6b6a4e", "#3a3a38"],
    fabric: "вискоза / полиэстер",
  },
  {
    slug: "kurtka-vetka",
    name: "Куртка «Ветка»",
    price: 279,
    category: "верхняя одежда",
    description:
      "Лёгкая куртка на сезон. Без капюшона, с скрытыми карманами.",
    colors: ["графит", "пыльная роза"],
    sizes: ["S", "M", "L", "XL"],
    status: "low",
    swatch: ["#3a3d44", "#a85466", "#2a2a30"],
    fabric: "плащёвка, подкладка",
  },
  {
    slug: "palto-osen",
    name: "Пальто «Осень»",
    price: 349,
    category: "верхняя одежда",
    description:
      "Прямое пальто ниже колена. Пояс в комплекте, силуэт спокойный.",
    colors: ["камель", "чёрный"],
    sizes: ["S", "M", "L"],
    status: "in_stock",
    swatch: ["#b08968", "#1a1a1c", "#8a6f5a"],
    fabric: "шерсть / полиэстер",
  },
  {
    slug: "sumka-list",
    name: "Сумка «Лист»",
    price: 119,
    category: "аксессуары",
    description:
      "Компактная сумка через плечо. Хватает на телефон, ключи и маленький кошелёк.",
    colors: ["чёрный", "молочный", "пыльная роза"],
    sizes: ["one size"],
    status: "in_stock",
    swatch: ["#1a1a1c", "#e8e4df", "#a85466"],
    fabric: "экокожа",
  },
  {
    slug: "sharff-dym",
    name: "Шарф «Дым»",
    price: 69,
    category: "аксессуары",
    description: "Длинный шарф из мягкой пряжи. Без ворса, можно носить как палантин.",
    colors: ["серый", "бордо", "молочный"],
    sizes: ["one size"],
    status: "in_stock",
    swatch: ["#8a8e96", "#6b2e3a", "#efeae4"],
    fabric: "акрил / шерсть",
  },
];

export function formatPrice(price: number): string {
  return `${price} BYN`;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function statusLabel(status: ProductStatus): string {
  switch (status) {
    case "in_stock":
      return "В наличии";
    case "low":
      return "Мало";
    case "out":
      return "Нет в наличии";
  }
}
