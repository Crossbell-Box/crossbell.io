import React from "react";
import classNames from "classnames";
import { CharacterOperatorEntity } from "crossbell.js";
import { Loading } from "@crossbell/ui";
import { truncateAddress } from "@crossbell/util-ethers";
import { useRefCallback } from "@crossbell/util-hooks";
import { RemoveOperator } from "../remove-operator";

import commonStyles from "../../../styles.module.css";
import { useCharacterOperatorPermissions } from "../../../hooks";
import { useDynamicScenesModal } from "../../../components";

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

	const { goTo, goBack } = useDynamicScenesModal();
	const goToRemoveOperator = useRefCallback(() => {
		goTo({
			kind: "remove-operator",
			Component: () => (
				<RemoveOperator
					characterOperator={characterOperator}
					onSuccess={goBack}
					onCancel={goBack}
				/>
			),
		});
	});

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
					onClick={goToRemoveOperator}
				>
					Remove
				</button>
			) : (
				<span className={styles.inactivated}>Inactivated</span>
			)}
		</div>
	);
}
