"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addToCart,
  cartCount,
  cartKey,
  cartTotal,
  readCart,
  setQty,
  writeCart,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  ready: boolean;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setItems(readCart());
      setReady(true);
    };
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key === "ladushki-cart-v1") sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ladushki-cart", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ladushki-cart", sync);
    };
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    writeCart(next);
  };

  const value: CartContextValue = {
    items,
    count: cartCount(items),
    total: cartTotal(items),
    ready,
    addItem: (item) => persist(addToCart(items, item)),
    updateQty: (key, qty) => persist(setQty(items, key, qty)),
    removeItem: (key) => persist(items.filter((item) => cartKey(item) !== key)),
    clear: () => persist([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
