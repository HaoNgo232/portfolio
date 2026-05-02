const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/i,
  /disregard\s+(all\s+)?(previous|prior|above)\s+instructions?/i,
  /you\s+are\s+now\b/i,
  /act\s+as\b/i,
  /pretend\s+(to\s+be|you\s+are)\b/i,
  /role\s*play\b/i,
  /system\s*:/i,
  /<\/?system\b[^>]*>/i,
  /<\|im_start\|>/i,
  /reveal\s+(the\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(the\s+)?(system\s+)?prompt/i,
  /developer\s+message/i,
  /bypass\s+(your\s+)?instructions?/i,
];

export function sanitizeInput(text: string): string {
  return text.replaceAll("\0", "").trim();
}

export function detectPromptInjection(text: string): boolean {
  const sanitized = sanitizeInput(text);
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(sanitized));
}
