# Phabulous by Mitthat — E-Commerce Platform

A warm, handcrafted, luxury artificial jewellery e-commerce storefront, admin operations portal, and commerce engine for **Phabulous by Mitthat**, serving customers across India.

---

## 💎 Brand & Design System

- **Mood**: Warm jewel-box luxury with a playful edge.
- **Palette**:
  - Warm White (`#FFFDF9`) — Main page canvas
  - Soft Cream (`#FAF5EC`) — Alternate sections and footer
  - White (`#FFFFFF`) — Cards, header, and product tiles
  - Espresso (`#2A1408`) — Headings, typography, and logo ink
  - Gold (`#BA9048`), Antique Gold (`#A9781C`), Deep Gold (`#8A5F10`) — Dividers, ornaments, buttons, and links
  - Light Blush (`#F8E9E4`) & Blush (`#EAC6BA`) — Announcements, pill badges, and heading washes
  - Burgundy (`#5B1626`) — Interior velvet lining of the 3D jewellery box hero
- **Typography**:
  - Display & Headings: `Cormorant Garamond` (weights 300 to 600, italic)
  - UI, Forms, Prices: `Jost`
  - Punjabi text: `Noto Sans Gurmukhi`
- **Brand Texture**: Soft blush watercolour washes and thin gold hairline dividers with the 4-petal flower ornament.
- **Strict Vocabulary Rule**: All items are fashion artificial jewellery. Never describe as real gold, silver, or diamond. Use *gold-tone*, *silver-tone*, *rose gold-tone*, *American Diamond (AD)*, *oxidised*, *kundan-style*, and *pearl-style*.

---

## 🏛️ Architecture & Tech Stack

- **Framework**: Next.js App Router (React Server Components + Client Islands).
- **Styling**: Tailwind CSS, CSS Modules, custom brand tokens.
- **3D Hero**: Three.js pinned to `0.128.0` with dynamic import via `requestIdleCallback`, ACESFilmic tonemapping, PMREM environment lighting, and static LCP poster fallback.
- **Database & ORM**: PostgreSQL with Drizzle ORM (`drizzle-kit` for migrations).
- **Runtime Target**: Cloudflare Workers / Node.js. Zero native binary dependencies at runtime (pure JS `pdf-lib` for invoices, WebCrypto for password hashing).
- **Pluggable Providers (Zero Keys Needed Locally)**:
  - **Payments**: `RazorpayProvider` and `MockPaymentProvider` (simulates UPI, Cards, and COD with phone OTP).
  - **Shipping**: `ShiprocketProvider` and `MockShippingProvider` with local pincode table.
  - **Email**: `ResendProvider` and console mock outbox.
  - **Storage**: Cloudflare R2 presigned URLs with local disk fallback.

---

## 🚀 Quick Start (Runs with Zero External Keys)

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd C002-mithattbua-jewellery
npm install
```

### 2. Generate Brand Assets
```bash
npm run make-assets
```
Creates all crops (`logo-full.png`, `logo-wordmark.png`, `mark-earring.png`, `logo-mono.png`, `og-image.png`) from the official transparent logo in `reference/`.

### 3. Setup Environment
```bash
cp .env.example .env.local
```
By default, all providers (`PAYMENT_PROVIDER`, `SHIPPING_PROVIDER`, `EMAIL_PROVIDER`) are set to `"mock"` so you can browse, add to cart, check out, track orders, and administer the store without external API keys.

### 4. Seed Database & Super Admin
```bash
npm run db:seed
```
Seeds 7 categories, 6 collections, 40+ products with 4:5 SVG illustrations, 12 reviews, and prints the randomly generated Super Admin credentials.

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Assurance

- **Typecheck**: `npm run typecheck` (TypeScript strict mode, 0 errors).
- **Unit & Integration Tests**: `npm run test` (Vitest test suite covering 3D hero, state machine, and PDF invoice generation).
- **End-to-End Tests**: `npm run test:e2e` (Playwright suite covering homepage, mobile 390px, desktop 1440px, search, cart, checkout, tracking, and admin).
- **Load Testing**: `k6 run scripts/load-test.js` (Simulates high-traffic festive surges up to 100 concurrent shoppers).
- **Cloudflare Workers Compatibility**: `npx vinext check` reports 94% compatibility with 7/7 Next.js imports fully supported.
- **Production Build**: `npm run build` (Homepage First Load JS is 125 kB, beating the 150 kB budget).

---

## 📦 Operational Runbook

### Admin Portal
Navigate to `/admin` to access:
- **Operational Dashboard**: Revenue stats, order volume, low stock alerts.
- **Product Management**: Create, edit, duplicate, draft, and export CSV.
- **Inventory Control**: Live stock adjustments with reason logging.
- **Fulfillment & Dispatch**: State machine order progression (Confirmed → Packed → Shipped with AWB → Delivered) and refunds.
- **Reports & GST**: Export GSTR-1 sales ledger with HSN 7117 tax breakdown.
- **Settings**: Store details, free shipping threshold (₹1,499), COD fee (₹99).
- **Audit Log**: Immutable ledger of all administrative events.

### Backup & Restore
- **Postgres Database Backup**:
  ```bash
  pg_dump -U postgres -d phabulous_jewellery > backup_$(date +%Y%m%d).sql
  ```
- **Postgres Database Restore**:
  ```bash
  psql -U postgres -d phabulous_jewellery < backup_20261119.sql
  ```
