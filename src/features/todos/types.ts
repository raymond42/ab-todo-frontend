export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "onprogress" | "needsreview" | "done";
  checklist?: { id: string; text: string; done: boolean }[];
  dueDate?: string;
  comments?: number;
  attachments?: string[];
  assignees?: { id: string; avatar: string }[];
};
