/**
 * CitationRef: Inline interactive reference badge / citation indicator.
 * Displays clean superscripts like [01], [04] with hover preview tooltips
 * and smooth jump-to-source in the Evidence Base section.
 */

import React, { useState } from "react";
import { EVIDENCE_REFERENCES, EvidenceReference } from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, FileText, ArrowDownRight } from "lucide-react";

interface CitationRefProps {
  id?: string;
  ids?: string[];
  inline?: boolean;
}

export default function CitationRef({ id, ids, inline = true }: CitationRefProps) {
  const { isVi } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const targetIds = ids || (id ? [id] : []);
  if (targetIds.length === 0) return null;

  const resolvedRefs: { ref: EvidenceReference; index: number }[] = [];
  targetIds.forEach((tid) => {
    const idx = EVIDENCE_REFERENCES.findIndex((r) => r.id === tid);
    if (idx !== -1) {
      resolvedRefs.push({ ref: EVIDENCE_REFERENCES[idx], index: idx + 1 });
    }
  });

  if (resolvedRefs.length === 0) return null;

  const handleClick = (e: React.MouseEvent, targetRefId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Dispatch jump event to EvidenceBase so filters and searches are reset
    window.dispatchEvent(
      new CustomEvent("jump-to-evidence", { detail: { refId: targetRefId } })
    );

    // Immediate scroll fallback
    const element = document.getElementById(`evidence-card-${targetRefId}`) || document.getElementById("sources");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      const card = document.getElementById(`evidence-card-${targetRefId}`);
      if (card) {
        card.classList.remove("pulse-highlight");
        void card.offsetWidth;
        card.classList.add("pulse-highlight");
        setTimeout(() => {
          card.classList.remove("pulse-highlight");
        }, 2500);
      }
    }
  };

  const primaryRefId = resolvedRefs[0].ref.id;
  const citationLabel = `[${resolvedRefs.map((r) => String(r.index).padStart(2, "0")).join(", ")}]`;

  return (
    <span
      className={`citation-ref-container ${inline ? "is-inline" : ""}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="button"
        className="citation-pill"
        onClick={(e) => handleClick(e, primaryRefId)}
        aria-label={`Citation: ${citationLabel}`}
      >
        <span className="citation-text">{citationLabel}</span>
      </button>

      {/* Hover preview tooltip */}
      {showTooltip && (
        <div className="citation-tooltip" role="tooltip">
          {resolvedRefs.map(({ ref, index }) => (
            <div key={ref.id} className="tooltip-ref-item">
              <div className="tooltip-header">
                <span className="tooltip-badge">Ref [{String(index).padStart(2, "0")}]</span>
                <span className="tooltip-year">{ref.year}</span>
              </div>
              <p className="tooltip-title">{isVi ? ref.titleVi : ref.titleEn}</p>
              <div className="tooltip-meta">
                <span>{isVi ? ref.authorVi : ref.authorEn}</span>
              </div>
              <div className="tooltip-footer">
                <span className="click-hint">
                  <ArrowDownRight size={12} />
                  {isVi ? "Nhấp để chuyển đến tài liệu nguồn" : "Click to view source in Evidence Base"}
                </span>
                {ref.pdfUrl && <span className="pdf-tag">PDF</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </span>
  );
}
