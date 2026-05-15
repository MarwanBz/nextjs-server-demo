import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoteById } from "@nextjs-server-demo/db";
import { Button } from "@nextjs-server-demo/ui/components/button";
import { Card, CardContent } from "@nextjs-server-demo/ui/components/card";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noteId = Number.parseInt(id, 10);
  const note = await getNoteById(noteId);

  if (!note) {
    notFound();
  }

  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to notes
          </Link>
        </div>

        <div className="mb-6 flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {note.title}
          </h1>
          <div className="flex gap-2">
            <Link href={`/notes/${note.id}/edit`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <p className="mb-8 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {formattedDate}
        </p>

        <Card className="border-0 bg-muted/50 shadow-none">
          <CardContent className="py-8">
            {note.content ? (
              <div className="prose prose-sm max-w-none text-foreground">
                {note.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="italic text-muted-foreground">No content</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
