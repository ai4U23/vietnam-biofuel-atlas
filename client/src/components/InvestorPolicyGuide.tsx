/**
 * InvestorPolicyGuide Component
 * Comprehensive legal and regulatory framework for biomass and biofuel investors in Vietnam.
 * Covering PDP8 national targets, DPPA mechanisms, Biomass FiT, E10 Mandate, Corporate Tax Holidays, and Carbon Markets.
 */
import { useState } from "react";
import { INVESTOR_POLICIES, PDP8_TARGETS, InvestorPolicy } from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import CitationRef from "@/components/CitationRef";
import {
  Landmark,
  Zap,
  Flame,
  Fuel,
  Coins,
  Leaf,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  Scale,
} from "lucide-react";

export default function InvestorPolicyGuide() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].investorPolicy;
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>("pdp8_masterplan");

  const selectedPolicy: InvestorPolicy =
    INVESTOR_POLICIES.find((p) => p.id === selectedPolicyId) || INVESTOR_POLICIES[0];

  const getPolicyIcon = (cat: string) => {
    switch (cat) {
      case "power_masterplan":
        return Landmark;
      case "market_dppa":
        return Zap;
      case "feedin_tariff":
        return Flame;
      case "biofuel_mandate":
        return Fuel;
      case "tax_incentives":
        return Coins;
      case "carbon_market":
        return Leaf;
      default:
        return Scale;
    }
  };

  return (
    <div className="investor-policy-container">
      {/* Header */}
      <div className="policy-guide-header">
        <div className="section-kicker">
          <Landmark size={14} />
          <span>{t.kicker}</span>
        </div>
        <h3>
          {t.title} <CitationRef ids={["pdp8_masterplan_ref", "moit_circular_50_e10"]} />
        </h3>
        <p>{t.subtitle}</p>
      </div>

      {/* PDP8 National Targets Overview Box */}
      <div className="pdp8-benchmark-card">
        <div className="pdp8-card-header">
          <div className="pdp8-badge">
            <Zap size={15} />
            <span>{t.pdp8BoxTitle}</span>
          </div>
          <span className="pdp8-decision-ref">Decision 500/QD-TTg</span>
        </div>

        <div className="pdp8-targets-grid">
          <div className="pdp8-metric-item">
            <div className="pdp8-metric-val text-gold">{PDP8_TARGETS.biomassPower2030MW.toLocaleString()} MW</div>
            <div className="pdp8-metric-label">{t.pdp82030}</div>
            <small>{isVi ? "Hạn ngạch điện sinh khối toàn quốc đến 2030" : "National grid biomass power target by 2030"}</small>
          </div>

          <div className="pdp8-metric-item">
            <div className="pdp8-metric-val text-cane">{PDP8_TARGETS.biomassPower2050MW.toLocaleString()} MW</div>
            <div className="pdp8-metric-label">{t.pdp82050}</div>
            <small>{isVi ? "Tầm nhìn phát triển dài hạn đến 2050" : "Long-term 2050 net zero expansion vision"}</small>
          </div>

          <div className="pdp8-metric-item">
            <div className="pdp8-metric-val text-clay">20%</div>
            <div className="pdp8-metric-label">{t.pdp8CoFire}</div>
            <small>{isVi ? "Tỷ lệ phối trộn sinh khối tại các nhà máy than" : "Biomass co-firing quota in thermal power"}</small>
          </div>

          <div className="pdp8-metric-item">
            <div className="pdp8-metric-val text-ocean">{PDP8_TARGETS.wasteToEnergy2030MW.toLocaleString()} MW</div>
            <div className="pdp8-metric-label">{t.pdp8Waste}</div>
            <small>{isVi ? "Điện rác & đốt chất thải rắn đô thị/CN" : "Solid waste & industrial waste-to-power"}</small>
          </div>
        </div>
      </div>

      {/* Main Interactive Policy Selector & Detail Card */}
      <div className="policy-interactive-layout">
        {/* Left Policy List */}
        <div className="policy-list-column" role="tablist" aria-label="Vietnam Bioenergy Policies">
          {INVESTOR_POLICIES.map((pol) => {
            const Icon = getPolicyIcon(pol.category);
            const isSelected = selectedPolicyId === pol.id;

            return (
              <button
                key={pol.id}
                type="button"
                className={`policy-nav-item ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedPolicyId(pol.id)}
                role="tab"
                aria-selected={isSelected}
              >
                <div className="policy-nav-icon">
                  <Icon size={18} />
                </div>
                <div className="policy-nav-info">
                  <div className="policy-nav-code">{pol.code}</div>
                  <h4>{isVi ? pol.nameVi : pol.nameEn}</h4>
                  <span className="policy-nav-cat">{isVi ? pol.categoryVi : pol.category}</span>
                </div>
                <ChevronRight size={16} className="nav-arrow" />
              </button>
            );
          })}
        </div>

        {/* Right Policy Detail Card */}
        <div className="policy-detail-card">
          <div className="policy-card-topline">
            <div className="policy-pill-badge">
              <Building2 size={13} />
              <span>{isVi ? selectedPolicy.categoryVi : selectedPolicy.category}</span>
            </div>
            <div className="policy-effective-tag">
              <span>{t.effectiveLabel}</span>
              <strong>{selectedPolicy.effectiveDate}</strong>
            </div>
          </div>

          <h3 className="policy-detail-title">
            {isVi ? selectedPolicy.nameVi : selectedPolicy.nameEn}{" "}
            <CitationRef id={selectedPolicy.citationId} />
          </h3>

          <div className="policy-meta-row">
            <div className="meta-item">
              <span>{t.authorityLabel}</span>
              <strong>{isVi ? selectedPolicy.authorityVi : selectedPolicy.authorityEn}</strong>
            </div>
            <div className="meta-item">
              <span>{isVi ? "Mã văn bản:" : "Legal Identifier:"}</span>
              <strong>{selectedPolicy.code}</strong>
            </div>
          </div>

          {/* Key Provisions */}
          <div className="policy-provisions-section">
            <h4>{t.provisionsHeading}</h4>
            <ul className="provisions-list">
              {(isVi ? selectedPolicy.keyProvisionsVi : selectedPolicy.keyProvisionsEn).map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="provision-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic Investor Impact */}
          <div className="policy-investor-impact-box">
            <div className="impact-header">
              <TrendingUp size={16} />
              <h4>{t.impactHeading}</h4>
            </div>
            <p>{isVi ? selectedPolicy.investorImpactVi : selectedPolicy.investorImpactEn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
