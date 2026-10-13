export type CartItem = {
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  qty: number;
};

export type DeliveryMethod = "europost" | "pickup";

export type OrderDraft = {
  name: string;
  phone: string;
  city: string;
  delivery: DeliveryMethod;
  comment: string;
};

const STORAGE_KEY = "liliya-cart-v1";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.slug === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.color === "string" &&
        typeof item.size === "string" &&
        typeof item.qty === "number" &&
        item.qty > 0,
    );
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("liliya-cart"));
}

export function cartKey(item: Pick<CartItem, "slug" | "color" | "size">): string {
  return `${item.slug}::${item.color}::${item.size}`;
}

export function addToCart(items: CartItem[], next: Omit<CartItem, "qty"> & { qty?: number }): CartItem[] {
  const qty = next.qty ?? 1;
  const key = cartKey(next);
  const existing = items.find((item) => cartKey(item) === key);
  if (existing) {
    return items.map((item) =>
      cartKey(item) === key ? { ...item, qty: item.qty + qty } : item,
    );
  }
  return [...items, { ...next, qty }];
}

export function setQty(items: CartItem[], key: string, qty: number): CartItem[] {
  if (qty <= 0) return items.filter((item) => cartKey(item) !== key);
  return items.map((item) => (cartKey(item) === key ? { ...item, qty } : item));
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function deliveryLabel(method: DeliveryMethod): string {
  return method === "europost" ? "Европочта" : "Самовывоз в Бресте";
}
