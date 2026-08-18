/**
 * SeasonalityMatrix Component
 * Visualizes 12-month feedstock availability curves across Northern, Central, and Mekong Delta regions.
 * Highlights the crucial storage and moisture bottlenecks identified in World Bank Atlas and AZEC studies.
 */
import { useState } from "react";
import { SEASONALITY_DATA, CropSeasonality } from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { Calendar, Warehouse, Sun, Droplets, Info, Sparkles } from "lucide-react";

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_VI = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];

export default function SeasonalityMatrix() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].seasonality;
  const [selectedCropId, setSelectedCropId] = useState<string>("mekong_rice_straw_husk");

  const selectedCrop =
    SEASONALITY_DATA.find((c) => c.cropId === selectedCropId) || SEASONALITY_DATA[0];
  const months = isVi ? MONTHS_VI : MONTHS_EN;

  return (
    <div className="seasonality-container">
      {/* Header Info */}
      <div className="seasonality-header">
        <div>
          <div className="section-kicker">
            <Calendar size={13} />
            <span>{t.kicker}</span>
          </div>
          <h3>{t.title}</h3>
        </div>
        <p>{t.subtitle}</p>
      </div>

      {/* Interactive Monthly Heatmap Table */}
      <div className="seasonality-table-wrapper">
        <div className="seasonality-table">
          <div className="seasonality-table-header">
            <div className="crop-col-title">{t.feedstockCol}</div>
            <div className="months-grid-header">
              {months.map((m, idx) => (
                <span key={m} className={idx % 3 === 0 ? "q-start" : ""}>
                  {m}
                </span>
              ))}
            </div>
            <div className="peak-col-title">{t.peakCol}</div>
          </div>

          <div className="seasonality-rows">
            {SEASONALITY_DATA.map((crop) => {
              const isSelected = selectedCropId === crop.cropId;
              return (
                <div
                  key={crop.cropId}
                  className={`seasonality-row ${isSelected ? "selected-row" : ""}`}
                  onClick={() => setSelectedCropId(crop.cropId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedCropId(crop.cropId)}
                >
                  <div className="crop-name-cell">
                    <strong>{isVi ? crop.nameVi : crop.nameEn}</strong>
                    <small>{isVi ? crop.regionVi : crop.regionEn}</small>
                  </div>

                  <div className="heatmap-bar-grid">
                    {crop.monthlyAvailability.map((val, idx) => {
                      // Color shading based on availability %
                      let bgIntensity = "rgba(255,255,255,0.03)";
                      let textColor = "#6b7c93";
                      if (val >= 80) {
                        bgIntensity = "rgba(227, 167, 47, 0.9)"; // Deep Gold Peak
                        textColor = "#111b28";
                      } else if (val >= 50) {
                        bgIntensity = "rgba(227, 167, 47, 0.45)"; // Mid Gold
                        textColor = "#ffffff";
                      } else if (val > 0) {
                        bgIntensity = "rgba(227, 167, 47, 0.18)"; // Low Gold
                        textColor = "#9ba8b8";
                      }

                      return (
                        <div
                          key={idx}
                          className="heatmap-cell"
                          style={{ backgroundColor: bgIntensity, color: textColor }}
                          title={`${months[idx]}: ${val}% availability`}
                        >
                          <span>{val > 0 ? `${val}%` : "—"}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="peak-desc-cell">
                    <span>{isVi ? crop.peakMonthsVi : crop.peakMonthsEn}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Crop Storage & Buffer Protocol Card */}
      <div className="storage-protocol-card">
        <div className="protocol-header">
          <Warehouse size={18} />
          <div>
            <h4>
              {t.storageHeading}: <span>{isVi ? selectedCrop.nameVi : selectedCrop.nameEn}</span>
            </h4>
            <small>{isVi ? selectedCrop.regionVi : selectedCrop.regionEn}</small>
          </div>
        </div>

        <div className="protocol-body-grid">
          <div className="protocol-item">
            <div className="item-label">
              <Sun size={15} />
              <strong>{t.harvestPatternLabel}</strong>
            </div>
            <p>{isVi ? selectedCrop.peakMonthsVi : selectedCrop.peakMonthsEn}</p>
          </div>

          <div className="protocol-item">
            <div className="item-label">
              <Warehouse size={15} />
              <strong>{t.storageBufferLabel}</strong>
            </div>
            <p>{isVi ? selectedCrop.storageStrategyVi : selectedCrop.storageStrategyEn}</p>
          </div>

          <div className="protocol-item">
            <div className="item-label">
              <Droplets size={15} />
              <strong>{t.moistureControlLabel}</strong>
            </div>
            <p>{t.moistureControlDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
