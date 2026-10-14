import { CartPage } from "@/components/cart-page";

export const metadata = {
  title: "Корзина",
};

export default function CartRoute() {
  return (
    <div className="page-shell bg-paper">
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-5 md:px-8 md:pb-28">
        <h1 className="mb-8 font-display text-4xl text-ink sm:mb-10 sm:text-5xl md:text-6xl">
          Корзина
        </h1>
        <CartPage />
      </div>
    </div>
  );
}
