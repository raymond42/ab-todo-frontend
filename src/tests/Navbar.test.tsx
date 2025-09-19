import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  function setup(initialRoute = "/") {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar />
      </MemoryRouter>
    );
  }

  test("renders breadcrumb and title", () => {
    setup();

    expect(screen.getByText("Shared Pages")).toBeInTheDocument();
    expect(screen.getByText("HR Tasks Hub")).toBeInTheDocument();
    expect(screen.getByText("HR Tasks Hub 🧑‍💼")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to the Human Resources hub")
    ).toBeInTheDocument();
  });

  test("renders nav items with correct labels", () => {
    setup();

    expect(screen.getByText("Kanban")).toBeInTheDocument();
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });

  test("marks the active nav item based on route", () => {
    setup("/calendar");
    const activeLink = screen.getByText("Calendar");

    expect(activeLink).toHaveClass("bg-gray-200");
  });

  test("renders search input and buttons", () => {
    setup();

    expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByText("Sort")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  test("renders avatars", () => {
    setup();

    expect(screen.getByAltText("User 1")).toBeInTheDocument();
    expect(screen.getByAltText("User 2")).toBeInTheDocument();
    expect(screen.getByAltText("User 3")).toBeInTheDocument();
  });
});
