import { Bot } from "gramio";
import { env } from "./env";

const bot = new Bot(env.BOT_TOKEN)
	.command("start", (context) => context.send("Hi!"))
	.onStart(console.log);

bot.start();
