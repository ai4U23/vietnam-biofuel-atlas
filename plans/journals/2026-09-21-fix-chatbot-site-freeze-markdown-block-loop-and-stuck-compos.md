---
title: Fix chatbot site freeze (markdown block loop) and stuck composer (SSE close-dependence)
date: 2026-09-21
summary: "Chatbot froze the whole page on streamed tables and left the composer disabled after answers; both root-caused, fixed, tested (72/72), reviewed GO."
---

# Fix chatbot site freeze (markdown block loop) and stuck composer (SSE close-dependence)

## What happened
User report: "chatbot hangs after answering, crash the site" in biofuel-resource (Vietnam Biofuel Atlas).

Two independent root causes, both verified:

1. Site freeze (the crash). `MarkdownRenderer.tsx` block loop `while (i < lines.length)` could fail to advance `i`: the paragraph branch excluded lines starting with `|`/`#`/``` from consumption, but those prefixes' own branches require stricter syntax (table line must start AND end with `|`; heading requires `^#{1,4}\s+`). Any streaming partial table row (`| PDP8 Target | 1,227 `), malformed separator (`|---|---`, LLMs emit this in complete answers), or `#hashtag` therefore stalled the loop forever — synchronous 100% CPU, whole React app frozen, ErrorBoundary can't catch a non-exception. Reproduced live (real browser tab froze; even `1+1` evaluate timed out) and with an offline control-flow replica.

2. Stuck composer (the hang). `useChat.ts` streaming loop only terminated on HTTP connection close and ignored the SSE `[DONE]` sentinel / `finish_reason`. Production is a Vercel **edge passthrough** (`api/chat.ts` does `new Response(providerResponse.body)`) which can hold the body open after completion; dev pipes node-to-node and closes cleanly (~7s, verified by curl), which masked the bug. Observed once live: answer fully rendered, network closed (RT 8.3s), page idle at 181fps, yet textarea disabled + Stop visible for minutes.

## Decision
- Extract `splitMarkdownBlocks` into pure `client/src/components/chatbot/markdownBlocks.ts` with guaranteed per-iteration line consumption: pipe runs render as a table only when fully closed (≥2 lines, all trailing pipes), else degrade to paragraph text; paragraph branch force-consumes an unrecognized line. `MarkdownRenderer.tsx` now maps blocks→JSX (renderBlock); classNames and table parsing unchanged.
- Extract the SSE state machine into pure `client/src/lib/sseStream.ts`: terminate on `[DONE]` or terminal `finish_reason`, `reader.cancel()` to release the connection, flush decoder tail + last partial line (old code silently dropped it). `useChat.ts` delegates to it.
- 22 new tests (10 splitter incl. streaming-prefix sequence, 12 SSE parser with the real captured upstream chunk shapes). Temporary console instrumentation added during diagnosis was fully removed.

## Impact
- Live E2E in a real browser: table answers (2.3k chars) render without freezing; composer re-enables after completion; no JS errors/unhandled rejections.
- 72/72 vitest pass, `tsc --noEmit` clean, production build clean. Code-reviewer verdict: GO (fuzzed 100k adversarial inputs against the splitter — zero non-terminating; no regressions in abort/error/persistence paths).

## Next steps
- P0: rotate the hardcoded API keys in `api/chat.ts` / `server/chatHandler.ts` / `server/devMiddleware.ts` — the primary key is DEAD (401, adds ~5s to every answer before backup-key retry) and the backup key AUTHENTICATES (live secret in git history). Move to env-only.
- P2: strip `details: errText` (raw provider error body) from the edge response.
- P3 (noted, out of scope): MarkdownRenderer re-renders the full conversation per token (no memoization) — fine at current scale.
- kongming --advice checkpoints were unavailable this session (provider usage limit); code-reviewer gate ran in its place.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
