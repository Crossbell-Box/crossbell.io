import React from "react";
import { CharacterOperatorEntity } from "crossbell";
import { LoadingOverlay } from "@crossbell/ui";
import { useRemoveCharacterOperator } from "@crossbell/react-account";

import {
	DynamicScenesContainer,
	DynamicScenesHeader,
	OptionList,
	OptionListItem,
} from "../../../components";

import styles from "./index.module.css";
import { useRefCallback } from "@crossbell/util-hooks";

export type RemoveOperatorProps = {
	onSuccess: () => void;
	onCancel: () => void;
	characterOperator: CharacterOperatorEntity;
};

export function RemoveOperator({
	characterOperator,
	onSuccess,
	onCancel,
}: RemoveOperatorProps) {
	const { isLoading, mutate } = useRemoveCharacterOperator({ onSuccess });
	const remove = useRefCallback(() => mutate(characterOperator));

	return (
		<DynamicScenesContainer
			padding="10px 24px 24px"
			header={<DynamicScenesHeader title="Remove Operators" />}
		>
			<LoadingOverlay visible={isLoading} />
			<div className={styles.container}>
				<p className={styles.tips}>
					Are you sure you would like to remove the operators? some functions
					might be affected.
				</p>

				<OptionList>
					<OptionListItem className={styles.item} color="red" onClick={remove}>
						Remove
					</OptionListItem>
					<OptionListItem
						className={styles.item}
						color="gray"
						onClick={onCancel}
					>
						Cancel
					</OptionListItem>
				</OptionList>
			</div>
		</DynamicScenesContainer>
	);
}
