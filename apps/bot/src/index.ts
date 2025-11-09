import "dotenv/config";
import { noteRepository, userRepository } from "@notes/db";
import { Bot } from "gramio";
import { env } from "./env";

const bot = new Bot(env.BOT_TOKEN)
	.command("start", (context) => context.send("Hi!"))
	.onStart(console.log);

bot.on("message", async (ctx) => {
	const userTgId = ctx.senderId;
	if (!userTgId) throw new Error(`Sender id expected, but got ${userTgId}`);
	let user = await userRepository.findByTgId(userTgId);
	if (!user) {
		user = await userRepository.create({
			tgId: userTgId,
			firstName: "",
		});
	}
	if (!user)
		throw new Error(`Unable to find or create user with tg id: ${userTgId}`);

	await noteRepository.create({
		text: ctx.text,
		tgId: ctx.id,
		userId: user?.id,
	});
});

bot.start();
