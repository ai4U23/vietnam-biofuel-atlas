/**
 * Pure block-level markdown splitter for the chat renderer.
 *
 * SPLITTING MUST ALWAYS TERMINATE. During streaming, lines arrive partially
 * (e.g. a table row whose trailing pipe has not arrived yet), so every branch
 * is required to consume at least one line per iteration. A line that starts
 * a known block but does not satisfy its full syntax (|---|--- missing the
 * closing pipe, #hashtag with no space) degrades to paragraph text instead
 * of stalling the loop.
 */

export type MarkdownBlock =
  | { type: "code"; language: string; code: string }
  | { type: "table"; lines: string[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "hr" }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "paragraph"; text: string };

export function splitMarkdownBlocks(content: string): MarkdownBlock[] {
  const lines = content.split("\n");
  const blocks: MarkdownBlock[] = [];

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Code block ```
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      continue;
    }

    // 2. Table (| Col 1 | Col 2 |). A run only renders as a table when every
    // line is closed with a trailing pipe; partial streaming rows fall back
    // to paragraph text so the loop always advances.
    if (trimmed.startsWith("|")) {
      const run: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        run.push(lines[i].trim());
        i++;
      }
      if (run.length >= 2 && run.every(l => l.endsWith("|"))) {
        blocks.push({ type: "table", lines: run });
      } else {
        blocks.push({ type: "paragraph", text: run.join(" ") });
      }
      continue;
    }

    // 3. Headings (#, ##, ###, ####)
    const h1Match = trimmed.match(/^#\s+(.+)$/);
    if (h1Match) {
      blocks.push({ type: "heading", level: 1, text: h1Match[1] });
      i++;
      continue;
    }

    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      blocks.push({ type: "heading", level: 2, text: h2Match[1] });
      i++;
      continue;
    }

    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      blocks.push({ type: "heading", level: 3, text: h3Match[1] });
      i++;
      continue;
    }

    const h4Match = trimmed.match(/^####\s+(.+)$/);
    if (h4Match) {
      blocks.push({ type: "heading", level: 4, text: h4Match[1] });
      i++;
      continue;
    }

    // 4. Horizontal rule (--- or ***)
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      blocks.push({ type: "hr" });
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
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // 6. Unordered List (*, -, +)
    if (/^(\*|-|\+)\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^(\*|-|\+)\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^(\*|-|\+)\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items: listItems });
      continue;
    }

    // 7. Ordered List (1., 2.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items: listItems });
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

    // A line that starts a known block prefix but matches no block syntax
    // (e.g. "#hashtag" without a space) would otherwise never be consumed.
    // Consume it as paragraph text so the loop always advances.
    if (pLines.length === 0) {
      pLines.push(line);
      i++;
    }

    blocks.push({ type: "paragraph", text: pLines.join(" ") });
  }

  return blocks;
}
