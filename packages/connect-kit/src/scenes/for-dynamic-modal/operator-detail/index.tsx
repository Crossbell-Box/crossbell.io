import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { truncateAddress } from "@crossbell/util-ethers";

import {
	DynamicScenesContainer,
	DynamicScenesHeader,
	MainBtn,
	useDynamicScenesModal,
} from "../../../components";

import { OperatorCard } from "./operator-card";
import { RemoveOperator } from "../remove-operator";

import styles from "./index.module.css";
import { PermissionList } from "./permission-list";

export type OperatorDetailProps = React.ComponentProps<typeof OperatorCard>;

export function OperatorDetail({
	characterOperator,
	description,
	characterId,
	tags,
}: OperatorDetailProps) {
	const { goTo, goBack } = useDynamicScenesModal();

	const goToRemoveOperator = useRefCallback((event: React.MouseEvent) => {
		event.stopPropagation();
		goTo({
			kind: "remove-operator",
			Component: () => (
				<RemoveOperator
					characterOperator={characterOperator}
					onSuccess={() => {
						goBack();
						goBack();
					}}
					onCancel={goBack}
				/>
			),
		});
	});
	return (
		<DynamicScenesContainer
			padding="10px 24px 24px"
			header={
				<DynamicScenesHeader
					title={truncateAddress(characterOperator.operator, {
						start: 4,
						end: 4,
					})}
				/>
			}
		>
			<OperatorCard
				tags={tags}
				characterOperator={characterOperator}
				description={description}
				characterId={characterId}
			/>

			<PermissionList
				characterId={characterId}
				characterOperator={characterOperator}
			/>

			<MainBtn
				onClick={goToRemoveOperator}
				color="red"
				className={styles.mainBtn}
			>
				Remove Operator
			</MainBtn>
		</DynamicScenesContainer>
	);
}
