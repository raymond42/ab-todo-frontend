import KanbanColumn from "./KanbanColumn";
import { useEffect } from "react";
import { useTodoStore, Todo } from "@/features/todos/store/todoStore";
import { SquarePen, CircleDashed, Flame, ShieldCheck } from "lucide-react";

export default function KanbanBoard() {
  const { todos, loading, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const statuses: {
    key: Todo["status"];
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: "todo", label: "To-do", icon: <SquarePen size={16} /> },
    {
      key: "onprogress",
      label: "On Progress",
      icon: <CircleDashed size={16} />,
    },
    { key: "needsreview", label: "Needs Review", icon: <Flame size={16} /> },
    { key: "done", label: "Done", icon: <ShieldCheck size={16} /> },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statuses.map((col) => (
        <KanbanColumn
          key={col.key}
          title={col.label}
          todos={todos.filter((t) => t.status === col.key)}
          icon={col.icon}
          variant={col.key}
        />
      ))}
    </div>
  );
}
