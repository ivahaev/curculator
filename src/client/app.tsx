import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppContextProvider } from "./AppContext";
import Calculator from "./calculator/Calculator";
import { makeApp } from "../app";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app element not found");
}

const app = makeApp();

const root = createRoot(container);
root.render(
  <AppContextProvider app={app}>
    <Calculator />
  </AppContextProvider>
);
