import React from "react";
import classNames from "classnames";
import { usePreloadImgs, useRefCallback } from "@crossbell/util-hooks";
import { LoadingOverlay, useWeb2Url } from "@crossbell/ui";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	OptionList,
	OptionListItem,
	useDynamicScenesModal,
	Congrats,
} from "../../../components";
import { useDeleteCharacter } from "../../../hooks";

import styles from "./index.module.css";

const heartImgIPFS =
	"ipfs://bafkreiggl5dvgdoak4grhokwyam3zp3ohecaede4rgbop2jupnbgqjb7bi";

export type DeleteCharacterProps = {
	characterId: number;
	afterDelete?: () => void;
	onCancel?: () => void;
};

export function DeleteCharacter({
	characterId,
	onCancel,
	afterDelete,
}: DeleteCharacterProps) {
	const { goBack, updateLast } = useDynamicScenesModal();
	const heartUrl = useWeb2Url(heartImgIPFS);
	const { mutate, isLoading } = useDeleteCharacter({
		onSuccess() {
			if (afterDelete) {
				afterDelete();
			} else {
				updateLast({
					kind: "deleted-congrats",
					Component: DeletedCongrats,
				});
			}
		},
	});

	usePreloadImgs([heartUrl]);

	const deleteCharacter = useRefCallback(() => mutate({ characterId }));

	return (
		<DynamicScenesContainer
			padding="0 24px 24px"
			header={<DynamicScenesHeader title="Delete Character" />}
		>
			<LoadingOverlay visible={isLoading} />

			<p className={styles.tips}>
				Your data including your character and feed will be permanently deleted
				except your wallet. Press the button to proceed with the deletion
			</p>

			<OptionList className={styles.list}>
				<OptionListItem
					className={classNames(
						styles.item,
						styles.delete,
						isLoading && styles.deleting
					)}
					color="red"
				>
					<div
						className={styles.deleteProgress}
						onTransitionEnd={({ currentTarget }) => {
							const isActive =
								getComputedStyle(currentTarget)
									.getPropertyValue("--is-active")
									.trim() === "true";

							if (isActive) {
								deleteCharacter();
							}
						}}
					/>
					Press to Delete
				</OptionListItem>
				<OptionListItem
					className={styles.item}
					color="gray"
					onClick={onCancel ?? goBack}
				>
					Cancel
				</OptionListItem>
			</OptionList>
		</DynamicScenesContainer>
	);
}

function DeletedCongrats() {
	const { hide } = useDynamicScenesModal();
	const heartUrl = useWeb2Url(heartImgIPFS);

	return (
		<Congrats
			title="Deleted!"
			desc="You have deleted your character, take care and see you next time!"
			tips="Delete Character"
			timeout="15s"
			btnText=""
			onClose={hide}
			illustration={
				<div className={styles.heartImgContainer}>
					<img className={styles.heartImg} src={heartUrl} alt="Heart" />
				</div>
			}
			onClickBtn={() => {
				hide();
			}}
		/>
	);
}
