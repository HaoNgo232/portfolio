import { NextResponse } from "next/server";
import { streamChat } from "@/lib/chat/gemini-client";
import { hasUserPromptInjection, isRateLimited } from "@/lib/chat/security";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import type { ChatErrorResponse, ChatLogEntry } from "@/lib/chat/types";
import { parseChatRequest } from "@/lib/chat/validation";

const encoder = new TextEncoder();

function jsonError(
  status: number,
  response: ChatErrorResponse,
): NextResponse<ChatErrorResponse> {
  return NextResponse.json(response, { status });
}

function maskIp(ip: string): string {
  const firstIp = ip.split(",")[0]?.trim() || "unknown";
  const parts = firstIp.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.x.x`;
  }
  return firstIp === "unknown" ? "unknown" : "masked";
}

function logChatRequest(entry: ChatLogEntry): void {
  console.info(JSON.stringify(entry));
}

function createLogEntry(
  params: Omit<ChatLogEntry, "type" | "timestamp" | "durationMs"> & {
    startedAt: number;
  },
): ChatLogEntry {
  return {
    type: "chat_request",
    timestamp: new Date().toISOString(),
    ip: params.ip,
    userMessageLength: params.userMessageLength,
    historyLength: params.historyLength,
    blockedReason: params.blockedReason,
    modelUsed: params.modelUsed,
    durationMs: Date.now() - params.startedAt,
  };
}

function sseData(payload: string): Uint8Array {
  return encoder.encode(`data: ${payload}\n\n`);
}

export async function POST(request: Request): Promise<Response> {
  const startedAt = Date.now();
  const ip = maskIp(
    request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown",
  );

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    logChatRequest(
      createLogEntry({
        startedAt,
        ip,
        userMessageLength: 0,
        historyLength: 0,
        blockedReason: "invalid_request",
        modelUsed: null,
      }),
    );
    return jsonError(400, {
      error: "invalid_request",
      message: "Payload chat không hợp lệ.",
    });
  }

  const parsed = parseChatRequest(payload);
  if (!parsed.ok) {
    logChatRequest(
      createLogEntry({
        startedAt,
        ip,
        userMessageLength: 0,
        historyLength: 0,
        blockedReason: "invalid_request",
        modelUsed: null,
      }),
    );
    return jsonError(400, { error: parsed.error, message: parsed.message });
  }

  const { messages, latestUserMessage } = parsed.value;

  if (isRateLimited(ip)) {
    logChatRequest(
      createLogEntry({
        startedAt,
        ip,
        userMessageLength: latestUserMessage.content.length,
        historyLength: messages.length,
        blockedReason: "rate_limited",
        modelUsed: null,
      }),
    );
    return jsonError(429, {
      error: "rate_limited",
      message: "Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.",
    });
  }

  if (hasUserPromptInjection(messages)) {
    logChatRequest(
      createLogEntry({
        startedAt,
        ip,
        userMessageLength: latestUserMessage.content.length,
        historyLength: messages.length,
        blockedReason: "prompt_injection",
        modelUsed: null,
      }),
    );
    return jsonError(400, {
      error: "prompt_injection",
      message:
        "Tin nhắn của bạn chứa nội dung không phù hợp. Vui lòng đặt câu hỏi liên quan đến Hạo và các dự án trong portfolio.",
    });
  }

  try {
    const systemPrompt = buildSystemPrompt();
    const result = await streamChat(messages, systemPrompt);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of result.stream) {
            controller.enqueue(sseData(JSON.stringify({ text })));
          }
          controller.enqueue(sseData("[DONE]"));
          logChatRequest(
            createLogEntry({
              startedAt,
              ip,
              userMessageLength: latestUserMessage.content.length,
              historyLength: messages.length,
              blockedReason: null,
              modelUsed: result.model,
            }),
          );
          controller.close();
        } catch (error: unknown) {
          console.error("chat_stream_error", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("chat_gemini_error", error);
    logChatRequest(
      createLogEntry({
        startedAt,
        ip,
        userMessageLength: latestUserMessage.content.length,
        historyLength: messages.length,
        blockedReason: "gemini_error",
        modelUsed: null,
      }),
    );
    return jsonError(500, {
      error: "gemini_error",
      message:
        "Hiện tại trợ lý AI gặp sự cố. Vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp Hạo qua email.",
    });
  }
}
