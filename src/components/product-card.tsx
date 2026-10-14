import Link from "next/link";
import type { CSSProperties } from "react";
import { formatPrice, statusLabel, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [a, b, c] = product.swatch;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block outline-none transition active:opacity-90 sm:hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-petal"
    >
      <div
        className="product-swatch relative aspect-[4/5] overflow-hidden"
        style={
          {
            "--swatch-a": a,
            "--swatch-b": b,
            "--swatch-c": c,
          } as CSSProperties
        }
      >
        <div className="fabric-grain absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-80 transition group-hover:opacity-95" />
        <p className="absolute bottom-3 left-3 font-display text-2xl text-paper/95 sm:bottom-4 sm:left-4 sm:text-3xl">
          {product.name.split(" ")[0]}
        </p>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4">
        <div className="min-w-0">
          <h2 className="text-[0.95rem] leading-snug text-ink sm:text-base">{product.name}</h2>
          <p className="mt-1 text-sm text-mist">{product.category}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium text-ink">{formatPrice(product.price)}</p>
          <p
            className={`mt-1 text-xs ${
              product.status === "out"
                ? "text-mist"
                : product.status === "low"
                  ? "text-petal"
                  : "text-mist"
            }`}
          >
            {statusLabel(product.status)}
          </p>
        </div>
      </div>
    </Link>
  );
}
