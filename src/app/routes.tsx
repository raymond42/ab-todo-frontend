import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import KanbanPage from "@/features/todos/pages/KanbanPage";
import ListPage from "@/features/todos/pages/Listpage";
import CalendarPage from "@/features/todos/pages/CalendarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <KanbanPage /> }, // "/" route
      { path: "list", element: <ListPage /> },
      { path: "calendar", element: <CalendarPage /> },
    ],
  },
]);
