---
title: "Integrate written interview (26 Sep 2026) as bilingual Expert Interview Q&A section"
date: 2026-09-30
summary: "Turned the confidential written-interview docx into a public digest: new Section 12 (#interview) with 14 Q&A verdict cards, 7-entry CAPEX benchmark strip, chatbot [INT] benchmarks + attribution rule; docx gitignored; 84/84 tests, deployed."
---

# Integrate written interview as Expert Interview Q&A section

## What happened
User asked (ak-cook --auto --advice) to integrate `20260926__Written_Interview_EN_Answers.docx` — expert answers to a Japanese delegation on cassava/sugarcane/rice-husk market-entry models — into the site.

## Decision
- **Digest, not dump:** Section 12 (`#interview`, nav 12, sources renumbered 13) between #frontier and #sources. Premise note teaches "technical feasibility ≠ investment attractiveness" (2G pathways are TRL-high in the conversion matrix yet all No on near-term Vietnam economics).
- **Editorial firewall (kongming):** interview figures are single-source elicitation — NO CitationRef/[01]–[15] badges on them; every Q&A card carries "Written interview · 26 Sep 2026" sourceTag; chatKnowledge gains a mandatory [INT] attribution rule + #interview module entry.
- **Figure fidelity:** sugarcane 1G kept as two strip entries (annex $45–60M / standalone $70–90M, never merged to "$45–90M"); cassava $80–100M labeled previous-interview reference; rice-husk 50M L variant $175–275M.
- **Evidence-cutoff contradiction fixed:** rail now reads "T8/2026 · PV chuyên gia 26/9/2026" / "Aug 2026 · Expert interview 26 Sep 2026"; footer.copy mentions both dates.
- **Confidentiality:** source docx never ships — `.gitignore` gained `*.docx` + `.video_agent/`; commit uses explicit paths only.
- **Rail overflow:** 13th link would clip the rail footer (`.atlas-rail` had no overflow) → `overflow-y: auto`.

## Impact
- 84/84 vitest (8 new interview tests incl. recursive vi/en key-path symmetry — the audit's symmetry checker treats arrays as leaves), tsc + vite build clean.
- Verified in-browser (IAB): EN/VI full-section toggle, verdict badges (yes=gold / no=terracotta / figure=slate), 13-link rail no clipping at 720px, 390px mobile single-column benchmarks.
- Tester + code-reviewer subagents PASS (0 blockers/majors; minors #1 #2 #3 #5 #6 applied: type-derived VerdictKey, index keys, nested-symmetry test, ≤560px 1-col grid, aria-label nit).

## Next steps
- Post-deploy probe: ask the live chatbot a CAPEX question and confirm it cites [INT], not [01]–[15] (chatbot has citation-drift history).
- Raw docx stays local-only (`*.docx` ignored). If publication of the raw document is ever wanted, that needs explicit user clearance.
- Note: run `vite build` from repo root (config lives at root; running from `client/` fails spuriously).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
