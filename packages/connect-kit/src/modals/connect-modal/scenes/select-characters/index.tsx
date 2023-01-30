import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useAccountCharacters } from "@crossbell/connect-kit";
import { CharacterEntity } from "crossbell.js";

import {
	SelectCharacters as Main,
	useRefreshDynamicContainer,
} from "../../../../components";
import { useIsWalletSignedIn, useMintCharacterForm } from "../../../../hooks";
import { Header } from "../../components/header";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";

export function SelectCharacters() {
	const hide = useConnectModal((s) => s.hide);
	const [goTo, goBack, resetScenes] = useScenesStore((s) => [
		s.goTo,
		s.goBack,
		s.resetScenes,
	]);
	const { characters } = useAccountCharacters();
	const resetForm = useMintCharacterForm((s) => s.reset);
	const isWalletSignedIn = useIsWalletSignedIn();

	const goToMintCharacter = useRefCallback(() => {
		resetForm();
		goTo({ kind: SceneKind.mintCharacter });
	});

	const handleClickOPSignIcon = useRefCallback(
		({ characterId }: CharacterEntity) => {
			function goToOPSignSettings() {
				goTo({
					kind: SceneKind.opSignSettings,
					characterId,
					onNext: () => resetScenes([{ kind: SceneKind.selectCharacters }]),
					getNextText: (hasPermissions) => (hasPermissions ? "Next" : "Back"),
				});
			}

			if (isWalletSignedIn) {
				goToOPSignSettings();
			} else {
				goTo({
					kind: SceneKind.signInWithWallet,
					onSkip: goBack,
					skipText: "Back",
					afterSignIn: goToOPSignSettings,
				});
			}
		}
	);

	const refreshDynamicContainer = useRefreshDynamicContainer();

	React.useEffect(refreshDynamicContainer, [characters]);

	return (
		<div className={styles.container}>
			<Header title="Your Characters" />

			<div className={styles.main}>
				<Main
					afterSelectCharacter={hide}
					onSelectNew={goToMintCharacter}
					onClickOPSignIcon={handleClickOPSignIcon}
				/>
			</div>
		</div>
	);
}
