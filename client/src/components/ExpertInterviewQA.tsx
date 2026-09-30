/**
 * ExpertInterviewQA Component
 * Digest of the written interview (26 September 2026) between a Japanese business
 * delegation and a Vietnam-based biofuel expert: market-entry verdicts and CAPEX
 * benchmarks across the cassava, sugarcane and rice-husk value chains.
 *
 * Editorial contract: single-source expert elicitation. Figures carry an interview
 * source tag, NOT CitationRef study badges — do not attach [01]–[15] citations here.
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import {
  MessagesSquare,
  Landmark,
  BadgeCheck,
  CircleAlert,
  Coins,
} from "lucide-react";

type VerdictKey = keyof (typeof TRANSLATIONS)["vi"]["interview"]["verdictLabels"];

interface QaItem {
  q: string;
  verdict: string;
  a: string;
  bullets: string[];
}

interface QaGroup {
  label: string;
  intro: string;
  items: QaItem[];
}

export default function ExpertInterviewQA() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].interview;

  const groups: [string, QaGroup][] = [
    ["01", t.groups.cassava],
    ["02", t.groups.sugarcane],
    ["03", t.groups.rice],
  ];

  return (
    <div className="interview-wrapper">
      <div className="section-kicker">
        <MessagesSquare size={13} />
        <span>{t.kicker}</span>
      </div>
      <h2 id="interview-heading" className="interview-heading">
        {t.heading}
      </h2>
      <p className="interview-subtitle">{t.subtitle}</p>

      <div className="interview-premise" role="note">
        <CircleAlert size={19} />
        <div>
          <strong>{t.premiseLabel}</strong>
          <p>{t.premise}</p>
        </div>
      </div>

      <div className="interview-benchmarks">
        <div className="benchmarks-label">
          <Landmark size={15} />
          <span>{t.benchmarksLabel}</span>
        </div>
        <div className="benchmark-grid">
          {t.benchmarks.map((b) => (
            <div className="benchmark-card" key={b.label}>
              <span className="benchmark-range">
                <Coins size={13} />
                {b.range}
              </span>
              <span className="benchmark-name">{b.label}</span>
              <small>{b.note}</small>
            </div>
          ))}
        </div>
      </div>

      {groups.map(([index, group]) => (
        <div className="interview-group" key={group.label}>
          <div className="ig-header">
            <span className="ig-index">{index}</span>
            <h3>{group.label}</h3>
            <p>{group.intro}</p>
          </div>
          <div className="qa-list">
            {group.items.map((item, itemIndex) => {
              const verdict = item.verdict as VerdictKey;
              return (
                <article className={`qa-card verdict-${verdict}`} key={itemIndex}>
                  <div className="qa-verdict">{t.verdictLabels[verdict]}</div>
                  <div className="qa-body">
                    <h4>{item.q}</h4>
                    <p className="qa-answer">{item.a}</p>
                    <ul>
                      {item.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="qa-source">
                      <small>{t.sourceTag}</small>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}

      <div className="interview-takeaway">
        <BadgeCheck size={19} />
        <div>
          <strong>{t.takeawayLabel}</strong>
          <p>{t.takeaway}</p>
        </div>
      </div>
    </div>
  );
}
