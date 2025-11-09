import type { Note } from "@notes/db/entities/notes/index";

export const NoteCard = ({ note }: { note: Note }) => {
	return note.text;
};
