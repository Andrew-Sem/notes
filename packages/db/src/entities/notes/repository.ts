import { db } from "../../index";
import { notes } from "./table";
import type { NoteInsert } from "./types";

export const noteRepository = {
	async create(saveNoteDto: NoteInsert) {
		const [newNote] = await db.insert(notes).values(saveNoteDto).returning();
		return newNote;
	},
	async getByUserId(userId: string) {
		return await db.query.notes.findMany({
			where: (notes, { eq }) => eq(notes.userId, userId),
		});
	},
};
