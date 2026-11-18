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

- [ ] **Phase 2: Data Model & Authentication**
  - [ ] Drizzle ORM schema with PostgreSQL, migrations, docker-compose.yml
  - [ ] Comprehensive seed script (categories, collections, 40+ products, coupons, reviews, Super Admin)
  - [ ] Auth system: Sessions, email/password, Google, Phone OTP, TOTP 2FA, RBAC permission matrix
  - [ ] Customer account basics

- [ ] **Phase 3: Storefront Catalogue**
  - [ ] Full 13-section homepage with brand story band, categories, reviews, instagram, newsletter
  - [ ] Collection pages with multi-attribute filtering & sorting
  - [ ] Rich product detail page: gallery, zoom, variant selector, pincode check, accordions, mobile sticky ATC
  - [ ] Instant search with autocomplete & recent searches
  - [ ] Wishlist & Recently Viewed

- [ ] **Phase 4: Admin Catalogue & Operations**
  - [ ] Admin dashboard shell with role verification
  - [ ] Product & variant management with drag-and-drop 4:5 image upload
  - [ ] Categories & Collections manager
  - [ ] Inventory management & stock adjustment tracking
  - [ ] CSV import & export with preview

- [ ] **Phase 5: Commerce Engine**
  - [ ] Persistent cart (guest + authenticated merge)
  - [ ] Dynamic coupons & bundle rules
  - [ ] Multi-step checkout with server-side price calculation & 15-minute stock reservation
  - [ ] Razorpay orders + webhook verification + COD with phone OTP
  - [ ] Order confirmation, pure JS PDF invoice generation, transactional emails

- [ ] **Phase 6: Fulfilment & After-Sales**
  - [ ] Order workflow state machine
  - [ ] Shiprocket integration + Mock provider with pincode tracking
  - [ ] Guest order tracking lookup (`/track-order`)
  - [ ] Customer returns & exchanges workflow
  - [ ] Razorpay refunds integration

- [ ] **Phase 7: Growth & Marketing**
  - [ ] Verified customer reviews with photo upload
  - [ ] Back-in-stock notifications & abandoned cart outbox jobs
  - [ ] CMS pages (About, Care Guide, Policies, FAQ)
  - [ ] Analytics & Reports (GST summary, sales, inventory valuation)

- [ ] **Phase 8: Hardening & Compliance**
  - [ ] Strict CSP & security headers
  - [ ] Turnstile rate-limiting & audit logging
  - [ ] Accessibility (WCAG AA, keyboard navigation)
  - [ ] k6 load test scripts & performance passes

- [ ] **Phase 9: Delivery & Verification**
  - [ ] README setup & runbook
  - [ ] `npx vinext check` verification
  - [ ] Bundle size report
