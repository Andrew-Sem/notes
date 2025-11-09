import z from "zod";
import { publicProcedure, router } from "..";

export const telegramRouter = router({
	validateInitData: publicProcedure
		.input(z.object({ initData: z.string() }))
		.query(({ input, ctx }) => {
			return ctx.telegram.validateInitData(input.initData);
		}),
});
