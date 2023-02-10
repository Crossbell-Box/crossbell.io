import { indexer } from "@crossbell/indexer";

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
