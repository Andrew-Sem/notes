import { type ValidateValue, validate } from "@telegram-apps/init-data-node";
import { env } from "../env";

export const validateInitData = (value: ValidateValue) => {
	validate(value, env.BOT_TOKEN);
};
