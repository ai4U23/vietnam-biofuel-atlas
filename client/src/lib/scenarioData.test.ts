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
} from "./scenarioData";

describe("Scenario & Biofuel Calculations", () => {
  describe("calculateEthanolScenario", () => {
    it("computes 100% MOIT baseline for E10 correctly", () => {
      const result = calculateEthanolScenario({
        blendRatePct: 10,
        gasolineDemandScalePct: 100,
        domesticPlantUtilizationPct: 65,
        cassavaStarchExportSharePct: 65,
      });

      expect(result.effectiveGasolineDemandMillionL).toBe(9200);
      expect(result.requiredEthanolMillionL).toBeGreaterThan(900);
      expect(result.effectiveDomesticSupplyMillionL).toBe(207);
      expect(result.ethanolSupplyGapMillionL).toBeGreaterThan(700);
      expect(result.competitionStressIndex).toBeGreaterThan(0);
      expect(result.ghgSavedKtCO2).toBeGreaterThan(0);
    });

    it("handles E5 pilot and E20 deep blend extremes", () => {
      const e5 = calculateEthanolScenario({
        blendRatePct: 5,
        gasolineDemandScalePct: 100,
        domesticPlantUtilizationPct: 100,
        cassavaStarchExportSharePct: 65,
      });
      const e20 = calculateEthanolScenario({
        blendRatePct: 20,
        gasolineDemandScalePct: 100,
        domesticPlantUtilizationPct: 100,
        cassavaStarchExportSharePct: 65,
      });

      expect(e20.requiredEthanolMillionL).toBeGreaterThan(e5.requiredEthanolMillionL);
      expect(e20.competitionStressIndex).toBeGreaterThan(e5.competitionStressIndex);
    });
  });

  describe("calculateLogisticsScenario", () => {
    it("models road freight cost and delivered energy cost", () => {
      const truck = calculateLogisticsScenario({
        radiusKm: 35,
        transportRateVNDPerTkm: 1450,
        feedstockMoisturePct: 20,
        farmgatePriceVNDPerKg: 850,
        useWaterwayTransport: false,
      });

      const barge = calculateLogisticsScenario({
        radiusKm: 35,
        transportRateVNDPerTkm: 1450,
        feedstockMoisturePct: 20,
        farmgatePriceVNDPerKg: 850,
        useWaterwayTransport: true,
      });

      expect(barge.transportCostPerTonneVND).toBeLessThan(truck.transportCostPerTonneVND);
      expect(barge.totalDeliveredCostPerKgVND).toBeLessThan(truck.totalDeliveredCostPerKgVND);
      expect(truck.costUSDPerMWh).toBeGreaterThan(0);
      expect(truck.effectiveLHV_MJPerKg).toBeGreaterThan(10);
    });
  });

  describe("calculateCHPScenario", () => {
    it("models high pressure bagasse cogeneration correctly", () => {
      const chp = calculateCHPScenario({
        annualFeedstockProcessedKt: 180,
        electricalEfficiencyPct: 26,
        thermalEfficiencyPct: 55,
        annualOperatingHours: 5000,
      });

      expect(chp.electricalCapacityMW).toBeGreaterThan(10);
      expect(chp.grossElectricityGWh).toBeGreaterThan(50);
      expect(chp.displacedCoalTonnes).toBeGreaterThan(10000);
      expect(chp.totalCO2AvoidedKt).toBeGreaterThan(50);
      expect(chp.avoidedPM25Tonnes).toBeGreaterThan(100);
    });
  });

  describe("calculateDPPAScenario", () => {
    it("simulates private wire vs grid synthetic DPPA vs EVN FiT correctly", () => {
      const privateWire = calculateDPPAScenario({
        capacityMW: 25,
        capacityFactorPct: 75,
        modelType: "dppa_private_wire",
        negotiatedPowerTariffUSDCents: 9.2,
        industrialSteamSoldTJPerYear: 30,
        steamPriceVNDPerGJ: 220000,
        carbonCreditPriceUSDPerTonne: 12,
      });

      const gridDppa = calculateDPPAScenario({
        capacityMW: 25,
        capacityFactorPct: 75,
        modelType: "dppa_synthetic_grid",
        negotiatedPowerTariffUSDCents: 9.2,
        industrialSteamSoldTJPerYear: 30,
        steamPriceVNDPerGJ: 220000,
        carbonCreditPriceUSDPerTonne: 12,
      });

      expect(privateWire.totalAnnualRevenueUSD).toBeGreaterThan(0);
      expect(privateWire.annualNetPowerRevenueUSD).toBeGreaterThan(gridDppa.annualNetPowerRevenueUSD);
      expect(gridDppa.annualWheelingCostUSD).toBeGreaterThan(0);
      expect(privateWire.annualWheelingCostUSD).toBe(0);
      expect(privateWire.annualSteamRevenueUSD).toBeGreaterThan(0);
      expect(privateWire.annualCarbonCreditRevenueUSD).toBeGreaterThan(0);
    });
  });

  describe("calculateBiodieselExportScenario", () => {
    it("calculates export netbacks for EU RED III and US LCFS", () => {
      const ucoToEU = calculateBiodieselExportScenario({
        feedstockId: "uco",
        corridorId: "eu_red3",
        annualFeedstockThroughputTonnes: 50000,
        farmgatePriceVNDPerKg: 16500,
        freightCostUSDPerTonne: 95,
      });

      expect(ucoToEU.neatBiodieselProducedTonnes).toBeGreaterThan(40000);
      expect(ucoToEU.grossRealizedPricePerTonneUSD).toBeGreaterThan(1200);
      expect(ucoToEU.totalGrossRevenueUSD).toBeGreaterThan(50000000);
      expect(ucoToEU.netOperatingMarginUSD).toBeGreaterThan(0);
      expect(ucoToEU.netCO2AbatedTonnes).toBeGreaterThan(50000);

      const cnslToUS = calculateBiodieselExportScenario({
        feedstockId: "cnsl",
        corridorId: "us_lcfs",
        annualFeedstockThroughputTonnes: 30000,
        farmgatePriceVNDPerKg: 11500,
        freightCostUSDPerTonne: 110,
      });

      expect(cnslToUS.neatBiodieselProducedTonnes).toBeGreaterThan(20000);
      expect(cnslToUS.grossRealizedPricePerTonneUSD).toBeGreaterThan(1200);
    });
  });

  describe("calculateBankabilityScore", () => {
    it("computes diagnostic score and returns appropriate advice tier", () => {
      const allTopScores: Record<string, number> = {};
      BANKABILITY_QUESTIONS.forEach((q) => {
        allTopScores[q.id] = 0; // index 0 is top score (100)
      });

      const topResult = calculateBankabilityScore(allTopScores);
      expect(topResult.finalScore).toBe(100);
      expect(topResult.readinessTier).toBe("FID Ready (Bankable)");

      const allLowScores: Record<string, number> = {};
      BANKABILITY_QUESTIONS.forEach((q) => {
        const lastIdx = q.options.length - 1;
        allLowScores[q.id] = lastIdx; // lowest score
      });

      const lowResult = calculateBankabilityScore(allLowScores);
      expect(lowResult.readinessTier).toBe("Sub-Bankable (Major Restructuring Needed)");
      expect(lowResult.finalScore).toBeLessThan(50);
    });
  });

  describe("Static Reference Datasets", () => {
    it("contains 6 valid regional clusters with positive potential", () => {
      expect(REGIONAL_CLUSTERS.length).toBe(6);
      REGIONAL_CLUSTERS.forEach((cluster) => {
        expect(cluster.grossPotentialGWh).toBeGreaterThan(0);
        expect(cluster.deliverableShare).toBeGreaterThan(0);
        expect(cluster.provinces.length).toBeGreaterThan(0);
        expect(cluster.svgCoords.x).toBeGreaterThan(0);
        expect(cluster.svgCoords.y).toBeGreaterThan(0);
      });
    });

    it("contains 4 export bio-oil feedstocks and 4 international corridors", () => {
      expect(BIODIESEL_FEEDSTOCKS.length).toBe(4);
      expect(Object.keys(EXPORT_CORRIDORS).length).toBe(4);
      BIODIESEL_FEEDSTOCKS.forEach((f) => {
        expect(f.fameYieldPct).toBeGreaterThan(50);
        expect(f.carbonIntensityScore).toBeLessThan(40);
      });
    });

    it("contains 5 seasonality profiles with 12-month curves", () => {
      expect(SEASONALITY_DATA.length).toBe(5);
      SEASONALITY_DATA.forEach((s) => {
        expect(s.monthlyAvailability.length).toBe(12);
      });
    });

    it("contains 3 modern boiler technologies", () => {
      expect(BOILER_TECHNOLOGIES.length).toBe(3);
    });
  });
});
