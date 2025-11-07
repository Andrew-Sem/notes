import { getZodDrizzleSchemas } from "../../get-zod-drizzle-schemas";
import { messages } from "./table";

export const {
	select: MessageSchema,
	create: MessageCreateSchema,
	update: MessageUpdateSchema,
} = getZodDrizzleSchemas(messages);
