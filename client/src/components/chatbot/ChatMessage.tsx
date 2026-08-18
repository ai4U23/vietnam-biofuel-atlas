import React, { useState } from "react";
import { Message } from "@/hooks/useChat";
import { useLanguage } from "@/contexts/LanguageContext";
import MarkdownRenderer from "./MarkdownRenderer";
import { Copy, Check, BookOpen } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const { isVi } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`chat-message-row ${isUser ? "is-user" : "is-assistant"}`}>
      {!isUser && (
        <div className="chat-avatar-assistant">
          <img src="/images/ai4u-logo.png" alt="AI4U" className="chat-avatar-img" />
        </div>
      )}

      <div className={`chat-bubble ${isUser ? "user-bubble" : "assistant-bubble"}`}>
        <div className="chat-bubble-header">
          <span className="chat-sender-name">
            {isUser ? (isVi ? "Bạn" : "You") : "Atlas AI"}
          </span>

          {!isUser && message.content && (
            <button
              type="button"
              className="chat-copy-btn"
              onClick={handleCopy}
              title={isVi ? "Sao chép câu trả lời" : "Copy response"}
              aria-label="Copy message"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? (isVi ? "Đã chép" : "Copied") : isVi ? "Sao chép" : "Copy"}</span>
            </button>
          )}
        </div>

        <div className="chat-bubble-content">
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : !message.content ? (
            <span className="chat-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {/* Citations Tray */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="chat-citations-tray">
            <div className="chat-citations-tray-title">
              <BookOpen size={13} className="text-[#e3a72f]" />
              <span>
                {isVi
                  ? `Dẫn nguồn trích dẫn (${message.citations.length})`
                  : `Referenced Evidence (${message.citations.length})`}
              </span>
            </div>
            <div className="chat-citations-list">
              {message.citations.map(({ index, ref }) => (
                <div
                  key={ref.id}
                  className="chat-citation-card"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("jump-to-evidence", { detail: { refId: ref.id } })
                    );
                    const el =
                      document.getElementById(`evidence-card-${ref.id}`) ||
                      document.getElementById("sources");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      const card = document.getElementById(`evidence-card-${ref.id}`);
                      if (card) {
                        card.classList.remove("pulse-highlight");
                        void card.offsetWidth;
                        card.classList.add("pulse-highlight");
                        setTimeout(() => card.classList.remove("pulse-highlight"), 2500);
                      }
                    }
                  }}
                >
                  <span className="chat-citation-badge">[{String(index).padStart(2, "0")}]</span>
                  <div className="chat-citation-details">
                    <strong className="chat-citation-doc-title">
                      {isVi ? ref.titleVi : ref.titleEn}
                    </strong>
                    <span className="chat-citation-doc-meta">
                      {isVi ? ref.authorVi : ref.authorEn} · {ref.year}
                    </span>
                  </div>
                  {ref.pdfUrl && (
                    <a
                      href={ref.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="chat-citation-pdf-btn"
                      onClick={(e) => e.stopPropagation()}
                      title={isVi ? "Tải PDF gốc" : "Download source PDF"}
                    >
                      PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
