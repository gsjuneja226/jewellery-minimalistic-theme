# Architectural Decisions — Phabulous by Mitthat

## 1. Hosting & Runtime Architecture
- **Target**: Cloudflare Workers (and Node.js / edge-compatible runtimes).
- **Edge Constraints**: Zero native binary dependencies at runtime (no runtime `sharp`, no native `bcrypt`/`argon2`).
- **Password Hashing**: Implemented using WebCrypto-compatible standard PBKDF2 / Scrypt via Node crypto and WebCrypto primitives.
- **Invoices**: Built with `pdf-lib` (pure JavaScript) and print-optimized HTML fallback.

## 2. Database & ORM
- **Engine**: PostgreSQL with Drizzle ORM (`drizzle-kit` for migrations).
- **Fallback**: Includes `docker-compose.yml` for local development, plus resilient repository layer with mockable/in-memory seed fallback for immediate zero-config test and local execution.
- **Money Representation**: Integer paise (`bigint` or `integer`) with currency column default `INR`.

## 3. Brand Assets & Visual System
- **Logo Preservation**: The provided official logo (`reference/logo.png`) contains the hand-drawn line art, Gurmukhi text, swash lettering, and blush wash. It is never retyped or redrawn.
- **Processing**: A one-off script `tools/make-brand-assets.mjs` generates standard crops (`logo-full.png`, `logo-wordmark.png`, `mark-earring.png`, `logo-mono.png`, `og-image.png`).
- **Site Surfaces**: Always light (Warm White `#FFFDF9`, Soft Cream `#FAF5EC`, White `#FFFFFF`). Multiply blend mode fallback used if background transparency requires blending.

## 4. 3D Hero Implementation
- **Three.js**: Pinned to `0.128.0` to preserve the exact lighting, ACESFilmic tonemapping, and procedural geometry approved in `reference/final3.html`.
- **Performance**: Loaded dynamically with `requestIdleCallback`. LCP poster rendered immediately via pure CSS/SVG.
- **Mobile Friendliness**: Touch action set to `pan-y` to allow vertical scrolling; arrow key listener scoped to hero view/focus.

## 5. Pluggable Service Providers
- **Payments**: `PaymentProvider` interface with `RazorpayProvider` and `MockRazorpayProvider`.
- **Shipping**: `ShippingProvider` interface with `ShiprocketProvider` and `MockShippingProvider` with local pincode table.
- **Emails**: `EmailProvider` interface with `ResendProvider` and `ConsoleEmailProvider`.
- **Storage**: `StorageProvider` interface with `CloudflareR2Provider` and `LocalStorageProvider`.
- **Search**: `SearchProvider` interface with PostgreSQL Full-Text Search + pg_trgm and In-Memory fallback.

## 6. Homepage & Hero Redesign (Rubans D2C E-commerce Standard)
- **Rubans-Inspired Layout**: Replaced the initial full-screen 3D-only hero with an editorial lifestyle banner slider (`RubansHeroBanner`) featuring curated festive, daily anti-tarnish, and American diamond collections with clear CTAs, badges, and fast LCP rendering.
- **Quick Category Navigation**: Added circular category story thumbnails (`QuickCategoryCircles`) right below the hero banner for high-intent instant browsing (Earrings, Kundan Sets, Necklaces, Bangles, Rings, Pendants, Daily Anti-Tarnish, Bridal Edit).
- **Repositioned 3D Showcase**: Preserved the Three.js 3D Jewellery Box component (`JewelleryBoxHero`) by relocating it into a dedicated experiential section (`Interactive3DShowcase`: "Open The Phabulous Jewellery Box") with luxury framing, allowing shoppers to interact with 3D models without impeding initial homepage conversion.
- **Sticky Navigation**: Ensured the official logo wordmark, search, account, wishlist, and cart are always visible from initial page load, paired with desktop mega menu and mobile navigation drawer.
- **Dynamic Bestseller Tabs**: Upgraded `BestsellersGrid` with category filter tabs to allow instant zero-reload browsing between Kundan, AD Solitaires, Earrings, Necklaces, and Daily Wear.
