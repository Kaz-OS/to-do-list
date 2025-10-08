import { useEffect, useState } from "react";
import Card from "./components/todo";
import type { Todo } from "./components/type";

async function getData() {
  const url = "http://localhost:3000/todo";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return result as Todo[];
}

type NewTodo = { name: string; done?: boolean };

async function postData(data: NewTodo) {
  const url = "http://localhost:3000/todo";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`POST failed: ${response.status}`);
  }
  return (await response.json()) as Todo;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newName, setNewName] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    getData().then(setTodos).catch(console.error);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const created = await postData({ name: newName, done: false });
      setTodos((prev) => [...prev, created]); // ajoute sans recharger
      setNewName("");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <div className="app-root">
      <div className="app-container">
        <div className="panel fade-in">
          <div className="top-bar">
            <h1 style={{ margin: 0 }}>Tasks</h1>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Changer de thème">
              {theme === "light" ? (
                <>
                  <span role="img" aria-label="Sombre">
                    🌙
                  </span>{" "}
                  Dark
                </>
              ) : (
                <>
                  <span role="img" aria-label="Clair">
                    ☀️
                  </span>{" "}
                  Light
                </>
              )}
            </button>
          </div>
          <form className="todo-form" onSubmit={handleAdd}>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nouvelle tâche"
              aria-label="Nouvelle tâche"
            />
            <button type="submit" disabled={!newName.trim()}>
              + Ajouter
            </button>
          </form>
          <div className="divider" />
          <ul className="todo-list">
            {todos.length === 0 && <li className="empty-state">Aucune tâche pour l'instant.</li>}
            {todos.map((item) => (
              <Card key={item.name} todo={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
