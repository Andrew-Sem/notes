import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { verifyAccessToken } from "./lib/jwt";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

// Middleware для проверки JWT
const isAuthed = t.middleware(async ({ ctx, next }) => {
	const accessSecret = process.env.JWT_ACCESS_SECRET;

	if (!accessSecret) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "JWT_ACCESS_SECRET not configured",
		});
	}

	// Получаем токен из Authorization header через Hono context
	const authHeader = ctx.context.req.header("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Missing or invalid authorization header",
		});
	}

	const token = authHeader.substring(7); // Убираем "Bearer "

	try {
		const decoded = verifyAccessToken(token, accessSecret);

		// Добавляем данные пользователя в контекст
		return next({
			ctx: {
				...ctx,
				user: {
					id: decoded.userId,
					tgId: decoded.tgId,
				},
			},
		});
	} catch (error) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Invalid or expired access token",
		});
	}
});

// Protected procedure для защищенных эндпоинтов
export const protectedProcedure = t.procedure.use(isAuthed);
