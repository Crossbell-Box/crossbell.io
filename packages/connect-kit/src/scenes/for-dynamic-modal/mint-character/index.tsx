import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useUrlComposer } from "@crossbell/ui";

import { useAccountCharacter } from "../../../hooks";
import { useDynamicScenesModal, Congrats } from "../../../components";
import {
	MintCharacter as Main,
	MintCharacterProps as Props,
	MintCharacterFormMode,
	MintCharacterSceneMode,
} from "../../mint-character";

export type MintCharacterProps = Pick<Props, "sceneMode" | "formMode"> & {
	onSuccess?: () => void;
};

export function MintCharacter({
	sceneMode,
	formMode,
	onSuccess,
}: MintCharacterProps) {
	const { goTo, updateLast } = useDynamicScenesModal();

	const onSwitchSceneMode = useRefCallback(
		(sceneMode: MintCharacterSceneMode) => {
			updateLast({
				kind: "mint-character",
				Component: () => (
					<MintCharacter
						formMode={formMode}
						sceneMode={sceneMode}
						onSuccess={onSuccess}
					/>
				),
			});
		}
	);

	const onSwitchFormMode = useRefCallback((formMode: MintCharacterFormMode) => {
		updateLast({
			kind: "mint-character",
			Component: () => (
				<MintCharacter
					formMode={formMode}
					sceneMode={sceneMode}
					onSuccess={onSuccess}
				/>
			),
		});
	});

	return (
		<Main
			formMode={formMode}
			sceneMode={sceneMode}
			onSwitchFormMode={onSwitchFormMode}
			onSwitchSceneMode={onSwitchSceneMode}
			onSuccess={() => {
				if (onSuccess) {
					onSuccess();
				} else {
					goTo({
						kind: "congrats",
						Component: CongratsForMintCharacter,
					});
				}
			}}
		/>
	);
}

function CongratsForMintCharacter() {
	const character = useAccountCharacter();
	const urlComposer = useUrlComposer();
	const { hide } = useDynamicScenesModal();

	return (
		<Congrats
			title="Congrats!"
			desc="Now you can return into the feed and enjoy Crossbell."
			tips="Welcome to new Crossbell"
			timeout="15s"
			btnText={character ? "Check Character" : "Close"}
			onClose={hide}
			onClickBtn={() => {
				if (character) {
					window.open(urlComposer.characterUrl(character), "_blank");
				}
				hide();
			}}
		/>
	);
}
