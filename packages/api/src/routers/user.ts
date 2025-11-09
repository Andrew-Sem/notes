import { userRepository } from "@notes/db";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "..";

export const userRouter = router({
	// Пример защищенного эндпоинта - получить текущего пользователя
	me: protectedProcedure.query(async ({ ctx }) => {
		// ctx.user доступен благодаря middleware isAuthed
		const user = await userRepository.findByTgId(ctx.user.tgId);

		if (!user) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "User not found",
			});
		}

		return {
			id: user.id,
			tgId: user.tgId,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
		};
	}),
});
