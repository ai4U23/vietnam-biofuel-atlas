/**
 * BoilerTechMatrix Component
 * Technical and environmental guide to Biomass Combustion Technologies (Grate vs BFB vs CFB)
 * Derived from GIZ/MOIT ESIA Handbooks and TCF Technology Factsheets.
 */
import { useState } from "react";
import { BOILER_TECHNOLOGIES, BoilerTechnology } from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { Flame, Layers, ShieldAlert, Sparkles, CheckCircle2, Factory } from "lucide-react";

export default function BoilerTechMatrix() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].boiler;
  const [selectedTechId, setSelectedTechId] = useState<string>("bfb");

  const selectedTech =
    BOILER_TECHNOLOGIES.find((b) => b.id === selectedTechId) || BOILER_TECHNOLOGIES[0];

  return (
    <div className="boiler-matrix-container">
      <div className="boiler-header">
        <div>
          <div className="section-kicker">
            <Factory size={13} />
            <span>{t.kicker}</span>
          </div>
          <h3>{t.title}</h3>
          <p>{t.subtitle}</p>
        </div>
      </div>

      {/* Tech Cards Row */}
      <div className="boiler-cards-grid">
        {BOILER_TECHNOLOGIES.map((tech) => {
          const isSelected = selectedTechId === tech.id;
          return (
            <div
              key={tech.id}
              className={`boiler-card ${isSelected ? "active" : ""}`}
              onClick={() => setSelectedTechId(tech.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedTechId(tech.id)}
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
                  <span>{t.effLabel}:</span>
                  <strong>{tech.electricalEfficiencyRange}</strong>
                </div>
                <div className="spec-item">
                  <span>{t.moistureLabel}:</span>
                  <strong>&le; {tech.moistureTolerancePct}%</strong>
                </div>
                <div className="spec-item">
                  <span>{t.capexLabel}:</span>
                  <strong>{tech.capexUSDPerKW}</strong>
                </div>
                <div className="spec-item">
                  <span>{t.slaggingLabel}:</span>
                  <strong className={tech.slaggingRiskEn === "Low" ? "text-cane" : "text-clay"}>
                    {isVi ? tech.slaggingRiskVi : tech.slaggingRiskEn}
                  </strong>
                </div>
              </div>

              <div className="suited-feedstocks">
                <small>{t.suitableForLabel}:</small>
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
            <h4>{t.ashHeading}: <span>{isVi ? selectedTech.vietnameseName : selectedTech.name}</span></h4>
            <p>{isVi ? selectedTech.ashReuseSuitabilityVi : selectedTech.ashReuseSuitabilityEn}</p>
          </div>
        </div>
        <div className="callout-badge">
          <CheckCircle2 size={16} />
          <span>{t.esiaCompliantBadge}</span>
        </div>
      </div>
    </div>
  );
}
