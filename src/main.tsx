import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Asset } from "./Asset.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Asset />
   </StrictMode>
);
