import * as React from "react";
import { cn } from "@/lib/utils";

type SegmentedProgressProps = {
  total: number;
  completed: number;
  className?: string;
};

export function SegmentedProgress({
  total,
  completed,
  className,
}: SegmentedProgressProps) {
  if (total <= 0) return null;

  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={cn(
            "flex-1 h-1.5 rounded",
            idx < completed ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
          )}
        />
      ))}
    </div>
  );
}
