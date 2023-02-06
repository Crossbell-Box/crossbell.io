import { CharacterEntity, NoteEntity } from "crossbell.js";

type BaseNotification<T, V> = {
	type: T;
	transactionHash: string;
	createdAt: number;
} & V;

export type LikeNoteNotification = BaseNotification<
	"like-note",
	{
		originNote: NoteEntity;
		fromCharacter: CharacterEntity;
	}
>;

export type CommentNoteNotification = BaseNotification<
	"comment-note",
	{
		commentNote: NoteEntity;
		originNote: NoteEntity;
		fromCharacter: CharacterEntity;
	}
>;

export type MintNoteNotification = BaseNotification<
	"mint-note",
	{
		originNote: NoteEntity;
		fromAddress: string;
		fromCharacter: CharacterEntity | null;
	}
>;

export type FollowCharacterNotification = BaseNotification<
	"follow-character",
	{
		fromCharacter: CharacterEntity;
		toCharacter: CharacterEntity;
	}
>;

export type ParsedNotification =
	| LikeNoteNotification
	| CommentNoteNotification
	| MintNoteNotification
	| FollowCharacterNotification;
