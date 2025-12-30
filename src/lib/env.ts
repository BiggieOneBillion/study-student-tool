import { z } from "zod";

const envSchema = z.object({
  // Database
  MONGO_URL: z.string().url(),
  
  // Auth (Clerk)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  
  // Liveblocks
  LIVEBLOCKS_SECRET_KEY: z.string().min(1),
  
  // AI (Gemini) - Adjust key names if they differ in your .env
  GOOGLE_GEMINI_API_KEY: z.string().optional(),
  
  // App Config
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(_env.error.format(), null, 2)
  );
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
