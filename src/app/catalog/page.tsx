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
    <div className="bg-paper pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <h1 className="font-display text-5xl text-ink md:text-6xl">Каталог</h1>
        <p className="mt-3 max-w-lg text-sm text-mist">
          Унисекс. Выберите категорию, откройте карточку и добавьте размер с цветом в корзину.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="h-10" />}>
            <CatalogFilters />
          </Suspense>
        </div>

        {list.length ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
