import { Suspense } from "react";
import { CatalogFilters } from "@/components/catalog-filters";
import { ProductCard } from "@/components/product-card";
import { products, type ProductCategory } from "@/lib/products";

type SearchParams = Promise<{ cat?: string }>;

export const metadata = {
  title: "Каталог",
};

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const { cat } = await searchParams;
  const selected = (cat as ProductCategory | undefined) ?? undefined;
  const list = selected ? products.filter((p) => p.category === selected) : products;

  return (
    <div className="page-shell bg-paper">
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-5 md:px-8 md:pb-28">
        <h1 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">Каталог</h1>
        <p className="mt-3 max-w-lg text-sm text-mist">
          Унисекс. Выберите категорию, откройте карточку и добавьте размер с цветом в корзину.
        </p>

        <div className="mt-6 sm:mt-8">
          <Suspense fallback={<div className="h-11" />}>
            <CatalogFilters />
          </Suspense>
        </div>

        {list.length ? (
          <div className="mt-8 grid gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {list.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-sm text-mist">В этой категории пока пусто.</p>
        )}
      </div>
    </div>
  );
}
