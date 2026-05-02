"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_CHAT_MESSAGES,
  type ChatMessage,
} from "./types";

const GENERIC_ERROR_MESSAGE =
  "Hiện tại trợ lý AI gặp sự cố. Vui lòng thử lại sau ít phút hoặc liên hệ trực tiếp Hạo qua email.";
const LONG_MESSAGE_ERROR = "Tin nhắn quá dài, vui lòng rút gọn.";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function appendToLastAssistant(
  messages: ChatMessage[],
  text: string,
): ChatMessage[] {
  const lastMessage = messages.at(-1);
  if (!lastMessage || lastMessage.role !== "assistant") {
    return messages;
  }

  return [
    ...messages.slice(0, -1),
    {
      ...lastMessage,
      content: `${lastMessage.content}${text}`,
    },
  ];
}

function parseSseEvents(buffer: string): { events: string[]; rest: string } {
  const parts = buffer.split("\n\n");
  return { events: parts.slice(0, -1), rest: parts.at(-1) || "" };
}

function parseSsePayload(event: string): string | null {
  const line = event.split("\n").find((item) => item.startsWith("data: "));
  return line ? line.slice(6) : null;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const abortStream = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (rawMessage?: string) => {
      const content = (rawMessage ?? input).trim();
      if (!content || isStreaming) {
        return;
      }

      if (content.length > MAX_CHAT_MESSAGE_LENGTH) {
        setError(LONG_MESSAGE_ERROR);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setError(null);
      setInput("");
      setIsStreaming(true);

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content,
      };
      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: "",
      };
      const requestMessages = [...messages, userMessage].slice(
        -MAX_CHAT_MESSAGES,
      );
      setMessages([...requestMessages, assistantMessage]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: requestMessages }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const data = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;
          throw new Error(data?.message || GENERIC_ERROR_MESSAGE);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let isDone = false;

        while (!isDone) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const parsed = parseSseEvents(buffer);
          buffer = parsed.rest;

          for (const event of parsed.events) {
            const payload = parseSsePayload(event);
            if (!payload) {
              continue;
            }

            if (payload === "[DONE]") {
              isDone = true;
              break;
            }

            try {
              const data = JSON.parse(payload) as { text?: string };
              if (data.text) {
                setMessages((current) =>
                  appendToLastAssistant(current, data.text || ""),
                );
              }
            } catch {
              throw new Error(GENERIC_ERROR_MESSAGE);
            }
          }
        }
      } catch (caught: unknown) {
        if (controller.signal.aborted) {
          return;
        }

        const message = getErrorMessage(caught);
        setMessages((current) => appendToLastAssistant(current, message));
        setError(message);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setIsStreaming(false);
      }
    },
    [input, isStreaming, messages],
  );

  const clearMessages = useCallback(() => {
    abortStream();
    setMessages([]);
    setError(null);
    setInput("");
  }, [abortStream]);

  useEffect(() => abortStream, [abortStream]);

  return {
    messages,
    input,
    setInput,
    error,
    isStreaming,
    sendMessage,
    abortStream,
    clearMessages,
  };
}
