/**
 * SSE event-stream parser for OpenAI-compatible chat completions.
 *
 * TERMINATION RULE: the stream ends when the provider signals completion —
 * the "data: [DONE]" sentinel or a chunk carrying a terminal finish_reason —
 * NOT when the HTTP connection closes. Some hops (edge passthrough, gateway
 * keep-alive) can leave the body open long after the answer is complete.
 */

export interface SseParser {
  /** Feed one decoded text chunk (raw SSE bytes as UTF-8 text). */
  push(text: string): void;
  /**
   * Process the trailing partial line left after the final chunk. A stream
   * can end without a trailing newline; without this the last event line
   * would be dropped.
   */
  flush(): void;
  /** Accumulated answer text so far. */
  readonly text: string;
  /** True once the provider signalled the end of the completion. */
  readonly terminated: boolean;
}

export function createSseParser(
  onUpdate: (fullText: string) => void
): SseParser {
  let fullText = "";
  let terminated = false;
  let buffer = "";

  // Returns true when this line ends the completion.
  const handleLine = (line: string): boolean => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(":")) return false;
    if (!trimmed.startsWith("data: ")) return false;

    const dataStr = trimmed.slice(6).trim();
    if (dataStr === "[DONE]") return true;

    try {
      const parsed = JSON.parse(dataStr);
      const choice = parsed.choices?.[0];
      const delta = choice?.delta?.content || "";
      if (delta) {
        fullText += delta;
        onUpdate(fullText);
      }
      return Boolean(choice?.finish_reason);
    } catch {
      // If not JSON SSE format, append raw text
      if (dataStr && !dataStr.startsWith("{")) {
        fullText += dataStr;
        onUpdate(fullText);
      }
      return false;
    }
  };

  return {
    push(text: string) {
      if (terminated) return;
      buffer += text;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (handleLine(line)) {
          terminated = true;
          break;
        }
      }
    },
    flush() {
      // Flush a UTF-8 decoder tail beforehand with decoder.decode() if the
      // caller streams bytes; here we only drain the buffered partial line.
      if (!terminated && buffer.trim()) {
        handleLine(buffer);
      }
      buffer = "";
    },
    get text() {
      return fullText;
    },
    get terminated() {
      return terminated;
    },
  };
}
