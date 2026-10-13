import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products, STORE } from "@/lib/products";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden text-paper">
        <div className="hero-veil absolute inset-0" />
        <div className="fabric-grain absolute inset-0 opacity-60" />
        <div className="absolute -right-16 top-24 h-72 w-72 animate-drift rounded-full bg-petal/25 blur-3xl" />
        <div className="absolute bottom-10 left-[-4rem] h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-36 md:justify-center md:px-8 md:pb-24 md:pt-28">
          <p className="animate-fade font-display text-6xl leading-none tracking-tight md:text-8xl lg:text-9xl">
            {STORE.brand}
          </p>
          <h1 className="mt-6 max-w-xl animate-rise font-display text-3xl leading-tight text-paper/95 md:text-4xl">
            Модная унисекс-одежда в Бресте
          </h1>
          <p className="mt-4 max-w-md animate-rise-slow text-sm leading-relaxed text-paper/75 md:text-base">
            Базовый гардероб без лишнего шума. Заявка на сайте — доставка Европочтой или самовывоз.
          </p>
          <div className="mt-8 flex animate-rise-slow flex-wrap gap-3" style={{ animationDelay: "120ms" }}>
            <Link href="/catalog" className="btn-petal">
              Смотреть каталог
            </Link>
            <Link
              href="/delivery"
              className="inline-flex items-center justify-center border border-paper/35 px-5 py-3 text-sm text-paper transition hover:border-paper"
            >
              Доставка и самовывоз
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl text-ink md:text-5xl">Сейчас в зале</h2>
            <p className="mt-3 max-w-md text-sm text-mist">
              Небольшой ассортимент: верх, низ, верхняя одежда и аксессуары.
            </p>
          </div>
          <Link href="/catalog" className="btn-ghost w-fit">
            Весь каталог
          </Link>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
