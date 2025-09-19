import KanbanColumn from "./KanbanColumn";
import type { Todo } from "../features/todos/types";
import { SquarePen, CircleDashed, Flame, ShieldCheck } from "lucide-react";

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Design login page",
    description: "Create responsive login form",
    status: "todo",
  },
  {
    id: "2",
    title: "API integration",
    description: "Hook up backend endpoints",
    status: "onprogress",
  },
  {
    id: "3",
    title: "Code review",
    description: "Review PR #24",
    status: "needsreview",
  },
  {
    id: "4",
    title: "Deploy to staging",
    description: "Check environment variables",
    status: "done",
  },
];

export default function KanbanBoard() {
  const statuses: {
    key: Todo["status"];
    label: string;
    variant: "todo" | "onprogress" | "needsreview" | "done";
    icon: React.ReactNode;
  }[] = [
    {
      key: "todo",
      label: "To-do",
      variant: "todo",
      icon: <SquarePen size={16} />,
    },
    {
      key: "onprogress",
      label: "On Progress",
      variant: "onprogress",
      icon: <CircleDashed size={16} />,
    },
    {
      key: "needsreview",
      label: "Needs Review",
      variant: "needsreview",
      icon: <Flame size={16} />,
    },
    {
      key: "done",
      label: "Done",
      variant: "done",
      icon: <ShieldCheck size={16} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statuses.map((col) => (
        <KanbanColumn
          key={col.key}
          title={col.label}
          todos={mockTodos.filter((t) => t.status === col.key)}
          icon={col.icon}
          variant={col.variant}
        />
      ))}
    </div>
  );
}
