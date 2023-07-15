import React from "react";
import { CharacterAvatar } from "@crossbell/ui";
import { truncateAddress } from "@crossbell/util-ethers";
import { usePrimaryCharacter } from "@crossbell/indexer";

import { ItemProps, useOperatorAvatar } from "../manage-operators/item";

import styles from "./operator-card.module.css";

export function OperatorCard({
	characterOperator,
	tags,
	description,
}: ItemProps) {
	const { data: primaryCharacter } = usePrimaryCharacter(
		characterOperator.operator,
	);

	const handle = primaryCharacter?.handle ? `@${primaryCharacter.handle}` : "";
	const avatar = useOperatorAvatar(characterOperator);

	return (
		<div className={styles.container}>
			<CharacterAvatar
				className={styles.avatar}
				size="32px"
				character={primaryCharacter}
				src={avatar}
			/>

			<div className={styles.main}>
				<div title={characterOperator.operator} className={styles.title}>
					<span>
						{truncateAddress(characterOperator.operator, { start: 4, end: 4 })}
					</span>

					<div className={styles.tags}>
						{tags?.map((tag) => (
							<span key={tag.title} style={tag.style}>
								{tag.title}
							</span>
						))}
					</div>
				</div>
				<div className={styles.description}>{description ?? handle}</div>
			</div>
		</div>
	);
}
