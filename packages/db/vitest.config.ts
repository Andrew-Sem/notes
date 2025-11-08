import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Use node environment for database tests
		environment: "node",

		// Enable global test APIs (describe, it, expect, etc.)
		globals: true,

		// Test file patterns
		include: ["src/**/*.test.ts"],

		// Increase timeout for integration tests (database operations)
		testTimeout: 10000,
		hookTimeout: 10000,

		// Run tests sequentially to avoid database conflicts
		fileParallelism: false,

		// Setup files to run before tests
		setupFiles: ["./src/__tests__/setup.ts"],
	},
});
