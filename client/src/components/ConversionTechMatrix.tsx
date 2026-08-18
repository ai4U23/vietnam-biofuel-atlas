/**
 * ConversionTechMatrix Component
 * Technical guide to Biomass Combustion (Grate, BFB, CFB) and Advanced Conversion & Refining Pathways
 * (Wood Pellets, HEFA Aviation SAF, Biodiesel FAME, Biomethane, Pyrolysis Biochar, and Kraft Black Liquor Recovery).
 */
import { useState } from "react";
import {
  BOILER_TECHNOLOGIES,
  CONVERSION_TECHNOLOGIES,
  BoilerTechnology,
  ConversionTechnology,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import CitationRef from "@/components/CitationRef";
import {
  Flame,
  Layers,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Factory,
  Cpu,
  Plane,
  Fuel,
  TreePine,
  RotateCcw,
  Gauge,
  Boxes,
} from "lucide-react";

export default function ConversionTechMatrix() {
  const { language, isVi } = useLanguage();
  const tConv = TRANSLATIONS[language].conversion;
  const tBoiler = TRANSLATIONS[language].boiler;

  const [activeTab, setActiveTab] = useState<"combustion" | "conversion">("conversion");
  const [selectedBoilerId, setSelectedBoilerId] = useState<string>("bfb");
  const [selectedConversionId, setSelectedConversionId] = useState<string>("wood_pelleting");

  const selectedBoiler =
    BOILER_TECHNOLOGIES.find((b) => b.id === selectedBoilerId) || BOILER_TECHNOLOGIES[0];

  const selectedConversion =
    CONVERSION_TECHNOLOGIES.find((c) => c.id === selectedConversionId) ||
    CONVERSION_TECHNOLOGIES[0];

  const getTechIcon = (id: string) => {
    switch (id) {
      case "wood_pelleting":
        return TreePine;
      case "direct_combustion_chp":
        return Flame;
      case "transesterification_fame":
        return Fuel;
      case "hefa_saf_hvo":
        return Plane;
      case "fast_pyrolysis_biochar":
        return Sparkles;
      case "anaerobic_digestion_biomethane":
        return RotateCcw;
      case "kraft_black_liquor_recovery":
        return Factory;
      default:
        return Cpu;
    }
  };

  return (
    <div className="conversion-matrix-container">
      {/* Section Header */}
      <div className="conversion-header">
        <div>
          <div className="section-kicker">
            <Cpu size={14} />
            <span>{tConv.kicker}</span>
          </div>
          <h3>
            {tConv.title}{" "}
            <CitationRef ids={["giz_esia_guidelines", "uk_pact_tcf_report", "wood_pellets_export_vpa"]} />
          </h3>
          <p>{tConv.subtitle}</p>
        </div>

        {/* Dual Tab Mode Switcher */}
        <div className="conversion-mode-tabs" role="tablist" aria-label="Conversion vs Combustion">
          <button
            type="button"
            className={`mode-tab-btn ${activeTab === "conversion" ? "active" : ""}`}
            onClick={() => setActiveTab("conversion")}
            role="tab"
            aria-selected={activeTab === "conversion"}
          >
            <Boxes size={15} />
            <span>{tConv.tabs.conversion}</span>
          </button>
          <button
            type="button"
            className={`mode-tab-btn ${activeTab === "combustion" ? "active" : ""}`}
            onClick={() => setActiveTab("combustion")}
            role="tab"
            aria-selected={activeTab === "combustion"}
          >
            <Flame size={15} />
            <span>{tConv.tabs.combustion}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ADVANCED CONVERSION & REFINING PATHWAYS */}
      {activeTab === "conversion" && (
        <div className="conversion-grid-layout">
          <div className="conversion-cards-grid">
            {CONVERSION_TECHNOLOGIES.map((tech) => {
              const Icon = getTechIcon(tech.id);
              const isSelected = selectedConversionId === tech.id;

              return (
                <div
                  key={tech.id}
                  className={`conversion-tech-card ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedConversionId(tech.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedConversionId(tech.id)}
                >
                  <div className="conv-card-top">
                    <div className="conv-card-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4>{isVi ? tech.vietnameseName : tech.name}</h4>
                      <span className="conv-cat-tag">
                        {isVi ? tech.categoryVi : tech.category}
                      </span>
                    </div>
                  </div>

                  <p className="conv-summary">{isVi ? tech.summaryVi : tech.summaryEn}</p>

                  <div className="conv-specs-table">
                    <div className="spec-row">
                      <span>{tConv.trlLabel}</span>
                      <strong className="text-gold">{tech.trl}</strong>
                    </div>
                    <div className="spec-row">
                      <span>{tConv.effLabel}</span>
                      <strong>{tech.efficiencyRange}</strong>
                    </div>
                    <div className="spec-row">
                      <span>{tConv.capexLabel}</span>
                      <strong>{tech.capexRange}</strong>
                    </div>
                  </div>

                  <div className="conv-feedstock-chips">
                    <small>{tConv.suitableForLabel}</small>
                    <div className="chips-wrap">
                      {(isVi ? tech.feedstocksVi : tech.feedstocksEn).map((f) => (
                        <span key={f} className="feedstock-chip">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="conv-output-highlight">
                    <span>{tConv.outputLabel}</span>
                    <strong>{isVi ? tech.primaryOutputVi : tech.primaryOutputEn}</strong>
                  </div>

                  <div className="conv-market-highlight">
                    <span>{tConv.marketLabel}</span>
                    <small>{isVi ? tech.targetMarketVi : tech.targetMarketEn}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BOILER COMBUSTION & ESIA ASH RECYCLING */}
      {activeTab === "combustion" && (
        <div className="boiler-view-container">
          <div className="boiler-cards-grid">
            {BOILER_TECHNOLOGIES.map((tech) => {
              const isSelected = selectedBoilerId === tech.id;
              return (
                <div
                  key={tech.id}
                  className={`boiler-card ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedBoilerId(tech.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedBoilerId(tech.id)}
                >
                  <div className="boiler-card-header">
                    <Flame size={20} />
                    <div>
                      <h4>{isVi ? tech.vietnameseName : tech.name}</h4>
                      <small>{tech.id.toUpperCase()}</small>
                    </div>
                  </div>

                  <p className="boiler-summary">{isVi ? tech.summaryVi : tech.summaryEn}</p>

                  <div className="boiler-specs-list">
                    <div className="spec-item">
                      <span>{tBoiler.effLabel}</span>
                      <strong>
                        {tech.electricalEfficiencyRange} <CitationRef id="uk_pact_tcf_report" />
                      </strong>
                    </div>
                    <div className="spec-item">
                      <span>{tBoiler.moistureLabel}</span>
                      <strong>&le; {tech.moistureTolerancePct}%</strong>
                    </div>
                    <div className="spec-item">
                      <span>{tBoiler.capexLabel}</span>
                      <strong>
                        {tech.capexUSDPerKW} <CitationRef id="uk_pact_tcf_report" />
                      </strong>
                    </div>
                    <div className="spec-item">
                      <span>{tBoiler.slaggingLabel}</span>
                      <strong className={tech.slaggingRiskEn === "Low" ? "text-cane" : "text-clay"}>
                        {isVi ? tech.slaggingRiskVi : tech.slaggingRiskEn}
                      </strong>
                    </div>
                  </div>

                  <div className="suited-feedstocks">
                    <small>{tBoiler.suitableForLabel}</small>
                    <div className="feedstock-pills">
                      {(isVi ? tech.bestFeedstocksVi : tech.bestFeedstocksEn).map((f) => (
                        <span key={f}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ESIA Compliance & Ash Circularity Callout */}
          <div className="esia-standard-callout">
            <div className="callout-left">
              <Layers size={22} />
              <div>
                <h4>
                  {tBoiler.ashHeading}:{" "}
                  <span>{isVi ? selectedBoiler.vietnameseName : selectedBoiler.name}</span>
                </h4>
                <p>{isVi ? selectedBoiler.ashReuseSuitabilityVi : selectedBoiler.ashReuseSuitabilityEn}</p>
              </div>
            </div>
            <div className="callout-badge">
              <CheckCircle2 size={16} />
              <span>{tBoiler.esiaCompliantBadge}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
