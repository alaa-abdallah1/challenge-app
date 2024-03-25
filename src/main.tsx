import React from "react";
import App from "./App.js";
import "./assets/styles/index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, NotificationProvider } from "@/contexts";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <div className="relative min-w-[300px] max-w-7xl mx-auto min-h-screen">
          <NotificationProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </NotificationProvider>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}
