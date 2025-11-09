import { publicProcedure, router } from "../index";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
	auth: authRouter,
	user: userRouter,
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
});

export type AppRouter = typeof appRouter;
