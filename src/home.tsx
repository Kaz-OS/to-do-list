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

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getData().then((result) => setTodos(result));
  }, []);

  return (
    <div>
      {todos.map((item) => (
        <Card todo={item} />
      ))}
    </div>
  );
}
