import React from "react";
import { CharacterOperatorEntity } from "crossbell.js";
import { truncateAddress } from "@crossbell/util-ethers";
import { Loading } from "@crossbell/ui";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import { useCharacterOperatorPermissions } from "../../hooks";

import styles from "./item.module.css";

export type ItemTag = {
	title: string;
	style: React.CSSProperties;
};

export type ItemProps = {
	characterOperator: CharacterOperatorEntity;
	characterId: number;
	tags: ItemTag[] | null;
	description: string | null;
};

export function Item({
	characterOperator,
	characterId,
	tags,
	description,
}: ItemProps) {
	const { data, isLoading } = useCharacterOperatorPermissions({
		characterId,
		operatorAddress: characterOperator.operator,
	});
	const permissions = data ?? [];

	return (
		<div className={styles.container}>
			<div>
				<div title={characterOperator.operator} className={styles.title}>
					{truncateAddress(characterOperator.operator, { start: 8, end: 9 })}
				</div>
				<div className={styles.description}>{description}</div>
				{tags && tags.length > 0 && (
					<div className={styles.tags}>
						{tags.map((tag) => (
							<span key={tag.title} style={tag.style}>
								{tag.title}
							</span>
						))}
					</div>
				)}
			</div>

			{isLoading ? (
				<Loading />
			) : permissions.length > 0 ? (
				<button
					className={classNames(styles.removeBtn, commonStyles.uxOverlay)}
				>
					Remove
				</button>
			) : (
				<span className={styles.inactivated}>Inactivated</span>
			)}
		</div>
	);
}
