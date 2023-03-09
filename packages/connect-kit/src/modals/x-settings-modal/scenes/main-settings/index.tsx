import React from "react";
import compact from "lodash.compact";
import { useRefCallback } from "@crossbell/util-hooks";
import { GearIcon, SettingsXSyncIcon, SettingsEyeIcon } from "@crossbell/ui";

import { useAccountCharacter, useAccountState } from "../../../../hooks";
import {
	SignInWithWallet,
	OPSignSettings,
	CharacterSyncSettings,
	ManageOperators,
	SelectCharacters,
	MintCharacterForDynamicModal,
} from "../../../../scenes";
import { SelectOptions } from "../../../../scenes/for-upgrade-account";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	useDynamicScenesModal,
	SettingsSection,
	DumbOpSignIcon,
	WalletIcon,
	IdCardIcon,
	Congrats,
} from "../../../../components";

import styles from "./index.module.css";
import { StorageWidget } from "../../components/storage-widget";
import { CharacterWidget } from "../../components/character-widget";
import { VersionInfo } from "../../components/version-info";

export function MainSetting() {
	const account = useAccountState();
	const character = useAccountCharacter();
	const characterId = character?.characterId;
	const { goTo, goBack, updateLast } = useDynamicScenesModal();

	const goToSignIn = useRefCallback(() => {
		goTo({
			kind: "sign-in",
			Component: () => (
				<SignInWithWallet canGoBack={true} afterSignIn={goBack} />
			),
		});
	});

	const goToOPSign = useRefCallback(() => {
		if (!!account.wallet?.siwe) {
			goTo({
				kind: "op-sign",
				Component: () => <OPSignSettings characterId={characterId} />,
			});
		} else {
			goTo({
				kind: "sign-in",
				Component: () => (
					<SignInWithWallet
						canGoBack={true}
						afterSignIn={() => {
							updateLast({
								kind: "op-sign",
								Component: () => <OPSignSettings characterId={characterId} />,
							});
						}}
					/>
				),
			});
		}
	});

	const goToUpgradeAccount = useRefCallback(() => {
		goTo({
			kind: "upgrade-account",
			Component: () => <SelectOptions onCancel={goBack} />,
		});
	});

	const goToCharacterSync = useRefCallback(() => {
		goTo({
			kind: "character-sync-settings",
			Component: () => <CharacterSyncSettings />,
		});
	});

	const goToManageOperators = useRefCallback(() => {
		goTo({
			kind: "manage-operators",
			Component: () => <ManageOperators />,
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
				<MintCharacterForDynamicModal
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
			header={
				<DynamicScenesHeader
					leftNode={
						<div className={styles.headerTitle}>
							<GearIcon />
							xSettings
						</div>
					}
				/>
			}
			padding="0 24px 48px"
		>
			<div className={styles.container}>
				<CharacterWidget onClickSwitchCharacter={goToSwitchCharacter} />

				{character && <StorageWidget characterId={character.characterId} />}

				<SettingsSection
					items={compact([
						!account.email && {
							id: "sign-in",
							icon: <IdCardIcon className={styles.icon} />,
							title: "Sign In",
							description: "Sign in servers to get more features",
							disabled: !!account.wallet?.siwe,
							onClick: goToSignIn,
						},

						!!account.email && {
							id: "upgrade-email-account",
							icon: <WalletIcon className={styles.icon} />,
							title: "Upgrade Account",
							description: "Upgrade to wallet account for assets",
							onClick: goToUpgradeAccount,
						},
					])}
				/>

				<SettingsSection
					title="OPERATOR"
					items={compact([
						!account.email && {
							id: "op-sign",
							icon: <DumbOpSignIcon className={styles.icon} isActive={true} />,
							title: "Operator Sign",
							description: "Set up operator for interactions",
							disabled: !characterId,
							onClick: goToOPSign,
						},

						!account.email && {
							id: "character-sync",
							icon: <SettingsXSyncIcon className={styles.icon} />,
							title: "Sync Operator",
							description: "Set up operator for syncing content",
							disabled: !characterId,
							onClick: goToCharacterSync,
						},

						!account.email && {
							id: "operators",
							icon: <SettingsEyeIcon className={styles.icon} />,
							title: "Manage Operators",
							disabled: !characterId,
							onClick: goToManageOperators,
						},
					])}
				/>

				<VersionInfo />
			</div>
		</DynamicScenesContainer>
	);
}

function CongratsForMintCharacter() {
	const { hide, resetScenes } = useDynamicScenesModal();

	return (
		<Congrats
			title="Congrats!"
			desc="Now you can return into the feed and enjoy Crossbell."
			tips="Welcome to new Crossbell"
			timeout="15s"
			btnText="Back to xSettings"
			onClose={hide}
			onClickBtn={() => {
				resetScenes([
					{
						kind: "main-settings",
						Component: MainSetting,
					},
				]);
			}}
		/>
	);
}
