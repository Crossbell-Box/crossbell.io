import React from "react";
import compact from "lodash.compact";

import { NIL_ADDRESS } from "@crossbell/util-ethers";
import {
	composeScanTxHref,
	decomposeNoteId,
	composeScanAddressHref,
} from "~/shared/url";
import {
	SourceType,
	formatSources,
	isPlatformSource,
	PlatformSourceType,
} from "@crossbell/util-metadata";
import { useNote } from "@crossbell/indexer";

import type { NoteOnChainSectionProps } from "./index";
import type { BlockProps } from "./components/block";
import { CrossbellLogo, IPFSLogo, SourceLogo } from "./components/logos";

export function useBlocks(props: NoteOnChainSectionProps): BlockProps[] {
	const { note, status } = useNoteInfo(props);

	return React.useMemo(() => {
		const crossbellChain = ((): BlockProps => {
			const transactionHash = note?.transactionHash ?? null;
			const owner = note?.owner ?? null;
			const contractAddress =
				note?.contractAddress && note.contractAddress !== NIL_ADDRESS
					? note.contractAddress
					: null;

			return {
				status,
				title: "Crossbell Chain",
				icon: <CrossbellLogo />,
				tips: compact([
					"This note is posted on Crossbell by the author.",
					contractAddress && "This note is an NFT.",
				]).join(" "),
				sections: compact([
					transactionHash && {
						title: "Transaction details",
						link: composeScanTxHref(transactionHash),
						detail: transactionHash,
					},

					contractAddress && {
						title: "NFT contract address",
						link: composeScanAddressHref(contractAddress),
						detail: contractAddress,
					},

					owner && {
						title: "Author address",
						link: composeScanAddressHref(owner),
						detail: owner,
					},
				]),
			};
		})();

		const ipfs = ((): BlockProps => {
			const uri = note?.uri ?? null;

			return {
				status,
				tips: "The content of this note is on IPFS.",
				title: "IPFS",
				icon: <IPFSLogo />,
				sections: compact([
					uri && {
						title: "IPFS address",
						link: uri,
						detail: uri,
					},
				]),
			};
		})();

		const source = ((): BlockProps | null => {
			const formattedSources = note ? formatSources(note) : [];
			const source = formattedSources.find((source) =>
				isPlatformSource(source.type)
			);

			if (!source) return null;

			const sourceType = source.type as PlatformSourceType;

			return {
				status,
				tips: ((): string => {
					switch (sourceType) {
						case SourceType.externalPlatform:
							return `This note is synced from ${source.name}.`;
						case SourceType.internalPlatform:
							return `This note is posted on ${source.name}.`;
					}
				})(),
				title: "Source",
				icon: <SourceLogo />,
				sections: [
					{
						title: (() => {
							switch (sourceType) {
								case SourceType.externalPlatform:
									return `Sync from ${source.name}`;
								case SourceType.internalPlatform:
									return `Post on ${source.name}`;
							}
						})(),
						link: source.link,
						detail: source.link,
					},
				],
			};
		})();

		return [crossbellChain, ipfs, source].filter(
			(block): block is BlockProps => !!block && block.sections.length > 0
		);
	}, [note, status]);
}

function useNoteInfo(props: NoteOnChainSectionProps) {
	const { characterId, noteId } = React.useMemo(
		() => decomposeNoteId(props.noteId),
		[props.noteId]
	);

	const { data: note, status } = useNote(characterId, noteId);

	return { note, status };
}
