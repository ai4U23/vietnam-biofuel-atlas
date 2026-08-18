/**
 * RegionalAtlasMap: An interactive editorial cartographic map of Vietnam's
 * agricultural biofuel and biomass corridors.
 * Supports Vietnamese and English bilingual translations.
 */

import React, { useState } from "react";
import {
  REGIONAL_CLUSTERS,
  RegionalCluster,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import CitationRef from "@/components/CitationRef";
import {
  Flame,
  Factory,
  Leaf,
  Fuel,
  Truck,
  Sparkles,
  MapPin,
  Info,
  CheckCircle2,
} from "lucide-react";

interface RegionalAtlasMapProps {
  selectedClusterId: string | null;
  onSelectCluster: (cluster: RegionalCluster | null) => void;
}

const PATHWAY_ICONS: Record<string, React.ElementType> = {
  "Rice System": Flame,
  "Sugar System": Factory,
  "Livestock System": Leaf,
  "Cassava System": Fuel,
  "Regional Residues": Truck,
};

export default function RegionalAtlasMap({
  selectedClusterId,
  onSelectCluster,
}: RegionalAtlasMapProps) {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const [hoveredCluster, setHoveredCluster] = useState<RegionalCluster | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = [
    { key: "All", label: isVi ? "Tất cả" : "All" },
    { key: "Rice System", label: isVi ? "Lúa gạo" : "Rice System" },
    { key: "Sugar System", label: isVi ? "Mía đường" : "Sugar System" },
    { key: "Livestock System", label: isVi ? "Chăn nuôi" : "Livestock System" },
    { key: "Cassava System", label: isVi ? "Sắn (Khoai mì)" : "Cassava System" },
    { key: "Regional Residues", label: isVi ? "Phụ phẩm vùng" : "Regional Residues" },
  ];

  const filteredClusters = REGIONAL_CLUSTERS.filter((c) =>
    activeFilter === "All" ? true : c.dominantPathway === activeFilter
  );

  const activeCluster =
    REGIONAL_CLUSTERS.find((c) => c.id === selectedClusterId) ||
    hoveredCluster ||
    REGIONAL_CLUSTERS[0];

  const PathwayIcon = PATHWAY_ICONS[activeCluster.dominantPathway] || Sparkles;
  const clusterCopy = t.clusters.items[activeCluster.id as keyof typeof t.clusters.items] || {
    title: activeCluster.title,
    body: activeCluster.body,
  };

  return (
    <div className="atlas-map-card">
      <div className="map-header">
        <div className="map-title-wrap">
          <div className="map-badge">
            <span className="pulse-dot" />
            <span>{t.map.badge}</span>
          </div>
          <h3>
            {t.map.title} <CitationRef id="wb_biomass_atlas_2018" />
          </h3>
          <p>{t.map.desc}</p>
        </div>

        {/* Pathway Filter Badges */}
        <div className="map-filter-bar">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              className={`map-filter-btn ${activeFilter === opt.key ? "active" : ""}`}
              onClick={() => setActiveFilter(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="map-body-grid">
        {/* SVG Cartographic Display */}
        <div className="map-canvas-container">
          <svg
            viewBox="0 0 400 700"
            className="vietnam-cartography-svg"
            aria-label="Vietnam Biofuel Regional Map"
          >
            <defs>
              <linearGradient id="vietnamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e2c3e" />
                <stop offset="50%" stopColor="#192535" />
                <stop offset="100%" stopColor="#141e2b" />
              </linearGradient>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#111a26" />
                <stop offset="100%" stopColor="#0d141e" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle Cartographic Coordinate Grid */}
            <g className="carto-grid" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="3 3">
              <line x1="50" y1="0" x2="50" y2="700" />
              <line x1="150" y1="0" x2="150" y2="700" />
              <line x1="250" y1="0" x2="250" y2="700" />
              <line x1="350" y1="0" x2="350" y2="700" />
              <line x1="0" y1="150" x2="400" y2="150" />
              <line x1="0" y1="300" x2="400" y2="300" />
              <line x1="0" y1="450" x2="400" y2="450" />
              <line x1="0" y1="600" x2="400" y2="600" />
            </g>

            {/* Latitude / Longitude Markings */}
            <text x="12" y="145" fill="#4d5d6d" fontSize="7" letterSpacing="0.08em">{isVi ? "21°B · ĐỒNG BẰNG BẮC BỘ" : "21°N · RED RIVER"}</text>
            <text x="12" y="300" fill="#4d5d6d" fontSize="7" letterSpacing="0.08em">{isVi ? "17°B · BẮC TRUNG BỘ" : "17°N · NORTH CENTRAL"}</text>
            <text x="12" y="450" fill="#4d5d6d" fontSize="7" letterSpacing="0.08em">{isVi ? "13°B · TÂY NGUYÊN" : "13°N · HIGHLANDS"}</text>
            <text x="12" y="600" fill="#4d5d6d" fontSize="7" letterSpacing="0.08em">{isVi ? "10°B · ĐỒNG BẰNG SÔNG CỬU LONG" : "10°N · MEKONG DELTA"}</text>

            {/* Vietnam S-Curve Stylized Geography Base Shape */}
            <g className="vietnam-landmass">
              <path
                d="M 115 50
                   C 140 40, 210 40, 245 65
                   C 265 85, 275 120, 250 150
                   C 230 175, 205 180, 195 200
                   C 185 220, 190 250, 215 285
                   C 240 320, 275 365, 280 415
                   C 285 460, 260 500, 230 535
                   C 200 565, 175 580, 140 600
                   C 105 620, 80 610, 75 580
                   C 70 550, 95 530, 120 520
                   C 145 510, 170 480, 185 440
                   C 200 400, 195 350, 175 305
                   C 155 260, 140 220, 145 180
                   C 150 140, 110 110, 95 85
                   Z"
                fill="url(#vietnamGrad)"
                stroke="rgba(227, 167, 47, 0.45)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Red River Delta Motif */}
              <path
                d="M 180 110 Q 210 135 240 145 M 195 125 Q 220 140 235 155"
                stroke="rgba(227, 167, 47, 0.25)"
                strokeWidth="1"
                fill="none"
              />

              {/* Mekong Delta Waterway Branches Motif */}
              <path
                d="M 130 550 Q 155 585 180 615 M 115 565 Q 145 595 165 625 M 100 580 Q 125 605 145 635"
                stroke="rgba(227, 167, 47, 0.3)"
                strokeWidth="1.2"
                fill="none"
              />

              {/* Coastal Edge Water Highlights */}
              <path
                d="M 245 65 Q 275 125 245 180 Q 195 240 220 300 Q 285 390 270 470 Q 240 540 140 620"
                stroke="rgba(97, 218, 251, 0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
            </g>

            {/* Maritime Annotations */}
            <g className="ocean-features">
              <text x="290" y="240" fill="#3b4d60" fontSize="8" fontStyle="italic" letterSpacing="0.1em">
                {isVi ? "BIỂN ĐÔNG" : "EAST SEA"}
              </text>
              <text x="290" y="252" fill="#2d3c4c" fontSize="6.5" letterSpacing="0.05em">
                {isVi ? "(EAST SEA)" : "(SOUTH CHINA SEA)"}
              </text>
              <text x="35" y="550" fill="#3b4d60" fontSize="7" fontStyle="italic" letterSpacing="0.08em">
                {isVi ? "VỊNH THÁI LAN" : "GULF OF THAILAND"}
              </text>

              {/* Phu Quoc Island */}
              <ellipse cx="65" cy="590" rx="9" ry="16" transform="rotate(-25 65 590)" fill="#1c2a3b" stroke="rgba(227,167,47,0.3)" strokeWidth="0.8" />
              <text x="42" y="615" fill="#607183" fontSize="6">{isVi ? "Phú Quốc" : "Phu Quoc"}</text>
            </g>

            {/* Regional Cluster Nodes */}
            <g className="cluster-nodes">
              {filteredClusters.map((cluster) => {
                const isSelected = selectedClusterId === cluster.id;
                const isHovered = hoveredCluster?.id === cluster.id;
                const { x, y } = cluster.svgCoords;
                const displayName = isVi ? cluster.vietnameseName : cluster.name;

                return (
                  <g
                    key={cluster.id}
                    className={`map-node-group ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
                    transform={`translate(${x}, ${y})`}
                    onClick={() => onSelectCluster(cluster)}
                    onMouseEnter={() => setHoveredCluster(cluster)}
                    onMouseLeave={() => setHoveredCluster(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {(isSelected || isHovered) && (
                      <circle
                        r="18"
                        fill="none"
                        stroke={cluster.accentColor}
                        strokeWidth="1"
                        opacity="0.6"
                        className="pulse-halo"
                      />
                    )}

                    <circle
                      r="12"
                      fill={cluster.accentColor}
                      opacity={isSelected ? "0.35" : "0.18"}
                    />

                    <circle
                      r="6.5"
                      fill={cluster.accentColor}
                      stroke="#0c141f"
                      strokeWidth="1.5"
                      filter="url(#glow)"
                    />

                    <text
                      y="2.5"
                      textAnchor="middle"
                      fill="#0c141f"
                      fontSize="5.5"
                      fontWeight="900"
                    >
                      {cluster.number}
                    </text>

                    <text
                      x="14"
                      y="3.5"
                      fill={isSelected ? "#fff9ed" : "#b0bcc8"}
                      fontSize="7.5"
                      fontWeight={isSelected ? "800" : "600"}
                      letterSpacing="0.04em"
                      className="node-svg-label"
                    >
                      {displayName}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-dot rice" />
              <span>{t.map.legendRice}</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot sugar" />
              <span>{t.map.legendSugar}</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot livestock" />
              <span>{t.map.legendLivestock}</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot cassava" />
              <span>{t.map.legendCassava}</span>
            </div>
          </div>
        </div>

        {/* Selected Cluster Detail Panel */}
        <div className="map-detail-panel">
          <div className="panel-kicker">
            <div className="panel-num">
              {isVi ? `CỤM VÙNG ${activeCluster.number}` : `CLUSTER ${activeCluster.number}`}
            </div>
            <span className="panel-zone">
              {isVi ? `Vùng ${activeCluster.zone}` : `${activeCluster.zone} Zone`}
            </span>
          </div>

          <div className="panel-title-area">
            <div
              className="panel-icon-stamp"
              style={{ backgroundColor: `color-mix(in srgb, ${activeCluster.accentColor} 25%, #182332)` }}
            >
              <PathwayIcon size={20} color={activeCluster.accentColor} />
            </div>
            <div>
              <h4>{isVi ? activeCluster.vietnameseName : activeCluster.name}</h4>
              <small>{isVi ? activeCluster.name : activeCluster.vietnameseName}</small>
            </div>
          </div>

          <p className="panel-desc">{clusterCopy.body}</p>

          <div className="panel-stats-grid">
            <div className="panel-stat-box">
              <small>{t.map.panelGross}</small>
              <strong>
                {activeCluster.grossPotentialGWh.toLocaleString()}{" "}
                <em>GWh<sub>th</sub>/{isVi ? "năm" : "yr"}</em>{" "}
                <CitationRef id="wb_biomass_atlas_2018" />
              </strong>
              <span>{isVi ? "Tài nguyên lý thuyết" : "Biomass theoretical base"}</span>
            </div>
            <div className="panel-stat-box">
              <small>{t.map.panelDeliver}</small>
              <strong style={{ color: activeCluster.accentColor }}>
                {activeCluster.deliverableShare}% <CitationRef id="wb_biomass_atlas_2018" />
              </strong>
              <span>{t.map.panelDeliverSub}</span>
            </div>
          </div>

          <div className="panel-infra-box">
            <div className="infra-label">
              <Info size={13} />
              <span>{t.map.panelInfra}</span>
            </div>
            <p>{activeCluster.keyInfrastructure}</p>
          </div>

          <div className="panel-provinces-box">
            <small>{t.map.panelProvinces}</small>
            <div className="province-pill-list">
              {activeCluster.provinces.map((prov) => (
                <span key={prov} className="province-pill">
                  <MapPin size={11} />
                  {prov}
                </span>
              ))}
            </div>
          </div>

          <div className="panel-action-row">
            <button
              className="sync-card-btn"
              onClick={() => {
                onSelectCluster(activeCluster);
                const el = document.getElementById(`cluster-card-${activeCluster.id}`);
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <CheckCircle2 size={14} />
              <span>{t.map.panelAction}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
