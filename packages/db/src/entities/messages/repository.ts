import { db } from "../../index";
import { messages } from "./table";
import type { MessageInsert } from "./types";

export const messageRepository = {
	async create(saveMessageDto: MessageInsert) {
		const [newMessage] = await db
			.insert(messages)
			.values(saveMessageDto)
			.returning();
		return newMessage;
	},
};
