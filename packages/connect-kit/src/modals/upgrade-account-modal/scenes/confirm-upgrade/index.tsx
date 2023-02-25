import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import {
	ConfirmUpgrade as Main,
	ConfirmUpgradeScene,
} from "../../../../scenes/upgrade-account/confirm-upgrade";

import { Header } from "../../components/header";
import { useScenesStore, useUpgradeAccountModal } from "../../stores";
import { SceneKind } from "../../types";

export type ConfirmUpgradeProps = {
	scene: ConfirmUpgradeScene;
};

export function ConfirmUpgrade({ scene }: ConfirmUpgradeProps) {
	const scenes = useScenesStore();
	const { hide: hideModal } = useUpgradeAccountModal();

	const onSuccess = useRefCallback(
		({ isCSBClaimed }: { isCSBClaimed: boolean }) => {
			scenes.goTo({
				kind: SceneKind.congrats,
				title: "Congrats!",
				desc: [
					isCSBClaimed
						? "You have upgraded to wallet account and get 0.02 $CSB."
						: "You have upgraded to wallet account.",
					"Now you can return into the feed and enjoy Crossbell.",
				]
					.filter(Boolean)
					.join(" "),
				tips: "Welcome to new Crossbell",
				timeout: "15s",
				btnText: "Sign In",
				onClose: hideModal,
				onClickBtn() {
					const goToSelectCharacter = () => {
						scenes.resetScenes([{ kind: SceneKind.selectCharacters }]);
					};

					scenes.goTo({
						kind: SceneKind.signInWithWallet,
						signInText: "Sign In (Recommended)",
						onSkip: goToSelectCharacter,
						afterSignIn: goToSelectCharacter,
					});
				},
			});
		}
	);

	const onSwitchScene = useRefCallback((scene: ConfirmUpgradeScene) => {
		scenes.updateLast({ kind: SceneKind.confirmUpgrade, scene });
	});

	return (
		<Main
			Header={Header}
			scene={scene}
			onSkip={hideModal}
			onSwitchScene={onSwitchScene}
			onSuccess={onSuccess}
		/>
	);
}
