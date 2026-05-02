"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import type { ChatMessage } from "@/lib/chat/types";
import { MAX_CHAT_MESSAGE_LENGTH } from "@/lib/chat/types";
import { Message } from "./Message";
import { SuggestedQuestions } from "./SuggestedQuestions";

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  error: string | null;
  isStreaming: boolean;
  onInputChange: (value: string) => void;
  onSend: (message?: string) => void;
  onClose: () => void;
  onClear: () => void;
}

export function ChatPanel({
  messages,
  input,
  error,
  isStreaming,
  onInputChange,
  onSend,
  onClose,
  onClear,
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [input]);

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    onSend();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      onSend();
    }
  }

  const isInputTooLong = input.trim().length > MAX_CHAT_MESSAGE_LENGTH;
  const isSendDisabled =
    isStreaming || input.trim().length === 0 || isInputTooLong;

  return (
    <section className="chat-panel" aria-label="Trợ lý AI portfolio">
      <header className="chat-panel-header">
        <div>
          <p className="chat-section-label">TRỢ LÝ AI</p>
          <h2>Trợ lý AI</h2>
          <p>Có thể trả lời sai. Email Hạo để xác nhận thông tin quan trọng.</p>
        </div>
        <div className="chat-header-actions">
          {messages.length > 0 && (
            <button
              type="button"
              className="chat-icon-button"
              onClick={onClear}
              aria-label="Xóa hội thoại"
            >
              ↺
            </button>
          )}
          <button
            type="button"
            className="chat-icon-button"
            onClick={onClose}
            aria-label="Đóng chat"
          >
            ×
          </button>
        </div>
      </header>

      <div
        className="chat-message-list"
        ref={listRef}
        role="log"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <p>
              Hỏi nhanh về Hạo, kỹ năng backend/full-stack hoặc các project
              trong portfolio.
            </p>
            <SuggestedQuestions onSelect={onSend} disabled={isStreaming} />
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={message.id || `${message.role}-${index}`}
              message={message}
              isStreaming={isStreaming}
              isLast={index === messages.length - 1}
            />
          ))
        )}
      </div>

      <form className="chat-input-area" onSubmit={handleSubmit}>
        {(error || isInputTooLong) && (
          <p className="chat-error">
            {isInputTooLong ? "Tin nhắn quá dài, vui lòng rút gọn." : error}
          </p>
        )}
        <div className="chat-input-row">
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            maxLength={MAX_CHAT_MESSAGE_LENGTH + 100}
            aria-label="Nhập câu hỏi cho trợ lý AI"
            placeholder="Hỏi về Hạo và các dự án..."
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="chat-send-button"
            disabled={isSendDisabled}
            aria-label="Gửi tin nhắn"
          >
            ↑
          </button>
        </div>
      </form>
    </section>
  );
}
