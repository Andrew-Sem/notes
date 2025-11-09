import { beforeEach, describe, expect, it } from "vitest";
import { userRepository } from "../users/repository";
import type { UserInsert } from "../users/types";
import { noteRepository } from "./repository";
import type { NoteInsert } from "./types";

describe("noteRepository", () => {
	let testUserId: string;

	// Create a test user before each test
	beforeEach(async () => {
		const userData: UserInsert = {
			tgId: 123456789,
			firstName: "Test",
		};
		const user = await userRepository.create(userData);
		if (!user) throw new Error("Failed to create test user");
		testUserId = user.id;
	});

	describe("create", () => {
		it("should create a new note with valid data", async () => {
			// Arrange
			const noteData: NoteInsert = {
				tgId: 111111111,
				text: "Hello, world!",
				userId: testUserId,
			};

			// Act
			const newNote = await noteRepository.create(noteData);

			if (!newNote) {
				throw new Error("Failed to create note");
			}

			// Assert
			expect(newNote).toBeDefined();
			expect(newNote.id).toBeDefined();
			expect(newNote.tgId).toBe(noteData.tgId);
			expect(newNote.text).toBe(noteData.text);
			expect(newNote.userId).toBe(testUserId);
		});

		it("should create a note with null text", async () => {
			// Arrange
			const noteData: NoteInsert = {
				tgId: 222222222,
				text: null,
				userId: testUserId,
			};

			// Act
			const newNote = await noteRepository.create(noteData);

			if (!newNote) {
				throw new Error("Failed to create note");
			}

			// Assert
			expect(newNote).toBeDefined();
			expect(newNote.id).toBeDefined();
			expect(newNote.tgId).toBe(noteData.tgId);
			expect(newNote.text).toBeNull();
			expect(newNote.userId).toBe(testUserId);
		});

		it("should generate unique ID for each note", async () => {
			// Arrange
			const note1Data: NoteInsert = {
				tgId: 333333333,
				text: "First note",
				userId: testUserId,
			};
			const note2Data: NoteInsert = {
				tgId: 444444444,
				text: "Second note",
				userId: testUserId,
			};

			// Act
			const note1 = await noteRepository.create(note1Data);
			const note2 = await noteRepository.create(note2Data);

			if (!note1 || !note2) {
				throw new Error("Failed to create notes");
			}

			// Assert
			expect(note1.id).not.toBe(note2.id);
		});

		it("should allow multiple notes from the same user", async () => {
			// Arrange
			const note1Data: NoteInsert = {
				tgId: 555555555,
				text: "Note 1",
				userId: testUserId,
			};
			const note2Data: NoteInsert = {
				tgId: 666666666,
				text: "Note 2",
				userId: testUserId,
			};

			// Act
			const note1 = await noteRepository.create(note1Data);
			const note2 = await noteRepository.create(note2Data);

			if (!note1 || !note2) {
				throw new Error("Failed to create notes");
			}

			// Assert
			expect(note1).toBeDefined();
			expect(note2).toBeDefined();
			expect(note1.userId).toBe(testUserId);
			expect(note2.userId).toBe(testUserId);
		});

		it("should handle long text (up to 1000 characters)", async () => {
			// Arrange
			const longText = "a".repeat(1000);
			const noteData: NoteInsert = {
				tgId: 777777777,
				text: longText,
				userId: testUserId,
			};

			// Act
			const newNote = await noteRepository.create(noteData);

			if (!newNote) {
				throw new Error("Failed to create note");
			}

			// Assert
			expect(newNote).toBeDefined();
			expect(newNote.text).toBe(longText);
			expect(newNote.text?.length).toBe(1000);
		});
	});
});
