import React from "react";

import crossbellLogoUrl from "@/public/images/logo.svg";
import ipfsLogoUrl from "@/public/logos/ipfs-lg.png";

import BaseSection from "../BaseSection";

import { Block } from "./components/block";
import { BgImg } from "./components/bg-img";
import { useBlocks } from "./use-blocks";

export type NoteOnChainSectionProps = {
	noteId: string;
};

export const NoteOnChainSection = (props: NoteOnChainSectionProps) => {
	const blocks = useBlocks(props);

	return (
		<BaseSection title="Note On-chain" className="relative z-0">
			<div className="px-16px pb-24px children:my-16px">
				{blocks.map((block) => (
					<Block {...block} key={block.title} />
				))}
			</div>

			<BgImg
				className="-top-21px -right-26px"
				width={134}
				height={145}
				src={crossbellLogoUrl}
				alt="Crossbell Logo"
			/>

			<BgImg
				className="-left-34px -bottom-49px"
				width={157}
				height={157}
				src={ipfsLogoUrl}
				alt="Ipfs Logo"
			/>
		</BaseSection>
	);
};
