import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@nextjs-server-demo/ui/components/card";
import { Button } from "@nextjs-server-demo/ui/components/button";
import type { Note } from "@nextjs-server-demo/db";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const formattedDate = note.createdAt 
    ? new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Just now";

  const contentPreview = note.content 
    ? note.content.length > 120 
      ? `${note.content.slice(0, 120)}...` 
      : note.content
    : "";

  return (
    <Link href={`/notes/${note.id}`} className="group block">
      <Card className="h-full cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-semibold leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {note.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {contentPreview && (
            <CardDescription className="text-sm text-muted-foreground/80 line-clamp-3 mb-3">
              {contentPreview}
            </CardDescription>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {formattedDate}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
