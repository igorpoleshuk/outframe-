import type { Metadata } from "next";
import { Manrope, Outfit, Syne } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "Outframe — коммерческие предложения для фрилансеров";
const description =
  "Собери КП за один вечер: scope, цена, срок и условия в живом превью. Ссылка для клиента, печать и PDF. Без аккаунта.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Outframe",
  },
  description,
  keywords: [
    "коммерческое предложение",
    "КП для фрилансера",
    "генератор КП",
    "Outframe",
    "смета фриланс",
  ],
  authors: [{ name: "Outframe" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Outframe",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${syne.variable} ${outfit.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
