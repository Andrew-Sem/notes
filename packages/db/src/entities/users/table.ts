import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { messages } from "../messages/table";

export const users = pgTable("users", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tgId: integer("tg_id").notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
	messages: many(messages),
}));
