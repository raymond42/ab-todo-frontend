import { Todo } from "../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Paperclip, Calendar } from "lucide-react";

export default function KanbanCard({ todo }: { todo: Todo }) {
  const totalChecklist = todo.checklist?.length || 0;
  const completedChecklist = todo.checklist?.filter((c) => c.done).length || 0;

  const progress =
    totalChecklist > 0
      ? Math.round((completedChecklist / totalChecklist) * 100)
      : 0;

  return (
    <Card className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
      <CardHeader className="p-3">
        <CardTitle className="text-base font-medium">{todo.title}</CardTitle>
      </CardHeader>

      <CardContent className="px-3 pb-3 flex flex-col gap-2">
        {/* Description */}
        {todo.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {todo.description}
          </p>
        )}

        {/* Checklist progress */}
        {totalChecklist > 0 && (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-2 flex-1" />
            <span className="text-xs text-muted-foreground">
              {completedChecklist}/{totalChecklist}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-3 pb-3 flex justify-between items-center">
        {/* Left: metadata */}
        <div className="flex gap-3 text-muted-foreground text-sm">
          {todo.comments ? (
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              {todo.comments}
            </div>
          ) : null}

          {todo.attachments ? (
            <div className="flex items-center gap-1">
              <Paperclip size={14} />
              {todo.attachments}
            </div>
          ) : null}

          {todo.dueDate ? (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
            </div>
          ) : null}
        </div>

        {/* Right: avatars */}
        <div className="flex -space-x-2">
          {todo.assignees?.map((a) => (
            <Avatar key={a.id} className="h-6 w-6 border">
              <AvatarImage src={a.avatar} alt="user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
