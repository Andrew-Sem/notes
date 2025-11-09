import type { User } from "@notes/db";
import { noteRepository, userRepository } from "@notes/db";
import { validateInitData } from "@notes/telegram";
import type { Context as HonoContext } from "hono";
import { verifyAccessToken } from "./lib/jwt";

export type CreateContextOptions = {
	context: HonoContext;
};

export type Session = {
	user: User;
};

export async function createContext(opts: CreateContextOptions) {
	let session: Session | null = null;

	try {
		const authHeader = opts.context.req.header("Authorization");

		if (authHeader?.startsWith("Bearer ")) {
			const token = authHeader.substring(7);
			const accessSecret = process.env.JWT_ACCESS_SECRET;

			if (accessSecret) {
				const decoded = verifyAccessToken(token, accessSecret);
				const user = await userRepository.findByTgId(decoded.tgId);

				if (user) {
					session = { user };
				}
			}
		}
	} catch (error) {
		// Token validation failed - session remains null
		// This is expected for expired/invalid tokens and will trigger
		// the refresh flow on the client side
		if (error instanceof Error) {
			if (error.name === "TokenExpiredError") {
				// Token expired - client will refresh
				console.debug("Access token expired");
			} else if (error.name === "JsonWebTokenError") {
				// Invalid token format/signature
				console.warn("Invalid access token:", error.message);
			} else {
				// Other errors (user not found, etc)
				console.error("Auth error:", error.message);
			}
		}
	}

	return {
		context: opts.context,
		session,
		telegram: {
			validateInitData: (initData: string) =>
				validateInitData(initData, process.env.BOT_TOKEN || ""),
		},
		userRepository,
		noteRepository,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
