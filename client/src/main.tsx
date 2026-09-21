import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import App from "./App";
import "./index.css";

// Register Service Worker for offline capability and fast caching
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Biofuel Atlas SW registered: ", reg.scope);
      })
      .catch(err => {
        console.warn("Biofuel Atlas SW registration failed: ", err);
      });

    // When a NEW service worker takes control of a page that was loaded by an
    // older one, the running code is stale until the next navigation. Prompt
    // instead of silently reloading — a forced reload can destroy in-flight
    // chat streams and calculator input. First-install claims are not updates
    // and must not prompt.
    let hadController = !!navigator.serviceWorker.controller;
    let updatePromptShown = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      if (updatePromptShown) return;
      updatePromptShown = true;
      toast("A new version of Biofuel Atlas is available.", {
        description: "Phiên bản mới đã sẵn sàng — làm mới trang để cập nhật.",
        duration: Infinity,
        action: {
          label: "Refresh",
          onClick: () => window.location.reload(),
        },
      });
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
