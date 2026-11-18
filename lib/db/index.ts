import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import { env } from "@/lib/env";

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getDbPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on("error", (err) => {
      console.warn("Postgres pool idle error (fallback enabled):", err.message);
    });
  }
  return pool;
}

export const db = drizzle(getDbPool(), { schema });

export * from "./schema";
