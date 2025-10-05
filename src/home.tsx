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

  return (
    <div>
      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nouvelle tâche" />
        <button type="submit">Ajouter</button>
      </form>
      <div className="card">
        {todos.map((item) => (
          <Card key={item.name} todo={item} />
        ))}
      </div>
    </div>
  );
}
