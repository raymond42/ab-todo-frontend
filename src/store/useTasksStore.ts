import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "review" | "done";
};

type State = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, status: Task["status"]) => void;
};

export const useTasksStore = create<State>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),
}));
