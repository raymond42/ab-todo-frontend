"use client";

import React, { useState, useEffect, use } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTodoStore, Todo } from "@/features/todos/store/todoStore";
import { formatDateForInput } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  variant: "todo" | "onprogress" | "needsreview" | "done";
  open: boolean;
  onClose: () => void;
  initialTodo?: Todo;
  viewMode?: boolean;
};

export default function AddCardModal({
  variant,
  open,
  onClose,
  initialTodo,
  viewMode = false,
}: Props) {
  const { addTodo, updateTodo } = useTodoStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");

  const { t } = useTranslation();

  const availableAssignees = [
    { id: "u1", avatar: "https://i.pravatar.cc/32?img=1" },
    { id: "u2", avatar: "https://i.pravatar.cc/32?img=2" },
    { id: "u3", avatar: "https://i.pravatar.cc/32?img=3" },
  ];

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setDescription(initialTodo.description || "");
      setSubtasks(initialTodo.checklist?.map((c) => c.text) || []);
      setLinks(initialTodo.links?.map((l) => l.url) || []);
      setAssignees(initialTodo.assignees?.map((a) => a.id) || []);
      setDueDate(formatDateForInput(initialTodo.dueDate || ""));
    } else {
      setTitle("");
      setDescription("");
      setSubtasks([]);
      setLinks([]);
      setAssignees([]);
      setDueDate(formatDateForInput(""));
    }
  }, [initialTodo, open]);

  const isFormValid =
    Boolean(title.trim()) &&
    Boolean(description.trim()) &&
    assignees.length > 0 &&
    Boolean(dueDate);

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (initialTodo) {
      updateTodo({
        ...initialTodo,
        title: title.trim(),
        description: description.trim(),
        status: variant,
        checklist: subtasks.map((s, idx) => ({
          id: initialTodo.checklist?.[idx]?.id || `sub-${idx}`,
          text: s,
          done: initialTodo.checklist?.[idx]?.done || false,
        })),
        links: links.map((l, idx) => ({ id: `link-${idx}`, url: l })),
        assignees: availableAssignees.filter((a) => assignees.includes(a.id)),
        dueDate: formatDateForInput(dueDate),
      });
    } else {
      addTodo({
        title: title.trim(),
        description: description.trim(),
        status: variant,
        checklist: subtasks.map((s, idx) => ({
          id: `sub-${idx}`,
          text: s,
          done: false,
        })),
        links: links.map((l, idx) => ({ id: `link-${idx}`, url: l })),
        assignees: availableAssignees.filter((a) => assignees.includes(a.id)),
        dueDate: formatDateForInput(dueDate),
      });
    }

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-lg p-4 sm:p-6 mx-auto">
        <DialogHeader>
          <DialogTitle>
            {viewMode
              ? t("viewTask")
              : initialTodo
              ? t("editTask")
              : t("addTask")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("title")} {!viewMode && "*"}
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={viewMode}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("description")} {!viewMode && "*"}
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={viewMode}
            />
          </div>

          {/* Due date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("dueDate")} {!viewMode && "*"}
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={viewMode}
            />
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-sm mb-1">{t("subtasks")}</label>
            {!viewMode && (
              <div className="flex gap-2">
                <Input
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder={t("newSubtaskPlaceholder")}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (!newSubtask.trim()) return;
                    setSubtasks((prev) => [...prev, newSubtask.trim()]);
                    setNewSubtask("");
                  }}
                >
                  {t("addSubtask")}
                </Button>
              </div>
            )}
            <ul className="mt-2 space-y-1">
              {subtasks.map((s, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-sm bg-gray-100 dark:bg-neutral-800 p-1 rounded"
                >
                  <span className="truncate">{s}</span>
                  {!viewMode && (
                    <XIcon
                      className="w-4 h-4 cursor-pointer text-gray-500"
                      onClick={() =>
                        setSubtasks((prev) => prev.filter((_, i) => i !== idx))
                      }
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm mb-1">{t("links")}</label>
            {!viewMode && (
              <div className="flex gap-2">
                <Input
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="https://..."
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (!newLink.trim()) return;
                    setLinks((prev) => [...prev, newLink.trim()]);
                    setNewLink("");
                  }}
                >
                  {t("addLink")}
                </Button>
              </div>
            )}
            <ul className="mt-2 space-y-1">
              {links.map((l, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-sm bg-gray-100 dark:bg-neutral-800 p-1 rounded"
                >
                  <a
                    className="truncate"
                    href={l}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l}
                  </a>
                  {!viewMode && (
                    <XIcon
                      className="w-4 h-4 cursor-pointer text-gray-500"
                      onClick={() =>
                        setLinks((prev) => prev.filter((_, i) => i !== idx))
                      }
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("assignees")} {!viewMode && "*"}
            </label>
            <div className="flex gap-2">
              {availableAssignees.map((a) => {
                const selected = assignees.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() =>
                      !viewMode &&
                      setAssignees((prev) =>
                        prev.includes(a.id)
                          ? prev.filter((id) => id !== a.id)
                          : [...prev, a.id]
                      )
                    }
                    className={`rounded-full border-2 transition-shadow ${
                      selected
                        ? "border-primary shadow-sm"
                        : "border-transparent"
                    }`}
                    aria-pressed={selected}
                  >
                    <img
                      src={a.avatar}
                      alt={a.id}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {!viewMode && (
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              {initialTodo ? t("updateTask") : t("createTask")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
