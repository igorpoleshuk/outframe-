"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const { addItem, count } = useCart();
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const disabled = product.status === "out";

  const onAdd = () => {
    if (disabled || !color || !size) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color,
      size,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="field-label">Цвет</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setColor(value)}
              className={`touch-chip ${
                color === value
                  ? "border-petal bg-petal-mist text-ink"
                  : "border-mist-soft text-mist hover:border-ink/40 hover:text-ink"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="field-label">Размер</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSize(value)}
              className={`touch-chip min-w-12 uppercase tracking-wide ${
                size === value
                  ? "border-ink bg-ink text-paper"
                  : "border-mist-soft text-mist hover:border-ink/40 hover:text-ink"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="sticky-action">
        <div className="flex gap-2 md:block">
          <button
            type="button"
            className="btn-petal min-h-12 flex-1 md:w-auto"
            onClick={onAdd}
            disabled={disabled}
          >
            {disabled ? "Нет в наличии" : added ? "Добавлено" : "В корзину"}
          </button>
          {count > 0 ? (
            <Link href="/cart" className="btn-ghost min-h-12 flex-1 md:mt-3 md:hidden">
              Корзина · {count}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
