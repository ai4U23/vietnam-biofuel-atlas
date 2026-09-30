# Plan: Integrate Written Interview Q&A into Vietnam Biofuel Atlas

Date: 2026-09-30 · Mode: ak-cook `--auto --advice` · Source: `20260926__Written_Interview_EN_Answers.docx`

## Brainstorm contract

- **Outcome:** The 2026-09-26 written interview (expert answers on Japanese market-entry business models + CAPEX benchmarks for cassava / sugarcane / rice husk) is integrated into the site as a new bilingual section, discoverable via nav, plus chatbot knowledge.
- **Constraints:** EN/VI translation symmetry must pass existing tests; Field Atlas design tokens; content faithful to the docx (no invented data); 50-test web audit stays green.
- **Non-goals:** No changes to scenario calculators, chat API/backend, deploy config, or EVIDENCE_REFERENCES. No verbatim document dump — decision-useful digest preserving all key figures.
- **Acceptance criteria:**
  1. New nav entry "12 · Expert Q&A" (desktop + mobile); Sources section renumbered to 13.
  2. All 14 Q&As across 3 feedstock groups (cassava 3, sugarcane 7, rice husk 4) with verdict badges (Yes / No / figure) and key figures preserved.
  3. CAPEX benchmark strip: cassava 1G $80–100M, cassava 2G $250–350M, 1G rehab $15–35M (20–35%), sugarcane 1G $45–90M, sugarcane 2G $250–320M, rice-husk 2G $250–380M.
  4. Bilingual keys symmetric; no empty strings; EN free of Vietnamese sentences.
  5. New tests for the interview namespace; full vitest suite + `tsc` + `vite build` green.
  6. Chatbot system prompt gains a compact interview-benchmarks subsection.
  7. Mandatory code-reviewer + tester subagents pass; kongming checkpoints (plan gate, post-implementation) cleared.

## Scout summary

- React 19 SPA, single page: `client/src/pages/Home.tsx` composes 12 numbered sections; left-rail + mobile nav = plain `ScrollLink` anchors (no observer state).
- Copy lives in `client/src/lib/translations.ts` (vi/en mirrored namespaces; `translations.test.ts` + `webTestingAudit.test.ts` enforce symmetry, non-empty, no VN-in-EN).
- Section component pattern: `client/src/components/LowEmissionRiceSAF.tsx` — `useLanguage()` + `TRANSLATIONS[language].<ns>`, kicker/h3 header, parchment cards, `CitationRef` badges (silent no-op on unknown ids; reuse `moit_circular_50_e10`, `wb_biomass_atlas_2018` only).
- Styles: `client/src/index.css` (`.folio-section`, `.frontier-*` patterns around line 763; mobile breakpoint ~842).
- Chatbot knowledge: `client/src/lib/chatKnowledge.ts` — one big system-prompt string, additive append is safe.
- No existing plan/docs cover this area; `plans/` holds only journals.

## Phases

### Phase 1 — Translations & data (translations.ts)
- Add `interview` namespace (vi + en): meta (kicker/title/subtitle/premise note), `nav.interview`, 3 groups × {label, intro}, 14 Q&As {q, verdict: yes|no|figure, a, bullets[]}, 6 CAPEX benchmark entries {label, range, note}, takeaway.
- Content digest of the docx, all figures preserved verbatim.

### Phase 2 — Component + styles
- New `client/src/components/ExpertInterviewQA.tsx`: header, benchmark strip, 3 feedstock group blocks with Q&A cards (verdict badge: yes=gold, no=terracotta, figure=indigo), premise/method note.
- CSS additions in `index.css` reusing Field Atlas tokens (parchment cards, gold accents, mobile breakpoint).

### Phase 3 — Integration
- `Home.tsx`: import + nav entries (desktop line ~285, mobile ~328), `<section id="interview">` between frontier and sources, sources `section-index` 12→13.
- `chatKnowledge.ts`: append "WRITTEN INTERVIEW BENCHMARKS (SEP 2026)" subsection.

### Phase 4 — Tests, review, finalize
- New `client/src/lib/interview.test.ts`: namespace presence in vi+en, per-group question counts (3/7/4), verdict values valid, key CAPEX ranges present in both languages, no empty strings.
- Run `pnpm vitest run` + `pnpm build`.
- Spawn tester + code-reviewer (mandatory); kongming post-implementation checkpoint.
- Finalize: plan sync-back, journal entry, commit (conventional, main).

## Status

- [x] Scout
- [x] Plan (kongming plan-gate: GO, corrections folded in)
- [x] Phase 1 Translations
- [x] Phase 2 Component
- [x] Phase 3 Integration
- [x] Phase 4 Tests/Review/Finalize — 84/84 tests, tsc + build clean, tester PASS, code-reviewer PASS (0 blockers/majors; minors #1 #2 #3 #5 #6 applied), in-browser EN/VI + mobile visual check PASS, kongming final: GO
