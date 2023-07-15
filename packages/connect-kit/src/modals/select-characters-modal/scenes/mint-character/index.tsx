import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useUrlComposer } from "@crossbell/ui";
import { useAccountState } from "@crossbell/react-account";

import {
	MintCharacter as Main,
	MintCharacterFormMode,
	MintCharacterProps as Props,
	MintCharacterSceneMode,
} from "../../../../scenes";
import { Header } from "../../components/header";
import { useSelectCharactersModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

export type MintCharacterProps = Omit<
	Props,
	"Header" | "onSwitchFormMode" | "onSwitchSceneMode" | "onSuccess"
>;

export function MintCharacter(props: MintCharacterProps) {
	const urlComposer = useUrlComposer();
	const { hide: hideModal } = useSelectCharactersModal();
	const [goTo, updateScene] = useScenesStore((s) => [s.goTo, s.updateLast]);
	const onSwitchSceneMode = useRefCallback(
		(sceneMode: MintCharacterSceneMode) =>
			updateScene({
				kind: SceneKind.mintCharacter,
				formMode: props.formMode,
				sceneMode,
			}),
	);

	const onSwitchFormMode = useRefCallback((formMode: MintCharacterFormMode) =>
		updateScene({
			kind: SceneKind.mintCharacter,
			sceneMode: props.sceneMode,
			formMode,
		}),
	);

	return (
		<Main
			Header={Header}
			formMode={props.formMode}
			sceneMode={props.sceneMode}
			onSwitchFormMode={onSwitchFormMode}
			onSwitchSceneMode={onSwitchSceneMode}
			onSuccess={() => {
				const character =
					useAccountState.getState().computed.account?.character;

				goTo({
					kind: SceneKind.congrats,
					title: "Congrats!",
					desc: "Now you can return into the feed and enjoy Crossbell.",
					tips: "Welcome to new Crossbell",
					timeout: "15s",
					btnText: character ? "Check Character" : "Close",
					onClose: hideModal,
					onClickBtn: () => {
						if (character) {
							window.open(urlComposer.characterUrl(character), "_blank");
						}
						hideModal();
					},
				});
			}}
		/>
	);
}
