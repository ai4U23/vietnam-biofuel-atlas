import type { ViteDevServer, Plugin } from "vite";
import { BIOFUEL_ATLAS_SYSTEM_PROMPT } from "../client/src/lib/chatKnowledge";

const DEFAULT_BASE_URL = "https://api.ai4u.now/v1";
const DEFAULT_MODEL = "claude-opus-4-9";
const PRIMARY_KEY = process.env.AI4U_API_KEY || "sk_gom_5GXwdwsldu4SD-PIXstuzkOaKQAGAbDLZvg8WAB1eW8";
const BACKUP_KEY = process.env.AI4U_BACKUP_API_KEY || "ai4U#Annie&Henry";

export function chatDevApiPlugin(): Plugin {
  return {
    name: "chat-dev-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/health" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              status: "ok",
              service: "vietnam-biofuel-atlas-dev",
              model: process.env.AI4U_MODEL || DEFAULT_MODEL,
              provider: "api.ai4u.now",
            })
          );
          return;
        }

        if (req.url === "/api/chat" && req.method === "POST") {
          let bodyStr = "";
          req.on("data", (chunk) => {
            bodyStr += chunk;
          });

          req.on("end", async () => {
            try {
              const body = bodyStr ? JSON.parse(bodyStr) : {};
              const { messages = [], language = "en", model = DEFAULT_MODEL } = body;

              if (!Array.isArray(messages) || messages.length === 0) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Missing or invalid 'messages' array" }));
                return;
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

              const doFetch = (apiKey: string) =>
                fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey.trim()}`,
                  },
                  body: JSON.stringify({
                    model: targetModel,
                    messages: sanitizedMessages,
                    stream: true,
                    temperature: 0.3,
                    max_tokens: 2048,
                  }),
                });

              let providerResponse = await doFetch(PRIMARY_KEY);

              if (!providerResponse.ok && (providerResponse.status === 401 || providerResponse.status === 403)) {
                console.warn(`Primary API key failed with ${providerResponse.status}. Retrying with backup key...`);
                providerResponse = await doFetch(BACKUP_KEY);
              }

              if (!providerResponse.ok) {
                const errText = await providerResponse.text();
                res.statusCode = providerResponse.status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: providerResponse.statusText, details: errText }));
                return;
              }

              if (!providerResponse.body) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Empty stream body from provider" }));
                return;
              }

              res.statusCode = 200;
              res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
              res.setHeader("Cache-Control", "no-cache, no-transform");
              res.setHeader("Connection", "keep-alive");
              res.setHeader("X-Accel-Buffering", "no");

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
                  const text = decoder.decode(value, { stream: true });
                  res.write(text);
                }
              }

              res.end();
            } catch (err: any) {
              console.error("Vite chat middleware error:", err);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: err.message || String(err) }));
              } else {
                res.end();
              }
            }
          });
          return;
        }

        next();
      });
    },
  };
}
