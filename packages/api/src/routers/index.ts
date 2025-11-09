import { publicProcedure, router } from "../index";
import { authRouter } from "./auth";
import { notesRouter } from "./notes";
import { userRouter } from "./user";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	auth: authRouter,
	user: userRouter,
	notes: notesRouter,
});

export type AppRouter = typeof appRouter;
