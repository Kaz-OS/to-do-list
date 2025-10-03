import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "./home";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    <button id="addTask">New Task</button>
  </StrictMode>
);
