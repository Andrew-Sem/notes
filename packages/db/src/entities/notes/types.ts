import type z from "zod";
import type {
	NoteCreateSchema,
	NoteSchema,
	NoteUpdateSchema,
} from "./schemas";

export type Note = z.infer<typeof NoteSchema>;
export type NoteInsert = z.infer<typeof NoteCreateSchema>;
export type NoteUpdate = z.infer<typeof NoteUpdateSchema>;
