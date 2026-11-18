# Project Progress — Phabulous by Mitthat

## Roadmap & Phase Status

- [x] **Phase 0: Foundation**
  - [x] Project setup & dependencies (Next.js App Router, TypeScript strict, Tailwind CSS)
  - [x] Environment validation schema (`lib/env.ts` via Zod)
  - [x] Design tokens & custom fonts (Cormorant Garamond, Jost, Noto Sans Gurmukhi)
  - [x] Brand asset processing script (`tools/make-brand-assets.mjs`) & generated assets in `public/brand/`
  - [x] Shared UI component library (Button, Input, Select, Badge, Card, Sheet, Dialog, Toast, Skeleton, Breadcrumbs, Price, Rating, QuantityStepper)
  - [x] Site shell: Announcement bar, slim & sticky header, mega menu, mobile navigation drawer, and soft cream footer
  - [x] Test harness setup (Vitest, Playwright, GitHub Actions CI)

- [x] **Phase 1: 3D Jewellery Box Hero**
  - [x] Port `reference/final3.html` into `components/hero/JewelleryBoxHero.tsx` & `lib/three/jewelleryScene.ts`
  - [x] Pin `three@0.128.0`, dynamic import via `requestIdleCallback`
  - [x] Static LCP poster with seamless WebGL fade-in
  - [x] All hero bug fixes: 38px clasp, `pan-y` mobile scroll, light ambient gradient, scoped arrow keys, offscreen pause, official logo wordmark, artificial jewellery copy
  - [x] Hero unit & screenshot tests

- [x] **Phase 2: Data Model & Authentication**
  - [x] Drizzle ORM schema with PostgreSQL, migrations, docker-compose.yml
  - [x] Comprehensive seed script (categories, collections, 40+ products, coupons, reviews, Super Admin)
  - [x] Auth system: Sessions, email/password, Google, Phone OTP, TOTP 2FA, RBAC permission matrix
  - [x] Customer account basics & order state machine with tests

- [x] **Phase 3: Storefront Catalogue**
  - [x] Full 13-section homepage with brand story band, categories, reviews, instagram, newsletter
  - [x] Collection pages with multi-attribute filtering & sorting
  - [x] Rich product detail page: gallery, zoom, variant selector, pincode check, accordions, mobile sticky ATC
  - [x] Instant search with autocomplete & recent searches
  - [x] Wishlist & Recently Viewed

- [x] **Phase 4: Admin Catalogue & Operations**
  - [x] Admin dashboard shell with role verification
  - [x] Product & variant management with drag-and-drop 4:5 image upload
  - [x] Categories & Collections manager
  - [x] Inventory management & stock adjustment tracking
  - [x] CSV import & export with preview

- [x] **Phase 5: Commerce Engine**
  - [x] Persistent cart (guest + authenticated merge)
  - [x] Dynamic coupons & bundle rules
  - [x] Multi-step checkout with server-side price calculation & 15-minute stock reservation
  - [x] Razorpay orders + webhook verification + COD with phone OTP
  - [x] Order confirmation, pure JS PDF invoice generation, transactional emails

- [x] **Phase 6: Fulfilment & After-Sales**
  - [x] Order workflow state machine
  - [x] Shiprocket integration + Mock provider with pincode tracking
  - [x] Guest order tracking lookup (`/track-order`)
  - [x] Customer returns & exchanges workflow
  - [x] Razorpay refunds integration

- [x] **Phase 7: Growth & Marketing**
  - [x] Verified customer reviews with photo upload
  - [x] Back-in-stock notifications & abandoned cart outbox jobs
  - [x] CMS pages (About, Care Guide, Policies, FAQ)
  - [x] Analytics & Reports (GST summary, sales, inventory valuation)

- [x] **Phase 8: Hardening & Compliance**
  - [x] Strict CSP & security headers in middleware
  - [x] Sitemap.xml, robots.txt, and Google Merchant feed
  - [x] Playwright end-to-end test scenarios
  - [x] k6 load test script for browsing and checkout flows

- [x] **Phase 9: Delivery & Verification**
  - [x] README setup, runbook, and backup/restore notes
  - [x] `npx vinext check` compatibility verification (94% compatible, 7/7 Next imports supported)
  - [x] Production bundle size verification (Homepage JS: 125 kB < 150 kB budget)
  - [x] Final PROGRESS.md and DECISIONS.md documentation

- [x] **Storefront Redesign: Rubans-Inspired Format & 3D Box Repositioning**
  - [x] Designed high-impact editorial hero banner carousel (`components/home/RubansHeroBanner.tsx`) featuring festive and everyday collections with autoplay, indicators, and high-conversion CTAs.
  - [x] Implemented Rubans-style quick category story navigation circles (`components/home/QuickCategoryCircles.tsx`) with gold rings, labels, and badges.
  - [x] Repositioned the 3D Three.js Jewellery Box component into an experiential virtual studio section (`components/home/Interactive3DShowcase.tsx`) with luxury framing and guidance.
  - [x] Enhanced `Header.tsx` to keep the brand logo, search bar, and mega menu permanently visible and sticky.
  - [x] Added dynamic category filter tabs to `BestsellersGrid.tsx` ("All Bestsellers", "Kundan & Bridal", "AD Solitaires", "Earrings", "Necklaces", "Daily Anti-Tarnish").
  - [x] Verified full production build (59 static pages generated, Homepage JS: 129 kB < 150 kB budget), all 6 tests passing, and 0 ESLint warnings.

- [x] **Storefront Hero Redesign (BIBA Editorial Style + final3 3D Box Component Integration)**
  - [x] Built `components/home/BibaStyleHero.tsx` based on the user's uploaded reference:
    - High-fashion Indian model photoshoots with festive marigold garlands (*genda phool*), olive-green backdrop, and vintage brass urli with jasmine.
    - Fully responsive for both laptop/desktop (`/hero/biba-hero-desktop.jpg`) and mobile (`/hero/biba-hero-mobile.jpg`).
    - Yellow/gold festive ticker: `✨ AW'26 IS HERE! DISCOVER THE NEW SEASON OF ELEGANCE 🌸`.
    - Integrated translucent header with white logo, currency selector, search pill with mic icon, wishlist, account, cart, and category navigation.
    - Editorial typography: `New Arrival`, italic `Make Room For`, bold `What's New`, centered lotus divider `— 🪷 —`, slogan `Too Phabulous To Blend In.`, and rectangular `SHOP NOW >` CTA.
    - Carousel edge arrows (`<` and `>`), bottom indicators, and autoplay.
  - [x] Placed the `final3` component (`Interactive3DShowcase` / `JewelleryBoxHero`) directly below the hero area.
  - [x] Maintained smooth sticky header transition past the hero banner.
  - [x] Verified production build (130 kB First Load JS, 59/59 static pages, 0 errors, all Vitest tests passing).

- [x] **Visual Warmth & Editorial Photography Overhaul**
  - [x] Toned down harsh bright whites and glaring neon yellow across all page surfaces:
    - Shifted `--background` to a warm luxury antique ivory `#F8F5EE` (RGB 248, 245, 238).
    - Shifted `--card` to soft cream parchment `#FCFAF5` with warm gold hairline borders `#DBC8AC`.
    - Softened alternate sections to warm almond linen `#EFE7DC`.
    - Replaced the glaring yellow announcement ticker with a regal deep royal espresso `#241308` & antique gold `#F3E3B5` bar with ruby dot accents.
    - Replaced the 3D Jewellery Box radial gradient from pure `#FFFFFF` to a rich warm velvet studio glow `#F7EFE3` -> `#EDE2CD` -> `#DFD0B8`.
  - [x] Populated high-resolution editorial photography across the storefront:
    - Quick Category Circles with real photo thumbnails (kundan choker, earrings, necklaces, bangles, rings, pendants, bridal).
    - Shop by Category (5 large photographic tiles for Rings, Necklaces, Earrings, Pendants, Bangles).
    - Shop by Occasion (Wedding, Festive, Daily Wear, Gifting).
    - Brand Story Band (Mitthat atelier craftsman photo).
    - Customer Reviews (real verified buyer avatar photos).
    - Instagram Community Grid (6 curated lifestyle jewellery styling photos).
    - Top catalogue products in `lib/data/mockData.ts` updated with real primary photos.
  - [x] Verified build: 59/59 static pages generated, 130 kB First Load JS, 6/6 tests passing, 0 type errors, 0 ESLint warnings.
