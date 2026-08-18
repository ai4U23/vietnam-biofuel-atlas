import { describe, it, expect } from "vitest";
import { BIOFUEL_ATLAS_SYSTEM_PROMPT, SUGGESTED_QUESTIONS } from "./chatKnowledge";
import { extractCitationsFromText } from "../hooks/useChat";
import { EVIDENCE_REFERENCES } from "./scenarioData";

describe("Atlas AI Chatbot System Knowledge & Citation Tests", () => {
  it("system prompt contains all mandatory policy and technical baselines", () => {
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("Circular 50/2025/TT-BCT");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("1 June 2026");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("40,501–84,936 GWh_th/year");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("Mekong River Delta");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("Sugar Mill Belts");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("Stoker Grate");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("Circulating Fluidized Bed");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("Soil-Protection Boundary");
    expect(BIOFUEL_ATLAS_SYSTEM_PROMPT).toContain("1-Million Hectare");
  });

  it("suggested questions cover both English and Vietnamese", () => {
    expect(SUGGESTED_QUESTIONS.length).toBeGreaterThanOrEqual(4);
    SUGGESTED_QUESTIONS.forEach((q) => {
      expect(q.en.length).toBeGreaterThan(10);
      expect(q.vi.length).toBeGreaterThan(10);
      expect(["policy", "feedstock", "technology", "logistics"]).toContain(q.category);
    });
  });

  it("extractCitationsFromText accurately parses and deduplicates citations", () => {
    const sampleText =
      "According to the World Bank Atlas [01] and recent research in Elsevier [05], the sustainable potential is large. Also see [01] and [11].";

    const extracted = extractCitationsFromText(sampleText);
    expect(extracted.length).toBe(3);

    expect(extracted[0].index).toBe(1);
    expect(extracted[0].ref.id).toBe("wb_biomass_atlas_2018");

    expect(extracted[1].index).toBe(5);
    expect(extracted[1].ref.id).toBe("elsevier_biomass_potentials_2024");

    expect(extracted[2].index).toBe(11);
    expect(extracted[2].ref.id).toBe("irri_rice_circularity");
  });

  it("extractCitationsFromText ignores out-of-range citations", () => {
    const invalidText = "Random text with [99] and [00] and [abc].";
    const extracted = extractCitationsFromText(invalidText);
    expect(extracted.length).toBe(0);
  });

  it("all extracted citation indexes match EVIDENCE_REFERENCES exactly", () => {
    EVIDENCE_REFERENCES.forEach((ref, idx) => {
      const text = `Referencing item [${String(idx + 1).padStart(2, "0")}] in the text.`;
      const result = extractCitationsFromText(text);
      expect(result.length).toBe(1);
      expect(result[0].index).toBe(idx + 1);
      expect(result[0].ref.id).toBe(ref.id);
    });
  });

  it("handles markdown elements cleanly", () => {
    const markdownSample = `### E10 Mandate Analysis [09]

| Metric | Value | Reference |
|---|---|---|
| Annual Demand | 243M gallons | [09] |
| Domestic Capacity | 84M gallons | [09] |

* Enacted under **Circular 50/2025/TT-BCT** [09].
* Explore in the [Scenario Sandbox](#scenario-sandbox).

> Soil protection requires retaining >= 50% straw [01].`;

    const citations = extractCitationsFromText(markdownSample);
    expect(citations.length).toBe(2);
    expect(citations[0].index).toBe(1);
    expect(citations[1].index).toBe(9);
  });
});
