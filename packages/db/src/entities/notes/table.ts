import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/table";

export const notes = pgTable("notes", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tgId: integer("tg_id").notNull(),
	text: varchar("text", { length: 1000 }),
	userId: varchar("user_id", { length: 255 }).notNull(),
});

export const notesRelations = relations(notes, ({ one }) => ({
	users: one(users, {
		fields: [notes.userId],
		references: [users.id],
	}),
}));
