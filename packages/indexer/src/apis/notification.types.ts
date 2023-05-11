import { CharacterEntity, NoteEntity } from "crossbell";

type BaseNotification<T, V> = {
	type: T;
	transactionHash: string;
	createdAt: number;
	isReadBefore: boolean;
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

export type TipNoteNotification = BaseNotification<
	"tip-note",
	{
		fromCharacter: CharacterEntity;
		toNote: NoteEntity;
		amount: bigint;
	}
>;

export type TipCharacterNotification = BaseNotification<
	"tip-character",
	{
		fromCharacter: CharacterEntity;
		toCharacter: CharacterEntity;
		amount: bigint;
	}
>;

export type MentionNotification = BaseNotification<
	"mention",
	{
		fromCharacter: CharacterEntity;
		fromNote: NoteEntity;
	}
>;

export type ParsedNotification =
	| LikeNoteNotification
	| CommentNoteNotification
	| MintNoteNotification
	| FollowCharacterNotification
	| TipNoteNotification
	| TipCharacterNotification
	| MentionNotification;
