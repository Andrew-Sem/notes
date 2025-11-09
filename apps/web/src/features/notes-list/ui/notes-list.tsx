import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/shared/api/trpc";
import { NoteCard } from "./note-card";

export const NotesList = () => {
	const { data: notes } = useQuery(trpc.notes.getMy.queryOptions());

	return (
		<div>
			notes
			{notes?.map((note) => (
				<NoteCard note={note} key={note.id} />
			))}
		</div>
	);
};
