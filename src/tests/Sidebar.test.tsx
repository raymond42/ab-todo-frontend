import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

describe("Sidebar", () => {
  function setup(initialRoute = "/") {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Sidebar />
      </MemoryRouter>
    );
  }

  test("renders header with logo and name", () => {
    setup();

    expect(screen.getByText("Klaboard")).toBeInTheDocument();
    expect(screen.getByText("free-trial")).toBeInTheDocument();
  });

  test("renders main navigation items", () => {
    setup();

    const navItems = [
      "Search",
      "Kla AI",
      "Inbox",
      "Calendar",
      "Settings & Preferences",
    ];
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders shared pages section", () => {
    setup();

    expect(screen.getByText("Shared Pages")).toBeInTheDocument();
    ["HR Tasks Hub", "Windah Comp", "NoSpace Dev"].forEach((page) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });
  });

  test("marks active main nav link based on route", () => {
    setup("/calendar");

    const calendarLink = screen.getByText("Calendar").closest("a");
    expect(calendarLink).toHaveClass(
      "border-2",
      "border-gray-200",
      "dark:border-neutral-700",
      "font-medium",
      "text-gray-900",
      "dark:text-white"
    );
  });

  test("marks active shared page based on route", () => {
    setup("/list");

    const hrTasksLink = screen.getByText("HR Tasks Hub").closest("a");
    expect(hrTasksLink).toHaveClass(
      "border-2",
      "border-gray-200",
      "dark:border-neutral-700",
      "font-medium",
      "text-gray-900",
      "dark:text-white"
    );
  });

  test("renders private pages and accounts", () => {
    setup();

    expect(screen.getByText("Private Pages")).toBeInTheDocument();
    expect(screen.getByText("Dribbble Portfolio")).toBeInTheDocument();

    expect(screen.getByText("Accounts")).toBeInTheDocument();
    expect(screen.getByText("Teheran")).toBeInTheDocument();
  });

  test("renders upgrade button", () => {
    setup();

    const upgradeButton = screen.getByRole("button", { name: /upgrade/i });
    expect(upgradeButton).toBeInTheDocument();
  });
});
