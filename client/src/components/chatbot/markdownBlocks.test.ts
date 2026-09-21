import { describe, it, expect } from "vitest";
import { splitMarkdownBlocks } from "./markdownBlocks";

/**
 * Regression tests for the chat markdown block splitter.
 *
 * The renderer runs on EVERY streaming token, so the splitter must terminate
 * on partial lines. Before the fix, a line starting with "|" but not yet
 * ending with "|" (a table row mid-stream) or a separator missing its
 * trailing pipe ("|---|---") stalled the block loop forever and froze the
 * whole page at 100% CPU.
 */
describe("splitMarkdownBlocks — termination safety (crash regression)", () => {
  it("terminates on a partial streaming table row and degrades it to paragraph text", () => {
    const blocks = splitMarkdownBlocks(
      "Here is the data:\n\n| PDP8 Target | 1,227 MW by 2030 "
    );
    expect(blocks).toHaveLength(2);
    expect(blocks[0].type).toBe("paragraph");
    expect(blocks[1].type).toBe("paragraph");
    expect(blocks[1].text).toContain("1,227 MW");
  });

  it("terminates on a bare pipe (start of a streamed table)", () => {
    const blocks = splitMarkdownBlocks("Answer:\n\n|");
    expect(blocks[blocks.length - 1].type).toBe("paragraph");
  });

  it("terminates on a separator line missing its trailing pipe", () => {
    const blocks = splitMarkdownBlocks("| A | B |\n|---|---\n| 1 | 2 |");
    // The run is not fully closed, so it degrades to paragraph text instead
    // of freezing — and no line is silently dropped.
    blocks.forEach(b => expect(b.type).toBe("paragraph"));
    const joined = blocks
      .map(b => (b.type === "paragraph" ? b.text : ""))
      .join(" ");
    expect(joined).toContain("1 | 2");
  });

  it("terminates on '#hashtag' without a space after the hash", () => {
    const blocks = splitMarkdownBlocks("intro\n#hashtag\nmore text");
    expect(blocks).toHaveLength(3);
    blocks.forEach(b => expect(b.type).toBe("paragraph"));
    expect(blocks[1].text).toBe("#hashtag");
  });

  it("terminates on a deep heading (#####) that matches no heading level", () => {
    const blocks = splitMarkdownBlocks("##### deep heading");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe("paragraph");
  });

  it("terminates on a lone single-column table line instead of dropping it", () => {
    const blocks = splitMarkdownBlocks("| only cell |");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe("paragraph");
    expect(blocks[0].text).toBe("| only cell |");
  });
});

describe("splitMarkdownBlocks — streaming a table row by row", () => {
  const growingTable = [
    "PDP8 targets:",
    "|",
    "| Target |",
    "| Target | 2030 |",
    "| Target | 2030 | 2050 |",
    "| Target | 2030 | 2050 |\n|---|---|---|",
    "| Target | 2030 | 2050 |\n|---|---|---|\n| Biomass | 1,227 MW | 4,000 MW |",
  ];

  it("terminates at every streaming prefix and becomes a table once complete", () => {
    growingTable.forEach(content => {
      const blocks = splitMarkdownBlocks(content);
      expect(blocks.length).toBeGreaterThan(0);
      const last = blocks[blocks.length - 1];
      expect(["paragraph", "table"]).toContain(last.type);
    });

    const final = splitMarkdownBlocks(growingTable[growingTable.length - 1]);
    const table = final.find(b => b.type === "table");
    expect(table).toBeDefined();
    expect(table!.lines).toHaveLength(3);
  });
});

describe("splitMarkdownBlocks — established block parsing is preserved", () => {
  it("parses headings, lists, code, quotes, rules and paragraphs", () => {
    const content = [
      "### E10 Mandate [09]",
      "",
      "| Metric | Value |",
      "|---|---|",
      "| Demand | 243M gal |",
      "",
      "* Enacted under **Circular 50** [09].",
      "1. First step",
      "> Soil note [01]",
      "```js",
      "const x = 1;",
      "```",
      "---",
      "Plain paragraph with [01] citation.",
    ].join("\n");

    const blocks = splitMarkdownBlocks(content);
    const types = blocks.map(b => b.type);

    expect(types).toEqual([
      "heading",
      "table",
      "ul",
      "ol",
      "blockquote",
      "code",
      "hr",
      "paragraph",
    ]);

    const heading = blocks[0];
    expect(heading).toEqual({
      type: "heading",
      level: 3,
      text: "E10 Mandate [09]",
    });

    const table = blocks[1];
    expect(table.type === "table" && table.lines).toEqual([
      "| Metric | Value |",
      "|---|---|",
      "| Demand | 243M gal |",
    ]);

    const ul = blocks[2];
    expect(ul.type === "ul" && ul.items).toEqual([
      "Enacted under **Circular 50** [09].",
    ]);

    const ol = blocks[3];
    expect(ol.type === "ol" && ol.items).toEqual(["First step"]);

    const bq = blocks[4];
    expect(bq).toEqual({ type: "blockquote", text: "Soil note [01]" });

    const code = blocks[5];
    expect(code).toEqual({
      type: "code",
      language: "js",
      code: "const x = 1;",
    });

    const p = blocks[7];
    expect(p.type === "paragraph" && p.text).toBe(
      "Plain paragraph with [01] citation."
    );
  });

  it("keeps consecutive paragraph lines joined with spaces", () => {
    const blocks = splitMarkdownBlocks("first line\nsecond line");
    expect(blocks).toEqual([
      { type: "paragraph", text: "first line second line" },
    ]);
  });

  it("treats an unterminated code fence as consuming the remainder", () => {
    const blocks = splitMarkdownBlocks("```js\nconst x = 1;");
    expect(blocks).toEqual([
      { type: "code", language: "js", code: "const x = 1;" },
    ]);
  });
});
