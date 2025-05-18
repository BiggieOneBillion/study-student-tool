import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 50; // Adjust based on your needs

// In-memory store for rate limiting (use Redis in production)
const rateLimit = new Map();

export async function rateLimitMiddleware(req: NextRequest) {
  // Get user ID from session
  const token = await getToken({ req });
  const userId = token?.sub || req.ip || 'anonymous';
  
  const now = Date.now();
  const userRateLimit = rateLimit.get(userId) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };
  
  // Reset count if window has expired
  if (now > userRateLimit.resetAt) {
    userRateLimit.count = 0;
    userRateLimit.resetAt = now + RATE_LIMIT_WINDOW;
  }
  
  // Increment count and check limit
  userRateLimit.count += 1;
  rateLimit.set(userId, userRateLimit);
  
  if (userRateLimit.count > MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }
  
  // Add rate limit headers to response
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
  response.headers.set('X-RateLimit-Remaining', (MAX_REQUESTS_PER_WINDOW - userRateLimit.count).toString());
  response.headers.set('X-RateLimit-Reset', userRateLimit.resetAt.toString());
  
  return response;
}