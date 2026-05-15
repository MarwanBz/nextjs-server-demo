import { notFound } from "next/navigation";
import { getNoteById } from "@nextjs-server-demo/db";

export default async function EditNotePage({
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

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">Edit Note</h1>
        <p className="text-muted-foreground">
          Editing: {note.title} (form coming soon...)
        </p>
      </div>
    </main>
  );
}
