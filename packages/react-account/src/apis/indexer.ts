import { CharacterLinkType, indexer, NoteLinkType } from "@crossbell/indexer";
import { type Address } from "viem";
import { NoteEntity, Numberish } from "crossbell";

export type GetIsNoteMintedConfig = {
	noteCharacterId: number;
	noteId: number;
	byAddress: Address;
};

export async function getIsNoteMinted({
	noteId,
	noteCharacterId,
	byAddress,
}: GetIsNoteMintedConfig): Promise<boolean> {
	const { count } = await indexer.mintedNote.getManyOfAddress(byAddress, {
		limit: 0,
		noteCharacterId,
		noteId,
	});

	return count > 0;
}

export type GetIsNoteLinkedConfig = Pick<
	NoteEntity,
	"characterId" | "noteId"
> & {
	fromCharacterId: number;
	linkType: NoteLinkType;
};

export type GetIsNoteLinkedResult = {
	isLinked: boolean;
	transactionHash: string | null;
};

export async function getIsNoteLinked({
	fromCharacterId,
	characterId,
	noteId,
	linkType,
}: GetIsNoteLinkedConfig): Promise<GetIsNoteLinkedResult> {
	const { count, list } = await indexer.link.getMany(fromCharacterId, {
		linkType,
		toCharacterId: characterId,
		toNoteId: noteId,
		limit: 1,
	});

	return {
		isLinked: count > 0,
		transactionHash: list?.[0]?.transactionHash ?? null,
	};
}

export type GetNoteLinkCountParams = {
	characterId: number;
	noteId: number;
	linkType: NoteLinkType;
};

export function getNoteLinkCount({
	characterId,
	noteId,
	linkType,
}: GetNoteLinkCountParams) {
	return indexer.link
		.getBacklinksByNote(characterId, noteId, {
			linkType,
			limit: 0,
		})
		.then((res) => res.count);
}

export async function getIsLinked({
	fromCharacterId,
	toCharacterId,
	linkType,
}: {
	fromCharacterId: Numberish;
	toCharacterId: Numberish;
	linkType: CharacterLinkType;
}): Promise<boolean> {
	const { count } = await indexer.link.getMany(fromCharacterId, {
		linkType: linkType,
		limit: 0,
		toCharacterId,
	});

	return count > 0;
}
