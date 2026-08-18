import type { Request, Response } from "express";
import { BIOFUEL_ATLAS_SYSTEM_PROMPT } from "../client/src/lib/chatKnowledge";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatRequestBody {
  messages: ChatMessage[];
  language?: "en" | "vi";
  model?: string;
}

const DEFAULT_BASE_URL = "https://api.ai4u.now/v1";
const DEFAULT_MODEL = "claude-opus-4-9";
const PRIMARY_KEY = process.env.AI4U_API_KEY || "sk_gom_5GXwdwsldu4SD-PIXstuzkOaKQAGAbDLZvg8WAB1eW8";
const BACKUP_KEY = process.env.AI4U_BACKUP_API_KEY || "ai4U#Annie&Henry";

async function fetchFromProvider(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: ChatMessage[],
  stream: boolean = true
): Promise<globalThis.Response> {
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
  
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey.trim()}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream,
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });
}

export async function handleChatRequest(req: Request, res: Response): Promise<void> {
  try {
    const { messages = [], language = "en", model = DEFAULT_MODEL } = (req.body || {}) as ChatRequestBody;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Missing or invalid 'messages' array" });
      return;
    }

    const baseUrl = process.env.AI4U_API_BASE_URL || DEFAULT_BASE_URL;
    const targetModel = process.env.AI4U_MODEL || model || DEFAULT_MODEL;

    // Compose system prompt with language instruction
    const langInstruction =
      language === "vi"
        ? "\n\nCRITICAL LANGUAGE INSTRUCTION: The user prefers Vietnamese (Tiếng Việt). Please respond in clear, professional Vietnamese with standard technical terms and citation brackets like [01], [02]."
        : "\n\nCRITICAL LANGUAGE INSTRUCTION: The user prefers English. Please respond in clear, professional English with citation brackets like [01], [02].";

    const fullSystemPrompt = BIOFUEL_ATLAS_SYSTEM_PROMPT + langInstruction;

    // Filter and sanitize messages, prepending system prompt
    const sanitizedMessages: ChatMessage[] = [
      { role: "system", content: fullSystemPrompt },
      ...messages
        .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
        .map((m) => ({
          role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
          content: m.content.trim(),
        })),
    ];

    // Try primary key first
    let providerResponse = await fetchFromProvider(baseUrl, PRIMARY_KEY, targetModel, sanitizedMessages, true);

    // If authentication fails, seamlessly retry with backup key
    if (!providerResponse.ok && (providerResponse.status === 401 || providerResponse.status === 403)) {
      console.warn(`Primary API key failed with status ${providerResponse.status}. Retrying with backup key...`);
      providerResponse = await fetchFromProvider(baseUrl, BACKUP_KEY, targetModel, sanitizedMessages, true);
    }

    if (!providerResponse.ok) {
      const errorText = await providerResponse.text();
      console.error(`Provider error [${providerResponse.status}]:`, errorText);
      res.status(providerResponse.status).json({
        error: `LLM Provider error: ${providerResponse.statusText}`,
        details: errorText,
      });
      return;
    }

    if (!providerResponse.body) {
      res.status(500).json({ error: "Provider returned empty response stream" });
      return;
    }

    // Set Server-Sent Events headers
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    const reader = providerResponse.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let isClosed = false;
    req.on("close", () => {
      isClosed = true;
      try {
        reader.cancel();
      } catch {
        // ignore
      }
    });

    while (!isClosed) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }
    }

    res.end();
  } catch (error: any) {
    console.error("Chat handler exception:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error while processing chat completion",
        message: error?.message || String(error),
      });
    } else {
      res.end();
    }
  }
}
