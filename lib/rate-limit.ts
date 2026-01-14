type RateLimitEntry = {
  count: number;
  lastRequest: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const WINDOW_SIZE = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // max 100 requests per window

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry) {
    rateLimitMap.set(key, { count: 1, lastRequest: now });
    return false;
  }

  if (now - entry.lastRequest > WINDOW_SIZE) {
    rateLimitMap.set(key, { count: 1, lastRequest: now });
    return false;
  }

  entry.count += 1;
  entry.lastRequest = now;

  rateLimitMap.set(key, entry);

  return entry.count > MAX_REQUESTS;
}

export function resetRateLimit(key: string) {
  rateLimitMap.delete(key);
}
