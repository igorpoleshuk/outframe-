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
    <div className="bg-paper pt-28 md:pt-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
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
          <div className="fabric-grain absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent p-6">
            <p className="font-display text-4xl text-paper">{product.name}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Link href="/catalog" className="text-sm text-mist transition hover:text-petal">
            ← Каталог
          </Link>
          <h1 className="mt-4 font-display text-5xl text-ink md:text-6xl">{product.name}</h1>
          <p className="mt-4 text-xl font-medium text-ink">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-mist">
            {statusLabel(product.status)} · {product.category}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/80">{product.description}</p>
          <p className="mt-3 text-sm text-mist">{product.fabric}</p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
