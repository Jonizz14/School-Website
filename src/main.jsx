import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => console.log("✅ Service Worker:", reg.scope))
      .catch(err => console.error("❌ SW error:", err));
  });
}

const canHover = window.matchMedia('(hover: hover)').matches;

if (canHover) {
  console.log("🖱️ Kompyuter: hover ishlaydi");
  document.body.classList.add("hover-enabled");
  document.body.classList.remove("hover-disabled");
} else {
  console.log("📱 Mobil: hover o‘chirilgan");
  document.body.classList.add("hover-disabled");
  document.body.classList.remove("hover-enabled");
}

