import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register Service Worker for offline capability and fast caching
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Biofuel Atlas SW registered: ", reg.scope);
      })
      .catch((err) => {
        console.warn("Biofuel Atlas SW registration failed: ", err);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);

