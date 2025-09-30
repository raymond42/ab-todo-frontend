import { SegmentedProgress } from "@/components/ui/progress";
import { Todo, useTodoStore } from "@/features/todos/store/todoStore";
import { SquareCheck, Paperclip, MessageSquare, Ellipsis } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import AddCardModal from "@/components/AddCardModal";

type Props = {
  todo: Todo;
};

export default function KanbanCard({ todo }: Props) {
  const { deleteTodo } = useTodoStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: { status: todo.status },
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  const totalCount = todo.checklist?.length || 0;
  const completedCount =
    todo.checklist?.filter((item) => item.done).length || 0;

  const handleView = () => {
    setViewMode(true);
    setModalOpen(true);
    setMenuOpen(false);
  };

  const handleEdit = () => {
    setViewMode(false);
    setModalOpen(true);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    setConfirmOpen(true);
    setMenuOpen(false);
  };

  const confirmDelete = () => {
    deleteTodo(todo.id);
    setConfirmOpen(false);
    toast.success("Todo deleted successfully");
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700 p-3 flex flex-col gap-2 hover:shadow transition relative"
      >
        {/* Ellipsis menu */}
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors outline-none border-none"
            >
              <Ellipsis
                size={18}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-36 bg-neutral-50 dark:bg-neutral-800 rounded-md shadow-md p-1 z-50 border border-gray-200 dark:border-neutral-700"
          >
            <DropdownMenuItem
              className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md outline-none border-none"
              onSelect={handleView}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm text-gray-500 font-semibold dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-md outline-none border-none"
              onSelect={handleEdit}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm text-red-500 cursor-pointer font-semibold hover:bg-red-100 dark:hover:bg-red-900 rounded-md outline-none border-none"
              onSelect={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Todo Info */}
        {todo.dueDate && (
          <span
            className="text-[11px] font-medium text-gray-400 dark:text-gray-500 w-full"
            {...listeners}
            {...attributes}
          >
            <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 border border-gray-200 dark:border-neutral-600 inline-block mr-1" />
            {new Date(todo.dueDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}

        <h3
          className="font-medium text-sm text-gray-800 dark:text-gray-100 leading-snug truncate max-w-[200px]"
          {...listeners}
          {...attributes}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p
            className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[250px]"
            {...listeners}
            {...attributes}
          >
            {todo.description}
          </p>
        )}

        {totalCount > 0 && (
          <div className="mt-1" {...listeners} {...attributes}>
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
          </div>
        )}

        <div
          className="flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 mt-2"
          {...listeners}
          {...attributes}
        >
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
            {todo.assignees?.map((a, idx) => (
              <img
                key={`${a.id}-${idx}`}
                src={a.avatar}
                alt="avatar"
                className="w-7 h-7 rounded-lg border border-gray-200 dark:border-neutral-700"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit/View Modal */}
      <AddCardModal
        variant={todo.status}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTodo={todo}
        viewMode={viewMode}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete A Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold italic">{todo.title}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
