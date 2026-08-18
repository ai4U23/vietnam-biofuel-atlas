/**
 * Field Atlas design: contemporary editorial cartography using deep indigo,
 * rice-straw gold, material textures, asymmetry, clear evidence qualifications,
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
} from "lucide-react";

const ASSETS = {
  hero: "/images/hero-bg.svg",
  husk: "/images/rice-husk-mill.svg",
  bagasse: "/images/bagasse-chp.svg",
  biogas: "/images/biogas-cluster.svg",
  mark: "/images/ai4u-logo.png",
};

type FilterKey = "All" | "Heat & power" | "Liquid fuel" | "Biogas" | "Advanced";

const feedstocks = [
  {
    name: "Rice husk",
    family: "Rice system",
    priority: "Lead now",
    pathway: "Heat & power",
    value: 78,
    color: "#e3a72f",
    metric: "Mill-concentrated",
    descriptor: "A tradable, dense by-product that can serve mill heat, CHP, and selected gasification pathways.",
    watch: "Competes with existing boiler, briquette, and materials uses.",
    icon: Flame,
  },
  {
    name: "Bagasse",
    family: "Sugar system",
    priority: "Lead now",
    pathway: "Heat & power",
    value: 69,
    color: "#7d9d68",
    metric: "Mill-integrated",
    descriptor: "The most mature CHP opportunity when sugar mills modernize boilers and retain reliable offtake.",
    watch: "Do not count existing process heat twice as new electricity potential.",
    icon: Factory,
  },
  {
    name: "Cassava roots",
    family: "Cassava system",
    priority: "Strategic",
    pathway: "Liquid fuel",
    value: 63,
    color: "#c76d43",
    metric: "E10 anchor",
    descriptor: "Vietnam’s key conventional ethanol feedstock, with an immediate market signal from nationwide E10.",
    watch: "Competes with starch, feed, food, and export markets; protect land-use outcomes.",
    icon: Fuel,
  },
  {
    name: "Livestock manure",
    family: "Livestock system",
    priority: "Lead now",
    pathway: "Biogas",
    value: 58,
    color: "#466d5b",
    metric: "Cluster-dependent",
    descriptor: "Best used as waste treatment plus energy in dense livestock and agro-industrial clusters.",
    watch: "Wet feedstock makes collection radius, methane control, and digestate plans decisive.",
    icon: Leaf,
  },
  {
    name: "Rice straw",
    family: "Rice system",
    priority: "Pilot & cascade",
    pathway: "Advanced",
    value: 96,
    color: "#d4a344",
    metric: "Largest gross resource",
    descriptor: "The largest resource by gross energy, suited to cascaded uses, densification, heat, and future advanced fuels.",
    watch: "Remove only surplus after soil, nutrient, and circular-economy uses are protected.",
    icon: Sprout,
  },
  {
    name: "Coffee & coconut residues",
    family: "Regional residues",
    priority: "Regional",
    pathway: "Biogas",
    value: 34,
    color: "#8a6844",
    metric: "Processing-led",
    descriptor: "Regional processor clusters can support biogas, heat, pellets, and materials-plus-energy routes.",
    watch: "Compare fuel value with compost, char, fibre, and activated-carbon markets.",
    icon: Truck,
  },
];

const regions = [
  {
    number: "01",
    place: "Mekong River Delta",
    title: "Rice processing + straw cascades",
    body: "Start at mills with husk-fired heat and CHP. Add straw only when cooperatives, soil rules, bale storage, and a nearby buyer are in place.",
    tags: ["Rice husk", "Rice straw", "Mushrooms / fertilizer"],
    image: ASSETS.husk,
  },
  {
    number: "02",
    place: "Sugar mill regions",
    title: "High-pressure bagasse CHP",
    body: "Modernize steam systems, preserve internal process heat, and connect surplus power or heat to secure offtake.",
    tags: ["Bagasse", "CHP", "Process heat"],
    image: ASSETS.bagasse,
  },
  {
    number: "03",
    place: "Livestock corridors",
    title: "Waste treatment + biogas",
    body: "Use manure and agro-industrial wastewater in short-radius clusters, with digestate management designed from the outset.",
    tags: ["Manure", "Biogas", "Digestate"],
    image: ASSETS.biogas,
  },
];

const policy = [
  { year: "2023", title: "PDP8 approved", text: "Biomass is recognized in Vietnam’s national power-development framework." },
  { year: "2025", title: "PDP8 adjustment", text: "Updated 2030 biomass and waste-to-energy capacity ranges sharpen the project pipeline context." },
  { year: "2025", title: "Circular 50/2025", text: "Sets the blending roadmap and reinforces supply, quality, investment, and distribution responsibilities." },
  { year: "2026", title: "Nationwide E10", text: "E10 implementation began on 1 June, creating an immediate ethanol demand channel." },
];

const safeguards = [
  ["Protect the field", "Set residue-removal rules around soil carbon, nutrients, erosion, and yield; do not apply a single national collection rate."],
  ["Price the next-best use", "Husk, bagasse, peels, and fibre already have markets. Contract against opportunity cost, not a zero-price assumption."],
  ["Cluster before scaling", "Map real suppliers, processors, roads, moisture, storage, and offtake inside a credible collection radius."],
  ["Design the whole system", "Include ash, wastewater, methane leakage, digestate, worker safety, and community benefit sharing in the base case."],
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

export default function Home() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [demandCase, setDemandCase] = useState(100);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSafeguard, setActiveSafeguard] = useState(0);

  const filteredFeedstocks = useMemo(
    () => (filter === "All" ? feedstocks : feedstocks.filter((item) => item.pathway === filter)),
    [filter],
  );

  const ethanolDemand = Math.round(920 * (demandCase / 100));
  const domesticSupply = Math.round(318 * (demandCase / 100));
  const feedstockGap = Math.round(1505 * (demandCase / 100));

  return (
    <div className="atlas-shell">
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
          <span>Part of AI4U.now</span>
        </div>
        <nav className="rail-links">
          <ScrollLink to="#overview"><span>01</span>Overview</ScrollLink>
          <ScrollLink to="#feedstocks"><span>02</span>Feedstock field</ScrollLink>
          <ScrollLink to="#e10"><span>03</span>E10 lens</ScrollLink>
          <ScrollLink to="#clusters"><span>04</span>Regional clusters</ScrollLink>
          <ScrollLink to="#safeguards"><span>05</span>Safeguards</ScrollLink>
          <ScrollLink to="#sources"><span>06</span>Sources</ScrollLink>
        </nav>
        <div className="rail-footer">
          <div className="rail-rule" />
          <span>Evidence cutoff</span>
          <strong>August 2026</strong>
          <p>Built from the Vietnam Biofuel Potential Study · AI4U Intelligence.</p>
        </div>
      </aside>

      <header className="mobile-header">
        <a className="mobile-brand" href="#overview" aria-label="Vietnam Biofuel Atlas home">
          <img src={ASSETS.mark} alt="AI4U.now Logo" />
          <span>Biofuel Atlas</span>
        </a>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {mobileOpen && (
          <nav className="mobile-menu">
            <ScrollLink to="#overview"><span onClick={() => setMobileOpen(false)}>Overview</span></ScrollLink>
            <ScrollLink to="#feedstocks"><span onClick={() => setMobileOpen(false)}>Feedstock field</span></ScrollLink>
            <ScrollLink to="#e10"><span onClick={() => setMobileOpen(false)}>E10 lens</span></ScrollLink>
            <ScrollLink to="#clusters"><span onClick={() => setMobileOpen(false)}>Regional clusters</span></ScrollLink>
            <ScrollLink to="#safeguards"><span onClick={() => setMobileOpen(false)}>Safeguards</span></ScrollLink>
          </nav>
        )}
      </header>

      <main>
        <section id="overview" className="hero-section">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-delta-lines" aria-hidden="true"><i /><i /><i /></div>
          <div className="hero-inner">
            <div className="hero-atlas-bar">
              <div className="hero-brand-inline">
                <img src={ASSETS.mark} alt="AI4U.now Logo" />
                <span>
                  <b>Vietnam Biofuel Atlas</b>
                  <small>AI4U.now Agricultural Resource Guide</small>
                </span>
              </div>
              <div className="hero-location">Field sheet 01 · Mekong Delta rice landscape</div>
            </div>
            <div className="eyebrow"><span className="dot" />Research field guide · 2026</div>
            <h1>Map what is abundant.<br /><em>Prioritize what is deliverable.</em></h1>
            <p className="hero-copy">A stakeholder resource guide to agricultural feedstocks, fuel pathways, policy signals, and the practical conditions for biofuels in Vietnam.</p>
            <div className="hero-actions">
              <ScrollLink to="#feedstocks"><span className="primary-action">Explore the feedstock field <ArrowDownRight size={17} /></span></ScrollLink>
              <ScrollLink to="#sources"><span className="text-action">Read the evidence base <ChevronRight size={16} /></span></ScrollLink>
            </div>
            <div className="hero-note">
              <CircleAlert size={17} />
              <span>Potential is not supply. This guide distinguishes gross resource from sustainable and deployable feedstock.</span>
            </div>
          </div>
          <div className="hero-stamp">
            <span>Field note</span>
            <strong>Residue-first<br />by design</strong>
            <i />
          </div>
        </section>

        <section className="briefing-band">
          <div className="briefing-label"><BarChart3 size={20} /><span>At a glance</span></div>
          <div className="briefing-metric"><strong>40,501–84,936</strong><span>GWh<sub>th</sub>/year</span><small>Illustrative sustainable screen across six crop families</small></div>
          <div className="briefing-metric"><strong>1 June 2026</strong><span>E10 begins</span><small>Nationwide policy signal for fuel ethanol</small></div>
          <div className="briefing-metric"><strong>7.95 Mt</strong><span>Atlas reality check</span><small>Farmer-willingness-adjusted harvesting residues in the legacy atlas</small></div>
        </section>

        <section className="folio-section introduction" aria-labelledby="intro-heading">
          <div className="section-index"><span>01</span><i /></div>
          <div className="intro-copy">
            <div className="section-kicker">The core finding</div>
            <h2 id="intro-heading">Vietnam has a large agricultural biomass base. Its strongest projects begin where materials, markets, and safeguards overlap.</h2>
          </div>
          <div className="intro-note">
            <BadgeCheck size={20} />
            <p><b>Near-term lead pathways</b> are bagasse CHP, rice-husk heat at mills, integrated cassava-processing energy, and cluster-based manure biogas.</p>
            <p><b>Higher-risk scale pathways</b> include broad rice-straw removal and new dedicated energy-crop expansion without soil, land, and food-system protection.</p>
          </div>
        </section>

        <section id="feedstocks" className="folio-section feedstock-section" aria-labelledby="feedstocks-heading">
          <div className="section-index"><span>02</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">Feedstock field · national crop + processor residues</div>
              <h2 id="feedstocks-heading">Six pathways, one practical test.</h2>
            </div>
            <div className="header-evidence"><p>Filter the evidence field by conversion pathway. The bar length indicates comparative gross resource scale, not bankable supply.</p><span><i />Gross theoretical energy scale · largest category = rice system</span></div>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter feedstocks by pathway">
            {(["All", "Heat & power", "Liquid fuel", "Biogas", "Advanced"] as FilterKey[]).map((item) => (
              <button key={item} className={filter === item ? "filter-button active" : "filter-button"} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>
                {item}
              </button>
            ))}
          </div>
          <div className="feedstock-grid">
            {filteredFeedstocks.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="feedstock-card" key={item.name} style={{ "--accent": item.color } as React.CSSProperties}>
                  <div className="card-topline"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.priority}</span></div>
                  <div className="crop-stamp"><Icon size={23} /></div>
                  <div className="feedstock-title"><div><small>{item.family}</small><h3>{item.name}</h3></div><span className="pathway-tag">{item.pathway}</span></div>
                  <p>{item.descriptor}</p>
                  <div className="resource-line"><span>Gross scale</span><strong>{item.metric}</strong></div>
                  <div className="resource-bar"><i style={{ width: `${item.value}%` }} /></div>
                  <div className="watch-line"><CircleAlert size={15} /><span>{item.watch}</span></div>
                </article>
              );
            })}
          </div>
          <div className="method-note"><BookOpen size={17} /><span><b>How to read this field.</b> Resource ranking comes from a transparent 2023 crop-production screen using published residue ratios and heating values. It is deliberately separated from technical, sustainable, and commercial potential.</span></div>
        </section>

        <section id="e10" className="e10-section" aria-labelledby="e10-heading">
          <div className="e10-panel">
          <div className="e10-head">
            <div>
              <div className="section-kicker ink-light">E10 lens · domestic plants + imported ethanol routes</div>
                <h2 id="e10-heading">A national blend mandate meets a contested crop.</h2>
              </div>
              <div className="e10-badge"><Fuel size={18} />Policy demand channel</div>
            </div>
            <p className="e10-intro">The screening uses the USDA/FAS-cited industry case: around 920 million litres of annual ethanol demand and an implied domestic production gap. Move the control to test the scale of the exposure; this is a planning lens, not a measured forecast.</p>
            <div className="scenario-box">
              <div className="scenario-topline"><span>Relative demand case</span><strong>{demandCase}%</strong></div>
              <input type="range" min="70" max="130" value={demandCase} onChange={(event) => setDemandCase(Number(event.target.value))} aria-label="Ethanol demand scenario percentage" aria-valuetext={`${demandCase}% demand scenario`} />
              <div className="scenario-labels"><span>70% cautious</span><span>100% cited case</span><span>130% stress case</span></div>
            </div>
            <div className="e10-metrics">
              <div><small>Annual ethanol demand</small><strong>{ethanolDemand.toLocaleString()} <em>million L</em></strong><span>Industry-derived planning case</span></div>
              <div><small>Estimated domestic supply</small><strong>{domesticSupply.toLocaleString()} <em>million L</em></strong><span>Reported baseline used in the study</span></div>
              <div className="gap-metric"><small>Implied dry-chip gap</small><strong>{feedstockGap.toLocaleString()} <em>kt/year</em></strong><span>At an illustrative 400 L ethanol per tonne</span></div>
            </div>
            <div className="e10-footnote"><CircleAlert size={17} /><span>Cassava roots can support ethanol, but they also support starch, food, feed, and export markets. The decisive strategy is supply resilience, not simply more hectares.</span></div>
          </div>
          <div className="e10-side-copy">
            <span className="outline-number">03</span>
            <h3>Three buffers for a resilient E10 system</h3>
            <ol>
              <li><span>01</span><p><b>Diversified imports.</b> Keep credible alternative sources during domestic ramp-up.</p></li>
              <li><span>02</span><p><b>Rehabilitated plants.</b> Improve utilization, water performance, feedstock contracting, and quality control.</p></li>
              <li><span>03</span><p><b>Smarter feedstock systems.</b> Raise productivity and integrate peels, wastewater, biogas, and coproducts before encouraging land expansion.</p></li>
            </ol>
          </div>
        </section>

        <section id="clusters" className="folio-section clusters-section" aria-labelledby="clusters-heading">
          <div className="section-index"><span>04</span><i /></div>
          <div className="section-header split-header">
            <div>
              <div className="section-kicker">Regional clusters · delta, mill, and livestock corridor logic</div>
              <h2 id="clusters-heading">Build where the system already gathers.</h2>
            </div>
            <p>Feedstock totals conceal geography. The more dependable projects begin with a real processor, cooperative, mill, or livestock cluster—not a national average.</p>
          </div>
          <div className="cluster-route-note"><span>Vietnam resource route</span><i /><b>Field residue</b><ChevronRight size={15} /><b>Cooperative / processor</b><ChevronRight size={15} /><b>Heat, fuel, or gas offtake</b></div>
          <div className="region-rail">
            {regions.map((region) => (
              <article className="region-card" key={region.number}>
                <img src={region.image} alt={region.place} />
                <div className="region-overlay" />
                <div className="region-content">
                  <div className="region-top"><span>{region.number}</span><span>{region.place}</span></div>
                  <h3>{region.title}</h3>
                  <p>{region.body}</p>
                  <div className="region-tags">{region.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="policy-section" aria-labelledby="policy-heading">
          <div className="policy-left"><div className="section-kicker">Policy field notes · national blend + project pipeline</div><h2 id="policy-heading">Two demand channels.<br />Different risks.</h2><p>E10 provides the immediate liquid-fuel signal. Biomass heat and power remains project-led, with commercial readiness driven by offtake, contracting, and grid realities.</p></div>
          <div className="timeline">
            {policy.map((item) => <div className="timeline-item" key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
          </div>
        </section>

        <section id="safeguards" className="folio-section safeguards-section" aria-labelledby="safeguards-heading">
          <div className="section-index"><span>05</span><i /></div>
          <div className="section-header split-header"><div><div className="section-kicker">Sustainability screen · field to facility</div><h2 id="safeguards-heading">Start with residues. Scale only where the system can hold.</h2></div><p>Projects should proceed only after they can explain what stays in the field, who is paid, how fuel moves, and where every co-product goes.</p></div>
          <div className="safeguard-layout">
            <div className="safeguard-tabs">
              {safeguards.map(([title], index) => <button key={title} onClick={() => setActiveSafeguard(index)} className={activeSafeguard === index ? "safeguard-tab selected" : "safeguard-tab"}><span>{String(index + 1).padStart(2, "0")}</span>{title}<ChevronRight size={17} /></button>)}
            </div>
            <div className="safeguard-detail"><Scale size={27} /><span className="detail-number">0{activeSafeguard + 1}</span><h3>{safeguards[activeSafeguard][0]}</h3><p>{safeguards[activeSafeguard][1]}</p><div className="detail-line" /><small>Required before investment decision</small></div>
          </div>
        </section>

        <section id="sources" className="source-section" aria-labelledby="sources-heading">
          <div className="source-copy"><div className="section-kicker ink-light">Evidence base</div><h2 id="sources-heading">Built from a current study, not a generic biomass claim.</h2><p>This guide translates a structured study of Vietnam’s biofuel potential, combining uploaded project documents with external policy, market, agriculture, biogas, and sustainability research from 2024–2026.</p></div>
          <div className="source-list">
            <a href="https://moit.gov.vn/en/news/e10-biofuel-gasoline-implementing-a-major-party-and-state-policy.html" target="_blank" rel="noreferrer"><span>01</span><div><b>MOIT · E10 rollout</b><small>National policy communication, May 2026</small></div><ArrowUpRight size={18} /></a>
            <a href="https://www.fao.org/statistics/highlights-archive/highlights-detail/agricultural-production-statistics-2010-2024/en" target="_blank" rel="noreferrer"><span>02</span><div><b>FAO · Agricultural production</b><small>Latest statistical coverage through 2024</small></div><ArrowUpRight size={18} /></a>
            <a href="https://www.iea.org/reports/outlook-for-biogas-and-biomethane/assessing-the-sustainable-potential-and-cost-of-feedstocks-for-biogas-and-biomethane" target="_blank" rel="noreferrer"><span>03</span><div><b>IEA · Biogas and biomethane</b><small>Feedstock sustainability and cost guidance, 2025</small></div><ArrowUpRight size={18} /></a>
            <a href="https://www.irri.org/news-and-events/news/waste-wealth-vietnams-circular-economy-turns-rice-straw-farmer-income-boost" target="_blank" rel="noreferrer"><span>04</span><div><b>IRRI · Rice-straw circularity</b><small>Cooperative evidence from Can Tho, 2025</small></div><ArrowUpRight size={18} /></a>
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
        <p>Interactive guide based on the Vietnam Biofuel Potential Study · Evidence cutoff: August 2026.</p>
        <div className="footer-actions">
          <a href="https://github.com/ai4u23/vietnam-biofuel-atlas" target="_blank" rel="noreferrer" className="footer-gh-link">
            GitHub
          </a>
          <ScrollLink to="#overview"><span className="back-to-top">Back to top ↑</span></ScrollLink>
        </div>
      </footer>
    </div>
  );
}
