import { BIOFUEL_ATLAS_SYSTEM_PROMPT } from "../client/src/lib/chatKnowledge";

export const config = {
  runtime: "edge",
};

const DEFAULT_BASE_URL = "https://api.ai4u.now/v1";
const DEFAULT_MODEL = "claude-opus-4-9";
const PRIMARY_KEY = process.env.AI4U_API_KEY || "sk_gom_5GXwdwsldu4SD-PIXstuzkOaKQAGAbDLZvg8WAB1eW8";
const BACKUP_KEY = process.env.AI4U_BACKUP_API_KEY || "ai4U#Annie&Henry";

async function fetchFromProvider(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: any[]
): Promise<Response> {
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
      stream: true,
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { messages = [], language = "en", model = DEFAULT_MODEL } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Missing or invalid 'messages' array" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const baseUrl = process.env.AI4U_API_BASE_URL || DEFAULT_BASE_URL;
    const targetModel = process.env.AI4U_MODEL || model || DEFAULT_MODEL;

    const langInstruction =
      language === "vi"
        ? "\n\nCRITICAL LANGUAGE INSTRUCTION: The user prefers Vietnamese (Tiếng Việt). Please respond in clear, professional Vietnamese with standard technical terms and citation brackets like [01], [02]."
        : "\n\nCRITICAL LANGUAGE INSTRUCTION: The user prefers English. Please respond in clear, professional English with citation brackets like [01], [02].";

    const fullSystemPrompt = BIOFUEL_ATLAS_SYSTEM_PROMPT + langInstruction;

    const sanitizedMessages = [
      { role: "system", content: fullSystemPrompt },
      ...messages
        .filter((m: any) => m && typeof m.content === "string" && m.content.trim().length > 0)
        .map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content.trim(),
        })),
    ];

    let providerResponse = await fetchFromProvider(baseUrl, PRIMARY_KEY, targetModel, sanitizedMessages);

    if (!providerResponse.ok && (providerResponse.status === 401 || providerResponse.status === 403)) {
      console.warn(`Primary API key failed with status ${providerResponse.status}. Retrying with backup key...`);
      providerResponse = await fetchFromProvider(baseUrl, BACKUP_KEY, targetModel, sanitizedMessages);
    }

    if (!providerResponse.ok) {
      const errText = await providerResponse.text();
      return new Response(JSON.stringify({ error: `Provider error: ${providerResponse.statusText}`, details: errText }), {
        status: providerResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(providerResponse.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error?.message || String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
