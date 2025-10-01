import { useState } from "react";
import "../components/Styles/Card.css";
import type { Todo } from "./type";

type CardProps = {
  todo: Todo;
};

export default function Card(props: CardProps) {
  const [checked, setChecked] = useState(props.todo.done);
  const [name, setName] = useState(props.todo.name);

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <input type="text" value={name} onChange={(n) => setName(n.target.value)} />
    </div>
  );
}
