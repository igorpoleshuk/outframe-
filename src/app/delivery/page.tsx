import { STORE } from "@/lib/products";

export const metadata = {
  title: "Доставка",
};

export default function DeliveryPage() {
  return (
    <div className="page-shell bg-paper">
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-5 md:px-8 md:pb-28">
        <h1 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">Доставка и оплата</h1>
        <p className="mt-4 text-sm text-mist">
          Онлайн-оплаты пока нет — сначала заявка, потом подтверждение и оплата.
        </p>

        <div className="mt-10 space-y-10 sm:mt-12">
          <section>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Европочта</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Доставляем по Беларуси через Европочту. В комментарии к заявке укажите удобное
              отделение. Срок и стоимость уточняем при подтверждении заказа.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Самовывоз</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {STORE.pickupAddress}. Время и точку встречи согласуем по телефону после заявки.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Оплата</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Оплата после подтверждения заявки — способ обсуждаем при звонке. Если остались
              вопросы:{" "}
              <a href={STORE.phoneHref} className="text-petal hover:underline">
                {STORE.phone}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Возврат</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Если размер не подошёл и вещь без следов носки — поможем обменять или вернуть в
              разумный срок. Напишите или позвоните сразу после получения.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
