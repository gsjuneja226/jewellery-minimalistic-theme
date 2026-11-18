import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  json,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// 1. Users
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    passwordHash: text("password_hash"),
    role: text("role").default("customer").notNull(), // 'super_admin' | 'manager' | 'inventory' | 'support' | 'marketing' | 'customer'
    twoFactorSecret: text("two_factor_secret"),
    twoFactorEnabled: boolean("two_factor_enabled").default(false).notNull(),
    emailVerified: timestamp("email_verified"),
    phoneVerified: timestamp("phone_verified"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.role),
  })
);

// 2. Sessions
export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex("sessions_token_idx").on(table.token),
    userIdx: index("sessions_user_idx").on(table.userId),
  })
);

// 3. Accounts (OAuth)
export const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    providerAccountIdx: uniqueIndex("accounts_provider_idx").on(table.provider, table.providerAccountId),
  })
);

// 4. Addresses
export const addresses = pgTable(
  "addresses",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    landmark: text("landmark"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    postalCode: text("postal_code").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("addresses_user_idx").on(table.userId),
  })
);

// 5. Categories
export const categories = pgTable(
  "categories",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    imageUrl: text("image_url"),
    parentId: text("parent_id"),
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("categories_slug_idx").on(table.slug),
  })
);

// 6. Collections
export const collections = pgTable(
  "collections",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    imageUrl: text("image_url"),
    isFeatured: boolean("is_featured").default(false).notNull(),
    type: text("type").default("manual").notNull(), // 'manual' | 'rule_based'
    rules: json("rules"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("collections_slug_idx").on(table.slug),
  })
);

// 7. Collection Products
export const collectionProducts = pgTable(
  "collection_products",
  {
    collectionId: text("collection_id").references(() => collections.id, { onDelete: "cascade" }).notNull(),
    productId: text("product_id").notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.collectionId, table.productId] }),
  })
);

// 8. Products
export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    subtitle: text("subtitle"),
    description: text("description").notNull(),
    categoryId: text("category_id").references(() => categories.id),
    materialFinish: text("material_finish").notNull(), // 'gold-tone' | 'silver-tone' | 'rose gold-tone' | 'oxidised' | 'kundan-style'
    stoneType: text("stone_type"), // 'American diamond (AD)' | 'pearl-style' | 'synthetic emerald' | etc.
    occasion: text("occasion"), // 'Wedding' | 'Festive' | 'Daily wear' | 'Gifting'
    gender: text("gender").default("women").notNull(),
    tags: json("tags").default([]),
    hsnCode: text("hsn_code").default("7117").notNull(),
    gstRate: integer("gst_rate").default(300).notNull(), // 3% = 300 basis points
    careInstructions: text("care_instructions"),
    isDraft: boolean("is_draft").default(false).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
    categoryIdx: index("products_category_idx").on(table.categoryId),
    createdAtIdx: index("products_created_at_idx").on(table.createdAt),
  })
);

// 9. Variants
export const variants = pgTable(
  "variants",
  {
    id: text("id").primaryKey(),
    productId: text("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    sku: text("sku").notNull().unique(),
    price: integer("price").notNull(), // in paise
    compareAtPrice: integer("compare_at_price"), // in paise
    costPrice: integer("cost_price"), // in paise
    size: text("size"),
    color: text("color"),
    barcode: text("barcode"),
    weightGrams: integer("weight_grams").default(25),
    stock: integer("stock").default(0).notNull(),
    lowStockThreshold: integer("low_stock_threshold").default(3).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    skuIdx: uniqueIndex("variants_sku_idx").on(table.sku),
    productIdx: index("variants_product_idx").on(table.productId),
  })
);

// 10. Product Images
export const productImages = pgTable(
  "product_images",
  {
    id: text("id").primaryKey(),
    productId: text("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
    variantId: text("variant_id"),
    url: text("url").notNull(),
    altText: text("alt_text").notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
  },
  (table) => ({
    productIdx: index("product_images_product_idx").on(table.productId),
  })
);

// 11. Inventory Movements
export const stockMovements = pgTable(
  "stock_movements",
  {
    id: text("id").primaryKey(),
    variantId: text("variant_id").references(() => variants.id, { onDelete: "cascade" }).notNull(),
    quantityChange: integer("quantity_change").notNull(),
    reason: text("reason").notNull(), // 'order_placed', 'order_cancelled', 'manual_adjustment', 'restock', 'return'
    referenceId: text("reference_id"),
    performedBy: text("performed_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    variantIdx: index("stock_movements_variant_idx").on(table.variantId),
  })
);

// 12. Stock Reservations (15-min TTL during checkout)
export const reservations = pgTable(
  "reservations",
  {
    id: text("id").primaryKey(),
    cartId: text("cart_id").notNull(),
    variantId: text("variant_id").references(() => variants.id, { onDelete: "cascade" }).notNull(),
    quantity: integer("quantity").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    isReleased: boolean("is_released").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    cartIdx: index("reservations_cart_idx").on(table.cartId),
    expiresIdx: index("reservations_expires_idx").on(table.expiresAt),
  })
);

// 13. Carts
export const carts = pgTable(
  "carts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    guestToken: text("guest_token"),
    couponCode: text("coupon_code"),
    subtotal: integer("subtotal").default(0).notNull(),
    discount: integer("discount").default(0).notNull(),
    shipping: integer("shipping").default(0).notNull(),
    tax: integer("tax").default(0).notNull(),
    total: integer("total").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("carts_user_idx").on(table.userId),
    guestIdx: index("carts_guest_idx").on(table.guestToken),
  })
);

// 14. Cart Items
export const cartItems = pgTable(
  "cart_items",
  {
    id: text("id").primaryKey(),
    cartId: text("cart_id").references(() => carts.id, { onDelete: "cascade" }).notNull(),
    variantId: text("variant_id").references(() => variants.id, { onDelete: "cascade" }).notNull(),
    quantity: integer("quantity").default(1).notNull(),
    unitPrice: integer("unit_price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    cartIdx: index("cart_items_cart_idx").on(table.cartId),
  })
);

// 15. Wishlists
export const wishlists = pgTable(
  "wishlists",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    guestToken: text("guest_token"),
    productId: text("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("wishlists_user_idx").on(table.userId),
    guestIdx: index("wishlists_guest_idx").on(table.guestToken),
  })
);

// 16. Orders
export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(),
    orderNumber: text("order_number").notNull().unique(),
    userId: text("user_id"),
    status: text("status").default("PENDING_PAYMENT").notNull(), // PENDING_PAYMENT, COD_VERIFICATION, CONFIRMED, PACKED, SHIPPED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED, RETURN_REQUESTED, RETURNED, REFUNDED
    currency: text("currency").default("INR").notNull(),
    subtotal: integer("subtotal").notNull(), // paise
    discount: integer("discount").default(0).notNull(),
    shippingFee: integer("shipping_fee").default(0).notNull(),
    codFee: integer("cod_fee").default(0).notNull(),
    taxAmount: integer("tax_amount").notNull(),
    totalAmount: integer("total_amount").notNull(),
    paymentStatus: text("payment_status").default("pending").notNull(), // 'pending', 'paid', 'failed', 'refunded'
    paymentMethod: text("payment_method").notNull(), // 'razorpay', 'cod'
    shippingAddress: json("shipping_address").notNull(),
    billingAddress: json("billing_address").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerName: text("customer_name").notNull(),
    notes: text("notes"),
    cancelReason: text("cancel_reason"),
    trackingNumber: text("tracking_number"),
    awbCode: text("awb_code"),
    courierName: text("courier_name"),
    giftWrap: boolean("gift_wrap").default(false).notNull(),
    giftMessage: text("gift_message"),
    idempotencyKey: text("idempotency_key"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    orderNumberIdx: uniqueIndex("orders_number_idx").on(table.orderNumber),
    userIdx: index("orders_user_idx").on(table.userId),
    statusIdx: index("orders_status_idx").on(table.status),
    createdAtIdx: index("orders_created_idx").on(table.createdAt),
  })
);

// 17. Order Items (Snapshots at purchase time)
export const orderItems = pgTable(
  "order_items",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    productId: text("product_id").notNull(),
    variantId: text("variant_id").notNull(),
    titleSnapshot: text("title_snapshot").notNull(),
    variantTitleSnapshot: text("variant_title_snapshot").notNull(),
    skuSnapshot: text("sku_snapshot").notNull(),
    priceSnapshot: integer("price_snapshot").notNull(), // paise
    taxSnapshot: integer("tax_snapshot").notNull(),
    imageSnapshot: text("image_snapshot").notNull(),
    quantity: integer("quantity").notNull(),
    subtotal: integer("subtotal").notNull(),
  },
  (table) => ({
    orderIdx: index("order_items_order_idx").on(table.orderId),
  })
);

// 18. Payments
export const payments = pgTable(
  "payments",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    provider: text("provider").notNull(), // 'razorpay' | 'cod_manual'
    transactionId: text("transaction_id"),
    status: text("status").notNull(), // 'created', 'authorized', 'captured', 'failed'
    amount: integer("amount").notNull(), // paise
    currency: text("currency").default("INR").notNull(),
    rawPayload: json("raw_payload"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("payments_order_idx").on(table.orderId),
    transIdx: index("payments_trans_idx").on(table.transactionId),
  })
);

// 19. Payment Webhook Events (Deduplication)
export const paymentEvents = pgTable(
  "payment_events",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id").notNull().unique(),
    provider: text("provider").notNull(),
    eventType: text("event_type").notNull(),
    payload: json("payload").notNull(),
    processedAt: timestamp("processed_at").defaultNow().notNull(),
  },
  (table) => ({
    eventIdx: uniqueIndex("payment_events_event_idx").on(table.eventId),
  })
);

// 20. Refunds
export const refunds = pgTable(
  "refunds",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    paymentId: text("payment_id"),
    amount: integer("amount").notNull(), // paise
    reason: text("reason").notNull(),
    status: text("status").default("processed").notNull(),
    razorpayRefundId: text("razorpay_refund_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("refunds_order_idx").on(table.orderId),
  })
);

// 21. Shipments
export const shipments = pgTable(
  "shipments",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    awb: text("awb").notNull(),
    carrier: text("carrier").notNull(),
    trackingUrl: text("tracking_url"),
    labelUrl: text("label_url"),
    status: text("status").default("MANIFESTED").notNull(),
    estimatedDelivery: timestamp("estimated_delivery"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("shipments_order_idx").on(table.orderId),
    awbIdx: index("shipments_awb_idx").on(table.awb),
  })
);

// 22. Shipment Events
export const shipmentEvents = pgTable(
  "shipment_events",
  {
    id: text("id").primaryKey(),
    shipmentId: text("shipment_id").references(() => shipments.id, { onDelete: "cascade" }).notNull(),
    status: text("status").notNull(),
    description: text("description").notNull(),
    location: text("location"),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => ({
    shipmentIdx: index("shipment_events_shipment_idx").on(table.shipmentId),
  })
);

// 23. Returns
export const returns = pgTable(
  "returns",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    orderItemId: text("order_item_id").notNull(),
    userId: text("user_id").notNull(),
    reason: text("reason").notNull(),
    photos: json("photos").default([]),
    status: text("status").default("REQUESTED").notNull(), // 'REQUESTED', 'APPROVED', 'PICKED_UP', 'INSPECTED', 'REFUNDED', 'REJECTED'
    refundAmount: integer("refund_amount").notNull(),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: index("returns_order_idx").on(table.orderId),
  })
);

// 24. Coupons
export const coupons = pgTable(
  "coupons",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull().unique(),
    discountType: text("discount_type").notNull(), // 'percent' | 'flat' | 'free_shipping'
    discountValue: integer("discount_value").notNull(), // percent or paise
    minOrderValue: integer("min_order_value").default(0).notNull(), // paise
    maxDiscount: integer("max_discount"), // paise
    usageLimit: integer("usage_limit"),
    usageCount: integer("usage_count").default(0).notNull(),
    expiresAt: timestamp("expires_at"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    codeIdx: uniqueIndex("coupons_code_idx").on(table.code),
  })
);

// 25. Reviews
export const reviews = pgTable(
  "reviews",
  {
    id: text("id").primaryKey(),
    productId: text("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
    userId: text("user_id"),
    authorName: text("author_name").notNull(),
    rating: integer("rating").notNull(),
    title: text("title"),
    comment: text("comment").notNull(),
    photos: json("photos").default([]),
    isVerifiedPurchase: boolean("is_verified_purchase").default(false).notNull(),
    isApproved: boolean("is_approved").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    productIdx: index("reviews_product_idx").on(table.productId),
  })
);

// 26. CMS Pages
export const cmsPages = pgTable(
  "cms_pages",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    contentHtml: text("content_html").notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("cms_pages_slug_idx").on(table.slug),
  })
);

// 27. Outbox Background Jobs
export const outboxJobs = pgTable(
  "outbox_jobs",
  {
    id: text("id").primaryKey(),
    jobType: text("job_type").notNull(), // 'email', 'sms', 'stock_release', 'abandoned_cart'
    payload: json("payload").notNull(),
    status: text("status").default("pending").notNull(), // 'pending', 'processing', 'completed', 'failed'
    attempts: integer("attempts").default(0).notNull(),
    maxAttempts: integer("max_attempts").default(3).notNull(),
    lastError: text("last_error"),
    executeAt: timestamp("execute_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    statusIdx: index("outbox_status_idx").on(table.status, table.executeAt),
  })
);

// 28. Audit Logs
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    beforeState: json("before_state"),
    afterState: json("after_state"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    entityIdx: index("audit_logs_entity_idx").on(table.entityType, table.entityId),
    createdAtIdx: index("audit_logs_created_idx").on(table.createdAt),
  })
);

// 29. Store Settings
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: json("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 30. Subscribers (Newsletter + WhatsApp)
export const subscribers = pgTable(
  "subscribers",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    whatsappConsent: boolean("whatsapp_consent").default(false).notNull(),
    source: text("source").default("homepage_footer").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("subscribers_email_idx").on(table.email),
  })
);

// 31. Back In Stock Requests
export const backInStockRequests = pgTable(
  "back_in_stock_requests",
  {
    id: text("id").primaryKey(),
    variantId: text("variant_id").references(() => variants.id, { onDelete: "cascade" }).notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    isNotified: boolean("is_notified").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    variantIdx: index("back_in_stock_variant_idx").on(table.variantId),
  })
);
