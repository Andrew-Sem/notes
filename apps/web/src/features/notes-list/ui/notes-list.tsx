import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/shared/api/trpc";
import Loader from "@/shared/layout/loader";
import { NoteCard } from "./note-card";

export const NotesList = () => {
	const { data: notes, isLoading } = useQuery(trpc.notes.getMy.queryOptions());

	if (isLoading) return <Loader />;

	if (!notes) return <h2 className="text-2xl">There are no notes yet</h2>;

	return (
		<div className="flex flex-col divide-y">
			{notes?.map((note) => (
				<NoteCard note={note} key={note.id} />
			))}
		</div>
	);
};
