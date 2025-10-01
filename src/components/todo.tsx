import { useState } from "react";
import "../components/Styles/Card.css";
import type { Todo } from "./type";

export default function Card() {
  const todo: Todo = {
    name: "",
    done: false,
  };

  const [checked, setChecked] = useState(todo.done);
  const [name, setName] = useState(todo.name);

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <input type="text" value={name} onChange={(n) => setName(n.target.value)} />
    </div>
  );
}
