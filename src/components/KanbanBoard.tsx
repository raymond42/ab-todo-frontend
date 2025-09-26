import KanbanColumn from "./KanbanColumn";
import { useEffect } from "react";
import { useTodoStore, Todo } from "@/features/todos/store/todoStore";
import { SquarePen, CircleDashed, Flame, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import KanbanDnDContext from "./KanbanDnDContext";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function KanbanBoard() {
  const { todos, loading, fetchTodos } = useTodoStore();
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statuses.map((col) => (
          <Skeleton key={col.key} className="h-[500px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <KanbanDnDContext statuses={statuses}>
      <Card className="border bg-gray-50/60 dark:bg-neutral-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statuses.map((col) => (
            <KanbanColumn
              key={col.key}
              title={t(col.label)}
              todos={todos.filter((t) => t.status === col.key)}
              icon={col.icon}
              variant={col.key}
            />
          ))}
        </CardContent>
      </Card>
    </KanbanDnDContext>
  );
}
