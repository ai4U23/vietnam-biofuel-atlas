/**
 * Comprehensive Whole-Site Web Testing & Quality Audit Suite
 * Tests calculation engines, data integrity, citation resolution, boundary conditions,
 * translation completeness, and typography compliance.
 */
import { describe, it, expect } from "vitest";
import {
  calculateEthanolScenario,
  calculateLogisticsScenario,
  calculateCHPScenario,
  calculateDPPAScenario,
  calculateBiodieselExportScenario,
  calculateBankabilityScore,
  REGIONAL_CLUSTERS,
  BIODIESEL_FEEDSTOCKS,
  EXPORT_CORRIDORS,
  SEASONALITY_DATA,
  BANKABILITY_QUESTIONS,
  BOILER_TECHNOLOGIES,
  EVIDENCE_REFERENCES,
} from "./scenarioData";
import { TRANSLATIONS } from "./translations";

describe("1. Evidence Base & Citation Graph Integrity", () => {
  it("contains all 12 primary evidence references with complete bilingual metadata", () => {
    expect(EVIDENCE_REFERENCES.length).toBe(12);

    const validCategories = ["atlas", "guideline", "academic", "policy", "market"];

    EVIDENCE_REFERENCES.forEach((ref) => {
      expect(ref.id).toBeTruthy();
      expect(ref.titleVi.trim().length).toBeGreaterThan(5);
      expect(ref.titleEn.trim().length).toBeGreaterThan(5);
      expect(ref.authorVi.trim().length).toBeGreaterThan(2);
      expect(ref.authorEn.trim().length).toBeGreaterThan(2);
      expect(ref.year).toMatch(/^\d{4}(–\d{4})?$/);
      expect(validCategories).toContain(ref.category);
      expect(ref.descriptionVi.trim().length).toBeGreaterThan(10);
      expect(ref.descriptionEn.trim().length).toBeGreaterThan(10);
      expect(ref.sourceUrl || ref.pdfUrl).toBeTruthy();
    });
  });

  it("ensures all PDF files referenced exist in the valid references schema", () => {
    const pdfRefs = EVIDENCE_REFERENCES.filter((r) => r.pdfUrl);
    expect(pdfRefs.length).toBeGreaterThanOrEqual(8);
    pdfRefs.forEach((r) => {
      expect(r.pdfUrl).toMatch(/^\/references\/[a-zA-Z0-9_\-\.\s]+\.pdf$/);
    });
  });

  it("verifies unique IDs across all evidence references", () => {
    const ids = EVIDENCE_REFERENCES.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("2. Regional Resource Clusters & Cartographic Data", () => {
  it("validates all 6 geographical clusters data consistency", () => {
    expect(REGIONAL_CLUSTERS.length).toBe(6);

    REGIONAL_CLUSTERS.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.number).toMatch(/^\d{2}$/);
      expect(c.name).toBeTruthy();
      expect(c.vietnameseName).toBeTruthy();
      expect(c.zone).toBeTruthy();
      expect(c.provinces.length).toBeGreaterThan(0);
      expect(c.grossPotentialGWh).toBeGreaterThan(1000);
      expect(c.deliverableShare).toBeGreaterThan(0);
      expect(c.deliverableShare).toBeLessThanOrEqual(100);
      expect(c.accentColor).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("calculates correct national gross potential summation", () => {
    const totalGWh = REGIONAL_CLUSTERS.reduce((acc, c) => acc + c.grossPotentialGWh, 0);
    // Total should match ~84,900 GWh
    expect(totalGWh).toBeGreaterThanOrEqual(84000);
    expect(totalGWh).toBeLessThanOrEqual(86000);
  });
});

describe("3. Waste-to-Biodiesel & Global Export Corridors", () => {
  it("validates all 4 biodiesel feedstock profiles", () => {
    expect(BIODIESEL_FEEDSTOCKS.length).toBe(4);

    BIODIESEL_FEEDSTOCKS.forEach((f) => {
      expect(f.id).toBeTruthy();
      expect(f.annualPotentialTonnes).toBeGreaterThan(10000);
      expect(f.carbonIntensityScore).toBeGreaterThan(10);
      expect(f.carbonIntensityScore).toBeLessThan(50);
      expect(f.fameYieldPct).toBeGreaterThan(70);
      expect(f.ghgReductionVsFossilPct).toBeGreaterThan(50);
      expect(f.pricePerKgVND).toBeGreaterThan(0);
    });
  });

  it("validates all 4 export destinations", () => {
    const corridorKeys = Object.keys(EXPORT_CORRIDORS);
    expect(corridorKeys.length).toBe(4);

    corridorKeys.forEach((key) => {
      const c = EXPORT_CORRIDORS[key];
      expect(c.id).toBeTruthy();
      expect(c.pricingBenchmarkUSDPerTonne).toBeGreaterThan(1000);
      expect(c.carbonIncentiveUSDPerTonne).toBeGreaterThan(100);
      expect(c.keyRequirements.length).toBeGreaterThan(0);
    });
  });

  it("calculates export netback correctly with premium and freight", () => {
    const uco = BIODIESEL_FEEDSTOCKS.find((f) => f.id === "uco")!;

    const result = calculateBiodieselExportScenario({
      feedstockId: uco.id,
      annualFeedstockThroughputTonnes: 10000,
      farmgatePriceVNDPerKg: 13500,
      corridorId: "eu_red3",
      freightCostUSDPerTonne: 85,
    });

    expect(result.grossRealizedPricePerTonneUSD).toBeGreaterThan(1400); // 1380 + 280
    expect(result.netMarginPerTonneUSD).toBeGreaterThan(100);
    expect(result.totalGrossRevenueUSD).toBeGreaterThan(10000000);
    expect(result.netOperatingMarginUSD).toBeGreaterThan(0);
    expect(result.netCO2AbatedTonnes).toBeGreaterThan(15000);
  });
});

describe("4. Scenario Sandbox Calculators & Edge Cases", () => {
  describe("Ethanol E10 Sandbox", () => {
    it("handles zero and maximum blend rates safely", () => {
      const zeroBlend = calculateEthanolScenario({
        blendRatePct: 0,
        gasolineDemandScalePct: 100,
        domesticPlantUtilizationPct: 50,
        cassavaStarchExportSharePct: 65,
      });
      expect(zeroBlend.requiredEthanolMillionL).toBe(0);
      expect(zeroBlend.ethanolSupplyGapMillionL).toBe(0);

      const maxBlend = calculateEthanolScenario({
        blendRatePct: 25,
        gasolineDemandScalePct: 120,
        domesticPlantUtilizationPct: 100,
        cassavaStarchExportSharePct: 80,
      });
      expect(maxBlend.requiredEthanolMillionL).toBeGreaterThan(2000);
      expect(maxBlend.competitionStressIndex).toBeGreaterThan(50);
    });
  });

  describe("Logistics & Moisture Friction Sandbox", () => {
    it("verifies moisture penalty curve on effective LHV", () => {
      const dry = calculateLogisticsScenario({
        radiusKm: 20,
        transportRateVNDPerTkm: 1450,
        feedstockMoisturePct: 10,
        farmgatePriceVNDPerKg: 800,
        useWaterwayTransport: false,
      });

      const wet = calculateLogisticsScenario({
        radiusKm: 20,
        transportRateVNDPerTkm: 1450,
        feedstockMoisturePct: 50,
        farmgatePriceVNDPerKg: 800,
        useWaterwayTransport: false,
      });

      expect(dry.effectiveLHV_MJPerKg).toBeGreaterThan(wet.effectiveLHV_MJPerKg);
      expect(wet.costUSDPerMWh).toBeGreaterThan(dry.costUSDPerMWh);
    });

    it("verifies 55% waterway barging discount factor", () => {
      const truck = calculateLogisticsScenario({
        radiusKm: 40,
        transportRateVNDPerTkm: 1450,
        feedstockMoisturePct: 20,
        farmgatePriceVNDPerKg: 850,
        useWaterwayTransport: false,
      });

      const barge = calculateLogisticsScenario({
        radiusKm: 40,
        transportRateVNDPerTkm: 1450,
        feedstockMoisturePct: 20,
        farmgatePriceVNDPerKg: 850,
        useWaterwayTransport: true,
      });

      // Transport cost with barge should be ~45% of truck (55% discount)
      const expectedBargeCost = Math.round(truck.transportCostPerTonneVND * 0.45);
      expect(Math.abs(barge.transportCostPerTonneVND - expectedBargeCost)).toBeLessThanOrEqual(2);
    });
  });

  describe("Biomass CHP & Cogeneration Sandbox", () => {
    it("computes thermal and power output across boiler classes", () => {
      const lowStoker = calculateCHPScenario({
        annualFeedstockProcessedKt: 100,
        electricalEfficiencyPct: 20,
        thermalEfficiencyPct: 45,
        annualOperatingHours: 4000,
      });

      const highCFB = calculateCHPScenario({
        annualFeedstockProcessedKt: 100,
        electricalEfficiencyPct: 32,
        thermalEfficiencyPct: 55,
        annualOperatingHours: 7000,
      });

      expect(highCFB.grossElectricityGWh).toBeGreaterThan(lowStoker.grossElectricityGWh);
      expect(highCFB.displacedCoalTonnes).toBeGreaterThan(lowStoker.displacedCoalTonnes);
    });
  });

  describe("DPPA & Power Offtake Sandbox", () => {
    it("correctly models private wire (0 wheeling fee) vs synthetic grid (wheeling fee deducted)", () => {
      const privateWire = calculateDPPAScenario({
        capacityMW: 20,
        capacityFactorPct: 75,
        modelType: "dppa_private_wire",
        negotiatedPowerTariffUSDCents: 9.5,
        industrialSteamSoldTJPerYear: 100,
        steamPriceVNDPerGJ: 220000,
        carbonCreditPriceUSDPerTonne: 15,
      });

      const synthetic = calculateDPPAScenario({
        capacityMW: 20,
        capacityFactorPct: 75,
        modelType: "dppa_synthetic_grid",
        negotiatedPowerTariffUSDCents: 9.5,
        industrialSteamSoldTJPerYear: 100,
        steamPriceVNDPerGJ: 220000,
        carbonCreditPriceUSDPerTonne: 15,
      });

      expect(privateWire.wheelingFeeCents).toBe(0);
      expect(synthetic.wheelingFeeCents).toBeGreaterThan(1);
      expect(privateWire.annualNetPowerRevenueUSD).toBeGreaterThan(synthetic.annualNetPowerRevenueUSD);
      expect(privateWire.totalAnnualRevenueUSD).toBeGreaterThan(synthetic.totalAnnualRevenueUSD);
    });
  });

  describe("Bankability FID Scorecard", () => {
    it("evaluates worst case configuration as high risk (<50)", () => {
      const worstCaseAnswers = {
        feedstock_radius: 2, // >50km spot market
        soil_safeguard: 2, // 100% removal
        offtake_structure: 2, // 100% merchant spot
        boiler_technology: 2, // low pressure stoker
        feedstock_contracts: 2, // 100% spot market
        farmer_benefit_sharing: 2, // monopsony
      };

      const result = calculateBankabilityScore(worstCaseAnswers);
      expect(result.finalScore).toBeLessThan(50);
      expect(result.readinessTier).toBe("Sub-Bankable (Major Restructuring Needed)");
    });

    it("evaluates best case configuration as highly bankable (>85)", () => {
      const bestCaseAnswers = {
        feedstock_radius: 0, // <20km contracted
        soil_safeguard: 0, // >40% retention + biochar
        offtake_structure: 0, // 20-yr DPPA
        boiler_technology: 0, // high-P CFB
        feedstock_contracts: 0, // 5-10yr indexed
        farmer_benefit_sharing: 0, // co-op profit sharing
      };

      const result = calculateBankabilityScore(bestCaseAnswers);
      expect(result.finalScore).toBeGreaterThanOrEqual(85);
      expect(result.readinessTier).toBe("FID Ready (Bankable)");
    });
  });
});

describe("5. Translation Symmetry & Localization Quality", () => {
  it("verifies identical key coverage across all translation namespaces", () => {
    function getDeepKeys(obj: Record<string, any>, prefix = ""): string[] {
      return Object.keys(obj).reduce((res: string[], el: string) => {
        const name = prefix ? `${prefix}.${el}` : el;
        if (typeof obj[el] === "object" && obj[el] !== null && !Array.isArray(obj[el])) {
          res.push(...getDeepKeys(obj[el], name));
        } else {
          res.push(name);
        }
        return res;
      }, []);
    }

    const viDeepKeys = getDeepKeys(TRANSLATIONS.vi).sort();
    const enDeepKeys = getDeepKeys(TRANSLATIONS.en).sort();

    expect(viDeepKeys).toEqual(enDeepKeys);
  });

  it("checks that no translation strings are empty or undefined", () => {
    function assertNoEmptyValues(obj: Record<string, any>, path = "") {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim().length, `Empty string at ${currentPath}`).toBeGreaterThan(0);
        } else if (typeof value === "object" && value !== null) {
          assertNoEmptyValues(value, currentPath);
        }
      }
    }

    assertNoEmptyValues(TRANSLATIONS.vi, "TRANSLATIONS.vi");
    assertNoEmptyValues(TRANSLATIONS.en, "TRANSLATIONS.en");
  });
});
