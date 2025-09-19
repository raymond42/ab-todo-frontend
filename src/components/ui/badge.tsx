import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        todo: "border-transparent bg-red-100 text-red-400 shadow hover:bg-red-200",
        onprogress:
          "border-transparent bg-violet-100 text-violet-400 shadow hover:bg-violet-200",
        needsreview:
          "border-transparent bg-yellow-100 text-yellow-400 shadow hover:bg-yellow-200",
        done: "border-transparent bg-green-100 text-green-400 shadow hover:bg-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
