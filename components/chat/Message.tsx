import type { ReactNode } from "react";
import type { ChatMessage } from "@/lib/chat/types";

interface MessageProps {
  message: ChatMessage;
  isStreaming: boolean;
  isLast: boolean;
}

type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

const INLINE_MARKDOWN_PATTERN =
  /(\*\*([^*]+)\*\*)|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function tokenizeInlineMarkdown(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_MARKDOWN_PATTERN)) {
    if (match.index === undefined) {
      continue;
    }

    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    if (match[2]) {
      tokens.push({ type: "bold", value: match[2] });
    } else if (match[3] && match[4]) {
      tokens.push({ type: "link", label: match[3], href: match[4] });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens;
}

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  return tokenizeInlineMarkdown(text).map((token, index) => {
    const key = `${keyPrefix}-${index}`;

    if (token.type === "bold") {
      return <strong key={key}>{token.value}</strong>;
    }

    if (token.type === "link") {
      return (
        <a
          key={key}
          href={token.href}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-message-link"
        >
          {token.label}
        </a>
      );
    }

    return <span key={key}>{token.value}</span>;
  });
}

function renderMarkdown(text: string): ReactNode[] {
  return text.split("\n").flatMap((line, index, lines) => {
    const nodes = renderInlineMarkdown(line, `line-${index}`);
    return index < lines.length - 1
      ? [...nodes, <br key={`br-${index}`} />]
      : nodes;
  });
}

export function Message({ message, isStreaming, isLast }: MessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`chat-message ${isAssistant ? "chat-message-assistant" : "chat-message-user"}`}
    >
      <div className="chat-message-bubble">
        <div className="chat-message-content">
          {isAssistant ? (
            <span>{renderMarkdown(message.content)}</span>
          ) : (
            <span>{message.content}</span>
          )}
          {isAssistant && isStreaming && isLast && (
            <span className="chat-cursor" aria-hidden="true">
              |
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
