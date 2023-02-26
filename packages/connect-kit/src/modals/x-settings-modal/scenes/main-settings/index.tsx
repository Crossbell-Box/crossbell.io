import React from "react";
import compact from "lodash.compact";
import { useRefCallback } from "@crossbell/util-hooks";
import { GearIcon } from "@crossbell/ui";

import { useAccountState } from "../../../../hooks";
import { SignInWithWallet, OPSignSettings } from "../../../../scenes";
import { SelectOptions } from "../../../../scenes/upgrade-account";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	useDynamicScenesModal,
	SettingsSection,
	DumbOpSignIcon,
	WalletIcon,
	IdCardIcon,
} from "../../../../components";

import styles from "./index.module.css";

export function MainSetting() {
	const account = useAccountState();
	const { goTo, goBack, updateLast } = useDynamicScenesModal();
	const characterId = account.computed.account?.characterId;

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
				<SettingsSection
					title="Connect"
					items={compact([
						{
							id: "sign-in",
							icon: <IdCardIcon className={styles.icon} />,
							title: "Sign In",
							disabled: !!account.email || !!account.wallet?.siwe,
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
					title="Operator"
					items={compact([
						{
							id: "op-sign",
							icon: <DumbOpSignIcon className={styles.icon} isActive={true} />,
							title: "Operator Sign",
							description: "Set up operator for interactions",
							disabled: !characterId || !!account.email,
							onClick: goToOPSign,
						},
					])}
				/>
			</div>
		</DynamicScenesContainer>
	);
}
