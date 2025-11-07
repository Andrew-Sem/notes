import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BOT_TOKEN: z.string(),
		CORS_ORIGIN: z.url(),
	},

	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
