import React, { useState } from "react";
import type { Todo } from "../features/todos/types";
import { useTodosStore } from "../features/todos/store/useTodosStore";

export default function TaskModal({
  todo,
  onClose,
}: {
  todo: Todo | null;
  onClose: () => void;
}) {
  const updateTodo = useTodosStore((s) => s.updateTodo);
  const [title, setTitle] = useState(todo?.title ?? "");
  const [desc, setDesc] = useState(todo?.description ?? "");

  if (!todo) return null;

  function save() {
    if (!todo) return;
    updateTodo(todo.id, { title, description: desc });
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded p-4 z-10 w-full max-w-lg">
        <h3 className="font-semibold mb-2">Edit Task</h3>
        <input
          className="w-full border p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-2"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
