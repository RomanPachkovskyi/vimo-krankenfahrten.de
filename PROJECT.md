# PROJECT.md — ViMo Krankenfahrten

> Правила для агентів: [CLAUDE.md](CLAUDE.md) · Журнал змін: [CHANGELOG.md](CHANGELOG.md)

---

## Що це

One-page маркетинговий сайт для **ViMo Krankenfahrten** — служби медичних перевезень у Ессені (Німеччина). Власник і відповідальна особа: **Dzenis Mulalic**.

Сайт виконує одну функцію: конвертувати відвідувача у дзвінок або WhatsApp-повідомлення. Жодного бекенду, жодної бази даних.

---

## Технічний стек

| Шар | Технологія |
|-----|-----------|
| UI | React 18 + TypeScript |
| Bundler | Vite 5 (SWC) |
| CSS | Tailwind CSS 3 |
| Іконки | lucide-react |
| Тести | Vitest |
| Лінтер | ESLint 9 + typescript-eslint |
| Node | 20 |

---

## Структура репозиторію

```
vimo-krankenfahrten.de/
├── site/                        # Весь вихідний код
│   ├── src/
│   │   ├── config.ts            # ← ЄДИНЕ місце для контенту та SEO
│   │   ├── design.ts            # Токени дизайну (кольори, шрифти)
│   │   ├── App.tsx              # Routing: Index / Impressum / Datenschutz
│   │   ├── components/          # Header, Hero, Services, FAQ, CTA, Footer…
│   │   ├── pages/               # Index.tsx, Impressum.tsx, Datenschutz.tsx
│   │   ├── services/            # Варіанти відображення послуг (5 варіантів)
│   │   ├── backgrounds/         # Анімаційні фони (канвас)
│   │   └── test/                # Vitest-тести
│   ├── public/                  # Статичні assets (фавікони, OG-зображення, шрифти)
│   ├── dist/                    # Артефакт збірки (не редагувати вручну)
│   ├── scripts/
│   │   ├── deploy_ftp.py        # FTPS-деплой на хостинг (читає .env)
│   │   └── postbuild-file-launch.mjs
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── package.json
├── httpdocs/                    # Копія dist/ на сервері (лише для перегляду, не редагувати)
├── "ViMo Krankenfahrten"/       # Офлайн-матеріали: маркетинг-аналіз, контент
├── .github/workflows/deploy.yml # CI/CD → GitHub Pages
├── docker-compose.yml           # Локальна розробка у Docker
├── CLAUDE.md                    # ← Правила для агентів
├── PROJECT.md                   # ← Цей файл
├── CHANGELOG.md                 # ← Журнал змін
└── README.md                    # Короткий старт
```

---

## Конфігурація сайту

Весь контент живе в одному файлі: [`site/src/config.ts`](site/src/config.ts).

Структура конфігу:

| Секція | Що містить |
|--------|-----------|
| `company` | Назва, логотип, правова форма |
| `address` | Адреса (Bückmannshof 34, 45326 Essen) |
| `contact` | Телефони, email, WhatsApp URL |
| `hero` | Заголовок та підзаголовок секції Hero |
| `services` | Варіант відображення + список послуг з іконками |
| `faq` | Питання/відповіді (наразі порожньо) |
| `cta` | Кнопка CTA (увімкнена/вимкнена, текст, URL) |
| `legal` | HTML для Impressum та Datenschutzerklärung |
| `footer` | Рядок копірайту |
| `seo` | title, description, OG-теги, canonical, robots |

Токени дизайну (кольори, шрифти) — у [`site/src/design.ts`](site/src/design.ts), не в `config.ts`.

### Дизайн-рішення (прийняті при генерації)

| Параметр | Значення | Причина |
|----------|---------|---------|
| `heroWeight` | `bold` | Локальний сервіс, довіра — прямий, впевнений стиль |
| `heroAccent` | `color` | Тепла брендова орієнтація |
| `backgroundMode` | `minimal-flat` | Людський сервіс, тепло, без відволікань |
| `accentIntensity` | `full` | Чітке CTA і маркери послуг |
| `middleBlock` | `checklist` | 9 послуг — потребує чіткої нумерації |
| Основний колір | `#0092d6` (медичний синій) | Healthcare/transport trust signaling |

---

## Вхідні та вихідні файли генератора

Сайт було згенеровано інструментом `_studio-onepage`. Всі вхідні дані та артефакти зберігаються у проекті.

### `input/` — вхідні дані (джерело істини для бізнес-даних)

| Файл | Що містить |
|------|-----------|
| [`input/project-intake.json`](input/project-intake.json) | Повний intake: контакти, SEO, позиціонування, нотатки |
| [`input/brand.json`](input/brand.json) | Брендові дані |
| [`input/contact.json`](input/contact.json) | Контактна інформація |
| [`input/content.json`](input/content.json) | Контентні блоки |
| [`input/seo.json`](input/seo.json) | SEO-метадані |
| [`input/legal.json`](input/legal.json) | Правові документи |
| [`input/design.json`](input/design.json) | Параметри дизайну |
| [`input/logo.svg`](input/logo.svg) | Вихідний логотип |
| [`input/og-image.png`](input/og-image.png) | Вихідне OG-зображення |

### `output/` — згенеровані артефакти

| Файл | Що містить |
|------|-----------|
| [`output/intake-report.md`](output/intake-report.md) | Нормалізований звіт після intake |
| [`output/research-pack.json`](output/research-pack.json) | Аналіз 4 конкурентів |
| [`output/copy-pack.json`](output/copy-pack.json) | SEO-копірайт: H1, subheadline, title, description |
| [`output/design-pack.json`](output/design-pack.json) | Дизайн-рішення і палітра кольорів |
| [`output/run-report.md`](output/run-report.md) | Звіт генерації з попередженнями |
| [`output/workflow-state.json`](output/workflow-state.json) | Стан workflow генератора |
| [`output/llms.txt`](output/llms.txt) | AI knowledge base (DE+EN) |

### `ViMo Krankenfahrten/` — офлайн-контент

| Файл | Що містить |
|------|-----------|
| [`ViMo Krankenfahrten/ViMo_Marktanalyse.docx`](<ViMo%20Krankenfahrten/ViMo_Marktanalyse.docx>) | Детальний аналіз ринку: 6 профілів конкурентів, фразовий банк, рекомендації позиціонування |
| [`ViMo Krankenfahrten/content/homepage.md`](<ViMo%20Krankenfahrten/content/homepage.md>) | Повний контент для головної сторінки (Hero, послуги, відгуки, CTA) |
| [`ViMo Krankenfahrten/content/google-business.md`](<ViMo%20Krankenfahrten/content/google-business.md>) | Оптимізований контент для Google Business Profile: опис, 10 послуг, план постів |

---

## SEO та позиціонування

**Основне ключове слово:** `Krankenfahrten Essen`

**Підтримувальні ключові слова:**
- Krankenfahrdienst Essen
- Personenbeförderung sitzend liegend
- Dialysefahrten Essen
- Krankentransport Essen
- Rollstuhlfahrten Essen
- Krankenbeförderung Ruhrgebiet

**Регіон обслуговування:** Essen (всі райони) + Gelsenkirchen, Oberhausen, Bochum, Mülheim, Bottrop; NRW-weit та deutschlandweit на запит.

**Диференціатор відносно конкурентів:** слово `persönlich` (сімейний бізнес, Dzenis Mulalic знає пацієнтів особисто). Конкуренти використовують `zuverlässig/sicher/komfortabel` — ViMo вирізняється особистим підходом.

---

## Конкуренти (з аналізу)

| Домен | Оцінка | Нотатка |
|-------|--------|---------|
| krankenfahrdienstessen.de (BMS) | 95/100 | Прямий конкурент в Ессені, ідентичне портфоліо послуг, primary benchmark |
| medicomfort-nrw.de | 90/100 | GmbH в Ессені, фокус на прозорості та комфорті |
| eli-krankenbefoerderung.de | 75/100 | Бохум, онлайн-бронювання, партнерства з клініками |
| kfd-krankenfahrdienst.nrw | 65/100 | Мьонхенгладбах, відмінна локальна SEO-стратегія (районні сторінки) |

---

## Локальна розробка

### Варіант 1 — npm (рекомендований)

```sh
cd site
npm install
npm run dev        # http://localhost:8080
```

### Варіант 2 — Docker

```sh
docker compose up  # http://localhost:8083
```

Docker запускає `node:20-alpine`, монтує `./site` у `/app`, увімкнений polling для HMR.

### Корисні команди

```sh
cd site
npm test           # Vitest (одноразово)
npm run test:watch # Vitest у watch-режимі
npm run lint       # ESLint
npm run build      # Збірка у site/dist/
npm run preview    # Переглянути production-збірку локально
```

---

## Хостинг та деплой

Проект підтримує **два незалежних** шляхи деплою:

### 1. GitHub Pages (основний, автоматичний)

- **Тригер:** push у гілку `main`
- **Workflow:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **Процес:** checkout → `npm ci` → `npm test` → `npm run build` → deploy `site/dist` на GitHub Pages
- **URL:** https://vimo-krankenfahrten.de (кастомний домен)
- **DNS:** домен vimo-krankenfahrten.de повинен вказувати на GitHub Pages

### 2. FTP-деплой на хостинг (ручний)

- **Скрипт:** `site/scripts/deploy_ftp.py`
- **Умова:** потрібен файл `.env` у корені проекту (не в git)
- **Команда:** `cd site && python3 scripts/deploy_ftp.py`
- **Вимога:** `FTP_SSL=true` — insecure FTP заблоковано скриптом

`.env` формат:
```
FTP_HOST=...
FTP_USER=...
FTP_PASS=...
FTP_PORT=21
FTP_SSL=true
FTP_ROOT=httpdocs
```

---

## Apache-конфігурація (`site/dist/.htaccess`)

- Redirect усього трафіку на `https://vimo-krankenfahrten.de` (301)
- `Options -Indexes` — заборона лістингу директорій
- Заголовки безпеки: CSP, X-Frame-Options, HSTS, Permissions-Policy
- Gzip-стиснення для HTML/CSS/JS/SVG/JSON
- Кешування: CSS/JS/зображення/шрифти — 1 рік (immutable); HTML — no-cache
- SPA routing: усі 404 → `index.html`

---

## Репозиторій

- **GitHub:** https://github.com/RomanPachkovskyi/vimo-krankenfahrten.de
- **Гілка за замовчуванням:** `main`
- **CI:** GitHub Actions (deploy.yml)

---

## Бізнес-контекст

| Параметр | Значення |
|----------|---------|
| Компанія | ViMo Krankenfahrten (e.V.) |
| Відповідальна особа | Dzenis Mulalic |
| Адреса | Bückmannshof 34, 45326 Essen, Deutschland |
| Телефон (стаціонарний) | +49 201 837 206 72 |
| Телефон (мобільний) | +49 151 500 96 96 0 |
| Email | info@vimo-krankenfahrten.de |
| WhatsApp | https://wa.me/4915150096960 |
| Ліцензія | §49 PBefG |
| Wirtschafts-ID | DE 460256757 |
| Наглядовий орган | Stadt Essen – Ordnungsamt / Straßenverkehrsamt |
