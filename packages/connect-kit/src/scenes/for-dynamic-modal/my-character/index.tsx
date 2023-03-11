import React from "react";
import compact from "lodash.compact";
import { useRefCallback } from "@crossbell/util-hooks";

import { useAccountCharacter, useAccountState } from "../../../hooks";
import { SelectCharacters } from "../../../scenes";
import { MintCharacter } from "../../../scenes/for-dynamic-modal/mint-character";
import { SelectOptions } from "../../../scenes/for-upgrade-account";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	useDynamicScenesModal,
	SettingsSection,
	WalletIcon,
	Congrats,
} from "../../../components";

import styles from "./index.module.css";
import { StorageWidget } from "./components/storage-widget";
import { CharacterWidget } from "./components/character-widget";

export function MyCharacter() {
	const account = useAccountState();
	const character = useAccountCharacter();
	const { goTo, goBack } = useDynamicScenesModal();

	const goToUpgradeAccount = useRefCallback(() => {
		goTo({
			kind: "upgrade-account",
			Component: () => <SelectOptions onCancel={goBack} />,
		});
	});

	const goToCongratsForMintCharacter = useRefCallback(() => {
		goTo({
			kind: "congrats-for-mint-character",
			Component: () => <CongratsForMintCharacter />,
		});
	});

	const goToMintCharacter = useRefCallback(() => {
		goTo({
			kind: "mint-characters",
			Component: () => (
				<MintCharacter
					sceneMode="form"
					formMode="normal"
					onSuccess={goToCongratsForMintCharacter}
				/>
			),
		});
	});

	const goToSwitchCharacter = useRefCallback(() => {
		goTo({
			kind: "select-characters",
			Component: () => (
				<SelectCharacters
					onSelectNew={goToMintCharacter}
					afterSelectCharacter={goBack}
				/>
			),
		});
	});

	return (
		<DynamicScenesContainer
			header={<DynamicScenesHeader title="My Character" />}
			padding="12px 24px 48px"
		>
			<div className={styles.container}>
				<CharacterWidget onClickSwitchCharacter={goToSwitchCharacter} />

				{character && <StorageWidget characterId={character.characterId} />}

				<SettingsSection
					items={compact([
						!!account.email && {
							id: "upgrade-email-account",
							icon: <WalletIcon className={styles.icon} />,
							title: "Upgrade Account",
							description: "Upgrade to wallet account for assets",
							onClick: goToUpgradeAccount,
						},
					])}
				/>
			</div>
		</DynamicScenesContainer>
	);
}

function CongratsForMintCharacter() {
	const { hide, resetScenes, scenes } = useDynamicScenesModal();

	return (
		<Congrats
			title="Congrats!"
			desc="Now you can return into the feed and enjoy Crossbell."
			tips="Welcome to new Crossbell"
			timeout="15s"
			btnText="Back to xSettings"
			onClose={hide}
			onClickBtn={() => {
				resetScenes([scenes[0]]);
			}}
		/>
	);
}
