import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/hooks/useChat";
import { SUGGESTED_QUESTIONS } from "@/lib/chatKnowledge";
import ChatMessage from "./ChatMessage";
import {
  MessageSquare,
  X,
  Send,
  Square,
  Trash2,
  Maximize2,
  Minimize2,
  Sparkles,
  ChevronDown,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Bot,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

export default function ChatBot() {
  const { language, isVi } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    messages,
    input,
    setInput,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
    clearMessages,
  } = useChat(language);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isStreaming]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isStreaming) {
        sendMessage();
      }
    }
  };

  const handleSelectSuggested = (questionText: string) => {
    sendMessage(questionText);
  };

  return (
    <>
      {/* Floating Action Button (FAB Launcher) */}
      <aside
        aria-label={isVi ? "Trợ lý AI" : "AI Assistant"}
        className={`chat-fab-wrapper ${isOpen ? "is-hidden" : ""}`}
      >
        <button
          type="button"
          className="chat-fab-button"
          onClick={() => setIsOpen(true)}
          aria-label={isVi ? "Mở Trợ lý AI Atlas" : "Open Atlas AI Assistant"}
        >
          <span className="chat-fab-pulse"></span>
          <span className="chat-fab-icon-box">
            <Sparkles size={18} className="chat-fab-spark" />
          </span>
          <span className="chat-fab-label">
            <span className="chat-fab-title">{isVi ? "Hỏi Trợ lý Atlas AI" : "Ask Atlas AI"}</span>
            <span className="chat-fab-subtitle">{isVi ? "Cố vấn thông minh" : "Biofuel Intelligence"}</span>
          </span>
        </button>
      </aside>

      {/* Expandable Chat Drawer / Panel */}
      {isOpen && (
        <aside
          aria-label={isVi ? "Cửa sổ Trợ lý AI" : "AI Assistant Window"}
          className={`chat-window-container ${isExpanded ? "is-expanded" : ""}`}
        >
          {/* Header */}
          <div className="chat-window-header">
            <div className="chat-header-brand">
              <div className="chat-header-avatar">
                <img src="/images/ai4u-logo.png" alt="AI4U Logo" className="chat-header-logo" width={28} height={28} />
              </div>
              <div className="chat-header-info">
                <div className="chat-header-title-row">
                  <h3 className="chat-header-title">
                    {isVi ? "Trợ lý Atlas AI" : "Atlas AI Assistant"}
                  </h3>
                  <span className="chat-model-badge">
                    <span className="chat-model-dot"></span>
                    {isVi ? "Trực tuyến" : "Online"}
                  </span>
                </div>
                <p className="chat-header-subtitle">
                  {isVi
                    ? "Cố vấn chính sách & dữ liệu nông nghiệp sinh khối"
                    : "Evidence-based Biofuel & Biomass Intelligence"}
                </p>
              </div>
            </div>

            <div className="chat-header-actions">
              {messages.length > 0 && (
                <button
                  type="button"
                  className="chat-header-btn"
                  onClick={clearMessages}
                  title={isVi ? "Xóa lịch sử trò chuyện" : "Clear conversation"}
                  aria-label={isVi ? "Xóa lịch sử trò chuyện" : "Clear conversation"}
                >
                  <Trash2 size={15} />
                </button>
              )}

              <button
                type="button"
                className="chat-header-btn hide-on-mobile"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? (isVi ? "Thu nhỏ" : "Restore size") : isVi ? "Mở rộng" : "Expand"}
                aria-label={isExpanded ? (isVi ? "Thu nhỏ cửa sổ" : "Restore size") : (isVi ? "Mở rộng cửa sổ" : "Expand window")}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              <button
                type="button"
                className="chat-header-btn chat-close-btn"
                onClick={() => setIsOpen(false)}
                title={isVi ? "Đóng cửa sổ" : "Close chat"}
                aria-label={isVi ? "Đóng cửa sổ" : "Close chat"}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="chat-messages-container">
            {messages.length === 0 ? (
              <div className="chat-empty-state">
                <div className="chat-empty-icon-box">
                  <Bot size={28} className="chat-empty-icon" />
                </div>
                <h4>
                  {isVi
                    ? "Chào bạn! Tôi có thể hỗ trợ gì về Bản đồ Sinh khối Việt Nam?"
                    : "Welcome! How can I assist your bioenergy & biofuel analysis today?"}
                </h4>
                <p>
                  {isVi
                    ? "Hỏi về số liệu 6 nhóm nguyên liệu, chính sách E10 2026, lò hơi công nghiệp, vận tải logistics, hoặc tài liệu nghiên cứu."
                    : "Ask about 6 feedstock categories, E10 mandate 2026, boiler engineering, logistics hauling, or evidence citations."}
                </p>

                {/* Suggested Starters */}
                <div className="chat-suggested-section">
                  <div className="chat-suggested-label">
                    <Lightbulb size={13} />
                    <span>{isVi ? "Câu hỏi gợi ý:" : "Suggested Questions:"}</span>
                  </div>
                  <div className="chat-suggested-grid">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        className="chat-suggested-pill"
                        onClick={() => handleSelectSuggested(isVi ? q.vi : q.en)}
                      >
                        <span>{isVi ? q.vi : q.en}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="chat-messages-list">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isStreaming && messages[messages.length - 1]?.role === "user" && (
                  <div className="chat-bubble-wrapper is-assistant">
                    <div className="chat-avatar-badge is-assistant">
                      <Bot size={13} />
                    </div>
                    <div className="chat-bubble is-assistant is-typing">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="chat-window-footer">
            {error && (
              <div className="chat-error-banner">
                <AlertCircle size={14} />
                <span>{error}</span>
                <button type="button" onClick={() => clearMessages()} className="chat-error-dismiss" aria-label="Dismiss error">
                  <X size={12} />
                </button>
              </div>
            )}

            <form
              className="chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim() && !isStreaming) {
                  sendMessage();
                }
              }}
            >
              <textarea
                ref={textareaRef}
                name="chat_message_input"
                id="chat-message-input"
                className="chat-textarea"
                rows={1}
                autoComplete="off"
                spellCheck={false}
                aria-label={isVi ? "Nội dung câu hỏi cho trợ lý AI" : "Question input for AI assistant"}
                placeholder={
                  isVi
                    ? "Hỏi về số liệu sinh khối, E10, logistics, lò hơi, tài liệu dẫn nguồn…"
                    : "Ask about biomass potential, E10 mandate, logistics, boilers, citations…"
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
              />

              <div className="chat-input-actions">
                {isStreaming ? (
                  <button
                    type="button"
                    className="chat-send-btn is-stop"
                    onClick={stopStreaming}
                    title={isVi ? "Dừng tạo câu trả lời" : "Stop generation"}
                    aria-label={isVi ? "Dừng tạo câu trả lời" : "Stop generation"}
                  >
                    <Square size={14} />
                    <span>{isVi ? "Dừng" : "Stop"}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`chat-send-btn ${input.trim() ? "is-active" : ""}`}
                    disabled={!input.trim() || isStreaming}
                    title={isVi ? "Gửi câu hỏi (Enter)" : "Send message (Enter)"}
                    aria-label={isVi ? "Gửi câu hỏi" : "Send message"}
                  >
                    <Send size={15} />
                  </button>
                )}
              </div>
            </form>

            <div className="chat-footer-disclaimer">
              <span>
                {isVi
                  ? "Cung cấp bởi AI4U.now · Tự động đối chiếu trích dẫn [01]-[15]"
                  : "Powered by AI4U.now · Auto-cites Evidence Base [01]-[15]"}
              </span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
