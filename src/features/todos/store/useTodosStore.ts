import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "../types";

type State = {
  todos: Todo[];
  loading: boolean;
  addTodo: (t: Partial<Todo>) => Todo;
  updateTodo: (id: string, patch: Partial<Todo>) => void;
  moveTodo: (id: string, toStatus: Todo["status"], index?: number) => void;
  deleteTodo: (id: string) => void;
  loadSample: () => void;
};

const sampleTodos = (): Todo[] => [
  {
    id: uuidv4(),
    title: "Review and Update Job Descriptions",
    description:
      "Analyze current job descriptions and update any outdated items.",
    status: "todo",
    checklist: [
      { id: uuidv4(), text: "Gather current JDs", done: true },
      { id: uuidv4(), text: "Interview hiring managers", done: true },
      { id: uuidv4(), text: "Publish updates", done: false },
    ],
    dueDate: "2024-05-26",
    comments: 3,
    attachments: 1,
    assignees: [
      { id: "u1", avatar: "/avatars/u1.png" },
      { id: "u2", avatar: "/avatars/u2.png" },
    ],
  },
  {
    id: uuidv4(),
    title: "Update Employee Handbook",
    description: "Revise the employee handbook to include remote-work policy.",
    status: "onprogress",
    checklist: [],
    dueDate: "2024-05-28",
    comments: 8,
    attachments: 2,
    assignees: [{ id: "u3", avatar: "/avatars/u3.png" }],
  },
  {
    id: uuidv4(),
    title: "Prepare for Quarterly Performance Reviews",
    description: "Organize and prepare materials for review meetings.",
    status: "needsreview",
    checklist: [
      { id: uuidv4(), text: "Send reminders", done: false },
      { id: uuidv4(), text: "Prepare templates", done: true },
    ],
    dueDate: "2024-05-18",
    comments: 9,
    attachments: 3,
    assignees: [{ id: "u2", avatar: "/avatars/u2.png" }],
  },
  {
    id: uuidv4(),
    title: "Launch Employee Recognition Program",
    description: "Develop and launch a new program to celebrate staff.",
    status: "done",
    checklist: [],
    dueDate: "2024-05-08",
    comments: 24,
    attachments: 12,
    assignees: [{ id: "u3", avatar: "/avatars/u3.png" }],
  },
];

export const useTodosStore = create<State>()(
  persist(
    (set, get) => ({
      todos: [],
      loading: false,
      addTodo: (t) => {
        const newTodo: Todo = {
          id: uuidv4(),
          title: t.title ?? "New Task",
          description: t.description ?? "",
          status: t.status ?? "todo",
          checklist: t.checklist ?? [],
          dueDate: t.dueDate,
          comments: t.comments ?? 0,
          attachments: t.attachments ?? 0,
          assignees: t.assignees ?? [],
        };
        set({ todos: [...get().todos, newTodo] });
        return newTodo;
      },
      updateTodo: (id, patch) => {
        set({
          todos: get().todos.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        });
      },
      moveTodo: (id, toStatus, index) => {
        const todos = [...get().todos];
        const idx = todos.findIndex((t) => t.id === id);
        if (idx === -1) return;
        todos[idx] = { ...todos[idx], status: toStatus };
        // optional: reposition within same status by index
        if (typeof index === "number") {
          // remove
          const [moved] = todos.splice(idx, 1);
          // find all items with toStatus
          const same = todos.filter((x) => x.status === toStatus);
          // compute global insertion point after counting items in earlier parts
          // For simplicity: push to end if index > length
          // We'll keep stable: push to end
          todos.push(moved);
        }
        set({ todos });
      },
      deleteTodo: (id) => {
        set({ todos: get().todos.filter((t) => t.id !== id) });
      },
      loadSample: () => set({ todos: sampleTodos() }),
    }),
    {
      name: "kanban-todos-storage",
    }
  )
);
