import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { handleChatRequest } from "./chatHandler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable JSON body parsing for API endpoints
  app.use(express.json({ limit: "2mb" }));

  // Chatbot streaming endpoint
  app.post("/api/chat", (req, res) => {
    handleChatRequest(req, res);
  });

  // Healthcheck endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "vietnam-biofuel-atlas",
      model: process.env.AI4U_MODEL || "claude-opus-4-9",
      provider: "api.ai4u.now",
      timestamp: new Date().toISOString(),
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for non-API routes
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) {
      res.status(404).json({ error: "Endpoint not found" });
      return;
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Vietnam Biofuel Atlas server running on http://localhost:${port}/`);
    console.log(`AI Chat endpoint active at http://localhost:${port}/api/chat`);
  });
}

startServer().catch(console.error);
