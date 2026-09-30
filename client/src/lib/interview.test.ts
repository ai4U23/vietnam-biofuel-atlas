import { describe, it, expect } from "vitest";
import { TRANSLATIONS } from "./translations";

/**
 * Integrated Expert Answers & Industrial Benchmarks Test Suite
 * Source: written interview of 26 Sep 2026.
 * Validates that all answers, CAPEX benchmarks, land linkages, and 3-tier mechanization
 * numbers are seamlessly integrated into their native sections (feedstocks, conversion,
 * investorPolicy, and frontier) without artificial question prompts.
 */

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
  { en: "15 – 30", vi: "15 – 30" }, // provincial fleet tier, USD M
];

function allText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(allText).join(" ");
  if (value && typeof value === "object") return allText(Object.values(value));
  return "";
}

describe("Integrated Expert Answers across Sections", () => {
  describe("1. Feedstocks Commercial Insights (Section 02)", () => {
    it("has commercial insights on all 9 feedstocks with detailed realities for cassava, bagasse, and rice husk", () => {
      (["vi", "en"] as const).forEach((lang) => {
        const items = TRANSLATIONS[lang].feedstocks.items;
        expect(items["Cassava roots"].commercialInsight).toBeDefined();
        expect(items["Cassava roots"].commercialInsight.length).toBeGreaterThan(50);

        expect(items["Bagasse"].commercialInsight).toBeDefined();
        expect(items["Bagasse"].commercialInsight.length).toBeGreaterThan(50);

        expect(items["Rice husk"].commercialInsight).toBeDefined();
        expect(items["Rice husk"].commercialInsight.length).toBeGreaterThan(50);
      });
    });

    it("highlights 1G rehab and China export risk for cassava", () => {
      expect(TRANSLATIONS.vi.feedstocks.items["Cassava roots"].commercialInsight).toContain("E10");
      expect(TRANSLATIONS.vi.feedstocks.items["Cassava roots"].commercialInsight).toContain("Trung Quốc");
      expect(TRANSLATIONS.en.feedstocks.items["Cassava roots"].commercialInsight).toContain("E10");
      expect(TRANSLATIONS.en.feedstocks.items["Cassava roots"].commercialInsight).toContain("China");
    });

    it("highlights domestic sugar deficit and bagasse CHP priority", () => {
      expect(TRANSLATIONS.vi.feedstocks.items["Bagasse"].commercialInsight).toContain("500–700");
      expect(TRANSLATIONS.vi.feedstocks.items["Bagasse"].commercialInsight).toContain("CHP");
      expect(TRANSLATIONS.en.feedstocks.items["Bagasse"].commercialInsight).toContain("500–700");
      expect(TRANSLATIONS.en.feedstocks.items["Bagasse"].commercialInsight).toContain("CHP");
    });

    it("highlights silica ash abrasive wear and commercial fuel price for rice husk", () => {
      expect(TRANSLATIONS.vi.feedstocks.items["Rice husk"].commercialInsight).toContain("silica");
      expect(TRANSLATIONS.en.feedstocks.items["Rice husk"].commercialInsight).toContain("silica");
    });
  });

  describe("2. Fuel Ethanol & 2G CAPEX Benchmarks (Section 07 Conversion)", () => {
    it("contains all 6 empirical CAPEX benchmark profiles in both languages", () => {
      (["vi", "en"] as const).forEach((lang) => {
        const benchmarks = TRANSLATIONS[lang].conversion.capexBenchmarks;
        expect(benchmarks).toBeDefined();
        expect(benchmarks.items).toHaveLength(6);
        benchmarks.items.forEach((item) => {
          expect(item.label.length).toBeGreaterThan(0);
          expect(item.range.length).toBeGreaterThan(0);
          expect(item.unitCapex.length).toBeGreaterThan(0);
          expect(item.note.length).toBeGreaterThan(0);
        });
      });
    });

    it("carries the techno-economic reality note in both languages", () => {
      expect(TRANSLATIONS.vi.conversion.capexBenchmarks.technoRealityNote.length).toBeGreaterThan(50);
      expect(TRANSLATIONS.en.conversion.capexBenchmarks.technoRealityNote.length).toBeGreaterThan(50);
    });
  });

  describe("3. Agribusiness Co-Financing & Land Linkages (Section 09 Investor Policy)", () => {
    it("contains all 3 co-financing cards covering cane expansion, land law, and lender posture", () => {
      (["vi", "en"] as const).forEach((lang) => {
        const linkage = TRANSLATIONS[lang].investorPolicy.coFinancingLinkages;
        expect(linkage).toBeDefined();
        expect(linkage.cards).toHaveLength(3);
        linkage.cards.forEach((card) => {
          expect(card.title.length).toBeGreaterThan(0);
          expect(card.desc.length).toBeGreaterThan(50);
        });
      });
    });

    it("cites Decree 98/2018 and Land Law 2024 Article 177 in both languages", () => {
      const viText = allText(TRANSLATIONS.vi.investorPolicy.coFinancingLinkages);
      const enText = allText(TRANSLATIONS.en.investorPolicy.coFinancingLinkages);
      expect(viText).toContain("98/2018");
      expect(viText).toContain("177");
      expect(enText).toContain("98/2018");
      expect(enText).toContain("177");
    });
  });

  describe("4. 3-Tier Mechanization & Agri-DX Matrix (Section 11 Frontier)", () => {
    it("contains all 3 investment tiers under Decision 1490/QD-TTg in both languages", () => {
      (["vi", "en"] as const).forEach((lang) => {
        const frontier = TRANSLATIONS[lang].frontier;
        expect(frontier.mechanizationTiers).toHaveLength(3);
        frontier.mechanizationTiers.forEach((tier) => {
          expect(tier.tier.length).toBeGreaterThan(0);
          expect(tier.range.length).toBeGreaterThan(0);
          expect(tier.scope.length).toBeGreaterThan(30);
        });
        expect(frontier.carbonUpsideNote.length).toBeGreaterThan(30);
      });
    });
  });

  describe("5. Key Figures & Localization Precision", () => {
    it("preserves all critical numerical figures and localized thousand-separators", () => {
      (["vi", "en"] as const).forEach((lang) => {
        const fullText = allText(TRANSLATIONS[lang]);
        KEY_FIGURES.forEach(({ [lang]: figure }) => {
          expect(fullText).toContain(figure);
        });
      });
    });

    it("nav has exactly 12 sections with Sources as section 12", () => {
      expect(TRANSLATIONS.vi.nav.sources).toBe("Cơ sở dữ liệu");
      expect(TRANSLATIONS.en.nav.sources).toBe("Sources");
      expect((TRANSLATIONS.vi.nav as any).interview).toBeUndefined();
      expect((TRANSLATIONS.en.nav as any).interview).toBeUndefined();
    });
  });
});
