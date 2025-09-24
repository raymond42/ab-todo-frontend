import {
  DndContext,
  DragOverlay,
  closestCorners,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanCard from "@/features/todos/components/KanbanCard";
import { Todo, useTodoStore } from "@/features/todos/store/todoStore";

interface Props {
  children: React.ReactNode;
  statuses: { key: Todo["status"]; label: string; icon: React.ReactNode }[];
}

export default function KanbanDnDContext({ children, statuses }: Props) {
  const { todos, updateTodoStatus, reorderTodos } = useTodoStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTodo = activeId ? todos.find((t) => t.id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeTodo = todos.find((t) => t.id === activeId);
    if (!activeTodo) return;

    if (statuses.some((s) => s.key === overId)) {
      updateTodoStatus(activeId, overId as Todo["status"]);
      return;
    }

    const overTodo = todos.find((t) => t.id === overId);
    if (!overTodo) return;

    const oldStatus = activeTodo.status;
    const newStatus = overTodo.status;

    const activeColTodos = todos.filter((t) => t.status === oldStatus);
    const overColTodos = todos.filter((t) => t.status === newStatus);

    const oldIndex = activeColTodos.findIndex((t) => t.id === activeId);
    const newIndex = overColTodos.findIndex((t) => t.id === overId);

    if (oldStatus === newStatus) {
      const reordered = arrayMove(activeColTodos, oldIndex, newIndex);
      reorderTodos(oldStatus, reordered);
    } else {
      updateTodoStatus(activeId, newStatus, newIndex);
    }

    setActiveId(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      {children}

      {createPortal(
        <DragOverlay>
          {activeTodo ? <KanbanCard todo={activeTodo} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
