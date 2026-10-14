import { STORE } from "@/lib/products";

export const metadata = {
  title: "О магазине",
};

export default function AboutPage() {
  return (
    <div className="page-shell bg-paper">
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-5 md:px-8 md:pb-28">
        <h1 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">О магазине</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/80">
          <p>
            <span className="font-display text-2xl text-ink">{STORE.brand}</span> — магазин модной
            унисекс-одежды в Бресте. Мы собираем спокойный гардероб: вещи, которые носятся каждый
            день и не спорят друг с другом.
          </p>
          <p>
            Ассортимент небольшой — так проще держать качество посадки и тканей. Футболки, худи,
            брюки, верхняя одежда и несколько аксессуаров.
          </p>
          <p>
            Заказ оформляется заявкой на сайте. Мы перезваниваем, подтверждаем размер и наличие,
            затем отправляем Европочтой или отдаём самовывозом в Бресте.
          </p>
          <p>Связь — после заявки на сайте: мы перезвоним на номер, который вы укажете.</p>
        </div>
      </div>
    </div>
  );
}
