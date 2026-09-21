import React, { useState } from "react";
import ChatCitationPill from "./ChatCitationPill";
import { splitMarkdownBlocks, MarkdownBlock } from "./markdownBlocks";
import { ArrowDownRight, Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Parses inline formatting: bold, italic, inline code, internal/external links,
 * and citation tokens [01]..[12].
 */
function renderInlineFormatting(
  text: string,
  keyPrefix: string = ""
): React.ReactNode[] {
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
            onClick={e => {
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
    if (
      (part.startsWith("**") && part.endsWith("**")) ||
      (part.startsWith("__") && part.endsWith("__"))
    ) {
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
    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("_") && part.endsWith("_"))
    ) {
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
        <button
          type="button"
          onClick={handleCopy}
          className="chat-code-copy-btn"
        >
          {copied ? (
            <Check size={12} className="text-emerald-400" />
          ) : (
            <Copy size={12} />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderBlock(block: MarkdownBlock, blockKey: number): React.ReactNode {
  switch (block.type) {
    case "code":
      return (
        <CodeBlock
          key={`code-${blockKey}`}
          code={block.code}
          language={block.language}
        />
      );

    case "table": {
      const tableLines = block.lines;
      const headerCols = tableLines[0]
        .split("|")
        .map(c => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

      // Check if row 1 is separator line e.g. |---|---|
      const isSeparator = /^\|[\s-:]+(\|[\s-:]+)+\|$/.test(tableLines[1]);
      const bodyRows = isSeparator ? tableLines.slice(2) : tableLines.slice(1);

      return (
        <div key={`tbl-${blockKey}`} className="chat-table-wrapper">
          <table className="chat-table">
            <thead>
              <tr>
                {headerCols.map((col, cIdx) => (
                  <th key={`th-${cIdx}`}>
                    {renderInlineFormatting(col, `th-${cIdx}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rIdx) => {
                const cols = row
                  .split("|")
                  .map(c => c.trim())
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
    }

    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4";
      return (
        <Tag
          key={`h${block.level}-${blockKey}`}
          className={`chat-h${block.level}`}
        >
          {renderInlineFormatting(block.text, `h${block.level}-${blockKey}`)}
        </Tag>
      );
    }

    case "hr":
      return <hr key={`hr-${blockKey}`} className="chat-hr" />;

    case "blockquote":
      return (
        <blockquote key={`bq-${blockKey}`} className="chat-blockquote">
          {renderInlineFormatting(block.text, `bq-${blockKey}`)}
        </blockquote>
      );

    case "ul":
      return (
        <ul key={`ul-${blockKey}`} className="chat-ul">
          {block.items.map((item, lIdx) => (
            <li key={`li-${lIdx}`}>
              {renderInlineFormatting(item, `ul-${blockKey}-${lIdx}`)}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={`ol-${blockKey}`} className="chat-ol">
          {block.items.map((item, lIdx) => (
            <li key={`oli-${lIdx}`}>
              {renderInlineFormatting(item, `ol-${blockKey}-${lIdx}`)}
            </li>
          ))}
        </ol>
      );

    case "paragraph":
      return (
        <p key={`p-${blockKey}`} className="chat-p">
          {renderInlineFormatting(block.text, `p-${blockKey}`)}
        </p>
      );
  }
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const blocks = splitMarkdownBlocks(content);

  return <div className="chat-markdown-root">{blocks.map(renderBlock)}</div>;
}
