import { create } from "zustand";
import { nanoid } from "nanoid";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "onprogress" | "needsreview" | "done";
  checklist?: { id: string; text: string; done: boolean }[];
  dueDate?: string;
  comments: number;
  attachments: string[];
  assignees?: { id: string; avatar: string }[];
  links?: { id: string; url: string }[];
};

export type NewTodo = Omit<Todo, "id" | "comments" | "attachments">;

interface TodoState {
  todos: Todo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
  updateTodoStatus: (
    id: string,
    newStatus: Todo["status"],
    targetIndex?: number
  ) => void;
  reorderTodos: (status: Todo["status"], reordered: Todo[]) => void;
  addTodo: (todo: NewTodo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const API_URL = import.meta.env.VITE_API_URL as string;
      if (!API_URL) throw new Error("API_URL is not defined");

      const res = await fetch(API_URL);
      const data = await res.json();

      const statusCycle: Todo["status"][] = [
        "todo",
        "onprogress",
        "needsreview",
      ];

      const mappedTodos: Todo[] = data.todos.map((t: any, index: number) => {
        const status: Todo["status"] = t.completed
          ? "done"
          : statusCycle[index % statusCycle.length];

        const checklist: Todo["checklist"] | undefined =
          t.id === 1
            ? [
                { id: "c1", text: "Prepare notes", done: false },
                { id: "c2", text: "Review content", done: true },
                { id: "c3", text: "Send summary", done: false },
              ]
            : t.id === 2
            ? [
                { id: "c4", text: "Setup backend", done: false },
                { id: "c5", text: "Test API", done: false },
              ]
            : undefined;

        return {
          id: t.id.toString(),
          title: t.todo,
          status,
          description: `User ID: ${t.userId}`,
          checklist,
          dueDate: formatDate("2025-12-31T00:00:00.000Z"),
          comments: 0,
          attachments: 2,
          assignees: [
            { id: "u1", avatar: "https://i.pravatar.cc/32?img=1" },
            { id: "u2", avatar: "https://i.pravatar.cc/32?img=2" },
            { id: "u3", avatar: "https://i.pravatar.cc/32?img=3" },
          ],
          links: [
            { id: "l1", url: "https://example.com/docs" },
            { id: "l2", url: "https://example.com/design" },
          ],
        };
      });

      set({ todos: mappedTodos, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  updateTodoStatus: (id, newStatus, targetIndex) =>
    set((state) => {
      const todo = state.todos.find((t) => t.id === id);
      if (!todo) return state;

      const others = state.todos.filter((t) => t.id !== id);
      const updated = { ...todo, status: newStatus };

      const sameCol = others.filter((t) => t.status === newStatus);

      if (targetIndex !== undefined) sameCol.splice(targetIndex, 0, updated);
      else sameCol.push(updated);

      const rest = others.filter((t) => t.status !== newStatus);
      return { todos: [...rest, ...sameCol] };
    }),

  reorderTodos: (status, reordered) =>
    set((state) => {
      const others = state.todos.filter((t) => t.status !== status);
      return { todos: [...others, ...reordered] };
    }),

  addTodo: (todo) =>
    set((state) => {
      const newTodo: Todo = {
        ...todo,
        id: nanoid(),
        comments: 0,
        attachments: [],
      };
      toast.success("Task added successfully");
      return { todos: [...state.todos, newTodo] };
    }),

  updateTodo: (updatedTodo) =>
    set((state) => {
      const todos = state.todos.map((t) =>
        t.id === updatedTodo.id ? updatedTodo : t
      );
      toast.success("Task updated successfully");
      return { todos };
    }),

  deleteTodo: (id) =>
    set((state) => {
      const todos = state.todos.filter((t) => t.id !== id);
      toast.success("Task deleted successfully");
      return { todos };
    }),
}));
