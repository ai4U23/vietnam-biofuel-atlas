---
title: "Refactor: Integrate expert answers directly into domain sections (no Q&A cards)"
date: 2026-09-30
summary: "Integrated all 14 expert interview answers directly into their native Field Atlas sections (Feedstocks, Conversion, Investor Policy, Frontier) instead of an artificial Q&A section; restored 12-section nav; 87/87 tests pass."
---

# Refactor: Integrate expert answers directly into domain sections

## What happened
User directed: "actually do not show the questions on the site, just integrate the answers to sections".
Replaced the standalone Section 12 Q&A section with direct integration of the expert findings, CAPEX benchmarks, and policy insights into their natural domain sections.

## Decision & Section Architecture
- **Section 02 (Feedstock Field)**: Added commercial assessment callouts directly on the feedstock cards:
  - *Cassava roots*: 1G rehabilitation viability under E10 mandate (>1B L/yr) vs high China export volatility (>90%) and unhedged smallholder risk; 2G residue unproven with high enzyme costs.
  - *Sugarcane bagasse*: Why whole cane is not diverted to fuel ethanol (500–700kt domestic sugar deficit, -$25–35/t cane margin drop, high molasses absorption by MSG/yeast buyers at $140–180/t); mills prioritize high-pressure bagasse CHP power (≥65 bar) under DPPA (~2,091 VND/kWh) and refined sugar modernization.
  - *Rice husk*: Why 2G ethanol is unsuited due to 15–22% abrasive silica ash and enzyme loss; husk is already an established commercial fuel (500–1,000 VND/kg); ash is better valorized as biogenic silica ($300–1,000/t) or biomass power.
- **Section 07 (Conversion Tech Matrix)**: Added a dedicated "Fuel Ethanol & 2G Cellulosic Plant CAPEX Benchmarks" panel with 6 industrial reference benchmarks (~100M L/yr and 50M L/yr variants):
  - Cassava 1G Rehab: $15M–$35M (20–35% of new build; 40–50% IC/UASB wastewater & QCVN 40:2025/BTNMT, 20–30% distillation & zeolite sieve revamp).
  - Cassava 2G Cellulosic: $250M–$350M ($2.50–$3.50/L; Hastelloy/Inconel 180–220°C, 72–96h residence). (Context: reference 1G new build ~$80–$100M).
  - Sugarcane 1G Mill Annex: $45M–$60M (~100M L/yr; $25M–$40M for 30–50M L/yr; shared mill utilities).
  - Sugarcane 1G Standalone: $70M–$90M.
  - Sugarcane 2G Bagasse: $250M–$320M ($2.50–$3.20/L; unit cost $1.20–$1.50/L).
  - Rice Husk 2G: $250M–$380M ($2.50–$3.80/L; chemical de-ashing, carbide coatings, bulky storage).
  - Techno-economic reality note on why 1G rehab & biomass CHP outperform 2G pathways in Vietnam today.
- **Section 09 (Investor Policy Guide)**: Added an "Agribusiness Co-Financing & Land Linkage Realities" panel:
  - Sugarcane acreage expansion: 1,000–3,000 ha clusters at $3,000–$5,000/ha ($4.5M–$7.5M w/ harvesters), structured via sugar mills/cooperatives under Decree 98/2018 linkages.
  - Land Law 2024 constraints (Art. 12 & 177: 15× consolidation cap) and profit competition with durian/fruit (cane 30–50M vs durian 250–500M VND/ha/yr).
  - Lender posture: commercial banks require corporate parent support; strongest strategic fit for foreign capital is high-pressure CHP (≥65 bar) under DPPA (Decree 243/2026/NĐ-CP) and wastewater biogas recovery.
- **Section 11 (Frontier Initiatives)**: Added the "3-Tier Mechanization & Agri-DX Investment Matrix" under the 1-Million Hectare Low-Emission Rice Scheme:
  - Tier 1 (Model Cooperative, 500–1,000 ha): $300,000 – $600,000 (laser levelers, harvesters, balers, spray drones, AWD IoT sensors).
  - Tier 2 (District Agri-Service Hub, 5,000–10,000 ha): $3.0M – $6.0M (centralized rental pool, drying/silos, telemetry center, drone depot).
  - Tier 3 (Provincial Fleet Leasing Facility, 20,000–50,000 ha): $15M – $30M (commercial equipment-leasing fleet across multiple cooperatives).
  - Direct policy linkage to Decision 1490/QD-TTg and JCM / Article 6 carbon credits.
- **Cleaned Navigation & Removed Standalone Q&A**:
  - Removed `ExpertInterviewQA.tsx` and the `#interview` section.
  - Navigation restored to clean 12 sections with Section 12 = Sources.
  - Chatbot system prompt updated to point users to `#feedstocks`, `#conversion`, `#policy`, and `#frontier`.

## Impact
- 87/87 vitest tests passing (7 files).
- Clean `tsc --noEmit` and production build (`vite build` in 1.76s).
- Verified in-browser (IAB): clean 12-item rail, all sub-modules render with Field Atlas styling, bilingual EN/VI toggle verified.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
