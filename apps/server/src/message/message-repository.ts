import { db } from "@notes/db";
import {
	type MessageInsert,
	messages,
} from "@notes/db/entities/messages/index";

export const messageRepository = {
	async create(saveMessageDto: MessageInsert) {
		const [newMessage] = await db
			.insert(messages)
			.values(saveMessageDto)
			.returning();
		return newMessage;
	},
};
