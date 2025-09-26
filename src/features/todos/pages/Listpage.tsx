import React, { useEffect, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { useTodoStore } from "../store/todoStore";
import { useTodoColumns } from "@/features/todos/components/ListTableColumns";
import { ListTable } from "../components/ListTable";
import { Todo } from "@/features/todos/types";

const STATUS_ORDER = ["todo", "onprogress", "needsreview", "done"];

export default function ListPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { todos, loading, fetchTodos } = useTodoStore();
  const [rowSelection, setRowSelection] = useState({});
  const todoColumns = useTodoColumns();

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

  // Skeleton component
  const Skeleton = () => (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-6 bg-muted rounded w-1/3"></div>
      ))}
      {[...Array(3)].map((_, i) => (
        <div
          key={`row-${i}`}
          className="h-12 bg-muted rounded w-full border border-border dark:border-border"
        ></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-12 p-6">
      {loading ? (
        <Skeleton />
      ) : (
        STATUS_ORDER.map((status) => {
          const sectionTodos = todosByStatus[status];
          if (!sectionTodos?.length) return null;

          return (
            <ListTable
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
