import { describe, expect, it } from "vitest";
import { userRepository } from "./repository";
import type { UserInsert } from "./types";

describe("userRepository", () => {
	describe("create", () => {
		it("should create a new user with valid data", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 123456789,
				firstName: "Test",
			};

			// Act
			const newUser = await userRepository.create(userData);

			// Assert
			expect(newUser).toBeDefined();
			expect(newUser?.id).toBeDefined();
			expect(newUser?.tgId).toBe(userData.tgId);
		});

		it("should throw error when creating user with duplicate tgId", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 987654321,
				firstName: "Test",
			};

			// Create first user
			await userRepository.create(userData);

			// Act & Assert
			await expect(userRepository.create(userData)).rejects.toThrow();
		});

		it("should generate unique ID for each user", async () => {
			// Arrange
			const user1Data: UserInsert = { tgId: 111111111, firstName: "User1" };
			const user2Data: UserInsert = { tgId: 222222222, firstName: "User2" };

			// Act
			const user1 = await userRepository.create(user1Data);
			const user2 = await userRepository.create(user2Data);

			// Assert
			expect(user1?.id).not.toBe(user2?.id);
		});
	});

	describe("findByTgId", () => {
		it("should find existing user by tgId", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 555555555,
				firstName: "Test",
			};
			const createdUser = await userRepository.create(userData);

			// Act
			const foundUser = await userRepository.findByTgId(userData.tgId);

			// Assert
			expect(foundUser).toBeDefined();
			expect(foundUser?.id).toBe(createdUser?.id);
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
			const user1Data: UserInsert = { tgId: 333333333, firstName: "User1" };
			const user2Data: UserInsert = { tgId: 444444444, firstName: "User2" };

			await userRepository.create(user1Data);
			const targetUser = await userRepository.create(user2Data);

			// Act
			const foundUser = await userRepository.findByTgId(user2Data.tgId);

			// Assert
			expect(foundUser).toBeDefined();
			expect(foundUser?.id).toBe(targetUser?.id);
			expect(foundUser?.tgId).toBe(user2Data.tgId);
		});
	});

	describe("update", () => {
		it("should update user with valid data", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 123123123,
				firstName: "Test",
			};
			const createdUser = await userRepository.create(userData);
			if (!createdUser) throw new Error("Failed to create user");

			// Act
			const updatedUser = await userRepository.update(createdUser.id, {
				username: "updated_username",
			});

			// Assert
			expect(updatedUser).toBeDefined();
			expect(updatedUser?.id).toBe(createdUser.id);
			expect(updatedUser?.username).toBe("updated_username");
			expect(updatedUser?.tgId).toBe(userData.tgId);
		});

		it("should update multiple fields at once", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 456456456,
				firstName: "Original",
			};
			const createdUser = await userRepository.create(userData);
			if (!createdUser) throw new Error("Failed to create user");

			// Act
			const updatedUser = await userRepository.update(createdUser.id, {
				username: "new_username",
				firstName: "NewFirstName",
				lastName: "NewLastName",
			});

			// Assert
			expect(updatedUser).toBeDefined();
			expect(updatedUser?.username).toBe("new_username");
			expect(updatedUser?.firstName).toBe("NewFirstName");
			expect(updatedUser?.lastName).toBe("NewLastName");
		});

		it("should keep unchanged fields when updating", async () => {
			// Arrange
			const userData: UserInsert = {
				tgId: 789789789,
				firstName: "Test",
			};
			const createdUser = await userRepository.create(userData);
			if (!createdUser) throw new Error("Failed to create user");

			// Act
			const updatedUser = await userRepository.update(createdUser.id, {
				username: "only_username_changed",
			});

			// Assert
			expect(updatedUser).toBeDefined();
			expect(updatedUser?.username).toBe("only_username_changed");
			expect(updatedUser?.tgId).toBe(userData.tgId);
		});

		it("should return undefined when updating non-existent user", async () => {
			// Arrange
			const nonExistentId = "00000000-0000-0000-0000-000000000000";

			// Act
			const updatedUser = await userRepository.update(nonExistentId, {
				username: "test",
			});

			// Assert
			expect(updatedUser).toBeUndefined();
		});
	});

	describe("findOrCreate", () => {
		it("should create new user if not exists", async () => {
			// Arrange
			const tgId = 101010101;
			const userInsertDto = {
				firstName: "Test",
			};

			// Act
			const user = await userRepository.findOrCreate(tgId, userInsertDto);

			// Assert
			expect(user).toBeDefined();
			expect(user?.tgId).toBe(tgId);
			expect(user?.id).toBeDefined();
		});

		it("should return existing user if found", async () => {
			// Arrange
			const tgId = 202020202;
			const existingUser = await userRepository.create({
				tgId,
				firstName: "Test",
			});
			if (!existingUser) throw new Error("Failed to create user");

			// Act
			const user = await userRepository.findOrCreate(tgId, {
				firstName: "Different",
			});

			// Assert
			expect(user).toBeDefined();
			expect(user?.id).toBe(existingUser.id);
			expect(user?.tgId).toBe(tgId);
		});

		it("should not create duplicate user on multiple calls", async () => {
			// Arrange
			const tgId = 303030303;

			// Act
			const user1 = await userRepository.findOrCreate(tgId, {
				firstName: "Test",
			});
			const user2 = await userRepository.findOrCreate(tgId, {
				firstName: "Test",
			});

			// Assert
			expect(user1?.id).toBe(user2?.id);
			expect(user1?.tgId).toBe(user2?.tgId);
		});

		it("should create user with additional data on first call", async () => {
			// Arrange
			const tgId = 404040404;
			const userInsertDto = {
				username: "new_user",
				firstName: "John",
				lastName: "Doe",
			};

			// Act
			const user = await userRepository.findOrCreate(tgId, userInsertDto);

			// Assert
			expect(user).toBeDefined();
			expect(user?.tgId).toBe(tgId);
			expect(user?.username).toBe("new_user");
			expect(user?.firstName).toBe("John");
			expect(user?.lastName).toBe("Doe");
		});

		it("should ignore additional data if user already exists", async () => {
			// Arrange
			const tgId = 505050505;
			const originalUser = await userRepository.create({
				tgId,
				firstName: "Original",
			});
			if (!originalUser) throw new Error("Failed to create user");

			const newDataToIgnore = {
				username: "should_be_ignored",
				firstName: "ShouldNotUpdate",
			};

			// Act
			const user = await userRepository.findOrCreate(tgId, newDataToIgnore);

			// Assert
			expect(user?.id).toBe(originalUser.id);
			expect(user?.username).toBe(originalUser.username);
			expect(user?.firstName).toBe(originalUser.firstName);
		});
	});
});
