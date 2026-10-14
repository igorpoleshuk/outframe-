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

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-[max(4rem,calc(2rem+env(safe-area-inset-bottom)))] pt-[calc(7.5rem+env(safe-area-inset-top))] sm:px-5 md:justify-center md:px-8 md:pb-24 md:pt-28">
          <p className="animate-fade max-w-[12ch] break-words font-display text-[2.75rem] leading-[0.95] tracking-tight sm:max-w-[14ch] sm:text-6xl md:max-w-none md:text-7xl lg:text-8xl">
            {STORE.brand}
          </p>
          <h1 className="mt-5 max-w-xl animate-rise font-display text-[1.65rem] leading-tight text-paper/95 sm:mt-6 sm:text-3xl md:text-4xl">
            Модная унисекс-одежда в Бресте
          </h1>
          <p className="mt-3 max-w-md animate-rise-slow text-sm leading-relaxed text-paper/75 sm:mt-4 md:text-base">
            Базовый гардероб без лишнего шума. Заявка на сайте — доставка Европочтой или самовывоз.
          </p>
          <div
            className="mt-7 flex w-full max-w-md animate-rise-slow flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "120ms" }}
          >
            <Link href="/catalog" className="btn-petal w-full sm:w-auto">
              Смотреть каталог
            </Link>
            <Link
              href="/delivery"
              className="inline-flex min-h-12 w-full items-center justify-center border border-paper/35 px-5 py-3 text-sm text-paper transition hover:border-paper sm:w-auto sm:min-h-0"
            >
              Доставка и самовывоз
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">Сейчас в зале</h2>
            <p className="mt-3 max-w-md text-sm text-mist">
              Небольшой ассортимент: верх, низ, верхняя одежда и аксессуары.
            </p>
          </div>
          <Link href="/catalog" className="btn-ghost w-full sm:w-fit">
            Весь каталог
          </Link>
        </div>
        <div className="mt-10 grid gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
