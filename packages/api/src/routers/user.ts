import { protectedProcedure, router } from "..";

export const userRouter = router({
	me: protectedProcedure.query(async ({ ctx }) => {
		return ctx.session.user;
	}),
});
