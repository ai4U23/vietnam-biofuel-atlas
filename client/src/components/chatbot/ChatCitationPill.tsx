import React, { useState } from "react";
import { EVIDENCE_REFERENCES, EvidenceReference } from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowDownRight, FileText, ExternalLink } from "lucide-react";

interface ChatCitationPillProps {
  index: number;
  refData?: EvidenceReference;
}

export default function ChatCitationPill({ index, refData }: ChatCitationPillProps) {
  const { isVi } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const reference = refData || EVIDENCE_REFERENCES[index - 1];
  if (!reference) return <span>[{String(index).padStart(2, "0")}]</span>;

  const paddedIndex = String(index).padStart(2, "0");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Dispatch jump event to EvidenceBase so filters and searches are reset
    window.dispatchEvent(
      new CustomEvent("jump-to-evidence", { detail: { refId: reference.id } })
    );

    // Smooth scroll to citation card
    const targetElement =
      document.getElementById(`evidence-card-${reference.id}`) ||
      document.getElementById("sources");

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

      const card = document.getElementById(`evidence-card-${reference.id}`);
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

  return (
    <span
      className="chat-citation-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="button"
        className="chat-citation-pill"
        onClick={handleClick}
        title={isVi ? reference.titleVi : reference.titleEn}
        aria-label={`Citation [${paddedIndex}]`}
      >
        <span className="chat-citation-num">[{paddedIndex}]</span>
      </button>

      {showTooltip && (
        <div className="chat-citation-tooltip" role="tooltip">
          <div className="chat-tooltip-header">
            <span className="chat-tooltip-badge">Ref [{paddedIndex}]</span>
            <span className="chat-tooltip-year">{reference.year}</span>
          </div>
          <p className="chat-tooltip-title">{isVi ? reference.titleVi : reference.titleEn}</p>
          <div className="chat-tooltip-meta">
            <span>{isVi ? reference.authorVi : reference.authorEn}</span>
          </div>
          <div className="chat-tooltip-footer">
            <span className="chat-tooltip-action">
              <ArrowDownRight size={12} />
              {isVi ? "Xem tài liệu trong Evidence Base" : "Jump to Evidence Base"}
            </span>
            {reference.pdfUrl && (
              <span className="chat-tooltip-pdf">
                <FileText size={11} />
                PDF
              </span>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
