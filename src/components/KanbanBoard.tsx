import KanbanColumn from "./KanbanColumn";
import { useEffect, useState } from "react";
import { useTodoStore, Todo } from "@/features/todos/store/todoStore";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import { SquarePen, CircleDashed, Flame, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import KanbanCard from "@/features/todos/components/KanbanCard";

export default function KanbanBoard() {
  const { todos, loading, fetchTodos, updateTodoStatus, reorderTodos } =
    useTodoStore();
  const { t } = useTranslation();

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const activeTodo = activeId ? todos.find((t) => t.id === activeId) : null;

  const statuses: {
    key: Todo["status"];
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "todo", label: "todoLabel", icon: <SquarePen size={16} /> },
    {
      key: "onprogress",
      label: "inProgressLabel",
      icon: <CircleDashed size={16} />,
    },
    {
      key: "needsreview",
      label: "needsReviewLabel",
      icon: <Flame size={16} />,
    },
    { key: "done", label: "doneLabel", icon: <ShieldCheck size={16} /> },
  ];

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
  };

  if (loading) return <p>Loading...</p>;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statuses.map((col) => (
          <KanbanColumn
            key={col.key}
            title={t(col.label)}
            todos={todos.filter((t) => t.status === col.key)}
            icon={col.icon}
            variant={col.key}
          />
        ))}
      </div>
      {createPortal(
        <DragOverlay>
          {activeTodo ? <KanbanCard todo={activeTodo} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
