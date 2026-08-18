/**
 * BiodieselExportCorridors Component
 * Demonstrates Vietnam's domestic B5/B10 policy reality vs global B100, HVO, and SAF export corridors.
 * Covers Used Cooking Oil (UCO), Pangasius Fish Fat, Cashew Nut Shell Liquid (CNSL), and Rubber Seed Oil.
 */
import { useState } from "react";
import {
  BIODIESEL_FEEDSTOCKS,
  EXPORT_CORRIDORS,
  calculateBiodieselExportScenario,
  BiodieselFeedstock,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import {
  Ship,
  Globe2,
  TrendingUp,
  Award,
  Sparkles,
  Sliders,
  DollarSign,
  Droplets,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Factory,
} from "lucide-react";

export default function BiodieselExportCorridors() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].biodiesel;

  const [selectedFeedstockId, setSelectedFeedstockId] = useState<string>("uco");
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>("eu_red3");
  const [throughputKt, setThroughputKt] = useState<number>(25);
  const [farmgatePriceVND, setFarmgatePriceVND] = useState<number>(16500);
  const [freightUSD, setFreightUSD] = useState<number>(75);

  const selectedFeedstock =
    BIODIESEL_FEEDSTOCKS.find((f) => f.id === selectedFeedstockId) || BIODIESEL_FEEDSTOCKS[0];
  const selectedCorridor = EXPORT_CORRIDORS[selectedCorridorId] || EXPORT_CORRIDORS.eu_red3;

  const results = calculateBiodieselExportScenario({
    feedstockId: selectedFeedstockId,
    annualFeedstockThroughputTonnes: throughputKt * 1000,
    farmgatePriceVNDPerKg: farmgatePriceVND,
    corridorId: selectedCorridorId,
    freightCostUSDPerTonne: freightUSD,
  });

  const handleFeedstockChange = (f: BiodieselFeedstock) => {
    setSelectedFeedstockId(f.id);
    setFarmgatePriceVND(f.pricePerKgVND);
  };

  return (
    <div className="biodiesel-container">
      {/* Policy Divergence Callout Banner */}
      <div className="policy-divergence-card">
        <div className="divergence-header">
          <div className="divergence-badge">
            <Globe2 size={15} />
            <span>{t.divergenceBadge}</span>
          </div>
          <h3>{t.divergenceTitle}</h3>
          <p>{t.divergenceSubtitle}</p>
        </div>

        <div className="divergence-grid">
          <div className="divergence-col domestic">
            <div className="col-tag">
              <span className="dot" />
              <strong>{t.domesticHeading}</strong>
            </div>
            <h4>{t.domesticSub}</h4>
            <p>{t.domesticBody}</p>
            <div className="col-metric-row">
              <div>
                <small>{t.mandateStatusLabel}</small>
                <strong>{t.mandateStatusVal}</strong>
              </div>
              <div>
                <small>{t.blendShareLabel}</small>
                <strong>{t.blendShareVal}</strong>
              </div>
            </div>
          </div>

          <div className="divergence-col export">
            <div className="col-tag">
              <span className="dot active" />
              <strong>{t.exportHeading}</strong>
            </div>
            <h4>{t.exportSub}</h4>
            <p>{t.exportBody}</p>
            <div className="col-metric-row">
              <div>
                <small>{t.exportValueLabel}</small>
                <strong className="text-gold">{t.exportValueVal}</strong>
              </div>
              <div>
                <small>{t.premiumIncentiveLabel}</small>
                <strong className="text-gold">{t.premiumIncentiveVal}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Waste & Non-Food Biodiesel Feedstocks Grid */}
      <div className="bio-feedstocks-section">
        <div className="section-title-row">
          <div>
            <div className="section-kicker">{t.feedstockKicker}</div>
            <h3>{t.feedstockTitle}</h3>
          </div>
          <p>{t.feedstockSubtitle}</p>
        </div>

        <div className="bio-feedstocks-grid">
          {BIODIESEL_FEEDSTOCKS.map((f) => {
            const isSelected = selectedFeedstockId === f.id;
            return (
              <div
                key={f.id}
                className={`bio-feedstock-card ${isSelected ? "active" : ""}`}
                onClick={() => handleFeedstockChange(f)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleFeedstockChange(f)}
              >
                <div className="card-header">
                  <div>
                    <span className="feedstock-type-tag">
                      {f.type === "waste_oil"
                        ? isVi ? "Dầu Thải Tái Chế" : "Waste Oil"
                        : f.type === "animal_fat"
                        ? isVi ? "Mỡ Động Vật" : "Animal Tallow"
                        : f.type === "agro_industrial_oil"
                        ? isVi ? "Phụ Phẩm Hạt Điều" : "Cashew Shell"
                        : isVi ? "Dầu Phi Thực Phẩm" : "Non-Food Oil"}
                    </span>
                    <h4>{isVi ? f.vietnameseName : f.name}</h4>
                  </div>
                  <div className="ci-badge">
                    <small>CI Score</small>
                    <strong>{f.carbonIntensityScore}</strong>
                    <span>gCO₂e/MJ</span>
                  </div>
                </div>

                <p className="feedstock-desc">{isVi ? f.descriptionVi : f.descriptionEn}</p>

                <div className="card-stats-grid">
                  <div>
                    <span>{isVi ? "Tiềm năng năm" : "Annual scale"}</span>
                    <strong>{f.annualPotentialTonnes.toLocaleString()} t/{isVi ? "năm" : "yr"}</strong>
                  </div>
                  <div>
                    <span>{isVi ? "Hiệu suất FAME" : "FAME Yield"}</span>
                    <strong>{f.fameYieldPct}%</strong>
                  </div>
                  <div>
                    <span>{isVi ? "Giảm phát thải" : "GHG Reduction"}</span>
                    <strong className="text-cane">-{f.ghgReductionVsFossilPct}%</strong>
                  </div>
                </div>

                <div className="card-footer-tags">
                  {f.keyMarkets.slice(0, 2).map((m) => (
                    <span key={m} className="market-pill">
                      <Ship size={11} /> {m}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Export Netback & Carbon Premium Calculator */}
      <div className="export-calculator-wrapper">
        <div className="calc-header">
          <div className="calc-title-left">
            <div className="section-kicker">
              <Sliders size={13} />
              <span>{t.calcKicker}</span>
            </div>
            <h3>{t.calcTitle}</h3>
            <p>{t.calcSubtitle}</p>
          </div>

          {/* Corridor Switcher */}
          <div className="corridor-selector-tabs" role="tablist">
            {Object.values(EXPORT_CORRIDORS).map((c) => (
              <button
                key={c.id}
                className={`corridor-tab-btn ${selectedCorridorId === c.id ? "active" : ""}`}
                onClick={() => setSelectedCorridorId(c.id)}
                role="tab"
                aria-selected={selectedCorridorId === c.id}
              >
                <Ship size={14} />
                <span>{c.name.split("(")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="calc-grid">
          {/* Controls Column */}
          <div className="calc-controls-card">
            <h4>{t.calcParamsHeading}</h4>

            {/* Throughput Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <label>{t.throughputLabel}</label>
                <strong>{throughputKt.toLocaleString()} kt/{isVi ? "năm" : "yr"}</strong>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={throughputKt}
                onChange={(e) => setThroughputKt(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>5 kt</span>
                <span>25 kt (Standard)</span>
                <span>50 kt</span>
                <span>80 kt (Commercial)</span>
              </div>
            </div>

            {/* Farmgate Price Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <label>{t.gatePriceLabel} ({isVi ? selectedFeedstock.vietnameseName : selectedFeedstock.name})</label>
                <strong>{farmgatePriceVND.toLocaleString()} VND/kg</strong>
              </div>
              <input
                type="range"
                min="8000"
                max="25000"
                step="500"
                value={farmgatePriceVND}
                onChange={(e) => setFarmgatePriceVND(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>8,000</span>
                <span>16,500 (UCO Base)</span>
                <span>25,000 VND</span>
              </div>
            </div>

            {/* Ocean Freight Slider */}
            <div className="control-group">
              <div className="control-label-row">
                <label>{t.freightLabel} ({selectedCorridor.destinationPort})</label>
                <strong>${freightUSD} USD/t</strong>
              </div>
              <input
                type="range"
                min="30"
                max="160"
                step="5"
                value={freightUSD}
                onChange={(e) => setFreightUSD(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>$30 (Regional)</span>
                <span>$75 (EU Bulk)</span>
                <span>$160 (US Coast)</span>
              </div>
            </div>

            {/* Destination Compliance Specs */}
            <div className="corridor-compliance-box">
              <div className="compliance-title">
                <ShieldCheck size={16} />
                <span>{selectedCorridor.mandatoryFramework}</span>
              </div>
              <ul>
                {selectedCorridor.keyRequirements.map((req) => (
                  <li key={req}>
                    <CheckCircle2 size={13} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="calc-results-card">
            <h4>{t.calcOutputHeading}</h4>

            <div className="output-hero-metric">
              <div className="hero-metric-label">
                <span>{t.annualNetMarginLabel}</span>
                <small>{selectedFeedstock.name} → {selectedCorridor.name}</small>
              </div>
              <div className="hero-metric-value">
                <strong>${(results.netOperatingMarginUSD / 1000000).toFixed(2)}M</strong>
                <span>USD/{isVi ? "năm" : "year"}</span>
              </div>
              <div className="hero-metric-sub">
                <span>{t.marginPerTonneLabel}: <b>${results.netMarginPerTonneUSD.toFixed(1)}/t</b></span>
                <span className="margin-pct-tag">+{results.marginPct}% Margin</span>
              </div>
            </div>

            <div className="results-metrics-grid">
              <div className="res-metric-item">
                <small>{t.neatBioProducedLabel}</small>
                <strong>{results.neatBiodieselProducedTonnes.toLocaleString()} t</strong>
                <span>FAME Yield: {selectedFeedstock.fameYieldPct}%</span>
              </div>
              <div className="res-metric-item">
                <small>{t.fobExportPriceLabel}</small>
                <strong>${results.grossRealizedPricePerTonneUSD}</strong>
                <span>Base + Carbon Premium</span>
              </div>
              <div className="res-metric-item">
                <small>{t.landedOpexLabel}</small>
                <strong>${results.costPerTonneProductUSD}</strong>
                <span>Feedstock + OPEX + Freight</span>
              </div>
              <div className="res-metric-item">
                <small>{t.co2AbatedLabel}</small>
                <strong className="text-cane">{results.netCO2AbatedTonnes.toLocaleString()} t</strong>
                <span>Avoided Fossil GHG</span>
              </div>
            </div>

            <div className="calc-footer-note">
              <Sparkles size={16} />
              <p>{t.calcFooterNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
