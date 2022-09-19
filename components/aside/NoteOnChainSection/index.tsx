import React from "react";

import BaseSection from "../BaseSection";

import styles from "./index.module.css";
import { Block } from "./components/block";
import { useBlocks } from "./use-blocks";

export type NoteOnChainSectionProps = {
	noteId: string;
};

export const NoteOnChainSection = (props: NoteOnChainSectionProps) => {
	const blocks = useBlocks(props);

	return (
		<BaseSection title="Note On-chain">
			<div className={styles.container}>
				{blocks.map((block) => (
					<Block {...block} key={block.title} />
				))}
			</div>
		</BaseSection>
	);
};
