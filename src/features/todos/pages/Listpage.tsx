import React, { useEffect, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { useTodoStore } from "../store/todoStore";
import { todoColumns } from "@/features/todos/components/ListTableColumns";
import { StatusTable } from "../components/ListTable";
import { Todo } from "@/features/todos/types";

const STATUS_ORDER = ["todo", "onprogress", "needsreview", "done"];

export default function ListPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { todos, loading, fetchTodos } = useTodoStore();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const todosByStatus: Record<string, Todo[]> = {
    todo: [],
    onprogress: [],
    needsreview: [],
    done: [],
  };

  todos.forEach((todo) => {
    if (todosByStatus[todo.status]) {
      todosByStatus[todo.status].push(todo);
    }
  });

  return (
    <div className="flex flex-col gap-12 p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        STATUS_ORDER.map((status) => {
          const sectionTodos = todosByStatus[status];
          if (!sectionTodos?.length) return null;

          return (
            <StatusTable
              key={status}
              status={status}
              todos={sectionTodos}
              sorting={sorting}
              setSorting={setSorting}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              columns={todoColumns}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          );
        })
      )}
    </div>
  );
}
