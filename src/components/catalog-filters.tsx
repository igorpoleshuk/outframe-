"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, type ProductCategory } from "@/lib/products";

export function CatalogFilters() {
  const params = useSearchParams();
  const current = (params.get("cat") as ProductCategory | "все" | null) ?? "все";

  return (
    <div className="scroll-x -mx-4 px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 md:gap-2">
      {CATEGORIES.map((cat) => {
        const href = cat === "все" ? "/catalog" : `/catalog?cat=${encodeURIComponent(cat)}`;
        const active = current === cat;
        return (
          <Link
            key={cat}
            href={href}
            className={`touch-chip capitalize ${
              active
                ? "border-ink bg-ink text-paper"
                : "border-mist-soft text-mist hover:border-ink/40 hover:text-ink"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
