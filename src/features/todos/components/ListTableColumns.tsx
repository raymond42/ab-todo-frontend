import { createColumnHelper } from "@tanstack/react-table";
import { User, Ellipsis, Calendar1, Radio, Paperclip } from "lucide-react";
import { Todo } from "../types";

const columnHelper = createColumnHelper<Todo>();

export const todoColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="w-4 h-4 bg-red-100 border border-red-300 rounded-sm cursor-pointer"
        ref={(el) => {
          if (el) el.indeterminate = table.getIsSomePageRowsSelected();
        }}
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="w-4 h-4 bg-gray-100 border border-gray-300 rounded-sm cursor-pointer"
        ref={(el) => {
          if (el) el.indeterminate = row.getIsSomeSelected();
        }}
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("title", {
    id: "name",
    cell: (info) => (
      <span
        title={info.getValue()}
        className="block max-w-[180px] truncate overflow-hidden whitespace-nowrap font-bold text-black/80"
      >
        {info.getValue()}
      </span>
    ),
    header: () => (
      <span className="flex items-center">
        <span className="mr-2">Aa</span> Name
      </span>
    ),
  }),

  columnHelper.accessor("dueDate", {
    id: "dueDate",
    header: () => (
      <span className="flex items-center">
        <Calendar1 className="mr-2" size={16} /> Dates
      </span>
    ),
    cell: (info) => {
      const rawDate = info.getValue();
      if (!rawDate) return "";
      return new Date(rawDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  }),

  columnHelper.accessor("status", {
    id: "status",
    cell: (info) => {
      const value = info.getValue();
      const statusStyles: Record<string, string> = {
        todo: "bg-red-100 text-red-400",
        onprogress: "bg-yellow-100 text-yellow-400",
        needsreview: "bg-violet-100 text-violet-400",
        done: "bg-green-100 text-green-400",
      };
      const styleClass = statusStyles[value] || "bg-gray-100 text-gray-800";

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styleClass}`}
        >
          {value}
        </span>
      );
    },
    header: () => (
      <span className="flex items-center">
        <Radio className="mr-2" size={16} /> Status
      </span>
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("attachments", {
    id: "attachment",
    header: () => (
      <span className="flex items-center">
        <Paperclip className="mr-2" size={16} /> Attachment
      </span>
    ),
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),

  columnHelper.accessor("assignees", {
    id: "assignees",
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> People
      </span>
    ),
    cell: (info) => (
      <div className="flex space-x-1">
        {info.getValue()?.map((a: any) => (
          <img
            key={a.id}
            src={a.avatar}
            alt={`Assignee ${a.id}`}
            className="w-6 h-6 rounded-lg"
          />
        ))}
      </div>
    ),
    enableSorting: false,
  }),

  columnHelper.display({
    id: "actions",
    header: () => (
      <span className="flex items-center">
        <Ellipsis className="mr-2" size={16} />
      </span>
    ),
    cell: () => (
      <Ellipsis
        className="text-gray-500 hover:text-black cursor-pointer"
        size={18}
      />
    ),
    enableSorting: false,
  }),
];
