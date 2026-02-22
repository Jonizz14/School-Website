import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(reg => console.log("✅ Service Worker"))
      .catch(err => console.error("❌ SW error:"));
  });
}

// Global error handling for external scripts
window.addEventListener('error', (event) => {
  console.warn('Global error caught:', event.error);
  
  // Handle specific appendChild errors from external scripts
  if (event.error && event.error.message && event.error.message.includes('appendChild')) {
    console.warn('External script appendChild error ignored');
    event.preventDefault();
    return;
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

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

