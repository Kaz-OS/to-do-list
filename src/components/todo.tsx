import { useState } from "react";
import "../components/Styles/Card.css";
import type { Todo } from "./type";

type CardProps = {
  todo: Todo;
};

export default function Card({ todo }: CardProps) {
  const [checked, setChecked] = useState(todo.done);
  const [name, setName] = useState(todo.name);
  const [editing, setEditing] = useState(false);

  function toggleEdit() {
    if (editing) {
      // ici on pourrait appeler une API PATCH pour sauvegarder
    }
    setEditing((v) => !v);
  }

  return (
    <li className={`todo-item fade-in ${checked ? "done" : ""} ${editing ? "editing" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        aria-label="Marquer comme terminée"
      />
      <input
        type="text"
        value={name}
        readOnly={!editing}
        className={checked ? "name-strike" : undefined}
        onChange={(n) => setName(n.target.value)}
        aria-label="Nom de la tâche"
      />
      <div className="todo-actions">
        <button
          type="button"
          className={`icon-btn ${editing ? "success" : ""}`}
          onClick={toggleEdit}
          aria-label={editing ? "Valider la modification" : "Modifier la tâche"}
        >
          {editing ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a1 1 0 0 0-1 1v7" />
              <path d="M15.5 8.5L20 4l0 0a2.121 2.121 0 0 1 3 3L13 17l-4 1 1-4 5.5-5.5z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="icon-btn danger"
          onClick={() => alert("Suppression à implémenter")}
          aria-label="Supprimer la tâche"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}
