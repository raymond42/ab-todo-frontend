import KanbanColumn from "@/components/KanbanColumn";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/features/todos/components/KanbanCard", () => ({
  __esModule: true,
  default: ({ todo }: any) => <div data-testid="kanban-card">{todo.title}</div>,
}));

describe("KanbanColumn", () => {
  const mockTodos = [
    {
      id: "1",
      title: "Test 1",
      description: "",
      status: "todo" as const,
      comments: 0,
      attachments: [],
    },
    {
      id: "2",
      title: "Test 2",
      description: "",
      status: "todo" as const,
      comments: 0,
      attachments: [],
    },
  ];

  test("renders title and badge", () => {
    render(
      <KanbanColumn
        title="To-do"
        todos={mockTodos}
        icon={<span>icon</span>}
        variant="todo"
      />
    );

    expect(screen.getByText("To-do")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // badge shows todos.length
  });

  test("renders correct number of KanbanCards", () => {
    render(
      <KanbanColumn
        title="To-do"
        todos={mockTodos}
        icon={<span>icon</span>}
        variant="todo"
      />
    );

    expect(screen.getAllByTestId("kanban-card")).toHaveLength(mockTodos.length);
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });
});
