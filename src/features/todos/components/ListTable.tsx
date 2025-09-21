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

const statuses: {
  key: Todo["status"];
  label: string;
  icon: React.ReactNode;
  className: string;
}[] = [
  {
    key: "todo",
    label: "To-do",
    icon: <SquarePen size={16} />,
    className: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
  },
  {
    key: "onprogress",
    label: "On Progress",
    icon: <CircleDashed size={16} />,
    className:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
  },
  {
    key: "needsreview",
    label: "Needs Review",
    icon: <Flame size={16} />,
    className:
      "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400",
  },
  {
    key: "done",
    label: "Done",
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

export function StatusTable({
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          {currentStatus?.label}
        </h2>
        {currentStatus && (
          <span
            className={`p-2 rounded-full flex items-center justify-center ${currentStatus.className}`}
          >
            {currentStatus.icon}
          </span>
        )}
      </div>

      <div className="overflow-x-auto bg-card dark:bg-card text-foreground shadow-md rounded-lg border border-border dark:border-border transition-colors">
        <table className="min-w-full divide-y divide-border dark:divide-border">
          <thead className="bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-2" size={14} />
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
                    className={`px-6 py-4 text-xs md:text-sm whitespace-nowrap ${
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
    </div>
  );
}
