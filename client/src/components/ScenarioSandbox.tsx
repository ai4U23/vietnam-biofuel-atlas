/**
 * ScenarioSandbox: Multi-variable decision modeling sandbox for Vietnam Biofuel Atlas.
 * Features 3 interactive tabs with full Vietnamese & English bilingual support:
 *  1. E10 Blend & Cassava Competition Matrix
 *  2. Logistics Friction & Economic Radius Modeler
 *  3. Power, CHP & Decarbonization Balances
 */

import { useState } from "react";
import {
  calculateEthanolScenario,
  calculateLogisticsScenario,
  calculateCHPScenario,
  SCENARIO_DEFAULTS,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Fuel,
  Truck,
  Zap,
  RotateCcw,
  Sliders,
  Scale,
  CloudFog,
  CircleAlert,
  TrendingUp,
} from "lucide-react";

type SandboxTab = "e10" | "logistics" | "chp";

export default function ScenarioSandbox() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].sandbox;
  const [activeTab, setActiveTab] = useState<SandboxTab>("e10");

  // Tab 1 States: E10 & Feedstock Competition
  const [blendRate, setBlendRate] = useState<number>(10);
  const [gasolineDemandScale, setGasolineDemandScale] = useState<number>(100);
  const [plantUtilization, setPlantUtilization] = useState<number>(65);
  const [starchExportShare, setStarchExportShare] = useState<number>(65);

  // Tab 2 States: Logistics & Radius
  const [radiusKm, setRadiusKm] = useState<number>(35);
  const [transportRate, setTransportRate] = useState<number>(1450);
  const [feedstockMoisture, setFeedstockMoisture] = useState<number>(20);
  const [farmgatePrice, setFarmgatePrice] = useState<number>(850);
  const [useWaterway, setUseWaterway] = useState<boolean>(false);

  // Tab 3 States: CHP & Decarbonization
  const [feedstockThroughputKt, setFeedstockThroughputKt] = useState<number>(180);
  const [electricalEff, setElectricalEff] = useState<number>(26);
  const [thermalEff, setThermalEff] = useState<number>(55);
  const [operatingHours, setOperatingHours] = useState<number>(5000);

  // Calculations
  const ethanolResults = calculateEthanolScenario({
    blendRatePct: blendRate,
    gasolineDemandScalePct: gasolineDemandScale,
    domesticPlantUtilizationPct: plantUtilization,
    cassavaStarchExportSharePct: starchExportShare,
  });

  const logisticsResults = calculateLogisticsScenario({
    radiusKm,
    transportRateVNDPerTkm: transportRate,
    feedstockMoisturePct: feedstockMoisture,
    farmgatePriceVNDPerKg: farmgatePrice,
    useWaterwayTransport: useWaterway,
  });

  const chpResults = calculateCHPScenario({
    annualFeedstockProcessedKt: feedstockThroughputKt,
    electricalEfficiencyPct: electricalEff,
    thermalEfficiencyPct: thermalEff,
    annualOperatingHours: operatingHours,
  });

  return (
    <div className="sandbox-wrapper">
      {/* Sandbox Header */}
      <div className="sandbox-header">
        <div className="sandbox-header-left">
          <div className="sandbox-kicker">
            <Sliders size={13} />
            <span>{t.kicker}</span>
          </div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        {/* Tab Switcher */}
        <div className="sandbox-tabs-nav">
          <button
            className={`sandbox-nav-btn ${activeTab === "e10" ? "active" : ""}`}
            onClick={() => setActiveTab("e10")}
          >
            <Fuel size={16} />
            <span>{t.tabs.e10}</span>
          </button>
          <button
            className={`sandbox-nav-btn ${activeTab === "logistics" ? "active" : ""}`}
            onClick={() => setActiveTab("logistics")}
          >
            <Truck size={16} />
            <span>{t.tabs.logistics}</span>
          </button>
          <button
            className={`sandbox-nav-btn ${activeTab === "chp" ? "active" : ""}`}
            onClick={() => setActiveTab("chp")}
          >
            <Zap size={16} />
            <span>{t.tabs.chp}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: E10 & Cassava Market Competition */}
      {activeTab === "e10" && (
        <div className="sandbox-content-grid">
          {/* Controls Column */}
          <div className="sandbox-controls-card">
            <div className="controls-heading">
              <span className="ctrl-num">01</span>
              <div>
                <h4>{t.t1.title}</h4>
                <small>{t.t1.sub}</small>
              </div>
            </div>

            {/* Blend Rate Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="blend-slider">{t.t1.blendLabel}</label>
                <strong>E{blendRate} ({blendRate}% Bioethanol)</strong>
              </div>
              <input
                id="blend-slider"
                type="range"
                min="5"
                max="20"
                step="5"
                value={blendRate}
                onChange={(e) => setBlendRate(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span className={blendRate === 5 ? "active" : ""}>E5 {isVi ? "(Thí điểm)" : "(Pilot)"}</span>
                <span className={blendRate === 10 ? "active" : ""}>E10 {isVi ? "(01/06/2026)" : "(June 2026)"}</span>
                <span className={blendRate === 15 ? "active" : ""}>E15 {isVi ? "(Tương lai)" : "(Future)"}</span>
                <span className={blendRate === 20 ? "active" : ""}>E20 {isVi ? "(Phối sâu)" : "(Deep)"}</span>
              </div>
            </div>

            {/* Gasoline Demand Scale */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="demand-scale">{t.t1.demandLabel}</label>
                <strong>{gasolineDemandScale}% ({ethanolResults.effectiveGasolineDemandMillionL.toLocaleString()} M L)</strong>
              </div>
              <input
                id="demand-scale"
                type="range"
                min="70"
                max="130"
                step="5"
                value={gasolineDemandScale}
                onChange={(e) => setGasolineDemandScale(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>70% {isVi ? "Thận trọng" : "Cautious"}</span>
                <span>100% {isVi ? "Cơ sở MOIT" : "Baseline"}</span>
                <span>130% {isVi ? "Tăng trưởng cao" : "High Growth"}</span>
              </div>
            </div>

            {/* Domestic Plant Utilization */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="plant-util">{t.t1.utilLabel}</label>
                <strong>{plantUtilization}% ({ethanolResults.effectiveDomesticSupplyMillionL} M L/{isVi ? "năm" : "yr"})</strong>
              </div>
              <input
                id="plant-util"
                type="range"
                min="20"
                max="100"
                step="5"
                value={plantUtilization}
                onChange={(e) => setPlantUtilization(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>20% {isVi ? "Đình trệ" : "Stalled"}</span>
                <span>65% {isVi ? "Hiện tại" : "Current"}</span>
                <span>100% {isVi ? "Tối đa công suất" : "Full Capacity"}</span>
              </div>
            </div>

            {/* Starch Export Share */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="starch-share">{t.t1.starchLabel}</label>
                <strong>{starchExportShare}% {isVi ? "Bảo lưu" : "Reserved"}</strong>
              </div>
              <input
                id="starch-share"
                type="range"
                min="40"
                max="85"
                step="5"
                value={starchExportShare}
                onChange={(e) => setStarchExportShare(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>40% {isVi ? "Ưu tiên cồn" : "Fuel Pivot"}</span>
                <span>65% {isVi ? "Lịch sử" : "Historical"}</span>
                <span>85% {isVi ? "Ưu tiên xuất khẩu" : "Export Priority"}</span>
              </div>
            </div>

            <button
              className="reset-btn"
              onClick={() => {
                setBlendRate(10);
                setGasolineDemandScale(100);
                setPlantUtilization(65);
                setStarchExportShare(65);
              }}
            >
              <RotateCcw size={12} />
              <span>{t.t1.resetBtn}</span>
            </button>
          </div>

          {/* Results Column */}
          <div className="sandbox-results-card">
            <div className="results-badge">
              <Scale size={14} />
              <span>{t.t1.resultsBadge}</span>
            </div>

            <div className="metrics-summary-grid">
              <div className="metric-box primary">
                <small>{t.t1.ethanolDemand}</small>
                <strong>{ethanolResults.requiredEthanolMillionL.toLocaleString()} <em>{isVi ? "triệu L/năm" : "million L/yr"}</em></strong>
                <span>{isVi ? `Tính theo lộ trình bắt buộc E${blendRate}` : `Calculated under E${blendRate} policy mandate`}</span>
              </div>

              <div className="metric-box">
                <small>{t.t1.domesticSupply}</small>
                <strong>{ethanolResults.effectiveDomesticSupplyMillionL.toLocaleString()} <em>{isVi ? "triệu L/năm" : "million L/yr"}</em></strong>
                <span>{isVi ? `Tại mức ${plantUtilization}% công suất vận hành` : `At ${plantUtilization}% operating capacity`}</span>
              </div>

              <div className="metric-box alert">
                <small>{t.t1.supplyGap}</small>
                <strong>{ethanolResults.ethanolSupplyGapMillionL.toLocaleString()} <em>{isVi ? "triệu L/năm" : "million L/yr"}</em></strong>
                <span>{isVi ? "Mức độ phụ thuộc nguồn cồn nhập khẩu" : "Net exposure to international ethanol shipments"}</span>
              </div>

              <div className="metric-box">
                <small>{t.t1.dryChipsNeeded}</small>
                <strong>{ethanolResults.totalDryChipsNeededKt.toLocaleString()} <em>{isVi ? "nghìn tấn/năm" : "kt/year"}</em></strong>
                <span>{isVi ? "Định mức 400 L cồn/tấn sắn lát khô" : "At 400 L fuel ethanol per tonne chips"}</span>
              </div>
            </div>

            {/* Competition Stress Indicator */}
            <div className="stress-gauge-box">
              <div className="stress-label-row">
                <span>{t.t1.stressTitle}</span>
                <strong
                  className={
                    ethanolResults.competitionStressIndex > 70
                      ? "text-stress-high"
                      : ethanolResults.competitionStressIndex > 40
                      ? "text-stress-mid"
                      : "text-stress-low"
                  }
                >
                  {ethanolResults.competitionStressIndex}% ·{" "}
                  {ethanolResults.competitionStressIndex > 70
                    ? t.t1.stressHigh
                    : ethanolResults.competitionStressIndex > 40
                    ? t.t1.stressMid
                    : t.t1.stressLow}
                </strong>
              </div>
              <div className="stress-track">
                <div
                  className="stress-fill"
                  style={{
                    width: `${ethanolResults.competitionStressIndex}%`,
                    backgroundColor:
                      ethanolResults.competitionStressIndex > 70
                        ? "#c76d43"
                        : ethanolResults.competitionStressIndex > 40
                        ? "#e3a72f"
                        : "#7d9d68",
                  }}
                />
              </div>
              <div className="stress-context">
                <span>
                  {t.t1.stressContext} {ethanolResults.chipsAvailableForEnergyKt.toLocaleString()} {isVi ? "nghìn tấn/năm" : "kt/yr"}.
                </span>
              </div>
            </div>

            {/* Decarbonization Footprint */}
            <div className="ghg-benefit-row">
              <TrendingUp size={16} />
              <div>
                <strong>{t.t1.ghgBenefit} {ethanolResults.ghgSavedKtCO2.toLocaleString()} {isVi ? "nghìn tấn CO₂e/năm" : "kt CO₂e/year"}</strong>
                <span>{t.t1.ghgDesc}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Logistics Friction & Hauling Modeler */}
      {activeTab === "logistics" && (
        <div className="sandbox-content-grid">
          {/* Controls Column */}
          <div className="sandbox-controls-card">
            <div className="controls-heading">
              <span className="ctrl-num">02</span>
              <div>
                <h4>{t.t2.title}</h4>
                <small>{t.t2.sub}</small>
              </div>
            </div>

            {/* Collection Radius Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="radius-slider">{t.t2.radiusLabel}</label>
                <strong>{radiusKm} km ({t.t2.avgHaul}: {logisticsResults.avgDistanceKm} km)</strong>
              </div>
              <input
                id="radius-slider"
                type="range"
                min="10"
                max="80"
                step="5"
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>10 km ({isVi ? "Siêu cục bộ" : "Hyper-local"})</span>
                <span>35 km ({isVi ? "Tiêu chuẩn" : "Standard"})</span>
                <span>80 km ({isVi ? "Vươn xa vùng" : "Regional Stretch"})</span>
              </div>
            </div>

            {/* Waterway Barging Toggle */}
            <div className="control-group toggle-group">
              <div className="toggle-label-wrap">
                <label htmlFor="waterway-toggle">{t.t2.waterwayLabel}</label>
                <small>{t.t2.waterwaySub}</small>
              </div>
              <button
                id="waterway-toggle"
                className={`toggle-switch ${useWaterway ? "on" : "off"}`}
                onClick={() => setUseWaterway(!useWaterway)}
                aria-pressed={useWaterway}
              >
                <span>{useWaterway ? (isVi ? "BẬT (Sà lan)" : "ON (Barge)") : (isVi ? "TẮT (Xe tải)" : "OFF (Truck)")}</span>
              </button>
            </div>

            {/* Transport Freight Rate */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="freight-rate">{t.t2.freightLabel}</label>
                <strong>{transportRate.toLocaleString()} VND / {isVi ? "tấn·km" : "tonne-km"}</strong>
              </div>
              <input
                id="freight-rate"
                type="range"
                min="900"
                max="2400"
                step="50"
                value={transportRate}
                onChange={(e) => setTransportRate(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>900 ({isVi ? "Cao tốc bằng phẳng" : "Flat Highway"})</span>
                <span>1.450 ({isVi ? "Đường liên huyện" : "Rural Mixed"})</span>
                <span>2.400 ({isVi ? "Đèo dốc đồi núi" : "Mountain Corridor"})</span>
              </div>
            </div>

            {/* Moisture Content */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="moisture-slider">{t.t2.moistureLabel}</label>
                <strong>{feedstockMoisture}% {isVi ? "Độ ẩm" : "Moisture"}</strong>
              </div>
              <input
                id="moisture-slider"
                type="range"
                min="10"
                max="50"
                step="5"
                value={feedstockMoisture}
                onChange={(e) => setFeedstockMoisture(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>10% ({isVi ? "Trấu/rơm phơi khô" : "Dried Straw/Husk"})</span>
                <span>25% ({isVi ? "Bán khô" : "Semi-dry"})</span>
                <span>50% ({isVi ? "Bã mía tươi/phân" : "Wet Bagasse/Manure"})</span>
              </div>
            </div>

            {/* Farmgate Purchase Price */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="farmgate-price">{t.t2.farmgateLabel}</label>
                <strong>{farmgatePrice.toLocaleString()} VND / kg</strong>
              </div>
              <input
                id="farmgate-price"
                type="range"
                min="400"
                max="1600"
                step="50"
                value={farmgatePrice}
                onChange={(e) => setFarmgatePrice(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>400 ({isVi ? "Rơm dư thừa" : "Surplus Straw"})</span>
                <span>850 ({isVi ? "Trấu thương phẩm" : "Market Husk"})</span>
                <span>1.600 ({isVi ? "Sắn lát loại 1" : "Quality Chips"})</span>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="sandbox-results-card">
            <div className="results-badge">
              <Truck size={14} />
              <span>{t.t2.resultsBadge}</span>
            </div>

            <div className="metrics-summary-grid">
              <div className="metric-box primary">
                <small>{t.t2.totalCost}</small>
                <strong>{logisticsResults.totalDeliveredCostPerKgVND.toLocaleString()} <em>VND/kg</em></strong>
                <span>{isVi ? `Giá ruộng (${farmgatePrice}đ) + Vận tải (${Math.round(logisticsResults.transportCostPerTonneVND / 1000)}đ)` : `Farmgate (${farmgatePrice}đ) + Freight (${Math.round(logisticsResults.transportCostPerTonneVND / 1000)}đ)`}</span>
              </div>

              <div className="metric-box">
                <small>{t.t2.lhvLabel}</small>
                <strong>{logisticsResults.effectiveLHV_MJPerKg} <em>MJ/kg</em></strong>
                <span>{isVi ? `Nhiệt trị thực nhận bị giảm bởi ${feedstockMoisture}% độ ẩm` : `LHV penalized by ${feedstockMoisture}% moisture`}</span>
              </div>

              <div className="metric-box">
                <small>{t.t2.unitEnergyCost}</small>
                <strong>{logisticsResults.costVNDPerGJ.toLocaleString()} <em>VND/GJ</em></strong>
                <span>{isVi ? "Tương đương" : "Equivalent to"} <strong>${logisticsResults.costUSDPerMWh} / MWh<sub>th</sub></strong></span>
              </div>

              <div className="metric-box alert">
                <small>{t.t2.maxRadius}</small>
                <strong>{logisticsResults.maxEconomicRadiusKm} <em>km</em></strong>
                <span>{isVi ? "Ngưỡng cước vận tải vượt quá 40% giá thành giao" : "Threshold where hauling exceeds 40% of delivered cost"}</span>
              </div>
            </div>

            <div className="logistics-insight-box">
              <CircleAlert size={16} />
              <p>
                <b>{t.t2.ruleTitle}</b> {t.t2.ruleText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Power, CHP & Decarbonization Balances */}
      {activeTab === "chp" && (
        <div className="sandbox-content-grid">
          {/* Controls Column */}
          <div className="sandbox-controls-card">
            <div className="controls-heading">
              <span className="ctrl-num">03</span>
              <div>
                <h4>{t.t3.title}</h4>
                <small>{t.t3.sub}</small>
              </div>
            </div>

            {/* Annual Feedstock Throughput */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="feedstock-throughput">{t.t3.throughputLabel}</label>
                <strong>{feedstockThroughputKt.toLocaleString()} {isVi ? "nghìn tấn/năm" : "kt / yr"}</strong>
              </div>
              <input
                id="feedstock-throughput"
                type="range"
                min="50"
                max="450"
                step="10"
                value={feedstockThroughputKt}
                onChange={(e) => setFeedstockThroughputKt(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>50 kt ({isVi ? "Nhà máy đơn lẻ" : "Single Mill"})</span>
                <span>180 kt ({isVi ? "Tổ hợp đường mía" : "Sugar Complex"})</span>
                <span>450 kt ({isVi ? "Cụm liên vùng" : "Regional Cluster"})</span>
              </div>
            </div>

            {/* Electrical Efficiency */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="elec-eff">{t.t3.elecEffLabel}</label>
                <strong>{electricalEff}% ({isVi ? "Tua-bin hơi" : "Steam Turbine"})</strong>
              </div>
              <input
                id="elec-eff"
                type="range"
                min="18"
                max="32"
                step="1"
                value={electricalEff}
                onChange={(e) => setElectricalEff(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>18% ({isVi ? "Áp suất thấp 25 bar" : "Low-P Boiler 25 bar"})</span>
                <span>26% ({isVi ? "Nâng cấp 65 bar" : "Modernized 65 bar"})</span>
                <span>32% ({isVi ? "Áp suất cao 90 bar" : "High-P Reheat 90 bar"})</span>
              </div>
            </div>

            {/* Thermal Useful Efficiency */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="thermal-eff">{t.t3.thermalEffLabel}</label>
                <strong>{thermalEff}% {isVi ? "Nhiệt sấy hữu ích" : "Useful Process Heat"}</strong>
              </div>
              <input
                id="thermal-eff"
                type="range"
                min="40"
                max="75"
                step="5"
                value={thermalEff}
                onChange={(e) => setThermalEff(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>40% ({isVi ? "Nhiệt sấy đơn thuần" : "Process Heat Only"})</span>
                <span>55% ({isVi ? "Đồng phát cân bằng" : "Balanced CHP"})</span>
                <span>75% ({isVi ? "Trích hơi triệt để" : "Full Extraction"})</span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="operating-hours">{t.t3.operatingHoursLabel}</label>
                <strong>{operatingHours.toLocaleString()} {isVi ? "giờ/năm" : "hrs / yr"}</strong>
              </div>
              <input
                id="operating-hours"
                type="range"
                min="2500"
                max="7500"
                step="250"
                value={operatingHours}
                onChange={(e) => setOperatingHours(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>3.000 h ({isVi ? "Vụ ép mía" : "Milling Season"})</span>
                <span>5.000 h ({isVi ? "Đốt kèm/nghỉ vụ" : "Offseason"})</span>
                <span>7.500 h ({isVi ? "Chạy nền lưới" : "Baseload Grid"})</span>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="sandbox-results-card">
            <div className="results-badge">
              <Zap size={14} />
              <span>{t.t3.resultsBadge}</span>
            </div>

            <div className="metrics-summary-grid">
              <div className="metric-box primary">
                <small>{t.t3.capacityLabel}</small>
                <strong>{chpResults.electricalCapacityMW} <em>MW</em></strong>
                <span>{isVi ? "Công suất điện sạch phát dispatchable" : "Dispatchable clean power capacity"}</span>
              </div>

              <div className="metric-box">
                <small>{t.t3.elecGenLabel}</small>
                <strong>{chpResults.grossElectricityGWh.toLocaleString()} <em>{isVi ? "GWh/năm" : "GWh/yr"}</em></strong>
                <span>{isVi ? "Cung cấp cho tự dùng và hòa lưới EVN" : "Delivered to on-site process and EVN grid"}</span>
              </div>

              <div className="metric-box">
                <small>{t.t3.coalDisplaced}</small>
                <strong>{chpResults.displacedCoalTonnes.toLocaleString()} <em>{isVi ? "tấn/năm" : "tonnes/yr"}</em></strong>
                <span>{isVi ? "Tương đương than antracit thay thế" : "Equivalent anthracite fuel displaced"}</span>
              </div>

              <div className="metric-box alert">
                <small>{t.t3.co2Avoided}</small>
                <strong>{chpResults.totalCO2AvoidedKt.toLocaleString()} <em>{isVi ? "nghìn tấn CO₂e/năm" : "kt CO₂e/yr"}</em></strong>
                <span>{isVi ? "Tổng phát thải KNK điện & nhiệt cắt giảm" : "Combined grid & industrial heat decarbonization"}</span>
              </div>
            </div>

            {/* Air Quality PM2.5 Box */}
            <div className="air-quality-box">
              <CloudFog size={18} />
              <div>
                <strong>{t.t3.pmLabel} {chpResults.avoidedPM25Tonnes.toLocaleString()} {isVi ? "tấn/năm" : "tonnes/yr"}</strong>
                <span>{t.t3.pmDesc}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
