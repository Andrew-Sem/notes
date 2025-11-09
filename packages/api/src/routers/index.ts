import { publicProcedure, router } from "../index";
import { authRouter } from "./auth";
import { telegramRouter } from "./telegram";
import { userRouter } from "./user";

export const appRouter = router({
	auth: authRouter,
	telegram: telegramRouter,
	user: userRouter,
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
});

export type AppRouter = typeof appRouter;
