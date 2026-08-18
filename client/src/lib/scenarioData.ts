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
  dominantPathway: "Rice System" | "Sugar System" | "Livestock System" | "Cassava System" | "Regional Residues" | "Wood & Forestry";
  accentColor: string;
  provinces: string[];
  grossPotentialGWh: number;
  deliverableShare: number; // Aggregate percentage considered commercially deliverable under safeguards
  sustainableRecoveryDetailsEn: string;
  sustainableRecoveryDetailsVi: string;
  keyInfrastructure: string;
  diversifiedSupplyChainEn: string;
  diversifiedSupplyChainVi: string;
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
    deliverableShare: 32, // Weighted average of captive husk (90%) and field straw (35%)
    sustainableRecoveryDetailsEn: "Differentiated recovery: 90% for centralized rice mill husk; 35% for field straw (65% retained on field for soil organic carbon & MARD 1M-ha MRV). 85% for fish tallow.",
    sustainableRecoveryDetailsVi: "Tỷ lệ bền vững phân hóa: 90% vỏ trấu thu gom tập trung tại nhà máy xay xát; 35% rơm rạ thu gom cơ giới (65% giữ lại đồng ruộng bảo vệ dinh dưỡng đất & MRV Đề án 1 triệu ha). 85% mỡ cá tra.",
    keyInfrastructure: "High-density rice milling corridors along waterways, baler logistics co-ops, husk briquetting units, heated tallow bulk tanks, river barges",
    diversifiedSupplyChainEn: "Inland waterway barges (500–1,500t), commercial rice milling clusters with husk chutes, pangasius catfish rendering plants, mechanized straw baler fleets.",
    diversifiedSupplyChainVi: "Sà lan đường thủy nội địa (500–1.500 tấn), cụm xay xát lúa gạo quy mô lớn có phễu gom trấu tự động, nhà máy chế biến mỡ cá tra, đội máy cuộn rơm cơ giới hóa.",
    svgCoords: { x: 145, y: 595 },
    title: "Rice processing + straw cascades",
    body: "Start at river-connected mills with husk-fired heat and CHP. Add straw only when cooperatives, soil retention rules, bale storage, and nearby buyers are established.",
    tags: ["Rice husk", "Rice straw", "Catfish tallow", "Waterway barging", "Circularity"],
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
    sustainableRecoveryDetailsEn: "Differentiated recovery: 95% captive on-site bagasse collection at sugar mills; 65% exportable surplus after meeting internal factory steam/power demand.",
    sustainableRecoveryDetailsVi: "Tỷ lệ bền vững: 95% bã mía thu hồi nội bộ tại nhà máy đường; 65% năng lượng thặng dư phát lên lưới sau khi đáp ứng hơi và điện tự dùng.",
    keyInfrastructure: "Centralized sugar milling complexes with grid-connected bagasse steam turbines, bagasse drying/baling yards",
    diversifiedSupplyChainEn: "On-site conveyor belts, bagasse storage sheds with fire protection, high-pressure steam headers (>=65 bar), EVN 110kV grid substations.",
    diversifiedSupplyChainVi: "Băng tải cấp liệu khép kín, kho chứa bã mía có hệ thống PCCC, đường ống hơi cao áp (>=65 bar), trạm biến áp 110kV đấu nối lưới điện quốc gia.",
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
    sustainableRecoveryDetailsEn: "Differentiated recovery: 75% for concentrated industrial swine/dairy farms (>1,000 head); 20% for dispersed smallholders. Regional average deliverable: 45%.",
    sustainableRecoveryDetailsVi: "Tỷ lệ bền vững: 75% trang trại chăn nuôi công nghiệp tập trung (>1.000 con); 20% nông hộ phân tán. Mức khả thi bình quân toàn vùng: 45%.",
    keyInfrastructure: "Industrial swine and dairy farm clusters, covered lagoon biodigesters, biomethane upgrading skids, digestate biofertilizer plants",
    diversifiedSupplyChainEn: "HDPE covered lagoon digesters, desulfurization scrubbers, vacuum tankers, organic biofertilizer pelletizing and composting yards.",
    diversifiedSupplyChainVi: "Hầm biogas phủ bạt HDPE quy mô lớn, hệ thống khử H2S, xe bồn hút phân chuyên dụng, nhà máy ép viên phân bón hữu cơ vi sinh.",
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
    sustainableRecoveryDetailsEn: "Differentiated recovery: 80% dry chip conversion efficiency; 38% maximum allocation to fuel ethanol due to food/industrial starch export competition.",
    sustainableRecoveryDetailsVi: "Tỷ lệ bền vững: 80% hiệu suất thu hồi sắn lát khô; 38% trần phân bổ tối đa cho cồn sinh học do cạnh tranh nguyên liệu xuất khẩu tinh bột và thức ăn chăn nuôi.",
    keyInfrastructure: "Commercial concrete drying yards, starch extraction plants, bioethanol distillation plants (Dung Quat, Dai Viet, Binh Phuoc), vinasse biogas reactors",
    diversifiedSupplyChainEn: "Truck weighing stations, multi-hectare sun-drying grounds, chip storage silos, anaerobic IC/UASB reactors treating high-COD vinasse.",
    diversifiedSupplyChainVi: "Trạm cân xe tải, sân phơi bê tông quy mô hàng chục hecta, silo lưu trữ sắn lát khô, bể phản ứng kỵ khí IC/UASB xử lý nước thải hèm rượu giàu COD.",
    svgCoords: { x: 210, y: 440 },
    title: "Cassava roots + peel / biogas co-products",
    body: "Fuel ethanol production anchor. Demands high plant capacity utilization, contract farming price stability, and recovery of peel waste and vinasse into biogas.",
    tags: ["Dried Cassava Chips", "Fuel Ethanol E10", "Vinasse Biogas", "Starch Trade"],
    image: "/images/rice-husk-mill.svg",
  },
  {
    id: "highlands-perennial",
    number: "05",
    name: "Central Highlands Agro & Wood Residues",
    vietnameseName: "Cao Nguyên Phụ Phẩm Cây Công Nghiệp & Gỗ",
    zone: "Central Highlands & South Central",
    dominantPathway: "Regional Residues",
    accentColor: "#8a6844",
    provinces: ["Dak Lak", "Lam Dong", "Dak Nong", "Gia Lai", "Binh Dinh"],
    grossPotentialGWh: 6100,
    deliverableShare: 40,
    sustainableRecoveryDetailsEn: "Differentiated recovery: 85% for sawmill wood shavings/sawdust into export pellets; 60% for coffee dry-mill parchment; 40% for field coffee husks.",
    sustainableRecoveryDetailsVi: "Tỷ lệ bền vững: 85% mùn cưa/dăm bào từ xưởng chế biến gỗ ép viên nén xuất khẩu; 60% vỏ thóc cà phê tại trạm chế biến khô; 40% vỏ quả tươi.",
    keyInfrastructure: "Coffee dry-milling hubs, wood pelleting factories, decentralized industrial heat boilers, seaports for pellet export (Quy Nhon, Dung Quat)",
    diversifiedSupplyChainEn: "Rotary drum dryers, ring-die pellet presses, automated big-bag packaging, flatbed logistics to deepwater container ports.",
    diversifiedSupplyChainVi: "Máy sấy thùng quay, máy ép viên khuôn vòng công suất lớn, dây chuyền đóng bao Jumbo tự động, xe đầu kéo vận chuyển ra cảng nước sâu (Quy Nhơn, Dung Quất).",
    svgCoords: { x: 250, y: 410 },
    title: "Coffee pulp, parchment & wood pellets",
    body: "Dense regional processing nodes supporting decentralized industrial process heat, organic compost blending, and export pellet production.",
    tags: ["Wood Pellets", "Sawdust Residues", "Coffee Husk", "Parchment", "Industrial Heat"],
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
    provinces: ["Thai Binh", "Nam Dinh", "Hai Duong", "Ninh Binh", "Phu Tho"],
    grossPotentialGWh: 4800,
    deliverableShare: 28,
    sustainableRecoveryDetailsEn: "Differentiated recovery: 90% for rice husk; 30% for winter rice straw (smoke reduction priority); 95% for industrial paper mill black liquor in Phu Tho (Bai Bang).",
    sustainableRecoveryDetailsVi: "Tỷ lệ bền vững: 90% vỏ trấu tại nhà máy; 30% rơm vụ đông (ưu tiên chống đốt đồng); 95% dịch đen công nghiệp thu hồi tại nhà máy giấy Bãi Bằng (Phú Thọ).",
    keyInfrastructure: "Intensive 2-season paddy milling centers, mushroom cultivation co-ops, biomass briquetting plants, paper mill recovery boilers",
    diversifiedSupplyChainEn: "Hydraulic briquetting presses, straw baling cooperatives, dedicated chemical recovery boilers with ESP filters.",
    diversifiedSupplyChainVi: "Máy ép củi trấu/mùn cưa thủy lực, hợp tác xã thu gom cuộn rơm, lò hơi thu hồi hóa chất dịch đen có hệ thống lọc bụi tĩnh điện ESP.",
    svgCoords: { x: 200, y: 145 },
    title: "Northern intensive paddy & briquetting",
    body: "Focus on husk briquetting for ceramic/brick kilns and controlled straw retrieval to replace high-emission open field burning in winter cycles.",
    tags: ["Winter Straw Management", "Husk Briquettes", "Paper Black Liquor", "Clean Air", "Industrial Steam"],
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
 * National Power Development Plan 8 (PDP8 / QHĐ 8) Biomass Targets
 * Reference: Decision 500/QD-TTg & Implementation Plan Decision 262/QD-TTg
 */
export const PDP8_TARGETS = {
  biomassPower2030MW: 1227, // Biomass grid-connected electricity target by 2030
  biomassPower2050MW: 4000, // Biomass power target by 2050
  wasteToEnergy2030MW: 600, // Waste-to-energy electricity target by 2030
  wasteToEnergy2050MW: 1800, // Waste-to-energy electricity target by 2050
  biomassCoFiringPct2030: 20, // Target for biomass co-firing in coal power plants
};

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

  // PDP8 (QHĐ 8) National Target Contribution
  const pdp8Share2030Pct = Number(
    ((electricalCapacityMW / PDP8_TARGETS.biomassPower2030MW) * 100).toFixed(2),
  );
  const pdp8Share2050Pct = Number(
    ((electricalCapacityMW / PDP8_TARGETS.biomassPower2050MW) * 100).toFixed(2),
  );

  return {
    electricalCapacityMW: Number(electricalCapacityMW.toFixed(1)),
    grossElectricityGWh: Math.round(grossElectricityGWh),
    grossUsefulHeatTJ: Math.round(grossUsefulHeatGJ / 1000),
    displacedCoalTonnes,
    totalCO2AvoidedKt: displacedGridCO2Kt + displacedThermalCO2Kt,
    avoidedPM25Tonnes,
    pdp8Target2030MW: PDP8_TARGETS.biomassPower2030MW,
    pdp8Target2050MW: PDP8_TARGETS.biomassPower2050MW,
    pdp8Share2030Pct,
    pdp8Share2050Pct,
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

  // PDP8 (QHĐ 8) National Target Contribution
  const pdp8Share2030Pct = Number(
    ((params.capacityMW / PDP8_TARGETS.biomassPower2030MW) * 100).toFixed(2),
  );
  const pdp8Share2050Pct = Number(
    ((params.capacityMW / PDP8_TARGETS.biomassPower2050MW) * 100).toFixed(2),
  );

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
    pdp8Target2030MW: PDP8_TARGETS.biomassPower2030MW,
    pdp8Target2050MW: PDP8_TARGETS.biomassPower2050MW,
    pdp8Share2030Pct,
    pdp8Share2050Pct,
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

/**
 * Evidence Base & Public Reference Archive
 */
export interface EvidenceReference {
  id: string;
  category: "guideline" | "atlas" | "academic" | "policy" | "market";
  titleEn: string;
  titleVi: string;
  authorEn: string;
  authorVi: string;
  year: string;
  publicationTypeEn: string;
  publicationTypeVi: string;
  descriptionEn: string;
  descriptionVi: string;
  pdfUrl?: string; // Static URL served directly from /references/*.pdf
  pdfSizeBytes?: number;
  pdfSizeFormatted?: string;
  sourceUrl?: string; // Official web source / DOI / Legal database
  sourceDomain?: string;
  isCoreDataset?: boolean;
}

export const EVIDENCE_REFERENCES: EvidenceReference[] = [
  {
    id: "wb_biomass_atlas_2018",
    category: "atlas",
    titleEn: "Final Report on Biomass Atlas for Vietnam: Biomass Resource Mapping",
    titleVi: "Báo cáo Atlas Tài nguyên Sinh khối Việt Nam (Bản đồ phân bố & Tiềm năng kỹ thuật)",
    authorEn: "World Bank / ESMAP & MOIT (EREA, GIZ & Fraunhofer)",
    authorVi: "Ngân hàng Thế giới (World Bank) / ESMAP & Bộ Công Thương (EREA, GIZ, Fraunhofer)",
    year: "2018",
    publicationTypeEn: "National Spatial Resource Atlas (141 Pages)",
    publicationTypeVi: "Atlas Tài nguyên Quốc gia (141 Trang)",
    descriptionEn: "Baseline national spatial mapping of agricultural crop residues, technical recoverability factors, and farmer willingness-to-sell supply curves.",
    descriptionVi: "Khảo sát bản đồ không gian tài nguyên phụ phẩm cây trồng toàn quốc, hệ số thu hồi kỹ thuật và đường cong cung ứng theo giá thị trường.",
    pdfUrl: "/references/04-Final-Report-on-Biomass-Atlas-for-Vietnam_1.pdf",
    pdfSizeBytes: 14978187,
    pdfSizeFormatted: "15.0 MB",
    sourceUrl: "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/858451537877239062",
    sourceDomain: "documents.worldbank.org",
    isCoreDataset: true,
  },
  {
    id: "giz_bioenergy_handbook",
    category: "guideline",
    titleEn: "Bioenergy Project Development Handbook for Vietnam",
    titleVi: "Sổ tay Hướng dẫn Phát triển Dự án Năng lượng Sinh khối tại Việt Nam",
    authorEn: "GIZ Energy Support Programme (ESP) & EREA / MOIT",
    authorVi: "Chương trình Hỗ trợ Năng lượng GIZ (ESP) & Cục Điện lực và Năng lượng Tái tạo (EREA / MOIT)",
    year: "2021",
    publicationTypeEn: "Project Development & Financial Modeling Manual (102 Pages)",
    publicationTypeVi: "Cẩm nang Kỹ thuật & Mô hình Tài chính (102 Trang)",
    descriptionEn: "Authoritative practical guidelines on project structuring, FID bankability criteria, feedstock contracting, grid interconnection, and revenue modeling.",
    descriptionVi: "Hướng dẫn thực hành về cấu trúc dự án thương mại, tiêu chuẩn khả năng vay vốn FID, hợp đồng bao tiêu phụ phẩm và hòa lưới điện EVN.",
    pdfUrl: "/references/03-So-tay-huong-dan-Du-an-Nang-luong-sinh-hoc_1.pdf",
    pdfSizeBytes: 5888650,
    pdfSizeFormatted: "5.9 MB",
    sourceUrl: "https://gizenergy.org.vn",
    sourceDomain: "gizenergy.org.vn",
    isCoreDataset: true,
  },
  {
    id: "giz_esia_guidelines",
    category: "guideline",
    titleEn: "Environmental & Social Impact Assessment (ESIA) Guidelines for Biomass Power in Vietnam",
    titleVi: "Sổ tay Hướng dẫn Đánh giá Tác động Môi trường và Xã hội (ESIA) cho Dự án Điện Sinh khối",
    authorEn: "GIZ ESP & Ministry of Industry and Trade (MOIT)",
    authorVi: "GIZ ESP & Bộ Công Thương (MOIT)",
    year: "2021",
    publicationTypeEn: "ESIA Standards & Flue-Gas Compliance Manual (76 Pages)",
    publicationTypeVi: "Quy chuẩn ESIA & Kiểm soát Khí thải (76 Trang)",
    descriptionEn: "National benchmark for biomass boiler emission thresholds (ESP, baghouse filters, NOx/SOx limits), ash handling, and stakeholder engagement.",
    descriptionVi: "Quy chuẩn đánh giá phát thải lò hơi sinh khối (hệ thống lọc bụi tĩnh điện ESP, lọc túi, SOx/NOx), tái sử dụng tro xỉ và an sinh cộng đồng.",
    pdfUrl: "/references/02-So-tay-huong-dan-Danh-gia-tac-dong-moi-truong-va-xa-hoi-cho-du-an-dien-sinh-khoi-tai-Viet-Nam_1.pdf",
    pdfSizeBytes: 3410706,
    pdfSizeFormatted: "3.4 MB",
    sourceUrl: "https://gizenergy.org.vn",
    sourceDomain: "gizenergy.org.vn",
    isCoreDataset: true,
  },
  {
    id: "azec_bioenergy_supply",
    category: "market",
    titleEn: "Development of the Bioenergy Supply Chain in AZEC Partner Countries (Vietnam Chapter)",
    titleVi: "Phát triển Chuỗi Cung ứng Năng lượng Sinh học tại các Nước Đối tác AZEC (Chuyên đề Việt Nam)",
    authorEn: "ERIA (Economic Research Institute for ASEAN and East Asia) & IEEJ",
    authorVi: "Viện Nghiên cứu Kinh tế ASEAN và Đông Á (ERIA) & IEEJ",
    year: "2025",
    publicationTypeEn: "Regional Supply Chain Research Report (170 Pages)",
    publicationTypeVi: "Báo cáo Chuỗi Cung ứng Khu vực (170 Trang)",
    descriptionEn: "Cross-border bioenergy trade flows, pellet and bio-oil exports, agricultural logistics economics, and decarbonization strategies in ASEAN/East Asia.",
    descriptionVi: "Phân tích dòng thương mại sinh khối xuyên biên giới, xuất khẩu viên nén và dầu sinh học, kinh tế logistics và lộ trình giảm phát thải AZEC.",
    pdfUrl: "/references/05-Development-of-the-Bioenergy-Supply-Chain-in-AZEC-Partner-Countries.pdf",
    pdfSizeBytes: 2742371,
    pdfSizeFormatted: "2.7 MB",
    sourceUrl: "https://www.eria.org/publications/development-of-the-bioenergy-supply-chain-in-azec-partner-countries/",
    sourceDomain: "eria.org",
  },
  {
    id: "elsevier_biomass_potentials_2024",
    category: "academic",
    titleEn: "Developing biomass energy from agricultural by-products in Vietnam: Resource potential, technology status, and policy framework",
    titleVi: "Phát triển Năng lượng Sinh khối từ Phụ phẩm Nông nghiệp tại Việt Nam: Tiềm năng, Công nghệ và Khung Chính sách",
    authorEn: "Energy Strategy Reviews (Elsevier) · Dr. Nguyen et al.",
    authorVi: "Tạp chí Energy Strategy Reviews (Elsevier) · TS. Nguyễn và cộng sự",
    year: "2024",
    publicationTypeEn: "Peer-Reviewed Scientific Article (10 Pages)",
    publicationTypeVi: "Bài báo Khoa học Bình duyệt Quốc tế (10 Trang)",
    descriptionEn: "Rigorous provincial-level assessment of agricultural residues across 8 agro-ecological zones, conversion technology readiness, and policy recommendations.",
    descriptionVi: "Đánh giá định lượng phụ phẩm nông nghiệp cấp tỉnh tại 8 vùng sinh thái nông nghiệp, mức độ sẵn sàng công nghệ (TRL) và kiến nghị chính sách.",
    pdfUrl: "/references/08-1-s2.0-S2211467X2400124X-main.pdf",
    pdfSizeBytes: 2275439,
    pdfSizeFormatted: "2.3 MB",
    sourceUrl: "https://doi.org/10.1016/j.esr.2024.101417",
    sourceDomain: "sciencedirect.com",
    isCoreDataset: true,
  },
  {
    id: "wba_global_bioenergy_2025",
    category: "market",
    titleEn: "Global Bioenergy Statistics Report 2025 (12th Edition)",
    titleVi: "Báo cáo Thống kê Năng lượng Sinh học Toàn cầu 2025 (Ấn bản thứ 12)",
    authorEn: "World Bioenergy Association (WBA)",
    authorVi: "Hiệp hội Năng lượng Sinh học Toàn cầu (WBA)",
    year: "2025",
    publicationTypeEn: "Global Industry Statistical Review (45 Pages)",
    publicationTypeVi: "Báo cáo Thống kê Ngành Toàn cầu (45 Trang)",
    descriptionEn: "Worldwide production and international trade volumes for liquid biofuels, bio-methane, wood pellets, and agro-residues with Vietnam export context.",
    descriptionVi: "Dữ liệu sản xuất và thương mại toàn cầu đối với nhiên liệu sinh học lỏng, khí sinh học, viên nén gỗ và phụ phẩm nông nghiệp.",
    pdfUrl: "/references/06-251118 GBSR.pdf",
    pdfSizeBytes: 9217069,
    pdfSizeFormatted: "9.2 MB",
    sourceUrl: "https://worldbioenergy.org",
    sourceDomain: "worldbioenergy.org",
  },
  {
    id: "uk_pact_tcf_report",
    category: "guideline",
    titleEn: "Vietnam: Techno-Economic Analysis of Power Generation Technologies and Biomass Co-firing",
    titleVi: "Phân tích Kỹ thuật - Kinh tế Công nghệ Phát điện & Đồng đốt Sinh khối tại Việt Nam",
    authorEn: "UK PACT / Technology Cooperation Facility (TCF)",
    authorVi: "Chương trình UK PACT / Quỹ Hợp tác Công nghệ (TCF)",
    year: "2023",
    publicationTypeEn: "Techno-Economic Modeling & Factsheets (56 Pages)",
    publicationTypeVi: "Mô hình Kỹ thuật - Kinh tế & Bảng dữ liệu (56 Trang)",
    descriptionEn: "Levelized cost of electricity (LCOE), retrofit economics for coal-power co-firing with agricultural biomass, and technology factsheets.",
    descriptionVi: "Tính toán chi phí điện quy dẫn (LCOE), hiệu quả kinh tế cải tạo lò đốt than sang đốt kèm sinh khối nông nghiệp tại các nhà máy nhiệt điện.",
    pdfUrl: "/references/07-20231020_Vietnam-TCF-report-with-factsheets-EN.pdf",
    pdfSizeBytes: 1454886,
    pdfSizeFormatted: "1.5 MB",
    sourceUrl: "https://www.ukpact.co.uk/country-programmes/vietnam",
    sourceDomain: "ukpact.co.uk",
  },
  {
    id: "erex_vietnam_ir_2023",
    category: "market",
    titleEn: "Biomass Business in Vietnam: Commercial Projects & Fuel Supply Strategy",
    titleVi: "Chiến lược Phát triển Dự án Điện Sinh khối & Chuỗi Cung ứng Nhiên liệu tại Việt Nam",
    authorEn: "Erex Co., Ltd. (Japan)",
    authorVi: "Tập đoàn Erex (Nhật Bản)",
    year: "2023",
    publicationTypeEn: "Investor Relations Report (21 Pages)",
    publicationTypeVi: "Báo cáo Chiến lược Nhà đầu tư (21 Trang)",
    descriptionEn: "Commercial case study of utility-scale biomass plants (Hau Giang 20MW, Yen Bai 50MW, Tuyen Quang 50MW), pelletizing, and fuel plantation models.",
    descriptionVi: "Nghiên cứu trường hợp triển khai các nhà máy điện sinh khối thương mại quy mô lớn (Hậu Giang 20MW, Yên Bái 50MW, Tuyên Quang 50MW).",
    pdfUrl: "/references/01-IR_20230721_1.pdf",
    pdfSizeBytes: 870732,
    pdfSizeFormatted: "870 KB",
    sourceUrl: "https://www.erex.co.jp/en/",
    sourceDomain: "erex.co.jp",
  },
  {
    id: "moit_circular_50_e10",
    category: "policy",
    titleEn: "Circular 50/2025/TT-BCT & National E10 Biofuel Roadmap Implementation",
    titleVi: "Thông tư 50/2025/TT-BCT & Lộ trình Triển khai Xăng Sinh học E10 Toàn quốc",
    authorEn: "Ministry of Industry and Trade (MOIT Vietnam)",
    authorVi: "Bộ Công Thương (MOIT)",
    year: "2025–2026",
    publicationTypeEn: "Official Ministerial Circular & National Mandate",
    publicationTypeVi: "Thông tư Quy phạm & Lộ trình Bắt buộc",
    descriptionEn: "Mandates nationwide rollout of E10 gasoline from 1 June 2026, quality standards (TCVN), and supply obligations for national petroleum distributors.",
    descriptionVi: "Quy định bắt buộc triển khai xăng E10 trên phạm vi toàn quốc từ 1/6/2026, tiêu chuẩn chất lượng kỹ thuật và trách nhiệm doanh nghiệp đầu mối.",
    sourceUrl: "https://thuvienphapluat.vn/van-ban/EN/Tai-nguyen-Moi-truong/Circular-50-2025-TT-BCT-roadmap-for-application-of-blending-ratios-of-biofuel-with-conventional-fuel-in-Vietnam/681744/tieng-anh.aspx",
    sourceDomain: "thuvienphapluat.vn",
    isCoreDataset: true,
  },
  {
    id: "fao_production_stats",
    category: "academic",
    titleEn: "FAOSTAT Agricultural Production Statistics 2010–2024",
    titleVi: "Dữ liệu Thống kê Sản lượng Nông nghiệp Quốc gia FAOSTAT 2010–2024",
    authorEn: "Food and Agriculture Organization of the United Nations (FAO)",
    authorVi: "Tổ chức Lương thực và Nông nghiệp Liên Hợp Quốc (FAO)",
    year: "2025",
    publicationTypeEn: "Global Statistical Time-Series Database",
    publicationTypeVi: "Cơ sở Dữ liệu Thống kê Toàn cầu",
    descriptionEn: "Official national agricultural output series: paddy rice (43.5 Mt), sugarcane (11.8 Mt), fresh cassava roots (10.4 Mt), and national livestock headcounts.",
    descriptionVi: "Chuỗi số liệu thống kê sản lượng cây trồng chủ lực: lúa gạo (43,5 triệu tấn), mía đường (11,8 triệu tấn), sắn củ tươi (10,4 triệu tấn) và tổng đàn gia súc.",
    sourceUrl: "https://www.fao.org/statistics/highlights-archive/highlights-detail/agricultural-production-statistics-2010-2024/en",
    sourceDomain: "fao.org",
    isCoreDataset: true,
  },
  {
    id: "irri_rice_circularity",
    category: "policy",
    titleEn: "Vietnam’s 1-Million Hectare High-Quality, Low-Emission Rice Project & Straw Circularity",
    titleVi: "Đề án 1 Triệu Héc-ta Lúa Chất lượng cao, Phát thải thấp ĐBSCL & Kinh tế Tuần hoàn Rơm rạ",
    authorEn: "International Rice Research Institute (IRRI) & MARD Vietnam",
    authorVi: "Viện Nghiên cứu Lúa Quốc tế (IRRI) & Bộ Nông nghiệp & PTNT (MARD)",
    year: "2025",
    publicationTypeEn: "National Program Framework & MRV Protocol",
    publicationTypeVi: "Khung Đề án Quốc gia & Cơ chế Đo đạc MRV",
    descriptionEn: "Flagship national program for 14 Mt/year straw circularity, mechanized collection, organic fertilizer return, and carbon MRV across 12 provinces.",
    descriptionVi: "Đề án trọng điểm quốc gia tuần hoàn 14 triệu tấn rơm/năm, cơ giới hóa thu gom, sản xuất phân hữu cơ và cơ chế đo đạc carbon MRV tại 12 tỉnh ĐBSCL.",
    sourceUrl: "https://www.irri.org/news-and-events/news/waste-wealth-vietnams-circular-economy-turns-rice-straw-farmer-income-boost",
    sourceDomain: "irri.org",
    isCoreDataset: true,
  },
  {
    id: "iea_biogas_outlook",
    category: "academic",
    titleEn: "Outlook for Biogas and Biomethane: Assessing Sustainable Potential and Feedstock Costs",
    titleVi: "Báo cáo Triển vọng Khí Sinh học & Khí Biomethane: Đánh giá Tiềm năng & Chi phí Nguồn thải",
    authorEn: "International Energy Agency (IEA)",
    authorVi: "Cơ quan Năng lượng Quốc tế (IEA)",
    year: "2025",
    publicationTypeEn: "Global Energy Outlook & Technical Report",
    publicationTypeVi: "Báo cáo Triển vọng Năng lượng Quốc tế",
    descriptionEn: "Global methodology and economic assessment for recovering livestock manure, cassava processing wastewater, and agro-industrial waste into biomethane.",
    descriptionVi: "Phương pháp luận và đánh giá kinh tế phục hồi chất thải chăn nuôi, nước thải chế biến tinh bột sắn thành khí sinh học và biomethane sạch.",
    sourceUrl: "https://www.iea.org/reports/outlook-for-biogas-and-biomethane/assessing-the-sustainable-potential-and-cost-of-feedstocks-for-biogas-and-biomethane",
    sourceDomain: "iea.org",
  },
  {
    id: "wood_pellets_export_vpa",
    category: "market",
    titleEn: "Vietnam Wood Pellets Export & Forestry Biomass Residues Report 2024–2026",
    titleVi: "Báo cáo Xuất khẩu Viên nén Gỗ & Phụ phẩm Lâm nghiệp Việt Nam 2024–2026",
    authorEn: "Vietnam Timber and Forest Product Association (VIFOREST) & Forest Trends",
    authorVi: "Hiệp hội Gỗ và Lâm sản Việt Nam (VIFOREST) & Forest Trends",
    year: "2025–2026",
    publicationTypeEn: "Industry Market Analysis & Supply Chain Audit",
    publicationTypeVi: "Báo cáo Phân tích Thị trường & Chuỗi Cung ứng Lâm nghiệp",
    descriptionEn: "National assessment of ~18.5 Mt/yr wood processing residues, sawdust, and Vietnam's position as the world's #2 wood pellet exporter (4.5–5.0 Mt/yr) to Japan (FIT/FIP) and South Korea (RPS).",
    descriptionVi: "Đánh giá quy mô ~18,5 triệu tấn phụ phẩm chế biến gỗ, mùn cưa và vị thế xuất khẩu viên nén gỗ số 2 thế giới của Việt Nam sang thị trường Nhật Bản (FIT/FIP) và Hàn Quốc (RPS).",
    sourceUrl: "https://vietforest.org.vn/",
    sourceDomain: "vietforest.org.vn",
    isCoreDataset: true,
  },
  {
    id: "pdp8_masterplan_ref",
    category: "policy",
    titleEn: "National Power Development Plan 8 (Decision 500/QD-TTg & Plan 262/QD-TTg)",
    titleVi: "Quy hoạch Phát triển Điện lực Quốc gia Thời kỳ 2021–2030, Tầm nhìn 2050 (Quy hoạch Điện 8)",
    authorEn: "Prime Minister of Vietnam & Ministry of Industry and Trade",
    authorVi: "Thủ tướng Chính phủ & Bộ Công Thương",
    year: "2023–2025",
    publicationTypeEn: "National Energy Master Plan & Legal Framework",
    publicationTypeVi: "Quy hoạch Năng lượng Quốc gia",
    descriptionEn: "Mandates 1,227 MW biomass power by 2030 and 4,000 MW by 2050; 600 MW waste-to-energy by 2030; and 20% biomass co-firing in existing coal power plants.",
    descriptionVi: "Quy định mục tiêu 1.227 MW điện sinh khối đến 2030 và 4.000 MW đến 2050; 600 MW điện rác đến 2030; và lộ trình đốt kèm 20% sinh khối tại các nhà máy nhiệt điện than.",
    sourceUrl: "https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=207865",
    sourceDomain: "chinhphu.vn",
    isCoreDataset: true,
  },
  {
    id: "black_liquor_kraft_ref",
    category: "academic",
    titleEn: "Industrial Biomass & Kraft Black Liquor Energy Recovery in Pulp & Paper Mills",
    titleVi: "Thu hồi Năng lượng & Hóa chất từ Dịch đen Sinh khối Công nghiệp Nhà máy Giấy Kraft",
    authorEn: "Vietnam Pulp and Paper Association (VPPA) & TAPPI Journal",
    authorVi: "Hiệp hội Giấy và Bột giấy Việt Nam (VPPA)",
    year: "2024–2025",
    publicationTypeEn: "Industrial Chemical Engineering Study",
    publicationTypeVi: "Nghiên cứu Kỹ thuật Công nghiệp Hóa chất",
    descriptionEn: "Technical evaluation of ~1.8 Mt dry solids black liquor generated annually in Kraft pulp mills (Bai Bang, Lee & Man) utilized in closed-loop chemical recovery boilers generating high-pressure steam and captive electricity.",
    descriptionVi: "Đánh giá kỹ thuật ~1,8 triệu tấn chất rắn khô dịch đen phát sinh hàng năm tại các nhà máy bột giấy Kraft, thu hồi hóa chất và sản xuất hơi cao áp tự dùng trong lò hơi thu hồi.",
    sourceUrl: "https://vppa.vn/",
    sourceDomain: "vppa.vn",
  },
];

/**
 * Detailed Feedstock Profiles with Differentiated Sustainable Recovery Ratios
 * and Regional Geographic Distribution Breakdown
 */
export interface FeedstockProfile {
  id: string;
  name: string;
  vietnameseName: string;
  family: string;
  vietnameseFamily: string;
  filterGroup: "Heat & power" | "Liquid fuel" | "Biogas" | "Advanced";
  priority: string;
  priorityVi: string;
  grossScaleAnnual: string;
  grossScaleVi: string;
  energyGrossPJ: number;
  deliverableSharePct: number; // Differentiated sustainable recovery factor
  deliverableShareNotesEn: string;
  deliverableShareNotesVi: string;
  lhvRangeMJPerKg: string;
  moistureRangePct: string;
  primaryApplicationsEn: string[];
  primaryApplicationsVi: string[];
  regionalBreakdown: {
    zoneEn: string;
    zoneVi: string;
    sharePct: number;
    annualVolume: string;
    annualVolumeVi: string;
  }[];
  watchEn: string;
  watchVi: string;
  citationIds: string[];
}

export const FEEDSTOCK_PROFILES: FeedstockProfile[] = [
  {
    id: "rice_husk",
    name: "Rice husk",
    vietnameseName: "Vỏ trấu",
    family: "Paddy processing byproduct",
    vietnameseFamily: "Phụ phẩm xay xát lúa gạo",
    filterGroup: "Heat & power",
    priority: "Commercial priority",
    priorityVi: "Ưu tiên thương mại số 1",
    grossScaleAnnual: "~8.7 Mt/year (130 PJth)",
    grossScaleVi: "~8,7 triệu tấn/năm (130 PJth)",
    energyGrossPJ: 130,
    deliverableSharePct: 90,
    deliverableShareNotesEn: "90% commercial recoverability: 100% centralized at commercial milling hubs along river waterways with zero field collection friction.",
    deliverableShareNotesVi: "Khả năng thu hồi 90%: 100% tập trung tại các cụm nhà máy xay xát ven sông rạch, không tốn chi phí gom tại đồng ruộng.",
    lhvRangeMJPerKg: "14.5 – 15.5 MJ/kg",
    moistureRangePct: "10% – 12%",
    primaryApplicationsEn: ["Industrial Process Steam", "BFB Cogeneration (CHP)", "Husk Briquetting", "Silica-Rich Ash Cement"],
    primaryApplicationsVi: ["Cung cấp hơi công nghiệp", "Điện sinh khối tầng sôi BFB", "Củi trấu ép thanh", "Tro trấu giàu Silica cho xi măng"],
    regionalBreakdown: [
      { zoneEn: "Mekong River Delta", zoneVi: "Đồng Bằng Sông Cửu Long", sharePct: 54, annualVolume: "4.70 Mt/yr", annualVolumeVi: "4,70 triệu tấn/năm" },
      { zoneEn: "Red River Delta", zoneVi: "Đồng Bằng Sông Hồng", sharePct: 18, annualVolume: "1.57 Mt/yr", annualVolumeVi: "1,57 triệu tấn/năm" },
      { zoneEn: "Central Coast", zoneVi: "Duyên hải Miền Trung", sharePct: 16, annualVolume: "1.39 Mt/yr", annualVolumeVi: "1,39 triệu tấn/năm" },
      { zoneEn: "Northern Mountains", zoneVi: "Trung du Miền núi Phía Bắc", sharePct: 12, annualVolume: "1.04 Mt/yr", annualVolumeVi: "1,04 triệu tấn/năm" },
    ],
    watchEn: "Avoid high-alkali clinkering by selecting BFB bed temperatures <850°C. Protect silica value chain.",
    watchVi: "Tránh đóng xỉ kiềm bằng cách duy trì nhiệt độ tầng sôi <850°C. Bảo vệ chuỗi giá trị tro silica.",
    citationIds: ["wb_biomass_atlas_2018", "elsevier_biomass_potentials_2024"],
  },
  {
    id: "wood_residues_pellets",
    name: "Wood residues & Sawdust (Pellets)",
    vietnameseName: "Mùn cưa, Dăm gỗ & Viên nén",
    family: "Forestry & Wood manufacturing",
    vietnameseFamily: "Công nghiệp chế biến gỗ & lâm sản",
    filterGroup: "Heat & power",
    priority: "Global export champion",
    priorityVi: "Hàng đầu xuất khẩu toàn cầu (Số 2 thế giới)",
    grossScaleAnnual: "~18.5 Mt/year (~5.0 Mt/yr pellet export)",
    grossScaleVi: "~18,5 triệu tấn/năm (~5,0 triệu tấn viên nén xuất khẩu)",
    energyGrossPJ: 320,
    deliverableSharePct: 85,
    deliverableShareNotesEn: "85% commercial recovery: Concentrated at sawmills, furniture manufacturing hubs, and planted forest chip collection points.",
    deliverableShareNotesVi: "Khả năng thu hồi 85%: Tập trung tại các xưởng cưa, cụm nhà máy chế biến gỗ nội thất và trạm băm dăm gỗ rừng trồng.",
    lhvRangeMJPerKg: "16.5 – 18.5 MJ/kg",
    moistureRangePct: "8% – 12% (Pellets) / 35% – 50% (Sawdust)",
    primaryApplicationsEn: ["Export Wood Pellets (Japan FIT / Korea RPS)", "Industrial Steam Boilers", "Coal Power Co-firing (20%)", "Torrefied Pellets"],
    primaryApplicationsVi: ["Xuất khẩu viên nén (Nhật Bản FIT / Hàn Quốc RPS)", "Lò hơi công nghiệp", "Đốt kèm nhiệt điện than (20%)", "Viên nén đen (Torrefied)"],
    regionalBreakdown: [
      { zoneEn: "South Central Coast", zoneVi: "Duyên hải Nam Trung Bộ (Bình Định, Quảng Ngãi)", sharePct: 38, annualVolume: "7.03 Mt/yr", annualVolumeVi: "7,03 triệu tấn/năm" },
      { zoneEn: "Southeast", zoneVi: "Đông Nam Bộ (Bình Dương, Đồng Nai, Bình Phước)", sharePct: 32, annualVolume: "5.92 Mt/yr", annualVolumeVi: "5,92 triệu tấn/năm" },
      { zoneEn: "Northern Mountains", zoneVi: "Trung du Miền núi Phía Bắc (Phú Thọ, Yên Bái)", sharePct: 20, annualVolume: "3.70 Mt/yr", annualVolumeVi: "3,70 triệu tấn/năm" },
      { zoneEn: "North Central", zoneVi: "Bắc Trung Bộ (Thanh Hóa, Nghệ An)", sharePct: 10, annualVolume: "1.85 Mt/yr", annualVolumeVi: "1,85 triệu tấn/năm" },
    ],
    watchEn: "Strict certification compliance required: FSC/PEFC chain of custody, SBP (Sustainable Biomass Program), and heavy metal traces.",
    watchVi: "Cần tuân thủ nghiêm ngặt chứng chỉ chuỗi hành trình FSC/PEFC, SBP (Sustainable Biomass Program) và kiểm soát kim loại nặng.",
    citationIds: ["wood_pellets_export_vpa", "erex_vietnam_ir_2023"],
  },
  {
    id: "used_cooking_oil_tallow",
    name: "Used Cooking Oil (UCO) & Fish Tallow",
    vietnameseName: "Dầu ăn thải (UCO) & Mỡ cá tra",
    family: "Lipid & Agro-industrial fat",
    vietnameseFamily: "Chất béo thải & Phụ phẩm thủy sản",
    filterGroup: "Liquid fuel",
    priority: "High value export / SAF anchor",
    priorityVi: "Giá trị kinh tế cao / Cung ứng SAF & Biodiesel",
    grossScaleAnnual: "~345 kt/year (160 kt UCO + 185 kt Fish tallow)",
    grossScaleVi: "~345.000 tấn/năm (160 kt UCO + 185 kt Mỡ cá tra)",
    energyGrossPJ: 13.5,
    deliverableSharePct: 85,
    deliverableShareNotesEn: "85% commercial deliverability: Aggregated through licensed FOG (fats, oils, grease) collectors and industrial pangasius catfish rendering lines.",
    deliverableShareNotesVi: "Khả năng thu hồi 85%: Thu gom qua mạng lưới đại lý FOG được cấp phép và các dây chuyền chiết xuất mỡ cá tra công nghiệp.",
    lhvRangeMJPerKg: "37.0 – 39.5 MJ/kg",
    moistureRangePct: "< 0.5% – 1.0%",
    primaryApplicationsEn: ["Hydrotreated HEFA Aviation SAF", "ISCC-Certified FAME Biodiesel (B5–B100)", "Hydrotreated Vegetable Oil (HVO)", "Marine Biofuels"],
    primaryApplicationsVi: ["Nhiên liệu Hàng không Bền vững SAF (HEFA)", "Biodiesel FAME đạt chuẩn ISCC (B5–B100)", "Dầu Diesel Tái tạo HVO", "Nhiên liệu sinh học hàng hải"],
    regionalBreakdown: [
      { zoneEn: "Mekong River Delta", zoneVi: "Đồng Bằng Sông Cửu Long (An Giang, Đồng Tháp, Cần Thơ)", sharePct: 65, annualVolume: "224 kt/yr", annualVolumeVi: "224.000 tấn/năm" },
      { zoneEn: "Southeast & Urban", zoneVi: "Đông Nam Bộ & Đô thị lớn (TP.HCM, Bình Dương, Hà Nội)", sharePct: 35, annualVolume: "121 kt/yr", annualVolumeVi: "121.000 tấn/năm" },
    ],
    watchEn: "Demands rigorous ISCC-EU trace chain auditing to prevent virgin palm oil blending and ensure double-counting eligibility in EU RED II/III.",
    watchVi: "Yêu cầu kiểm toán chuỗi hành trình ISCC-EU nghiêm ngặt để chống gian lận pha dầu cọ nguyên sinh và đảm bảo tính điểm kép EU RED II/III.",
    citationIds: ["wb_biomass_atlas_2018", "elsevier_biomass_potentials_2024"],
  },
  {
    id: "sugarcane_bagasse",
    name: "Sugarcane bagasse",
    vietnameseName: "Bã mía nhà máy đường",
    family: "Sugar processing residue",
    vietnameseFamily: "Phụ phẩm chế biến mía đường",
    filterGroup: "Heat & power",
    priority: "Captive baseload priority",
    priorityVi: "Ưu tiên phụ tải nền tự dùng & phát điện",
    grossScaleAnnual: "~3.5 Mt/year (28 PJth)",
    grossScaleVi: "~3,5 triệu tấn/năm (28 PJth)",
    energyGrossPJ: 28,
    deliverableSharePct: 95,
    deliverableShareNotesEn: "95% captive collection at sugar mills: 100% immediately available post-crushing; 65% surplus power generated when upgrading to >=65 bar boilers.",
    deliverableShareNotesVi: "Khả năng thu hồi 95% tại chỗ: 100% có sẵn sau ép mía; thặng dư 65% điện phát lên lưới khi nâng cấp lò hơi cao áp >=65 bar.",
    lhvRangeMJPerKg: "7.5 – 8.5 MJ/kg (at 50% moisture as-fired)",
    moistureRangePct: "48% – 52%",
    primaryApplicationsEn: ["Sugar Mill Cogeneration (CHP >=65 bar)", "Baseload Power to EVN Grid", "Bagasse Briquettes", "Furfural Bio-chemicals"],
    primaryApplicationsVi: ["Đồng phát nhiệt điện mía đường (CHP >=65 bar)", "Phát điện phụ tải nền lên lưới EVN", "Ép khối bã mía", "Hóa chất sinh học Furfural"],
    regionalBreakdown: [
      { zoneEn: "Central Highlands & South Central", zoneVi: "Tây Nguyên & Nam Trung Bộ (Gia Lai, Phú Yên, Khánh Hòa)", sharePct: 45, annualVolume: "1.58 Mt/yr", annualVolumeVi: "1,58 triệu tấn/năm" },
      { zoneEn: "North Central", zoneVi: "Bắc Trung Bộ (Thanh Hóa, Nghệ An)", sharePct: 30, annualVolume: "1.05 Mt/yr", annualVolumeVi: "1,05 triệu tấn/năm" },
      { zoneEn: "Southeast & Mekong", zoneVi: "Đông Nam Bộ & Tây Nam Bộ (Tây Ninh, Hậu Giang)", sharePct: 25, annualVolume: "0.87 Mt/yr", annualVolumeVi: "0,87 triệu tấn/năm" },
    ],
    watchEn: "Short 4–5 month crushing season requires moisture-controlled storage or year-round secondary fuels (wood chips) for continuous power generation.",
    watchVi: "Mùa vụ ép mía ngắn (4–5 tháng) đòi hỏi kho bảo quản kiểm soát ẩm hoặc nguồn nhiên liệu phụ (dăm gỗ) để phát điện quanh năm.",
    citationIds: ["wb_biomass_atlas_2018", "giz_bioenergy_handbook"],
  },
  {
    id: "cassava_roots_starch",
    name: "Cassava roots & Peels",
    vietnameseName: "Củ sắn lát & Bã sắn",
    family: "Starch root crop",
    vietnameseFamily: "Cây lấy củ công nghiệp",
    filterGroup: "Liquid fuel",
    priority: "E10 mandate anchor",
    priorityVi: "Trụ cột lộ trình xăng E10 bắt buộc",
    grossScaleAnnual: "~10.5 Mt fresh harvest (~1.2 Mt energy chips)",
    grossScaleVi: "~10,5 triệu tấn sắn tươi (~1,2 triệu tấn sắn lát năng lượng)",
    energyGrossPJ: 18.0,
    deliverableSharePct: 80,
    deliverableShareNotesEn: "80% dry chip conversion efficiency, capped at 38% allocation for bioethanol due to native starch export competition.",
    deliverableShareNotesVi: "Hiệu suất sấy củ 80%, nhưng trần phân bổ cho cồn nhiên liệu chỉ khoảng 38% do cạnh tranh xuất khẩu tinh bột và thức ăn chăn nuôi.",
    lhvRangeMJPerKg: "15.0 – 16.5 MJ/kg (dry chips)",
    moistureRangePct: "12% – 14% (dry chips) / 65% – 70% (fresh roots)",
    primaryApplicationsEn: ["Fuel Bioethanol E10 (TCVN 8408)", "Cassava Peel Anaerobic Biogas", "Vinasse IC Biogas Reactors", "Industrial Starch"],
    primaryApplicationsVi: ["Cồn nhiên liệu E10 (TCVN 8408)", "Biogas kỵ khí từ vỏ sắn", "Hầm Biogas IC xử lý nước thải hèm rượu", "Tinh bột công nghiệp"],
    regionalBreakdown: [
      { zoneEn: "Central Highlands", zoneVi: "Tây Nguyên (Gia Lai, Kon Tum, Đắk Lắk)", sharePct: 42, annualVolume: "4.41 Mt fresh", annualVolumeVi: "4,41 triệu tấn sắn tươi" },
      { zoneEn: "Southeast", zoneVi: "Đông Nam Bộ (Tây Ninh, Bình Phước)", sharePct: 30, annualVolume: "3.15 Mt fresh", annualVolumeVi: "3,15 triệu tấn sắn tươi" },
      { zoneEn: "Central Coast", zoneVi: "Duyên hải Miền Trung (Quảng Ngãi, Bình Định)", sharePct: 18, annualVolume: "1.89 Mt fresh", annualVolumeVi: "1,89 triệu tấn sắn tươi" },
      { zoneEn: "North", zoneVi: "Miền Bắc (Yên Bái, Sơn La)", sharePct: 10, annualVolume: "1.05 Mt fresh", annualVolumeVi: "1,05 triệu tấn sắn tươi" },
    ],
    watchEn: "Direct market price volatility and export arbitrage to China starch markets requires index-linked multi-year farmer supply contracts.",
    watchVi: "Biến động giá thị trường và áp lực chênh lệch giá xuất khẩu tinh bột sang Trung Quốc đòi hỏi hợp đồng bao tiêu nông dân dài hạn.",
    citationIds: ["moit_circular_50_e10", "fao_production_stats"],
  },
  {
    id: "livestock_manure",
    name: "Livestock manure & Biogas",
    vietnameseName: "Chất thải chăn nuôi & Biogas",
    family: "Swine, poultry & dairy manure",
    vietnameseFamily: "Chất thải gia súc, gia cầm & bò sữa",
    filterGroup: "Biogas",
    priority: "Methane abatement leader",
    priorityVi: "Hàng đầu giảm phát thải khí Methane",
    grossScaleAnnual: "~85 Mt wet manure/year (~2.4 billion m³ biogas)",
    grossScaleVi: "~85 triệu tấn phân tươi/năm (~2,4 tỷ m³ khí sinh học)",
    energyGrossPJ: 52.0,
    deliverableSharePct: 45,
    deliverableShareNotesEn: "45% aggregate commercial recoverability: 75% on large concentrated industrial livestock farms (>1,000 swine); 20% on smallholders.",
    deliverableShareNotesVi: "Khả năng thu hồi thương mại 45%: 75% tại các trang trại chăn nuôi công nghiệp quy mô lớn (>1.000 con); 20% tại nông hộ nhỏ lẻ.",
    lhvRangeMJPerKg: "21.0 – 23.5 MJ/m³ (biogas) / 36.0 MJ/m³ (pure biomethane)",
    moistureRangePct: "75% – 88% (slurry)",
    primaryApplicationsEn: ["Covered Lagoon Biogas Power", "Compressed Bio-CNG for Transport", "Grid-Injected Biomethane", "Digestate Biofertilizer"],
    primaryApplicationsVi: ["Phát điện Biogas bạt HDPE", "Khí nén Bio-CNG cho giao thông", "Khí Biomethane hòa lưới khí đốt", "Phân bón hữu cơ vi sinh từ bã thải"],
    regionalBreakdown: [
      { zoneEn: "Red River Delta", zoneVi: "Đồng Bằng Sông Hồng (Hà Nội, Hà Nam, Bắc Giang)", sharePct: 36, annualVolume: "30.6 Mt slurry", annualVolumeVi: "30,6 triệu tấn bùn phân" },
      { zoneEn: "Southeast", zoneVi: "Đông Nam Bộ (Đồng Nai, Bình Dương)", sharePct: 34, annualVolume: "28.9 Mt slurry", annualVolumeVi: "28,9 triệu tấn bùn phân" },
      { zoneEn: "North Central", zoneVi: "Bắc Trung Bộ (Thanh Hóa, Nghệ An)", sharePct: 18, annualVolume: "15.3 Mt slurry", annualVolumeVi: "15,3 triệu tấn bùn phân" },
      { zoneEn: "Mekong River Delta", zoneVi: "Đồng Bằng Sông Cửu Long", sharePct: 12, annualVolume: "10.2 Mt slurry", annualVolumeVi: "10,2 triệu tấn bùn phân" },
    ],
    watchEn: "Must manage H2S corrosion (>2,000 ppm) with biological scrubbers and prevent digestate runoff into waterways.",
    watchVi: "Cần xử lý ăn mòn do khí H2S (>2.000 ppm) bằng tháp lọc sinh học và chống rò rỉ nước thải sau biogas ra nguồn nước tự nhiên.",
    citationIds: ["fao_production_stats", "iea_biogas_outlook"],
  },
  {
    id: "rice_straw",
    name: "Rice straw",
    vietnameseName: "Rơm rạ đồng ruộng",
    family: "Field crop residue",
    vietnameseFamily: "Phụ phẩm đồng ruộng",
    filterGroup: "Advanced",
    priority: "Decarbonization frontier",
    priorityVi: "Tiên phong khử carbon & Kinh tế tuần hoàn",
    grossScaleAnnual: "~43.5 Mt/year (580 PJth)",
    grossScaleVi: "~43,5 triệu tấn/năm (580 PJth)",
    energyGrossPJ: 580,
    deliverableSharePct: 35,
    deliverableShareNotesEn: "35% sustainable harvest factor: 65% MUST remain on field for soil carbon retention, nutrient recycling, and MARD 1M-ha project compliance.",
    deliverableShareNotesVi: "Tỷ lệ thu hồi bền vững 35%: 65% BẮT BUỘC giữ lại ruộng để bảo tồn carbon hữu cơ, tái tạo dinh dưỡng đất và tuân thủ Đề án 1 triệu ha.",
    lhvRangeMJPerKg: "12.5 – 14.0 MJ/kg",
    moistureRangePct: "15% – 25% (dry baled) / 50% – 65% (fresh wet)",
    primaryApplicationsEn: ["2G Cellulosic SAF / Aviation Fuel", "Straw Biochar (Soil Carbon Removal)", "Mechanized Straw Baling", "Mushroom Cultivation Substrate"],
    primaryApplicationsVi: ["Xăng máy bay SAF thế hệ 2 (Cellulosic)", "Than sinh học Biochar (Tín chỉ Carbon)", "Rơm cuộn cơ giới hóa", "Giá thể trồng nấm rơm"],
    regionalBreakdown: [
      { zoneEn: "Mekong River Delta", zoneVi: "Đồng Bằng Sông Cửu Long", sharePct: 56, annualVolume: "24.36 Mt/yr", annualVolumeVi: "24,36 triệu tấn/năm" },
      { zoneEn: "Red River Delta", zoneVi: "Đồng Bằng Sông Hồng", sharePct: 19, annualVolume: "8.27 Mt/yr", annualVolumeVi: "8,27 triệu tấn/năm" },
      { zoneEn: "Central Coast", zoneVi: "Duyên hải Miền Trung", sharePct: 14, annualVolume: "6.09 Mt/yr", annualVolumeVi: "6,09 triệu tấn/năm" },
      { zoneEn: "Northern Mountains", zoneVi: "Trung du Miền núi Phía Bắc", sharePct: 11, annualVolume: "4.78 Mt/yr", annualVolumeVi: "4,78 triệu tấn/năm" },
    ],
    watchEn: "High silica (12–16%) and potassium (K) content causes severe boiler fouling; require CFB or enzymatic conversion rather than simple grate boilers.",
    watchVi: "Hàm lượng Silica (12–16%) và Kali cao dễ gây đóng xỉ và bám cặn lò hơi; cần công nghệ tầng sôi CFB hoặc chuyển hóa enzyme sinh học.",
    citationIds: ["irri_rice_circularity", "wb_biomass_atlas_2018"],
  },
  {
    id: "industrial_pulp_liquor",
    name: "Pulp Black Liquor & Industrial Waste",
    vietnameseName: "Dịch đen nhà máy giấy & Sinh khối công nghiệp",
    family: "Pulp, Paper & Chemical Recovery",
    vietnameseFamily: "Chất thải công nghiệp bột giấy & chế biến",
    filterGroup: "Heat & power",
    priority: "Closed-loop industrial circularity",
    priorityVi: "Kinh tế tuần hoàn khép kín công nghiệp",
    grossScaleAnnual: "~1.8 Mt dry solids/year (~22 PJth)",
    grossScaleVi: "~1,8 triệu tấn chất rắn khô/năm (~22 PJth)",
    energyGrossPJ: 22.0,
    deliverableSharePct: 95,
    deliverableShareNotesEn: "95% captive recovery efficiency in Kraft pulping chemical recovery boilers, generating 100% on-site steam and electricity.",
    deliverableShareNotesVi: "Hiệu suất thu hồi 95% khép kín trong lò hơi thu hồi hóa chất Kraft, tự cung ứng 100% nhu cầu hơi và điện của nhà máy giấy.",
    lhvRangeMJPerKg: "13.0 – 14.5 MJ/kg (dry solids)",
    moistureRangePct: "25% – 35% (concentrated black liquor)",
    primaryApplicationsEn: ["Kraft Chemical Recovery Boilers", "Captive Steam & Power Cogeneration", "Tall Oil & Bio-pitch Recovery", "Paper Sludge Co-incineration"],
    primaryApplicationsVi: ["Lò hơi thu hồi hóa chất bột giấy Kraft", "Đồng phát hơi và điện tự dùng", "Thu hồi dầu Tall và hắc ín sinh học", "Đốt kèm bùn thải nhà máy giấy"],
    regionalBreakdown: [
      { zoneEn: "Northern Industrial (Phu Tho Bai Bang)", zoneVi: "Miền Bắc (Nhà máy Giấy Bãi Bằng, Phú Thọ)", sharePct: 40, annualVolume: "0.72 Mt dry solids", annualVolumeVi: "0,72 triệu tấn chất rắn" },
      { zoneEn: "Southeast (Binh Duong, Dong Nai)", zoneVi: "Đông Nam Bộ (Bình Dương, Đồng Nai)", sharePct: 35, annualVolume: "0.63 Mt dry solids", annualVolumeVi: "0,63 triệu tấn chất rắn" },
      { zoneEn: "Mekong River Delta (Hau Giang Lee & Man)", zoneVi: "Đồng Bằng Sông Cửu Long (Hậu Giang Lee & Man)", sharePct: 25, annualVolume: "0.45 Mt dry solids", annualVolumeVi: "0,45 triệu tấn chất rắn" },
    ],
    watchEn: "Requires high-metallurgy corrosion protection against molten smelt and ESP electrostatic precipitators for Na2SO4 salt recovery.",
    watchVi: "Đòi hỏi vật liệu hợp kim chịu ăn mòn cao trước xỉ nóng chảy và hệ thống lọc bụi tĩnh điện ESP thu hồi muối Na2SO4.",
    citationIds: ["black_liquor_kraft_ref", "elsevier_biomass_potentials_2024"],
  },
];

/**
 * Advanced Biomass Conversion & Processing Technologies Matrix
 */
export interface ConversionTechnology {
  id: string;
  name: string;
  vietnameseName: string;
  category: "Thermochemical" | "Biochemical & Catalytic" | "Industrial Recovery";
  categoryVi: "Nhiệt hóa & Cơ học" | "Hóa sinh & Xúc tác" | "Thu hồi Công nghiệp";
  trl: string;
  feedstocksEn: string[];
  feedstocksVi: string[];
  primaryOutputEn: string;
  primaryOutputVi: string;
  efficiencyRange: string;
  capexRange: string;
  summaryEn: string;
  summaryVi: string;
  targetMarketEn: string;
  targetMarketVi: string;
}

export const CONVERSION_TECHNOLOGIES: ConversionTechnology[] = [
  {
    id: "wood_pelleting",
    name: "Biomass Pelletizing & Briquetting",
    vietnameseName: "Ép viên nén & Thanh củi sinh khối",
    category: "Thermochemical",
    categoryVi: "Nhiệt hóa & Cơ học",
    trl: "TRL 9 (Commercial Standard)",
    feedstocksEn: ["Sawdust", "Wood shavings", "Rice husk", "Coffee parchment"],
    feedstocksVi: ["Mùn cưa", "Dăm bào", "Vỏ trấu", "Vỏ thóc cà phê"],
    primaryOutputEn: "High-density wood/husk pellets (>=650 kg/m³, 17.5 MJ/kg)",
    primaryOutputVi: "Viên nén sinh khối mật độ cao (>=650 kg/m³, 17,5 MJ/kg)",
    efficiencyRange: "88% – 94% mass yield",
    capexRange: "$80 – $140 per annual tonne capacity",
    summaryEn: "Mechanical drying, fine grinding, ring-die compression, and cooling. Densifies low-bulk agro-forestry residues for long-distance maritime export.",
    summaryVi: "Sấy thùng quay, nghiền mịn, ép qua khuôn vòng áp lực cao và làm nguội. Tăng mật độ năng lượng phục vụ xuất khẩu đường biển đi xa.",
    targetMarketEn: "Japan FIT/FIP Biomass Power Plants (65%) & South Korea RPS (30%)",
    targetMarketVi: "Nhà máy điện sinh khối FIT Nhật Bản (65%) & RPS Hàn Quốc (30%)",
  },
  {
    id: "direct_combustion_chp",
    name: "High-Pressure Cogeneration (CHP >=65 bar)",
    vietnameseName: "Đồng phát Nhiệt - Điện Áp suất cao (>=65 bar)",
    category: "Thermochemical",
    categoryVi: "Nhiệt hóa & Cơ học",
    trl: "TRL 9 (Commercial Standard)",
    feedstocksEn: ["Rice husk", "Bagasse", "Wood chips", "Chopped straw"],
    feedstocksVi: ["Vỏ trấu", "Bã mía", "Dăm gỗ", "Rơm rạ băm"],
    primaryOutputEn: "Superheated Steam (65–90 bar) + Baseload Grid Electricity",
    primaryOutputVi: "Hơi quá nhiệt (65–90 bar) + Điện phụ tải nền hòa lưới EVN",
    efficiencyRange: "26% – 32% electrical / 75% – 85% overall CHP",
    capexRange: "$1,400 – $2,200 / kW electrical",
    summaryEn: "Fluidized bed (BFB/CFB) or travelling grate boilers powering back-pressure or extraction-condensing steam turbines for baseload power and clean industrial steam.",
    summaryVi: "Lò hơi tầng sôi BFB/CFB hoặc ghi xích kết hợp turbine hơi trích/ngưng hơi, sản xuất đồng thời điện lưới và hơi nhiệt sạch công nghiệp.",
    targetMarketEn: "EVN Grid Dispatch (PDP8 Target: 1,227 MW) & Industrial Parks",
    targetMarketVi: "Lưới điện EVN (Mục tiêu QHĐ 8: 1.227 MW) & Khu công nghiệp",
  },
  {
    id: "transesterification_fame",
    name: "FAME Biodiesel Transesterification",
    vietnameseName: "Este hóa Biodiesel FAME gốc thải",
    category: "Biochemical & Catalytic",
    categoryVi: "Hóa sinh & Xúc tác",
    trl: "TRL 9 (Commercial Standard)",
    feedstocksEn: ["Used Cooking Oil (UCO)", "Pangasius fish tallow", "Animal fats"],
    feedstocksVi: ["Dầu ăn thải (UCO)", "Mỡ cá tra", "Mỡ động vật"],
    primaryOutputEn: "B100 Biodiesel (ASTM D6751 / EN 14214) + Crude Glycerol",
    primaryOutputVi: "Nhiên liệu sinh học B100 (TCVN 7717 / EN 14214) + Glycerol thô",
    efficiencyRange: "96% – 98% chemical conversion",
    capexRange: "$180 – $280 per tonne annual output",
    summaryEn: "Alkali/acid-catalyzed reaction of waste lipids with methanol, stripping free fatty acids (FFA) and yielding drop-in FAME biodiesel with >85% GHG abatement.",
    summaryVi: "Phản ứng xúc tác kiềm/axit giữa lipid thải và methanol, tách axit béo tự do (FFA), tạo cồn este FAME giảm >85% phát thải KNK.",
    targetMarketEn: "Global ISCC Export (EU RED III, US RFS) & Vietnam B5 Mandate",
    targetMarketVi: "Xuất khẩu ISCC quốc tế (EU RED III, Mỹ RFS) & Lộ trình B5 trong nước",
  },
  {
    id: "hefa_saf_hvo",
    name: "Hydroprocessed Esters & Fatty Acids (HEFA SAF / HVO)",
    vietnameseName: "Hydro hóa Este & Axit béo (HEFA cho Xăng máy bay SAF & HVO)",
    category: "Biochemical & Catalytic",
    categoryVi: "Hóa sinh & Xúc tác",
    trl: "TRL 9 (ASTM D7566 Annex A2 Certified)",
    feedstocksEn: ["UCO", "Pangasius catfish oil", "Tallow", "Algae lipids"],
    feedstocksVi: ["Dầu ăn thải", "Dầu mỡ cá tra", "Mỡ gia súc", "Dầu vi tảo"],
    primaryOutputEn: "Sustainable Aviation Fuel (SAF SPK) + Renewable Diesel (HVO)",
    primaryOutputVi: "Xăng máy bay bền vững SAF (HEFA-SPK) + Dầu Diesel tái sinh HVO",
    efficiencyRange: "78% – 84% liquid hydrocarbon yield",
    capexRange: "$800 – $1,200 per tonne annual capacity",
    summaryEn: "High-pressure catalytic hydrodeoxygenation and isomerization producing drop-in synthetic paraffinic kerosene for commercial aviation with up to 50% blending ratio.",
    summaryVi: "Khử oxy bằng hydro ở áp suất cao và đồng phân hóa (isomerization), sản xuất dầu phản lực tổng hợp pha trộn đến 50% cho ngành hàng không.",
    targetMarketEn: "International Airlines (ICAO CORSIA & EU ReFuelEU Aviation 2025–2030)",
    targetMarketVi: "Hàng không quốc tế (ICAO CORSIA & Quy định ReFuelEU Aviation 2025–2030)",
  },
  {
    id: "fast_pyrolysis_biochar",
    name: "Fast Pyrolysis & Biochar Carbon Removal",
    vietnameseName: "Nhiệt phân nhanh & Than sinh học Biochar",
    category: "Thermochemical",
    categoryVi: "Nhiệt hóa & Cơ học",
    trl: "TRL 8 (Commercial Deployment)",
    feedstocksEn: ["Rice husk", "Rice straw", "Coffee husk", "Wood shavings"],
    feedstocksVi: ["Vỏ trấu", "Rơm rạ", "Vỏ cà phê", "Dăm bào gỗ"],
    primaryOutputEn: "High-Stability Biochar (Carbon Removal CORC) + Pyrolysis Bio-Oil",
    primaryOutputVi: "Than sinh học Biochar bền vững (Tín chỉ CORC) + Dầu sinh học Bio-oil",
    efficiencyRange: "30% – 35% biochar yield / 50% – 60% bio-oil",
    capexRange: "$400 – $700 per annual dry tonne feedstock",
    summaryEn: "Thermal decomposition in oxygen-free atmosphere at 450–550°C. Sequesters recalcitrant carbon in soils for 100+ years and generates verified carbon removal credits.",
    summaryVi: "Phân hủy nhiệt trong điều kiện không có oxy ở 450–550°C. Cố định carbon bền vững trong đất hơn 100 năm và tạo tín chỉ giảm phát thải carbon cao cấp.",
    targetMarketEn: "Puro.earth Carbon Removal Credits (CORCs @ $120–$180/t) & Soil Conditioning",
    targetMarketVi: "Thị trường tín chỉ carbon Puro.earth (CORC $120–$180/tấn) & Cải tạo đất",
  },
  {
    id: "anaerobic_digestion_biomethane",
    name: "Anaerobic Digestion & Biomethane Upgrading",
    vietnameseName: "Lên men kỵ khí & Tinh chế Biomethane",
    category: "Biochemical & Catalytic",
    categoryVi: "Hóa sinh & Xúc tác",
    trl: "TRL 9 (Commercial Standard)",
    feedstocksEn: ["Swine manure slurry", "Cassava starch vinasse", "Food processing waste"],
    feedstocksVi: ["Nước thải chăn nuôi lợn", "Nước thải hèm rượu sắn", "Rác hữu cơ thực phẩm"],
    primaryOutputEn: "Purified Biomethane (>=97% CH4) + Organic Biofertilizer",
    primaryOutputVi: "Khí Biomethane tinh khiết (>=97% CH4) + Phân bón hữu cơ vi sinh",
    efficiencyRange: "60% – 70% methane content raw / 99% recovery post-membrane",
    capexRange: "$3,500 – $5,500 per Nm³/h biomethane capacity",
    summaryEn: "Covered lagoon / CSTR biological digestion followed by membrane separation or amine scrubbers removing CO2/H2S for direct gas grid injection or CNG vehicles.",
    summaryVi: "Lên men sinh học hầm phủ bạt HDPE/CSTR, sau đó tách lọc màng hoặc tháp hấp phụ amine loại bỏ CO2/H2S để hòa lưới khí đốt hoặc nén làm khí Bio-CNG.",
    targetMarketEn: "Industrial Boiler Fuel, CNG Transportation Fleets & Article 6 Carbon Credits",
    targetMarketVi: "Nhiên liệu lò hơi công nghiệp, đội xe tải Bio-CNG & Tín chỉ KNK Điều 6",
  },
  {
    id: "kraft_black_liquor_recovery",
    name: "Kraft Chemical & Energy Recovery",
    vietnameseName: "Thu hồi Hóa chất & Năng lượng Dịch đen Giấy Kraft",
    category: "Industrial Recovery",
    categoryVi: "Thu hồi Công nghiệp",
    trl: "TRL 9 (Industry Standard)",
    feedstocksEn: ["Pulp mill black liquor", "Paper manufacturing sludge"],
    feedstocksVi: ["Dịch đen cô đặc nhà máy bột giấy", "Bùn thải nhà máy giấy"],
    primaryOutputEn: "High-Pressure Steam (80 bar) + Regenerated Cooking Chemicals (Na2S/NaOH)",
    primaryOutputVi: "Hơi cao áp (80 bar) + Hóa chất nấu bột tái sinh (Na2S/NaOH)",
    efficiencyRange: "92% – 95% chemical recovery",
    capexRange: "Integrated pulp mill capital asset ($80M–$150M)",
    summaryEn: "Concentration to >70% dry solids followed by combustion in specialized Tomlinson recovery boilers to regenerate sodium salts and produce self-sufficient green energy.",
    summaryVi: "Cô đặc dịch đen lên >70% chất rắn rồi đốt trong lò hơi thu hồi Tomlinson chuyên dụng, tái sinh muối natri và cung cấp 100% hơi - điện xanh tự dùng.",
    targetMarketEn: "Pulp & Paper Industrial Complexes (Bai Bang, Lee & Man)",
    targetMarketVi: "Tổ hợp công nghiệp Bột giấy & Giấy (Bãi Bằng, Lee & Man)",
  },
];

/**
 * Investor Regulatory & Policy Roadmap
 */
export interface InvestorPolicy {
  id: string;
  code: string;
  nameEn: string;
  nameVi: string;
  authorityEn: string;
  authorityVi: string;
  effectiveDate: string;
  category: "power_masterplan" | "market_dppa" | "feedin_tariff" | "biofuel_mandate" | "tax_incentives" | "carbon_market";
  categoryVi: "Quy hoạch điện" | "Thị trường DPPA" | "Biểu giá FIT" | "Lộ trình nhiên liệu" | "Ưu đãi thuế" | "Thị trường Carbon";
  keyProvisionsEn: string[];
  keyProvisionsVi: string[];
  investorImpactEn: string;
  investorImpactVi: string;
  citationId: string;
}

export const INVESTOR_POLICIES: InvestorPolicy[] = [
  {
    id: "pdp8_masterplan",
    code: "Decision 500/QD-TTg & Plan 262/QD-TTg",
    nameEn: "Power Development Plan 8 (PDP8 / QHĐ 8)",
    nameVi: "Quy hoạch Phát triển Điện lực Quốc gia Thời kỳ 2021–2030 (Quy hoạch Điện 8)",
    authorityEn: "Prime Minister & Ministry of Industry and Trade (MOIT)",
    authorityVi: "Thủ tướng Chính phủ & Bộ Công Thương",
    effectiveDate: "2023–2030 (Vision 2050)",
    category: "power_masterplan",
    categoryVi: "Quy hoạch điện",
    keyProvisionsEn: [
      "1,227 MW grid-connected biomass electricity quota by 2030, scaling to 4,000 MW by 2050",
      "600 MW waste-to-energy power by 2030 (1,800 MW by 2050)",
      "20% biomass co-firing mandate for existing pulverized coal thermal power plants by 2030",
      "Priority grid dispatch for base-load renewable biomass generation",
    ],
    keyProvisionsVi: [
      "Chỉ tiêu 1.227 MW điện sinh khối nối lưới đến 2030, nâng lên 4.000 MW đến năm 2050",
      "600 MW điện rác / đốt chất thải đến 2030 (1.800 MW đến 2050)",
      "Lộ trình đốt kèm 20% sinh khối tại các nhà máy nhiệt điện than hiện hữu từ 2030",
      "Ưu tiên huy động công suất phát điện nền từ nguồn sinh khối tái tạo",
    ],
    investorImpactEn: "Provides bankable capacity quotas in provincial power allocation master plans. Projects included in PDP8 are guaranteed grid connection approval.",
    investorImpactVi: "Tạo cơ sở pháp lý và phân bổ hạn ngạch công suất vào quy hoạch phát triển điện lực tỉnh. Dự án có trong danh mục QHĐ 8 được đảm bảo thỏa thuận đấu nối.",
    citationId: "pdp8_masterplan_ref",
  },
  {
    id: "dppa_decrees",
    code: "Decrees 57/2025, 58/2025 & 243/2026/ND-CP",
    nameEn: "Direct Power Purchase Agreement (DPPA) Mechanism",
    nameVi: "Cơ chế Mua bán Điện Trực tiếp (DPPA)",
    authorityEn: "Government of Vietnam",
    authorityVi: "Chính phủ Việt Nam",
    effectiveDate: "2025–2026",
    category: "market_dppa",
    categoryVi: "Thị trường DPPA",
    keyProvisionsEn: [
      "Private-wire direct supply: 0 wheeling charge for on-site dedicated transmission to industrial consumers",
      "Synthetic national grid DPPA: Generators sell to spot market (VWEM) while settling Contracts-for-Differences (CfD) with large corporate buyers",
      "Regulated wheeling transmission fee: fixed at 1.15 US cents/kWh (~292 VND/kWh)",
      "Eligible for multinational corporations seeking 100% RE100 compliance and Scope 2 zero emissions",
    ],
    keyProvisionsVi: [
      "Đường dây riêng (Private wire): Miễn 100% phí truyền tải cho các dự án cấp điện trực tiếp trong khu công nghiệp",
      "Hòa lưới quốc gia (Synthetic DPPA): Bán điện qua thị trường giao ngay (VWEM) và ký Hợp đồng sai lệch (CfD) với khách hàng tiêu thụ lớn",
      "Phí truyền tải lưới định mức: 1,15 US cents/kWh (~292 VNĐ/kWh)",
      "Cấp chứng chỉ I-REC và đáp ứng tiêu chuẩn RE100 / Khử phát thải Scope 2 cho các tập đoàn đa quốc gia",
    ],
    investorImpactEn: "Unlocks non-EVN corporate offtakers with long-term 15–20 year contracts at tariffs 15–30% higher than regulated FiT.",
    investorImpactVi: "Mở ra kênh bán điện trực tiếp cho các doanh nghiệp FDI với hợp đồng dài hạn 15–20 năm, giá bán điện cao hơn 15–30% so với giá FIT truyền thống.",
    citationId: "moit_circular_50_e10",
  },
  {
    id: "biomass_fit",
    code: "Decision 08/2020/QD-TTg",
    nameEn: "Biomass Feed-in Tariff (FiT)",
    nameVi: "Biểu giá Hỗ trợ Điện Sinh khối (FIT)",
    authorityEn: "Prime Minister of Vietnam",
    authorityVi: "Thủ tướng Chính phủ",
    effectiveDate: "Valid & active for 20-year PPA contracts",
    category: "feedin_tariff",
    categoryVi: "Biểu giá FIT",
    keyProvisionsEn: [
      "8.47 US cents/kWh (approx 2,150 VND/kWh) for grid-connected dedicated biomass power plants",
      "7.03 US cents/kWh (approx 1,785 VND/kWh) for bagasse/biomass cogeneration (CHP) plants",
      "20-year standard Power Purchase Agreement (PPA) with EVN, USD-exchange rate adjusted annually",
      "Tax exemptions on imported capital assets and turbine equipment",
    ],
    keyProvisionsVi: [
      "8,47 US cents/kWh (~2.150 VNĐ/kWh) cho các nhà máy điện sinh khối độc lập nối lưới",
      "7,03 US cents/kWh (~1.785 VNĐ/kWh) cho các dự án đồng phát nhiệt điện mía đường (CHP)",
      "Hợp đồng mua bán điện (PPA) chuẩn thời hạn 20 năm với EVN, điều chỉnh trượt giá theo tỷ giá USD/VND hàng năm",
      "Miễn thuế nhập khẩu máy móc, thiết bị turbine và lò hơi chuyên dụng",
    ],
    investorImpactEn: "Provides floor revenue bankability for project finance debt underwriting from local commercial banks.",
    investorImpactVi: "Đảm bảo mức doanh thu sàn tối thiểu giúp dự án dễ dàng tiếp cận nguồn vốn vay ngân hàng thương mại trong nước.",
    citationId: "wb_biomass_atlas_2018",
  },
  {
    id: "e10_biofuel_mandate",
    code: "Circular 50/2025/TT-BCT & Decision 130/QD-TTg",
    nameEn: "National E10 Biofuel Blending Mandate",
    nameVi: "Lộ trình Bắt buộc Phối trộn Xăng Sinh học E10 Toàn quốc",
    authorityEn: "Ministry of Industry and Trade (MOIT)",
    authorityVi: "Bộ Công Thương (MOIT)",
    effectiveDate: "1 June 2026 (Mandatory Nationwide)",
    category: "biofuel_mandate",
    categoryVi: "Lộ trình nhiên liệu",
    keyProvisionsEn: [
      "Mandatory 10% ethanol blend (E10) across all retail fuel pumps in Vietnam starting 1 June 2026",
      "Creates an annual guaranteed domestic demand for 920–1,000 million litres of fuel-grade ethanol",
      "Technical quality specifications aligned with TCVN 8408:2010 (99.5% anhydrous bioethanol)",
      "Obligation on key national petroleum wholesalers (Petrolimex, PVOIL, Saigon Petro) to maintain blending infrastructure",
    ],
    keyProvisionsVi: [
      "Bắt buộc bán xăng sinh học E10 (10% cồn ethanol) tại 100% cây xăng trên toàn quốc từ ngày 1/6/2026",
      "Tạo nhu cầu tiêu thụ cồn ethanol nội địa được bảo đảm từ 920 – 1.000 triệu lít/năm",
      "Tiêu chuẩn kỹ thuật tuân thủ nghiêm ngặt TCVN 8408:2010 (cồn khan biến tính >=99,5%)",
      "Quy định trách nhiệm các thương nhân đầu mối xăng dầu (Petrolimex, PVOIL) đầu tư trạm phối trộn E10",
    ],
    investorImpactEn: "Transforms domestic bioethanol plants (Dung Quat, Dai Viet, Binh Phuoc) into strategic national assets with guaranteed offtake.",
    investorImpactVi: "Tạo thị trường tiêu thụ chắc chắn giúp các nhà máy cồn sinh học trong nước (Dung Quất, Đại Việt, Bình Phước) vận hành tối đa công suất.",
    citationId: "moit_circular_50_e10",
  },
  {
    id: "tax_investment_incentives",
    code: "Law on Investment 2020 & Corporate Income Tax Decrees",
    nameEn: "Corporate Tax Holidays & Land Incentives",
    nameVi: "Ưu đãi Thuế Thu nhập Doanh nghiệp & Tiền thuê đất",
    authorityEn: "Ministry of Finance & Ministry of Planning and Investment",
    authorityVi: "Bộ Tài chính & Bộ Kế hoạch và Đầu tư",
    effectiveDate: "Active",
    category: "tax_incentives",
    categoryVi: "Ưu đãi thuế",
    keyProvisionsEn: [
      "Preferential Corporate Income Tax (CIT) rate of 10% for 15 years for renewable energy investments",
      "Full CIT tax exemption (tax holiday) for the first 4 years of taxable profit",
      "50% reduction in CIT tax payable for the subsequent 9 years",
      "Exemption from import duties on fixed assets, turbine machinery, and analytical equipment not produced domestically",
      "Exemption / reduction of land rental fees during construction and operational phases in rural priority regions",
    ],
    keyProvisionsVi: [
      "Thuế suất thuế TNDN ưu đãi 10% trong thời hạn 15 năm cho dự án đầu tư năng lượng tái tạo",
      "Miễn thuế TNDN 100% trong 4 năm đầu tiên kể từ khi có thu nhập chịu thuế",
      "Giảm 50% số thuế TNDN phải nộp trong 9 năm tiếp theo",
      "Miễn thuế nhập khẩu đối với máy móc, dây chuyền turbine, thiết bị kiểm định chưa sản xuất được trong nước",
      "Miễn / giảm tiền thuê đất trong thời gian xây dựng cơ bản và giai đoạn vận hành tại các địa bàn ưu đãi",
    ],
    investorImpactEn: "Dramatically boosts project internal rate of return (Equity IRR improves by 280–350 bps over asset lifetime).",
    investorImpactVi: "Gia tăng đáng kể tỷ suất hoàn vốn nội bộ (Equity IRR tăng thêm 2,8% – 3,5% trong suốt vòng đời dự án).",
    citationId: "pdp8_masterplan_ref",
  },
  {
    id: "carbon_credit_market",
    code: "Decree 06/2022/ND-CP & Article 6 Framework",
    nameEn: "Domestic Carbon Exchange & Article 6 Offsets",
    nameVi: "Thị trường Tín chỉ Carbon Nội địa & Cơ chế Điều 6 Quốc tế",
    authorityEn: "Ministry of Natural Resources and Environment (MONRE)",
    authorityVi: "Bộ Tài nguyên và Môi trường (MONRE)",
    effectiveDate: "Pilot 2025–2028, Full 2028+",
    category: "carbon_market",
    categoryVi: "Thị trường Carbon",
    keyProvisionsEn: [
      "National emission trading scheme (ETS) and carbon credit exchange commencing pilot operations",
      "Standardized MRV protocols for agricultural methane avoidance (biogas) and biomass coal displacement",
      "Authorization for cross-border carbon credit transfers under Article 6.2 and 6.4 of the Paris Agreement",
      "Voluntary market certification: Verra VCS, Gold Standard, Puro.earth CORC for biochar",
    ],
    keyProvisionsVi: [
      "Vận hành thí điểm sàn giao dịch tín chỉ carbon và hạn ngạch phát thải KNK quốc gia từ 2025–2028",
      "Bộ quy chuẩn đo đạc, báo cáo, thẩm định (MRV) cho các dự án giảm phát thải Methane (Biogas) và thay thế than đá",
      "Khung pháp lý cho phép chuyển giao tín chỉ carbon quốc tế theo Điều 6.2 và 6.4 Thỏa thuận Paris (ITMO)",
      "Chấp thuận các chứng chỉ carbon tự nguyện quốc tế: Verra VCS, Gold Standard, Puro.earth (CORC than sinh học)",
    ],
    investorImpactEn: "Provides secondary revenue stream ($5–$30/tonne CO2e for grid/thermal displacement, $120–$180/tonne for biochar CORC).",
    investorImpactVi: "Bổ sung nguồn doanh thu thứ cấp đáng kể ($5 – $30/tấn CO2e cho điện/nhiệt sinh khối; $120 – $180/tấn cho than sinh học CORC).",
    citationId: "irri_rice_circularity",
  },
];

