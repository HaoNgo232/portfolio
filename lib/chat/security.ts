import { detectPromptInjection } from "./sanitize.ts";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(ip: string, now = Date.now()): boolean {
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  rateLimitBuckets.set(ip, {
    ...bucket,
    count: bucket.count + 1,
  });
  return false;
}

export function hasUserPromptInjection(
  messages: { role: string; content: string }[],
): boolean {
  return messages.some(
    (message) =>
      message.role === "user" && detectPromptInjection(message.content),
  );
}

export function resetRateLimitForTest(): void {
  rateLimitBuckets.clear();
}
