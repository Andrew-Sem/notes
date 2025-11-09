import { eq } from "drizzle-orm";
import { db } from "../../index";
import { users } from "./table";
import type { UserInsert, UserUpdate } from "./types";

export const userRepository = {
	async findById(id: string) {
		return await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.id, id),
		});
	},

	async findByTgId(tgId: number) {
		return await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.tgId, tgId),
		});
	},

	async create(userInsertDto: UserInsert) {
		const [newUser] = await db.insert(users).values(userInsertDto).returning();
		return newUser;
	},

	async update(id: string, userUpdateDto: UserUpdate) {
		const [updatedUser] = await db
			.update(users)
			.set(userUpdateDto)
			.where(eq(users.id, id))
			.returning();
		return updatedUser;
	},

	async findOrCreate(tgId: number, userInsertDto: Omit<UserInsert, "tgId">) {
		const existingUser = await this.findByTgId(tgId);
		if (existingUser) {
			return existingUser;
		}
		return await this.create({ tgId, ...userInsertDto });
	},
};
