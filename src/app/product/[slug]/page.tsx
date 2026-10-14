import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { formatPrice, getProduct, products, statusLabel } from "@/lib/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Товар" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const [a, b, c] = product.swatch;

  return (
    <div className="page-shell bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-28 sm:gap-10 sm:px-5 md:grid-cols-2 md:px-8 md:pb-28">
        <div
          className="product-swatch relative aspect-[4/5] overflow-hidden sm:aspect-[4/5]"
          style={
            {
              "--swatch-a": a,
              "--swatch-b": b,
              "--swatch-c": c,
            } as CSSProperties
          }
        >
          <div className="fabric-grain absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent p-4 sm:p-6">
            <p className="font-display text-2xl text-paper sm:text-4xl md:hidden">{product.name}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center pb-4">
          <Link
            href="/catalog"
            className="inline-flex min-h-10 items-center text-sm text-mist transition hover:text-petal"
          >
            ← Каталог
          </Link>
          <h1 className="mt-3 hidden font-display text-5xl text-ink md:mt-4 md:block md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-ink sm:mt-4">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-mist">
            {statusLabel(product.status)} · {product.category}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/80 sm:mt-6">
            {product.description}
          </p>
          <p className="mt-3 text-sm text-mist">{product.fabric}</p>

          <div className="mt-7 sm:mt-8">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
