import type z from "zod";
import type { UserCreateSchema, UserSchema, UserUpdateSchema } from "./schemas";

export type User = z.infer<typeof UserSchema>;
export type UserInsert = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
