import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KanbanBoard from "@/components/KanbanBoard";

// Mock @dnd-kit/core
jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useDroppable: () => ({
    setNodeRef: jest.fn(),
  }),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  SquarePen: () => <span data-testid="icon-squarepen" />,
  CircleDashed: () => <span data-testid="icon-circle" />,
  Flame: () => <span data-testid="icon-flame" />,
  ShieldCheck: () => <span data-testid="icon-shield" />,
  PlusIcon: () => <span data-testid="icon-plus" />,
}));

jest.mock("react-i18next");

// Mock KanbanCard
jest.mock("@/features/todos/components/KanbanCard", () => {
  return function MockKanbanCard({ todo }: any) {
    return <div data-testid="kanban-card">{todo.title}</div>;
  };
});

// Mock KanbanColumn
jest.mock("@/components/KanbanColumn", () => {
  return function MockKanbanColumn({ title, todos, icon }: any) {
    return (
      <div data-testid="kanban-column">
        <h2>{title}</h2>
        <div>{icon}</div>
        {todos.map((todo: any) => (
          <div key={todo.id} data-testid="kanban-card">
            {todo.title}
          </div>
        ))}
      </div>
    );
  };
});

// Mock Badge component
jest.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) => <span data-testid={`badge-${variant}`}>{children}</span>,
}));

const mockFetchTodos = jest.fn();
const mockUpdateTodoStatus = jest.fn();

jest.mock("@/features/todos/store/todoStore", () => ({
  useTodoStore: () => ({
    todos: [
      { id: "1", title: "Design login page", status: "todo" },
      { id: "2", title: "API integration", status: "onprogress" },
      { id: "3", title: "Code review", status: "needsreview" },
      { id: "4", title: "Deploy to staging", status: "done" },
    ],
    loading: false,
    fetchTodos: mockFetchTodos,
    updateTodoStatus: mockUpdateTodoStatus,
  }),
}));

describe("KanbanBoard", () => {
  beforeEach(() => {
    mockFetchTodos.mockClear();
    mockUpdateTodoStatus.mockClear();
  });

  test("renders all columns with correct labels", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("To-do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Needs Review")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("renders todos in correct columns", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("Design login page")).toBeInTheDocument();
    expect(screen.getByText("API integration")).toBeInTheDocument();
    expect(screen.getByText("Code review")).toBeInTheDocument();
    expect(screen.getByText("Deploy to staging")).toBeInTheDocument();
  });

  test("renders icons for each column", () => {
    render(<KanbanBoard />);
    expect(screen.getByTestId("icon-squarepen")).toBeInTheDocument();
    expect(screen.getByTestId("icon-circle")).toBeInTheDocument();
    expect(screen.getByTestId("icon-flame")).toBeInTheDocument();
    expect(screen.getByTestId("icon-shield")).toBeInTheDocument();
  });

  test("calls fetchTodos on mount", () => {
    render(<KanbanBoard />);
    expect(mockFetchTodos).toHaveBeenCalled();
  });

  test("displays loading state", () => {
    jest.doMock("@/features/todos/store/todoStore", () => ({
      useTodoStore: () => ({
        todos: [],
        loading: true,
        fetchTodos: mockFetchTodos,
        updateTodoStatus: mockUpdateTodoStatus,
      }),
    }));
  });
});
