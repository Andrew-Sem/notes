import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		CORS_ORIGIN: z.url(),
		BOT_TOKEN: z.string().min(1),
		JWT_ACCESS_SECRET: z.string().min(32),
		JWT_REFRESH_SECRET: z.string().min(32),
	},

	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
