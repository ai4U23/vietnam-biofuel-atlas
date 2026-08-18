import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { chatDevApiPlugin } from "./server/devMiddleware";

export default defineConfig(({ mode }) => {
  // Load environment variables (.env, .env.local)
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    plugins: [react(), tailwindcss(), chatDevApiPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("wouter")) {
                return "vendor-react";
              }
              if (id.includes("lucide-react")) {
                return "vendor-icons";
              }
              if (id.includes("@radix-ui")) {
                return "vendor-radix";
              }
              return "vendor";
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
    },
  };
});
