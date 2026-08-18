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
  fossilDieselEmissionKgCO2PerL: 2.68, // Fossil diesel standard
  fossilDieselLHV_MJPerKg: 42.6,
  ethanolCarbonIntensityReductionPct: 58, // Typical life-cycle GHG reduction for cassava ethanol vs gasoline
  riceHuskLHV_MJPerKg: 15.0,
  bagasseLHV_MJPerKg: 7.8, // 50% moisture as-fired bagasse

  // DPPA & Power Market 2025-2026 defaults
  evnBiomassFiTUSDCentsPerKWh: 7.03, // Decision 1008/QD-BCT biomass FiT approx 1,780 VND/kWh
  dppaWheelingFeeUSDCentsPerKWh: 1.15, // Decree 243/2026 synthetic DPPA wheeling fee
  vndPerUSD: 25400,
};

/**
 * Calculates E10 & Cassava Market Competition balances
 */
export function calculateEthanolScenario(params: {
  blendRatePct: number; // e.g. 5, 10, 15, 20
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
  const costVNDPerGJ = totalDeliveredCostPerKg / (effectiveLHV_MJPerKg / 1000);
  // Convert VND/GJ to USD/MWh (1 USD = 25,400 VND; 1 MWh = 3.6 GJ)
  const costUSDPerMWh = (costVNDPerGJ * 3.6) / SCENARIO_DEFAULTS.vndPerUSD;

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
  const totalThermalInputGJ =
    params.annualFeedstockProcessedKt * 1000 * (avgLHV_MJPerKg / 1000) * 1000;
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

/**
 * DPPA & Renewable Energy Revenue Modeler
 * Decrees 57/2025/ND-CP, 58/2025/ND-CP & 243/2026/ND-CP
 */
export type DPPAModelType = "fit_regulated" | "dppa_private_wire" | "dppa_synthetic_grid";

export function calculateDPPAScenario(params: {
  capacityMW: number;
  capacityFactorPct: number; // 50 to 90%
  modelType: DPPAModelType;
  negotiatedPowerTariffUSDCents: number; // 7.0 to 14.0 c/kWh
  industrialSteamSoldTJPerYear: number; // 0 to 400 TJ/yr
  steamPriceVNDPerGJ: number; // 180,000 to 350,000 VND/GJ
  carbonCreditPriceUSDPerTonne: number; // 5 to 30 USD/t
}) {
  const operatingHours = 8760 * (params.capacityFactorPct / 100);
  const annualGenMWh = params.capacityMW * operatingHours;
  const annualGenKWh = annualGenMWh * 1000;

  let effectivePowerTariffCents = params.negotiatedPowerTariffUSDCents;
  let wheelingFeeCents = 0;

  if (params.modelType === "fit_regulated") {
    effectivePowerTariffCents = SCENARIO_DEFAULTS.evnBiomassFiTUSDCentsPerKWh;
    wheelingFeeCents = 0;
  } else if (params.modelType === "dppa_synthetic_grid") {
    wheelingFeeCents = SCENARIO_DEFAULTS.dppaWheelingFeeUSDCentsPerKWh;
  } else {
    // Private wire - 0 wheeling fee
    wheelingFeeCents = 0;
  }

  const netRealizedTariffCents = Math.max(0, effectivePowerTariffCents - wheelingFeeCents);
  const annualGrossPowerRevenueUSD = (annualGenKWh * (effectivePowerTariffCents / 100));
  const annualWheelingCostUSD = (annualGenKWh * (wheelingFeeCents / 100));
  const annualNetPowerRevenueUSD = (annualGenKWh * (netRealizedTariffCents / 100));

  // Steam revenue
  const steamSoldGJ = params.industrialSteamSoldTJPerYear * 1000;
  const annualSteamRevenueUSD =
    (steamSoldGJ * params.steamPriceVNDPerGJ) / SCENARIO_DEFAULTS.vndPerUSD;

  // Carbon credits (Grid displacement ~ 0.72 kg/kWh + Thermal displacement ~ 94 kg/GJ)
  const co2AvoidedGridTonnes = (annualGenKWh * SCENARIO_DEFAULTS.gridEmissionFactorKgCO2PerKWh) / 1000;
  const co2AvoidedThermalTonnes =
    (steamSoldGJ * (SCENARIO_DEFAULTS.coalThermalEmissionKgCO2PerGJ / 1000));
  const totalCarbonAvoidedTonnes = co2AvoidedGridTonnes + co2AvoidedThermalTonnes;
  const annualCarbonCreditRevenueUSD = totalCarbonAvoidedTonnes * params.carbonCreditPriceUSDPerTonne;

  const totalAnnualRevenueUSD =
    annualNetPowerRevenueUSD + annualSteamRevenueUSD + annualCarbonCreditRevenueUSD;

  const lcoeRevenueGainPct =
    params.modelType !== "fit_regulated"
      ? Number(
          (
            ((netRealizedTariffCents - SCENARIO_DEFAULTS.evnBiomassFiTUSDCentsPerKWh) /
              SCENARIO_DEFAULTS.evnBiomassFiTUSDCentsPerKWh) *
            100
          ).toFixed(1),
        )
      : 0;

  return {
    annualGenMWh: Math.round(annualGenMWh),
    effectivePowerTariffCents: Number(effectivePowerTariffCents.toFixed(2)),
    wheelingFeeCents: Number(wheelingFeeCents.toFixed(2)),
    annualGrossPowerRevenueUSD: Math.round(annualGrossPowerRevenueUSD),
    annualWheelingCostUSD: Math.round(annualWheelingCostUSD),
    annualNetPowerRevenueUSD: Math.round(annualNetPowerRevenueUSD),
    annualSteamRevenueUSD: Math.round(annualSteamRevenueUSD),
    annualCarbonCreditRevenueUSD: Math.round(annualCarbonCreditRevenueUSD),
    totalAnnualRevenueUSD: Math.round(totalAnnualRevenueUSD),
    totalCarbonAvoidedTonnes: Math.round(totalCarbonAvoidedTonnes),
    lcoeRevenueGainPct,
  };
}

/**
 * Biodiesel, HVO & Global Export Corridors Models
 */
export interface BiodieselFeedstock {
  id: string;
  name: string;
  vietnameseName: string;
  type: "waste_oil" | "animal_fat" | "agro_industrial_oil" | "non_food_oil";
  annualPotentialTonnes: number;
  fameYieldPct: number; // Conversion yield into FAME/biodiesel
  carbonIntensityScore: number; // gCO2e/MJ (vs fossil diesel 94.0)
  ghgReductionVsFossilPct: number;
  primaryRegions: string[];
  exportSuitability: "High Premium (Double-Counted)" | "Strong Regional" | "Industrial Marine Substitute";
  certificationsNeeded: string[];
  keyMarkets: string[];
  descriptionEn: string;
  descriptionVi: string;
  pricePerKgVND: number;
}

export const BIODIESEL_FEEDSTOCKS: BiodieselFeedstock[] = [
  {
    id: "uco",
    name: "Used Cooking Oil (UCO / UCOME)",
    vietnameseName: "Dầu Ăn Đã Qua Sử Dụng (UCO)",
    type: "waste_oil",
    annualPotentialTonnes: 160000,
    fameYieldPct: 94,
    carbonIntensityScore: 19.5, // Exceptionally low CI score
    ghgReductionVsFossilPct: 79,
    primaryRegions: ["Ho Chi Minh City", "Hanoi", "Industrial Food Clusters", "Binh Duong"],
    exportSuitability: "High Premium (Double-Counted)",
    certificationsNeeded: ["ISCC EU", "EPA RFS Registration", "RSB"],
    keyMarkets: ["EU (Netherlands/Spain)", "Singapore (Neste Tuas)", "US (California LCFS)"],
    descriptionEn:
      "Collected from food processors, restaurants, and hotels. High global demand for HVO renewable diesel and SAF with Annex IX double-counting in the EU.",
    descriptionVi:
      "Thu gom từ nhà máy chế biến thực phẩm và chuỗi F&B. Nhu cầu quốc tế cực lớn cho HVO và SAF, được tính điểm phát thải gấp đôi tại EU.",
    pricePerKgVND: 16500,
  },
  {
    id: "catfish_fat",
    name: "Pangasius / Catfish Tallow",
    vietnameseName: "Mỡ Cá Tra / Cá Basa",
    type: "animal_fat",
    annualPotentialTonnes: 185000,
    fameYieldPct: 96,
    carbonIntensityScore: 24.2,
    ghgReductionVsFossilPct: 74,
    primaryRegions: ["An Giang", "Dong Thap", "Can Tho", "Vinh Long", "Ben Tre"],
    exportSuitability: "High Premium (Double-Counted)",
    certificationsNeeded: ["ISCC EU", "Category 3 Animal Byproduct Compliance"],
    keyMarkets: ["EU", "US LCFS", "South Korea (Co-processing)"],
    descriptionEn:
      "High cetane number (>58) byproduct of Vietnam's 1.6 Mt/year catfish processing industry in the Mekong Delta. Clean esterification profile.",
    descriptionVi:
      "Chỉ số cetane cao (>58), phụ phẩm từ ngành chế biến 1,6 triệu tấn cá tra ĐBSCL. Tiêu chuẩn tuyệt vời cho este hóa biodiesel sạch.",
    pricePerKgVND: 18200,
  },
  {
    id: "cnsl",
    name: "Cashew Nut Shell Liquid (CNSL)",
    vietnameseName: "Dầu Vỏ Hạt Điều (CNSL)",
    type: "agro_industrial_oil",
    annualPotentialTonnes: 125000,
    fameYieldPct: 88,
    carbonIntensityScore: 31.0,
    ghgReductionVsFossilPct: 67,
    primaryRegions: ["Binh Phuoc", "Dong Nai", "Gia Lai", "Binh Dinh"],
    exportSuitability: "Industrial Marine Substitute",
    certificationsNeeded: ["ISO 8217 Marine Blend", "REACH Registration"],
    keyMarkets: ["South Korea (Power boilers/Marine)", "Japan", "China"],
    descriptionEn:
      "Extracted from cashew shells (Vietnam is the world's #1 processor). High LHV (39.5 MJ/kg), widely exported to South Korea and Japan to displace heavy fuel oil (HFO).",
    descriptionVi:
      "Ép từ vỏ hạt điều (VN xuất khẩu hạt điều số 1 thế giới). Nhiệt trị cao (39,5 MJ/kg), xuất khẩu lớn sang Hàn Quốc và Nhật Bản thay thế than đá/dầu FO.",
    pricePerKgVND: 11500,
  },
  {
    id: "rubber_seed",
    name: "Rubber Seed Oil",
    vietnameseName: "Dầu Hạt Cao Su",
    type: "non_food_oil",
    annualPotentialTonnes: 45000,
    fameYieldPct: 90,
    carbonIntensityScore: 36.8,
    ghgReductionVsFossilPct: 61,
    primaryRegions: ["Binh Phuoc", "Tay Ninh", "Gia Lai", "Dak Lak"],
    exportSuitability: "Strong Regional",
    certificationsNeeded: ["ISCC PLUS", "National Biofuel Quality Standards"],
    keyMarkets: ["Domestic B5/B10 Blending", "ASEAN Industrial Heat"],
    descriptionEn:
      "Non-edible oil harvested from 900,000+ hectares of mature rubber plantations. Free from food-vs-fuel conflicts.",
    descriptionVi:
      "Dầu phi thực phẩm thu từ hơn 900.000 ha rừng cao su. Hoàn toàn không cạnh tranh an ninh lương thực.",
    pricePerKgVND: 12800,
  },
];

export interface GlobalExportCorridor {
  id: string;
  name: string;
  destinationPort: string;
  mandatoryFramework: string;
  pricingBenchmarkUSDPerTonne: number;
  carbonIncentiveUSDPerTonne: number;
  keyRequirements: string[];
}

export const EXPORT_CORRIDORS: Record<string, GlobalExportCorridor> = {
  eu_red3: {
    id: "eu_red3",
    name: "European Union (RED III)",
    destinationPort: "Rotterdam / Antwerp",
    mandatoryFramework: "EU RED III Annex IX Part B (Double Counting)",
    pricingBenchmarkUSDPerTonne: 1380,
    carbonIncentiveUSDPerTonne: 280,
    keyRequirements: ["ISCC EU System Certificate", "Proof of Sustainability (PoS)", "Traceability to origin"],
  },
  us_lcfs: {
    id: "us_lcfs",
    name: "United States (California LCFS & RFS)",
    destinationPort: "Los Angeles / Long Beach",
    mandatoryFramework: "EPA D4 RINs + California LCFS Carbon Credits",
    pricingBenchmarkUSDPerTonne: 1450,
    carbonIncentiveUSDPerTonne: 340,
    keyRequirements: ["EPA Part 79 Fuel Registration", "CARB Tier 2 Pathway Validation", "Third-party MRV"],
  },
  singapore_hvo: {
    id: "singapore_hvo",
    name: "Singapore (Neste Tuas HVO/SAF Hub)",
    destinationPort: "Jurong Island / Tuas",
    mandatoryFramework: "Global SAF / HVO Feedstock Offtake",
    pricingBenchmarkUSDPerTonne: 1250,
    carbonIncentiveUSDPerTonne: 180,
    keyRequirements: ["ISCC-CORSIA Compliant", "Low FFA Specification", "Continuous barge delivery"],
  },
  skorea_rfs: {
    id: "skorea_rfs",
    name: "South Korea (5.0% RFS Mandate & CNSL)",
    destinationPort: "Busan / Ulsan",
    mandatoryFramework: "RFS Biodiesel Mandate + Bio-Heavy Oil Power Standard",
    pricingBenchmarkUSDPerTonne: 1120,
    carbonIncentiveUSDPerTonne: 140,
    keyRequirements: ["K-Biofuel Standard", "Low Ash & Viscosity Specs", "Bilateral PPA contract"],
  },
};

export function calculateBiodieselExportScenario(params: {
  feedstockId: string;
  annualFeedstockThroughputTonnes: number; // 5,000 to 100,000 t/yr
  farmgatePriceVNDPerKg: number;
  corridorId: string;
  freightCostUSDPerTonne: number; // 40 to 150 USD/t
}) {
  const feedstock =
    BIODIESEL_FEEDSTOCKS.find((f) => f.id === params.feedstockId) || BIODIESEL_FEEDSTOCKS[0];
  const corridor = EXPORT_CORRIDORS[params.corridorId] || EXPORT_CORRIDORS.eu_red3;

  const neatBiodieselProducedTonnes =
    params.annualFeedstockThroughputTonnes * (feedstock.fameYieldPct / 100);

  // Feedstock raw cost
  const rawFeedstockCostUSD =
    (params.annualFeedstockThroughputTonnes * 1000 * params.farmgatePriceVNDPerKg) /
    SCENARIO_DEFAULTS.vndPerUSD;

  // Processing & transesterification OPEX (~$120/t of finished biodiesel)
  const processingCostUSD = neatBiodieselProducedTonnes * 125;

  // Logistics & Freight
  const shippingFreightCostUSD = neatBiodieselProducedTonnes * params.freightCostUSDPerTonne;

  // Total landed OPEX
  const totalLandedCostUSD = rawFeedstockCostUSD + processingCostUSD + shippingFreightCostUSD;
  const costPerTonneProductUSD = totalLandedCostUSD / neatBiodieselProducedTonnes;

  // Revenue (Base price + Carbon credit incentive)
  const grossRealizedPricePerTonneUSD =
    corridor.pricingBenchmarkUSDPerTonne + corridor.carbonIncentiveUSDPerTonne;
  const totalGrossRevenueUSD = neatBiodieselProducedTonnes * grossRealizedPricePerTonneUSD;

  const netOperatingMarginUSD = totalGrossRevenueUSD - totalLandedCostUSD;
  const netMarginPerTonneUSD = netOperatingMarginUSD / neatBiodieselProducedTonnes;

  // Carbon Abated (Tonnes CO2e)
  const energyGJ = neatBiodieselProducedTonnes * 37.8; // Average biodiesel LHV
  const fossilEmissionsTonnes = (energyGJ * 94.0) / 1000;
  const biofuelEmissionsTonnes = (energyGJ * feedstock.carbonIntensityScore) / 1000;
  const netCO2AbatedTonnes = Math.max(0, fossilEmissionsTonnes - biofuelEmissionsTonnes);

  return {
    neatBiodieselProducedTonnes: Math.round(neatBiodieselProducedTonnes),
    totalGrossRevenueUSD: Math.round(totalGrossRevenueUSD),
    totalLandedCostUSD: Math.round(totalLandedCostUSD),
    costPerTonneProductUSD: Math.round(costPerTonneProductUSD),
    grossRealizedPricePerTonneUSD: Math.round(grossRealizedPricePerTonneUSD),
    netOperatingMarginUSD: Math.round(netOperatingMarginUSD),
    netMarginPerTonneUSD: Math.round(netMarginPerTonneUSD),
    netCO2AbatedTonnes: Math.round(netCO2AbatedTonnes),
    ciScore: feedstock.carbonIntensityScore,
    marginPct: Number(((netOperatingMarginUSD / totalGrossRevenueUSD) * 100).toFixed(1)),
  };
}

/**
 * Feedstock Seasonality & Harvest Calendar
 */
export interface CropSeasonality {
  cropId: string;
  nameEn: string;
  nameVi: string;
  region: string;
  regionEn: string;
  regionVi: string;
  // Month 1 (Jan) to 12 (Dec) availability score: 0 (no supply) to 100 (peak harvest)
  monthlyAvailability: number[];
  peakMonthsEn: string;
  peakMonthsVi: string;
  storageStrategyEn: string;
  storageStrategyVi: string;
}

export const SEASONALITY_DATA: CropSeasonality[] = [
  {
    cropId: "mekong_rice_straw_husk",
    nameEn: "Mekong Delta Paddy (Straw & Husk)",
    nameVi: "Lúa Gạo ĐBSCL (Rơm & Trấu)",
    region: "Mekong River Delta (3 Seasons)",
    regionEn: "Mekong River Delta (3 Seasons)",
    regionVi: "Đồng Bằng Sông Cửu Long (3 Vụ)",
    monthlyAvailability: [95, 100, 90, 40, 30, 75, 80, 65, 30, 45, 55, 70],
    peakMonthsEn: "Jan–Mar (Winter-Spring) & Jun–Aug (Summer-Autumn)",
    peakMonthsVi: "Tháng 1–3 (Đông Xuân) & Tháng 6–8 (Hè Thu)",
    storageStrategyEn: "High-density field baling + covered regional buffer warehouses (max 15% moisture).",
    storageStrategyVi: "Cuộn rơm mật độ cao + kho đệm có mái che chống ẩm (độ ẩm < 15%).",
  },
  {
    cropId: "sugarcane_bagasse",
    nameEn: "Sugarcane Bagasse",
    nameVi: "Bã Mía Nhà Máy Đường",
    region: "North-Central & South-Central Mills",
    regionEn: "North-Central & South-Central Mills",
    regionVi: "Các Nhà Máy Miền Trung & Miền Nam",
    monthlyAvailability: [100, 100, 95, 85, 40, 0, 0, 0, 0, 0, 40, 90],
    peakMonthsEn: "Nov–Apr (Active Crushing Campaign)",
    peakMonthsVi: "Tháng 11–Tháng 4 (Niên vụ ép mía chính)",
    storageStrategyEn: "Compacted outdoor bagasse piles with surface anaerobic crusting for off-season CHP.",
    storageStrategyVi: "Đánh đống bã mía nén chặt tạo lớp vỏ yếm khí bảo quản cho mùa ngưng ép.",
  },
  {
    cropId: "cassava_roots",
    nameEn: "Cassava Roots & Peels",
    nameVi: "Củ Sắn & Vỏ Sắn",
    region: "Southeast & Central Highlands",
    regionEn: "Southeast & Central Highlands",
    regionVi: "Đông Nam Bộ & Tây Nguyên",
    monthlyAvailability: [90, 95, 100, 80, 40, 20, 15, 15, 25, 45, 70, 85],
    peakMonthsEn: "Nov–Apr (Dry Season Starch Harvest)",
    peakMonthsVi: "Tháng 11–Tháng 4 (Mùa thu hoạch củ sắn chính)",
    storageStrategyEn: "Concrete drying yards, automated chip turners, silage storage for peel residue.",
    storageStrategyVi: "Sân phơi bê tông, máy đảo sắn tự động, ủ chua vi sinh đối với vỏ sắn.",
  },
  {
    cropId: "coffee_husk",
    nameEn: "Coffee Husk & Parchment",
    nameVi: "Vỏ Cà Phê & Vỏ Trấu Cà Phê",
    region: "Central Highlands (Tay Nguyen)",
    regionEn: "Central Highlands",
    regionVi: "Vùng Tây Nguyên",
    monthlyAvailability: [75, 40, 15, 0, 0, 0, 0, 0, 0, 45, 95, 100],
    peakMonthsEn: "Oct–Jan (Coffee Harvesting & Wet/Dry Milling)",
    peakMonthsVi: "Tháng 10–Tháng 1 (Mùa hái và sơ chế cà phê Tây Nguyên)",
    storageStrategyEn: "Dry storage silos, briquetting at processing mill sites.",
    storageStrategyVi: "Silo chứa khô và ép viên nén ngay tại cơ sở chế biến.",
  },
  {
    cropId: "waste_oils_manure",
    nameEn: "UCO, Pangasius Fat & Livestock Manure",
    nameVi: "Dầu UCO, Mỡ Cá Tra & Chất Thải Chăn Nuôi",
    region: "Nationwide & Mekong Catfish Hubs",
    regionEn: "Nationwide & Mekong Catfish Hubs",
    regionVi: "Toàn Quốc & Cụm Cá Tra ĐBSCL",
    monthlyAvailability: [90, 85, 95, 95, 95, 95, 95, 95, 95, 95, 100, 100],
    peakMonthsEn: "Year-Round Continuous Generation (slight Q4 festive peak)",
    peakMonthsVi: "Phát sinh liên tục quanh năm (đạt đỉnh nhẹ vào dịp lễ Tết Quý 4)",
    storageStrategyEn: "Heated stainless tanks for fish fat; intermediate IBC bulk containers for UCO.",
    storageStrategyVi: "Bồn inox có gia nhiệt duy trì cho mỡ cá; bồn IBC tiêu chuẩn cho dầu ăn thải.",
  },
];

/**
 * FID Bankability & Safeguard Diagnostic Scoring
 */
export interface BankabilityQuestion {
  id: string;
  category: "feedstock" | "safeguard" | "commercial" | "esia";
  weight: number; // Percentage weight
  titleEn: string;
  titleVi: string;
  descriptionEn: string;
  descriptionVi: string;
  options: {
    score: number; // 0 to 100
    labelEn: string;
    labelVi: string;
    riskNoteEn: string;
    riskNoteVi: string;
  }[];
}

export const BANKABILITY_QUESTIONS: BankabilityQuestion[] = [
  {
    id: "feedstock_radius",
    category: "feedstock",
    weight: 15,
    titleEn: "1. Supply Radius & Logistics Friction",
    titleVi: "1. Bán Kính Thu Gom & Ma Sát Vận Tải",
    descriptionEn: "Collection radius between biomass sourcing points and energy plant site.",
    descriptionVi: "Bán kính thu gom từ nguồn nông hộ/nhà máy đến điểm tiêu thụ.",
    options: [
      {
        score: 100,
        labelEn: "< 20 km (Captive on-site mill or waterway barge corridor)",
        labelVi: "< 20 km (Tận dụng tại chỗ nhà máy hoặc sà lan đường thủy)",
        riskNoteEn: "Minimal logistics cost; high supply security.",
        riskNoteVi: "Chi phí vận chuyển tối thiểu; an ninh nguồn cung rất cao.",
      },
      {
        score: 75,
        labelEn: "20–40 km (Road hauling with signed cooperative aggregation)",
        labelVi: "20–40 km (Vận tải đường bộ qua hợp tác xã có hợp đồng)",
        riskNoteEn: "Acceptable economics under stable diesel prices.",
        riskNoteVi: "Hiệu quả kinh tế tốt nếu giá dầu diesel ổn định.",
      },
      {
        score: 35,
        labelEn: "> 50 km (Dispersed open-market spot buying)",
        labelVi: "> 50 km (Thu mua trôi nổi phân tán trên thị trường)",
        riskNoteEn: "High vulnerability to seasonal freight spikes and moisture penalties.",
        riskNoteVi: "Dễ bị tổn thương khi giá cước biến động và độ ẩm cao.",
      },
    ],
  },
  {
    id: "soil_safeguard",
    category: "safeguard",
    weight: 15,
    titleEn: "2. Soil Carbon & Field Retention Safeguards",
    titleVi: "2. Khung An Toàn Mùn Đất & Hoàn Trả Dinh Dưỡng",
    descriptionEn: "Field residue retention limits to prevent soil degradation (straw/trash).",
    descriptionVi: "Định mức giữ lại rơm rạ/phụ phẩm trên đồng để chống suy kiệt đất.",
    options: [
      {
        score: 100,
        labelEn: "Enforced > 40% soil retention + biochar/digestate organic return protocol",
        labelVi: "Giữ lại > 40% phụ phẩm tại ruộng + bón trả biochar/bùn vi sinh",
        riskNoteEn: "Full compliance with MARD 1M-Ha Low-Emission Rice MRV standards.",
        riskNoteVi: "Đáp ứng chuẩn mực giảm phát thải MRV của Bộ Nông nghiệp.",
      },
      {
        score: 60,
        labelEn: "Partial soil recycling without certified MRV accounting",
        labelVi: "Có hoàn trả một phần nhưng chưa có quy trình chứng nhận MRV",
        riskNoteEn: "Moderate long-term soil depletion risk.",
        riskNoteVi: "Nguy cơ suy giảm dinh dưỡng đất trong dài hạn.",
      },
      {
        score: 15,
        labelEn: "100% field biomass extraction with zero organic restitution",
        labelVi: "Thu gom triệt để 100% không hoàn trả mùn hữu cơ",
        riskNoteEn: "Severe agricultural sustainability and ESG compliance red flag.",
        riskNoteVi: "Vi phạm nghiêm trọng tiêu chuẩn ESG và làm thoái hóa đất.",
      },
    ],
  },
  {
    id: "offtake_structure",
    category: "commercial",
    weight: 20,
    titleEn: "3. Power & Heat Offtake Bankability (DPPA / FiT / Export)",
    titleVi: "3. Tính Khả Thi Hợp Đồng Bao Tiêu Điện & Nhiệt",
    descriptionEn: "Offtake contractual security under PDP8 and Decrees 57/58/243.",
    descriptionVi: "Cơ chế hợp đồng mua bán điện/nhiệt theo Quy hoạch điện VIII và DPPA.",
    options: [
      {
        score: 100,
        labelEn: "Direct DPPA Private-Wire to industrial off-taker + captive steam sales",
        labelVi: "Hợp đồng DPPA đường dây trực tiếp cho KCN + bán hơi công nghiệp",
        riskNoteEn: "Premium creditworthiness and high revenue diversification.",
        riskNoteVi: "Xếp hạng tín nhiệm cao và đa dạng hóa nguồn thu vững chắc.",
      },
      {
        score: 80,
        labelEn: "Synthetic Grid DPPA with creditworthy corporate buyer or ISCC Export",
        labelVi: "DPPA qua lưới điện quốc gia với khách hàng lớn hoặc xuất khẩu ISCC",
        riskNoteEn: "Stable bankability; subject to EVN wheeling tariff.",
        riskNoteVi: "Tính khả thi cao; chịu phí truyền tải EVN quy định.",
      },
      {
        score: 45,
        labelEn: "Sole reliance on single-buyer EVN standard FiT without steam revenue",
        labelVi: "Phụ thuộc 100% vào biểu giá FiT của EVN và không có bán nhiệt",
        riskNoteEn: "Vulnerable to grid curtailment and single-tariff margin squeeze.",
        riskNoteVi: "Rủi ro nghẽn lưới và biên lợi nhuận mỏng.",
      },
    ],
  },
  {
    id: "boiler_technology",
    category: "esia",
    weight: 15,
    titleEn: "4. Boiler Technology & Flue-Gas ESIA Compliance",
    titleVi: "4. Công Nghệ Lò Hơi & Xử Lý Khí Thải Theo ESIA",
    descriptionEn: "Combustion system matching fuel chemistry (silica/alkali) & emission limits.",
    descriptionVi: "Hệ thống đốt phù hợp hóa tính nhiên liệu và kiểm soát bụi mịn PM2.5.",
    options: [
      {
        score: 100,
        labelEn: "Fluidized Bed (BFB/CFB) with ESP + Baghouse filter & Pozzolanic ash reuse",
        labelVi: "Tầng sôi (BFB/CFB) có lọc bụi tĩnh điện ESP + tái chế tro bay làm xi măng",
        riskNoteEn: "Full compliance with GIZ/MOIT ESIA handbook; zero ash landfill liability.",
        riskNoteVi: "Đạt chuẩn Sổ tay ĐTM của GIZ/Bộ Công Thương; tái chế 100% tro xỉ.",
      },
      {
        score: 65,
        labelEn: "Standard Stoker Grate with wet scrubber and partial ash recycling",
        labelVi: "Ghi xích truyền thống kèm tháp dập bụi ướt và tái chế một phần",
        riskNoteEn: "Higher particulate risk on variable moisture biomass.",
        riskNoteVi: "Nguy cơ vượt chỉ số bụi khi độ ẩm sinh khối dao động.",
      },
      {
        score: 20,
        labelEn: "Low-pressure uncertified boiler without continuous emissions monitoring (CEMS)",
        labelVi: "Lò hơi áp suất thấp không có hệ thống quan trắc khí thải tự động CEMS",
        riskNoteEn: "High probability of environmental permitting shutdown.",
        riskNoteVi: "Nguy cơ cao bị đình chỉ hoạt động do không đạt chuẩn môi trường.",
      },
    ],
  },
  {
    id: "feedstock_contracts",
    category: "commercial",
    weight: 20,
    titleEn: "5. Long-term Feedstock Contracting & Price Indexation",
    titleVi: "5. Hợp Đồng Cung Cấp Sinh Khối & Cơ Chế Chỉ Số Giá",
    descriptionEn: "Legally binding supply security with cooperatives or mills.",
    descriptionVi: "Hợp đồng cung ứng dài hạn có ràng buộc với nhà máy/HTX.",
    options: [
      {
        score: 100,
        labelEn: "5-10 year indexed contracts with penalty-backed supply guarantees",
        labelVi: "Hợp đồng 5-10 năm theo chỉ số giá có điều khoản bồi thường vi phạm",
        riskNoteEn: "Bankable security satisfying international debt financing.",
        riskNoteVi: "Đạt chuẩn thẩm định tín dụng của các ngân hàng quốc tế.",
      },
      {
        score: 60,
        labelEn: "Annual bilateral agreements with local aggregators",
        labelVi: "Hợp đồng thương thảo từng năm với thương lái địa phương",
        riskNoteEn: "Subject to annual spot-price renegotiation shocks.",
        riskNoteVi: "Rủi ro ép giá và biến động nguồn cung khi mùa vụ thay đổi.",
      },
      {
        score: 10,
        labelEn: "100% spot market purchasing at gate",
        labelVi: "Mua trôi nổi 100% tại cổng nhà máy theo giá ngày",
        riskNoteEn: "Unbankable; severe project default risk in high-price years.",
        riskNoteVi: "Không đủ điều kiện vay vốn; rủi ro phá sản rất cao.",
      },
    ],
  },
  {
    id: "farmer_benefit_sharing",
    category: "safeguard",
    weight: 15,
    titleEn: "6. Local Community & Cooperative Benefit-Sharing",
    titleVi: "6. Chia Sẻ Lợi Ích Với Nông Hộ & Hợp Tác Xã",
    descriptionEn: "Ensuring rural stakeholders participate in value creation.",
    descriptionVi: "Đảm bảo cộng đồng nông thôn cùng hưởng lợi từ chuỗi giá trị năng lượng.",
    options: [
      {
        score: 100,
        labelEn: "Equity/dividend participation for co-ops + organic fertilizer rebate loop",
        labelVi: "Hợp tác xã góp vốn/hưởng cổ tức + hoàn trả phân bón hữu cơ giá ưu đãi",
        riskNoteEn: "Robust social license to operate; guaranteed farmer loyalty.",
        riskNoteVi: "Nhận được sự đồng thuận xã hội cao; liên kết nông dân bền vững.",
      },
      {
        score: 65,
        labelEn: "Transparent premium pricing paid directly to farmer cooperatives",
        labelVi: "Chi trả giá thưởng minh bạch trực tiếp cho các hợp tác xã",
        riskNoteEn: "Good local alignment.",
        riskNoteVi: "Tạo được mối quan hệ tốt với vùng nguyên liệu.",
      },
      {
        score: 25,
        labelEn: "Middleman monopsony without local value retention",
        labelVi: "Thu mua qua trung gian ép giá, không có chính sách hỗ trợ nông dân",
        riskNoteEn: "High farmer attrition and raw material poaching by competitors.",
        riskNoteVi: "Dễ bị mất vùng nguyên liệu vào tay đối thủ cạnh tranh.",
      },
    ],
  },
];

export function calculateBankabilityScore(selectedAnswers: Record<string, number>) {
  let totalWeightedScore = 0;
  let totalWeight = 0;

  BANKABILITY_QUESTIONS.forEach((q) => {
    const selectedIdx = selectedAnswers[q.id] ?? 0;
    const score = q.options[selectedIdx]?.score ?? 50;
    totalWeightedScore += (score * q.weight);
    totalWeight += q.weight;
  });

  const finalScore = Math.round(totalWeightedScore / totalWeight);

  let readinessTier: "FID Ready (Bankable)" | "High Feasibility - Minor Gaps" | "Moderate Risk (Action Required)" | "Sub-Bankable (Major Restructuring Needed)";
  let tierVi: string;
  let statusColor: string;

  if (finalScore >= 85) {
    readinessTier = "FID Ready (Bankable)";
    tierVi = "Sẵn Sàng Ra Quyết Định Đầu Tư (FID - Đạt Chuẩn Ngân Hàng)";
    statusColor = "#7d9d68"; // Cane green
  } else if (finalScore >= 70) {
    readinessTier = "High Feasibility - Minor Gaps";
    tierVi = "Tính Khả Thi Cao - Cần Hoàn Thiện Một Số Hạng Mục";
    statusColor = "#e3a72f"; // Gold
  } else if (finalScore >= 50) {
    readinessTier = "Moderate Risk (Action Required)";
    tierVi = "Rủi Ro Trung Bình - Cần Khắc Phục Ma Sát & Hợp Đồng";
    statusColor = "#c76d43"; // Clay
  } else {
    readinessTier = "Sub-Bankable (Major Restructuring Needed)";
    tierVi = "Chưa Đạt Chuẩn Ngân Hàng - Cần Tái Cấu Trúc Dự Án";
    statusColor = "#e53e3e"; // Red
  }

  return {
    finalScore,
    readinessTier,
    tierVi,
    statusColor,
  };
}

/**
 * Boiler Technology Taxonomy & ESIA Standards
 */
export interface BoilerTechnology {
  id: string;
  name: string;
  vietnameseName: string;
  bestFeedstocks: string[];
  bestFeedstocksEn: string[];
  bestFeedstocksVi: string[];
  electricalEfficiencyRange: string;
  moistureTolerancePct: number;
  capexUSDPerKW: string;
  slaggingRisk: "Low" | "Moderate" | "High";
  slaggingRiskEn: "Low" | "Moderate" | "High";
  slaggingRiskVi: "Thấp" | "Trung bình" | "Cao";
  ashReuseSuitability: string;
  ashReuseSuitabilityEn: string;
  ashReuseSuitabilityVi: string;
  summaryEn: string;
  summaryVi: string;
}

export const BOILER_TECHNOLOGIES: BoilerTechnology[] = [
  {
    id: "bfb",
    name: "Bubbling Fluidized Bed (BFB)",
    vietnameseName: "Lò Hơi Tầng Sôi Bọt (BFB)",
    bestFeedstocks: ["Rice Husk", "Coffee Husk", "Chopped Straw", "Wood Pellets"],
    bestFeedstocksEn: ["Rice Husk", "Coffee Husk", "Chopped Straw", "Wood Pellets"],
    bestFeedstocksVi: ["Vỏ trấu", "Vỏ cà phê", "Rơm băm nhỏ", "Viên nén gỗ"],
    electricalEfficiencyRange: "25% – 29%",
    moistureTolerancePct: 45,
    capexUSDPerKW: "$1,400 – $1,800",
    slaggingRisk: "Low",
    slaggingRiskEn: "Low",
    slaggingRiskVi: "Thấp",
    ashReuseSuitability: "High (Silica-rich fly ash for high-strength cement & refractory bricks)",
    ashReuseSuitabilityEn: "High (Silica-rich fly ash for high-strength cement & refractory bricks)",
    ashReuseSuitabilityVi: "Rất cao (Tro bay giàu Silica sản xuất xi măng cường độ cao và gạch chịu lửa)",
    summaryEn:
      "Ideal for fine, abrasive agricultural residues like rice husk and coffee parchment. Low bed temperature prevents alkali silica clinkering.",
    summaryVi:
      "Tối ưu cho phụ phẩm dạng hạt mịn, mài mòn cao như vỏ trấu và vỏ cà phê. Nhiệt độ buồng đốt thấp tránh đóng xỉ kiềm.",
  },
  {
    id: "cfb",
    name: "Circulating Fluidized Bed (CFB)",
    vietnameseName: "Lò Hơi Tầng Sôi Tuần Hoàn (CFB)",
    bestFeedstocks: ["Multi-fuel blends", "Bagasse", "Rice Straw", "Coal Co-firing"],
    bestFeedstocksEn: ["Multi-fuel blends", "Bagasse", "Rice Straw", "Coal Co-firing"],
    bestFeedstocksVi: ["Nhiên liệu phối trộn", "Bã mía", "Rơm rạ", "Đốt kèm than đá"],
    electricalEfficiencyRange: "28% – 33%",
    moistureTolerancePct: 50,
    capexUSDPerKW: "$1,700 – $2,200",
    slaggingRisk: "Low",
    slaggingRiskEn: "Low",
    slaggingRiskVi: "Thấp",
    ashReuseSuitability: "Moderate to High (Requires in-situ desulfurization gypsum separation)",
    ashReuseSuitabilityEn: "Moderate to High (Requires in-situ desulfurization gypsum separation)",
    ashReuseSuitabilityVi: "Trung bình đến Cao (Cần tách thạch cao khử lưu huỳnh tại chỗ)",
    summaryEn:
      "Superior choice for large utility-scale biomass plants (>30 MW). Handles heterogeneous fuel mixes with high combustion efficiency.",
    summaryVi:
      "Lựa chọn hàng đầu cho nhà máy điện sinh khối công suất lớn (>30 MW). Đốt hỗn hợp nhiều loại nhiên liệu với hiệu suất vượt trội.",
  },
  {
    id: "stoker_grate",
    name: "High-Pressure Travelling Grate",
    vietnameseName: "Lò Ghi Xích Cao Áp (Travelling Grate)",
    bestFeedstocks: ["Sugarcane Bagasse", "Wood Chips", "Palm Shells", "Bulky Biomass"],
    bestFeedstocksEn: ["Sugarcane Bagasse", "Wood Chips", "Palm Shells", "Bulky Biomass"],
    bestFeedstocksVi: ["Bã mía", "Dăm gỗ", "Gáo cọ", "Sinh khối dạng thô"],
    electricalEfficiencyRange: "22% – 26%",
    moistureTolerancePct: 55,
    capexUSDPerKW: "$1,100 – $1,500",
    slaggingRisk: "Moderate",
    slaggingRiskEn: "Moderate",
    slaggingRiskVi: "Trung bình",
    ashReuseSuitability: "Moderate (Bottom ash utilized for agriculture soil conditioning)",
    ashReuseSuitabilityEn: "Moderate (Bottom ash utilized for agriculture soil conditioning)",
    ashReuseSuitabilityVi: "Trung bình (Tro đáy tận dụng cải tạo đất nông nghiệp và hoàn trả mùn)",
    summaryEn:
      "Standard industrial workhorse for sugar mill cogeneration (>=65 bar). Simple, robust operation with high moisture bagasse straight from mills.",
    summaryVi:
      "Công nghệ kinh điển tại các nhà máy mía đường (áp suất >=65 bar). Vận hành bền bỉ với bã mía độ ẩm cao ngay sau ép.",
  },
];
