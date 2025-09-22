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
    expect(screen.getAllByText("HR Tasks Hub")[0]).toBeInTheDocument();
    expect(screen.getByText("HR Tasks Hub 🗿")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to the Human Resources hub")
    ).toBeInTheDocument();
  });

  test("renders nav items with correct labels", () => {
    setup();

    ["Kanban", "List", "Calendar"].forEach((label) => {
      const links = screen.getAllByText(label);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test("marks the active nav item based on route", () => {
    setup("/calendar");
    const activeLink = screen
      .getAllByText("Calendar")
      .map((el) => el.closest("a"))
      .find((a) => a?.className.includes("dark:bg-neutral-700"));

    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toHaveClass("font-medium");
    expect(activeLink).not.toHaveClass("text-gray-600", "dark:text-gray-300");
  });

  test("renders search input and buttons", () => {
    setup();

    expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();

    ["Filter", "Sort", "Share"].forEach((label) => {
      const button = screen.getByRole("button", {
        name: new RegExp(label, "i"),
      });
      expect(button).toBeInTheDocument();
    });
  });

  test("renders avatars", () => {
    setup();

    ["User 1", "User 2", "User 3"].forEach((alt) => {
      expect(screen.getByAltText(alt)).toBeInTheDocument();
    });
  });
});
