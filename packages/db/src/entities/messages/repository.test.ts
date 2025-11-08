import { beforeEach, describe, expect, it } from "vitest";
import { userRepository } from "../users/repository";
import type { UserInsert } from "../users/types";
import { messageRepository } from "./repository";
import type { MessageInsert } from "./types";

describe("messageRepository", () => {
	let testUserId: string;

	// Create a test user before each test
	beforeEach(async () => {
		const userData: UserInsert = {
			tgId: 123456789,
		};
		const user = await userRepository.create(userData);
		if (!user) throw new Error("Failed to create test user");
		testUserId = user.id;
	});

	describe("create", () => {
		it("should create a new message with valid data", async () => {
			// Arrange
			const messageData: MessageInsert = {
				tgId: 111111111,
				text: "Hello, world!",
				userId: testUserId,
			};

			// Act
			const newMessage = await messageRepository.create(messageData);

			if (!newMessage) {
				throw new Error("Failed to create message");
			}

			// Assert
			expect(newMessage).toBeDefined();
			expect(newMessage.id).toBeDefined();
			expect(newMessage.tgId).toBe(messageData.tgId);
			expect(newMessage.text).toBe(messageData.text);
			expect(newMessage.userId).toBe(testUserId);
		});

		it("should create a message with null text", async () => {
			// Arrange
			const messageData: MessageInsert = {
				tgId: 222222222,
				text: null,
				userId: testUserId,
			};

			// Act
			const newMessage = await messageRepository.create(messageData);

			if (!newMessage) {
				throw new Error("Failed to create message");
			}

			// Assert
			expect(newMessage).toBeDefined();
			expect(newMessage.id).toBeDefined();
			expect(newMessage.tgId).toBe(messageData.tgId);
			expect(newMessage.text).toBeNull();
			expect(newMessage.userId).toBe(testUserId);
		});

		it("should generate unique ID for each message", async () => {
			// Arrange
			const message1Data: MessageInsert = {
				tgId: 333333333,
				text: "First message",
				userId: testUserId,
			};
			const message2Data: MessageInsert = {
				tgId: 444444444,
				text: "Second message",
				userId: testUserId,
			};

			// Act
			const message1 = await messageRepository.create(message1Data);
			const message2 = await messageRepository.create(message2Data);

			if (!message1 || !message2) {
				throw new Error("Failed to create messages");
			}

			// Assert
			expect(message1.id).not.toBe(message2.id);
		});

		it("should allow multiple messages from the same user", async () => {
			// Arrange
			const message1Data: MessageInsert = {
				tgId: 555555555,
				text: "Message 1",
				userId: testUserId,
			};
			const message2Data: MessageInsert = {
				tgId: 666666666,
				text: "Message 2",
				userId: testUserId,
			};

			// Act
			const message1 = await messageRepository.create(message1Data);
			const message2 = await messageRepository.create(message2Data);

			if (!message1 || !message2) {
				throw new Error("Failed to create messages");
			}

			// Assert
			expect(message1).toBeDefined();
			expect(message2).toBeDefined();
			expect(message1.userId).toBe(testUserId);
			expect(message2.userId).toBe(testUserId);
		});

		it("should handle long text (up to 1000 characters)", async () => {
			// Arrange
			const longText = "a".repeat(1000);
			const messageData: MessageInsert = {
				tgId: 777777777,
				text: longText,
				userId: testUserId,
			};

			// Act
			const newMessage = await messageRepository.create(messageData);

			if (!newMessage) {
				throw new Error("Failed to create message");
			}

			// Assert
			expect(newMessage).toBeDefined();
			expect(newMessage.text).toBe(longText);
			expect(newMessage.text?.length).toBe(1000);
		});
	});
});
