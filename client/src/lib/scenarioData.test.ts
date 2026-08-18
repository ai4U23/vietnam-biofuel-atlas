import { describe, it, expect } from "vitest";
import {
  calculateEthanolScenario,
  calculateLogisticsScenario,
  calculateCHPScenario,
  REGIONAL_CLUSTERS,
} from "./scenarioData";

describe("Scenario Calculations", () => {
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

  describe("REGIONAL_CLUSTERS dataset", () => {
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
  });
});
