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
    className: "bg-red-100 text-red-600",
  },
  {
    key: "onprogress",
    label: "On Progress",
    icon: <CircleDashed size={16} />,
    className: "bg-yellow-100 text-yellow-600",
  },
  {
    key: "needsreview",
    label: "Needs Review",
    icon: <Flame size={16} />,
    className: "bg-violet-100 text-violet-600",
  },
  {
    key: "done",
    label: "Done",
    icon: <ShieldCheck size={16} />,
    className: "bg-green-100 text-green-600",
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
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<
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
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
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

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell, colIndex) => (
                  <td
                    key={cell.id}
                    className={`px-6 py-4 text-xs text-gray-500 whitespace-nowrap ${
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
