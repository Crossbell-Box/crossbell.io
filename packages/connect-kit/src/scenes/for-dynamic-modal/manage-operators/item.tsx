import React from "react";
import classNames from "classnames";
import { CharacterOperatorEntity } from "crossbell.js";
import { CharacterAvatar, Loading, useWeb2Url } from "@crossbell/ui";
import { truncateAddress } from "@crossbell/util-ethers";
import { isAddressEqual } from "viem";
import { useRefCallback } from "@crossbell/util-hooks";
import { usePrimaryCharacter } from "@crossbell/indexer";
import {
	NEWBIE_VILLA_OPERATOR_ADDRESS,
	OP_SIGN_OPERATOR_ADDRESS,
	useCharacterOperatorPermissions,
	X_SYNC_OPERATOR_ADDRESS,
} from "@crossbell/react-account";

import commonStyles from "../../../styles.module.css";
import { useDynamicScenesModal } from "../../../components";

import { OperatorDetail } from "../operator-detail";
import { RemoveOperator } from "../remove-operator";

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

	const goToRemoveOperator = useRefCallback((event: React.MouseEvent) => {
		event.stopPropagation();
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

	const goToOperatorDetail = useRefCallback(() => {
		goTo({
			kind: "remove-operator",
			Component: () => (
				<OperatorDetail
					characterOperator={characterOperator}
					description={description}
					characterId={characterId}
					tags={tags}
				/>
			),
		});
	});

	const { data: primaryCharacter } = usePrimaryCharacter(
		characterOperator.operator
	);

	const handle = primaryCharacter?.handle ? `@${primaryCharacter.handle}` : "";
	const avatar = useOperatorAvatar(characterOperator);

	return (
		<div
			className={classNames(styles.container, commonStyles.uxOverlay)}
			onClick={goToOperatorDetail}
		>
			<CharacterAvatar size="32px" character={primaryCharacter} src={avatar} />

			<div className={styles.main}>
				<div title={characterOperator.operator} className={styles.title}>
					<span>
						{truncateAddress(characterOperator.operator, { start: 4, end: 4 })}
					</span>

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
				<div className={styles.description}>{description ?? handle}</div>
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

export function useOperatorAvatar(
	characterOperator: CharacterOperatorEntity
): string | undefined {
	const administratorUrl = useWeb2Url(
		"ipfs://bafkreib3yzt66fwyeegrinj6ljtjjwpjugcdscepu2iw6kopiaoqsbidtm"
	);

	if (
		isAddressEqual(characterOperator.operator, NEWBIE_VILLA_OPERATOR_ADDRESS) ||
		isAddressEqual(characterOperator.operator, X_SYNC_OPERATOR_ADDRESS) ||
		isAddressEqual(characterOperator.operator, OP_SIGN_OPERATOR_ADDRESS)
	) {
		return administratorUrl;
	}

	return undefined;
}
