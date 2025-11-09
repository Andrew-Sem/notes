import {
	parse,
	type ValidateValue,
	validate,
} from "@telegram-apps/init-data-node";

export function validateInitData(
	initDataString: ValidateValue,
	botToken: string,
) {
	validate(initDataString, botToken);

	return parse(initDataString, true);
}
