import KanbanColumn from "./KanbanColumn";
import { useEffect } from "react";
import { useTodoStore, Todo } from "@/features/todos/store/todoStore";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SquarePen, CircleDashed, Flame, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function KanbanBoard() {
  const { todos, loading, fetchTodos, updateTodoStatus } = useTodoStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const statuses: {
    key: Todo["status"];
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "todo", label: "todoLabel", icon: <SquarePen size={16} /> },
    {
      key: "onprogress",
      label: "onProgressLabel",
      icon: <CircleDashed size={16} />,
    },
    {
      key: "needsreview",
      label: "needsReviewLabel",
      icon: <Flame size={16} />,
    },
    { key: "done", label: "doneLabel", icon: <ShieldCheck size={16} /> },
  ];

  if (loading) return <p>Loading...</p>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const newStatus = over.id as Todo["status"];
    const todoId = active.id as string;

    if (newStatus) {
      updateTodoStatus(todoId, newStatus); // ✅ update store
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
}
