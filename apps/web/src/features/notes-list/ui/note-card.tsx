import type { Note } from "@notes/db/entities/notes/index";

export const NoteCard = ({ note }: { note: Note }) => {
	return <div className="p-4">{note.text}</div>;
};
