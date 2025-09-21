import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KanbanBoard from "@/components/KanbanBoard";

jest.mock("lucide-react", () => ({
  SquarePen: () => <span data-testid="icon-squarepen" />,
  CircleDashed: () => <span data-testid="icon-circle" />,
  Flame: () => <span data-testid="icon-flame" />,
  ShieldCheck: () => <span data-testid="icon-shield" />,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        todoLabel: "To-do",
        onProgressLabel: "On Progress",
        needsReviewLabel: "Needs Review",
        doneLabel: "Done",
      };
      return map[key] || key;
    },
  }),
}));

jest.mock("@/features/todos/components/KanbanCard", () => {
  return function MockKanbanCard({ todo }: any) {
    return <div data-testid="kanban-card">{todo.title}</div>;
  };
});

const mockFetchTodos = jest.fn();
jest.mock("@/features/todos/store/todoStore", () => ({
  useTodoStore: () => ({
    todos: [
      { id: 1, title: "Design login page", status: "todo" },
      { id: 2, title: "API integration", status: "onprogress" },
      { id: 3, title: "Code review", status: "needsreview" },
      { id: 4, title: "Deploy to staging", status: "done" },
    ],
    loading: false,
    fetchTodos: mockFetchTodos,
  }),
}));

describe("KanbanBoard", () => {
  beforeEach(() => {
    mockFetchTodos.mockClear();
  });

  test("renders all columns with correct labels", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("To-do")).toBeInTheDocument();
    expect(screen.getByText("On Progress")).toBeInTheDocument();
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
});
