import { beforeAll, afterEach, afterAll } from "vitest";
import { setupTestDb, cleanupTestDb, teardownTestDb } from "./utils/test-db";

// Set test database URL before any imports
process.env.DATABASE_URL =
	process.env.DATABASE_TEST_URL ||
	"postgresql://postgres:password@localhost:5433/notes_test";

// Setup test database before all tests
beforeAll(async () => {
	await setupTestDb();
});

// Clean up data after each test to ensure test isolation
afterEach(async () => {
	await cleanupTestDb();
});

// Teardown test database after all tests
afterAll(async () => {
	await teardownTestDb();
});
