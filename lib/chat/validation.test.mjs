import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MAX_CHAT_MESSAGE_LENGTH, MAX_CHAT_MESSAGES } from "./types.ts";
import { parseChatRequest } from "./validation.ts";

describe("parseChatRequest", () => {
  it("accepts a valid request and trims content", () => {
    const result = parseChatRequest({
      messages: [{ role: "user", content: "  Xin chào  " }],
    });
    assert.equal(result.ok, true);
    assert.equal(
      result.ok && result.value.latestUserMessage.content,
      "Xin chào",
    );
  });

  it("rejects missing messages", () => {
    const result = parseChatRequest({});
    assert.deepEqual(result, {
      ok: false,
      error: "invalid_request",
      message: "Payload chat không hợp lệ.",
    });
  });

  it("rejects an empty latest user message", () => {
    const result = parseChatRequest({
      messages: [{ role: "user", content: "   " }],
    });
    assert.equal(result.ok, false);
  });

  it("rejects invalid roles", () => {
    const result = parseChatRequest({
      messages: [{ role: "system", content: "hidden" }],
    });
    assert.equal(result.ok, false);
  });

  it("rejects content over max length", () => {
    const result = parseChatRequest({
      messages: [
        { role: "user", content: "a".repeat(MAX_CHAT_MESSAGE_LENGTH + 1) },
      ],
    });
    assert.equal(result.ok, false);
  });

  it("keeps only the last max messages", () => {
    const messages = Array.from(
      { length: MAX_CHAT_MESSAGES + 3 },
      (_, index) => ({
        role: index % 2 === 0 ? "user" : "assistant",
        content: `message ${index}`,
      }),
    );
    const result = parseChatRequest({ messages });
    assert.equal(result.ok, true);
    assert.equal(result.ok && result.value.messages.length, MAX_CHAT_MESSAGES);
    assert.equal(result.ok && result.value.messages[0].content, "message 3");
  });

  it("requires the latest message to be from the user", () => {
    const result = parseChatRequest({
      messages: [{ role: "assistant", content: "Xin chào" }],
    });
    assert.equal(result.ok, false);
  });
});
