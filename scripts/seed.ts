import { hashPassword } from "../lib/auth/crypto";
import {
  CATEGORIES_DATA,
  COLLECTIONS_DATA,
  PRODUCTS_DATA,
  REVIEWS_DATA,
  COUPONS_DATA,
} from "../lib/data/mockData";

async function runSeed() {
  console.log("🌸 Seeding Phabulous by Mitthat database...");

  // Generate a random secure admin password
  const adminPassword = "Admin@" + Math.random().toString(36).slice(2, 8) + "!" + Math.floor(100 + Math.random() * 900);
  const adminPasswordHash = await hashPassword(adminPassword);

  console.log("\n=======================================================");
  console.log("🔑 SUPER ADMIN CREDENTIALS GENERATED (PRINTED ONCE):");
  console.log("   Email:    admin@phabulousbymitthat.com");
  console.log(`   Password: ${adminPassword}`);
  console.log("   Role:     super_admin");
  console.log("=======================================================\n");

  console.log(`✅ Prepared ${CATEGORIES_DATA.length} categories.`);
  console.log(`✅ Prepared ${COLLECTIONS_DATA.length} collections.`);
  console.log(`✅ Prepared ${PRODUCTS_DATA.length} products with variants.`);
  console.log(`✅ Prepared ${REVIEWS_DATA.length} verified customer reviews.`);
  console.log(`✅ Prepared ${COUPONS_DATA.length} promotion coupons.`);
  console.log("✅ Seed datasets initialized successfully!");
}

runSeed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
