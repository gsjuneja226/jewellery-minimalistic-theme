export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

export interface MockCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
}

export interface MockVariant {
  id: string;
  title: string;
  sku: string;
  price: number; // paise
  compareAtPrice?: number; // paise
  size?: string;
  color?: string;
  stock: number;
}

export interface MockProduct {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  categorySlug: string;
  collectionSlugs: string[];
  materialFinish: string;
  stoneType: string;
  occasion: string;
  hsnCode: string;
  gstRate: number;
  careInstructions: string;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  variants: MockVariant[];
}

export interface MockReview {
  id: string;
  productSlug: string;
  authorName: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  date: string;
}

export interface MockCoupon {
  code: string;
  discountType: "percent" | "flat" | "free_shipping";
  discountValue: number; // percent or paise
  minOrderValue: number; // paise
  maxDiscount?: number; // paise
}

export const CATEGORIES_DATA: MockCategory[] = [
  {
    id: "cat-rings",
    name: "Rings",
    slug: "rings",
    description: "Statement cocktail rings, classic eternity bands, and shimmering American Diamond (AD) solitaires.",
    imageUrl: "/products/ad-solitaire-statement-ring-1.svg",
    displayOrder: 1,
  },
  {
    id: "cat-necklaces",
    name: "Necklaces",
    slug: "necklaces",
    description: "Multi-layered gold-tone chains, lustrous simulated pearl strings, and regal festive chokers.",
    imageUrl: "/products/emerald-stone-layered-necklace-1.svg",
    displayOrder: 2,
  },
  {
    id: "cat-earrings",
    name: "Earrings",
    slug: "earrings",
    description: "Intricately carved jhumkas, chandelier drops, everyday studs, and hand-finished hoops.",
    imageUrl: "/products/chandbali-festive-jhumkas-1.svg",
    displayOrder: 3,
  },
  {
    id: "cat-pendants",
    name: "Pendants",
    slug: "pendants",
    description: "Delicate gemstone-inspired locket charms, solitaire drops, and spiritual motifs.",
    imageUrl: "/products/sapphire-teardrop-pendant-1.svg",
    displayOrder: 4,
  },
  {
    id: "cat-bangles",
    name: "Bangles & Bracelets",
    slug: "bangles-bracelets",
    description: "Antique temple kada cuffs, modern tennis bracelets, and delicate gold-tone charm bangles.",
    imageUrl: "/products/temple-peacock-cuff-bangle-1.svg",
    displayOrder: 5,
  },
  {
    id: "cat-anklets",
    name: "Anklets",
    slug: "anklets",
    description: "Graceful simulated pearl payals, minimal daily charm anklets, and bridal ghungroo styles.",
    imageUrl: "/products/pearl-cluster-bridal-payal-1.svg",
    displayOrder: 6,
  },
  {
    id: "cat-sets",
    name: "Jewellery Sets",
    slug: "jewellery-sets",
    description: "Harmonious bridal matching sets, festive choker & earring pairings, and reception wear.",
    imageUrl: "/products/kundan-jadau-choker-set-1.svg",
    displayOrder: 7,
  },
];

export const COLLECTIONS_DATA: MockCollection[] = [
  {
    id: "col-wedding",
    name: "Wedding",
    slug: "wedding",
    description: "Grand Kundan-style choker sets, royal jhumkas, and heirloom bridal ornaments.",
    imageUrl: "/products/kundan-jadau-choker-set-1.svg",
    isFeatured: true,
  },
  {
    id: "col-festive",
    name: "Festive",
    slug: "festive",
    description: "Lustrous antique gold-tone finishes and colourful stone accents for celebratory cheer.",
    imageUrl: "/products/chandbali-festive-jhumkas-1.svg",
    isFeatured: true,
  },
  {
    id: "col-daily",
    name: "Daily Wear",
    slug: "daily-wear",
    description: "Lightweight, anti-tarnish studs, sleek cuffs, and everyday delicate chains.",
    imageUrl: "/products/classic-gold-tone-daily-hoops-1.svg",
    isFeatured: true,
  },
  {
    id: "col-gifting",
    name: "Gifting",
    slug: "gifting",
    description: "Pre-boxed treasures, elegant tennis bracelets, and thoughtful tokens of affection.",
    imageUrl: "/products/rose-gold-tennis-bracelet-1.svg",
    isFeatured: true,
  },
  {
    id: "col-new",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The freshest handcrafted fashion jewellery additions straight from our artisans.",
    imageUrl: "/products/ad-solitaire-statement-ring-1.svg",
    isFeatured: false,
  },
  {
    id: "col-bestsellers",
    name: "Bestsellers",
    slug: "bestsellers",
    description: "Beloved customer favourites tried, tested, and celebrated across India.",
    imageUrl: "/products/chandbali-festive-jhumkas-1.svg",
    isFeatured: true,
  },
];

export const PRODUCTS_DATA: MockProduct[] = [
  {
    id: "prod-alukas-1",
    title: "Circle of Light Heart Earrings",
    slug: "circle-of-light-heart-earrings",
    subtitle: "Sapphire Crystal & Diamond Droplets",
    description: "Radiant high-jewellery drop earrings designed with deep ocean sapphire stones and shimmering crystal accents.",
    categorySlug: "earrings",
    collectionSlugs: ["new-arrivals", "bestsellers", "trendy", "featured"],
    materialFinish: "silver-tone",
    stoneType: "Sapphire crystal & simulated diamonds",
    occasion: "Party & Evening",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wipe with soft cloth. Store in dry velvet case.",
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 18,
    images: ["/images/products/prod-alukas-1.jpg"],
    variants: [
      { id: "var-alukas-1", title: "Sapphire Rhodium", sku: "PH-ER-001", price: 12900, compareAtPrice: 15900, stock: 10 },
    ],
  },
  {
    id: "prod-alukas-2",
    title: "AD Solitaire Halo Ring",
    slug: "ad-solitaire-halo-ring",
    subtitle: "Cushion Cut American Diamond Crown",
    description: "Sensational halo solitaire ring set in fine rhodium finish with pavé diamond band embellishments.",
    categorySlug: "rings",
    collectionSlugs: ["new-arrivals", "bestsellers", "trendy", "featured"],
    materialFinish: "silver-tone",
    stoneType: "American diamond (AD)",
    occasion: "Engagement & Celebrations",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Keep away from water and cosmetics.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 24,
    images: ["/images/products/prod-alukas-2.jpg"],
    variants: [
      { id: "var-alukas-2", title: "Size 7 (17.3 mm)", sku: "PH-RG-001", price: 24900, stock: 14 },
    ],
  },
  {
    id: "prod-alukas-3",
    title: "Birds of Paradise Pendant",
    slug: "birds-of-paradise-pendant",
    subtitle: "Infinity Drop Solitaire Necklace",
    description: "Graceful knot link holding an eternity teardrop crystal encrusted with brilliant sparkling gemstones.",
    categorySlug: "necklaces",
    collectionSlugs: ["new-arrivals", "bestsellers", "trendy", "featured"],
    materialFinish: "gold-tone",
    stoneType: "Pave diamond simulants",
    occasion: "Daily Wear & Gifting",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Store individually in air-tight pouch.",
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 14,
    images: ["/images/products/prod-alukas-3.jpg"],
    variants: [
      { id: "var-alukas-3", title: "Yellow Gold Finish", sku: "PH-NC-001", price: 19900, stock: 12 },
    ],
  },
  {
    id: "prod-alukas-4",
    title: "Kalvesna Gold Leaf Choker",
    slug: "kalvesna-gold-leaf-choker",
    subtitle: "Multi-Tier Delicate Botanical Chain",
    description: "A delicate double-layered gold chain with intricate olive leaf filigree and crystal teardrop drops.",
    categorySlug: "necklaces",
    collectionSlugs: ["new-arrivals", "bestsellers", "trendy", "featured"],
    materialFinish: "gold-tone",
    stoneType: "Simulated crystal bead",
    occasion: "Celebrations & Parties",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Clean gently with microfiber cloth.",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 22,
    images: ["/images/products/prod-alukas-4.jpg"],
    variants: [
      { id: "var-alukas-4", title: "Yellow Gold", sku: "PH-NC-002", price: 2900, compareAtPrice: 5900, stock: 15 },
    ],
  },
  {
    id: "prod-alukas-5",
    title: "Kundan Jadau Choker Set",
    slug: "kundan-jadau-bridal-set",
    subtitle: "Gold-Tone Kundan & Simulated Pearls",
    description: "Breathtaking bridal necklace set featuring royal Kundan-style stonework and matching statement jhumkas.",
    categorySlug: "jewellery-sets",
    collectionSlugs: ["wedding", "featured"],
    materialFinish: "gold-tone",
    stoneType: "Kundan & simulated pearls",
    occasion: "Wedding & Festive",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wipe clean with dry cloth.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 35,
    images: ["/images/products/prod-alukas-5.jpg"],
    variants: [
      { id: "var-alukas-5", title: "Antique Gold / Pearl White", sku: "PH-KND-001", price: 34900, compareAtPrice: 49900, stock: 8 },
    ],
  },
  {
    id: "prod-alukas-6",
    title: "Royal Temple Sculpted Bangles",
    slug: "royal-temple-sculpted-bangles",
    subtitle: "Hand-carved Gold-Tone Cuff Kadas",
    description: "Traditional temple jewellery bangles adorned with sculpted motifs and durable anti-tarnish protective polish.",
    categorySlug: "bangles-bracelets",
    collectionSlugs: ["featured", "bestsellers"],
    materialFinish: "gold-tone",
    stoneType: "Gold filigree",
    occasion: "Festive & Wedding",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Avoid perfumes and chemical sprays.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 19,
    images: ["/images/products/prod-alukas-6.jpg"],
    variants: [
      { id: "var-alukas-6", title: "2.6 Size", sku: "PH-BNG-001", price: 14900, compareAtPrice: 18500, stock: 9 },
    ],
  },
  {
    id: "prod-alukas-7",
    title: "Anti-Tarnish Modern Gold Hoops",
    slug: "anti-tarnish-modern-gold-hoops",
    subtitle: "Chunky Polished Waterproof Hoops",
    description: "Lightweight everyday chunky gold hoops engineered with hypoallergenic anti-tarnish stainless steel core.",
    categorySlug: "earrings",
    collectionSlugs: ["featured", "new-arrivals", "daily-wear"],
    materialFinish: "gold-tone",
    stoneType: "Polished metal",
    occasion: "Daily Wear",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wear anywhere, wipe dry.",
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 29,
    images: ["/images/products/prod-alukas-7.jpg"],
    variants: [
      { id: "var-alukas-7", title: "Medium 25mm", sku: "PH-ER-003", price: 4500, stock: 25 },
    ],
  },
  {
    id: "prod-alukas-8",
    title: "Curated Luxury Keepsake Gift Box",
    slug: "curated-luxury-keepsake-gift-box",
    subtitle: "Pre-boxed Velvet Pearl Set & Card",
    description: "Lustrous simulated pearl string nestled inside a velvet gift case with personalized handwritten note card.",
    categorySlug: "gifting",
    collectionSlugs: ["bestsellers", "featured", "gifting"],
    materialFinish: "pearl-finish",
    stoneType: "Cultured simulated pearls",
    occasion: "Anniversary & Gifting",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Store in gift case.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 42,
    images: ["/images/products/prod-alukas-8.jpg"],
    variants: [
      { id: "var-alukas-8", title: "Ruby Velvet Box", sku: "PH-GFT-001", price: 25000, stock: 18 },
    ],
  },

  {
    id: "prod-1",
    title: "Kundan Jadau Choker Set",
    slug: "kundan-jadau-choker-set",
    subtitle: "Gold-tone Kundan & Pearl Drops",
    description: "A breathtaking bridal necklace set featuring intricate Kundan-style stonework set in gold-tone brass, finished with cascading simulated pearl droplets. Comes paired with matching statement jhumkas and an adjustable dori clasp.",
    categorySlug: "jewellery-sets",
    collectionSlugs: ["wedding", "festive", "bestsellers"],
    materialFinish: "gold-tone",
    stoneType: "Kundan-style & simulated pearls",
    occasion: "Wedding",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wipe with a soft cloth after each wear. Keep dry and avoid direct contact with perfumes, hairsprays, and moisture. Store safely in the provided velvet pouch.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 48,
    images: [
      "/images/products/prod-1.jpg",
      "/products/kundan-jadau-choker-set-1.svg",
      "/products/kundan-jadau-choker-set-2.svg",
    ],
    variants: [
      { id: "var-1-1", title: "Antique Gold / Pearl White", sku: "PH-KND-001", price: 349900, compareAtPrice: 499900, stock: 8 },
      { id: "var-1-2", title: "Emerald Green Accent", sku: "PH-KND-002", price: 369900, compareAtPrice: 529900, stock: 5 },
    ],
  },
  {
    id: "prod-2",
    title: "AD Solitaire Statement Ring",
    slug: "ad-solitaire-statement-ring",
    subtitle: "American Diamond AD Stone",
    description: "Brilliant cushion-cut American Diamond (AD) stone framed in an anti-tarnish rhodium or gold-tone band. Delivers sensational optical fire and clarity for cocktail evenings and everyday sparkle.",
    categorySlug: "rings",
    collectionSlugs: ["daily-wear", "gifting", "new-arrivals", "bestsellers"],
    materialFinish: "silver-tone",
    stoneType: "American diamond (AD)",
    occasion: "Daily wear",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Protect from chemicals and household detergents. Store separately to avoid scratching.",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 36,
    images: [
      "/images/products/prod-2.jpg",
      "/products/ad-solitaire-statement-ring-1.svg",
      "/products/ad-solitaire-statement-ring-2.svg",
    ],
    variants: [
      { id: "var-2-1", title: "Size 6 (16.5 mm)", sku: "PH-RNG-001-S6", price: 129900, compareAtPrice: 199900, size: "6", stock: 12 },
      { id: "var-2-2", title: "Size 7 (17.3 mm)", sku: "PH-RNG-001-S7", price: 129900, compareAtPrice: 199900, size: "7", stock: 15 },
      { id: "var-2-3", title: "Size 8 (18.1 mm)", sku: "PH-RNG-001-S8", price: 129900, compareAtPrice: 199900, size: "8", stock: 9 },
    ],
  },
  {
    id: "prod-3",
    title: "Chandbali Festive Jhumkas",
    slug: "chandbali-festive-jhumkas",
    subtitle: "Antique Gold-tone Filigree",
    description: "Royal moon-crescent chandbalis integrated with classic hanging bell jhumkas, embellished with tiny simulated seed pearls. A quintessential festive adornment that dances with every movement.",
    categorySlug: "earrings",
    collectionSlugs: ["festive", "wedding", "bestsellers"],
    materialFinish: "gold-tone",
    stoneType: "pearl-style",
    occasion: "Festive",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Avoid submerging in water. Store in airtight pouch away from sunlight.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 64,
    images: [
      "/images/products/prod-3.jpg",
      "/products/chandbali-festive-jhumkas-1.svg",
      "/products/chandbali-festive-jhumkas-2.svg",
    ],
    variants: [
      { id: "var-3-1", title: "Antique Gold-tone", sku: "PH-EAR-001", price: 189900, compareAtPrice: 269900, stock: 18 },
      { id: "var-3-2", title: "Oxidised Silver-tone", sku: "PH-EAR-002", price: 169900, compareAtPrice: 249900, stock: 14 },
    ],
  },
  {
    id: "prod-4",
    title: "Emerald Stone Layered Necklace",
    slug: "emerald-stone-layered-necklace",
    subtitle: "Synthetic Emerald & Gold Finish",
    description: "Three graduated tiers of polished simulated emerald faceted beads interspersed with tiny gold-tone spacers. Creates a majestic neckline for festive kurtas and silk sarees.",
    categorySlug: "necklaces",
    collectionSlugs: ["festive", "wedding"],
    materialFinish: "gold-tone",
    stoneType: "synthetic emerald",
    occasion: "Festive",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wipe with damp microfibre cloth. Never spray perfume directly onto beads.",
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 22,
    images: [
      "/images/products/prod-4.jpg",
      "/products/emerald-stone-layered-necklace-1.svg",
      "/products/emerald-stone-layered-necklace-2.svg",
    ],
    variants: [
      { id: "var-4-1", title: "Rich Green / Gold", sku: "PH-NCK-001", price: 249900, compareAtPrice: 349900, stock: 7 },
    ],
  },
  {
    id: "prod-5",
    title: "Temple Peacock Cuff Bangle",
    slug: "temple-peacock-cuff-bangle",
    subtitle: "Carved Gold-tone Brass",
    description: "An openable kada cuff crafted in heirloom South Indian temple jewellery aesthetic, featuring hand-etched twin peacocks and ruby-colour synthetic cabochons.",
    categorySlug: "bangles-bracelets",
    collectionSlugs: ["wedding", "festive"],
    materialFinish: "gold-tone",
    stoneType: "synthetic ruby",
    occasion: "Wedding",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Keep dry. Wipe clean after wearing.",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 29,
    images: [
      "/images/products/prod-5.jpg",
      "/products/temple-peacock-cuff-bangle-1.svg",
      "/products/temple-peacock-cuff-bangle-2.svg",
    ],
    variants: [
      { id: "var-5-1", title: "Size 2.4", sku: "PH-BNG-001-24", price: 199900, compareAtPrice: 289900, size: "2.4", stock: 10 },
      { id: "var-5-2", title: "Size 2.6", sku: "PH-BNG-001-26", price: 199900, compareAtPrice: 289900, size: "2.6", stock: 12 },
      { id: "var-5-3", title: "Size 2.8", sku: "PH-BNG-001-28", price: 199900, compareAtPrice: 289900, size: "2.8", stock: 8 },
    ],
  },
  {
    id: "prod-6",
    title: "Sapphire Teardrop Pendant",
    slug: "sapphire-teardrop-pendant",
    subtitle: "Royal Blue AD Crystal Locket",
    description: "A mesmerizing royal blue synthetic crystal teardrop suspended inside an American Diamond halo, threaded onto an adjustable anti-tarnish cable chain.",
    categorySlug: "pendants",
    collectionSlugs: ["daily-wear", "gifting", "new-arrivals"],
    materialFinish: "gold-tone",
    stoneType: "American diamond (AD)",
    occasion: "Daily wear",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Avoid chlorine and soapy water. Polish with lint-free flannel.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 19,
    images: [
      "/images/products/prod-6.jpg",
      "/products/sapphire-teardrop-pendant-1.svg",
      "/products/sapphire-teardrop-pendant-2.svg",
    ],
    variants: [
      { id: "var-6-1", title: "Royal Blue / Gold-tone", sku: "PH-PND-001", price: 149900, compareAtPrice: 219900, stock: 16 },
      { id: "var-6-2", title: "Crimson Ruby / Gold-tone", sku: "PH-PND-002", price: 149900, compareAtPrice: 219900, stock: 11 },
    ],
  },
  {
    id: "prod-7",
    title: "Pearl Cluster Bridal Payal",
    slug: "pearl-cluster-bridal-payal",
    subtitle: "Delicate Anklet with Ghungroos",
    description: "A traditional pair of ankle ornaments woven with delicate simulated pearls, finished with melodious soft-ringing mini ghungroos and an antique S-hook.",
    categorySlug: "anklets",
    collectionSlugs: ["wedding", "festive"],
    materialFinish: "gold-tone",
    stoneType: "pearl-style",
    occasion: "Wedding",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Keep away from moisturizers and water splashes.",
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 15,
    images: [
      "/images/products/prod-7.jpg",
      "/products/pearl-cluster-bridal-payal-1.svg",
      "/products/pearl-cluster-bridal-payal-2.svg",
      "/products/pearl-cluster-bridal-payal-3.svg",
    ],
    variants: [
      { id: "var-7-1", title: "Pair (Standard 10.5 inch)", sku: "PH-ANK-001", price: 129900, compareAtPrice: 179900, stock: 14 },
    ],
  },
  {
    id: "prod-8",
    title: "Meenakari Flower Studs",
    slug: "meenakari-flower-studs",
    subtitle: "Hand-painted Blush Enamel",
    description: "Artisanal floral ear studs rendered with blush-pink and mint-green Meenakari enamel, with a sparkling American Diamond centre stone.",
    categorySlug: "earrings",
    collectionSlugs: ["daily-wear", "gifting"],
    materialFinish: "gold-tone",
    stoneType: "American diamond (AD) & meenakari",
    occasion: "Daily wear",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wipe with a clean dry cotton cloth. Do not soak in detergents.",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 31,
    images: [
      "/images/products/prod-8.jpg",
      "/products/meenakari-flower-studs-1.svg",
      "/products/meenakari-flower-studs-2.svg",
      "/products/meenakari-flower-studs-3.svg",
    ],
    variants: [
      { id: "var-8-1", title: "Blush Pink", sku: "PH-EAR-003", price: 89900, compareAtPrice: 129900, stock: 22 },
      { id: "var-8-2", title: "Mint Green", sku: "PH-EAR-004", price: 89900, compareAtPrice: 129900, stock: 18 },
    ],
  },
  {
    id: "prod-9",
    title: "Rose Gold-tone Tennis Bracelet",
    slug: "rose-gold-tennis-bracelet",
    subtitle: "Prong-set American Diamonds",
    description: "A continuous strand of square-cut, micro-faceted American Diamonds set in warm rose gold-tone brass with a secure double-latch safety clasp.",
    categorySlug: "bangles-bracelets",
    collectionSlugs: ["gifting", "daily-wear", "bestsellers"],
    materialFinish: "rose gold-tone",
    stoneType: "American diamond (AD)",
    occasion: "Gifting",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Store separately in provided anti-tarnish sleeve.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 42,
    images: [
      "/images/products/prod-9.jpg",
      "/products/rose-gold-tennis-bracelet-1.svg",
      "/products/rose-gold-tennis-bracelet-2.svg",
      "/products/rose-gold-tennis-bracelet-3.svg",
    ],
    variants: [
      { id: "var-9-1", title: "Rose Gold (7 inch)", sku: "PH-TNS-001", price: 179900, compareAtPrice: 259900, stock: 15 },
      { id: "var-9-2", title: "Silver-tone (7 inch)", sku: "PH-TNS-002", price: 179900, compareAtPrice: 259900, stock: 10 },
    ],
  },
  {
    id: "prod-10",
    title: "Oxidised Silver-tone Tribal Choker",
    slug: "oxidised-silver-tribal-necklace",
    subtitle: "Vintage Boho Styling",
    description: "Bohemian-inspired German silver look choker necklace with oxidised floral coins and soft ghungroo fringe. Pairs effortlessly with fusion wear and linen kurtis.",
    categorySlug: "necklaces",
    collectionSlugs: ["daily-wear", "festive"],
    materialFinish: "oxidised",
    stoneType: "tribal relief motif",
    occasion: "Daily wear",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Keep away from moisture to preserve vintage oxidised finish.",
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 26,
    images: [
      "/images/products/prod-10.jpg",
      "/products/oxidised-silver-tribal-necklace-1.svg",
      "/products/oxidised-silver-tribal-necklace-2.svg",
      "/products/oxidised-silver-tribal-necklace-3.svg",
    ],
    variants: [
      { id: "var-10-1", title: "Antique Oxidised Silver", sku: "PH-OXD-001", price: 119900, compareAtPrice: 169900, stock: 17 },
    ],
  },
  {
    id: "prod-11",
    title: "Ruby Drop Maang Tikka",
    slug: "ruby-drop-maang-tikka",
    subtitle: "Bridal Forehead Ornament",
    description: "A delicate bridal forehead ornament with synthetic ruby tear drops, tiny pearl beadings, and hair-hook clasp for festive coiffures.",
    categorySlug: "jewellery-sets",
    collectionSlugs: ["wedding", "festive"],
    materialFinish: "gold-tone",
    stoneType: "synthetic ruby & pearls",
    occasion: "Wedding",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Wipe with dry cotton. Store in flat box.",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 17,
    images: [
      "/images/products/prod-11.jpg",
      "/products/ruby-drop-maang-tikka-1.svg",
      "/products/ruby-drop-maang-tikka-2.svg",
      "/products/ruby-drop-maang-tikka-3.svg",
    ],
    variants: [
      { id: "var-11-1", title: "Classic Gold / Ruby", sku: "PH-TIK-001", price: 89900, compareAtPrice: 129900, stock: 12 },
    ],
  },
  {
    id: "prod-12",
    title: "Classic Gold-tone Daily Hoops",
    slug: "classic-gold-tone-daily-hoops",
    subtitle: "Anti-Tarnish Lightweight",
    description: "Featherlight, water-resistant daily hoop earrings with hypoallergenic surgical-steel posts and a high-sheen 18k gold-tone plating.",
    categorySlug: "earrings",
    collectionSlugs: ["daily-wear", "bestsellers"],
    materialFinish: "gold-tone",
    stoneType: "plain metal",
    occasion: "Daily wear",
    hsnCode: "7117",
    gstRate: 300,
    careInstructions: "Sweat-resistant. Wipe clean after workout or day out.",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 52,
    images: [
      "/images/products/prod-12.jpg",
      "/products/classic-gold-tone-daily-hoops-1.svg",
      "/products/classic-gold-tone-daily-hoops-2.svg",
      "/products/classic-gold-tone-daily-hoops-3.svg",
    ],
    variants: [
      { id: "var-12-1", title: "Small (20 mm)", sku: "PH-HOP-001-S", price: 69900, compareAtPrice: 99900, size: "20mm", stock: 25 },
      { id: "var-12-2", title: "Medium (30 mm)", sku: "PH-HOP-001-M", price: 79900, compareAtPrice: 119900, size: "30mm", stock: 20 },
    ],
  },
];

export const REVIEWS_DATA: MockReview[] = [
  {
    id: "rev-1",
    productSlug: "kundan-jadau-choker-set",
    authorName: "Simran Kaur",
    city: "Amritsar",
    rating: 5,
    title: "Stunning bridal set!",
    comment: "Wore this for my cousin's Anand Karaj. Everyone genuinely thought it was real gold and polki! The finish is remarkably high-end and didn't irritate my neck even after 8 hours.",
    isVerifiedPurchase: true,
    date: "14 Oct 2026",
  },
  {
    id: "rev-2",
    productSlug: "chandbali-festive-jhumkas",
    authorName: "Harpreet Gill",
    city: "Chandigarh",
    rating: 5,
    title: "Pure elegance, worth every rupee",
    comment: "The antique gold tone is so authentic — not that fake yellowish tint you get elsewhere. The packaging with the blush velvet pouch made it feel like luxury unboxing.",
    isVerifiedPurchase: true,
    date: "28 Oct 2026",
  },
  {
    id: "rev-3",
    productSlug: "ad-solitaire-statement-ring",
    authorName: "Ananya Sharma",
    city: "Delhi",
    rating: 5,
    title: "Unbelievable sparkle",
    comment: "The AD stone catches the light like a real solitaire diamond. Anti-tarnish coating is holding up perfectly through daily office wear.",
    isVerifiedPurchase: true,
    date: "02 Nov 2026",
  },
  {
    id: "rev-4",
    productSlug: "temple-peacock-cuff-bangle",
    authorName: "Meenakshi Sundaram",
    city: "Chennai",
    rating: 5,
    title: "Authentic temple craftsmanship",
    comment: "The peacock carving details are crisp and regal. The screw clasp fits securely on my wrist without pinching.",
    isVerifiedPurchase: true,
    date: "05 Nov 2026",
  },
  {
    id: "rev-5",
    productSlug: "rose-gold-tennis-bracelet",
    authorName: "Pooja Malhotra",
    city: "Mumbai",
    rating: 5,
    title: "Gifted to my sister",
    comment: "Ordered as a birthday surprise with gift wrapping. The handwritten note and blush satin ribbon made her day!",
    isVerifiedPurchase: true,
    date: "09 Nov 2026",
  },
  {
    id: "rev-6",
    productSlug: "emerald-stone-layered-necklace",
    authorName: "Kavita Reddy",
    city: "Hyderabad",
    rating: 4,
    title: "Royal green shade",
    comment: "Pairs gorgeously with Kanjeevaram sarees. Delivered in 3 days via express courier.",
    isVerifiedPurchase: true,
    date: "11 Nov 2026",
  },
  {
    id: "rev-7",
    productSlug: "sapphire-teardrop-pendant",
    authorName: "Rhea Sen",
    city: "Kolkata",
    rating: 5,
    title: "Subtle yet striking",
    comment: "The blue crystal is deeply saturated and looks enchanting with evening wear.",
    isVerifiedPurchase: true,
    date: "12 Nov 2026",
  },
  {
    id: "rev-8",
    productSlug: "classic-gold-tone-daily-hoops",
    authorName: "Tanya Grover",
    city: "Pune",
    rating: 5,
    title: "My everyday go-to",
    comment: "I have sensitive ears that react to cheap artificial metals. These hoops caused zero irritation even after sleeping in them.",
    isVerifiedPurchase: true,
    date: "14 Nov 2026",
  },
  {
    id: "rev-9",
    productSlug: "pearl-cluster-bridal-payal",
    authorName: "Jasleen Ahluwalia",
    city: "Ludhiana",
    rating: 5,
    title: "Sweet soft tinkling sound",
    comment: "The pearls are high lustre and the bells produce such a delicate chime.",
    isVerifiedPurchase: true,
    date: "15 Nov 2026",
  },
  {
    id: "rev-10",
    productSlug: "meenakari-flower-studs",
    authorName: "Deepika Joshi",
    city: "Jaipur",
    rating: 5,
    title: "Delicate and sweet",
    comment: "The pastel enamel paint is flawless. Looks adorable with cotton suits and summer dresses.",
    isVerifiedPurchase: true,
    date: "16 Nov 2026",
  },
  {
    id: "rev-11",
    productSlug: "oxidised-silver-tribal-necklace",
    authorName: "Shreya Nair",
    city: "Bengaluru",
    rating: 5,
    title: "Chic boho vibes",
    comment: "Substantial weight, authentic matte oxidised silver-tone look.",
    isVerifiedPurchase: true,
    date: "17 Nov 2026",
  },
  {
    id: "rev-12",
    productSlug: "ruby-drop-maang-tikka",
    authorName: "Manpreet Dhingra",
    city: "Jalandhar",
    rating: 5,
    title: "Perfect forehead proportion",
    comment: "Sat firmly without slipping. The ruby droplet sparkles beautifully in photographs.",
    isVerifiedPurchase: true,
    date: "18 Nov 2026",
  },
];

export const COUPONS_DATA: MockCoupon[] = [
  {
    code: "WELCOME10",
    discountType: "percent",
    discountValue: 10,
    minOrderValue: 99900, // min ₹999
    maxDiscount: 50000, // max ₹500
  },
  {
    code: "FESTIVE500",
    discountType: "flat",
    discountValue: 50000, // ₹500 flat off
    minOrderValue: 299900, // min ₹2999
  },
  {
    code: "FREESHIP",
    discountType: "free_shipping",
    discountValue: 0,
    minOrderValue: 0,
  },
];
