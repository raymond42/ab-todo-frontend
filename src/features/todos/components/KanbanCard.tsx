import { SegmentedProgress } from "@/components/ui/progress";
import { Todo } from "@/features/todos/store/todoStore";
import { SquareCheck, Paperclip, MessageSquare } from "lucide-react";

type Props = {
  todo: Todo;
};

export default function KanbanCard({ todo }: Props) {
  const totalCount = todo.checklist?.length || 0;
  const completedCount =
    todo.checklist?.filter((item) => item.done).length || 0;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700 p-3 flex flex-col gap-2 hover:shadow transition">
      {todo.dueDate && (
        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
          <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 border border-gray-200 dark:border-neutral-600 inline-block mr-1 justify-center" />
          {new Date(todo.dueDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      )}

      <h3 className="font-medium text-sm text-gray-800 dark:text-gray-100 leading-snug line-clamp-2">
        {todo.title}
      </h3>

      {todo.description && (
        <p className="text-[11px] text-gray-500 dark:text-gray-400">
          {todo.description}
        </p>
      )}

      <div className="border-b border-gray-200 dark:border-neutral-700 my-2" />

      {totalCount > 0 && (
        <div className="mt-1">
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mb-1">
            <div className="flex items-center gap-2">
              <SquareCheck
                size={16}
                className="text-gray-400 dark:text-gray-500"
              />
              <span className="text-[12px]">Checklist</span>
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {completedCount}/{totalCount}
            </span>
          </div>

          <SegmentedProgress
            total={totalCount}
            completed={completedCount}
            className="w-full"
          />

          <div className="border-b border-gray-200 dark:border-neutral-700 my-2 pt-2" />
        </div>
      )}

      <div className="flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border-2 border-gray-200 dark:border-neutral-700 p-1 rounded-md">
            <MessageSquare size={12} />
            <span>{todo.comments || 0}</span>
          </div>

          <div className="flex items-center gap-1 border-2 border-gray-200 dark:border-neutral-700 p-1 rounded-md">
            <Paperclip size={12} />
            <span>{todo.attachments || 0}</span>
          </div>
        </div>

        <div className="flex -space-x-3">
          {todo.assignees?.map((a) => (
            <img
              key={a.id}
              src={a.avatar}
              alt="avatar"
              className="w-7 h-7 rounded-lg border border-gray-200 dark:border-neutral-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
