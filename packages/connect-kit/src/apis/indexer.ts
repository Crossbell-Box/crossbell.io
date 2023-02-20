import { indexer, NoteLinkType } from "@crossbell/indexer";

export type GetIsNoteMintedConfig = {
	noteCharacterId: number;
	noteId: number;
	byAddress: string;
};

export async function getIsNoteMinted({
	noteId,
	noteCharacterId,
	byAddress,
}: GetIsNoteMintedConfig): Promise<boolean> {
	const { count } = await indexer.getMintedNotesOfAddress(byAddress, {
		limit: 0,
		noteCharacterId,
		noteId,
	});

	return count > 0;
}

export type GetIsNoteLinkedConfig = {
	characterId: number;
	toCharacterId: number;
	toNoteId: number;
	linkType: NoteLinkType;
};

export type GetIsNoteLinkedResult = {
	isLinked: boolean;
	transactionHash: string | null;
};

export async function getIsNoteLinked({
	characterId,
	toCharacterId,
	toNoteId,
	linkType,
}: GetIsNoteLinkedConfig): Promise<GetIsNoteLinkedResult> {
	const { count, list } = await indexer.getLinks(characterId, {
		linkType,
		toCharacterId,
		toNoteId,
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
	return indexer
		.getBacklinksOfNote(characterId, noteId, {
			linkType,
			limit: 0,
		})
		.then((res) => res.count);
}
