# Outframe

Генератор коммерческих предложений для фрилансеров.

Стек: Next.js, TypeScript, Tailwind. Черновики хранятся в `localStorage` — без аккаунта и бэкенда.

## Что внутри

- `/` — лендинг бренда Outframe
- `/studio` — редактор (scope, цена, срок, terms) и live preview; на free — до 2 черновиков
- `/example` и `/p/demo` — публичный пример КП, его можно шарить
- `/p/[id]?d=…` — ссылка клиенту с содержимым предложения
- Print / PDF — через диалог печати; на free лист с водяным знаком
- `/pro` — 990 ₽/мес и mailto waitlist

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).
