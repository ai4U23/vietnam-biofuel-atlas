import { useState, useCallback, useRef, useEffect } from "react";
import { EVIDENCE_REFERENCES, EvidenceReference } from "@/lib/scenarioData";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  citations?: { index: number; ref: EvidenceReference }[];
}

const STORAGE_KEY = "vietnam_biofuel_atlas_chat_history";

/**
 * Extracts [01], [02], [11] citation numbers from text
 * and maps them to EVIDENCE_REFERENCES.
 */
export function extractCitationsFromText(text: string): { index: number; ref: EvidenceReference }[] {
  const matches = text.match(/\[(\d{1,2})\]/g);
  if (!matches) return [];

  const seenIndexes = new Set<number>();
  const results: { index: number; ref: EvidenceReference }[] = [];

  matches.forEach((m) => {
    const num = parseInt(m.replace(/[\[\]]/g, ""), 10);
    if (num >= 1 && num <= EVIDENCE_REFERENCES.length && !seenIndexes.has(num)) {
      seenIndexes.add(num);
      results.push({
        index: num,
        ref: EVIDENCE_REFERENCES[num - 1],
      });
    }
  });

  return results.sort((a, b) => a.index - b.index);
}

export function useChat(language: "en" | "vi" = "en") {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setIsStreaming(false);
    setError(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (userText?: string) => {
      const textToSend = (userText ?? input).trim();
      if (!textToSend || isStreaming) return;

      setInput("");
      setError(null);

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: textToSend,
        timestamp: Date.now(),
      };

      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        citations: [],
      };

      const newHistory = [...messages, userMessage];
      setMessages([...newHistory, assistantMessage]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: newHistory.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            language,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || errData.message || `Server responded with ${response.status}`);
        }

        if (!response.body) {
          throw new Error("No response stream received from server");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let fullText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(":")) continue;

            if (trimmed.startsWith("data: ")) {
              const dataStr = trimmed.slice(6).trim();
              if (dataStr === "[DONE]") {
                continue;
              }

              try {
                const parsed = JSON.parse(dataStr);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                if (delta) {
                  fullText += delta;
                  const citations = extractCitationsFromText(fullText);

                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? {
                            ...msg,
                            content: fullText,
                            citations,
                          }
                        : msg
                    )
                  );
                }
              } catch {
                // If not JSON SSE format, append raw text
                if (dataStr && !dataStr.startsWith("{")) {
                  fullText += dataStr;
                }
              }
            }
          }
        }

        // Final update with all citations
        const finalCitations = extractCitationsFromText(fullText);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: fullText,
                  citations: finalCitations,
                }
              : msg
          )
        );
      } catch (err: any) {
        if (err.name === "AbortError") {
          // User aborted manually
          return;
        }
        console.error("Chat streaming error:", err);
        const errMsg = err.message || "Failed to communicate with Atlas AI. Please try again.";
        setError(errMsg);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content:
                    msg.content.length > 0
                      ? msg.content
                      : language === "vi"
                      ? "⚠️ Không thể kết nối với dịch vụ Atlas AI. Vui lòng kiểm tra kết nối mạng và thử lại."
                      : "⚠️ Unable to connect to Atlas AI service. Please check network connection and try again.",
                }
              : msg
          )
        );
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [input, isStreaming, messages, language]
  );

  return {
    messages,
    input,
    setInput,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
    clearMessages,
  };
}
