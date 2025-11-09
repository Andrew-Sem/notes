import { protectedProcedure, router } from "..";

export const notesRouter = router({
	getMy: protectedProcedure.query(async ({ ctx }) => {
		return ctx.noteRepository.getByUserId(ctx.session.user.id);
	}),
});
