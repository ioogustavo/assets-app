import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AssetApp } from "./AssetApp.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <AssetApp />
   </StrictMode>
);
