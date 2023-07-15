import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useUrlComposer } from "@crossbell/ui";
import { useAccountCharacter } from "@crossbell/react-account";

import {
	MintCharacter as Main,
	MintCharacterProps as Props,
	MintCharacterFormMode,
	MintCharacterSceneMode,
} from "../../../scenes";
import { useDynamicScenesModal, Congrats } from "../../../components";

export type MintCharacterProps = Pick<Props, "sceneMode" | "formMode">;

export function MintCharacter({ sceneMode, formMode }: MintCharacterProps) {
	const { goTo, updateLast } = useDynamicScenesModal();

	const onSwitchSceneMode = useRefCallback(
		(sceneMode: MintCharacterSceneMode) => {
			updateLast({
				kind: "mint-character",
				Component: () => (
					<MintCharacter formMode={formMode} sceneMode={sceneMode} />
				),
			});
		},
	);

	const onSwitchFormMode = useRefCallback((formMode: MintCharacterFormMode) => {
		updateLast({
			kind: "mint-character",
			Component: () => (
				<MintCharacter formMode={formMode} sceneMode={sceneMode} />
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
				goTo({
					kind: "congrats",
					Component: CongratsForMintCharacter,
				});
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
