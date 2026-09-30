import { describe, it, expect } from "vitest";
import { TRANSLATIONS } from "./translations";

/**
 * Interview section integrity (Section 12 — Expert Interview Q&A).
 * Source: written interview of 26 Sep 2026 (cassava 3 Q&As, sugarcane 7, rice husk 4).
 * Note: the web-audit symmetry checker treats arrays as leaf keys, so per-language
 * question-count assertions here are the real guard against vi/en drift.
 */

const VALID_VERDICTS = ["yes", "no", "figure"];

const GROUP_COUNTS = { cassava: 3, sugarcane: 7, rice: 4 } as const;

// Key figures that must survive translation in both languages.
// Thousand separators are localized: en uses "3,000", vi uses "3.000".
const KEY_FIGURES: { en: string; vi: string }[] = [
  { en: "250–350", vi: "250–350" }, // cassava 2G plant, USD M
  { en: "20–35%", vi: "20–35%" }, // cassava 1G rehabilitation share
  { en: "45–60", vi: "45–60" }, // sugarcane 1G annex, USD M
  { en: "70–90", vi: "70–90" }, // sugarcane 1G standalone, USD M
  { en: "250–320", vi: "250–320" }, // sugarcane 2G plant, USD M
  { en: "250–380", vi: "250–380" }, // rice-husk 2G plant, USD M
  { en: "3,000–5,000", vi: "3.000–5.000" }, // cane expansion USD/ha
  { en: "15–30", vi: "15–30" }, // top provincial fleet tier, USD M
];

function allText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(allText).join(" ");
  if (value && typeof value === "object") return allText(Object.values(value));
  return "";
}

function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) return [prefix];
    return value.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      keyPaths(v, prefix ? `${prefix}.${k}` : k)
    );
  }
  return [prefix];
}

describe("Expert Interview Q&A namespace", () => {
  it("exists with identical structure in both languages", () => {
    expect(TRANSLATIONS.vi.interview).toBeDefined();
    expect(TRANSLATIONS.en.interview).toBeDefined();
    expect(Object.keys(TRANSLATIONS.vi.interview).sort()).toEqual(
      Object.keys(TRANSLATIONS.en.interview).sort()
    );
    expect(Object.keys(TRANSLATIONS.vi.interview.groups).sort()).toEqual(
      Object.keys(TRANSLATIONS.en.interview.groups).sort()
    );
  });

  it("covers all 14 questions per language with matching group counts (3/7/4)", () => {
    (["vi", "en"] as const).forEach((lang) => {
      const groups = TRANSLATIONS[lang].interview.groups as Record<
        string,
        { items: { verdict: string }[] }
      >;
      let total = 0;
      Object.entries(GROUP_COUNTS).forEach(([key, count]) => {
        expect(groups[key]).toBeDefined();
        expect(groups[key].items).toHaveLength(count);
        total += groups[key].items.length;
      });
      expect(total).toBe(14);
    });
  });

  it("uses only valid verdict values in both languages", () => {
    (["vi", "en"] as const).forEach((lang) => {
      const groups = TRANSLATIONS[lang].interview.groups as Record<
        string,
        { items: { verdict: string }[] }
      >;
      Object.values(groups).forEach((group) =>
        group.items.forEach((item) => {
          expect(VALID_VERDICTS).toContain(item.verdict);
        })
      );
    });
  });

  it("carries the benchmark strip with all 7 reference CAPEX entries", () => {
    (["vi", "en"] as const).forEach((lang) => {
      const benchmarks = TRANSLATIONS[lang].interview.benchmarks;
      expect(benchmarks).toHaveLength(7);
      benchmarks.forEach((b) => {
        expect(b.label.length).toBeGreaterThan(0);
        expect(b.range.length).toBeGreaterThan(0);
        expect(b.note.length).toBeGreaterThan(0);
      });
    });
  });

  it("preserves the key CAPEX figures in both languages", () => {
    (["vi", "en"] as const).forEach((lang) => {
      const text = allText(TRANSLATIONS[lang].interview);
      KEY_FIGURES.forEach(({ [lang]: figure }) => {
        expect(text).toContain(figure);
      });
    });
  });

  it("renders no empty strings anywhere in the interview namespace", () => {
    (["vi", "en"] as const).forEach((lang) => {
      expect(allText(TRANSLATIONS[lang].interview)).not.toContain("undefined");
      const collect = (value: unknown): void => {
        if (typeof value === "string") expect(value.length).toBeGreaterThan(0);
        else if (Array.isArray(value)) value.forEach(collect);
        else if (value && typeof value === "object") Object.values(value).forEach(collect);
      };
      collect(TRANSLATIONS[lang].interview);
    });
  });

  it("has identical nested key paths across languages", () => {
    // Closes the web-audit gap: its symmetry checker treats arrays as leaves,
    // so a missing `bullets` on one Q&A item would otherwise pass unnoticed.
    expect(keyPaths(TRANSLATIONS.vi.interview).sort()).toEqual(
      keyPaths(TRANSLATIONS.en.interview).sort()
    );
  });

  it("keeps the interview source tag distinct from study citations", () => {
    // Editorial contract: interview figures cite the written interview, not [01]–[15].
    expect(TRANSLATIONS.vi.interview.sourceTag).toContain("26/9/2026");
    expect(TRANSLATIONS.en.interview.sourceTag).toContain("26 Sep 2026");
  });
});
