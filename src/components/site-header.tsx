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
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)] ${
        isHome
          ? "bg-gradient-to-b from-ink/55 to-transparent text-paper"
          : "border-b border-ink/8 bg-paper/95 text-ink shadow-[0_1px_0_rgba(18,18,20,0.04)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8 md:py-4">
        <Link
          href="/"
          className={`min-w-0 truncate font-display text-[1.35rem] leading-none tracking-tight transition sm:text-2xl md:text-[2rem] ${
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

        <div className="flex shrink-0 items-center gap-2 text-sm">
          <Link
            href="/cart"
            className={`relative inline-flex h-11 items-center border px-3 transition md:h-auto md:py-2 ${
              isHome
                ? "border-paper/35 hover:border-paper"
                : "border-ink/15 hover:border-petal hover:text-petal"
            }`}
          >
            Корзина
            {ready && count > 0 ? (
              <span
                className={`ml-2 inline-flex min-w-5 justify-center text-xs font-medium ${
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
        className={`scroll-x px-4 pb-3 text-sm tracking-wide md:hidden ${
          isHome ? "text-paper/85" : "text-mist"
        }`}
        aria-label="Разделы"
      >
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex h-10 items-center whitespace-nowrap border px-3 transition ${
                isHome
                  ? active
                    ? "border-paper/50 bg-white/10 text-paper"
                    : "border-paper/20"
                  : active
                    ? "border-ink/30 bg-white text-ink"
                    : "border-ink/10"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
