import type { User } from "@notes/db";
import { userRepository } from "@notes/db";
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
	} catch {
		// Invalid token or user not found - session remains null
	}

	return {
		context: opts.context,
		session,
		telegram: {
			validateInitData: (initData: string) =>
				validateInitData(initData, process.env.BOT_TOKEN || ""),
		},
		userRepository,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
