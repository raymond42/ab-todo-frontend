import { render, screen } from "@testing-library/react";
import KanbanBoard from "@/components/KanbanBoard";
import "@testing-library/jest-dom";

jest.mock("lucide-react", () => ({
  SquarePen: () => <span data-testid="icon-squarepen" />,
  CircleDashed: () => <span data-testid="icon-circle" />,
  Flame: () => <span data-testid="icon-flame" />,
  ShieldCheck: () => <span data-testid="icon-shield" />,
}));

describe("KanbanBoard", () => {
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
});
