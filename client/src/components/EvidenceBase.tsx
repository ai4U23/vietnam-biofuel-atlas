/**
 * EvidenceBase: Interactive evidence repository & reference archive
 * Enables browsing, searching, and downloading official project PDFs and publisher links.
 */

import React, { useState, useMemo } from "react";
import {
  EVIDENCE_REFERENCES,
  EvidenceReference,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  BookOpen,
  Map,
  Scale,
  TrendingUp,
  GraduationCap,
  Sparkles,
  X,
  FileCheck2,
} from "lucide-react";

const CATEGORY_META = {
  all: { icon: BookOpen, color: "#e3a72f" },
  guideline: { icon: FileCheck2, color: "#7d9d68" },
  atlas: { icon: Map, color: "#e3a72f" },
  academic: { icon: GraduationCap, color: "#5bb2d6" },
  policy: { icon: Scale, color: "#d4a344" },
  market: { icon: TrendingUp, color: "#c76d43" },
};

export default function EvidenceBase() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { key: "all", label: t.sources.filterAll, icon: CATEGORY_META.all.icon },
    { key: "atlas", label: t.sources.filterAtlas, icon: CATEGORY_META.atlas.icon },
    { key: "guideline", label: t.sources.filterGuideline, icon: CATEGORY_META.guideline.icon },
    { key: "academic", label: t.sources.filterAcademic, icon: CATEGORY_META.academic.icon },
    { key: "policy", label: t.sources.filterPolicy, icon: CATEGORY_META.policy.icon },
    { key: "market", label: t.sources.filterMarket, icon: CATEGORY_META.market.icon },
  ];

  const filteredReferences = useMemo(() => {
    return EVIDENCE_REFERENCES.filter((ref) => {
      const matchCategory =
        selectedCategory === "all" || ref.category === selectedCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const title = (isVi ? ref.titleVi : ref.titleEn).toLowerCase();
      const author = (isVi ? ref.authorVi : ref.authorEn).toLowerCase();
      const desc = (isVi ? ref.descriptionVi : ref.descriptionEn).toLowerCase();
      const pubType = (isVi ? ref.publicationTypeVi : ref.publicationTypeEn).toLowerCase();
      const domain = (ref.sourceDomain || "").toLowerCase();

      return (
        title.includes(q) ||
        author.includes(q) ||
        desc.includes(q) ||
        pubType.includes(q) ||
        ref.year.includes(q) ||
        domain.includes(q)
      );
    });
  }, [selectedCategory, searchQuery, isVi]);

  return (
    <div className="evidence-base-wrap">
      {/* Search & Filter Toolbar */}
      <div className="evidence-toolbar">
        {/* Search input */}
        <div className="evidence-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={t.sources.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search reference documents"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="evidence-category-pills" role="tablist" aria-label="Reference categories">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                className={`evidence-cat-pill ${isActive ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Document Results Count */}
      <div className="evidence-results-meta">
        <span>
          {isVi
            ? `Hiển thị ${filteredReferences.length} / ${EVIDENCE_REFERENCES.length} tài liệu nghiên cứu & quy chuẩn`
            : `Displaying ${filteredReferences.length} of ${EVIDENCE_REFERENCES.length} research & policy documents`}
        </span>
      </div>

      {/* References Grid */}
      {filteredReferences.length === 0 ? (
        <div className="evidence-empty-state">
          <p>{t.sources.noResults}</p>
          <button
            className="reset-search-link"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            {isVi ? "Xóa bộ lọc tìm kiếm" : "Reset filter"}
          </button>
        </div>
      ) : (
        <div className="evidence-grid">
          {filteredReferences.map((item, idx) => {
            const CatMeta =
              CATEGORY_META[item.category as keyof typeof CATEGORY_META] ||
              CATEGORY_META.all;
            const CatIcon = CatMeta.icon;

            const globalIdx = EVIDENCE_REFERENCES.findIndex((r) => r.id === item.id) + 1;
            const refNum = String(globalIdx).padStart(2, "0");

            return (
              <article
                key={item.id}
                id={`evidence-card-${item.id}`}
                className={`evidence-card ${item.isCoreDataset ? "is-core" : ""}`}
              >
                <div className="evidence-card-top">
                  <div className="evidence-top-badges">
                    <span className="ref-index-badge">[{refNum}]</span>
                    <span
                      className="category-badge"
                      style={{
                        borderColor: `color-mix(in srgb, ${CatMeta.color} 40%, transparent)`,
                        color: CatMeta.color,
                        backgroundColor: `color-mix(in srgb, ${CatMeta.color} 10%, transparent)`,
                      }}
                    >
                      <CatIcon size={12} />
                      <span>
                        {item.category === "atlas" && (isVi ? "Atlas Không Gian" : "Spatial Atlas")}
                        {item.category === "guideline" && (isVi ? "Cẩm Nang Kỹ Thuật" : "Technical Guide")}
                        {item.category === "academic" && (isVi ? "Bình Duyệt Khoa Học" : "Academic Paper")}
                        {item.category === "policy" && (isVi ? "Quy Phạm & Lộ Trình" : "Policy Roadmap")}
                        {item.category === "market" && (isVi ? "Báo Cáo Ngành" : "Industry Report")}
                      </span>
                    </span>

                    {item.isCoreDataset && (
                      <span className="core-badge">
                        <Sparkles size={11} />
                        <span>{t.sources.coreBadge}</span>
                      </span>
                    )}
                  </div>

                  <span className="evidence-year">{item.year}</span>
                </div>

                <h3 className="evidence-title">
                  {isVi ? item.titleVi : item.titleEn}
                </h3>

                <div className="evidence-author-row">
                  <span className="author-name">
                    {isVi ? item.authorVi : item.authorEn}
                  </span>
                  <span className="dot-sep">·</span>
                  <span className="pub-type">
                    {isVi ? item.publicationTypeVi : item.publicationTypeEn}
                  </span>
                </div>

                <p className="evidence-desc">
                  {isVi ? item.descriptionVi : item.descriptionEn}
                </p>

                <div className="evidence-actions">
                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="evidence-action-btn btn-pdf"
                      title={`Open PDF: ${item.pdfSizeFormatted || ""}`}
                    >
                      <FileText size={14} />
                      <span>{t.sources.downloadPdf}</span>
                      {item.pdfSizeFormatted && (
                        <span className="size-pill">{item.pdfSizeFormatted}</span>
                      )}
                    </a>
                  )}

                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="evidence-action-btn btn-source"
                      title={item.sourceUrl}
                    >
                      <ExternalLink size={14} />
                      <span>{item.sourceDomain || t.sources.viewSource}</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
