import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "..";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";

export const authRouter = router({
	login: publicProcedure
		.input(z.object({ initData: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const initDataParsed = ctx.telegram.validateInitData(input.initData);

			const tgUser = initDataParsed.user;

			if (!tgUser) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "User data not found in initData",
				});
			}

			const user = await ctx.userRepository.findOrCreate(tgUser.id, {
				firstName: tgUser.firstName,
				lastName: tgUser.lastName,
				username: tgUser.username,
			});
			if (!user) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to create user",
				});
			}

			// TODO: validate env
			const accessSecret = process.env.JWT_ACCESS_SECRET;
			const refreshSecret = process.env.JWT_REFRESH_SECRET;

			if (!accessSecret || !refreshSecret) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "JWT secrets not configured",
				});
			}

			const accessToken = generateAccessToken(user.id, user.tgId, accessSecret);
			const refreshToken = generateRefreshToken(user.id, refreshSecret);

			return {
				accessToken,
				refreshToken,
				user: {
					id: user.id,
					tgId: user.tgId,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
				},
			};
		}),

	refresh: publicProcedure
		.input(z.object({ refreshToken: z.string() }))
		.mutation(async () => {
			// TODO: implement
		}),
});
