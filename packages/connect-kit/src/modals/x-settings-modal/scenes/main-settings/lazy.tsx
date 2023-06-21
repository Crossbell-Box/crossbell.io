import React from "react";
import compact from "lodash.compact";
import { useRefCallback } from "@crossbell/util-hooks";
import {
	GearIcon,
	SettingsXSyncIcon,
	SettingsEyeIcon,
	SettingsSwitchAppIcon,
	SettingsMyCharacterIcon,
	LockIcon,
} from "@crossbell/ui";
import classNames from "classnames";
import { useAccountCharacter, useAccountState } from "@crossbell/react-account";

import {
	SignInWithWallet,
	OPSignSettings,
	SyncOperatorSettings,
} from "../../../../scenes";
import { ManageOperators } from "../../../../scenes/for-dynamic-modal/manage-operators";
import { SwitchApps } from "../../../../scenes/for-dynamic-modal/switch-apps";
import { PrivacyAndSecurity } from "../../../../scenes/for-dynamic-modal/privacy-and-security";
import { MyCharacter } from "../../../../scenes/for-dynamic-modal/my-character";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	useDynamicScenesModal,
	SettingsSection,
	DumbOpSignIcon,
} from "../../../../components";
import { useXSettingsConfig } from "../../../../x-settings-config";

import styles from "./index.module.css";
import { VersionInfo } from "../../components/version-info";
import { extractCharacterName } from "@crossbell/util-metadata";

export default function MainSetting() {
	const account = useAccountState();
	const character = useAccountCharacter();
	const characterId = character?.characterId;
	const { goTo, updateLast } = useDynamicScenesModal();
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

	const goToMyCharacter = useRefCallback(() => {
		goTo({
			kind: "my-character",
			Component: () => <MyCharacter />,
		});
	});

	return (
		<DynamicScenesContainer
			header={
				<DynamicScenesHeader
					leftNode={
						<div className={styles.headerTitle}>
							<GearIcon className={styles.gearIcon} />
							xSettings
						</div>
					}
				/>
			}
			padding="12px 24px 48px"
		>
			<div className={styles.container}>
				<SettingsSection
					items={compact([
						{
							id: "my-character",
							icon: <SettingsMyCharacterIcon className={styles.icon} />,
							title: (
								<div className={styles.myCharacter}>
									<span>My Character</span>
									<span className={styles.characterName}>
										{extractCharacterName(character)}
									</span>
								</div>
							),
							onClick: goToMyCharacter,
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
