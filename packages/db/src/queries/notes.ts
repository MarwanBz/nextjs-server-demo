import { desc, eq } from "drizzle-orm";

import { db } from "../index";
import { notes } from "../schema";

export type Note = typeof notes.$inferSelect;
export type CreateNoteData = {
  title: string;
  content?: string;
};
export type UpdateNoteData = {
  title: string;
  content?: string;
};

export async function getNotes(): Promise<Note[]> {
  return db.select().from(notes).orderBy(desc(notes.createdAt));
}

export async function getNoteById(id: number): Promise<Note | undefined> {
  const [note] = await db.select().from(notes).where(eq(notes.id, id));

  return note;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const [note] = await db.insert(notes).values(data).returning();

  if (!note) {
    throw new Error("Failed to create note");
  }

  return note;
}

export async function updateNote(
  id: number,
  data: UpdateNoteData,
): Promise<Note | undefined> {
  const [note] = await db
    .update(notes)
    .set(data)
    .where(eq(notes.id, id))
    .returning();

  return note;
}

export async function deleteNote(id: number): Promise<boolean> {
  const [deletedNote] = await db
    .delete(notes)
    .where(eq(notes.id, id))
    .returning({ id: notes.id });

  return deletedNote !== undefined;
}
