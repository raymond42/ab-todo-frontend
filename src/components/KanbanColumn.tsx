import KanbanCard from "@/features/todos/components/KanbanCard";
import { Todo } from "@/features/todos/store/todoStore";
import { Badge } from "@/components/ui/badge";
import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";

type Props = {
  title: string;
  todos: Todo[];
  icon: React.ReactNode;
  variant: "todo" | "onprogress" | "needsreview" | "done";
};

export default function KanbanColumn({ title, todos, icon, variant }: Props) {
  const { setNodeRef } = useDroppable({ id: variant });

  return (
    <div
      ref={setNodeRef}
      className="bg-white dark:bg-neutral-900 rounded-2xl p-4 flex flex-col gap-3 shadow-sm border border-gray-200 dark:border-gray-800"
    >
      <div className="flex justify-between items-center mb-1 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-1.5 bg-gray-50 dark:bg-neutral-900">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <PlusIcon className="inline h-5 w-5 text-gray-400" />
          {title}
        </h2>
        <Badge variant={variant} className="text-sm flex gap-1 items-center">
          <span>{icon}</span>
          <span>{todos.length}</span>
        </Badge>
      </div>

      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <KanbanCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
