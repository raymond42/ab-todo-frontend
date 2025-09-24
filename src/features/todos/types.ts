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

// declare module "@dnd-kit/utilities" {
//   export function arrayMove<T>(array: T[], from: number, to: number): T[];
// }
