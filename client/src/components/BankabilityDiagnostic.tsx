/**
 * BankabilityDiagnostic Component
 * Interactive FID Bankability & Safeguard Diagnostic Wizard based on GIZ Bioenergy Handbook,
 * ESIA standards, and Decree 58/243 DPPA readiness criteria.
 */
import { useState } from "react";
import {
  BANKABILITY_QUESTIONS,
  calculateBankabilityScore,
} from "@/lib/scenarioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import CitationRef from "@/components/CitationRef";
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Scale,
  Sparkles,
  Layers,
} from "lucide-react";

export default function BankabilityDiagnostic() {
  const { language, isVi } = useLanguage();
  const t = TRANSLATIONS[language].bankability;

  // Answers map: questionId -> selectedOptionIndex (default: 0 for all)
  const [answers, setAnswers] = useState<Record<string, number>>({
    feedstock_radius: 0,
    soil_safeguard: 0,
    offtake_structure: 0,
    boiler_technology: 0,
    feedstock_contracts: 0,
    farmer_benefit_sharing: 0,
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setAnswers({
      feedstock_radius: 0,
      soil_safeguard: 0,
      offtake_structure: 0,
      boiler_technology: 0,
      feedstock_contracts: 0,
      farmer_benefit_sharing: 0,
    });
  };

  const result = calculateBankabilityScore(answers);

  return (
    <div className="diagnostic-wrapper">
      {/* Diagnostic Header */}
      <div className="diagnostic-header">
        <div>
          <div className="section-kicker">
            <ShieldCheck size={13} />
            <span>{t.kicker}</span>
          </div>
          <h3>
            {t.title} <CitationRef ids={["giz_bioenergy_handbook", "giz_esia_guidelines"]} />
          </h3>
          <p>{t.subtitle}</p>
        </div>

        <button className="reset-btn" onClick={handleReset} title="Reset to baseline">
          <RotateCcw size={14} />
          <span>{t.resetBtn}</span>
        </button>
      </div>

      <div className="diagnostic-grid">
        {/* Questions Column */}
        <div className="diagnostic-questions-list">
          {BANKABILITY_QUESTIONS.map((q, qIndex) => {
            const currentSelected = answers[q.id] ?? 0;
            return (
              <div key={q.id} className="question-card">
                <div className="q-title-row">
                  <span className="q-number">0{qIndex + 1}</span>
                  <div>
                    <h4>{isVi ? q.titleVi : q.titleEn}</h4>
                    <p>{isVi ? q.descriptionVi : q.descriptionEn}</p>
                  </div>
                </div>

                <div className="q-options-list" role="radiogroup">
                  {q.options.map((opt, optIndex) => {
                    const isChecked = currentSelected === optIndex;
                    return (
                      <div
                        key={optIndex}
                        className={`q-option-item ${isChecked ? "checked" : ""}`}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        role="radio"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleSelectOption(q.id, optIndex)}
                      >
                        <div className="option-radio-dot">
                          {isChecked && <i />}
                        </div>
                        <div className="option-content">
                          <strong>{isVi ? opt.labelVi : opt.labelEn}</strong>
                          <small className={isChecked ? "text-highlight" : ""}>
                            {isVi ? opt.riskNoteVi : opt.riskNoteEn}
                          </small>
                        </div>
                        <span className="score-pill">{opt.score} pts</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scorecard Summary Sticky Rail */}
        <div className="diagnostic-scorecard-rail">
          <div className="scorecard-card">
            <div className="scorecard-badge">
              <Award size={15} />
              <span>{t.scorecardTitle}</span>
            </div>

            <div className="score-display-radial">
              <div className="score-circle" style={{ borderColor: result.statusColor }}>
                <span className="score-number">{result.finalScore}</span>
                <span className="score-max">/ 100</span>
              </div>
              <div className="tier-label" style={{ color: result.statusColor }}>
                <strong>{isVi ? result.tierVi : result.readinessTier}</strong>
              </div>
            </div>

            <div className="score-progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${result.finalScore}%`, backgroundColor: result.statusColor }}
              />
            </div>

            <div className="bankability-criteria-breakdown">
              <h5>{t.criteriaBreakdownTitle}</h5>
              {BANKABILITY_QUESTIONS.map((q) => {
                const selected = q.options[answers[q.id] ?? 0];
                return (
                  <div key={q.id} className="criteria-row">
                    <span>{isVi ? q.titleVi.split(".")[1] : q.titleEn.split(".")[1]}</span>
                    <strong>{selected?.score ?? 0}%</strong>
                  </div>
                );
              })}
            </div>

            <div className="scorecard-advice-box">
              <div className="advice-title">
                <Sparkles size={15} />
                <span>{t.recommendationTitle}</span>
              </div>
              <p>
                {result.finalScore >= 85
                  ? t.adviceFidReady
                  : result.finalScore >= 70
                  ? t.adviceMinorGaps
                  : result.finalScore >= 50
                  ? t.adviceModerateRisk
                  : t.adviceSubBankable}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
