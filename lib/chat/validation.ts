import {
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_CHAT_MESSAGES,
  type ChatErrorResponse,
  type ChatMessage,
  type ChatRole,
  type ValidatedChatRequest,
} from "./types.ts";
import { sanitizeInput } from "./sanitize.ts";

type ParseResult =
  | { ok: true; value: ValidatedChatRequest }
  | ({ ok: false } & ChatErrorResponse);

const INVALID_REQUEST_MESSAGE = "Payload chat không hợp lệ.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isChatRole(value: unknown): value is ChatRole {
  return value === "user" || value === "assistant";
}

function parseMessage(value: unknown): ChatMessage | null {
  if (
    !isRecord(value) ||
    !isChatRole(value.role) ||
    typeof value.content !== "string"
  ) {
    return null;
  }

  const content = sanitizeInput(value.content);
  if (content.length === 0 || content.length > MAX_CHAT_MESSAGE_LENGTH) {
    return null;
  }

  return { role: value.role, content };
}

export function parseChatRequest(payload: unknown): ParseResult {
  if (
    !isRecord(payload) ||
    !Array.isArray(payload.messages) ||
    payload.messages.length === 0
  ) {
    return {
      ok: false,
      error: "invalid_request",
      message: INVALID_REQUEST_MESSAGE,
    };
  }

  const parsedMessages: ChatMessage[] = [];
  for (const rawMessage of payload.messages) {
    const message = parseMessage(rawMessage);
    if (!message) {
      return {
        ok: false,
        error: "invalid_request",
        message: INVALID_REQUEST_MESSAGE,
      };
    }
    parsedMessages.push(message);
  }

  const messages = parsedMessages.slice(-MAX_CHAT_MESSAGES);
  const latestUserMessage = messages.at(-1);

  if (!latestUserMessage || latestUserMessage.role !== "user") {
    return {
      ok: false,
      error: "invalid_request",
      message: INVALID_REQUEST_MESSAGE,
    };
  }

  return { ok: true, value: { messages, latestUserMessage } };
}
