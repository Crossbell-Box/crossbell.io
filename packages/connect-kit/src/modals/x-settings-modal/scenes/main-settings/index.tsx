import React from "react";
import compact from "lodash.compact";
import { useRefCallback } from "@crossbell/util-hooks";

import { useAccountState } from "../../../../hooks";
import { SignInWithWallet, OPSignSettings } from "../../../../scenes";

import {
	DynamicScenesHeader,
	DynamicScenesContainer,
	useDynamicScenesModal,
	SettingsSection,
	DumbOpSignIcon,
} from "../../../../components";

import styles from "./index.module.css";

export function MainSetting() {
	const account = useAccountState();
	const { goTo, goBack } = useDynamicScenesModal();
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
		goTo({
			kind: "op-sign",
			Component: () => <OPSignSettings characterId={characterId} />,
		});
	});

	return (
		<DynamicScenesContainer
			header={<DynamicScenesHeader title="xSettings" />}
			padding="0 24px 48px"
		>
			<div className={styles.container}>
				<SettingsSection
					title="Connect"
					items={compact([
						{
							id: "sign-in",
							icon: <DumbOpSignIcon isActive={true} />,
							title: "Sign In",
							disabled: !!account.email || !!account.wallet?.siwe,
							onClick: goToSignIn,
						},
						!!account.email && {
							id: "upgrade-email-account",
							icon: <DumbOpSignIcon isActive={true} />,
							title: "Upgrade Account",
							description: "Upgrade to wallet account for assets",
						},
					])}
				/>

				<SettingsSection
					title="Operator"
					items={compact([
						{
							id: "op-sign",
							icon: <DumbOpSignIcon isActive={true} />,
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
