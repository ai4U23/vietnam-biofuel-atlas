import React, { useState } from "react";
import ChatCitationPill from "./ChatCitationPill";
import { ArrowDownRight, Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Parses inline formatting: bold, italic, inline code, internal/external links,
 * and citation tokens [01]..[12].
 */
function renderInlineFormatting(text: string, keyPrefix: string = ""): React.ReactNode[] {
  if (!text) return [];

  // Match citation tokens [01] to [12], links [text](url), bold **text**, italic *text*, inline code `code`
  // We can tokenize with regex
  const tokenRegex =
    /(\[\d{1,2}\]|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g;

  const parts = text.split(tokenRegex);
  const elements: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    if (!part) return;
    const key = `${keyPrefix}-${index}`;

    // 1. Citation token [01]..[12]
    const citeMatch = part.match(/^\[(\d{1,2})\]$/);
    if (citeMatch) {
      const num = parseInt(citeMatch[1], 10);
      if (num >= 1 && num <= 12) {
        elements.push(<ChatCitationPill key={key} index={num} />);
        return;
      }
    }

    // 2. Link [label](target)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const target = linkMatch[2];
      const isAnchor = target.startsWith("#");

      if (isAnchor) {
        elements.push(
          <a
            key={key}
            href={target}
            onClick={(e) => {
              e.preventDefault();
              const elem = document.querySelector(target);
              if (elem) {
                elem.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="chat-internal-link"
          >
            {label}
            <ArrowDownRight size={11} className="inline-block ml-0.5" />
          </a>
        );
      } else {
        elements.push(
          <a
            key={key}
            href={target}
            target="_blank"
            rel="noreferrer"
            className="chat-external-link"
          >
            {label}
          </a>
        );
      }
      return;
    }

    // 3. Bold **text** or __text__
    if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
      const inner = part.slice(2, -2);
      elements.push(
        <strong key={key} className="text-[#fff9ed] font-bold">
          {renderInlineFormatting(inner, `${key}-b`)}
        </strong>
      );
      return;
    }

    // 4. Inline code `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      const inner = part.slice(1, -1);
      elements.push(
        <code key={key} className="chat-inline-code">
          {inner}
        </code>
      );
      return;
    }

    // 5. Italic *text* or _text_
    if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
      const inner = part.slice(1, -1);
      elements.push(
        <em key={key} className="italic text-[#d1d9e2]">
          {renderInlineFormatting(inner, `${key}-i`)}
        </em>
      );
      return;
    }

    // Regular text fallback
    elements.push(part);
  });

  return elements;
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="chat-code-block">
      <div className="chat-code-header">
        <span className="chat-code-lang">{language || "code"}</span>
        <button type="button" onClick={handleCopy} className="chat-code-copy-btn">
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];

  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Code Block ```
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      nodes.push(
        <CodeBlock
          key={`code-${blockKey++}`}
          code={codeLines.join("\n")}
          language={language}
        />
      );
      continue;
    }

    // 2. Table (| Col 1 | Col 2 |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCols = tableLines[0]
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        // Check if row 1 is separator line e.g. |---|---|
        const isSeparator = /^\|[\s-:]+(\|[\s-:]+)+\|$/.test(tableLines[1]);
        const bodyRows = isSeparator ? tableLines.slice(2) : tableLines.slice(1);

        nodes.push(
          <div key={`tbl-${blockKey++}`} className="chat-table-wrapper">
            <table className="chat-table">
              <thead>
                <tr>
                  {headerCols.map((col, cIdx) => (
                    <th key={`th-${cIdx}`}>{renderInlineFormatting(col, `th-${cIdx}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => {
                  const cols = row
                    .split("|")
                    .map((c) => c.trim())
                    .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
                  return (
                    <tr key={`tr-${rIdx}`}>
                      {cols.map((col, cIdx) => (
                        <td key={`td-${rIdx}-${cIdx}`}>
                          {renderInlineFormatting(col, `td-${rIdx}-${cIdx}`)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 3. Headings (#, ##, ###, ####)
    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match) {
      nodes.push(
        <h1 key={`h1-${blockKey++}`} className="chat-h1">
          {renderInlineFormatting(h1Match[1], `h1-${blockKey}`)}
        </h1>
      );
      i++;
      continue;
    }

    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      nodes.push(
        <h2 key={`h2-${blockKey++}`} className="chat-h2">
          {renderInlineFormatting(h2Match[1], `h2-${blockKey}`)}
        </h2>
      );
      i++;
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      nodes.push(
        <h3 key={`h3-${blockKey++}`} className="chat-h3">
          {renderInlineFormatting(h3Match[1], `h3-${blockKey}`)}
        </h3>
      );
      i++;
      continue;
    }

    const h4Match = line.match(/^####\s+(.+)$/);
    if (h4Match) {
      nodes.push(
        <h4 key={`h4-${blockKey++}`} className="chat-h4">
          {renderInlineFormatting(h4Match[1], `h4-${blockKey}`)}
        </h4>
      );
      i++;
      continue;
    }

    // 4. Horizontal rule (--- or ***)
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      nodes.push(<hr key={`hr-${blockKey++}`} className="chat-hr" />);
      i++;
      continue;
    }

    // 5. Blockquote (> Quote)
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      nodes.push(
        <blockquote key={`bq-${blockKey++}`} className="chat-blockquote">
          {renderInlineFormatting(quoteLines.join(" "), `bq-${blockKey}`)}
        </blockquote>
      );
      continue;
    }

    // 6. Unordered List (*, -, +)
    if (/^(\*|-|\+)\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^(\*|-|\+)\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^(\*|-|\+)\s+/, ""));
        i++;
      }
      nodes.push(
        <ul key={`ul-${blockKey++}`} className="chat-ul">
          {listItems.map((item, lIdx) => (
            <li key={`li-${lIdx}`}>{renderInlineFormatting(item, `ul-${blockKey}-${lIdx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Ordered List (1., 2.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      nodes.push(
        <ol key={`ol-${blockKey++}`} className="chat-ol">
          {listItems.map((item, lIdx) => (
            <li key={`oli-${lIdx}`}>{renderInlineFormatting(item, `ol-${blockKey}-${lIdx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Paragraph (combining consecutive text lines)
    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("|") &&
      !/^(\*|-|\+)\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^(\*\*\*|---|___)$/.test(lines[i].trim())
    ) {
      pLines.push(lines[i]);
      i++;
    }

    if (pLines.length > 0) {
      nodes.push(
        <p key={`p-${blockKey++}`} className="chat-p">
          {renderInlineFormatting(pLines.join(" "), `p-${blockKey}`)}
        </p>
      );
    }
  }

  return <div className="chat-markdown-root">{nodes}</div>;
}
