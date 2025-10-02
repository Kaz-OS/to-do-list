import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Card from "./components/todo";
import type { Todo } from "./components/type";
import "./index.css";

const todos: Todo[] = [
  { name: "Master React", done: false },
  { name: "Be the GOAT", done: false },
];

async function getData() {
  const url = "http://localhost:3000/todo";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {todos.map((item) => (
      <Card todo={item} />
    ))}
    <button id="addTask">New Task</button>
  </StrictMode>
);
