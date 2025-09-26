import { useState } from "react";
import KanbanCard from "@/features/todos/components/KanbanCard";
import { Todo } from "@/features/todos/store/todoStore";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddCardModal from "./AddCardModal";
import { PlusIcon } from "lucide-react";

type Props = {
  title: string;
  todos: Todo[];
  icon: React.ReactNode;
  variant: "todo" | "onprogress" | "needsreview" | "done";
  loading?: boolean;
};

export default function KanbanColumn({
  title,
  todos,
  icon,
  variant,
  loading = false,
}: Props) {
  const { setNodeRef } = useDroppable({ id: variant });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      ref={setNodeRef}
      className="dark:bg-neutral-900 p-2 flex flex-col gap-3 dark:border-gray-800"
    >
      {/* Column header */}
      <div className="flex justify-between items-center mb-1 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-1.5 bg-gray-50 dark:bg-neutral-900">
        {/* Title + Plus button */}
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
          {title}
        </h2>

        {/* Count badge */}
        <Badge variant={variant} className="text-sm flex gap-1 items-center">
          <span>{icon}</span>
          <span>{todos.length}</span>
        </Badge>
      </div>

      {/* Cards or Skeletons */}
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {loading
            ? Array.from({ length: 2 }).map((_, idx) => (
                <Skeleton key={idx} className="h-20 w-full rounded-lg" />
              ))
            : todos.map((todo) => <KanbanCard key={todo.id} todo={todo} />)}
        </div>
      </SortableContext>

      {/* Modal for creating task */}
      <AddCardModal
        variant={variant}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
