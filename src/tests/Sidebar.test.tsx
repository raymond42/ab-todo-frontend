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

  test("renders navigation items", () => {
    setup();

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Kla AI")).toBeInTheDocument();
    expect(screen.getByText("Inbox")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Settings & Preferences")).toBeInTheDocument();
  });

  test("renders shared pages section", () => {
    setup();

    expect(screen.getByText("Shared Pages")).toBeInTheDocument();
    expect(screen.getByText("HR Tasks Hub")).toBeInTheDocument();
    expect(screen.getByText("Windah Comp")).toBeInTheDocument();
    expect(screen.getByText("NoSpace Dev")).toBeInTheDocument();
  });

  test("marks active nav link based on route", () => {
    setup("/calendar");

    const calendarLink = screen.getByText("Calendar");
    expect(calendarLink).toHaveClass("bg-gray-200");
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

    expect(screen.getByText("Upgrade")).toBeInTheDocument();
  });
});
