import React, { useState } from "react";
import { Message } from "@/hooks/useChat";
import { useLanguage } from "@/contexts/LanguageContext";
import ChatCitationPill from "./ChatCitationPill";
import { Copy, Check, Sparkles, BookOpen, ExternalLink, ArrowDownRight } from "lucide-react";

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

  /**
   * Parses markdown text and converts [01], [02] into interactive ChatCitationPills
   * and [Link Text](#section-id) into smooth jump links.
   */
  const renderFormattedContent = (content: string) => {
    if (!content) {
      return (
        <span className="chat-typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </span>
      );
    }

    // Split content by citation tokens [01]..[12]
    const parts = content.split(/(\[\d{1,2}\])/g);

    return parts.map((part, idx) => {
      const match = part.match(/^\[(\d{1,2})\]$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num >= 1 && num <= 12) {
          return <ChatCitationPill key={idx} index={num} />;
        }
      }

      // Handle simple internal markdown links like [Text](#anchor)
      const linkRegex = /\[([^\]]+)\]\((#[a-zA-Z0-9_-]+)\)/g;
      const subParts: React.ReactNode[] = [];
      let lastIndex = 0;
      let linkMatch;

      while ((linkMatch = linkRegex.exec(part)) !== null) {
        if (linkMatch.index > lastIndex) {
          subParts.push(part.slice(lastIndex, linkMatch.index));
        }

        const label = linkMatch[1];
        const targetId = linkMatch[2];

        subParts.push(
          <a
            key={`link-${idx}-${linkMatch.index}`}
            href={targetId}
            onClick={(e) => {
              e.preventDefault();
              const elem = document.querySelector(targetId);
              if (elem) {
                elem.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="chat-internal-link"
          >
            {label}
            <ArrowDownRight size={11} className="inline-block ml-0.5" />
          </a>
        );

        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < part.length) {
        subParts.push(part.slice(lastIndex));
      }

      return <React.Fragment key={idx}>{subParts.length > 0 ? subParts : part}</React.Fragment>;
    });
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
            {isUser ? (isVi ? "Bạn" : "You") : "Atlas AI · claude-opus-4-9"}
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

        <div className="chat-bubble-content whitespace-pre-wrap leading-relaxed">
          {renderFormattedContent(message.content)}
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
