import { SITE_URL } from "@/lib/site";

const graph = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Outframe",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  inLanguage: "ru",
  description:
    "Генератор коммерческих предложений для фрилансеров: scope, цена, срок и условия в одном листе.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "RUB",
  },
};

export function JsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
