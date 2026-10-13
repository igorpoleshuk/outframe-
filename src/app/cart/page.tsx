import { CartPage } from "@/components/cart-page";

export const metadata = {
  title: "Корзина",
};

export default function CartRoute() {
  return (
    <div className="bg-paper pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <h1 className="mb-10 font-display text-5xl text-ink md:text-6xl">Корзина</h1>
        <CartPage />
      </div>
    </div>
  );
}
