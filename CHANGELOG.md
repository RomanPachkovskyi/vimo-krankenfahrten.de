# CHANGELOG

Усі значні зміни в цьому проекті задокументовані тут.

> Технічний огляд проекту: [PROJECT.md](PROJECT.md) · Правила для агентів: [CLAUDE.md](CLAUDE.md)

---

## Правила ведення CHANGELOG

- **Кожна версія** — окремий розділ `## [дата] — короткий опис`.
- Дата у форматі `YYYY-MM-DD`.
- Зміни групуються за типом: `Added`, `Changed`, `Fixed`, `Removed`, `Security`.
- Пишеться **після** коміту, **до** push (або одразу в тому ж коміті).
- Один запис = один логічний блок змін (не обов'язково один git-коміт).
- Технічні деталі — у тілі git-коміту. CHANGELOG — для людини: **що** і **чому**, не **як**.
- Не дублювати git log — тільки те, що важливо розуміти майбутньому розробнику.
- Найновіші записи — **зверху**.

---

## [2026-06-08] — Виправлення та деплой

### Changed
- **SEO:** оновлено `og:description` — новий текст наголошує на безбар'єрному сервісі та особистій турботі; попередній опис замінено на більш емоційний.
- **OG/Twitter зображення:** формат переведено з JPG на PNG у `site/index.html` та `site/public/og-image.*`.
- **Логотип організації** у `index.html`: посилання оновлено з `company-logo.svg` на `company-logo.png`.
- **Sitemap:** `<lastmod>` оновлено до `2026-06-08`.

### Fixed
- **Логотип на некоректних маршрутах:** шлях `company.logoSrc` виправлено з відносного на абсолютний (`/company-logo.png`). Причина: відносний шлях ламав відображення логотипу на підсторінках `/impressum` та `/datenschutz`.
- **Impressum** приведено у відповідність з `httpdocs/`: назва компанії `ViMo Krankenfahrten (e.V.)`, `Vertretungsberechtigte Person` (однина), мобільний телефон, W-IdNr DE 460256757, §49 PBefG, наглядовий орган.

### Removed
- `site/public/CNAME` — кастомний домен налаштовується через GitHub Pages Settings.
- Legacy SVG/PNG-assets фонових паттернів — не використовувались у production-конфігу.

---

## [2026-06-08] — Генерація та перший реліз

### Added
- Перший реліз сайту ViMo Krankenfahrten: React 18 + Vite + Tailwind CSS one-page застосунок.
- Секції: Hero, Services (checklist-варіант, 9 послуг), Footer з контактами.
- Сторінки Impressum та Datenschutzerklärung (маршрутизація без сервера через SPA-fallback).
- Компонент `CookieConsent` — банер про використання Local Storage; реалізований без cookies, відповідно до TDDDG §25 Abs. 2 Nr. 2.
- Логіка інвалідації згоди: `CONSENT_MAX_AGE_MS = 365 days` — застарілий запис ігнорується.
- `CookieConsent` рендериться у `LegalLayout` (сторінки Impressum / Datenschutz).
- GitHub Actions workflow: автоматичний деплой `site/dist` на GitHub Pages при push у `main`.
- Docker Compose для локальної розробки (порт 8083, polling HMR).
- FTP-скрипт `site/scripts/deploy_ftp.py` для деплою на хостинг через FTPS.
- Apache `.htaccess`: HTTPS-redirect, заголовки безпеки (CSP, HSTS, X-Frame-Options), кешування, SPA-routing.
- `llms.txt` та `robots.txt` у public/.
- Sitemap (`sitemap.xml`) з датою `2026-06-08`.
- OG-зображення (`og-image.png`, `og-image.svg`) для соціальних мереж.
- Комплект фавіконів (svg, png, apple-touch-icon, android-chrome, dark-варіанти).
- Логотип компанії (`company-logo.png`), шлях задається через `config.company.logoSrc = "/company-logo.png"` (абсолютний шлях).

### Changed
- SEO-метадані: title містить номер телефону для підвищення CTR у пошуку.
- OG/Twitter-зображення переведені з JPG на PNG формат.
- Логотип організації у `index.html` оновлений з SVG на PNG.
- Impressum доповнено: мобільний телефон, Wirtschafts-Identifikationsnummer (DE 460256757), ліцензія §49 PBefG, наглядовий орган.
- Назва компанії в Impressum: `ViMo Krankenfahrten (e.V.)`.

### Removed
- `site/public/CNAME` — кастомний домен налаштовується через GitHub Pages Settings, не через файл.
- Legacy SVG/PNG-assets інженерних паттернів/фонів — не використовувались у production-конфігу.

### Security
- CSP обмежує `script-src` до `'self' 'unsafe-inline'`; `object-src 'none'`; `frame-ancestors 'self'`.
- HSTS: `max-age=31536000` (1 рік).
- `Options -Indexes` — заборона перегляду директорій.
- Файли `.env`, `package.json`, `tsconfig.json`, логи та SQL — закриті через `<FilesMatch>` у `.htaccess`.
- FTP-скрипт відмовляє у роботі без `FTP_SSL=true` (FTPS обов'язковий).

### Генерація сайту (контекст)
Сайт згенеровано інструментом `_studio-onepage`. Workflow пройшов усі кроки:
`intake_normalization → research → copy_generation → design_selection → llms_generation → artifact_application → site_generation → dev_server → verification`

Дизайн-рішення прийняті автоматично на основі категорії бізнесу (Krankenfahrdienst):
bold hero · color accent · minimal-flat background · full accent intensity · checklist services.

Вхідні дані збережено у `input/`, артефакти генерації — у `output/`.

---

## Pending / TODO

Завдання, зафіксовані у сесіях, ще не виконані:

- [ ] **Google Business Profile** — оновити список послуг (виправити "Fernfahrern" → видалити, "Verlegenfahrten" → "Verlegungsfahrten"; додати Dialysefahrten, Chemo- & Strahlentherapiefahrten, Private Fahrten). Готовий контент: [`ViMo Krankenfahrten/content/google-business.md`](<ViMo%20Krankenfahrten/content/google-business.md>).
- [ ] **Google Business Profile** — написати тексти 4 постів (знайомство, Dialyse/Chemo, Krankenkasse-бар'єр, Fernfahrten).
- [ ] **FAQ секція** — `config.faq.items` наразі порожнє, наповнити на основі типових запитань пацієнтів.
- [ ] **Відгуки** — додати реальні відгуки пацієнтів у компонент (зараз їх немає у config.ts).
