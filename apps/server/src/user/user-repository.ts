import { db } from "@notes/db/index";
import { users, type UserInsert } from "@notes/db/entities/users/index";

export const userRepository = {
	async findByTgId(tgId: number) {
		return await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.tgId, tgId),
		});
	},

	async create(userDto: UserInsert) {
		const [newUser] = await db.insert(users).values(userDto).returning();
		return newUser;
	},
};
