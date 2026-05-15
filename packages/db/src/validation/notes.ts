import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().optional(),
});

export const updateNoteSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  content: z.string().optional(),
});

export const noteIdSchema = z.object({
  id: z.number().int().positive(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type NoteIdInput = z.infer<typeof noteIdSchema>;
