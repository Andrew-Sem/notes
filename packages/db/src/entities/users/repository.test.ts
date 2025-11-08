import { describe, it, expect } from "vitest";
import { userRepository } from "./repository";
import type { UserInsert } from "./types";

describe("userRepository", () => {
	describe("create", () => {
		it("should create a new user with valid data", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 123456789,
			};

			// Act
			const newUser = await userRepository.create(userData);

			// Assert
			expect(newUser).toBeDefined();
			expect(newUser.id).toBeDefined();
			expect(newUser.tgId).toBe(userData.tgId);
		});

		it("should throw error when creating user with duplicate tgId", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 987654321,
			};

			// Create first user
			await userRepository.create(userData);

			// Act & Assert
			await expect(userRepository.create(userData)).rejects.toThrow();
		});

		it("should generate unique ID for each user", async () => {
			// Arrange
			const user1Data: UserInsert = { tgId: 111111111 };
			const user2Data: UserInsert = { tgId: 222222222 };

			// Act
			const user1 = await userRepository.create(user1Data);
			const user2 = await userRepository.create(user2Data);

			// Assert
			expect(user1.id).not.toBe(user2.id);
		});
	});

	describe("findByTgId", () => {
		it("should find existing user by tgId", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 555555555,
			};
			const createdUser = await userRepository.create(userData);

			// Act
			const foundUser = await userRepository.findByTgId(userData.tgId);

			// Assert
			expect(foundUser).toBeDefined();
			expect(foundUser?.id).toBe(createdUser.id);
			expect(foundUser?.tgId).toBe(userData.tgId);
		});

		it("should return undefined for non-existent tgId", async () => {
			// Arrange
			const nonExistentTgId = 999999999;

			// Act
			const foundUser = await userRepository.findByTgId(nonExistentTgId);

			// Assert
			expect(foundUser).toBeUndefined();
		});

		it("should find correct user when multiple users exist", async () => {
			// Arrange
			const user1Data: UserInsert = { tgId: 333333333 };
			const user2Data: UserInsert = { tgId: 444444444 };

			await userRepository.create(user1Data);
			const targetUser = await userRepository.create(user2Data);

			// Act
			const foundUser = await userRepository.findByTgId(user2Data.tgId);

			// Assert
			expect(foundUser).toBeDefined();
			expect(foundUser?.id).toBe(targetUser.id);
			expect(foundUser?.tgId).toBe(user2Data.tgId);
		});
	});
});
