import { getZodDrizzleSchemas } from "../../get-zod-drizzle-schemas";
import { notes } from "./table";

export const {
	select: NoteSchema,
	create: NoteCreateSchema,
	update: NoteUpdateSchema,
} = getZodDrizzleSchemas(notes);
