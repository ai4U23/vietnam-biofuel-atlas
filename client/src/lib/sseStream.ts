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

export interface StreamWatchdog {
  /**
   * Re-arm the inactivity timer. Call once when the response HEADERS arrive
   * and again after every received chunk.
   */
  touch(): void;
  /** Stop the watchdog. Call when the stream completes, errors, or is aborted. */
  cancel(): void;
}

/**
 * Deadline guard for the chat stream. The upstream is a reasoning model that
 * can legitimately stay silent for tens of seconds before the first token,
 * and some hops accept the connection and then stall — without a deadline the
 * composer hangs forever with no error and no escape.
 *
 * Timings: `firstByteMs` must cover model thinking time plus any provider
 * key-fallback retry (observed ~5s); `idleMs` only has to cover the normal
 * gap between streamed chunks (sub-second).
 */
export function createStreamWatchdog(
  onTimeout: () => void,
  firstByteMs = 45000,
  idleMs = 20000
): StreamWatchdog {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let done = false;

  const arm = (ms: number) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      if (!done) {
        done = true;
        onTimeout();
      }
    }, ms);
  };

  arm(firstByteMs);

  return {
    touch() {
      if (!done) {
        arm(idleMs);
      }
    },
    cancel() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      done = true;
    },
  };
}
