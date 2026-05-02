export const MAX_CHAT_MESSAGES = 20;
export const MAX_CHAT_MESSAGE_LENGTH = 2000;

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
}

export interface ValidatedChatRequest {
  messages: ChatMessage[];
  latestUserMessage: ChatMessage;
}

export interface ChatErrorResponse {
  error:
    | "invalid_request"
    | "prompt_injection"
    | "rate_limited"
    | "gemini_error";
  message: string;
}

export interface ChatLogEntry {
  type: "chat_request";
  timestamp: string;
  ip: string;
  userMessageLength: number;
  historyLength: number;
  blockedReason:
    | null
    | "invalid_request"
    | "prompt_injection"
    | "rate_limited"
    | "gemini_error";
  modelUsed: string | null;
  durationMs: number;
}
