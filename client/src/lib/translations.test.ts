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

  it("has all 4 scenario tabs defined in both languages", () => {
    expect(TRANSLATIONS.vi.sandbox.tabs.e10).toBeTruthy();
    expect(TRANSLATIONS.vi.sandbox.tabs.logistics).toBeTruthy();
    expect(TRANSLATIONS.vi.sandbox.tabs.chp).toBeTruthy();
    expect(TRANSLATIONS.vi.sandbox.tabs.dppa).toBeTruthy();

    expect(TRANSLATIONS.en.sandbox.tabs.e10).toBeTruthy();
    expect(TRANSLATIONS.en.sandbox.tabs.logistics).toBeTruthy();
    expect(TRANSLATIONS.en.sandbox.tabs.chp).toBeTruthy();
    expect(TRANSLATIONS.en.sandbox.tabs.dppa).toBeTruthy();
  });

  it("has biodiesel, seasonality, bankability, boiler, and frontier modules in both languages", () => {
    expect(TRANSLATIONS.vi.biodiesel).toBeDefined();
    expect(TRANSLATIONS.en.biodiesel).toBeDefined();

    expect(TRANSLATIONS.vi.seasonality).toBeDefined();
    expect(TRANSLATIONS.en.seasonality).toBeDefined();

    expect(TRANSLATIONS.vi.bankability).toBeDefined();
    expect(TRANSLATIONS.en.bankability).toBeDefined();

    expect(TRANSLATIONS.vi.boiler).toBeDefined();
    expect(TRANSLATIONS.en.boiler).toBeDefined();

    expect(TRANSLATIONS.vi.frontier).toBeDefined();
    expect(TRANSLATIONS.en.frontier).toBeDefined();
  });

  it("ensures English translations do not contain untranslated Vietnamese sentences", () => {
    // Check that policy heading in EN is not Vietnamese
    expect(TRANSLATIONS.en.policy.heading).not.toContain("Hai cấu trúc");
    expect(TRANSLATIONS.en.clusters.items["cassava-hinterland"].title).not.toContain("Sắn củ");
    expect(TRANSLATIONS.en.clusters.items["highlands-perennial"].title).not.toContain("Vỏ cà phê");
    expect(TRANSLATIONS.en.clusters.items["red-river-delta"].title).not.toContain("Lúa thâm canh");
  });
});
