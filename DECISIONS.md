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
