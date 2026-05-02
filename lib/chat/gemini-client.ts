import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import type { ChatMessage } from "./types";

const MODEL_FALLBACKS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemma-4-31b-it",
  "gemma-4-26b-a4b-it",
  "gemma-3-27b-it",
] as const;

export interface StreamChatResult {
  stream: AsyncGenerator<string>;
  model: string;
}

function toGeminiContents(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

async function* mapGeminiStream(
  stream: AsyncIterable<GenerateContentResponse>,
): AsyncGenerator<string> {
  for await (const chunk of stream) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}

export async function streamChat(
  messages: ChatMessage[],
  systemPrompt: string,
): Promise<StreamChatResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown = null;

  for (const model of MODEL_FALLBACKS) {
    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents: toGeminiContents(messages),
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        },
      });

      return { stream: mapGeminiStream(stream), model };
    } catch (error: unknown) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Gemini streaming failed");
}
