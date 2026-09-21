---
title: "Fix 'chatbot still hangs': deploy-safe service worker and stream stall deadlines"
date: 2026-09-21
summary: "User still saw hangs after the renderer/SSE fixes; root cause was the SW serving stale app-shell after deploys plus zero stream deadlines. SW now network-first for navigations (cache v2), chat stream has a 45s/20s watchdog, deployed and verified on prod."
---

# Fix 'chatbot still hangs': deploy-safe service worker and stream stall deadlines

## What happened
After deploying the renderer-freeze + SSE-sentinel fixes, the user reported "chatbot still hangs". Re-diagnosis found the deployed fix never EXECUTED for them:

1. SW staleness: client/public/sw.js served cached-first (stale-while-revalidate) for ALL same-origin GETs including index.html, under a static CACHE_NAME ("biofuel-atlas-v1"). Every returning visitor got the pre-deploy app shell -> old buggy JS on their first load(s) after any deploy. Fresh browsers were fine (verified on prod), which isolated the cause.
2. Residual hang vector: useChat had zero deadlines. The gateway is a reasoning model (3.2k-token system prompt; observed long silent thinking), and a genuinely stalled hop would pend await fetch / reader.read() forever — composer locked, no error, no escape except Stop.

## Decision
- sw.js: navigations/shell now NETWORK-FIRST (cache only as offline fallback); stale-while-revalidate limited to /assets/ (Vite-hashed) + /images/ + manifest + favicons; /api/* never intercepted; CACHE_NAME -> biofuel-atlas-v2 so activate purges existing clients' v1 caches.
- sseStream.ts: createStreamWatchdog (45s to first byte — covers model thinking + the dead-primary-key ~5s retry; 20s idle re-armed per chunk). On fire it aborts and useChat surfaces a localized EN/VI timeout error, keeping any partial answer. timedOut is checked BEFORE the generic AbortError branch (kongming catch: otherwise the timeout surfaces as a silent user-stop); watchdog.cancel() in finally.
- main.tsx: controllerchange prompt ("Refresh") via sonner toast with first-install guard and once-only flag — no silent reload (would destroy in-flight streams/calculator input).
- kongming --advice checkpoint ran this time: GO with the above amendments (45-60s first byte, timedOut ordering, controllerchange toast not reload).

## Impact
- 76/76 vitest (4 new fake-timer watchdog tests), tsc clean, prod build clean.
- Deployed (commit 1ca6d88) and verified ON PRODUCTION with a returning-visitor simulation: reload under old SW -> new sw.js installs -> v1 cache purged (caches: ["biofuel-atlas-v2"] only) -> next navigation served the current bundle network-first -> chat E2E completes with composer re-enabled, no errors.

## Next steps
- Expectation: returning devices may still show ONE stale load in the next day or two (that load is served by their already-installed v1 SW; from the following load everything is healed). Any "hangs" reports in that window should be checked against the bundle hash (currently index-BX7FhPMi.js).
- Still open (P0): rotate the hardcoded API keys in api/chat.ts / server/chatHandler.ts / server/devMiddleware.ts (dead primary key also burns ~5s of the 45s first-byte budget on self-host/dev paths; prod uses env AI4U_API_KEY).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
