import React from "react";
import compact from "lodash.compact";

import { NIL_ADDRESS } from "@/utils/ethers";
import { composeScanTxHref, decomposeNoteId } from "@/utils/url";
import { formatSources, SourceType } from "@/utils/crossbell.js";
import { useNote } from "@/utils/apis/indexer";

import type { NoteOnChainSectionProps } from "./index";
import type { BlockProps } from "./components/block";
import { CrossbellLogo, IPFSLogo, SourceLogo } from "./components/logos";

export function useBlocks(props: NoteOnChainSectionProps): BlockProps[] {
	const { note, status } = useNoteInfo(props);

	return React.useMemo(() => {
		const crossbellChain: BlockProps = {
			status,
			title: "Crossbell Chain",
			icon: <CrossbellLogo />,
			sections: (() => {
				const transactionHash = note?.transactionHash ?? null;
				const owner = note?.owner ?? null;
				const contractAddress =
					note?.contractAddress && note.contractAddress !== NIL_ADDRESS
						? note.contractAddress
						: null;

				return compact([
					transactionHash && {
						title: "Transaction details",
						link: composeScanTxHref(transactionHash),
						detail: transactionHash,
					},

					contractAddress && {
						title: "NFT contract address",
						link: composeScanTxHref(contractAddress),
						detail: contractAddress,
					},

					owner && {
						title: "Author address",
						link: `https://rss3.io/result?search=${owner}`,
						detail: owner,
					},
				]);
			})(),
		};

		const ipfs: BlockProps = {
			status,
			title: "IPFS",
			icon: <IPFSLogo />,
			sections: (() => {
				const uri = note?.uri ?? null;

				return compact([
					uri && {
						title: "IPFS address",
						link: uri,
						detail: uri,
					},
				]);
			})(),
		};

		const source: BlockProps = {
			status,
			title: "Source",
			icon: <SourceLogo />,
			sections: (() => {
				const formattedSources = note ? formatSources(note) : [];

				return compact(
					formattedSources
						.filter((source) => source.type === SourceType.platform)
						.map(
							(source) =>
								source.link && {
									title: `Sync from ${source.name}`,
									link: source.link,
									detail: source.link,
								}
						)
				);
			})(),
		};

		return [crossbellChain, ipfs, source].filter(
			(block) => block.sections.length > 0
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
