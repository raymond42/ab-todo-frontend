import React from "react";

export default function Checklist({
  items,
  onToggle,
}: {
  items?: { id: string; text: string; done: boolean }[];
  onToggle?: (id: string) => void;
}) {
  if (!items || items.length === 0) return null;

  const done = items.filter((i) => i.done).length;
  const total = items.length;

  return (
    <div className="mt-2">
      <div className="text-xs text-gray-500 mb-1">Checklist</div>
      <div className="w-full bg-gray-100 h-2 rounded">
        <div
          className="h-2 rounded"
          style={{
            width: `${(done / total) * 100}%`,
            background: "linear-gradient(90deg,#34d399,#60a5fa)",
          }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {done}/{total}
      </div>
      <ul className="mt-2 space-y-1 text-sm">
        {items.map((it) => (
          <li key={it.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={it.done}
              onChange={() => onToggle?.(it.id)}
            />
            <span className={it.done ? "line-through text-gray-400" : ""}>
              {it.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
