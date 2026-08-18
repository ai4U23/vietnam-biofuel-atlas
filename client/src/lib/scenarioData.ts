/**
 * Vietnam Biofuel Atlas: Scenario Calculations & Regional Cluster Data
 * Sources: MOIT 2026 E10 Roadmap, FAO Vietnam Agriculture Database 2024,
 * IEA Outlook for Biogas & Biomethane 2025, PDP8 Power Plan Baselines.
 */

export interface RegionalCluster {
  id: string;
  number: string;
  name: string;
  vietnameseName: string;
  zone: string;
  dominantPathway: "Rice System" | "Sugar System" | "Livestock System" | "Cassava System" | "Regional Residues";
  accentColor: string;
  provinces: string[];
  grossPotentialGWh: number;
  deliverableShare: number; // Percentage considered commercially deliverable under safeguards
  keyInfrastructure: string;
  svgCoords: { x: number; y: number }; // Relative coordinates on the stylized Vietnam cartographic canvas (viewBox 0 0 400 700)
  title: string;
  body: string;
  tags: string[];
  image: string;
}

export const REGIONAL_CLUSTERS: RegionalCluster[] = [
  {
    id: "mekong-delta",
    number: "01",
    name: "Mekong River Delta",
    vietnameseName: "Đồng Bằng Sông Cửu Long",
    zone: "South",
    dominantPathway: "Rice System",
    accentColor: "#e3a72f",
    provinces: ["Can Tho", "An Giang", "Dong Thap", "Kien Giang", "Soc Trang", "Tien Giang"],
    grossPotentialGWh: 38400,
    deliverableShare: 32, // Soil retention and mushroom/fertilizer cascades
    keyInfrastructure: "High-density rice milling corridors along waterways, baler logistics co-ops, husk briquetting units",
    svgCoords: { x: 145, y: 595 },
    title: "Rice processing + straw cascades",
    body: "Start at river-connected mills with husk-fired heat and CHP. Add straw only when cooperatives, soil retention rules, bale storage, and nearby buyers are established.",
    tags: ["Rice husk", "Rice straw", "Waterway barging", "Circularity"],
    image: "/images/rice-husk-mill.svg",
  },
  {
    id: "sugar-belts",
    number: "02",
    name: "Sugar Mill Belts",
    vietnameseName: "Vành Đai Nhà Máy Mía Đường",
    zone: "North-Central & South-Central",
    dominantPathway: "Sugar System",
    accentColor: "#7d9d68",
    provinces: ["Thanh Hoa", "Nghe An", "Gia Lai", "Tay Ninh", "Phu Yen", "Khanh Hoa"],
    grossPotentialGWh: 14200,
    deliverableShare: 65, // Modernized high-pressure CHP surplus
    keyInfrastructure: "Centralized sugar milling complexes with grid-connected bagasse steam turbines",
    svgCoords: { x: 195, y: 275 },
    title: "High-pressure bagasse CHP",
    body: "Modernize steam boilers from low-pressure to >=65 bar, preserve essential on-site process heat, and dispatch surplus baseload electricity to EVN grid.",
    tags: ["Bagasse", "Cogeneration (CHP)", "High-pressure steam", "Baseload"],
    image: "/images/bagasse-chp.svg",
  },
  {
    id: "livestock-corridors",
    number: "03",
    name: "Livestock & Biogas Corridors",
    vietnameseName: "Hành Lang Chăn Nuôi & Khí Sinh Học",
    zone: "Southeast & Red River Delta",
    dominantPathway: "Livestock System",
    accentColor: "#466d5b",
    provinces: ["Dong Nai", "Binh Duong", "Hanoi Peri-urban", "Bac Giang", "Ha Nam"],
    grossPotentialGWh: 11800,
    deliverableShare: 45, // Commercial scale manure digesters
    keyInfrastructure: "Industrial swine and dairy farm clusters, covered lagoon biodigesters, digestate pelleting",
    svgCoords: { x: 215, y: 520 },
    title: "Waste treatment + biomethane loops",
    body: "Utilize swine and dairy wastewater in short-radius (<15 km) clusters with methane-capture controls and organic digestate returning to surrounding farmland.",
    tags: ["Swine/Dairy Manure", "Covered Lagoon Biogas", "Biofertilizer", "Methane Avoidance"],
    image: "/images/biogas-cluster.svg",
  },
  {
    id: "cassava-hinterland",
    number: "04",
    name: "Cassava & Ethanol Supply Belts",
    vietnameseName: "Vùng Nguyên Liệu Sắn & Cồn Sinh Học",
    zone: "Southeast & Central Highlands",
    dominantPathway: "Cassava System",
    accentColor: "#c76d43",
    provinces: ["Tay Ninh", "Binh Phuoc", "Gia Lai", "Kon Tum", "Quang Ngai"],
    grossPotentialGWh: 9600,
    deliverableShare: 38, // Food and starch export competition boundary
    keyInfrastructure: "Commercial drying yards, starch extraction plants, dedicated bioethanol distillation facilities (Dung Quat, Dai Viet, Binh Phuoc)",
    svgCoords: { x: 210, y: 440 },
    title: "Cassava roots + peel / biogas co-products",
    body: "Fuel ethanol production anchor. Demands high plant capacity utilization, contract farming price stability, and recovery of peel waste and vinasse into biogas.",
    tags: ["Dried Cassava Chips", "Fuel Ethanol E10", "Vinasse Biogas", "Starch Trade"],
    image: "/images/rice-husk-mill.svg",
  },
  {
    id: "highlands-perennial",
    number: "05",
    name: "Central Highlands Agro-Residues",
    vietnameseName: "Cao Nguyên Phụ Phẩm Cây Công Nghiệp",
    zone: "Central Highlands",
    dominantPathway: "Regional Residues",
    accentColor: "#8a6844",
    provinces: ["Dak Lak", "Lam Dong", "Dak Nong", "Gia Lai"],
    grossPotentialGWh: 6100,
    deliverableShare: 40,
    keyInfrastructure: "Coffee dry-milling hubs, wood pelleting factories, decentralized industrial heat boilers",
    svgCoords: { x: 250, y: 410 },
    title: "Coffee pulp, parchment & wood pellets",
    body: "Dense regional processing nodes supporting decentralized industrial process heat, organic compost blending, and export pellet production.",
    tags: ["Coffee Husk", "Parchment", "Wood Pellets", "Industrial Heat"],
    image: "/images/bagasse-chp.svg",
  },
  {
    id: "red-river-delta",
    number: "06",
    name: "Red River Delta Agricultural Hub",
    vietnameseName: "Đồng Bằng Sông Hồng",
    zone: "North",
    dominantPathway: "Rice System",
    accentColor: "#d4a344",
    provinces: ["Thai Binh", "Nam Dinh", "Hai Duong", "Ninh Binh"],
    grossPotentialGWh: 4800,
    deliverableShare: 28,
    keyInfrastructure: "Intensive 2-season paddy milling centers, mushroom cultivation co-ops, biomass briquetting",
    svgCoords: { x: 200, y: 145 },
    title: "Northern intensive paddy & briquetting",
    body: "Focus on husk briquetting for ceramic/brick kilns and controlled straw retrieval to replace high-emission open field burning in winter cycles.",
    tags: ["Winter Straw Management", "Husk Briquettes", "Clean Air", "Industrial Steam"],
    image: "/images/biogas-cluster.svg",
  },
];

/** Baseline reference coefficients */
export const SCENARIO_DEFAULTS = {
  // Gasoline & Ethanol baseline (Vietnam MOIT 2026)
  annualGasolineDemandMillionL: 9200, // Total national gasoline market approx. 9.2 billion litres
  domesticEthanolCapacityMillionL: 318, // Existing operational/idled domestic ethanol nameplate
  specificEthanolYieldLPerTonneChips: 400, // 1 tonne dry cassava chips -> ~400 L fuel ethanol
  totalCassavaRootsProductionKt: 10500, // Vietnam total annual fresh cassava root harvest ~10.5 Mt
  freshToDryChipRatio: 0.4, // 2.5 tonnes fresh root -> 1 tonne dry chips (40% yield)

  // Logistics defaults
  baseTransportVNDPerTonneKm: 1450, // Typical trucking rate per t-km in rural corridors
  bargeTransportDiscount: 0.45, // Waterway barge transport cost is ~55% cheaper
  avgHaulDistanceKm: 35,
  farmgateBiomassVNDPerKg: 850, // Typical raw husk/straw delivered gate price

  // Power & Emission factors
  gridEmissionFactorKgCO2PerKWh: 0.72, // EVN average grid emission intensity
  coalThermalEmissionKgCO2PerGJ: 94.0, // Industrial anthracite baseline
  gasolineEmissionKgCO2PerL: 2.31, // RON95 combusted emission
  ethanolCarbonIntensityReductionPct: 58, // Typical life-cycle GHG reduction for cassava ethanol vs gasoline
  riceHuskLHV_MJPerKg: 15.0,
  bagasseLHV_MJPerKg: 7.8, // 50% moisture as-fired bagasse
};

/**
 * Calculates E10 & Cassava Market Competition balances
 */
export function calculateEthanolScenario(params: {
  blendRatePct: number; // e.g. 5, 10, 15
  gasolineDemandScalePct: number; // 70 to 130%
  domesticPlantUtilizationPct: number; // 20 to 100%
  cassavaStarchExportSharePct: number; // 40 to 80% (share reserved for starch/food/export)
}) {
  const effectiveGasolineDemand =
    SCENARIO_DEFAULTS.annualGasolineDemandMillionL * (params.gasolineDemandScalePct / 100);
  const requiredEthanolMillionL =
    (effectiveGasolineDemand * (params.blendRatePct / 100)) / (1 - params.blendRatePct / 100);

  const effectiveDomesticSupply =
    SCENARIO_DEFAULTS.domesticEthanolCapacityMillionL * (params.domesticPlantUtilizationPct / 100);

  const ethanolSupplyGapMillionL = Math.max(0, requiredEthanolMillionL - effectiveDomesticSupply);

  // Total dry chips needed if 100% of demand was domestic
  const totalDryChipsNeededKt =
    (requiredEthanolMillionL * 1000) / SCENARIO_DEFAULTS.specificEthanolYieldLPerTonneChips;

  // Total dry chip capacity of Vietnam's harvest
  const nationalDryChipCapacityKt =
    SCENARIO_DEFAULTS.totalCassavaRootsProductionKt * SCENARIO_DEFAULTS.freshToDryChipRatio;

  // Dry chips available for energy after starch/export reservation
  const chipsAvailableForEnergyKt =
    nationalDryChipCapacityKt * (1 - params.cassavaStarchExportSharePct / 100);

  // Dry chip gap relative to domestic energy allocation
  const domesticChipDeficitKt = Math.max(0, totalDryChipsNeededKt - chipsAvailableForEnergyKt);

  // Competition pressure index (0 to 100)
  const competitionStressIndex = Math.min(
    100,
    Math.round((totalDryChipsNeededKt / Math.max(1, nationalDryChipCapacityKt)) * 100),
  );

  // GHG emissions saved by bioethanol blend (kt CO2e/year)
  const ghgSavedKtCO2 = Math.round(
    (requiredEthanolMillionL *
      SCENARIO_DEFAULTS.gasolineEmissionKgCO2PerL *
      (SCENARIO_DEFAULTS.ethanolCarbonIntensityReductionPct / 100)) /
      1000,
  );

  return {
    effectiveGasolineDemandMillionL: Math.round(effectiveGasolineDemand),
    requiredEthanolMillionL: Math.round(requiredEthanolMillionL),
    effectiveDomesticSupplyMillionL: Math.round(effectiveDomesticSupply),
    ethanolSupplyGapMillionL: Math.round(ethanolSupplyGapMillionL),
    totalDryChipsNeededKt: Math.round(totalDryChipsNeededKt),
    chipsAvailableForEnergyKt: Math.round(chipsAvailableForEnergyKt),
    domesticChipDeficitKt: Math.round(domesticChipDeficitKt),
    competitionStressIndex,
    ghgSavedKtCO2,
  };
}

/**
 * Calculates Logistics Friction & Delivered Fuel Cost
 */
export function calculateLogisticsScenario(params: {
  radiusKm: number; // 10 to 80 km
  transportRateVNDPerTkm: number; // 1000 to 2500
  feedstockMoisturePct: number; // 10 to 50%
  farmgatePriceVNDPerKg: number; // 400 to 1500
  useWaterwayTransport: boolean;
}) {
  const effectiveRate = params.useWaterwayTransport
    ? params.transportRateVNDPerTkm * SCENARIO_DEFAULTS.bargeTransportDiscount
    : params.transportRateVNDPerTkm;

  // Average one-way distance inside circle radius is ~2/3 of radius
  const avgDistanceKm = params.radiusKm * 0.67;
  const transportCostPerTonne = effectiveRate * avgDistanceKm;
  const transportCostPerKg = transportCostPerTonne / 1000;

  const totalDeliveredCostPerKg = params.farmgatePriceVNDPerKg + transportCostPerKg;

  // Adjust energy density by moisture content (Base dry LHV = 17.5 MJ/kg)
  const dryLHV = 17.5;
  const effectiveLHV_MJPerKg = Math.max(
    5.0,
    dryLHV * (1 - params.feedstockMoisturePct / 100) - 2.44 * (params.feedstockMoisturePct / 100),
  );

  // Cost in VND per GJ (1 kg = effectiveLHV / 1000 GJ)
  const costVNDPerGJ = (totalDeliveredCostPerKg / (effectiveLHV_MJPerKg / 1000));
  // Convert VND/GJ to USD/MWh (1 USD = 25,400 VND; 1 MWh = 3.6 GJ)
  const costUSDPerMWh = (costVNDPerGJ * 3.6) / 25400;

  // Break-even economic hauling radius where transport exceeds 40% of delivered cost
  const maxEconomicRadiusKm = Math.round(
    (params.farmgatePriceVNDPerKg * 0.67 * 1000) / (effectiveRate * 0.67),
  );

  return {
    avgDistanceKm: Math.round(avgDistanceKm),
    transportCostPerTonneVND: Math.round(transportCostPerTonne),
    totalDeliveredCostPerKgVND: Math.round(totalDeliveredCostPerKg),
    effectiveLHV_MJPerKg: Number(effectiveLHV_MJPerKg.toFixed(2)),
    costVNDPerGJ: Math.round(costVNDPerGJ),
    costUSDPerMWh: Number(costUSDPerMWh.toFixed(1)),
    maxEconomicRadiusKm: Math.min(120, maxEconomicRadiusKm),
  };
}

/**
 * Calculates Biomass CHP & Power Balances
 */
export function calculateCHPScenario(params: {
  annualFeedstockProcessedKt: number; // 50 to 500 kt/yr (e.g. typical sugar mill bagasse)
  electricalEfficiencyPct: number; // 20 to 32%
  thermalEfficiencyPct: number; // 45 to 70%
  annualOperatingHours: number; // 3000 to 7500 hours
}) {
  const avgLHV_MJPerKg = 8.5; // Bagasse/wet husk composite
  const totalThermalInputGJ = params.annualFeedstockProcessedKt * 1000 * (avgLHV_MJPerKg / 1000) * 1000;
  const totalThermalInputMWh = totalThermalInputGJ / 3.6;

  const grossElectricityGWh = (totalThermalInputMWh * (params.electricalEfficiencyPct / 100)) / 1000;
  const grossUsefulHeatGJ = totalThermalInputGJ * (params.thermalEfficiencyPct / 100);

  const electricalCapacityMW = (grossElectricityGWh * 1000) / params.annualOperatingHours;

  // Displaced coal (Anthracite LHV = 24 GJ/tonne)
  const displacedCoalTonnes = Math.round(grossUsefulHeatGJ / 24);
  const displacedGridCO2Kt = Math.round(
    (grossElectricityGWh * 1000 * SCENARIO_DEFAULTS.gridEmissionFactorKgCO2PerKWh) / 1000,
  );
  const displacedThermalCO2Kt = Math.round(
    (grossUsefulHeatGJ * (SCENARIO_DEFAULTS.coalThermalEmissionKgCO2PerGJ / 1000)) / 1000,
  );

  // Avoided open field burning PM2.5 (avg 3.5 kg PM2.5 per tonne biomass open-burned)
  const avoidedPM25Tonnes = Number(
    ((params.annualFeedstockProcessedKt * 1000 * 3.5) / 1000).toFixed(1),
  );

  return {
    electricalCapacityMW: Number(electricalCapacityMW.toFixed(1)),
    grossElectricityGWh: Math.round(grossElectricityGWh),
    grossUsefulHeatTJ: Math.round(grossUsefulHeatGJ / 1000),
    displacedCoalTonnes,
    totalCO2AvoidedKt: displacedGridCO2Kt + displacedThermalCO2Kt,
    avoidedPM25Tonnes,
  };
}
