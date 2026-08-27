/**
 * In-Memory Rate Limiter
 * =====================
 * A simple Map-based rate limiter for Next.js API routes.
 *
 * NOTE: This implementation is in-process only. For multi-instance
 * production deployments (multiple Node.js processes / containers),
 * replace the store with Redis using the `rate-limiter-flexible` package.
 *
 * Usage:
 *   import { rateLimit } from "@/lib/rateLimit";
 *
 *   const limiter = rateLimit({ maxAttempts: 5, windowMs: 15 * 60 * 1000 });
 *   const key = request.headers.get("x-forwarded-for") || "unknown";
 *   const result = limiter.check(key);
 *   if (!result.allowed) {
 *     return NextResponse.json({ error: "Too many requests." }, { status: 429 });
 *   }
 */

/**
 * Creates a rate limiter instance.
 *
 * @param {object} options
 * @param {number} options.maxAttempts - Max allowed hits within window
 * @param {number} options.windowMs   - Window duration in milliseconds
 * @returns {{ check: (key: string) => { allowed: boolean, remaining: number, resetAt: number } }}
 */
export function rateLimit({ maxAttempts, windowMs }) {
  /** @type {Map<string, { count: number, resetAt: number }>} */
  const store = new Map();

  // Periodically remove expired entries to prevent unbounded memory growth.
  // Only runs server-side; no-op if this module is somehow loaded client-side.
  if (typeof setInterval !== "undefined") {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of store) {
        if (entry.resetAt <= now) {
          store.delete(key);
        }
      }
    }, windowMs);
  }

  /**
   * @param {string} key - Unique identifier (e.g. IP address, email)
   * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
   */
  function check(key) {
    const now = Date.now();
    let entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 1, resetAt: now + windowMs };
      store.set(key, entry);
      return { allowed: true, remaining: maxAttempts - 1, resetAt: entry.resetAt };
    }

    entry.count += 1;

    if (entry.count > maxAttempts) {
      return { allowed: false, remaining: 0, resetAt: entry.resetAt };
    }

    return { allowed: true, remaining: maxAttempts - entry.count, resetAt: entry.resetAt };
  }

  /**
   * Manually reset the counter for a key (e.g. after successful login).
   * @param {string} key
   */
  function reset(key) {
    store.delete(key);
  }

  return { check, reset };
}

// ─── Pre-configured limiters ─────────────────────────────────────────────────

/** Login: 5 attempts per 15 minutes per IP */
export const loginLimiter = rateLimit({ maxAttempts: 5, windowMs: 15 * 60 * 1000 });

/** Forgot password: 3 requests per 10 minutes per IP */
export const forgotPasswordLimiter = rateLimit({ maxAttempts: 3, windowMs: 10 * 60 * 1000 });

/** OTP verification: 5 wrong attempts tracked in DB, but also limit per IP */
export const otpLimiter = rateLimit({ maxAttempts: 10, windowMs: 15 * 60 * 1000 });

/**
 * Extract the best available client IP from a Next.js request.
 * @param {import("next/server").NextRequest} request
 * @returns {string}
 */
export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
