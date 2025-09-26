import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleDashed,
  Flame,
  ShieldCheck,
  SquarePen,
} from "lucide-react";
import type { SortingState } from "@tanstack/react-table";
import { Todo } from "../types";
import { useTranslation } from "react-i18next";

const statuses: {
  key: Todo["status"];
  label: string;
  icon: React.ReactNode;
  className: string;
}[] = [
  {
    key: "todo",
    label: "todoLabel",
    icon: <SquarePen size={16} />,
    className: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
  },
  {
    key: "onprogress",
    label: "inProgressLabel",
    icon: <CircleDashed size={16} />,
    className:
      "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400",
  },
  {
    key: "needsreview",
    label: "needsReviewLabel",
    icon: <Flame size={16} />,
    className:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
  },
  {
    key: "done",
    label: "doneLabel",
    icon: <ShieldCheck size={16} />,
    className:
      "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  },
];

interface Props {
  status: string;
  todos: Todo[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  columns: any[];
  rowSelection?: Record<string, boolean>;
  setRowSelection?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export function ListTable({
  status,
  todos,
  sorting,
  setSorting,
  globalFilter,
  setGlobalFilter,
  columns,
}: Props) {
  const table = useReactTable<Todo>({
    data: todos,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  const currentStatus = statuses.find((s) => s.key === status);

  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Status header */}
      {currentStatus && (
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            {t(currentStatus?.label)}
          </h2>
          <span
            className={`p-2 rounded-full flex items-center justify-center ${currentStatus.className}`}
          >
            {currentStatus.icon}
          </span>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto w-full bg-card dark:bg-card text-foreground shadow-md rounded-lg border border-border dark:border-border transition-colors">
        <table className="min-w-full divide-y divide-border dark:divide-border">
          <thead className="bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium tracking-wider whitespace-nowrap"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-1"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-1 sm:ml-2" size={14} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-border dark:divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors"
              >
                {row.getVisibleCells().map((cell, colIndex) => (
                  <td
                    key={cell.id}
                    className={`px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap ${
                      colIndex < 3 ? "text-left" : "text-center"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Gmail-style list */}
      <div className="md:hidden space-y-2">
        {table.getRowModel().rows.map((row) => {
          const statusCell = row
            .getVisibleCells()
            .find((c) => c.column.id === "status");

          return (
            <div
              key={row.id}
              className="flex items-start p-4 bg-card dark:bg-card shadow rounded-lg border border-border dark:border-border transition-colors hover:bg-muted/50 dark:hover:bg-muted/30"
            >
              {/* Content: status + title + secondary info */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {statusCell && (
                  <span
                    className={`p-2 rounded-full flex items-center justify-center ${
                      statuses.find((s) => s.key === statusCell.getValue())
                        ?.className
                    }`}
                  >
                    {
                      statuses.find((s) => s.key === statusCell.getValue())
                        ?.icon
                    }
                  </span>
                )}

                <div className="flex flex-col truncate">
                  {/* Main column: skip status + select */}
                  {row.getVisibleCells().map((cell, idx) => {
                    if (cell.column.id === "status") return null;
                    if (cell.column.id === "select") return null;
                    if (idx === 0)
                      return (
                        <span
                          key={cell.id}
                          className="text-sm font-semibold text-foreground truncate"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      );
                    return null;
                  })}

                  {/* Secondary info */}
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground dark:text-muted-foreground truncate">
                    {row.getVisibleCells().map((cell, idx) => {
                      if (cell.column.id === "status") return null;
                      if (cell.column.id === "select") return null;
                      if (idx === 0) return null;
                      return (
                        <span key={cell.id} className="truncate">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
