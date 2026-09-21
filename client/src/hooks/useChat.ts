import { useState, useCallback, useRef, useEffect } from "react";
import { EVIDENCE_REFERENCES, EvidenceReference } from "@/lib/scenarioData";
import { createSseParser, createStreamWatchdog } from "@/lib/sseStream";

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
export function extractCitationsFromText(
  text: string
): { index: number; ref: EvidenceReference }[] {
  const matches = text.match(/\[(\d{1,2})\]/g);
  if (!matches) return [];

  const seenIndexes = new Set<number>();
  const results: { index: number; ref: EvidenceReference }[] = [];

  matches.forEach(m => {
    const num = parseInt(m.replace(/[\[\]]/g, ""), 10);
    if (
      num >= 1 &&
      num <= EVIDENCE_REFERENCES.length &&
      !seenIndexes.has(num)
    ) {
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

      // Deadline guard: the reasoning upstream can be silent for tens of
      // seconds, and a stalled hop would otherwise hang the composer forever.
      // The watchdog aborts; `timedOut` distinguishes that from a user stop.
      let timedOut = false;
      const watchdog = createStreamWatchdog(() => {
        timedOut = true;
        controller.abort();
      });

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: newHistory.map(m => ({
              role: m.role,
              content: m.content,
            })),
            language,
          }),
          signal: controller.signal,
        });
        watchdog.touch();

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(
            errData.error ||
              errData.message ||
              `Server responded with ${response.status}`
          );
        }

        if (!response.body) {
          throw new Error("No response stream received from server");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        // Some hops (edge passthrough, gateway keep-alive) can leave the HTTP
        // body open after the answer is complete — the provider's completion
        // signal ([DONE] / finish_reason), not the connection close, is what
        // ends the stream.
        const parser = createSseParser(updatedFullText => {
          const citations = extractCitationsFromText(updatedFullText);
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: updatedFullText,
                    citations,
                  }
                : msg
            )
          );
        });

        while (!parser.terminated) {
          const { done, value } = await reader.read();
          watchdog.touch();
          if (done) break;
          parser.push(decoder.decode(value, { stream: true }));
        }

        // Release the connection — the provider already signalled completion.
        if (parser.terminated) {
          reader.cancel().catch(() => {
            // ignore
          });
        }

        // Flush the decoder tail and the last partial SSE line (a stream can
        // end without a trailing newline).
        parser.push(decoder.decode());
        parser.flush();
        const fullText = parser.text;

        // Final update with all citations
        const finalCitations = extractCitationsFromText(fullText);
        setMessages(prev =>
          prev.map(msg =>
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
        if (timedOut) {
          // Watchdog fired — surface a timeout, keep any partial answer.
          setError(
            language === "vi"
              ? "Dịch vụ AI phản hồi quá lâu. Vui lòng thử lại."
              : "The AI service took too long to respond. Please try again."
          );

          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      msg.content.length > 0
                        ? msg.content
                        : language === "vi"
                          ? "⚠️ Dịch vụ AI phản hồi quá lâu. Vui lòng thử lại."
                          : "⚠️ The AI service took too long to respond. Please try again.",
                  }
                : msg
            )
          );
        } else if (err.name === "AbortError") {
          // User aborted manually
          return;
        } else {
          console.error("Chat streaming error:", err);
          const errMsg =
            err.message ||
            "Failed to communicate with Atlas AI. Please try again.";
          setError(errMsg);

          setMessages(prev =>
            prev.map(msg =>
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
        }
      } finally {
        watchdog.cancel();
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
