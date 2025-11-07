import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";

export const getZodDrizzleSchemas = <T extends TableConfig>(
	table: PgTableWithColumns<T>,
) => {
	return {
		select: createSelectSchema(table),
		create: createInsertSchema(table),
		update: createUpdateSchema(table),
	};
};
