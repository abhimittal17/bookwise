type RateLimitEntry = {
  count: number;
  lastRequest: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const WINDOW_SIZE = 60 * 60 * 1000;
const MAX_REQUESTS = 10; 

export function isRateLimited(key: string, maxRequests: number = MAX_REQUESTS, windowSize: number = WINDOW_SIZE): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry) {
    rateLimitMap.set(key, { count: 1, lastRequest: now });
    return false;
  }

  if (now - entry.lastRequest > windowSize) {
    rateLimitMap.set(key, { count: 1, lastRequest: now });
    return false;
  }

  entry.count += 1;
  entry.lastRequest = now;

  rateLimitMap.set(key, entry);

  return entry.count > maxRequests;
}

export function resetRateLimit(key: string) {
  rateLimitMap.delete(key);
}
