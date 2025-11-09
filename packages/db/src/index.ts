import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL || "", { schema });

export { messageRepository } from "./entities/messages";
// Re-export repositories
export { userRepository } from "./entities/users";
// Re-export types
export type { User } from "./entities/users";
