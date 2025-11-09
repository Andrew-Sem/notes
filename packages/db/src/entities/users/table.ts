import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { notes } from "../notes/table";

export const users = pgTable("users", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tgId: integer("tg_id").notNull().unique(),
	username: varchar("username", { length: 255 }),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
	notes: many(notes),
}));
