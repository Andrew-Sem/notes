import { getZodDrizzleSchemas } from "../../get-zod-drizzle-schemas";
import { users } from "./table";

export const {
	select: UserSchema,
	create: UserCreateSchema,
	update: UserUpdateSchema,
} = getZodDrizzleSchemas(users);
