import { userRepository } from "@notes/db";
import { validateInitData } from "@notes/telegram";
import type { Context as HonoContext } from "hono";

export type CreateContextOptions = {
	context: HonoContext;
};

export async function createContext(opts: CreateContextOptions) {
	return {
		context: opts.context,
		session: null,
		telegram: {
			validateInitData: (initData: string) =>
				validateInitData(initData, process.env.BOT_TOKEN || ""),
		},
		userRepository,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
