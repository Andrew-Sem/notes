import type z from "zod";
import type {
	MessageCreateSchema,
	MessageSchema,
	MessageUpdateSchema,
} from "./schemas";

export type Message = z.infer<typeof MessageSchema>;
export type MessageInsert = z.infer<typeof MessageCreateSchema>;
export type MessageUpdate = z.infer<typeof MessageUpdateSchema>;
