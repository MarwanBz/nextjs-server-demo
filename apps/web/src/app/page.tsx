import { Button } from "@nextjs-server-demo/ui/components/button";
import Link from "next/link";
import { NotesList } from "@/components/notes-list";
import { getNotes } from "@nextjs-server-demo/db";

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Notes
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {notes.length} {notes.length === 1 ? "note" : "notes"} · Fetched directly from PostgreSQL
            </p>
          </div>
          <Link href="/notes/new">
            <Button size="sm" className="gap-1.5">
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              New Note
            </Button>
          </Link>
        </div>

        <NotesList notes={notes} />
      </div>
    </main>
  );
}
