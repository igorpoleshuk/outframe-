"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { STORE } from "@/lib/products";

const links = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О магазине" },
  { href: "/delivery", label: "Доставка" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const isHome = pathname === "/";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        isHome ? "text-paper" : "text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <Link
          href="/"
          className={`font-display text-2xl tracking-tight transition sm:text-3xl md:text-[2rem] ${
            isHome ? "hover:text-petal-soft" : "hover:text-petal"
          }`}
        >
          {STORE.brand}
        </Link>

        <nav className="hidden items-center gap-7 text-sm tracking-wide md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isHome
                    ? active
                      ? "text-paper"
                      : "text-paper/70 hover:text-paper"
                    : active
                      ? "text-ink"
                      : "text-mist hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <a
            href={STORE.phoneHref}
            className={`hidden sm:inline ${
              isHome ? "text-paper/75 hover:text-paper" : "text-mist hover:text-ink"
            }`}
          >
            {STORE.phone}
          </a>
          <Link
            href="/cart"
            className={`relative border px-3 py-2 transition ${
              isHome
                ? "border-paper/35 hover:border-paper"
                : "border-ink/20 hover:border-petal hover:text-petal"
            }`}
          >
            Корзина
            {ready && count > 0 ? (
              <span
                className={`ml-2 inline-flex min-w-5 justify-center text-xs ${
                  isHome ? "text-petal-soft" : "text-petal"
                }`}
              >
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <nav
        className={`flex gap-5 overflow-x-auto px-5 pb-3 text-xs tracking-wide md:hidden ${
          isHome ? "text-paper/80" : "text-mist"
        }`}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-inherit">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
