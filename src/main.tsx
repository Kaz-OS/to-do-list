import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Card from "./components/todo";
import type { Todo } from "./components/type";
import "./index.css";

const todos: Todo[] = [
  { name: "Master React", done: false },
  { name: "Be the GOAT", done: false },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {todos.map((item) => (
      <Card todo={item} />
    ))}
  </StrictMode>
);
