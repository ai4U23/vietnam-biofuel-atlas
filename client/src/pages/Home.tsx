/**
 * Field Atlas design: contemporary editorial cartography using deep indigo,
 * rice-straw gold, material textures, asymmetry, clear evidence qualifications,
 * interactive cartographic map, scenario decision sandbox, bilingual (VI/EN) support,
 * and AI4U.now ecosystem branding.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  ChevronRight,
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
} from "lucide-react";
import RegionalAtlasMap from "@/components/RegionalAtlasMap";
import ScenarioSandbox from "@/components/ScenarioSandbox";
import BiodieselExportCorridors from "@/components/BiodieselExportCorridors";
import SeasonalityMatrix from "@/components/SeasonalityMatrix";
import BankabilityDiagnostic from "@/components/BankabilityDiagnostic";
import BoilerTechMatrix from "@/components/BoilerTechMatrix";
import LowEmissionRiceSAF from "@/components/LowEmissionRiceSAF";
import { REGIONAL_CLUSTERS, RegionalCluster } from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";

const ASSETS = {
  hero: "/images/hero-bg.svg",
  mark: "/images/ai4u-logo.png",
};

type FilterKey = "All" | "Heat & power" | "Liquid fuel" | "Biogas" | "Advanced";

const feedstockData = [
  {
    key: "Rice husk",
    value: 78,
    color: "#e3a72f",
    filterGroup: "Heat & power",
    icon: Flame,
  },
  {
    key: "Bagasse",
    value: 69,
    color: "#7d9d68",
    filterGroup: "Heat & power",
    icon: Factory,
  },
  {
    key: "Cassava roots",
    value: 63,
    color: "#c76d43",
    filterGroup: "Liquid fuel",
    icon: Fuel,
  },
  {
    key: "Livestock manure",
    value: 58,
    color: "#466d5b",
    filterGroup: "Biogas",
    icon: Leaf,
  },
  {
    key: "Rice straw",
    value: 96,
    color: "#d4a344",
    filterGroup: "Advanced",
    icon: Sprout,
  },
  {
    key: "Coffee & coconut residues",
    value: 34,
    color: "#8a6844",
    filterGroup: "Biogas",
    icon: Truck,
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

  const filteredFeedstocks = useMemo(() => {
    return feedstockData
      .filter((item) => (filter === "All" ? true : item.filterGroup === filter))
      .map((item) => {
        const itemTrans = t.feedstocks.items[item.key as keyof typeof t.feedstocks.items];
        return {
          ...item,
          ...itemTrans,
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
        <a href="https://ai4u.now" target="_blank" rel="noreferrer" className="rail-brand" title="Visit AI4U.now">
          <img src={ASSETS.mark} alt="AI4U.now Logo" className="brand-img" />
          <div>
            <span>Vietnam</span>
            <strong>Biofuel Atlas</strong>
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
          <ScrollLink to="#bankability"><span>07</span>{t.nav.bankability}</ScrollLink>
          <ScrollLink to="#safeguards"><span>08</span>{t.nav.safeguards}</ScrollLink>
          <ScrollLink to="#frontier"><span>09</span>{t.nav.frontier}</ScrollLink>
          <ScrollLink to="#sources"><span>10</span>{t.nav.sources}</ScrollLink>
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
        <a className="mobile-brand" href="#overview" aria-label="Vietnam Biofuel Atlas home">
          <img src={ASSETS.mark} alt="AI4U.now Logo" />
          <span>Biofuel Atlas</span>
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
            <ScrollLink to="#bankability"><span onClick={() => setMobileOpen(false)}>{t.nav.bankability}</span></ScrollLink>
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
                  <b>Vietnam Biofuel Atlas</b>
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
            <strong>{t.briefing.potentialVal}</strong>
            <span>GWh<sub>th</sub>/{isVi ? "năm" : "year"} · {t.briefing.potentialMt}</span>
            <small>{t.briefing.potentialDesc}</small>
          </div>
          <div className="briefing-metric">
            <strong>{t.briefing.e10Date}</strong>
            <span>{t.briefing.e10Label}</span>
            <small>{t.briefing.e10Desc}</small>
          </div>
          <div className="briefing-metric">
            <strong>{t.briefing.checkVal}</strong>
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
            <p><b>{isVi ? "Lộ trình dẫn đầu:" : "Near-term lead pathways:"}</b> {t.intro.leadPathways}</p>
            <p><b>{isVi ? "Lộ trình rủi ro cao:" : "Higher-risk scale pathways:"}</b> {t.intro.riskPathways}</p>
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
          <div className="feedstock-grid">
            {filteredFeedstocks.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="feedstock-card" key={item.key} style={{ "--accent": item.color } as React.CSSProperties}>
                  <div className="card-topline"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.priority}</span></div>
                  <div className="crop-stamp"><Icon size={23} /></div>
                  <div className="feedstock-title">
                    <div>
                      <small>{item.family}</small>
                      <h3>{item.name}</h3>
                    </div>
                    <span className="pathway-tag">{item.pathway}</span>
                  </div>
                  <p>{item.descriptor}</p>
                  <div className="resource-line">
                    <span>{isVi ? "Quy mô thô" : "Gross scale"}</span>
                    <strong>{item.metric}</strong>
                  </div>
                  <div className="resource-bar"><i style={{ width: `${item.value}%` }} /></div>
                  <div className="watch-line"><CircleAlert size={15} /><span>{item.watch}</span></div>
                </article>
              );
            })}
          </div>
          <div className="method-note">
            <BookOpen size={17} />
            <span>{t.feedstocks.methodNote}</span>
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
                      <strong>{region.grossPotentialGWh.toLocaleString()} GWh<sub>th</sub></strong>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 07: Biomass Boiler Selection & ESIA Standards */}
        <section id="boiler" className="folio-section boiler-section" aria-labelledby="boiler-heading">
          <div className="section-index"><span>07</span><i /></div>
          <BoilerTechMatrix />
        </section>

        {/* Section 08: Bankability Diagnostic & FID Decision Scorecard */}
        <section id="bankability" className="folio-section bankability-section" aria-labelledby="bankability-heading">
          <div className="section-index"><span>08</span><i /></div>
          <BankabilityDiagnostic />
        </section>

        {/* Section 09: Policy Timeline */}
        <section className="policy-section" aria-labelledby="policy-heading">
          <div className="policy-left">
            <div className="section-kicker">{t.policy.kicker}</div>
            <h2 id="policy-heading" style={{ whiteSpace: "pre-line" }}>{t.policy.heading}</h2>
            <p>{t.policy.desc}</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <span>2023</span>
              <div>
                <h3>{t.policy.pdp8}</h3>
                <p>{t.policy.pdp8Text}</p>
              </div>
            </div>
            <div className="timeline-item">
              <span>2025</span>
              <div>
                <h3>{t.policy.pdp8Adj}</h3>
                <p>{t.policy.pdp8AdjText}</p>
              </div>
            </div>
            <div className="timeline-item">
              <span>2025</span>
              <div>
                <h3>{t.policy.circ50}</h3>
                <p>{t.policy.circ50Text}</p>
              </div>
            </div>
            <div className="timeline-item">
              <span>2026</span>
              <div>
                <h3>{t.policy.e10Mandate}</h3>
                <p>{t.policy.e10MandateText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Safeguards */}
        <section id="safeguards" className="folio-section safeguards-section" aria-labelledby="safeguards-heading">
          <div className="section-index"><span>09</span><i /></div>
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
          <div className="section-index"><span>10</span><i /></div>
          <LowEmissionRiceSAF />
        </section>

        {/* Section 12: Sources & Evidence */}
        <section id="sources" className="source-section" aria-labelledby="sources-heading">
          <div className="source-copy">
            <div className="section-kicker ink-light">{t.sources.kicker}</div>
            <h2 id="sources-heading">{t.sources.heading}</h2>
            <p>{t.sources.desc}</p>
          </div>
          <div className="source-list">
            <a href="https://moit.gov.vn/en/news/e10-biofuel-gasoline-implementing-a-major-party-and-state-policy.html" target="_blank" rel="noreferrer">
              <span>01</span>
              <div>
                <b>{t.sources.moit}</b>
                <small>{t.sources.moitSub}</small>
              </div>
              <ArrowUpRight size={18} />
            </a>
            <a href="https://www.fao.org/statistics/highlights-archive/highlights-detail/agricultural-production-statistics-2010-2024/en" target="_blank" rel="noreferrer">
              <span>02</span>
              <div>
                <b>{t.sources.fao}</b>
                <small>{t.sources.faoSub}</small>
              </div>
              <ArrowUpRight size={18} />
            </a>
            <a href="https://www.iea.org/reports/outlook-for-biogas-and-biomethane/assessing-the-sustainable-potential-and-cost-of-feedstocks-for-biogas-and-biomethane" target="_blank" rel="noreferrer">
              <span>03</span>
              <div>
                <b>{t.sources.iea}</b>
                <small>{t.sources.ieaSub}</small>
              </div>
              <ArrowUpRight size={18} />
            </a>
            <a href="https://www.irri.org/news-and-events/news/waste-wealth-vietnams-circular-economy-turns-rice-straw-farmer-income-boost" target="_blank" rel="noreferrer">
              <span>04</span>
              <div>
                <b>{t.sources.irri}</b>
                <small>{t.sources.irriSub}</small>
              </div>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>
      
      <footer className="site-footer">
        <div className="footer-brand-wrap">
          <a href="https://ai4u.now" target="_blank" rel="noreferrer" className="footer-brand-link">
            <img src={ASSETS.mark} alt="AI4U.now Logo" />
            <span>AI4U.now Ecosystem</span>
          </a>
          <span className="footer-separator">·</span>
          <span>Vietnam Biofuel Atlas</span>
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
    </div>
  );
}
