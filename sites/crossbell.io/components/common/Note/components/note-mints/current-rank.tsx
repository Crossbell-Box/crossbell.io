import React from "react";
import { composeScanTxHref } from "~/shared/url";
import { FingerLock } from "@crossbell/ui";
import { useAccount } from "wagmi";
import { useMintedNotesOfAddress } from "@crossbell/indexer";

export type CurrentRankProps = {
	characterId: number;
	noteId: number;
};

export function CurrentRank({ characterId, noteId }: CurrentRankProps) {
	const mintedInfo = useMintedInfo(characterId, noteId);

	if (!mintedInfo) return null;

	return (
		<div className="flex items-center py-15px text-[#FFF] bg-[#101314]">
			<div className="ml-24px flex-1 text-14px font-700">
				Your Currently Rank
			</div>
			<div className="mr-82px text-14px font-700">{mintedInfo.tokenId}</div>
			<a
				href={composeScanTxHref(mintedInfo.transactionHash)}
				target="_blank"
				rel="noreferrer"
				className="flex"
			>
				<FingerLock className="mr-60px text-37px" />
			</a>
		</div>
	);
}

function useMintedInfo(characterId: number, noteId: number) {
	const { address } = useAccount();
	const { data: mintedNotesOfAddress } = useMintedNotesOfAddress(address, {
		noteCharacterId: characterId,
		noteId,
	});

	return React.useMemo(
		() =>
			mintedNotesOfAddress?.pages
				.flatMap((page) => page.list)
				.sort((a, b) => a.tokenId - b.tokenId)
				.find(
					(info) =>
						info.noteCharacterId === characterId && info.noteId === noteId
				),
		[characterId, mintedNotesOfAddress?.pages, noteId]
	);
}
