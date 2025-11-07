import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/table";

export const messages = pgTable("messages", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tgId: integer("tg_id").notNull(),
	text: varchar("text", { length: 1000 }),
	userId: varchar("user_id", { length: 255 }).notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
	users: one(users, {
		fields: [messages.userId],
		references: [users.id],
	}),
}));
