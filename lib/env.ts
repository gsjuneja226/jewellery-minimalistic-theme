import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/phabulous_jewellery"),
  AUTH_SECRET: z.string().min(16).default("phabulous_super_secret_jwt_and_session_key_min_32_characters_long"),
  ADMIN_MFA_ENFORCE: z.enum(["true", "false"]).default("true"),

  // Providers
  PAYMENT_PROVIDER: z.enum(["mock", "razorpay"]).default("mock"),
  SHIPPING_PROVIDER: z.enum(["mock", "shiprocket"]).default("mock"),
  SMS_PROVIDER: z.enum(["mock", "msg91"]).default("mock"),
  EMAIL_PROVIDER: z.enum(["mock", "resend"]).default("mock"),
  STORAGE_PROVIDER: z.enum(["local", "r2"]).default("local"),

  // Razorpay
  RAZORPAY_KEY_ID: z.string().optional().default(""),
  RAZORPAY_KEY_SECRET: z.string().optional().default(""),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional().default(""),

  // Shiprocket
  SHIPROCKET_EMAIL: z.string().optional().default(""),
  SHIPROCKET_PASSWORD: z.string().optional().default(""),
  SHIPROCKET_WEBHOOK_TOKEN: z.string().optional().default(""),

  // Email
  RESEND_API_KEY: z.string().optional().default(""),
  EMAIL_FROM: z.string().default("orders@phabulousbymitthat.com"),

  // Storage
  R2_ACCOUNT_ID: z.string().optional().default(""),
  R2_ACCESS_KEY_ID: z.string().optional().default(""),
  R2_SECRET_ACCESS_KEY: z.string().optional().default(""),
  R2_BUCKET_NAME: z.string().optional().default(""),
  R2_PUBLIC_DOMAIN: z.string().optional().default(""),

  // Turnstile
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().default("1x00000000000000000000AA"),
  TURNSTILE_SECRET_KEY: z.string().default("1x0000000000000000000000000000000AA"),

  // Cron
  CRON_SECRET: z.string().min(8).default("phabulous_cron_secret_key_12345"),
});

export type Env = z.infer<typeof envSchema>;

let parsedEnv: Env;

export function getEnv(): Env {
  if (parsedEnv) return parsedEnv;
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    // In dev / build, fall back to defaults gracefully
    parsedEnv = envSchema.parse({
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || "development",
    });
  } else {
    parsedEnv = result.data;
  }
  return parsedEnv;
}

export const env = getEnv();
