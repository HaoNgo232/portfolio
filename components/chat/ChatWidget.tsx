"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useChat } from "@/lib/chat/use-chat";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useChat();

  function closePanel() {
    chat.abortStream();
    setIsOpen(false);
  }

  return (
    <div className="chat-widget" aria-live="polite">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            className="chat-panel-shell"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ChatPanel
              messages={chat.messages}
              input={chat.input}
              error={chat.error}
              isStreaming={chat.isStreaming}
              onInputChange={chat.setInput}
              onSend={chat.sendMessage}
              onClose={closePanel}
              onClear={chat.clearMessages}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          type="button"
          className="chat-toggle"
          aria-label="Mở trợ lý AI"
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
