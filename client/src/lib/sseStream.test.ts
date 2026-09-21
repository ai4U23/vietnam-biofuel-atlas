import { describe, it, expect } from "vitest";
import { createSseParser } from "./sseStream";

/**
 * Regression tests for the chat SSE stream parser.
 *
 * Before the fix, the client read loop only ended when the HTTP connection
 * closed and ignored the "data: [DONE]" sentinel — through the Vercel edge
 * passthrough the body can stay open after the answer is complete, leaving
 * the composer disabled ("Stop" button stuck) even though the full answer
 * had already rendered.
 */

// Real chunk shapes captured from the upstream gateway (api.ai4u.now,
// OpenAI-compatible): content delta → finish_reason chunk → usage chunk with
// empty choices → [DONE].
const fixtureChunks = [
  'data: {"choices":[{"delta":{"content":"hello","role":"assistant"},"finish_reason":null,"index":0}],"created":1,"id":"x","model":"m","object":"chat.completion.chunk"}\n\n',
  'data: {"choices":[{"delta":{},"finish_reason":"stop","index":0}],"created":1,"id":"x","model":"m","object":"chat.completion.chunk"}\n\n',
  'data: {"choices":[],"created":1,"id":"x","model":"m","object":"chat.completion.chunk","usage":{"total_tokens":31}}\n\n',
  "data: [DONE]\n\n",
];

describe("createSseParser — termination (stuck-composer regression)", () => {
  it("assembles text and terminates on the [DONE] sentinel without a stream close", () => {
    const parser = createSseParser(() => {});
    fixtureChunks.forEach(c => parser.push(c));
    expect(parser.text).toBe("hello");
    expect(parser.terminated).toBe(true);
  });

  it("terminates on a terminal finish_reason even when [DONE] never arrives", () => {
    const parser = createSseParser(() => {});
    parser.push(fixtureChunks[0]);
    expect(parser.terminated).toBe(false);
    parser.push(fixtureChunks[1]);
    expect(parser.text).toBe("hello");
    expect(parser.terminated).toBe(true);
  });

  it("applies the delta of the chunk that carries finish_reason before terminating", () => {
    const parser = createSseParser(() => {});
    parser.push(
      'data: {"choices":[{"delta":{"content":"final words"},"finish_reason":"stop","index":0}]}\n\n'
    );
    expect(parser.text).toBe("final words");
    expect(parser.terminated).toBe(true);
  });

  it("terminates when [DONE] is split across chunk boundaries", () => {
    const parser = createSseParser(() => {});
    parser.push('data: {"choices":[{"delta":{"content":"hi"}}]}\n\nda');
    parser.push("ta: [DO");
    parser.push("NE]\n\n");
    expect(parser.text).toBe("hi");
    expect(parser.terminated).toBe(true);
  });

  it("does not report termination while only content deltas have arrived", () => {
    const parser = createSseParser(() => {});
    parser.push(fixtureChunks[0]);
    expect(parser.terminated).toBe(false);
  });

  it("ignores SSE comment keep-alive lines", () => {
    const parser = createSseParser(() => {});
    parser.push(": keep-alive\n\ndata: [DONE]\n\n");
    expect(parser.text).toBe("");
    expect(parser.terminated).toBe(true);
  });
});

describe("createSseParser — flush and partial lines", () => {
  it("processes the final line when the stream ends without a trailing newline", () => {
    const parser = createSseParser(() => {});
    parser.push('data: {"choices":[{"delta":{"content":"tail"}}]}');
    expect(parser.text).toBe("");
    parser.flush();
    expect(parser.text).toBe("tail");
  });

  it("ignores a truncated JSON line at stream end instead of corrupting text", () => {
    const parser = createSseParser(() => {});
    parser.push(
      'data: {"choices":[{"delta":{"content":"ok"}}]}\n\ndata: {"cho'
    );
    parser.flush();
    expect(parser.text).toBe("ok");
  });

  it("appends a raw (non-JSON) final line on flush", () => {
    const parser = createSseParser(() => {});
    parser.push("data: plain tail without newline");
    parser.flush();
    expect(parser.text).toBe("plain tail without newline");
  });
});

describe("createSseParser — misc protocol robustness", () => {
  it("handles CRLF line endings", () => {
    const parser = createSseParser(() => {});
    parser.push(
      'data: {"choices":[{"delta":{"content":"crlf"}}]}\r\n\r\ndata: [DONE]\r\n\r\n'
    );
    expect(parser.text).toBe("crlf");
    expect(parser.terminated).toBe(true);
  });

  it("ignores chunks pushed after termination", () => {
    const parser = createSseParser(() => {});
    fixtureChunks.forEach(c => parser.push(c));
    const before = parser.text;
    parser.push('data: {"choices":[{"delta":{"content":"LATE"}}]}\n\n');
    expect(parser.text).toBe(before);
  });

  it("notifies onUpdate after every delta with the accumulated text", () => {
    const seen: string[] = [];
    const parser = createSseParser(fullText => seen.push(fullText));
    parser.push(
      'data: {"choices":[{"delta":{"content":"a"}}]}\n\ndata: {"choices":[{"delta":{"content":"b"}}]}\n\n'
    );
    expect(seen).toEqual(["a", "ab"]);
  });
});
