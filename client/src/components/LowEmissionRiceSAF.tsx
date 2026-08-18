/**
 * LowEmissionRiceSAF Component
 * Spotlights two landmark 2025-2026 bioeconomy initiatives in Vietnam:
 * 1. MARD 1-Million-Hectare Low-Emission Rice Straw Circularity & MRV Protocol
 * 2. Aviation SAF Milestones (Petrolimex, Vietjet, Vietnam Airlines & CAAV Roadmap)
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import CitationRef from "@/components/CitationRef";
import { Sprout, Plane, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, FileText, ArrowUpRight } from "lucide-react";

export default function LowEmissionRiceSAF() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].frontier;

  return (
    <div className="frontier-initiatives-wrapper">
      <div className="frontier-header">
        <div>
          <div className="section-kicker">
            <Sparkles size={13} />
            <span>{t.kicker}</span>
          </div>
          <h3>{t.title}</h3>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <div className="frontier-cards-grid">
        {/* Initiative 1: MARD 1-Million Hectare Rice Straw Circularity */}
        <div className="frontier-card rice-straw-card">
          <div className="card-top-badge">
            <Sprout size={16} />
            <span>{t.riceBadge}</span>
          </div>

          <h4>
            {t.riceTitle} <CitationRef id="irri_rice_circularity" />
          </h4>
          <p className="card-subcopy">{t.riceDesc}</p>

          <div className="frontier-metrics-row">
            <div className="f-metric">
              <strong>
                354,839 ha <CitationRef id="irri_rice_circularity" />
              </strong>
              <small>{t.riceAreaLabel}</small>
            </div>
            <div className="f-metric">
              <strong>
                ~14 Mt/{isVi ? "năm" : "yr"} <CitationRef id="irri_rice_circularity" />
              </strong>
              <small>{t.riceStrawLabel}</small>
            </div>
            <div className="f-metric">
              <strong className="text-cane">
                -40% <CitationRef id="irri_rice_circularity" />
              </strong>
              <small>{t.riceCostLabel}</small>
            </div>
          </div>

          <div className="pillar-bullets">
            <div className="pillar-item">
              <CheckCircle2 size={15} />
              <span><b>{t.mrvPillarTitle}:</b> {t.mrvPillarDesc}</span>
            </div>
            <div className="pillar-item">
              <CheckCircle2 size={15} />
              <span><b>{t.cascadePillarTitle}:</b> {t.cascadePillarDesc}</span>
            </div>
          </div>

          <div className="card-source-link">
            <small>MARD & IRRI Circular Rice Framework (2025–2026)</small>
          </div>
        </div>

        {/* Initiative 2: Sustainable Aviation Fuel (SAF) */}
        <div className="frontier-card saf-card">
          <div className="card-top-badge">
            <Plane size={16} />
            <span>{t.safBadge}</span>
          </div>

          <h4>
            {t.safTitle} <CitationRef ids={["moit_circular_50_e10", "wba_global_bioenergy_2025"]} />
          </h4>
          <p className="card-subcopy">{t.safDesc}</p>

          <div className="frontier-metrics-row">
            <div className="f-metric">
              <strong>
                1,200 m³ <CitationRef id="moit_circular_50_e10" />
              </strong>
              <small>{t.safVolumeLabel}</small>
            </div>
            <div className="f-metric">
              <strong>
                10% SAF <CitationRef id="wba_global_bioenergy_2025" />
              </strong>
              <small>{t.safTarget2035}</small>
            </div>
            <div className="f-metric">
              <strong className="text-gold">
                100% <CitationRef id="wba_global_bioenergy_2025" />
              </strong>
              <small>{t.safTarget2050}</small>
            </div>
          </div>

          <div className="pillar-bullets">
            <div className="pillar-item">
              <CheckCircle2 size={15} />
              <span><b>{t.petrolimexPillarTitle}:</b> {t.petrolimexPillarDesc}</span>
            </div>
            <div className="pillar-item">
              <CheckCircle2 size={15} />
              <span><b>{t.airlinesPillarTitle}:</b> {t.airlinesPillarDesc}</span>
            </div>
          </div>

          <div className="card-source-link">
            <small>CAAV Aviation Decarbonization Directive & ASTM D7566</small>
          </div>
        </div>
      </div>
    </div>
  );
}
