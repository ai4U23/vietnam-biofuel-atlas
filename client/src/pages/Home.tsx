/**
 * Vietnam Biofuel Atlas — Complete Interactive Field Atlas
 * Contemporary editorial cartography using deep indigo, rice-straw gold, material textures,
 * asymmetry, qualified evidence, interactive map, scenario sandbox, conversion matrix,
 * investor policy roadmap, bilingual support, and AI4U.now ecosystem branding.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Factory,
  Flame,
  Fuel,
  Leaf,
  Menu,
  Scale,
  Sprout,
  Truck,
  X,
  MapPin,
  Ship,
  Calendar,
  ShieldCheck,
  Sparkles,
  TreePine,
  RotateCcw,
  Zap,
  Globe2,
  Landmark,
  Cpu,
} from "lucide-react";
import RegionalAtlasMap from "@/components/RegionalAtlasMap";
import ScenarioSandbox from "@/components/ScenarioSandbox";
import BiodieselExportCorridors from "@/components/BiodieselExportCorridors";
import SeasonalityMatrix from "@/components/SeasonalityMatrix";
import BankabilityDiagnostic from "@/components/BankabilityDiagnostic";
import ConversionTechMatrix from "@/components/ConversionTechMatrix";
import InvestorPolicyGuide from "@/components/InvestorPolicyGuide";
import LowEmissionRiceSAF from "@/components/LowEmissionRiceSAF";
import EvidenceBase from "@/components/EvidenceBase";
import CitationRef from "@/components/CitationRef";
import ChatBot from "@/components/chatbot/ChatBot";
import {
  REGIONAL_CLUSTERS,
  RegionalCluster,
  FEEDSTOCK_PROFILES,
  FeedstockProfile,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";

const ASSETS = {
  hero: "/images/hero-bg.svg",
  mark: "/images/ai4u-logo.png",
};

type FilterKey = "All" | "Heat & power" | "Liquid fuel" | "Biogas" | "Advanced";

interface FeedstockDataItem {
  key: string;
  profileId: string;
  value: number;
  color: string;
  filterGroup: "Heat & power" | "Liquid fuel" | "Biogas" | "Advanced";
  icon: any;
  citationIds: string[];
}

const feedstockData: FeedstockDataItem[] = [
  {
    key: "Rice husk",
    profileId: "rice_husk",
    value: 78,
    color: "#e3a72f",
    filterGroup: "Heat & power",
    icon: Flame,
    citationIds: ["wb_biomass_atlas_2018", "elsevier_biomass_potentials_2024"],
  },
  {
    key: "Wood residues & Sawdust",
    profileId: "wood_residues_pellets",
    value: 88,
    color: "#b87333",
    filterGroup: "Heat & power",
    icon: TreePine,
    citationIds: ["wood_pellets_export_vpa", "wb_biomass_atlas_2018"],
  },
  {
    key: "Used cooking oil & Fish tallow",
    profileId: "used_cooking_oil_tallow",
    value: 52,
    color: "#d97706",
    filterGroup: "Liquid fuel",
    icon: Fuel,
    citationIds: ["iscc_system_overview", "petrolimex_saf_trial"],
  },
  {
    key: "Bagasse",
    profileId: "sugarcane_bagasse",
    value: 69,
    color: "#7d9d68",
    filterGroup: "Heat & power",
    icon: Factory,
    citationIds: ["wb_biomass_atlas_2018", "giz_bioenergy_handbook"],
  },
  {
    key: "Cassava roots",
    profileId: "cassava_roots_starch",
    value: 63,
    color: "#c76d43",
    filterGroup: "Liquid fuel",
    icon: Fuel,
    citationIds: ["moit_circular_50_e10", "fao_production_stats"],
  },
  {
    key: "Livestock manure",
    profileId: "livestock_manure",
    value: 58,
    color: "#466d5b",
    filterGroup: "Biogas",
    icon: Leaf,
    citationIds: ["fao_production_stats", "iea_biogas_outlook"],
  },
  {
    key: "Rice straw",
    profileId: "rice_straw",
    value: 96,
    color: "#d4a344",
    filterGroup: "Advanced",
    icon: Sprout,
    citationIds: ["irri_rice_circularity", "wb_biomass_atlas_2018"],
  },
  {
    key: "Industrial pulp black liquor",
    profileId: "industrial_pulp_liquor",
    value: 45,
    color: "#475569",
    filterGroup: "Heat & power",
    icon: Factory,
    citationIds: ["black_liquor_kraft_ref", "giz_bioenergy_handbook"],
  },
  {
    key: "Coffee & coconut residues",
    profileId: "coffee_coconut_residues",
    value: 34,
    color: "#8a6844",
    filterGroup: "Biogas",
    icon: Truck,
    citationIds: ["wb_biomass_atlas_2018", "elsevier_biomass_potentials_2024"],
  },
];

function ScrollLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        document.querySelector(to)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}

function LanguageTogglePill() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle-pill" role="radiogroup" aria-label="Select language">
      <button
        type="button"
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => setLanguage("en")}
        aria-checked={language === "en"}
        role="radio"
      >
        <span>English</span>
      </button>
      <button
        type="button"
        className={`lang-btn ${language === "vi" ? "active" : ""}`}
        onClick={() => setLanguage("vi")}
        aria-checked={language === "vi"}
        role="radio"
      >
        <span>Tiếng Việt</span>
      </button>
    </div>
  );
}

export default function Home() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];

  const [filter, setFilter] = useState<FilterKey>("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSafeguard, setActiveSafeguard] = useState(0);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>("mekong-delta");
  const [expandedGeoCards, setExpandedGeoCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.title = t.meta.siteTitle;
  }, [t.meta.siteTitle]);

  const toggleGeoDrawer = (key: string) => {
    setExpandedGeoCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredFeedstocks = useMemo(() => {
    return feedstockData
      .filter((item) => (filter === "All" ? true : item.filterGroup === filter))
      .map((item) => {
        const itemTrans = t.feedstocks.items[item.key as keyof typeof t.feedstocks.items];
        const profile = FEEDSTOCK_PROFILES.find((p) => p.id === item.profileId);
        return {
          ...item,
          ...itemTrans,
          profile,
        };
      });
  }, [filter, t.feedstocks.items]);

  const handleSelectCluster = (cluster: RegionalCluster | null) => {
    setSelectedClusterId(cluster ? cluster.id : null);
  };

  const filterButtons: { key: FilterKey; label: string }[] = [
    { key: "All", label: t.feedstocks.filters.All },
    { key: "Heat & power", label: t.feedstocks.filters["Heat & power"] },
    { key: "Liquid fuel", label: t.feedstocks.filters["Liquid fuel"] },
    { key: "Biogas", label: t.feedstocks.filters.Biogas },
    { key: "Advanced", label: t.feedstocks.filters.Advanced },
  ];

  return (
    <div className="atlas-shell">
      {/* Left Navigation Rail */}
      <aside className="atlas-rail" aria-label="Guide navigation">
        <a href="https://ai4u.now" target="_blank" rel="noreferrer" className="rail-brand" title={isVi ? "Truy cập AI4U.now" : "Visit AI4U.now"}>
          <img src={ASSETS.mark} alt="AI4U.now Logo" className="brand-img" />
          <div>
            <span>{t.meta.brandLine1}</span>
            <strong>{t.meta.brandLine2}</strong>
          </div>
        </a>
        <div className="ecosystem-badge">
          <span className="badge-dot" />
          <span>{t.nav.partOf}</span>
        </div>

        {/* Desktop Language Switcher */}
        <div className="rail-lang-wrap">
          <LanguageTogglePill />
        </div>

        <nav className="rail-links">
          <ScrollLink to="#overview"><span>01</span>{t.nav.overview}</ScrollLink>
          <ScrollLink to="#feedstocks"><span>02</span>{t.nav.feedstocks}</ScrollLink>
          <ScrollLink to="#biodiesel"><span>03</span>{t.nav.biodiesel}</ScrollLink>
          <ScrollLink to="#seasonality"><span>04</span>{t.nav.seasonality}</ScrollLink>
          <ScrollLink to="#scenarios"><span>05</span>{t.nav.scenarios}</ScrollLink>
          <ScrollLink to="#clusters"><span>06</span>{t.nav.clusters}</ScrollLink>
          <ScrollLink to="#conversion"><span>07</span>{t.nav.conversion || (isVi ? "Công nghệ chế biến" : "Conversion tech")}</ScrollLink>
          <ScrollLink to="#bankability"><span>08</span>{t.nav.bankability}</ScrollLink>
          <ScrollLink to="#policy"><span>09</span>{t.nav.policy || (isVi ? "Chính sách đầu tư" : "Investor policy")}</ScrollLink>
          <ScrollLink to="#safeguards"><span>10</span>{t.nav.safeguards}</ScrollLink>
          <ScrollLink to="#frontier"><span>11</span>{t.nav.frontier}</ScrollLink>
          <ScrollLink to="#sources"><span>12</span>{t.nav.sources}</ScrollLink>
        </nav>
        <div className="rail-footer">
          <div className="rail-rule" />
          <span>{t.nav.evidenceCutoff}</span>
          <strong>{t.nav.august2026}</strong>
          <p>{t.nav.footerNote}</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="mobile-header">
        <a className="mobile-brand" href="#overview" aria-label={t.meta.brandTitle}>
          <img src={ASSETS.mark} alt="AI4U.now Logo" />
          <span>{t.meta.brandShort}</span>
        </a>

        <div className="mobile-header-actions">
          <LanguageTogglePill />
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="mobile-menu">
            <ScrollLink to="#overview"><span onClick={() => setMobileOpen(false)}>{t.nav.overview}</span></ScrollLink>
            <ScrollLink to="#feedstocks"><span onClick={() => setMobileOpen(false)}>{t.nav.feedstocks}</span></ScrollLink>
            <ScrollLink to="#biodiesel"><span onClick={() => setMobileOpen(false)}>{t.nav.biodiesel}</span></ScrollLink>
            <ScrollLink to="#seasonality"><span onClick={() => setMobileOpen(false)}>{t.nav.seasonality}</span></ScrollLink>
            <ScrollLink to="#scenarios"><span onClick={() => setMobileOpen(false)}>{t.nav.scenarios}</span></ScrollLink>
            <ScrollLink to="#clusters"><span onClick={() => setMobileOpen(false)}>{t.nav.clusters}</span></ScrollLink>
            <ScrollLink to="#conversion"><span onClick={() => setMobileOpen(false)}>{t.nav.conversion || (isVi ? "Công nghệ chế biến" : "Conversion tech")}</span></ScrollLink>
            <ScrollLink to="#bankability"><span onClick={() => setMobileOpen(false)}>{t.nav.bankability}</span></ScrollLink>
            <ScrollLink to="#policy"><span onClick={() => setMobileOpen(false)}>{t.nav.policy || (isVi ? "Chính sách đầu tư" : "Investor policy")}</span></ScrollLink>
            <ScrollLink to="#safeguards"><span onClick={() => setMobileOpen(false)}>{t.nav.safeguards}</span></ScrollLink>
            <ScrollLink to="#frontier"><span onClick={() => setMobileOpen(false)}>{t.nav.frontier}</span></ScrollLink>
            <ScrollLink to="#sources"><span onClick={() => setMobileOpen(false)}>{t.nav.sources}</span></ScrollLink>
          </nav>
        )}
      </header>

      <main>
        {/* Section 01: Hero & Overview */}
        <section id="overview" className="hero-section">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-delta-lines" aria-hidden="true"><i /><i /><i /></div>
          <div className="hero-inner">
            <div className="hero-atlas-bar">
              <div className="hero-brand-inline">
                <img src={ASSETS.mark} alt="AI4U.now Logo" />
                <span>
                  <b>{t.meta.brandTitle}</b>
                  <small>{t.meta.brandSub}</small>
                </span>
              </div>
              <div className="hero-location">{t.hero.fieldSheet}</div>
            </div>
            <div className="eyebrow"><span className="dot" />{t.hero.eyebrow}</div>
            <h1>
              {t.hero.titleLine1}<br />
              <em>{t.hero.titleLine2}</em>
            </h1>
            <p className="hero-copy">{t.hero.copy}</p>
            <div className="hero-actions">
              <ScrollLink to="#feedstocks">
                <span className="primary-action">
                  {t.hero.exploreBtn} <ArrowDownRight size={17} />
                </span>
              </ScrollLink>
              <ScrollLink to="#biodiesel">
                <span className="text-action">
                  {isVi ? "Khám phá Biodiesel & Xuất khẩu" : "Explore Biodiesel & Exports"} <ChevronRight size={16} />
                </span>
              </ScrollLink>
            </div>
            <div className="hero-note">
              <CircleAlert size={17} />
              <span>{t.hero.note}</span>
            </div>
          </div>
          <div className="hero-stamp">
            <span>{t.hero.stampBadge}</span>
            <strong>{t.hero.stampText}</strong>
            <i />
          </div>
        </section>

        {/* Briefing Band */}
        <section className="briefing-band">
          <div className="briefing-label"><BarChart3 size={20} /><span>{t.briefing.label}</span></div>
          <div className="briefing-metric">
            <strong>
              {t.briefing.potentialVal} <CitationRef id="wb_biomass_atlas_2018" />
            </strong>
            <span>GWh<sub>th</sub>/{isVi ? "năm" : "year"} · {t.briefing.potentialMt}</span>
            <small>{t.briefing.potentialDesc}</small>
          </div>
          <div className="briefing-metric">
            <strong>
              {t.briefing.e10Date} <CitationRef id="moit_circular_50_e10" />
            </strong>
            <span>{t.briefing.e10Label}</span>
            <small>{t.briefing.e10Desc}</small>
          </div>
          <div className="briefing-metric">
            <strong>
              {t.briefing.checkVal} <CitationRef ids={["wb_biomass_atlas_2018", "fao_production_stats"]} />
            </strong>
            <span>{t.briefing.checkLabel}</span>
            <small>{t.briefing.checkDesc}</small>
          </div>
        </section>

        {/* Introduction */}
        <section className="folio-section introduction" aria-labelledby="intro-heading">
          <div className="section-index"><span>01</span><i /></div>
          <div className="intro-copy">
            <div className="section-kicker">{t.intro.kicker}</div>
            <h2 id="intro-heading">{t.intro.heading}</h2>
          </div>
          <div className="intro-note">
            <BadgeCheck size={20} />
            <p>
              <b>{isVi ? "Lộ trình dẫn đầu:" : "Near-term lead pathways:"}</b> {t.intro.leadPathways}{" "}
              <CitationRef ids={["wb_biomass_atlas_2018", "giz_bioenergy_handbook", "wood_pellets_export_vpa"]} />
            </p>
            <p>
              <b>{isVi ? "Lộ trình rủi ro cao:" : "Higher-risk scale pathways:"}</b> {t.intro.riskPathways}{" "}
              <CitationRef ids={["moit_circular_50_e10", "fao_production_stats"]} />
            </p>
          </div>
        </section>

        {/* Section 02: Feedstock Field */}
        <section id="feedstocks" className="folio-section feedstock-section" aria-labelledby="feedstocks-heading">
          <div className="section-index"><span>02</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">{t.feedstocks.kicker}</div>
              <h2 id="feedstocks-heading">{t.feedstocks.heading}</h2>
            </div>
            <div className="header-evidence">
              <p>{t.feedstocks.headerDesc}</p>
              <span><i />{t.feedstocks.legendText}</span>
            </div>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter feedstocks by pathway">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                className={filter === btn.key ? "filter-button active" : "filter-button"}
                onClick={() => setFilter(btn.key)}
                role="tab"
                aria-selected={filter === btn.key}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Feedstock Cards Grid */}
          <div className="feedstock-grid">
            {filteredFeedstocks.map((item, index) => {
              const Icon = item.icon;
              const isGeoExpanded = !!expandedGeoCards[item.key];
              const profile = item.profile;

              return (
                <article className="feedstock-card" key={item.key} style={{ "--accent": item.color } as React.CSSProperties}>
                  <div className="card-topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="priority-tag">{item.priority}</span>
                  </div>

                  <div className="crop-stamp"><Icon size={23} /></div>

                  <div className="feedstock-title">
                    <div>
                      <small>{item.family}</small>
                      <h3>
                        {item.name} <CitationRef ids={item.citationIds} />
                      </h3>
                    </div>
                    <span className="pathway-tag">{item.pathway}</span>
                  </div>

                  <p>{item.descriptor}</p>

                  <div className="resource-line">
                    <span>{isVi ? "Quy mô thô" : "Gross scale"}</span>
                    <strong>
                      {item.metric} <CitationRef ids={item.citationIds} />
                    </strong>
                  </div>
                  <div className="resource-bar"><i style={{ width: `${item.value}%` }} /></div>

                  {/* Sustainable Recovery Badge */}
                  {profile && (
                    <div className="feedstock-recovery-badge">
                      <ShieldCheck size={14} className="text-cane" />
                      <span>
                        {t.feedstocks.distribution?.sustainableRecoveryBadge || (isVi ? "Tỷ lệ khai thác bền vững:" : "Sustainable Recovery:")}{" "}
                        <strong>{profile.deliverableSharePct}%</strong>
                      </span>
                    </div>
                  )}

                  <div className="watch-line"><CircleAlert size={15} /><span>{item.watch}</span></div>

                  {/* Geographic Distribution Toggle & Drawer */}
                  {profile?.regionalBreakdown && (
                    <div className="feedstock-geo-wrapper">
                      <button
                        type="button"
                        className="geo-toggle-btn"
                        onClick={() => toggleGeoDrawer(item.key)}
                        aria-expanded={isGeoExpanded}
                      >
                        <Globe2 size={14} />
                        <span>
                          {isGeoExpanded
                            ? (t.feedstocks.distribution?.hideRegionalMap || (isVi ? "Thu gọn" : "Hide Breakdown"))
                            : (t.feedstocks.distribution?.viewRegionalMap || (isVi ? "Xem phân bố địa lý" : "View Regional Breakdown"))}
                        </span>
                        {isGeoExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isGeoExpanded && (
                        <div className="feedstock-geo-drawer">
                          <div className="geo-drawer-header">
                            <small>{t.feedstocks.distribution?.regionalBreakdownLabel || (isVi ? "Phân bố sản lượng theo vùng địa lý" : "Regional Geographic Distribution")}:</small>
                          </div>
                          <div className="geo-breakdown-list">
                            {profile.regionalBreakdown.map((zone) => (
                              <div key={zone.zoneEn} className="geo-breakdown-row">
                                <div className="geo-zone-info">
                                  <span className="zone-name">{isVi ? zone.zoneVi : zone.zoneEn}</span>
                                  <strong className="zone-tonnage">{isVi ? zone.annualVolumeVi : zone.annualVolume}</strong>
                                </div>
                                <div className="geo-bar-track">
                                  <div
                                    className="geo-bar-fill"
                                    style={{ width: `${zone.sharePct}%`, backgroundColor: item.color }}
                                  />
                                </div>
                                <span className="zone-share">{zone.sharePct}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="method-note">
            <BookOpen size={17} />
            <span>
              {t.feedstocks.methodNote} <CitationRef ids={["wb_biomass_atlas_2018", "elsevier_biomass_potentials_2024"]} />
            </span>
          </div>
        </section>

        {/* Section 03: Biodiesel B5–B100 & Global Export Corridors */}
        <section id="biodiesel" className="folio-section biodiesel-section" aria-labelledby="biodiesel-heading">
          <div className="section-index"><span>03</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">{t.biodiesel.kicker}</div>
              <h2 id="biodiesel-heading">{t.biodiesel.title}</h2>
            </div>
            <p>{t.biodiesel.subtitle}</p>
          </div>

          <BiodieselExportCorridors />
        </section>

        {/* Section 04: Feedstock Seasonality Matrix & Storage Buffer Protocols */}
        <section id="seasonality" className="folio-section seasonality-section" aria-labelledby="seasonality-heading">
          <div className="section-index"><span>04</span><i /></div>
          <SeasonalityMatrix />
        </section>

        {/* Section 05: Decision & Scenario Sandbox (E10, Logistics, CHP & DPPA) */}
        <section id="scenarios" className="folio-section sandbox-section" aria-labelledby="scenarios-heading">
          <div className="section-index"><span>05</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">{t.sandbox.kicker}</div>
              <h2 id="scenarios-heading">{t.sandbox.title}</h2>
            </div>
            <p>{t.sandbox.subtitle}</p>
          </div>

          <ScenarioSandbox />
        </section>

        {/* Section 06: Regional Clusters & Spatial Atlas Map */}
        <section id="clusters" className="folio-section clusters-section" aria-labelledby="clusters-heading">
          <div className="section-index"><span>06</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">{t.clusters.kicker}</div>
              <h2 id="clusters-heading">{t.clusters.heading}</h2>
            </div>
            <p>{t.clusters.desc}</p>
          </div>

          {/* Integrated Interactive Vector Cartography Map */}
          <div className="map-integration-container">
            <RegionalAtlasMap
              selectedClusterId={selectedClusterId}
              onSelectCluster={handleSelectCluster}
            />
          </div>

          <div className="cluster-route-note">
            <span>{t.clusters.routeLabel}</span>
            <i />
            <b>{t.clusters.r1}</b>
            <ChevronRight size={15} />
            <b>{t.clusters.r2}</b>
            <ChevronRight size={15} />
            <b>{t.clusters.r3}</b>
          </div>

          {/* Regional Cluster Cards Rail */}
          <div className="region-rail">
            {REGIONAL_CLUSTERS.map((region) => {
              const isSelected = selectedClusterId === region.id;
              const copy = t.clusters.items[region.id as keyof typeof t.clusters.items] || {
                title: region.title,
                body: region.body,
              };

              return (
                <article
                  id={`cluster-card-${region.id}`}
                  className={`region-card ${isSelected ? "highlighted-cluster-card" : ""}`}
                  key={region.id}
                  onClick={() => setSelectedClusterId(region.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={region.image} alt={isVi ? region.vietnameseName : region.name} />
                  <div className="region-overlay" />
                  <div className="region-content">
                    <div className="region-top">
                      <span style={{ backgroundColor: region.accentColor }}>{region.number}</span>
                      <span>{isVi ? `Vùng ${region.zone}` : `${region.zone} Zone`}</span>
                    </div>
                    <h3>{copy.title}</h3>
                    <p>{copy.body}</p>
                    <div className="region-tags">
                      {region.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="card-cluster-footer">
                      <small><MapPin size={10} /> {region.provinces.slice(0, 3).join(", ")}...</small>
                      <strong>
                        {region.grossPotentialGWh.toLocaleString()} GWh<sub>th</sub> <CitationRef id="wb_biomass_atlas_2018" />
                      </strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 07: Biomass Conversion Technologies & Boiler ESIA Standards */}
        <section id="conversion" className="folio-section conversion-section" aria-labelledby="conversion-heading">
          <div className="section-index"><span>07</span><i /></div>
          <ConversionTechMatrix />
        </section>

        {/* Section 08: Bankability Diagnostic & FID Decision Scorecard */}
        <section id="bankability" className="folio-section bankability-section" aria-labelledby="bankability-heading">
          <div className="section-index"><span>08</span><i /></div>
          <BankabilityDiagnostic />
        </section>

        {/* Section 09: Investor Policy Guide & PDP8 Roadmap */}
        <section id="policy" className="folio-section investor-policy-section" aria-labelledby="policy-heading">
          <div className="section-index"><span>09</span><i /></div>
          <InvestorPolicyGuide />
        </section>

        {/* Section 10: Safeguards */}
        <section id="safeguards" className="folio-section safeguards-section" aria-labelledby="safeguards-heading">
          <div className="section-index"><span>10</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">{t.safeguards.kicker}</div>
              <h2 id="safeguards-heading">{t.safeguards.heading}</h2>
            </div>
            <p>{t.safeguards.desc}</p>
          </div>
          <div className="safeguard-layout">
            <div className="safeguard-tabs">
              {t.safeguards.list.map(([title], index) => (
                <button
                  key={title}
                  onClick={() => setActiveSafeguard(index)}
                  className={activeSafeguard === index ? "safeguard-tab selected" : "safeguard-tab"}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
            <div className="safeguard-detail">
              <Scale size={27} />
              <span className="detail-number">0{activeSafeguard + 1}</span>
              <h3>{t.safeguards.list[activeSafeguard][0]}</h3>
              <p>{t.safeguards.list[activeSafeguard][1]}</p>
              <div className="detail-line" />
              <small>{t.safeguards.reqText}</small>
            </div>
          </div>
        </section>

        {/* Section 11: Frontier Initiatives (1M-Ha Rice Straw & Aviation SAF) */}
        <section id="frontier" className="folio-section frontier-section" aria-labelledby="frontier-heading">
          <div className="section-index"><span>11</span><i /></div>
          <LowEmissionRiceSAF />
        </section>

        {/* Section 12: Sources & Evidence Base */}
        <section id="sources" className="source-section" aria-labelledby="sources-heading">
          <div className="source-copy">
            <div className="section-kicker ink-light">{t.sources.kicker}</div>
            <h2 id="sources-heading">{t.sources.heading}</h2>
            <p>{t.sources.desc}</p>
          </div>
          <EvidenceBase />
        </section>
      </main>
      
      <footer className="site-footer">
        <div className="footer-brand-wrap">
          <a href="https://ai4u.now" target="_blank" rel="noreferrer" className="footer-brand-link">
            <img src={ASSETS.mark} alt="AI4U.now Logo" />
            <span>{t.meta.brandSub}</span>
          </a>
          <span className="footer-separator">·</span>
          <span>{t.meta.brandTitle}</span>
        </div>
        <p>{t.footer.copy}</p>
        <div className="footer-actions">
          <LanguageTogglePill />
          <a href="https://github.com/ai4u23/vietnam-biofuel-atlas" target="_blank" rel="noreferrer" className="footer-gh-link">
            GitHub
          </a>
          <ScrollLink to="#overview"><span className="back-to-top">{t.footer.backToTop}</span></ScrollLink>
        </div>
      </footer>

      {/* Atlas AI Floating Chat Assistant */}
      <ChatBot />
    </div>
  );
}
