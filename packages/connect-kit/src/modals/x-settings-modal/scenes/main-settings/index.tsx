import React from "react";
import compact from "lodash.compact";
import { useRefCallback } from "@crossbell/util-hooks";
import {
	GearIcon,
	SettingsXSyncIcon,
	SettingsEyeIcon,
	SettingsSwitchAppIcon,
	LockIcon,
} from "@crossbell/ui";
import classNames from "classnames";

import { useAccountCharacter, useAccountState } from "../../../../hooks";
import {
	SignInWithWallet,
	OPSignSettings,
	SyncOperatorSettings,
	SelectCharacters,
} from "../../../../scenes";
import { MintCharacter } from "../../../../scenes/for-dynamic-modal/mint-character";
import { ManageOperators } from "../../../../scenes/for-dynamic-modal/manage-operators";
import { SwitchApps } from "../../../../scenes/for-dynamic-modal/switch-apps";
import { PrivacyAndSecurity } from "../../../../scenes/for-dynamic-modal/privacy-and-security";
import { SelectOptions } from "../../../../scenes/for-upgrade-account";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	useDynamicScenesModal,
	SettingsSection,
	DumbOpSignIcon,
	WalletIcon,
	Congrats,
} from "../../../../components";
import { useXSettingsConfig } from "../../../../x-settings-config";

import styles from "./index.module.css";
import { StorageWidget } from "../../components/storage-widget";
import { CharacterWidget } from "../../components/character-widget";
import { VersionInfo } from "../../components/version-info";

export function MainSetting() {
	const account = useAccountState();
	const character = useAccountCharacter();
	const characterId = character?.characterId;
	const { goTo, goBack, updateLast } = useDynamicScenesModal();
	const { sentry } = useXSettingsConfig();

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

	const goToSyncOperatorSettings = useRefCallback(() => {
		goTo({
			kind: "sync-operator-settings",
			Component: () => <SyncOperatorSettings />,
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

	const goToSwitchApps = useRefCallback(() => {
		goTo({
			kind: "switch-apps",
			Component: () => <SwitchApps />,
		});
	});

	const goToPrivacyAndSecurity = useRefCallback(() => {
		goTo({
			kind: "privacy-and-security",
			Component: () => <PrivacyAndSecurity />,
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
							id: "sync-operator",
							icon: <SettingsXSyncIcon className={styles.icon} />,
							title: "Sync Operator",
							description: "Set up operator for syncing content",
							disabled: !characterId,
							onClick: goToSyncOperatorSettings,
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

				<SettingsSection
					title="GENERAL SETTINGS"
					items={compact([
						!!sentry && {
							id: "privacy-and-security",
							icon: (
								<LockIcon
									className={classNames(styles.icon, styles.lockIcon)}
								/>
							),
							title: "Privacy & Security",
							onClick: goToPrivacyAndSecurity,
						},
						{
							id: "switch-apps",
							icon: <SettingsSwitchAppIcon className={styles.icon} />,
							title: "Switch Apps",
							onClick: goToSwitchApps,
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
