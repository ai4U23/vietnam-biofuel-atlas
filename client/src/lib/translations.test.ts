import { describe, it, expect } from "vitest";
import { TRANSLATIONS } from "./translations";

describe("Translations Dictionary", () => {
  it("has symmetrical vi and en structures", () => {
    expect(TRANSLATIONS.vi).toBeDefined();
    expect(TRANSLATIONS.en).toBeDefined();

    const viKeys = Object.keys(TRANSLATIONS.vi).sort();
    const enKeys = Object.keys(TRANSLATIONS.en).sort();
    expect(viKeys).toEqual(enKeys);
  });

  it("covers all 6 feedstocks in both languages", () => {
    const feedstocks = [
      "Rice husk",
      "Bagasse",
      "Cassava roots",
      "Livestock manure",
      "Rice straw",
      "Coffee & coconut residues",
    ];

    feedstocks.forEach((key) => {
      expect(TRANSLATIONS.vi.feedstocks.items[key as keyof typeof TRANSLATIONS.vi.feedstocks.items]).toBeDefined();
      expect(TRANSLATIONS.en.feedstocks.items[key as keyof typeof TRANSLATIONS.en.feedstocks.items]).toBeDefined();
    });
  });

  it("covers all 6 regional clusters in both languages", () => {
    const clusters = [
      "mekong-delta",
      "sugar-belts",
      "livestock-corridors",
      "cassava-hinterland",
      "highlands-perennial",
      "red-river-delta",
    ];

    clusters.forEach((id) => {
      expect(TRANSLATIONS.vi.clusters.items[id as keyof typeof TRANSLATIONS.vi.clusters.items]).toBeDefined();
      expect(TRANSLATIONS.en.clusters.items[id as keyof typeof TRANSLATIONS.en.clusters.items]).toBeDefined();
    });
  });

  it("has all 3 scenario tabs defined in both languages", () => {
    expect(TRANSLATIONS.vi.sandbox.tabs.e10).toBeTruthy();
    expect(TRANSLATIONS.vi.sandbox.tabs.logistics).toBeTruthy();
    expect(TRANSLATIONS.vi.sandbox.tabs.chp).toBeTruthy();

    expect(TRANSLATIONS.en.sandbox.tabs.e10).toBeTruthy();
    expect(TRANSLATIONS.en.sandbox.tabs.logistics).toBeTruthy();
    expect(TRANSLATIONS.en.sandbox.tabs.chp).toBeTruthy();
  });
});
