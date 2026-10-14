import Link from "next/link";
import { STORE } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl tracking-tight md:text-4xl">{STORE.brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-soft">
            Магазин модной унисекс-одежды в Бресте. Базовый гардероб без лишнего шума.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Разделы</p>
          <Link href="/catalog" className="block text-mist-soft transition hover:text-paper">
            Каталог
          </Link>
          <Link href="/about" className="block text-mist-soft transition hover:text-paper">
            О магазине
          </Link>
          <Link href="/delivery" className="block text-mist-soft transition hover:text-paper">
            Доставка и оплата
          </Link>
          <Link href="/cart" className="block text-mist-soft transition hover:text-paper">
            Корзина
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Контакты</p>
          <p className="text-mist-soft">{STORE.city}</p>
          <a href={STORE.phoneHref} className="block text-paper transition hover:text-petal-soft">
            {STORE.phone}
          </a>
          <p className="text-mist-soft">Европочта или самовывоз</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-mist md:px-8">
        © {new Date().getFullYear()} {STORE.brand}, {STORE.city}
      </div>
    </footer>
  );
}
