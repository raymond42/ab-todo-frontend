import { createColumnHelper } from "@tanstack/react-table";
import { User, Ellipsis, Calendar1, Radio, Paperclip } from "lucide-react";
import { Todo } from "../types";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper<Todo>();

export function useTodoColumns() {
  const { t, i18n } = useTranslation();

  return [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          className="w-4 h-4 border border-border bg-card dark:bg-card-dark rounded-sm cursor-pointer"
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
          className="w-4 h-4 border border-border bg-card dark:bg-card-dark rounded-sm cursor-pointer"
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
      header: () => (
        <span className="flex items-center">
          <span className="mr-2">Aa</span> {t("name")}
        </span>
      ),
      cell: (info) => (
        <span
          title={info.getValue()}
          className="block max-w-[180px] truncate font-bold text-foreground dark:text-foreground"
        >
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("dueDate", {
      id: "dueDate",
      header: () => (
        <span className="flex items-center">
          <Calendar1 className="mr-2" size={16} /> {t("dates")}
        </span>
      ),
      cell: (info) => {
        const rawDate = info.getValue();
        if (!rawDate) return "";
        return new Date(rawDate).toLocaleDateString(i18n.language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    }),

    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <span className="flex items-center">
          <Radio className="mr-2" size={16} /> {t("status")}
        </span>
      ),
      cell: (info) => {
        const value = info.getValue();
        const styleClass =
          {
            todo: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
            onprogress:
              "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
            needsreview:
              "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400",
            done: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
          }[value] ||
          "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styleClass}`}
          >
            {t(value)} {/* 👈 Direct key: "todo", "done", etc. */}
          </span>
        );
      },
      enableSorting: false,
    }),

    columnHelper.accessor("attachments", {
      id: "attachment",
      header: () => (
        <span className="flex items-center">
          <Paperclip className="mr-2" size={16} /> {t("attachment")}
        </span>
      ),
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),

    columnHelper.accessor("assignees", {
      id: "assignees",
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16} /> {t("people")}
        </span>
      ),
      cell: (info) => (
        <div className="flex -space-x-2">
          {info.getValue()?.map((a: any) => (
            <img
              key={a.id}
              src={a.avatar}
              alt={`Assignee ${a.id}`}
              className="w-6 h-6 rounded-lg border border-border dark:border-border"
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
          className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground cursor-pointer"
          size={18}
        />
      ),
      enableSorting: false,
    }),
  ];
}
