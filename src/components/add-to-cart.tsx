"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
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
              className={`border px-3 py-2 text-sm transition ${
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
              className={`min-w-12 border px-3 py-2 text-sm uppercase tracking-wide transition ${
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

      <button type="button" className="btn-petal w-full sm:w-auto" onClick={onAdd} disabled={disabled}>
        {disabled ? "Нет в наличии" : added ? "Добавлено" : "В корзину"}
      </button>
    </div>
  );
}
