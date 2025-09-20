import { create } from "zustand";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "onprogress" | "needsreview" | "done";
  checklist?: { id: string; text: string; done: boolean }[];
  dueDate?: string;
  comments?: number;
  attachments?: number;
  assignees?: { id: string; avatar: string }[];
};

interface TodoState {
  todos: Todo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const res = await fetch("https://dummyjson.com/todos");
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
          dueDate: "2025-12-31T00:00:00.000Z",
          comments: 0,
          attachments: 2,
          assignees: [
            { id: "u1", avatar: "https://i.pravatar.cc/32?img=1" },
            { id: "u2", avatar: "https://i.pravatar.cc/32?img=2" },
          ],
        };
      });

      set({ todos: mappedTodos, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
