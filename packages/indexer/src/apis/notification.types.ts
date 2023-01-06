import { CharacterEntity, NoteEntity } from "crossbell.js";

type BaseNotification<T, V> = {
	type: T;
	transactionHash: string;
	createdAt: number;
} & V;

export type LikeNotification = BaseNotification<
	"like",
	{
		originNote: NoteEntity;
		fromCharacter: CharacterEntity;
	}
>;

export type CommentNotification = BaseNotification<
	"comment",
	{
		commentNote: NoteEntity;
		originNote: NoteEntity;
		fromCharacter: CharacterEntity;
	}
>;

export type MintNotification = BaseNotification<
	"mint",
	{
		originNote: NoteEntity;
		fromAddress: string;
		fromCharacter: CharacterEntity;
		toCharacter: CharacterEntity;
	}
>;

export type FollowNotification = BaseNotification<
	"follow",
	{
		fromCharacter: CharacterEntity;
		toCharacter: CharacterEntity;
	}
>;

export type ParsedNotification =
	| LikeNotification
	| CommentNotification
	| MintNotification
	| FollowNotification;
