import Link from "next/link";
import { STORE } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 md:grid-cols-[1.2fr_1fr_1fr] md:px-8 md:py-14">
        <div>
          <p className="font-display text-3xl tracking-tight md:text-4xl">{STORE.brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-soft">
            Магазин модной унисекс-одежды в Бресте. Базовый гардероб без лишнего шума.
          </p>
          <a href={STORE.phoneHref} className="btn-petal mt-5 inline-flex w-full sm:w-auto">
            Позвонить
          </a>
        </div>

        <div className="space-y-1 text-sm">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mist">Разделы</p>
          <Link href="/catalog" className="flex min-h-11 items-center text-mist-soft transition hover:text-paper">
            Каталог
          </Link>
          <Link href="/about" className="flex min-h-11 items-center text-mist-soft transition hover:text-paper">
            О магазине
          </Link>
          <Link href="/delivery" className="flex min-h-11 items-center text-mist-soft transition hover:text-paper">
            Доставка и оплата
          </Link>
          <Link href="/cart" className="flex min-h-11 items-center text-mist-soft transition hover:text-paper">
            Корзина
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Контакты</p>
          <p className="text-mist-soft">{STORE.city}</p>
          <a
            href={STORE.phoneHref}
            className="flex min-h-11 items-center text-base text-paper transition hover:text-petal-soft"
          >
            {STORE.phone}
          </a>
          <p className="text-mist-soft">Европочта или самовывоз</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-mist sm:px-5 md:px-8">
        © {new Date().getFullYear()} {STORE.brand}, {STORE.city}
      </div>
    </footer>
  );
}
