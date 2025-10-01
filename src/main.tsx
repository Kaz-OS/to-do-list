import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Card from "./components/todo";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Card />
  </StrictMode>
);
