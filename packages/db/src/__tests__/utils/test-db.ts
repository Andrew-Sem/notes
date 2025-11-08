import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../schema";

// Get test database URL from environment
const TEST_DB_URL =
	process.env.DATABASE_TEST_URL ||
	"postgresql://postgres:password@localhost:5433/notes_test";

// Create test database instance
export const testDb = drizzle(TEST_DB_URL, { schema });

// Get the migrations folder path (relative to this file)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const migrationsFolder = join(__dirname, "../../migrations");

/**
 * Setup test database - apply all Drizzle migrations from SQL files
 * This should be called once before all tests
 */
export async function setupTestDb() {
	// Read all migration files from the migrations folder
	const files = await readdir(migrationsFolder);

	// Filter only .sql files and sort them (they're already in order: 0000_, 0001_, etc.)
	const migrationFiles = files
		.filter((file) => file.endsWith(".sql"))
		.sort();

	// Apply each migration in order
	for (const file of migrationFiles) {
		const migrationPath = join(migrationsFolder, file);
		const migrationSQL = await readFile(migrationPath, "utf-8");

		// Split by statement breakpoint and execute each statement
		const statements = migrationSQL
			.split("--> statement-breakpoint")
			.map((s) => s.trim())
			.filter((s) => s.length > 0);

		for (const statement of statements) {
			await testDb.execute(sql.raw(statement));
		}
	}
}

/**
 * Clean up test database - remove all data from tables
 * This should be called after each test to ensure isolation
 */
export async function cleanupTestDb() {
	// Get all table names from the public schema dynamically
	const result = await testDb.execute<{ tablename: string }>(sql`
		SELECT tablename
		FROM pg_tables
		WHERE schemaname = 'public'
	`);

	const tableNames = result.rows.map((row) => row.tablename);

	// Truncate all tables at once with CASCADE to handle foreign keys
	// RESTART IDENTITY resets auto-increment counters if any
	if (tableNames.length > 0) {
		const truncateQuery = `TRUNCATE TABLE ${tableNames.join(", ")} RESTART IDENTITY CASCADE`;
		await testDb.execute(sql.raw(truncateQuery));
	}
}

/**
 * Teardown test database - drop all tables and clean up
 * This should be called once after all tests
 */
export async function teardownTestDb() {
	// Drop and recreate the public schema to remove all objects (tables, views, etc.)
	await testDb.execute(sql`DROP SCHEMA public CASCADE`);
	await testDb.execute(sql`CREATE SCHEMA public`);
}
